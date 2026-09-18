/**
 * Measurement identifiers.
 *
 * The Pixel ID is public —it travels in the browser bundle of any site that
 * uses it— so it carries a default value: the `Dexel Web` dataset already
 * exists and we don't want measurement to depend on someone remembering to
 * set a variable in Vercel. Everything else does default to empty.
 *
 * The Conversions API token is NOT here: it's a server credential and lives
 * only in the serverless function's `process.env`.
 */

const env = (key) => (typeof import.meta !== "undefined" ? import.meta.env?.[key] : undefined);

/** `Dexel Web` dataset in Meta's Events Manager. */
export const DEFAULT_META_PIXEL_ID = "1065161589428764";

export const ANALYTICS = {
  metaPixelId: env("VITE_META_PIXEL_ID") || DEFAULT_META_PIXEL_ID,
  ga4Id: env("VITE_GA4_ID") || "",
  gtmId: env("VITE_GTM_ID") || "",
  capiEndpoint: env("VITE_META_CAPI_ENDPOINT") || "/api/meta-capi",
};
