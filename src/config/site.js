/**
 * Site data needed by both the browser and prerendering.
 *
 * The origin has to be written out, not inferred from `window.location`:
 * when the HTML gets generated at build time there's no browser, and a
 * relative canonical URL or one pointing to `localhost` is worse than
 * having no canonical at all.
 */

const env = (key) => (typeof import.meta !== "undefined" ? import.meta.env?.[key] : undefined);

export const SITE_URL = (env("VITE_SITE_URL") ?? "https://www.dexel-inc.com").replace(/\/+$/, "");

export const SITE = {
  url: SITE_URL,
  name: "Dexel",
  legalName: "Dexel Digital Excellence",
  ogImage: `${SITE_URL}/img.png`,
  logo: `${SITE_URL}/img.png`,
  whatsapp: "573216558510",
  country: "CO",
};
