/**
 * Capa de medición agnóstica del proveedor.
 *
 * Un solo `track()` alimenta a la vez GA4 (directo o vía GTM), el Meta Pixel
 * del navegador y la Conversions API del lado servidor. Los componentes no
 * saben qué herramientas hay instaladas, así que agregar o quitar una no
 * obliga a tocar la interfaz.
 *
 * Nada se envía sin consentimiento, ni por navegador ni por servidor. GA4 se
 * carga con el modo de consentimiento en `denied` y el pixel de Meta ni
 * siquiera se descarga hasta que el visitante acepta; la Conversions API se
 * llama solo desde `track()`, después de comprobar la decisión. Si rechaza, el
 * sitio funciona igual y no sale una sola petición hacia Meta.
 *
 * Identificadores en `config/analytics.js`; variables en `.env.example`.
 */

import { ANALYTICS } from "../config/analytics.js";
import { CONSENT, hasConsent, onConsentChange, readConsent } from "../consent/consent.js";
import { currencyFor, priceAmount } from "../config/pricing.js";

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
  /** Cargó la página de formación in-company. Lleva `locale`. */
  TRAINING_PAGE_VIEWED: "TrainingPageViewed",
  /** Solicitud de formación. Lleva `format` y el `value` de ese formato. */
  TRAINING_REQUESTED: "TrainingRequested",
  /** Solicitud de uno de los tres packs de automatización. Lleva `pack_name`. */
  PACK_REQUESTED: "PackRequested",

  // Eventos de apoyo: sirven para entender el recorrido, no para optimizar
  // campañas. Van en PascalCase igual que los de conversión: el Administrador de
  // Eventos los lista todos juntos y en la misma columna, y mezclar dos
  // convenciones ahí obliga a recordar cuál se escribió de qué manera cada vez
  // que se arma un público o una conversión personalizada.
  CTA_CLICK: "CtaClicked",
  CHAT_COMPLETED: "ChatCompleted",
  WHATSAPP_OPENED: "WhatsAppOpened",
  CASE_STUDY_VISITED: "CaseStudyVisited",
  TEAM_PROFILE_CLICK: "TeamProfileClicked",

  /**
   * Se queda en `snake_case` a propósito: `page_view` es un nombre reservado de
   * GA4, no una elección nuestra. Renombrarlo lo convertiría en un evento
   * personalizado y la vista de página dejaría de alimentar los informes
   * estándar de Google. El equivalente de Meta es `PageView`, que manda
   * `trackPageView()` con el nombre que Meta espera.
   */
  PAGE_VIEW: "page_view",
};

/**
 * Eventos de conversión: van a la Conversions API además del pixel.
 *
 * `PageView` no está aquí porque no pasa por `track()`: lo manda
 * `trackPageView()` en cada cambio de ruta, por las dos vías igual que estos.
 * Los eventos de apoyo se quedan en el navegador: sirven para entender el
 * recorrido, y duplicarlos por servidor costaría una invocación por clic sin
 * mejorar la atribución.
 */
const CONVERSION_EVENTS = new Set([
  EVENTS.AUDIT_REQUESTED,
  EVENTS.QUOTE_REQUESTED,
  EVENTS.DISCOVERY_BOOKED,
  EVENTS.SERVICE_DETAIL_VIEWED,
  EVENTS.SERVICE_CATEGORY_VIEWED,
  EVENTS.CHAT_STARTED,
  EVENTS.TRAINING_PAGE_VIEWED,
  EVENTS.TRAINING_REQUESTED,
  EVENTS.PACK_REQUESTED,
]);

/**
 * Valor monetario por evento. Meta necesita `value` y `currency` para poder
 * optimizar hacia ingreso y no solo hacia volumen de conversiones. Sale de
 * `config/pricing.js`, así que un reprecio lo arrastra solo.
 *
 * Un evento cuyo valor depende de lo que el visitante eligió —el formato de
 * formación— no cabe en esta tabla: lo manda quien llama, en `params.value`.
 */
const EVENT_VALUE = {
  [EVENTS.AUDIT_REQUESTED]: (locale) => priceAmount("audit", locale),
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

/**
 * Instante del evento en segundos, que es la unidad que pide Meta.
 *
 * Viaja junto al `event_id` para que las dos entregas —pixel y servidor—
 * declaren el mismo momento: el par identifica la conversión dentro de la
 * ventana en la que Meta busca duplicados.
 */
function eventTimestamp() {
  return Math.floor(Date.now() / 1000);
}

/** Envía la conversión al servidor. Nunca bloquea ni rompe la interacción. */
function sendToConversionsApi(event, params, eventId, eventTime) {
  const endpoint = ANALYTICS.capiEndpoint;
  if (!endpoint) return;

  const body = JSON.stringify({
    event_name: event,
    event_id: eventId,
    event_time: eventTime,
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
  const eventTime = eventTimestamp();
  // La moneda acompaña al valor venga de donde venga: un `value` suelto, sin
  // `currency`, Meta lo interpreta en la moneda de la cuenta y no en la nuestra.
  const locale = params.locale ?? currentLocale;
  const value = params.value ?? EVENT_VALUE[event]?.(locale);
  const payload = {
    ...params,
    locale,
    // La moneda sale del idioma: en español se cotiza en pesos y en inglés en
    // dólares, y un valor sin moneda Meta lo interpreta en la de la cuenta.
    ...(value ? { value, currency: params.currency ?? currencyFor(locale) } : {}),
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
    sendToConversionsApi(event, payload, eventId, eventTime);
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

  // La vista de página también se duplica por las dos vías, y por las mismas
  // razones: es el evento que más pierde el pixel —es el primero que carga, y
  // es el que bloquean los bloqueadores antes de que nada más ocurra— y es el
  // que sostiene los públicos de remarketing. Comparte identificador e instante
  // con la entrega del servidor para que Meta cuente una sola visita.
  const eventId = newEventId();
  const eventTime = eventTimestamp();

  if (typeof window.fbq === "function") {
    window.fbq("track", "PageView", {}, { eventID: eventId });
  }

  sendToConversionsApi("PageView", { locale }, eventId, eventTime);
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

  // Sin `consent revoke` delante. Esa llamada existía para cargar la librería
  // antes de preguntar y tenerla muda hasta la respuesta; ahora no se carga
  // hasta que hay respuesta, así que sobra. Y no es inocua: encolada por
  // delante del `init`, la librería aborta el vaciado de la cola al procesarla
  // —se queda sin inicializar, no escribe `_fbp` y no envía un solo evento—,
  // que es justo el fallo silencioso que este archivo intenta evitar.
  window.fbq("init", pixelId);
}

/**
 * Carga el pixel. Solo se llama cuando hay consentimiento.
 *
 * La librería no se pide hasta que el visitante acepta. Antes se cargaba
 * siempre y se mantenía en `revoke`, que impide los eventos pero no la
 * descarga: pedir `fbevents.js` ya es una conexión a Meta que entrega la IP y
 * la página que se está viendo, y eso es tratamiento de datos, exactamente lo
 * que el banner está preguntando. Quien rechaza no genera ni una petición.
 *
 * Cargar aquí y no antes no retrasa nada perceptible: el script es asíncrono y
 * los eventos posteriores a la aceptación entran en la cola del pixel, que se
 * vacía en cuanto la librería termina de cargar.
 *
 * Que esta función se llame solo tras aceptar es lo que sostiene el resto: sin
 * pixel cargado no hay nada que revocar, y por eso `injectMetaPixel` inicializa
 * directamente.
 */
function enableMetaPixel() {
  if (!ANALYTICS.metaPixelId) return;
  if (typeof window.fbq !== "function") injectMetaPixel(ANALYTICS.metaPixelId);
}

/** Activa lo que estaba en espera del consentimiento. */
function grantConsent() {
  enableMetaPixel();

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
 * Prepara los proveedores configurados sin enviar nada.
 *
 * Google se carga con el modo de consentimiento en `denied`, que es el
 * mecanismo que la propia Google define para este caso. El pixel de Meta no
 * tiene equivalente —su `revoke` frena los eventos, no la descarga del
 * script—, así que no se pide hasta que hay aceptación.
 *
 * En ambos casos el cambio se aplica en el instante en que el visitante acepta,
 * sin recargar la página.
 */
export function initAnalytics() {
  if (!isBrowser) return;

  if (ANALYTICS.ga4Id) injectGa4(ANALYTICS.ga4Id);
  if (ANALYTICS.gtmId) injectGtm(ANALYTICS.gtmId);

  if (readConsent() === CONSENT.GRANTED) grantConsent();

  onConsentChange((value) => {
    if (value === CONSENT.GRANTED) {
      grantConsent();
      trackPageView({ path: window.location.pathname, locale: currentLocale });
    }
  });
}
