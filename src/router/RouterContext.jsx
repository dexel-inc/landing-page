import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  ROOT_PATH,
  ROUTE_KEYS,
  detectBrowserLocale,
  matchRoute,
  normalizePathname,
  pathFor,
} from "./routes.js";

const RouterContext = createContext(null);

const LOCALE_STORAGE_KEY = "dexel_locale";
const isBrowser = typeof window !== "undefined";

/** Preferencia de idioma guardada, o `null` si el visitante nunca eligió. */
function storedLocale() {
  if (!isBrowser) return null;
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return value === "es" || value === "en" ? value : null;
  } catch {
    // Safari en modo privado lanza al tocar localStorage. El idioma no es
    // motivo para tumbar la página.
    return null;
  }
}

function persistLocale(locale) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* sin persistencia, el idioma dura lo que dura la sesión */
  }
}

function resolveState(pathname) {
  const match = matchRoute(pathname);

  if (!match) {
    // Ruta desconocida: se muestra un 404 conservando la URL. Redirigir al
    // inicio escondería el error y le diría al buscador que la página existe.
    // El idioma sale del prefijo de la URL cuando lo hay (`/en/lo-que-sea`),
    // y si no del navegador, para que el 404 no llegue siempre en español.
    const prefix = normalizePathname(pathname).split("/")[1];
    const locale = LOCALES.includes(prefix)
      ? prefix
      : isBrowser
        ? detectBrowserLocale(navigator.languages ?? [navigator.language])
        : DEFAULT_LOCALE;

    return { path: normalizePathname(pathname), locale, routeKey: ROUTE_KEYS.NOT_FOUND };
  }

  // `/` sirve el contenido en español para que los rastreadores encuentren
  // HTML en la raíz. En el navegador se resuelve de una vez a la URL con
  // idioma —la guardada si el visitante eligió alguna, y si no la que dice su
  // navegador— para no montar el árbol dos veces.
  if (match.isRoot && isBrowser) {
    const preferred =
      storedLocale() ?? detectBrowserLocale(navigator.languages ?? [navigator.language]);
    return {
      path: pathFor(ROUTE_KEYS.HOME, preferred),
      locale: preferred,
      routeKey: ROUTE_KEYS.HOME,
      cameFromRoot: true,
    };
  }

  return {
    path: match.redirectTo ?? normalizePathname(pathname),
    locale: match.locale,
    routeKey: match.routeKey,
  };
}

/**
 * @param {{initialPath?: string}} props `initialPath` lo inyecta el
 *   prerenderizado, donde no existe `window.location`.
 */
export function RouterProvider({ children, initialPath }) {
  const [state, setState] = useState(() =>
    resolveState(initialPath ?? (isBrowser ? window.location.pathname : ROOT_PATH)),
  );

  // Los efectos (historial y scroll) van fuera del updater de estado: React
  // puede invocarlo dos veces en modo estricto, y hacerlo allí dejaba entradas
  // duplicadas en el historial y un doble scroll.
  const go = useCallback(
    (nextPath, { replace = false } = {}) => {
      const next = resolveState(nextPath);
      if (next.path === state.path) return;

      if (isBrowser) {
        window.history[replace ? "replaceState" : "pushState"]({}, "", next.path);
        if (!replace) window.scrollTo({ top: 0, behavior: "smooth" });
      }

      setState(next);
    },
    [state.path],
  );

  /** Navega por clave de página, resolviendo la URL del idioma activo. */
  const navigateTo = useCallback(
    (routeKey, locale) => go(pathFor(routeKey, locale ?? state.locale)),
    [go, state.locale],
  );

  /** Cambia de idioma quedándose en la misma página. */
  const setLocale = useCallback(
    (nextLocale) => {
      persistLocale(nextLocale);
      go(pathFor(state.routeKey, nextLocale));
    },
    [go, state.routeKey],
  );

  // Al entrar por `/` la URL ya se resolvió al idioma correcto durante el
  // primer render; aquí solo se sincroniza la barra de direcciones. Es un
  // efecto sin estado, así que no provoca un segundo render.
  useEffect(() => {
    if (!isBrowser || !state.cameFromRoot) return;
    window.history.replaceState({}, "", state.path);
  }, [state.cameFromRoot, state.path]);

  useEffect(() => {
    if (!isBrowser) return;

    const onPopState = () => setState(resolveState(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const value = useMemo(
    () => ({
      path: state.path,
      locale: state.locale,
      routeKey: state.routeKey,
      navigate: go,
      navigateTo,
      setLocale,
      pathFor: (routeKey, locale) => pathFor(routeKey, locale ?? state.locale),
    }),
    [state, go, navigateTo, setLocale],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within RouterProvider");
  }
  return context;
}

/**
 * Enlace interno. Recibe una clave de página (`services`, `audit`, ...) y
 * resuelve el `href` del idioma activo, de modo que el HTML que ven los
 * rastreadores lleve la URL localizada real y no un `#`.
 */
export function Link({ to, locale, children, onClick, ...props }) {
  const { navigate, pathFor: resolve } = useRouter();
  const href = resolve(to, locale);

  const handleClick = (event) => {
    // Respetamos ctrl/cmd-clic y clic con rueda: abrir en pestaña nueva es
    // una expectativa básica de cualquier enlace.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

    event.preventDefault();
    onClick?.(event);
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
