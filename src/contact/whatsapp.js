import { SITE } from "../config/site.js";
import { whatsappCopy } from "../i18n/whatsapp.js";
import { EVENTS, track } from "../analytics/track.js";

/**
 * Every call to action ends here: it opens WhatsApp with a message that
 * already names the service —and the plan, if one was chosen—, so nobody
 * has to explain from scratch what they came for.
 *
 * The click is the conversion, and it sends exactly one event. Which one
 * depends on the intent the button declares —buying an audit, quoting a
 * service, requesting a pack or a training format, or booking the free
 * call—; a button with no service behind it counts as a plain
 * `WhatsAppOpened`. Sending several events per click would inflate the
 * funnel, and counting them all as the same thing would make campaign
 * optimization useless.
 */

export const INTENT = {
  AUDIT: "audit",
  QUOTE: "quote",
  DISCOVERY: "discovery",
  TRAINING: "training",
  PACK: "pack",
  GENERAL: "general",
};

const CONVERSION_BY_INTENT = {
  [INTENT.AUDIT]: EVENTS.AUDIT_REQUESTED,
  [INTENT.QUOTE]: EVENTS.QUOTE_REQUESTED,
  [INTENT.TRAINING]: EVENTS.TRAINING_REQUESTED,
  [INTENT.PACK]: EVENTS.PACK_REQUESTED,
  [INTENT.DISCOVERY]: EVENTS.DISCOVERY_BOOKED,
};

/** `wa.me` link to the company's number with the text already written. */
export function whatsappUrl(text) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

/**
 * The price is left out on purpose: the conversation starts from the
 * service and the plan, and the figure gets confirmed there.
 *
 * @param {{type: string, locale: string, service?: string, plan?: string}} params
 */
export function buildWhatsAppMessage({ type, locale, service, plan }) {
  const copy = whatsappCopy[locale] ?? whatsappCopy.es;
  const lines = [copy.greeting, ""];

  if (type === INTENT.DISCOVERY) {
    lines.push(copy.discovery);
    if (service) lines.push("", copy.discoveryAbout(service));
  } else if (service) {
    lines.push(copy.service(service));
    if (plan) lines.push(copy.plan(plan));
    lines.push("", copy.serviceClose);
  } else {
    lines.push(copy.general);
  }

  return lines.join("\n");
}

/**
 * Tracks the conversion and opens WhatsApp in a new tab. Must be called
 * straight from the click handler: browsers only allow `window.open` as a
 * direct response to a user gesture.
 *
 * @param {{type: string, locale: string, location: string, service?: string,
 *   plan?: string, analytics?: object}} params
 *   `analytics` carries the extra event fields —`service_id`, `category`,
 *   `value`, `format`, `pack_name`—.
 */
export function contactOnWhatsApp({ type, locale, location, service, plan, analytics = {} }) {
  const shared = {
    location,
    service_name: plan ? `${service} — ${plan}` : service,
    ...analytics,
  };

  track(CONVERSION_BY_INTENT[type] ?? EVENTS.WHATSAPP_OPENED, shared);

  const url = whatsappUrl(buildWhatsAppMessage({ type, locale, service, plan }));
  window.open(url, "_blank", "noopener,noreferrer");
}
