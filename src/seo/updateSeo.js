function upsertMeta(name, content, isProperty = false) {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    if (isProperty) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function upsertJsonLd(data) {
  const id = "dexel-structured-data";
  let script = document.head.querySelector(`#${id}`);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function updateSeo({ path, copy, locale }) {
  const origin = window.location.origin;
  const normalizedPath = path === "/" ? "/" : path;
  const canonicalUrl = `${origin}${normalizedPath}`;

  const title =
    path === "/servicios"
      ? copy.meta.servicesTitle
      : path === "/contacto"
        ? copy.meta.contactTitle
        : copy.meta.homeTitle;

  const description =
    path === "/servicios"
      ? copy.meta.servicesDescription
      : path === "/contacto"
        ? copy.meta.contactDescription
        : copy.meta.homeDescription;

  document.title = title;
  document.documentElement.setAttribute("lang", locale);

  upsertMeta("description", description);
  upsertMeta("robots", "index,follow,max-image-preview:large");

  upsertMeta("og:type", copy.meta.type, true);
  upsertMeta("og:site_name", copy.meta.siteName, true);
  upsertMeta("og:title", title, true);
  upsertMeta("og:description", description, true);
  upsertMeta("og:url", canonicalUrl, true);

  upsertMeta("twitter:card", "summary_large_image");
  upsertMeta("twitter:title", title);
  upsertMeta("twitter:description", description);

  upsertLink("canonical", canonicalUrl);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: copy.meta.brand,
        url: origin,
        logo: `${origin}/src/assets/dexelFavicon.ico`,
      },
      {
        "@type": "WebSite",
        name: copy.meta.siteName,
        url: origin,
        inLanguage: locale,
        potentialAction: {
          "@type": "SearchAction",
          target: `${origin}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        name: title,
        url: canonicalUrl,
        description,
        inLanguage: locale,
      },
    ],
  };

  upsertJsonLd(structuredData);
}
