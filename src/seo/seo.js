import { LOCALES, DEFAULT_LOCALE, ROUTE_KEYS, pathFor } from "../router/routes.js";
import { currencyFor, priceAmount, priceAmountForService } from "../config/pricing.js";
import { SITE } from "../config/site.js";
import { messages } from "../i18n/messages.js";

/**
 * SEO description of a page, computed without touching the DOM.
 *
 * The same function feeds two consumers: `applySeo` writes it to the
 * `<head>` when navigating on the client, and prerendering turns it into
 * tags inside the build's HTML. Keeping it separate from the DOM is what
 * lets a `curl` see the same metadata the browser sees.
 */

/** `copy.meta` key that corresponds to each page. */
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
  [ROUTE_KEYS.WHATSAPP_AUTOMATION]: "whatsappAutomation",
  [ROUTE_KEYS.CUSTOM_AGENTS]: "customAgents",
  [ROUTE_KEYS.N8N_WORKFLOWS]: "n8nWorkflows",
  [ROUTE_KEYS.SYSTEM_INTEGRATION]: "systemIntegration",
  [ROUTE_KEYS.AUTOMATED_REPORTS]: "automatedReports",
  [ROUTE_KEYS.DOCUMENT_READING]: "documentReading",
  [ROUTE_KEYS.CONTACT]: "contact",
  [ROUTE_KEYS.PRIVACY]: "privacy",
  [ROUTE_KEYS.NOT_FOUND]: "notFound",
};

/**
 * Key inside `copy.serviceDetails` for each individual service page —seven
 * from the web development hub, six from the automation hub—, in the same
 * order they're shown within each hub.
 */
const SERVICE_DETAIL_KEY = {
  [ROUTE_KEYS.WEBSITES]: "websites",
  [ROUTE_KEYS.CUSTOM_SOFTWARE]: "customSoftware",
  [ROUTE_KEYS.MICROPAGES]: "micropages",
  [ROUTE_KEYS.SEO]: "seo",
  [ROUTE_KEYS.INTEGRATIONS]: "integrations",
  [ROUTE_KEYS.PAYMENT_GATEWAYS]: "paymentGateways",
  [ROUTE_KEYS.MAINTENANCE]: "maintenanceDetail",
  [ROUTE_KEYS.WHATSAPP_AUTOMATION]: "whatsappAutomation",
  [ROUTE_KEYS.CUSTOM_AGENTS]: "customAgents",
  [ROUTE_KEYS.N8N_WORKFLOWS]: "n8nWorkflows",
  [ROUTE_KEYS.SYSTEM_INTEGRATION]: "systemIntegration",
  [ROUTE_KEYS.AUTOMATED_REPORTS]: "automatedReports",
  [ROUTE_KEYS.DOCUMENT_READING]: "documentReading",
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
 * One `Service` node per service, with its price.
 * The price comes from `config/pricing.js`, so a repricing and the
 * structured data can never drift apart.
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
              // The currency follows the page's language: pesos in Spanish,
              // dollars in English. They aren't the same figure converted.
              priceCurrency: currencyFor(locale),
              // Services are quoted "from": the published price is the
              // floor, not the final price, and declaring it this way
              // avoids promising a fixed figure in search results.
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
 * `Service` node for a category page.
 *
 * Unlike `serviceNodes`, which describes a catalog item within the index
 * page, this one describes the whole page: its `@id` is its own URL, and
 * the fronts go in as `hasOfferCatalog` so the search engine understands
 * that the category groups several services rather than being one with a
 * long name.
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
      // The published price is the floor, not the final price: declaring it
      // as a minimum avoids promising a fixed figure in search results.
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
 * `Service` node for an individual service page (websites, custom software,
 * micropages, SEO, integrations, payment gateways, maintenance). One
 * `Offer` per tier, with its own price: unlike `categoryServiceNode`, here
 * there isn't a single entry price but one tier per card.
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
 * `Course` node for the team training offering.
 *
 * Declared as a course and not a service because that's what it is: a
 * program with a syllabus and its instructor declared as an `Organization`.
 * Each fixed-price format goes in as a `CourseInstance` with its duration
 * and its offer; the custom program doesn't, because it has neither a
 * published duration nor a published price, and declaring it would mean
 * making one up.
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
      // The formats are 100% live and virtual.
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
 * @returns full `<head>` descriptor for that page
 */
export function buildSeo({ routeKey, locale, isRoot = false }) {
  const copy = messages[locale] ?? messages[DEFAULT_LOCALE];
  const metaKey = META_KEY[routeKey] ?? "home";

  const title = copy.meta[`${metaKey}Title`];
  const description = copy.meta[`${metaKey}Description`];

  // `/` serves the Spanish content, but that page's real URL is `/es`: the
  // canonical points there so it doesn't compete with itself.
  const canonical = absolute(pathFor(routeKey, locale));

  const alternates = LOCALES.map((alt) => ({
    hrefLang: alt,
    href: absolute(pathFor(routeKey, alt)),
  }));
  alternates.push({ hrefLang: "x-default", href: absolute(pathFor(routeKey, DEFAULT_LOCALE)) });

  // A 404 must not get indexed or declared canonical of anything: if it
  // does, the search engine ends up storing the error page as if it were content.
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
