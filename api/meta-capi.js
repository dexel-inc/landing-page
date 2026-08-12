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

/** Meta descarta los eventos con más de siete días. */
const MAX_EVENT_AGE = 7 * 24 * 60 * 60;

/**
 * `true` solo en el despliegue de producción.
 *
 * `VERCEL_ENV` vale `production`, `preview` o `development`. La distinción
 * importa por el código de eventos de prueba: mandarlo en producción hace que
 * Meta marque las conversiones reales como prueba y deje de optimizar por
 * ellas. Se decide por entorno y no por si la variable está definida, porque
 * la variable está definida en los tres.
 */
const isProduction = (process.env.VERCEL_ENV ?? process.env.NODE_ENV) === "production";

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

/**
 * Momento del evento, en segundos.
 *
 * Lo fija el navegador para que las dos vías declaren el mismo instante. Pero
 * es un reloj ajeno: si va adelantado o atrasado de más, Meta rechaza el evento
 * entero, así que un valor imposible se sustituye por la hora del servidor. Se
 * pierde el instante exacto, no la conversión.
 */
function resolveEventTime(value) {
  const now = Math.floor(Date.now() / 1000);
  const claimed = Math.floor(Number(value));
  if (!Number.isFinite(claimed)) return now;
  if (claimed > now + 60 || claimed < now - MAX_EVENT_AGE) return now;
  return claimed;
}

/**
 * `fbc` a partir del `fbclid` de la URL.
 *
 * `fbc` es lo que ata la conversión al clic en el anuncio, y sin él una campaña
 * no puede atribuirse lo que trajo. Normalmente lo escribe el pixel en la
 * cookie `_fbc`, pero en la primera visita desde un anuncio el evento puede
 * salir antes de que la cookie exista —o no existir nunca si el navegador la
 * bloquea—, y entonces el único sitio donde queda el identificador del clic es
 * la propia URL. El formato lo define Meta: `fb.1.<milisegundos>.<fbclid>`.
 */
function fbcFromUrl(sourceUrl, eventTime) {
  if (!sourceUrl) return undefined;
  try {
    const fbclid = new URL(sourceUrl).searchParams.get("fbclid");
    return fbclid ? `fb.1.${eventTime * 1000}.${fbclid}` : undefined;
  } catch {
    // `event_source_url` llega del cliente: si no es una URL, se ignora.
    return undefined;
  }
}

/**
 * Envía a Meta con un único reintento.
 *
 * Un corte de red o un 5xx puntual no debe costar una conversión, pero
 * reintentar en bucle sí puede convertir una caída de Meta en una factura de
 * ejecución. Un 4xx no se reintenta: el payload está mal y volverá a estarlo.
 */
async function postToMeta(url, body) {
  let lastError;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const metaResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (metaResponse.ok || metaResponse.status < 500 || attempt === 2) return metaResponse;

      console.error(`[meta-capi] ${metaResponse.status} de Meta, reintentando`);
    } catch (error) {
      lastError = error;
      if (attempt === 2) throw error;
      console.error("[meta-capi] fallo de red, reintentando", error.message);
    }
  }

  throw lastError;
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
  // Vercel pone la IP real del visitante en `x-forwarded-for`; el primer valor
  // de la lista es el cliente y el resto son los saltos intermedios. El
  // respaldo del socket es para cuando esa cabecera no está: Meta rechaza el
  // evento entero —400, no un aviso— si `user_data` se queda sin ningún
  // identificador, y con la cookie del pixel ausente la IP es el único que hay.
  const forwardedFor = request.headers["x-forwarded-for"];
  const clientIp =
    (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(",")[0]?.trim()) ||
    request.socket?.remoteAddress;

  const eventTime = resolveEventTime(payload.event_time);

  // No pedimos correo ni teléfono en el sitio —la conversación termina en
  // WhatsApp, y ahí el dato lo entrega el propio visitante fuera del sitio—, así
  // que los identificadores disponibles son las cookies del pixel, la IP y el
  // user agent. Meta exige al menos uno para aceptar el evento.
  const userData = {
    client_ip_address: clientIp,
    client_user_agent: request.headers["user-agent"],
    fbp: readCookie(cookieHeader, "_fbp"),
    fbc: readCookie(cookieHeader, "_fbc") ?? fbcFromUrl(payload.event_source_url, eventTime),
  };

  // Correo y teléfono solo si el visitante los escribió en un formulario. Hoy
  // ningún flujo los pide; el hasheo queda listo para cuando alguno lo haga.
  if (payload.email) userData.em = [await sha256(payload.email)];
  if (payload.phone) userData.ph = [await sha256(payload.phone)];

  const body = {
    data: [
      {
        event_name: payload.event_name,
        // `event_id` y `event_time` vienen del navegador y son los mismos que
        // acompañan al evento del pixel. Es el par con el que Meta reconoce que
        // las dos entregas son la misma conversión y no la cuenta dos veces.
        event_id: payload.event_id,
        event_time: eventTime,
        event_source_url: payload.event_source_url,
        action_source: "website",
        user_data: userData,
        custom_data: payload.custom_data ?? {},
      },
    ],
  };

  if (!isProduction && process.env.META_TEST_EVENT_CODE) {
    body.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const metaResponse = await postToMeta(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${accessToken}`,
      body,
    );

    const result = await metaResponse.json().catch(() => ({}));

    if (!metaResponse.ok) {
      // El código de respuesta y el mensaje de Meta son lo único con lo que se
      // puede diagnosticar después: sin ellos, en el log solo queda "falló".
      console.error(
        `[meta-capi] ${metaResponse.status} ${payload.event_name}:`,
        result?.error?.message ?? result,
      );
      return response.status(502).json({ error: "Meta rejected the event" });
    }

    return response.status(200).json({ events_received: result.events_received ?? 0 });
  } catch (error) {
    console.error(`[meta-capi] sin respuesta de Meta para ${payload.event_name}:`, error.message);
    return response.status(502).json({ error: "Upstream failure" });
  }
}
