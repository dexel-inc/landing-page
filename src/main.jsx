import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { I18nProvider } from "./i18n/I18nContext.jsx";
import { RouterProvider } from "./router/RouterContext.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
);
