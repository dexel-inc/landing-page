/**
 * Meta's Conversions API, server side.
 *
 * The browser pixel loses a big share of conversions: blockers take it down,
 * Safari shortens cookies, and iOS limits tracking. This endpoint sends the
 * same event from the server. Both carry the same `event_id`, which is what
 * Meta uses to deduplicate and avoid double-counting.
 *
 * Environment variables in Vercel (no VITE_ prefix: they must never reach
 * the browser):
 *   META_PIXEL_ID            pixel id
 *   META_CAPI_ACCESS_TOKEN   Conversions API token
 *   META_TEST_EVENT_CODE     optional, for "Test Events" in Events Manager
 */

const GRAPH_VERSION = "v21.0";

/** Meta discards events older than seven days. */
const MAX_EVENT_AGE = 7 * 24 * 60 * 60;

/**
 * `true` only in the production deployment.
 *
 * `VERCEL_ENV` is `production`, `preview`, or `development`. The distinction
 * matters because of the test-event code: sending it in production makes
 * Meta flag real conversions as test events and stop optimizing on them.
 * It's decided by environment and not by whether the variable is set,
 * because the variable is set in all three.
 */
const isProduction = (process.env.VERCEL_ENV ?? process.env.NODE_ENV) === "production";

/** Meta requires lowercase SHA-256 for any personal data. */
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
 * Event instant, in seconds.
 *
 * Set by the browser so both channels declare the same moment. But it's
 * someone else's clock: if it's too far ahead or behind, Meta rejects the
 * whole event, so an impossible value is replaced with the server's time.
 * The exact instant is lost, not the conversion.
 */
function resolveEventTime(value) {
  const now = Math.floor(Date.now() / 1000);
  const claimed = Math.floor(Number(value));
  if (!Number.isFinite(claimed)) return now;
  if (claimed > now + 60 || claimed < now - MAX_EVENT_AGE) return now;
  return claimed;
}

/**
 * `fbc` built from the URL's `fbclid`.
 *
 * `fbc` is what ties the conversion to the ad click, and without it a
 * campaign can't get credit for what brought the visitor in. The pixel
 * normally writes it to the `_fbc` cookie, but on a first visit coming from
 * an ad the event can fire before the cookie exists —or it may never exist
 * at all if the browser blocks it— and then the only place the click
 * identifier survives is the URL itself. The format is defined by Meta:
 * `fb.1.<milliseconds>.<fbclid>`.
 */
function fbcFromUrl(sourceUrl, eventTime) {
  if (!sourceUrl) return undefined;
  try {
    const fbclid = new URL(sourceUrl).searchParams.get("fbclid");
    return fbclid ? `fb.1.${eventTime * 1000}.${fbclid}` : undefined;
  } catch {
    // `event_source_url` comes from the client: if it isn't a URL, ignore it.
    return undefined;
  }
}

/**
 * Sends to Meta with a single retry.
 *
 * A network hiccup or a one-off 5xx shouldn't cost a conversion, but
 * retrying in a loop can turn a Meta outage into an execution bill. A 4xx
 * isn't retried: the payload is wrong and will still be wrong the second time.
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

      console.error(`[meta-capi] ${metaResponse.status} from Meta, retrying`);
    } catch (error) {
      lastError = error;
      if (attempt === 2) throw error;
      console.error("[meta-capi] network failure, retrying", error.message);
    }
  }

  throw lastError;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  // The pixel id is public and doesn't change; the token is a credential.
  // With the default value, setting up the Conversions API comes down to
  // putting the token in Vercel.
  const pixelId = process.env.META_PIXEL_ID || "1065161589428764";
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  // With no token the endpoint responds 204 instead of failing: previews and
  // local runs don't have one, and an unmeasured conversion shouldn't look
  // like an error in the visitor's console.
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
  // Vercel puts the visitor's real IP in `x-forwarded-for`; the first value
  // in the list is the client and the rest are intermediate hops. The
  // socket fallback is for when that header is missing: Meta rejects the
  // whole event —a 400, not a warning— if `user_data` ends up with no
  // identifier at all, and with the pixel cookie absent the IP is the only
  // one left.
  const forwardedFor = request.headers["x-forwarded-for"];
  const clientIp =
    (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(",")[0]?.trim()) ||
    request.socket?.remoteAddress;

  const eventTime = resolveEventTime(payload.event_time);

  // We don't ask for email or phone on the site —the conversation ends up
  // on WhatsApp, and that's where the visitor hands over that data,
  // off-site—, so the identifiers available are the pixel cookies, the IP,
  // and the user agent. Meta requires at least one to accept the event.
  const userData = {
    client_ip_address: clientIp,
    client_user_agent: request.headers["user-agent"],
    fbp: readCookie(cookieHeader, "_fbp"),
    fbc: readCookie(cookieHeader, "_fbc") ?? fbcFromUrl(payload.event_source_url, eventTime),
  };

  // Email and phone only if the visitor typed them into a form. No flow
  // asks for them today; the hashing is ready for whenever one does.
  if (payload.email) userData.em = [await sha256(payload.email)];
  if (payload.phone) userData.ph = [await sha256(payload.phone)];

  const body = {
    data: [
      {
        event_name: payload.event_name,
        // `event_id` and `event_time` come from the browser and are the same
        // ones that travel with the pixel event. It's the pair Meta uses to
        // recognize that both deliveries are the same conversion and not
        // count it twice.
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
      // The response code and Meta's message are the only thing that lets
      // you diagnose this later: without them, the log just says "it failed".
      console.error(
        `[meta-capi] ${metaResponse.status} ${payload.event_name}:`,
        result?.error?.message ?? result,
      );
      return response.status(502).json({ error: "Meta rejected the event" });
    }

    return response.status(200).json({ events_received: result.events_received ?? 0 });
  } catch (error) {
    console.error(`[meta-capi] no response from Meta for ${payload.event_name}:`, error.message);
    return response.status(502).json({ error: "Upstream failure" });
  }
}
