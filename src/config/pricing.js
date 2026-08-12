/**
 * Precios del catálogo, en un solo lugar.
 *
 * Ningún componente ni archivo de traducción debe incrustar una cifra: todas
 * salen de aquí. El precio de la auditoría es el que más se va a iterar (se
 * ajusta por mercado), así que cambiarlo debe ser una sola edición en este
 * archivo y nada más.
 *
 * Los montos se declaran como números para poder reutilizarlos en los datos
 * estructurados JSON-LD, donde `price` tiene que ser numérico y no una cadena
 * con formato.
 */

export const CURRENCY = "USD";

/**
 * Mercados. La auditoría se cobra distinto según dónde esté el cliente:
 * LATAM $450, Estados Unidos $1,200–1,500. Cambiar `ACTIVE_MARKET` reprecia
 * la auditoría en todo el sitio, en ambos idiomas.
 */
export const MARKETS = {
  latam: { audit: 450 },
  us: { audit: 1200 },
};

export const ACTIVE_MARKET = "latam";

/** Monto base de cada servicio, en USD. */
export const PRICES = {
  audit: MARKETS[ACTIVE_MARKET].audit,
  automation: 1500,
  customSoftware: 1000,
  webPresence: 300,
  // Solo se muestra dentro del detalle del nivel "Landing", nunca como precio
  // principal de una tarjeta: abrir con $100 ancla la marca como proveedor barato.
  webPresenceLanding: 100,
  maintenance: 150,
  // ⚠️ Formación in-company: precios propuestos, pendientes de validar antes de
  // publicar. Están calibrados contra la referencia del mercado colombiano y
  // contra el precio de la auditoría; cambiarlos aquí los cambia en la página,
  // en los datos estructurados y en el valor que se manda a la medición.
  trainingExecutive: 600,
  trainingFull: 1200,
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

/** Separador de miles en formato estadounidense: $1,500, no $1.500. */
function formatAmount(value) {
  return `$${value.toLocaleString("en-US")}`;
}

/**
 * Precio listo para mostrar. La etiqueta "USD" va siempre visible en los dos
 * idiomas: sin ella, un visitante colombiano lee "$450" como pesos.
 *
 * @param {keyof PRICES} key
 * @param {"es"|"en"} locale
 * @param {{from?: boolean, perMonth?: boolean}} [options]
 */
export function formatPrice(key, locale = "es", { from = false, perMonth = false } = {}) {
  const labels = LABELS[locale] ?? LABELS.es;
  const base = `${formatAmount(PRICES[key])} ${CURRENCY}${perMonth ? labels.perMonth : ""}`;
  return from ? `${labels.from} ${base}` : base;
}

/** Monto numérico de un servicio por su id. Devuelve `null` si no tiene precio fijo. */
export function priceAmountForService(serviceId) {
  const key = SERVICE_PRICE_KEY[serviceId];
  return key ? PRICES[key] : null;
}
