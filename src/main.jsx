import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { I18nProvider } from "./i18n/I18nContext.jsx";
import { RouterProvider } from "./router/RouterContext.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";
import { initAnalytics } from "./analytics/track.js";

initAnalytics();

// `createRoot` y no `hydrateRoot`: el HTML prerenderizado está pensado para
// rastreadores y para el primer pintado, no para hidratarse. Montar de cero
// evita tener que hacer coincidir estado que solo existe en el navegador
// (tema del sistema, idioma guardado, elementos en viewport).
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </RouterProvider>
    </ThemeProvider>
  </StrictMode>,
);
