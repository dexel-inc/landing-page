/**
 * Provider-agnostic measurement layer.
 *
 * A single `track()` call feeds GA4 (direct or via GTM), the browser Meta
 * Pixel, and the server-side Conversions API all at once. Components don't
 * know which tools are installed, so adding or removing one doesn't require
 * touching the interface.
 *
 * Nothing is sent without consent, whether from the browser or the server.
 * GA4 loads with consent mode set to `denied` and the Meta pixel isn't even
 * downloaded until the visitor accepts; the Conversions API is only called
 * from `track()`, after checking the decision. If the visitor declines, the
 * site works the same and not a single request goes out to Meta.
 *
 * Identifiers live in `config/analytics.js`; variables in `.env.example`.
 */

import { ANALYTICS } from "../config/analytics.js";
import { CONSENT, hasConsent, onConsentChange, readConsent } from "../consent/consent.js";
import { currencyFor, priceAmount } from "../config/pricing.js";

const isBrowser = typeof window !== "undefined";

/**
 * Site events. Conversion events are named in PascalCase because that's how
 * they appear in Meta's Events Manager and how the custom conversions that
 * the campaign optimizes on are configured.
 */
export const EVENTS = {
  /** Primary conversion: someone requested the process audit. */
  AUDIT_REQUESTED: "AuditRequested",
  /** Quote request for any service other than the audit. */
  QUOTE_REQUESTED: "QuoteRequested",
  /** Booking of the discovery call, which is free. */
  DISCOVERY_BOOKED: "DiscoveryBooked",
  /** Opened a service's detail view. Carries `service_name`. */
  SERVICE_DETAIL_VIEWED: "ServiceDetailViewed",
  /** Loaded one of the three category pages. Carries `category`. */
  SERVICE_CATEGORY_VIEWED: "ServiceCategoryViewed",
  /** First message sent to the conversational assistant. */
  CHAT_STARTED: "ChatStarted",
  /** Loaded the team training page. Carries `locale`. */
  TRAINING_PAGE_VIEWED: "TrainingPageViewed",
  /** Training request. Carries `format` and that format's `value`. */
  TRAINING_REQUESTED: "TrainingRequested",
  /** Request for one of the three automation packs. Carries `pack_name`. */
  PACK_REQUESTED: "PackRequested",

  // Journey events. Which of these are also backed server-side is decided by
  // `CONVERSION_EVENTS`, not this list: `ChatCompleted` and `WhatsAppOpened`
  // are, because they're the end of the funnel; navigation clicks aren't.
  // They use PascalCase just like the conversion events: Events Manager
  // lists them all together in the same column, and mixing two conventions
  // there means having to remember which was spelled which way every time
  // an audience or a custom conversion is built.
  CTA_CLICK: "CtaClicked",
  CHAT_COMPLETED: "ChatCompleted",
  WHATSAPP_OPENED: "WhatsAppOpened",
  CASE_STUDY_VISITED: "CaseStudyVisited",
  TEAM_PROFILE_CLICK: "TeamProfileClicked",

  /**
   * Stays in `snake_case` on purpose: `page_view` is a reserved GA4 name, not
   * a choice we made. Renaming it would turn it into a custom event and the
   * page view would stop feeding Google's standard reports. Meta's
   * equivalent is `PageView`, which `trackPageView()` sends under the name
   * Meta expects.
   */
  PAGE_VIEW: "page_view",
};

/**
 * Conversion events: these also go to the Conversions API, on top of the pixel.
 *
 * `PageView` isn't here because it doesn't go through `track()`: it's sent
 * by `trackPageView()` on every route change, through both channels just
 * like these.
 *
 * The criterion isn't "conversion" in the strict sense but what happens if
 * the event is lost. A lost `CtaClicked` costs one line in a journey report.
 * A lost `WhatsAppOpened` costs the attribution of a real contact, and it's
 * exactly the one most likely to be lost: it happens at the end of the
 * session, after a blocker has already had time to act and with the tab
 * about to head off to WhatsApp. Backing up server-side only what happens on
 * page load covers the cheap part and leaves the expensive one exposed.
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
  // Conversation closers. `ChatCompleted` means the whole flow got answered
  // and `WhatsAppOpened` is the actual handoff of the contact: they're the
  // two points in the journey that a blocked pixel makes disappear without a
  // trace, and without them the campaign ends up optimizing against a funnel
  // that's cut short before the end.
  EVENTS.CHAT_COMPLETED,
  EVENTS.WHATSAPP_OPENED,
]);

/**
 * Monetary value per event. Meta needs `value` and `currency` to be able to
 * optimize toward revenue and not just conversion volume. It comes from
 * `config/pricing.js`, so a price change carries through automatically.
 *
 * An event whose value depends on what the visitor chose — the training
 * format — doesn't fit in this table: the caller supplies it in
 * `params.value`.
 */
const EVENT_VALUE = {
  [EVENTS.AUDIT_REQUESTED]: (locale) => priceAmount("audit", locale),
};

// Active language. Injected by the app on every route change so it doesn't
// have to be passed by hand on every call: the endpoint requires it on every
// event, and forgetting it on just one breaks language segmentation.
let currentLocale = "es";

export function setAnalyticsLocale(locale) {
  currentLocale = locale;
}

/**
 * Unique identifier per event. The pixel and the Conversions API send the
 * same `eventID`, which is what Meta uses to avoid double-counting the same
 * conversion when it arrives through both paths.
 */
function newEventId() {
  if (isBrowser && window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `evt_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

/**
 * Event instant in seconds, which is the unit Meta expects.
 *
 * Travels alongside `event_id` so that both deliveries — pixel and server —
 * declare the same moment: the pair is what identifies the conversion within
 * the window Meta uses to look for duplicates.
 */
function eventTimestamp() {
  return Math.floor(Date.now() / 1000);
}

/** Sends the conversion to the server. Never blocks or breaks the interaction. */
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

  // `sendBeacon` survives the user navigating away right after converting,
  // which is exactly when these events tend to happen.
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
    /* measurement must never break the page */
  });
}

/**
 * Events fired before the visitor responded to the banner.
 *
 * Some events happen on mount — viewing a category, viewing the training
 * page —, and on a visit coming from an ad that always happens with the
 * banner still unanswered. Discarding them there lost them for good: on
 * accepting, only the page view got repeated, and the category view never
 * happened again because the component was already mounted. The result was
 * that the event never showed up in Events Manager for exactly the traffic
 * that matters to measure: paid traffic.
 *
 * They're stored with their original `event_id` and `event_time`, so when
 * sent they declare the real instant they happened, not the moment of the
 * "Accept" click. Nothing leaves here without acceptance: if the visitor
 * declines, the queue is dropped.
 */
const MAX_PENDING = 20;
let pending = [];

/** Sends to the providers. Only called once there's already consent. */
function dispatch(event, payload, eventId, eventTime) {
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

/** Flushes the queue after acceptance. */
function flushPending() {
  const queued = pending;
  pending = [];
  for (const item of queued) {
    dispatch(item.event, item.payload, item.eventId, item.eventTime);
  }
}

/**
 * Records an event across all configured providers.
 *
 * @param {string} event - one of the EVENTS constants
 * @param {Record<string, unknown>} [params] - context (service, location...)
 */
export function track(event, params = {}) {
  if (!isBrowser) return;

  const eventId = newEventId();
  const eventTime = eventTimestamp();
  // The currency travels with the value no matter where it came from: a
  // bare `value` with no `currency` gets interpreted by Meta in the
  // account's currency, not ours.
  const locale = params.locale ?? currentLocale;
  const value = params.value ?? EVENT_VALUE[event]?.(locale);
  const payload = {
    ...params,
    locale,
    // Currency follows the language: Spanish quotes in pesos and English in
    // dollars, and a value with no currency gets interpreted by Meta in the
    // account's currency.
    ...(value ? { value, currency: params.currency ?? currencyFor(locale) } : {}),
  };

  if (import.meta.env?.DEV) {
    console.debug("[analytics]", event, payload, eventId, hasConsent() ? "" : "(no consent)");
  }

  // The dataLayer is always fed: it's local, it never leaves the browser,
  // and without it GTM couldn't react once consent arrives later.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload, event_id: eventId });

  if (!hasConsent()) {
    // Only queued while the decision is still pending. An explicit `denied`
    // queues nothing: the visitor already said no. The cap keeps a long
    // session with an unanswered banner from accumulating memory without limit.
    if (readConsent() === null && pending.length < MAX_PENDING) {
      pending.push({ event, payload, eventId, eventTime });
    }
    return;
  }

  dispatch(event, payload, eventId, eventTime);
}

/** Page view. Called on every route change, not just on load. */
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

  // The page view is also duplicated across both channels, for the same
  // reasons: it's the event the pixel loses the most — it's the first thing
  // to load, and it's what blockers stop before anything else happens — and
  // it's what remarketing audiences rely on. It shares its identifier and
  // instant with the server-side delivery so Meta counts a single visit.
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
  // gtag needs `arguments`, so it can't be an arrow function.
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
}

function injectGa4(measurementId) {
  ensureGtag();
  // Default consent is declared before the library loads: declaring it
  // after means GA4 already sent its first hit.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });

  injectScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
  window.gtag("js", new Date());
  // We send the page_view ourselves on every route change: in an SPA the
  // automatic one would only fire on the first load.
  window.gtag("config", measurementId, { send_page_view: false });
}

function injectGtm(gtmId) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  injectScript(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`);
}

function injectMetaPixel(pixelId) {
  // Meta's official snippet, kept as-is so it stays recognizable.
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

  // No `consent revoke` call in front. That call used to exist to load the
  // library before asking and keep it silent until the response; now it
  // isn't loaded until there's a response, so it's unnecessary. And it isn't
  // harmless: queued ahead of `init`, the library aborts draining the queue
  // while processing it — it's left uninitialized, doesn't write `_fbp`, and
  // doesn't send a single event — which is exactly the silent failure this
  // file is trying to avoid.
  window.fbq("init", pixelId);
}

/**
 * Loads the pixel. Only called once there's consent.
 *
 * The library isn't requested until the visitor accepts. It used to always
 * load and stay in `revoke`, which blocks events but not the download:
 * requesting `fbevents.js` is already a connection to Meta that hands over
 * the IP and the page being viewed, and that's data processing — exactly
 * what the banner is asking about. Whoever declines generates not a single
 * request.
 *
 * Loading it here and not earlier doesn't cause any perceptible delay: the
 * script is async and the events that follow acceptance land in the pixel's
 * own queue, which drains as soon as the library finishes loading.
 *
 * This function being called only after acceptance is what the rest relies
 * on: with no pixel loaded there's nothing to revoke, which is why
 * `injectMetaPixel` initializes directly.
 */
function enableMetaPixel() {
  if (!ANALYTICS.metaPixelId) return;
  if (typeof window.fbq !== "function") injectMetaPixel(ANALYTICS.metaPixelId);
}

/** Activates whatever was waiting on consent. */
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
 * Prepares the configured providers without sending anything.
 *
 * Google loads with consent mode set to `denied`, which is the mechanism
 * Google itself defines for this case. The Meta pixel has no equivalent —
 * its `revoke` stops events, not the script download — so it isn't
 * requested until there's acceptance.
 *
 * In both cases the change applies the instant the visitor accepts, without
 * reloading the page.
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
      // After the page view and the pixel's `init`: whatever was waiting
      // gets sent over an already-initialized pixel, not a half-set-up one.
      flushPending();
      return;
    }

    // Explicit decline: whatever was queued is never sent and gets dropped.
    pending = [];
  });
}
