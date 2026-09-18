/**
 * Localized route table.
 *
 * Each page is identified by a stable key (`home`, `services`, ...)
 * independent of the language. The URL does change per language, because a
 * Spanish route that reads `/services` won't rank with any Spanish-speaking
 * search engine.
 *
 * The key is what the router, SEO, and the language switcher all use:
 * switching language means resolving the same key in the other locale, not
 * guessing a translation.
 */

export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";

export const ROUTE_KEYS = {
  HOME: "home",
  SERVICES: "services",
  WEB_DEV: "webDev",
  AUTOMATION: "automation",
  AUDIT: "audit",
  /**
   * Training for teams. It isn't a service category, which is why it isn't
   * in `SERVICE_CATEGORIES`: services are things we do *for* the client and
   * training is something we do *with* them. Mixing them dilutes both.
   */
  TRAINING: "training",
  /**
   * Individual service pages, children of the web development hub. They
   * aren't in `SERVICE_CATEGORIES`: that list stays the three categories,
   * and these seven are content *inside* one of them.
   */
  WEBSITES: "websites",
  CUSTOM_SOFTWARE: "customSoftware",
  MICROPAGES: "micropages",
  SEO: "seo",
  INTEGRATIONS: "integrations",
  PAYMENT_GATEWAYS: "paymentGateways",
  MAINTENANCE: "maintenance",
  /**
   * Individual service pages, children of the automation hub. Same
   * criterion as the seven web development ones: they aren't in
   * `SERVICE_CATEGORIES`, they're content *inside* the category.
   *
   * `SYSTEM_INTEGRATION` is a different key from `INTEGRATIONS`: the latter
   * is connecting a new build with what already exists, the former is
   * connecting systems that already exist with each other. They sound
   * similar and are different offerings, which is why they don't share a
   * key or a route.
   */
  WHATSAPP_AUTOMATION: "whatsappAutomation",
  CUSTOM_AGENTS: "customAgents",
  N8N_WORKFLOWS: "n8nWorkflows",
  SYSTEM_INTEGRATION: "systemIntegration",
  AUTOMATED_REPORTS: "automatedReports",
  DOCUMENT_READING: "documentReading",
  CONTACT: "contact",
  PRIVACY: "privacy",
  /** Has no URL of its own: it's what shows when no route matches. */
  NOT_FOUND: "notFound",
};

/**
 * The three service categories, in the order they're shown in the menu and
 * on the index page. Declared here and not in the UI because the menu, the
 * index page, SEO, and analytics all need to agree on which ones there are
 * and in what order.
 */
export const SERVICE_CATEGORIES = [ROUTE_KEYS.WEB_DEV, ROUTE_KEYS.AUTOMATION, ROUTE_KEYS.AUDIT];

/** Canonical route for each page, per language. */
export const PATHS = {
  es: {
    home: "/es",
    services: "/es/servicios",
    webDev: "/es/servicios/desarrollo-web",
    automation: "/es/servicios/automatizacion",
    audit: "/es/servicios/auditoria",
    websites: "/es/servicios/desarrollo-web/sitios-web",
    customSoftware: "/es/servicios/desarrollo-web/software-a-la-medida",
    micropages: "/es/servicios/desarrollo-web/micropaginas",
    seo: "/es/servicios/desarrollo-web/seo",
    integrations: "/es/servicios/desarrollo-web/integraciones",
    paymentGateways: "/es/servicios/desarrollo-web/pasarelas-de-pago",
    maintenance: "/es/servicios/desarrollo-web/mantenimiento",
    whatsappAutomation: "/es/servicios/automatizacion/atencion-whatsapp",
    customAgents: "/es/servicios/automatizacion/agentes-a-la-medida",
    n8nWorkflows: "/es/servicios/automatizacion/workflows-n8n",
    systemIntegration: "/es/servicios/automatizacion/integracion-de-sistemas",
    automatedReports: "/es/servicios/automatizacion/reportes-automaticos",
    documentReading: "/es/servicios/automatizacion/lectura-de-documentos",
    training: "/es/formacion",
    contact: "/es/contacto",
    privacy: "/es/privacidad",
  },
  en: {
    home: "/en",
    services: "/en/services",
    webDev: "/en/services/web-development",
    automation: "/en/services/automation",
    audit: "/en/services/process-audit",
    websites: "/en/services/web-development/websites",
    customSoftware: "/en/services/web-development/custom-software",
    micropages: "/en/services/web-development/micropages",
    seo: "/en/services/web-development/seo",
    integrations: "/en/services/web-development/integrations",
    paymentGateways: "/en/services/web-development/payment-gateways",
    maintenance: "/en/services/web-development/maintenance",
    whatsappAutomation: "/en/services/automation/whatsapp-support",
    customAgents: "/en/services/automation/custom-agents",
    n8nWorkflows: "/en/services/automation/n8n-workflows",
    systemIntegration: "/en/services/automation/system-integration",
    automatedReports: "/en/services/automation/automated-reports",
    documentReading: "/en/services/automation/document-reading",
    training: "/en/training",
    contact: "/en/contact",
    privacy: "/en/privacy",
  },
};

/**
 * `/` serves the default language's content instead of redirecting on the
 * server: that way crawlers and WhatsApp previews find HTML at the root.
 * The canonical points to `/es`, which is the real URL.
 */
export const ROOT_PATH = "/";

/** Old routes that may already be indexed or shared out there. */
export const LEGACY_REDIRECTS = {
  "/servicios": PATHS.es.services,
  "/contacto": PATHS.es.contact,
  "/privacidad": PATHS.es.privacy,
  "/services": PATHS.en.services,
  "/contact": PATHS.en.contact,
  "/privacy": PATHS.en.privacy,
};

/**
 * Anchors from the old single-page services layout.
 *
 * A `#hash` never reaches the server, so this can't be resolved with a
 * Vercel redirect: the router applies it on mount, when the URL someone
 * opened or shared carries one of these anchors.
 */
export const ANCHOR_REDIRECTS = {
  auditoria: ROUTE_KEYS.AUDIT,
  "process-audit": ROUTE_KEYS.AUDIT,
  "automatizacion-e-integracion": ROUTE_KEYS.AUTOMATION,
  "automation-and-integration": ROUTE_KEYS.AUTOMATION,
  "software-a-la-medida": ROUTE_KEYS.CUSTOM_SOFTWARE,
  "custom-software": ROUTE_KEYS.CUSTOM_SOFTWARE,
  "presencia-web": ROUTE_KEYS.WEB_DEV,
  "web-presence": ROUTE_KEYS.WEB_DEV,
  mantenimiento: ROUTE_KEYS.MAINTENANCE,
  maintenance: ROUTE_KEYS.MAINTENANCE,
};

/** Category page an old anchor points to, or `null`. */
export function routeKeyForAnchor(hash) {
  if (!hash) return null;
  return ANCHOR_REDIRECTS[String(hash).replace(/^#/, "")] ?? null;
}

const lookup = new Map();
for (const locale of LOCALES) {
  for (const [key, path] of Object.entries(PATHS[locale])) {
    lookup.set(path, { locale, routeKey: key });
  }
}

/** Strips the trailing slash and repeated slashes, without emptying the root. */
export function normalizePathname(pathname) {
  if (!pathname) return ROOT_PATH;
  const clean = pathname.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
  return clean === "" ? ROOT_PATH : clean;
}

/**
 * Resolves a URL to `{ locale, routeKey }`.
 * Returns `null` when the route doesn't exist, so the caller decides
 * whether to redirect, show a 404, or fall back to home.
 */
export function matchRoute(pathname) {
  const clean = normalizePathname(pathname);

  if (clean === ROOT_PATH) {
    return { locale: DEFAULT_LOCALE, routeKey: ROUTE_KEYS.HOME, isRoot: true };
  }

  const legacy = LEGACY_REDIRECTS[clean];
  if (legacy) {
    return { ...lookup.get(legacy), redirectTo: legacy };
  }

  return lookup.get(clean) ?? null;
}

/**
 * URL of a page in a given language. `notFound` has no URL of its own, so
 * switching language from a 404 leads to home instead of nowhere.
 */
export function pathFor(routeKey, locale) {
  const paths = PATHS[locale] ?? PATHS[DEFAULT_LOCALE];
  return paths[routeKey] ?? PATHS[DEFAULT_LOCALE][routeKey] ?? paths[ROUTE_KEYS.HOME];
}

/** All public URLs, for prerendering and for the sitemap. */
export function allRoutes() {
  const routes = [{ path: ROOT_PATH, locale: DEFAULT_LOCALE, routeKey: ROUTE_KEYS.HOME, isRoot: true }];

  for (const locale of LOCALES) {
    for (const [routeKey, path] of Object.entries(PATHS[locale])) {
      routes.push({ path, locale, routeKey });
    }
  }

  return routes;
}

/**
 * Browser's preferred language, limited to the ones the site actually has.
 *
 * The order is deliberate and Spanish is the fallback, not English: the
 * company is Colombian and paid traffic targets LATAM.
 *
 * 1. Any Spanish variant —`es`, `es-CO`, `es-419`…— resolves to Spanish,
 *    even if it isn't first in the list.
 * 2. With any other declared language —English, French, Portuguese— it
 *    resolves to English, which is the site's international version.
 * 3. With no signal at all —a crawler that sends no language— it resolves
 *    to Spanish.
 *
 * This only decides where someone entering through the root goes. A URL with
 * a language prefix is never redirected: `/en/services` serves English even
 * if the browser asks for Spanish, because otherwise the English version
 * would stop getting indexed.
 */
export function detectBrowserLocale(languages) {
  const list = (languages ?? []).map((tag) => String(tag).toLowerCase()).filter(Boolean);

  if (!list.length) return DEFAULT_LOCALE;
  if (list.some((tag) => tag === "es" || tag.startsWith("es-"))) return "es";

  return "en";
}
