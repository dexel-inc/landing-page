import { buildSeo } from "./seo.js";

/**
 * Escribe en el `<head>` los metadatos de la página activa.
 *
 * Solo corre en el navegador y solo importa al navegar dentro de la SPA: el
 * HTML que sirve el servidor ya viene con estas mismas etiquetas, generadas en
 * el build a partir de `buildSeo`. Esta función las mantiene al día cuando el
 * visitante cambia de ruta sin recargar.
 */

const MANAGED = "data-dexel-seo";

function upsertMeta(attr, name, content) {
  let element = document.head.querySelector(`meta[${attr}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, name);
    element.setAttribute(MANAGED, "");
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    element.setAttribute(MANAGED, "");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

/**
 * Los `hreflang` se reemplazan enteros en vez de actualizarse uno por uno:
 * son pocos y así no queda ningún alterno de la ruta anterior colgando.
 */
function replaceAlternates(alternates) {
  document.head.querySelectorAll('link[rel="alternate"]').forEach((node) => node.remove());

  for (const alternate of alternates) {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", alternate.hrefLang);
    link.setAttribute("href", alternate.href);
    link.setAttribute(MANAGED, "");
    document.head.appendChild(link);
  }
}

function upsertJsonLd(data) {
  const id = "dexel-structured-data";
  let script = document.head.querySelector(`script#${id}`);

  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export function updateSeo({ routeKey, locale }) {
  if (typeof document === "undefined") return;

  const seo = buildSeo({ routeKey, locale });

  document.title = seo.title;
  document.documentElement.setAttribute("lang", seo.lang);

  upsertMeta("name", "description", seo.description);
  upsertMeta("name", "robots", seo.robots);

  for (const [property, content] of Object.entries(seo.og)) {
    upsertMeta("property", property, content);
  }

  for (const [name, content] of Object.entries(seo.twitter)) {
    upsertMeta("name", name, content);
  }

  upsertCanonical(seo.canonical);
  replaceAlternates(seo.alternates);
  upsertJsonLd(seo.jsonLd);

  return seo;
}
