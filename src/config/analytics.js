/**
 * Identificadores de medición.
 *
 * El Pixel ID es público —viaja en el bundle del navegador de cualquier sitio
 * que lo use— así que lleva valor por defecto: el conjunto de datos `Dexel Web`
 * ya existe y no queremos que la medición dependa de que alguien recuerde
 * configurar una variable en Vercel. Todo lo demás sí queda vacío por defecto.
 *
 * El token de la Conversions API NO está aquí: es una credencial de servidor y
 * vive únicamente en `process.env` de la función serverless.
 */

const env = (key) => (typeof import.meta !== "undefined" ? import.meta.env?.[key] : undefined);

/** Conjunto de datos `Dexel Web` en el Administrador de Eventos de Meta. */
export const DEFAULT_META_PIXEL_ID = "1065161589428764";

export const ANALYTICS = {
  metaPixelId: env("VITE_META_PIXEL_ID") || DEFAULT_META_PIXEL_ID,
  ga4Id: env("VITE_GA4_ID") || "",
  gtmId: env("VITE_GTM_ID") || "",
  capiEndpoint: env("VITE_META_CAPI_ENDPOINT") || "/api/meta-capi",
};
