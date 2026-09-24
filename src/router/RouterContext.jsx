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
  routeKeyForAnchor,
} from "./routes.js";

const RouterContext = createContext(null);

const LOCALE_STORAGE_KEY = "dexel_locale";
const isBrowser = typeof window !== "undefined";

/** Stored language preference, or `null` if the visitor never chose one. */
function storedLocale() {
  if (!isBrowser) return null;
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return value === "es" || value === "en" ? value : null;
  } catch {
    // Safari in private mode throws when touching localStorage. Language
    // isn't a reason to crash the page.
    return null;
  }
}

function persistLocale(locale) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* without persistence, the language lasts only for the session */
  }
}

function resolveState(pathname) {
  const match = matchRoute(pathname);

  if (!match) {
    // Unknown route: a 404 is shown while keeping the URL. Redirecting to
    // home would hide the error and tell the search engine the page exists.
    // The language comes from the URL's prefix when there is one
    // (`/en/whatever`), and otherwise from the browser, so the 404 doesn't
    // always come back in Spanish.
    const prefix = normalizePathname(pathname).split("/")[1];
    const locale = LOCALES.includes(prefix)
      ? prefix
      : isBrowser
        ? detectBrowserLocale(navigator.languages ?? [navigator.language])
        : DEFAULT_LOCALE;

    return { path: normalizePathname(pathname), locale, routeKey: ROUTE_KEYS.NOT_FOUND };
  }

  // `/` serves the Spanish content so crawlers find HTML at the root. In the
  // browser it resolves right away to the URL with a language —the stored
  // one if the visitor picked one, and otherwise whatever the browser
  // says— so the tree doesn't mount twice.
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
 * @param {{initialPath?: string}} props `initialPath` is injected by
 *   prerendering, where `window.location` doesn't exist.
 */
export function RouterProvider({ children, initialPath }) {
  const [state, setState] = useState(() =>
    resolveState(initialPath ?? (isBrowser ? window.location.pathname : ROOT_PATH)),
  );

  // The effects (history and scroll) sit outside the state updater: React
  // can invoke it twice in strict mode, and doing it there left duplicate
  // history entries and a double scroll.
  const go = useCallback(
    (nextPath, { replace = false } = {}) => {
      const next = resolveState(nextPath);
      if (next.path === state.path) return;

      if (isBrowser) {
        window.history[replace ? "replaceState" : "pushState"]({}, "", next.path);
        // Instant jump, not `smooth`: with animated scrolling the new page
        // mounts while the scroll is still in progress, and the entrance
        // animations read everything the scroll passes over as "already
        // visible". The result was a page that appeared all at once, with
        // no animation at all.
        if (!replace) window.scrollTo({ top: 0, behavior: "auto" });
      }

      setState(next);
    },
    [state.path],
  );

  /** Navigates by page key, resolving the URL for the active language. */
  const navigateTo = useCallback(
    (routeKey, locale) => go(pathFor(routeKey, locale ?? state.locale)),
    [go, state.locale],
  );

  /** Switches language while staying on the same page. */
  const setLocale = useCallback(
    (nextLocale) => {
      persistLocale(nextLocale);
      go(pathFor(state.routeKey, nextLocale));
    },
    [go, state.routeKey],
  );

  // On entering through `/` the URL already got resolved to the right
  // language during the first render; here only the address bar gets
  // synced. It's a stateless effect, so it doesn't trigger a second render.
  useEffect(() => {
    if (!isBrowser || !state.cameFromRoot) return;
    window.history.replaceState({}, "", state.path);
  }, [state.cameFromRoot, state.path]);

  // Old links like `/es/servicios#automatizacion-e-integracion`: the anchor
  // no longer exists because every category has its own page. It's replaced
  // in history instead of pushing a new entry, so "back" leads to the
  // origin site and not back to the index.
  useEffect(() => {
    if (!isBrowser || state.routeKey !== ROUTE_KEYS.SERVICES) return;

    const target = routeKeyForAnchor(window.location.hash);
    if (target) go(pathFor(target, state.locale), { replace: true });
  }, [go, state.routeKey, state.locale]);

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
 * Internal link. Receives a page key (`services`, `audit`, ...) and
 * resolves the `href` for the active language, so the HTML crawlers see
 * carries the real localized URL and not a `#`.
 */
export function Link({ to, locale, children, onClick, ...props }) {
  const { navigate, pathFor: resolve } = useRouter();
  const href = resolve(to, locale);

  const handleClick = (event) => {
    // We respect ctrl/cmd-click and middle-click: opening in a new tab is a
    // basic expectation of any link.
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
