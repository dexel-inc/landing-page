import React, { createContext, useContext, useMemo } from "react";
import { defaultLocale, messages } from "./messages";
import { useRouter } from "../router/RouterContext.jsx";

const I18nContext = createContext(null);

/**
 * The URL drives the language, not separate state.
 *
 * It used to live in `localStorage` and the URL never changed, so
 * `/servicios` in English and in Spanish were the same address: impossible
 * to index separately or to share. Now `/es/servicios` and `/en/services`
 * are different URLs and this provider just translates whichever one is
 * active. The saved preference still exists, but it only decides where to
 * send someone who lands on the root (see `RouterProvider`).
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
