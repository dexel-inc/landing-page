/**
 * Capa de medición agnóstica del proveedor.
 *
 * Un solo `track()` alimenta a la vez GA4 (directo o vía GTM), el Meta Pixel
 * del navegador y la Conversions API del lado servidor. Los componentes no
 * saben qué herramientas hay instaladas, así que agregar o quitar una no
 * obliga a tocar la interfaz.
 *
 * Sin variables de entorno no se carga nada y `track()` no hace más que un
 * `console.debug` en desarrollo: el sitio funciona igual con o sin analítica.
 *
 * Variables (ver `.env.example`):
 *   VITE_GA4_ID           G-XXXXXXXXXX      Google Analytics 4 directo
 *   VITE_GTM_ID           GTM-XXXXXXX       Google Tag Manager (alternativa a GA4)
 *   VITE_META_PIXEL_ID    000000000000000   Meta Pixel del navegador
 *   VITE_META_CAPI_ENDPOINT  /api/meta-capi Conversions API (lado servidor)
 */

const isBrowser = typeof window !== "undefined";

/**
 * Eventos del sitio. Los cuatro primeros son los de conversión: se nombran en
 * PascalCase porque así se ven en el Administrador de Eventos de Meta y así se
 * configuran las conversiones personalizadas.
 */
export const EVENTS = {
  /** Conversión principal: alguien pidió la auditoría de procesos. */
  AUDIT_REQUESTED: "AuditRequested",
  /** Cotización de cualquier servicio que no sea la auditoría. */
  QUOTE_REQUESTED: "QuoteRequested",
  /** Vio el detalle de un servicio. Lleva `service_name` como parámetro. */
  SERVICE_DETAIL_VIEWED: "ServiceDetailViewed",
  /** Interactuó con el asistente conversacional. */
  PROCESS_STARTED: "ProcessStarted",

  // Eventos de apoyo: sirven para entender el recorrido, no para optimizar campañas.
  PAGE_VIEW: "page_view",
  CTA_CLICK: "cta_click",
  CHAT_COMPLETED: "chat_completed",
  WHATSAPP_OPENED: "whatsapp_opened",
  CASE_STUDY_VISITED: "case_study_visited",
  TEAM_PROFILE_CLICK: "team_profile_click",
};

/** Eventos de conversión: van a la Conversions API además del pixel. */
const CONVERSION_EVENTS = new Set([
  EVENTS.AUDIT_REQUESTED,
  EVENTS.QUOTE_REQUESTED,
  EVENTS.SERVICE_DETAIL_VIEWED,
  EVENTS.PROCESS_STARTED,
]);

const env = (key) => (typeof import.meta !== "undefined" ? import.meta.env?.[key] : undefined);

/**
 * Identificador único por evento. El pixel y la Conversions API mandan el
 * mismo `eventID`, que es lo que usa Meta para no contar dos veces la misma
 * conversión cuando llega por los dos caminos.
 */
function newEventId() {
  if (isBrowser && window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `evt_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

/** Envía la conversión al servidor. Nunca bloquea ni rompe la interacción. */
function sendToConversionsApi(event, params, eventId) {
  const endpoint = env("VITE_META_CAPI_ENDPOINT");
  if (!endpoint) return;

  const body = JSON.stringify({
    event_name: event,
    event_id: eventId,
    event_source_url: window.location.href,
    custom_data: params,
  });

  // `sendBeacon` sobrevive a que el usuario navegue justo después de convertir,
  // que es exactamente cuando ocurren estos eventos.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    return;
  }

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    /* la medición nunca debe romper la página */
  });
}

/**
 * Registra un evento en todos los proveedores configurados.
 *
 * @param {string} event - una de las constantes de EVENTS
 * @param {Record<string, unknown>} [params] - contexto (servicio, ubicación, idioma...)
 */
export function track(event, params = {}) {
  if (!isBrowser) return;

  const eventId = newEventId();

  // GA4 vía gtag (si está cargado) y GTM vía dataLayer. Los dos leen el mismo
  // push, así que da igual cuál de los dos esté configurado.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params, event_id: eventId });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, { ...params, event_id: eventId });
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event, params, { eventID: eventId });
  }

  if (CONVERSION_EVENTS.has(event)) {
    sendToConversionsApi(event, params, eventId);
  }

  if (env("DEV")) {
    console.debug("[analytics]", event, params, eventId);
  }
}

/** Vista de página. Se llama en cada cambio de ruta, no solo al cargar. */
export function trackPageView({ path, locale, title }) {
  if (!isBrowser) return;

  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title,
      page_location: window.location.href,
      language: locale,
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: EVENTS.PAGE_VIEW, page_path: path, language: locale });

  if (typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
}

function injectScript(src) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
  return script;
}

function injectGa4(measurementId) {
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);

  window.dataLayer = window.dataLayer || [];
  // gtag necesita `arguments`, así que no puede ser una función flecha.
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  // El page_view lo mandamos nosotros en cada cambio de ruta: en una SPA el
  // automático solo dispararía en la primera carga.
  window.gtag("config", measurementId, { send_page_view: false });
}

function injectGtm(gtmId) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  injectScript(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`);
}

function injectMetaPixel(pixelId) {
  // Snippet oficial de Meta, conservado tal cual para que sea reconocible.
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq("init", pixelId);
}

/** Carga los proveedores configurados. Sin variables definidas no hace nada. */
export function initAnalytics() {
  if (!isBrowser) return;

  const ga4Id = env("VITE_GA4_ID");
  const gtmId = env("VITE_GTM_ID");
  const pixelId = env("VITE_META_PIXEL_ID");

  if (ga4Id) injectGa4(ga4Id);
  if (gtmId) injectGtm(gtmId);
  if (pixelId) injectMetaPixel(pixelId);
}
