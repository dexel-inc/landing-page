/**
 * Conversions API de Meta, lado servidor.
 *
 * El pixel del navegador pierde una parte grande de las conversiones: los
 * bloqueadores lo tumban, Safari acorta las cookies y iOS limita el rastreo.
 * Este endpoint manda el mismo evento desde el servidor. Ambos llevan el mismo
 * `event_id`, que es lo que usa Meta para deduplicar y no contar dos veces.
 *
 * Variables de entorno en Vercel (sin prefijo VITE_: nunca deben llegar al
 * navegador):
 *   META_PIXEL_ID            id del pixel
 *   META_CAPI_ACCESS_TOKEN   token de la Conversions API
 *   META_TEST_EVENT_CODE     opcional, para "Eventos de prueba" en el
 *                            Administrador de Eventos
 */

const GRAPH_VERSION = "v21.0";

/** Meta exige SHA-256 en minúsculas para cualquier dato personal. */
async function sha256(value) {
  const data = new TextEncoder().encode(String(value).trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function readCookie(cookieHeader, name) {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  // El id del pixel es público y no cambia; el token sí es una credencial. Con
  // el valor por defecto, configurar la Conversions API se reduce a poner el
  // token en Vercel.
  const pixelId = process.env.META_PIXEL_ID || "1065161589428764";
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  // Sin token el endpoint responde 204 en vez de fallar: en previews y en local
  // no lo hay, y una conversión no medida no debe verse como un error en la
  // consola del visitante.
  if (!accessToken) {
    return response.status(204).end();
  }

  let payload = request.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      return response.status(400).json({ error: "Invalid JSON" });
    }
  }

  if (!payload?.event_name) {
    return response.status(400).json({ error: "Missing event_name" });
  }

  const cookieHeader = request.headers.cookie;
  const forwardedFor = request.headers["x-forwarded-for"];
  const clientIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(",")[0]?.trim();

  // No pedimos correo ni teléfono en el sitio, así que los identificadores
  // disponibles son las cookies del pixel, la IP y el user agent. Meta exige
  // al menos uno para aceptar el evento.
  const userData = {
    client_ip_address: clientIp,
    client_user_agent: request.headers["user-agent"],
    fbp: readCookie(cookieHeader, "_fbp"),
    fbc: readCookie(cookieHeader, "_fbc"),
  };

  if (payload.email) userData.em = [await sha256(payload.email)];
  if (payload.phone) userData.ph = [await sha256(payload.phone)];

  const body = {
    data: [
      {
        event_name: payload.event_name,
        event_id: payload.event_id,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: payload.event_source_url,
        action_source: "website",
        user_data: userData,
        custom_data: payload.custom_data ?? {},
      },
    ],
  };

  if (process.env.META_TEST_EVENT_CODE) {
    body.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const metaResponse = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    const result = await metaResponse.json();

    if (!metaResponse.ok) {
      console.error("[meta-capi]", result);
      return response.status(502).json({ error: "Meta rejected the event" });
    }

    return response.status(200).json({ events_received: result.events_received ?? 0 });
  } catch (error) {
    console.error("[meta-capi]", error);
    return response.status(502).json({ error: "Upstream failure" });
  }
}
