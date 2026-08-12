/**
 * Intención con la que alguien llega al formulario.
 *
 * El sitio no tiene un formulario por servicio: todos los CTA llevan al mismo
 * asistente conversacional, que termina entregando la conversación a WhatsApp.
 * Sin esto no habría forma de saber si quien completó el formulario venía a
 * comprar la auditoría, a cotizar otro servicio o a agendar la llamada gratis,
 * y las tres cosas se contarían como la misma conversión.
 *
 * Se guarda en `sessionStorage` y no en memoria porque entre el clic y el envío
 * puede haber una recarga o una URL compartida.
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
 *   `format` y `value` solo viajan desde la página de formación —el formato que
 *   el visitante eligió y su precio—, y `pack_name` desde los packs de
 *   automatización. Es lo que permite optimizar la campaña hacia ingreso y no
 *   hacia volumen de solicitudes.
 */
export function setIntent(intent) {
  if (!isBrowser) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(intent));
  } catch {
    /* sin sessionStorage la conversión se atribuye al genérico */
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
    /* nada que limpiar */
  }
}
