import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "dexel_theme_preference";
const isBrowser = typeof window !== "undefined";

function getSystemTheme() {
  if (!isBrowser || !window.matchMedia) return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function storedPreference() {
  if (!isBrowser) return "system";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
  } catch {
    return "system";
  }
}

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(storedPreference);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  useEffect(() => {
    if (!isBrowser || !window.matchMedia) return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => setSystemTheme(event.matches ? "dark" : "light");

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const theme = preference === "system" ? systemTheme : preference;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      /* sin persistencia el tema dura lo que dura la sesión */
    }
  }, [preference]);

  const toggleTheme = () => {
    setPreference((prev) => {
      const resolved = prev === "system" ? systemTheme : prev;
      return resolved === "dark" ? "light" : "dark";
    });
  };

  const value = useMemo(
    () => ({
      theme,
      preference,
      setPreference,
      toggleTheme,
    }),
    [theme, preference, systemTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
