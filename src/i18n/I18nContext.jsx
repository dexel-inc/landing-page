import React, { createContext, useContext, useMemo } from "react";
import { defaultLocale, messages } from "./messages";
import { useRouter } from "../router/RouterContext.jsx";

const I18nContext = createContext(null);

/**
 * El idioma lo manda la URL, no un estado aparte.
 *
 * Antes vivía en `localStorage` y la URL no cambiaba, así que `/servicios` en
 * inglés y en español eran la misma dirección: imposible de indexar por
 * separado y de compartir. Ahora `/es/servicios` y `/en/services` son URLs
 * distintas y este proveedor solo traduce la que esté activa. La preferencia
 * guardada sigue existiendo, pero solo decide a dónde mandar a quien entra
 * por la raíz (ver `RouterProvider`).
 */
export function I18nProvider({ children }) {
  const { locale, setLocale } = useRouter();

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      copy: messages[locale] ?? messages[defaultLocale],
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
