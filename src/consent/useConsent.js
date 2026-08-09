import { useSyncExternalStore } from "react";
import { consentServerSnapshot, consentSnapshot, subscribeConsent } from "./consent.js";

/**
 * @returns {"granted"|"denied"|null|undefined} `null` si el visitante no ha
 *   decidido, `undefined` mientras no se sabe (prerenderizado).
 */
export function useConsent() {
  return useSyncExternalStore(subscribeConsent, consentSnapshot, consentServerSnapshot);
}
