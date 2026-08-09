/**
 * Datos del sitio que necesitan tanto el navegador como el prerenderizado.
 *
 * El origen tiene que estar escrito, no deducido de `window.location`: cuando
 * el HTML se genera en el build no hay navegador, y una URL canónica relativa
 * o apuntando a `localhost` es peor que no tener canónica.
 */

const env = (key) => (typeof import.meta !== "undefined" ? import.meta.env?.[key] : undefined);

export const SITE_URL = (env("VITE_SITE_URL") ?? "https://www.dexel-inc.com").replace(/\/+$/, "");

export const SITE = {
  url: SITE_URL,
  name: "Dexel",
  legalName: "Dexel Digital Excellence",
  ogImage: `${SITE_URL}/img.png`,
  logo: `${SITE_URL}/img.png`,
  whatsapp: "573135632235",
  country: "CO",
};
