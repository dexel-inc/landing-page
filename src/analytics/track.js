/**
 * Capa de medición agnóstica del proveedor.
 *
 * No carga ningún script por sí sola: envía los eventos a los proveedores que
 * ya estén presentes en la página (GTM/GA4 vía dataLayer, Meta Pixel vía fbq).
 * Así el sitio funciona igual con o sin herramientas de analítica cargadas, y
 * agregar un proveedor nuevo no obliga a tocar los componentes.
 *
 * Para activarlos, definir en el .env del despliegue:
 *   VITE_GTM_ID=GTM-XXXXXXX
 *   VITE_META_PIXEL_ID=000000000000000
 * y llamar a initAnalytics() una vez al arrancar la app.
 */

const isBrowser = typeof window !== "undefined";

/** Eventos de conversión del sitio. Usar estas constantes, no strings sueltos. */
export const EVENTS = {
  CTA_CLICK: "cta_click",
  CHAT_STARTED: "chat_started",
  CHAT_COMPLETED: "chat_completed",
  WHATSAPP_OPENED: "whatsapp_opened",
  CASE_STUDY_VISITED: "case_study_visited",
  TEAM_PROFILE_CLICK: "team_profile_click",
};

/** Eventos que además reportamos a Meta como conversión (Lead). */
const META_LEAD_EVENTS = new Set([EVENTS.CHAT_COMPLETED, EVENTS.WHATSAPP_OPENED]);

/**
 * Registra un evento de conversión.
 * @param {string} event - una de las constantes de EVENTS
 * @param {Record<string, unknown>} [params] - contexto adicional (ubicación, servicio, etc.)
 */
export function track(event, params = {}) {
  if (!isBrowser) return;

  const payload = { event, ...params };

  // GTM / GA4
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  // Meta Pixel: los eventos de lead usan el evento estándar, el resto van como custom
  if (typeof window.fbq === "function") {
    if (META_LEAD_EVENTS.has(event)) {
      window.fbq("track", "Lead", params);
    } else {
      window.fbq("trackCustom", event, params);
    }
  }

  if (import.meta.env.DEV) {
    console.debug("[analytics]", event, params);
  }
}

function injectGtm(gtmId) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
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
  window.fbq("track", "PageView");
}

/**
 * Carga los proveedores configurados por variables de entorno.
 * Sin variables definidas no hace nada: en desarrollo no se ensucian los datos.
 */
export function initAnalytics() {
  if (!isBrowser) return;

  const gtmId = import.meta.env.VITE_GTM_ID;
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;

  if (gtmId) injectGtm(gtmId);
  if (pixelId) injectMetaPixel(pixelId);
}
