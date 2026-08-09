import { LOCALES, DEFAULT_LOCALE, ROUTE_KEYS, pathFor } from "../router/routes.js";
import { priceAmountForService } from "../config/pricing.js";
import { SITE } from "../config/site.js";
import { messages } from "../i18n/messages.js";

/**
 * Descripción SEO de una página, calculada sin tocar el DOM.
 *
 * La misma función alimenta dos consumidores: `applySeo` la escribe en el
 * `<head>` al navegar en el cliente, y el prerenderizado la convierte en
 * etiquetas dentro del HTML del build. Separarla del DOM es lo que permite que
 * un `curl` vea los mismos metadatos que ve el navegador.
 */

/** Clave de `copy.meta` que corresponde a cada página. */
const META_KEY = {
  [ROUTE_KEYS.HOME]: "home",
  [ROUTE_KEYS.SERVICES]: "services",
  [ROUTE_KEYS.AUDIT]: "audit",
  [ROUTE_KEYS.CONTACT]: "contact",
  [ROUTE_KEYS.PRIVACY]: "privacy",
  [ROUTE_KEYS.NOT_FOUND]: "notFound",
};

function absolute(path) {
  return `${SITE.url}${path}`;
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: SITE.logo,
    address: { "@type": "PostalAddress", addressCountry: SITE.country },
    areaServed: ["CO", "LATAM", "US"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${SITE.whatsapp}`,
      availableLanguage: ["Spanish", "English"],
    },
  };
}

/**
 * Un nodo `Service` por servicio, con su precio.
 * El precio sale de `config/pricing.js`, así que reprecio y datos
 * estructurados no se pueden desincronizar.
 */
function serviceNodes(services, locale) {
  return services.items.map((item) => {
    const amount = priceAmountForService(item.id);

    return {
      "@type": "Service",
      "@id": `${SITE.url}${pathFor(ROUTE_KEYS.SERVICES, locale)}#${item.slug}`,
      name: item.title,
      description: item.desc,
      serviceType: item.title,
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: ["CO", "LATAM", "US"],
      inLanguage: locale,
      ...(amount
        ? {
            offers: {
              "@type": "Offer",
              price: amount,
              priceCurrency: "USD",
              // Los servicios se cotizan "desde": el precio publicado es el
              // piso, no el precio final, y declararlo así evita prometer una
              // cifra cerrada en los resultados de búsqueda.
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: amount,
                priceCurrency: "USD",
              },
              availability: "https://schema.org/InStock",
              url: absolute(pathFor(ROUTE_KEYS.SERVICES, locale)),
            },
          }
        : {}),
    };
  });
}

function faqNode(services) {
  return {
    "@type": "FAQPage",
    mainEntity: services.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function buildJsonLd({ routeKey, locale, copy, title, description, canonical }) {
  const graph = [
    organizationNode(),
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      publisher: { "@id": `${SITE.url}/#organization` },
      inLanguage: locale,
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      name: title,
      url: canonical,
      description,
      inLanguage: locale,
      isPartOf: { "@id": `${SITE.url}/#website` },
    },
  ];

  if (routeKey === ROUTE_KEYS.SERVICES) {
    graph.push(...serviceNodes(copy.services, locale), faqNode(copy.services));
  }

  if (routeKey === ROUTE_KEYS.AUDIT) {
    const audit = copy.services.items.find((item) => item.id === "auditoria");
    if (audit) graph.push(...serviceNodes({ items: [audit] }, locale));
  }

  if (routeKey === ROUTE_KEYS.HOME) {
    graph.push(...serviceNodes(copy.services, locale));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/**
 * @param {{routeKey: string, locale: string, isRoot?: boolean}} params
 * @returns descriptor completo del `<head>` de esa página
 */
export function buildSeo({ routeKey, locale, isRoot = false }) {
  const copy = messages[locale] ?? messages[DEFAULT_LOCALE];
  const metaKey = META_KEY[routeKey] ?? "home";

  const title = copy.meta[`${metaKey}Title`];
  const description = copy.meta[`${metaKey}Description`];

  // `/` sirve el contenido en español, pero la URL real de esa página es
  // `/es`: el canónico apunta allí para no competir consigo mismo.
  const canonical = absolute(pathFor(routeKey, locale));

  const alternates = LOCALES.map((alt) => ({
    hrefLang: alt,
    href: absolute(pathFor(routeKey, alt)),
  }));
  alternates.push({ hrefLang: "x-default", href: absolute(pathFor(routeKey, DEFAULT_LOCALE)) });

  // Un 404 no debe indexarse ni declararse canónico de nada: si lo hace, el
  // buscador termina guardando la página de error como si fuera contenido.
  const isNotFound = routeKey === ROUTE_KEYS.NOT_FOUND;

  return {
    lang: locale,
    title,
    description,
    canonical,
    alternates: isNotFound ? [] : alternates,
    robots: isNotFound ? "noindex,follow" : "index,follow,max-image-preview:large",
    og: {
      "og:type": copy.meta.type,
      "og:site_name": copy.meta.siteName,
      "og:title": title,
      "og:description": description,
      "og:url": canonical,
      "og:image": SITE.ogImage,
      "og:image:alt": copy.meta.siteName,
      "og:locale": locale === "es" ? "es_CO" : "en_US",
    },
    twitter: {
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": SITE.ogImage,
    },
    jsonLd: isNotFound ? null : buildJsonLd({ routeKey, locale, copy, title, description, canonical }),
    isRoot,
  };
}
