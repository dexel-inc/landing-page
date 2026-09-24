import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { I18nProvider } from "./i18n/I18nContext.jsx";
import { RouterProvider } from "./router/RouterContext.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";
import { initAnalytics } from "./analytics/track.js";

initAnalytics();

// `createRoot` and not `hydrateRoot`: the prerendered HTML is meant for
// crawlers and for the first paint, not for hydration. Mounting from
// scratch avoids having to reconcile state that only exists in the browser
// (system theme, stored language, elements in the viewport).
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
