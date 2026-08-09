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
 * Entrada de renderizado en servidor, usada solo durante el build.
 *
 * `renderToStaticMarkup` en vez de `renderToString` porque el cliente no
 * hidrata: vuelve a montar el árbol. El HTML generado existe para que los
 * rastreadores, los previews de WhatsApp y quien navegue sin JavaScript vean
 * el contenido real, no un `<div id="root">` vacío.
 *
 * Nada de lo que se renderiza aquí puede tocar `window`, `document` ni WebGL.
 * Los proveedores están escritos para tolerarlo y el fondo 3D se carga de
 * forma diferida, así que nunca llega a importarse en Node.
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
