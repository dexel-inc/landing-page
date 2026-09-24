/**
 * Intent someone arrives at the form with.
 *
 * The site doesn't have one form per service: every CTA leads to the same
 * conversational assistant, which ends up handing the conversation off to
 * WhatsApp. Without this there'd be no way to know whether whoever
 * completed the form came to buy the audit, to quote another service, or to
 * book the free call, and all three would get counted as the same
 * conversion.
 *
 * Stored in `sessionStorage` and not in memory because there can be a
 * reload or a shared URL between the click and the submission.
 */

const STORAGE_KEY = "dexel_intent";
const isBrowser = typeof window !== "undefined";

export const INTENT = {
  AUDIT: "audit",
  QUOTE: "quote",
  DISCOVERY: "discovery",
  TRAINING: "training",
  PACK: "pack",
};

/**
 * @param {{type: string, service_id?: string, service_name?: string,
 *   location?: string, format?: string, value?: number}} intent
 *   `format` and `value` only travel from the training page —the format the
 *   visitor chose and its price—, and `pack_name` from the automation
 *   packs. This is what makes it possible to optimize the campaign toward
 *   revenue instead of request volume.
 */
export function setIntent(intent) {
  if (!isBrowser) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(intent));
  } catch {
    /* without sessionStorage the conversion gets attributed to the generic case */
  }
}

export function readIntent() {
  if (!isBrowser) return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearIntent() {
  if (!isBrowser) return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* nothing to clear */
  }
}
