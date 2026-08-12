/**
 * Capa de medición agnóstica del proveedor.
 *
 * Un solo `track()` alimenta a la vez GA4 (directo o vía GTM), el Meta Pixel
 * del navegador y la Conversions API del lado servidor. Los componentes no
 * saben qué herramientas hay instaladas, así que agregar o quitar una no
 * obliga a tocar la interfaz.
 *
 * Nada se envía sin consentimiento. El pixel se inicializa con
 * `fbq('consent','revoke')` y GA4 con el modo de consentimiento en `denied`;
 * ambos se activan solo cuando el visitante acepta en el banner. Si rechaza, el
 * sitio funciona igual y no sale un solo evento.
 *
 * Identificadores en `config/analytics.js`; variables en `.env.example`.
 */

import { ANALYTICS } from "../config/analytics.js";
import { CONSENT, hasConsent, onConsentChange, readConsent } from "../consent/consent.js";
import { PRICES, CURRENCY } from "../config/pricing.js";

const isBrowser = typeof window !== "undefined";

/**
 * Eventos del sitio. Los de conversión se nombran en PascalCase porque así
 * aparecen en el Administrador de Eventos de Meta y así se configuran las
 * conversiones personalizadas sobre las que optimiza la campaña.
 */
export const EVENTS = {
  /** Conversión principal: alguien pidió la auditoría de procesos. */
  AUDIT_REQUESTED: "AuditRequested",
  /** Cotización de cualquier servicio que no sea la auditoría. */
  QUOTE_REQUESTED: "QuoteRequested",
  /** Agendamiento de la llamada de discovery, que es gratuita. */
  DISCOVERY_BOOKED: "DiscoveryBooked",
  /** Abrió el detalle de un servicio. Lleva `service_name`. */
  SERVICE_DETAIL_VIEWED: "ServiceDetailViewed",
  /** Cargó una de las tres páginas de categoría. Lleva `category`. */
  SERVICE_CATEGORY_VIEWED: "ServiceCategoryViewed",
  /** Primer mensaje enviado al asistente conversacional. */
  CHAT_STARTED: "ChatStarted",

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
  EVENTS.DISCOVERY_BOOKED,
  EVENTS.SERVICE_DETAIL_VIEWED,
  EVENTS.SERVICE_CATEGORY_VIEWED,
  EVENTS.CHAT_STARTED,
]);

/**
 * Valor monetario por evento. Meta necesita `value` y `currency` para poder
 * optimizar hacia ingreso y no solo hacia volumen de conversiones. Sale de
 * `config/pricing.js`, así que un reprecio lo arrastra solo.
 */
const EVENT_VALUE = {
  [EVENTS.AUDIT_REQUESTED]: () => PRICES.audit,
};

// Idioma activo. Se inyecta desde la aplicación en cada cambio de ruta para no
// tener que pasarlo a mano en cada llamada: el documento lo pide en todos los
// eventos y olvidarlo en uno solo rompe la segmentación por idioma.
let currentLocale = "es";

export function setAnalyticsLocale(locale) {
  currentLocale = locale;
}

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
  const endpoint = ANALYTICS.capiEndpoint;
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
 * @param {Record<string, unknown>} [params] - contexto (servicio, ubicación...)
 */
export function track(event, params = {}) {
  if (!isBrowser) return;

  const eventId = newEventId();
  const value = EVENT_VALUE[event]?.();
  const payload = {
    ...params,
    locale: params.locale ?? currentLocale,
    ...(value ? { value, currency: CURRENCY } : {}),
  };

  if (import.meta.env?.DEV) {
    console.debug("[analytics]", event, payload, eventId, hasConsent() ? "" : "(sin consentimiento)");
  }

  // El dataLayer se alimenta siempre: es local, no sale del navegador, y sin él
  // GTM no podría reaccionar cuando el consentimiento llegue después.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload, event_id: eventId });

  if (!hasConsent()) return;

  if (typeof window.gtag === "function") {
    window.gtag("event", event, { ...payload, event_id: eventId });
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event, payload, { eventID: eventId });
  }

  if (CONVERSION_EVENTS.has(event)) {
    sendToConversionsApi(event, payload, eventId);
  }
}

/** Vista de página. Se llama en cada cambio de ruta, no solo al cargar. */
export function trackPageView({ path, locale, title }) {
  if (!isBrowser) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: EVENTS.PAGE_VIEW, page_path: path, language: locale });

  if (!hasConsent()) return;

  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title,
      page_location: window.location.href,
      language: locale,
    });
  }

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

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") return;
  // gtag necesita `arguments`, así que no puede ser una función flecha.
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
}

function injectGa4(measurementId) {
  ensureGtag();
  // El consentimiento por defecto se declara antes de cargar la librería: si se
  // declara después, GA4 ya mandó el primer hit.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });

  injectScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
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

  // Revocar antes de inicializar: así el pixel no envía nada —ni el PageView
  // automático— mientras el visitante no haya aceptado.
  window.fbq("consent", "revoke");
  window.fbq("init", pixelId);
}

/** Activa lo que estaba en espera del consentimiento. */
function grantConsent() {
  if (typeof window.fbq === "function") window.fbq("consent", "grant");

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
  }
}

/**
 * Carga los proveedores configurados, en modo revocado.
 *
 * Las librerías se cargan siempre para poder reaccionar en el instante en que
 * el visitante acepta, sin recargar la página; pero no envían nada hasta que
 * el consentimiento pasa a `grant`.
 */
export function initAnalytics() {
  if (!isBrowser) return;

  if (ANALYTICS.ga4Id) injectGa4(ANALYTICS.ga4Id);
  if (ANALYTICS.gtmId) injectGtm(ANALYTICS.gtmId);
  if (ANALYTICS.metaPixelId) injectMetaPixel(ANALYTICS.metaPixelId);

  if (readConsent() === CONSENT.GRANTED) grantConsent();

  onConsentChange((value) => {
    if (value === CONSENT.GRANTED) {
      grantConsent();
      trackPageView({ path: window.location.pathname, locale: currentLocale });
    }
  });
}
