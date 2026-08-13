/**
 * Precios del catálogo, en un solo lugar y en las dos monedas.
 *
 * Ningún componente ni archivo de traducción debe incrustar una cifra: todas
 * salen de aquí. Cada servicio declara su precio en pesos y en dólares, uno al
 * lado del otro, para que repreciar sea una sola edición y para que no exista
 * la tentación de derivar una moneda de la otra.
 *
 * Las dos listas son independientes y comerciales: **no** hay conversión por
 * tasa de cambio ni consulta a ninguna API de divisas. El precio en pesos de un
 * servicio no es el precio en dólares multiplicado por nada.
 *
 * Los montos se declaran como números para poder reutilizarlos en los datos
 * estructurados JSON-LD, donde `price` tiene que ser numérico y no una cadena
 * con formato.
 */

/** Moneda de cada idioma: el sitio en español cotiza en pesos; el inglés, en dólares. */
export const CURRENCY_BY_LOCALE = { es: "COP", en: "USD" };

const DEFAULT_CURRENCY = "COP";

/**
 * Todos los precios en pesos incluyen IVA del 19%. Es una decisión comercial y
 * un diferenciador frente a quien publica "+ IVA", así que se declara aquí y la
 * interfaz lo dice junto a cada cifra. En dólares no aplica IVA colombiano y no
 * se menciona.
 */
export const VAT_INCLUDED = { COP: true, USD: false };

/** Monto base de cada servicio, por moneda. */
export const PRICES = {
  audit: { COP: 1200000, USD: 450 },

  // Los tres packs de automatización. `automation` es el de entrada: es el
  // precio que muestran la tarjeta de la categoría y los datos estructurados.
  automation: { COP: 2090000, USD: 700 },
  automationAgent: { COP: 5390000, USD: 1800 },
  automationSystem: { COP: 10900000, USD: 3700 },

  // Solo se muestra dentro del detalle del nivel "Landing", nunca como precio
  // principal de una tarjeta, en un resumen ni en JSON-LD: abrir por el precio
  // más bajo ancla la marca como proveedor barato.
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

  // Micropáginas es el precio de entrada más barato del catálogo: por diseño
  // no abre ninguna tarjeta ni resumen fuera de su propio frente y página.
  micropageEssential: { COP: 135000, USD: 45 },
  micropagePremium: { COP: 220000, USD: 75 },

  mentoringSession: { COP: 210000, USD: 70 },
  mentoringPack4: { COP: 760000, USD: 260 },
  trainingExecutive: { COP: 1590000, USD: 530 },
  trainingFull: { COP: 2990000, USD: 990 },
  trainingProgram: { COP: 5390000, USD: 1800 },
};

/** Relaciona el id de servicio con su monto, para JSON-LD y medición. */
export const SERVICE_PRICE_KEY = {
  auditoria: "audit",
  automatizacion: "automation",
  "software-medida": "customSoftware",
  "presencia-web": "webPresence",
  mantenimiento: "careBasic",
};

const LABELS = {
  es: { from: "Desde", perMonth: "/mes" },
  en: { from: "From", perMonth: "/month" },
};

/** Moneda que corresponde a un idioma. */
export function currencyFor(locale) {
  return CURRENCY_BY_LOCALE[locale] ?? DEFAULT_CURRENCY;
}

/** Monto numérico de un servicio en la moneda del idioma. */
export function priceAmount(key, locale = "es") {
  return PRICES[key]?.[currencyFor(locale)] ?? null;
}

/**
 * Pesos con separador de miles a la colombiana —$1.200.000— y dólares a la
 * estadounidense —$1,500—. Cada mercado lee mal el formato del otro.
 */
function formatAmount(value, currency) {
  return `$${value.toLocaleString(currency === "COP" ? "es-CO" : "en-US")}`;
}

/**
 * Precio listo para mostrar. La etiqueta de moneda va siempre visible: sin ella
 * un visitante colombiano lee "$450" como pesos y uno estadounidense lee
 * "$1.200.000" como una cifra imposible.
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

/** `true` cuando los precios de ese idioma se publican con IVA incluido. */
export function pricesIncludeVat(locale) {
  return VAT_INCLUDED[currencyFor(locale)] ?? false;
}

/** Monto numérico de un servicio por su id. Devuelve `null` si no tiene precio fijo. */
export function priceAmountForService(serviceId, locale = "es") {
  const key = SERVICE_PRICE_KEY[serviceId];
  return key ? priceAmount(key, locale) : null;
}
