import { LOCALES, DEFAULT_LOCALE, ROUTE_KEYS, pathFor } from "../router/routes.js";
import { currencyFor, priceAmount, priceAmountForService } from "../config/pricing.js";
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
  [ROUTE_KEYS.WEB_DEV]: "webDev",
  [ROUTE_KEYS.AUTOMATION]: "automation",
  [ROUTE_KEYS.AUDIT]: "audit",
  [ROUTE_KEYS.TRAINING]: "training",
  [ROUTE_KEYS.WEBSITES]: "websites",
  [ROUTE_KEYS.CUSTOM_SOFTWARE]: "customSoftwareDetail",
  [ROUTE_KEYS.MICROPAGES]: "micropages",
  [ROUTE_KEYS.SEO]: "seoDetail",
  [ROUTE_KEYS.INTEGRATIONS]: "integrations",
  [ROUTE_KEYS.PAYMENT_GATEWAYS]: "paymentGateways",
  [ROUTE_KEYS.MAINTENANCE]: "maintenanceDetail",
  [ROUTE_KEYS.CONTACT]: "contact",
  [ROUTE_KEYS.PRIVACY]: "privacy",
  [ROUTE_KEYS.NOT_FOUND]: "notFound",
};

/**
 * Clave dentro de `copy.serviceDetails` para cada una de las siete páginas de
 * servicio individuales, en el mismo orden en que se muestran en el hub.
 */
const SERVICE_DETAIL_KEY = {
  [ROUTE_KEYS.WEBSITES]: "websites",
  [ROUTE_KEYS.CUSTOM_SOFTWARE]: "customSoftware",
  [ROUTE_KEYS.MICROPAGES]: "micropages",
  [ROUTE_KEYS.SEO]: "seo",
  [ROUTE_KEYS.INTEGRATIONS]: "integrations",
  [ROUTE_KEYS.PAYMENT_GATEWAYS]: "paymentGateways",
  [ROUTE_KEYS.MAINTENANCE]: "maintenanceDetail",
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
    const amount = priceAmountForService(item.id, locale);

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
              // La moneda sigue al idioma de la página: pesos en español,
              // dólares en inglés. No son la misma cifra convertida.
              priceCurrency: currencyFor(locale),
              // Los servicios se cotizan "desde": el precio publicado es el
              // piso, no el precio final, y declararlo así evita prometer una
              // cifra cerrada en los resultados de búsqueda.
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: amount,
                priceCurrency: currencyFor(locale),
              },
              availability: "https://schema.org/InStock",
              url: absolute(pathFor(ROUTE_KEYS.SERVICES, locale)),
            },
          }
        : {}),
    };
  });
}

function faqNode({ faqs }) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * Nodo `Service` de una página de categoría.
 *
 * A diferencia de `serviceNodes`, que describe un ítem del catálogo dentro de
 * la página índice, este describe la página completa: su `@id` es su propia
 * URL, y los frentes van como `hasOfferCatalog` para que el buscador entienda
 * que la categoría agrupa varios servicios y no es uno solo con nombre largo.
 */
function categoryServiceNode({ category, locale, routeKey, priceKey }) {
  const canonical = absolute(pathFor(routeKey, locale));
  const amount = priceAmount(priceKey, locale);

  return {
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: category.navLabel,
    description: category.subtitle,
    serviceType: category.navLabel,
    url: canonical,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: ["CO", "LATAM", "US"],
    inLanguage: locale,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: category.frontsTitle,
      itemListElement: category.fronts.map((front) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: front.name, description: front.text },
      })),
    },
    offers: {
      "@type": "Offer",
      price: amount,
      priceCurrency: currencyFor(locale),
      // El precio publicado es el piso, no el precio final: declararlo como
      // mínimo evita prometer una cifra cerrada en los resultados de búsqueda.
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: amount,
        priceCurrency: currencyFor(locale),
      },
      availability: "https://schema.org/InStock",
      url: canonical,
    },
  };
}

/**
 * Nodo `Service` de una página de servicio individual (sitios web, software a
 * la medida, micropáginas, SEO, integraciones, pasarelas de pago,
 * mantenimiento). Un `Offer` por nivel, con su propio precio: a diferencia de
 * `categoryServiceNode`, aquí no hay un solo precio de entrada sino un nivel
 * por tarjeta.
 */
function serviceDetailNode({ service, locale, canonical }) {
  return {
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: service.title,
    description: service.intro,
    serviceType: service.title,
    url: canonical,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: ["CO", "LATAM", "US"],
    inLanguage: locale,
    offers: service.tiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: priceAmount(tier.priceKey, locale),
      priceCurrency: currencyFor(locale),
      availability: "https://schema.org/InStock",
      url: canonical,
    })),
  };
}

/**
 * Nodo `Course` de la formación para equipos.
 *
 * Se declara como curso y no como servicio porque es lo que es: un programa con
 * temario y con quien lo dicta declarado como `Organization`. Cada formato de
 * precio cerrado entra como `CourseInstance` con su duración y su oferta; el
 * programa a la medida no, porque no tiene ni duración ni precio publicados y
 * declararlo sería inventarle uno.
 */
function trainingNode({ training, locale, canonical, description }) {
  const priced = training.formats.filter((format) => format.value);

  return {
    "@type": "Course",
    "@id": `${canonical}#course`,
    name: training.title,
    description,
    url: canonical,
    inLanguage: locale,
    provider: { "@id": `${SITE.url}/#organization` },
    teaches: training.blocks.map((block) => block.title),
    hasCourseInstance: priced.map((format) => ({
      "@type": "CourseInstance",
      name: format.name,
      // Los formatos son 100% virtuales en vivo.
      courseMode: ["online"],
      courseWorkload: format.workload,
      inLanguage: locale,
      offers: {
        "@type": "Offer",
        price: priceAmount(format.value, locale),
        priceCurrency: currencyFor(locale),
        availability: "https://schema.org/InStock",
        url: canonical,
      },
    })),
    offers: priced.map((format) => ({
      "@type": "Offer",
      name: format.name,
      price: priceAmount(format.value, locale),
      priceCurrency: currencyFor(locale),
      availability: "https://schema.org/InStock",
      url: canonical,
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

  if (routeKey === ROUTE_KEYS.WEB_DEV) {
    graph.push(
      categoryServiceNode({
        category: copy.categories.webDev,
        locale,
        routeKey,
        priceKey: "webPresence",
      }),
      faqNode(copy.categories.webDev),
    );
  }

  if (routeKey === ROUTE_KEYS.AUTOMATION) {
    graph.push(
      categoryServiceNode({
        category: copy.categories.automation,
        locale,
        routeKey,
        priceKey: "automation",
      }),
      faqNode(copy.categories.automation),
    );
  }

  if (routeKey === ROUTE_KEYS.AUDIT) {
    const audit = copy.services.items.find((item) => item.id === "auditoria");
    if (audit) graph.push(...serviceNodes({ items: [audit] }, locale));
    graph.push(faqNode(copy.audit));
  }

  if (routeKey === ROUTE_KEYS.TRAINING) {
    graph.push(
      trainingNode({ training: copy.training, locale, canonical, description }),
      faqNode(copy.training),
    );
  }

  if (routeKey === ROUTE_KEYS.HOME) {
    graph.push(...serviceNodes(copy.services, locale));
  }

  const serviceDetailKey = SERVICE_DETAIL_KEY[routeKey];
  if (serviceDetailKey) {
    const service = copy.serviceDetails[serviceDetailKey];
    graph.push(serviceDetailNode({ service, locale, canonical }), faqNode(service));
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
