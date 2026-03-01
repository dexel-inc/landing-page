import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, messages } from "./messages";

const I18nContext = createContext(null);

const STORAGE_KEY = "dexel_locale";

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && messages[stored]) return stored;
    return defaultLocale;
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      copy: messages[locale] ?? messages[defaultLocale],
    }),
    [locale],
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
