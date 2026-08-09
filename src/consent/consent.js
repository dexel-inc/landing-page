/**
 * Consentimiento de cookies analíticas y publicitarias.
 *
 * El sitio recoge datos de navegación y los envía a Meta y a Google, así que
 * bajo la Ley 1581 de 2012 hace falta una autorización previa e informada. Este
 * módulo es la única fuente de verdad de esa decisión: el banner la escribe, la
 * capa de medición la lee, y nadie más toca `localStorage`.
 *
 * Estados posibles:
 *   null       el visitante todavía no decidió → se muestra el banner
 *   "granted"  aceptó → se activan pixel, Conversions API y GA4
 *   "denied"   rechazó → no se envía nada y no se vuelve a preguntar
 */

const STORAGE_KEY = "dexel_consent";
const isBrowser = typeof window !== "undefined";

export const CONSENT = { GRANTED: "granted", DENIED: "denied" };

const listeners = new Set();

/** @returns {"granted"|"denied"|null} */
export function readConsent() {
  if (!isBrowser) return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === CONSENT.GRANTED || value === CONSENT.DENIED ? value : null;
  } catch {
    // Safari en modo privado lanza al tocar localStorage. Sin poder recordar la
    // decisión, lo seguro es asumir que no hay consentimiento.
    return null;
  }
}

export function hasConsent() {
  return readConsent() === CONSENT.GRANTED;
}

/** Guarda la decisión y avisa a quien esté escuchando (la capa de medición). */
export function setConsent(value) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* sin persistencia la decisión dura lo que dura la sesión */
  }
  for (const listener of listeners) listener(value);
}

/** @returns función para desuscribirse */
export function onConsentChange(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Estado del consentimiento como store externo.
 *
 * `useSyncExternalStore` en vez de `useState` + efecto: la decisión vive en
 * `localStorage`, que es un sistema externo a React, y leerla en un efecto
 * provocaba un render en cascada en cada montaje.
 *
 * En el prerenderizado devuelve `undefined` —"todavía no se sabe"— para
 * distinguirlo de `null`, que significa "esta persona no ha decidido". Así el
 * banner no sale en el HTML estático y nadie lo ve parpadear.
 */
export function subscribeConsent(listener) {
  return onConsentChange(listener);
}

export const consentSnapshot = () => readConsent();
export const consentServerSnapshot = () => undefined;
