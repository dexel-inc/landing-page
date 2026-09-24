import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import App from "./App.jsx";
import { I18nProvider } from "./i18n/I18nContext.jsx";
import { RouterProvider } from "./router/RouterContext.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";
import { buildSeo } from "./seo/seo.js";
import { allRoutes, DEFAULT_LOCALE, ROUTE_KEYS } from "./router/routes.js";
import { SITE } from "./config/site.js";

/**
 * Server-rendering entry point, used only during the build.
 *
 * `renderToStaticMarkup` instead of `renderToString` because the client
 * doesn't hydrate: it remounts the tree from scratch. The generated HTML
 * exists so that crawlers, WhatsApp previews, and anyone browsing without
 * JavaScript see the real content, not an empty `<div id="root">`.
 *
 * Nothing rendered here can touch `window`, `document`, or WebGL. The
 * providers are written to tolerate that and the 3D background loads
 * lazily, so it never actually gets imported in Node.
 */
export function render(path) {
  return renderToStaticMarkup(
    <ThemeProvider>
      <RouterProvider initialPath={path}>
        <I18nProvider>
          <App />
        </I18nProvider>
      </RouterProvider>
    </ThemeProvider>,
  );
}

export { buildSeo, allRoutes, SITE, ROUTE_KEYS, DEFAULT_LOCALE };
