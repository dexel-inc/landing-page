import { buildSeo } from "./seo.js";

/**
 * Writes the active page's metadata to the `<head>`.
 *
 * Only runs in the browser and only matters when navigating within the SPA:
 * the HTML the server serves already comes with these same tags, generated
 * at build time from `buildSeo`. This function keeps them current when the
 * visitor changes route without reloading.
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
 * The `hreflang` tags get replaced wholesale instead of updated one by one:
 * there are few of them, and this way no alternate from the previous route
 * is left dangling.
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

  // With no structured data —the 404— the previous route's block gets
  // removed instead of left describing a page that's no longer being viewed.
  if (!data) {
    script?.remove();
    return;
  }

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

  if (seo.alternates.length) upsertCanonical(seo.canonical);
  replaceAlternates(seo.alternates);
  upsertJsonLd(seo.jsonLd);

  return seo;
}
