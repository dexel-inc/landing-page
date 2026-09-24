/**
 * Consent for analytics and advertising cookies.
 *
 * The site collects browsing data and sends it to Meta and Google, so under
 * Colombian Law 1581 of 2012 prior, informed authorization is required.
 * This module is the single source of truth for that decision: the banner
 * writes it, the measurement layer reads it, and nothing else touches
 * `localStorage`.
 *
 * Possible states:
 *   null       the visitor hasn't decided yet → the banner is shown
 *   "granted"  accepted → pixel, Conversions API, and GA4 get activated
 *   "denied"   declined → nothing is sent and it's never asked again
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
    // Safari in private mode throws when touching localStorage. Unable to
    // remember the decision, the safe assumption is that there's no consent.
    return null;
  }
}

export function hasConsent() {
  return readConsent() === CONSENT.GRANTED;
}

/** Saves the decision and notifies whoever is listening (the measurement layer). */
export function setConsent(value) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* without persistence the decision lasts only for the session */
  }
  for (const listener of listeners) listener(value);
}

/** @returns unsubscribe function */
export function onConsentChange(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Consent state as an external store.
 *
 * `useSyncExternalStore` instead of `useState` + effect: the decision lives
 * in `localStorage`, which is a system external to React, and reading it in
 * an effect caused a cascading render on every mount.
 *
 * During prerendering it returns `undefined` —"not known yet"— to
 * distinguish it from `null`, which means "this person hasn't decided".
 * That way the banner doesn't appear in the static HTML and nobody sees it flicker.
 */
export function subscribeConsent(listener) {
  return onConsentChange(listener);
}

export const consentSnapshot = () => readConsent();
export const consentServerSnapshot = () => undefined;
