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
  AUDIT: "audit",
  CONTACT: "contact",
  PRIVACY: "privacy",
  /** No tiene URL propia: es lo que se muestra cuando ninguna ruta coincide. */
  NOT_FOUND: "notFound",
};

/** Ruta canónica de cada página por idioma. */
export const PATHS = {
  es: {
    home: "/es",
    services: "/es/servicios",
    audit: "/es/servicios/auditoria",
    contact: "/es/contacto",
    privacy: "/es/privacidad",
  },
  en: {
    home: "/en",
    services: "/en/services",
    audit: "/en/services/process-audit",
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
 * Sin coincidencia devuelve el idioma por defecto: la empresa es colombiana y
 * el tráfico pagado apunta a LATAM.
 */
export function detectBrowserLocale(languages) {
  const list = languages ?? [];

  for (const tag of list) {
    const base = String(tag).toLowerCase().split("-")[0];
    if (LOCALES.includes(base)) return base;
  }

  return DEFAULT_LOCALE;
}
