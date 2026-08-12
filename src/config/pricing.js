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
  automation: { COP: 2200000, USD: 850 },
  automationAgent: { COP: 5900000, USD: 2200 },
  automationSystem: { COP: 12900000, USD: 4500 },

  customSoftware: { COP: 3200000, USD: 1000 },
  webPresence: { COP: 950000, USD: 300 },
  // Solo se muestra dentro del detalle del nivel "Landing", nunca como precio
  // principal de una tarjeta, en un resumen ni en JSON-LD: abrir por el precio
  // más bajo ancla la marca como proveedor barato.
  webPresenceLanding: { COP: 350000, USD: 100 },
  maintenance: { COP: 450000, USD: 150 },

  trainingExecutive: { COP: 1800000, USD: 600 },
  trainingFull: { COP: 3500000, USD: 1200 },
};

/** Relaciona el id de servicio con su monto, para JSON-LD y medición. */
export const SERVICE_PRICE_KEY = {
  auditoria: "audit",
  automatizacion: "automation",
  "software-medida": "customSoftware",
  "presencia-web": "webPresence",
  mantenimiento: "maintenance",
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
