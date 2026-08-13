/**
 * Tabla de rutas localizadas.
 *
 * Cada página se identifica por una clave estable (`home`, `services`, ...)
 * independiente del idioma. La URL sí cambia por idioma, porque una ruta en
 * español que dice `/services` no la posiciona ningún buscador hispanohablante.
 *
 * La clave es lo que usan el router, el SEO y el selector de idioma: cambiar de
 * idioma es resolver la misma clave en el otro locale, no adivinar una traducción.
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
   * Formación para equipos. No es una categoría de servicio y por eso no entra en
   * `SERVICE_CATEGORIES`: los servicios son cosas que hacemos *para* el cliente
   * y la formación es algo que hacemos *con* él. Mezclarlas diluye las dos.
   */
  TRAINING: "training",
  CONTACT: "contact",
  PRIVACY: "privacy",
  /** No tiene URL propia: es lo que se muestra cuando ninguna ruta coincide. */
  NOT_FOUND: "notFound",
};

/**
 * Las tres categorías de servicio, en el orden en que se muestran en el menú y
 * en la página índice. Se declara aquí y no en la interfaz porque el menú, la
 * página índice, el SEO y la medición tienen que estar de acuerdo sobre cuáles
 * son y en qué orden van.
 */
export const SERVICE_CATEGORIES = [ROUTE_KEYS.WEB_DEV, ROUTE_KEYS.AUTOMATION, ROUTE_KEYS.AUDIT];

/** Ruta canónica de cada página por idioma. */
export const PATHS = {
  es: {
    home: "/es",
    services: "/es/servicios",
    webDev: "/es/servicios/desarrollo-web",
    automation: "/es/servicios/automatizacion",
    audit: "/es/servicios/auditoria",
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
    training: "/en/training",
    contact: "/en/contact",
    privacy: "/en/privacy",
  },
};

/**
 * `/` sirve el contenido del idioma por defecto en vez de redirigir en el
 * servidor: así los rastreadores y los previews de WhatsApp encuentran HTML
 * en la raíz. El canónico apunta a `/es`, que es la URL real.
 */
export const ROOT_PATH = "/";

/** Rutas viejas que ya pueden estar indexadas o compartidas por ahí. */
export const LEGACY_REDIRECTS = {
  "/servicios": PATHS.es.services,
  "/contacto": PATHS.es.contact,
  "/privacidad": PATHS.es.privacy,
  "/services": PATHS.en.services,
  "/contact": PATHS.en.contact,
  "/privacy": PATHS.en.privacy,
};

/**
 * Anclas de la antigua página única de servicios.
 *
 * Un `#hash` nunca llega al servidor, así que esto no se puede resolver con una
 * redirección de Vercel: lo aplica el router al montar, cuando la URL que
 * alguien abrió o compartió trae una de estas anclas.
 */
export const ANCHOR_REDIRECTS = {
  auditoria: ROUTE_KEYS.AUDIT,
  "process-audit": ROUTE_KEYS.AUDIT,
  "automatizacion-e-integracion": ROUTE_KEYS.AUTOMATION,
  "automation-and-integration": ROUTE_KEYS.AUTOMATION,
  "software-a-la-medida": ROUTE_KEYS.WEB_DEV,
  "custom-software": ROUTE_KEYS.WEB_DEV,
  "presencia-web": ROUTE_KEYS.WEB_DEV,
  "web-presence": ROUTE_KEYS.WEB_DEV,
  mantenimiento: ROUTE_KEYS.WEB_DEV,
  maintenance: ROUTE_KEYS.WEB_DEV,
};

/** Página de categoría a la que apunta un ancla vieja, o `null`. */
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

/** Quita la barra final y las barras repetidas, sin vaciar la raíz. */
export function normalizePathname(pathname) {
  if (!pathname) return ROOT_PATH;
  const clean = pathname.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
  return clean === "" ? ROOT_PATH : clean;
}

/**
 * Traduce una URL a `{ locale, routeKey }`.
 * Devuelve `null` cuando la ruta no existe, para que quien llame decida si
 * redirige, muestra un 404 o cae al inicio.
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
 * URL de una página en un idioma. `notFound` no tiene URL propia, así que
 * cambiar de idioma desde un 404 lleva al inicio en vez de a ninguna parte.
 */
export function pathFor(routeKey, locale) {
  const paths = PATHS[locale] ?? PATHS[DEFAULT_LOCALE];
  return paths[routeKey] ?? PATHS[DEFAULT_LOCALE][routeKey] ?? paths[ROUTE_KEYS.HOME];
}

/** Todas las URLs públicas, para prerenderizar y para el sitemap. */
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
 * Idioma preferido del navegador, limitado a los que el sitio realmente tiene.
 *
 * El orden es deliberado y el español es el respaldo, no el inglés: la empresa
 * es colombiana y el tráfico pagado apunta a LATAM.
 *
 * 1. Cualquier variante de español —`es`, `es-CO`, `es-419`…— resuelve a
 *    español, aunque no venga primera en la lista.
 * 2. Con cualquier otro idioma declarado —inglés, francés, portugués— resuelve
 *    a inglés, que es la versión internacional del sitio.
 * 3. Sin ninguna señal —un rastreador que no manda idioma— resuelve a español.
 *
 * Esto solo decide a dónde va quien entra por la raíz. Una URL con prefijo de
 * idioma jamás se redirige: `/en/services` sirve inglés aunque el navegador
 * pida español, porque si no la versión en inglés dejaría de indexarse.
 */
export function detectBrowserLocale(languages) {
  const list = (languages ?? []).map((tag) => String(tag).toLowerCase()).filter(Boolean);

  if (!list.length) return DEFAULT_LOCALE;
  if (list.some((tag) => tag === "es" || tag.startsWith("es-"))) return "es";

  return "en";
}
