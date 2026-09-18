/**
 * Catalog prices, in one place and in both currencies.
 *
 * No component and no translation file should embed a figure: they all come
 * from here. Each service declares its price in pesos and in dollars, side
 * by side, so a repricing is a single edit and there's no temptation to
 * derive one currency from the other.
 *
 * The two lists are independent and commercial: there is **no**
 * exchange-rate conversion and no call to any currency API. A service's
 * price in pesos is not its price in dollars multiplied by anything.
 *
 * Amounts are declared as numbers so they can be reused in the JSON-LD
 * structured data, where `price` has to be numeric, not a formatted string.
 */

/** Currency per language: the Spanish site quotes in pesos; English, in dollars. */
export const CURRENCY_BY_LOCALE = { es: "COP", en: "USD" };

const DEFAULT_CURRENCY = "COP";

/**
 * All peso prices include 19% VAT. It's a business decision and a
 * differentiator against whoever publishes "+ VAT", so it's declared here
 * and the UI states it next to every figure. Dollar prices don't have
 * Colombian VAT applied and it isn't mentioned.
 */
export const VAT_INCLUDED = { COP: true, USD: false };

/** Base amount per service, per currency. */
export const PRICES = {
  audit: { COP: 1200000, USD: 450 },

  // The three generic automation packs. `automation` is the entry one: it's
  // the price shown on the category card and in the structured data. n8n
  // Workflows uses these three as-is, with no variant of its own, because
  // its scope per tier matches the generic pack.
  automation: { COP: 2090000, USD: 700 },
  automationAgent: { COP: 5390000, USD: 1800 },
  automationSystem: { COP: 10900000, USD: 3700 },

  // Prices of their own per automation front: each individual page charges
  // according to its own complexity, never the same amount as its siblings
  // (document reading isn't worth the same as a custom agent). The
  // entry → intermediate → full system ladder for each front follows the
  // same proportional jump (~2.3x and ~2x) already used by the generic
  // packs above, so no front ends up cheap at the entry level and
  // disproportionate at the full-system level, or the other way around.
  automatedReportsBasic: { COP: 1200000, USD: 400 },
  automatedReportsStandard: { COP: 2850000, USD: 950 },
  automatedReportsSystem: { COP: 5850000, USD: 1950 },

  documentReadingBasic: { COP: 1350000, USD: 450 },
  documentReadingStandard: { COP: 3150000, USD: 1050 },
  documentReadingSystem: { COP: 6450000, USD: 2150 },

  systemIntegrationBasic: { COP: 1500000, USD: 500 },
  systemIntegrationStandard: { COP: 3600000, USD: 1200 },
  systemIntegrationSystem: { COP: 7350000, USD: 2450 },

  whatsappBasic: { COP: 1950000, USD: 650 },
  whatsappAgent: { COP: 4800000, USD: 1600 },
  whatsappSystem: { COP: 9900000, USD: 3300 },

  // Custom Agents' entry level reuses `automationAgent`: a one-off custom
  // agent already is, by definition, what the generic pack calls "Custom
  // agent". The other two levels are their own and are the highest amounts
  // in the catalog, because a custom agent with several tools or a
  // multi-agent system is the most complex work the site offers.
  customAgentsStandard: { COP: 8700000, USD: 2900 },
  customAgentsSystem: { COP: 14100000, USD: 4700 },

  // Only shown inside the "Landing" tier's detail, never as the main price
  // of a card, in a summary, or in JSON-LD: opening with the lowest price
  // anchors the brand as a cheap provider.
  webPresenceLanding: { COP: 490000, USD: 160 },
  webPresence: { COP: 2090000, USD: 700 },
  webCatalog: { COP: 4290000, USD: 1430 },

  customTool: { COP: 1350000, USD: 450 },
  customSoftware: { COP: 2490000, USD: 830 },

  careBasic: { COP: 210000, USD: 70 },
  careStandard: { COP: 540000, USD: 180 },
  carePriority: { COP: 980000, USD: 330 },

  seoAudit: { COP: 1290000, USD: 430 },
  seoLocal: { COP: 790000, USD: 260 },
  seoGrowth: { COP: 1690000, USD: 560 },
  seoAuthority: { COP: 3490000, USD: 1160 },

  integration: { COP: 690000, USD: 230 },
  paymentGateway: { COP: 890000, USD: 300 },

  // Micropages is the cheapest entry price in the catalog: by design it
  // doesn't open any card or summary outside its own front and page.
  micropageEssential: { COP: 135000, USD: 45 },
  micropagePremium: { COP: 220000, USD: 75 },

  mentoringSession: { COP: 210000, USD: 70 },
  mentoringPack4: { COP: 760000, USD: 260 },
  trainingExecutive: { COP: 1590000, USD: 530 },
  trainingFull: { COP: 2990000, USD: 990 },
  trainingProgram: { COP: 5390000, USD: 1800 },
};

/** Maps a service id to its price amount, for JSON-LD and analytics. */
export const SERVICE_PRICE_KEY = {
  auditoria: "audit",
  automatizacion: "automation",
  "software-medida": "customSoftware",
  "presencia-web": "webPresence",
  mantenimiento: "careBasic",

  // Individual service pages from the web development hub.
  "sitios-web": "webPresence",
  "software-a-la-medida": "customSoftware",
  micropaginas: "micropageEssential",
  seo: "seoAudit",
  integraciones: "integration",
  "pasarelas-de-pago": "paymentGateway",
};

const LABELS = {
  es: { from: "Desde", perMonth: "/mes" },
  en: { from: "From", perMonth: "/month" },
};

/** Currency that corresponds to a given language. */
export function currencyFor(locale) {
  return CURRENCY_BY_LOCALE[locale] ?? DEFAULT_CURRENCY;
}

/** Numeric amount of a service in the language's currency. */
export function priceAmount(key, locale = "es") {
  return PRICES[key]?.[currencyFor(locale)] ?? null;
}

/**
 * Pesos with Colombian-style thousands separators —$1.200.000— and dollars
 * US-style —$1,500—. Each market misreads the other's format.
 */
function formatAmount(value, currency) {
  return `$${value.toLocaleString(currency === "COP" ? "es-CO" : "en-US")}`;
}

/**
 * Price ready to display. The currency label is always visible: without it
 * a Colombian visitor reads "$450" as pesos and a US visitor reads
 * "$1.200.000" as an impossible figure.
 *
 * @param {keyof PRICES} key
 * @param {"es"|"en"} locale
 * @param {{from?: boolean, perMonth?: boolean}} [options]
 */
export function formatPrice(key, locale = "es", { from = false, perMonth = false } = {}) {
  const labels = LABELS[locale] ?? LABELS.es;
  const currency = currencyFor(locale);
  const base = `${formatAmount(priceAmount(key, locale), currency)} ${currency}${
    perMonth ? labels.perMonth : ""
  }`;
  return from ? `${labels.from} ${base}` : base;
}

/** `true` when that language's prices are published with VAT included. */
export function pricesIncludeVat(locale) {
  return VAT_INCLUDED[currencyFor(locale)] ?? false;
}

/** Numeric amount of a service by its id. Returns `null` if it has no fixed price. */
export function priceAmountForService(serviceId, locale = "es") {
  const key = SERVICE_PRICE_KEY[serviceId];
  return key ? priceAmount(key, locale) : null;
}
