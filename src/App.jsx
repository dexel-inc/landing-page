import React, { Suspense, lazy, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import Logo from "./icons/logo.jsx";
import Button from "./components/ui/Button.jsx";
import Footer from "./sections/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import AuditPage from "./pages/AuditPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ConsentBanner from "./components/ConsentBanner.jsx";
import Contact from "./sections/Contact.jsx";
import { useI18n } from "./i18n/I18nContext.jsx";
import { Link, useRouter } from "./router/RouterContext.jsx";
import { ROUTE_KEYS } from "./router/routes.js";
import { useTheme } from "./theme/ThemeContext.jsx";
import { updateSeo } from "./seo/updateSeo.js";
import { setAnalyticsLocale, trackPageView } from "./analytics/track.js";

// El fondo 3D se carga aparte: no existe durante el prerenderizado y tampoco
// tiene por qué retrasar el primer contenido útil.
const ParticleField = lazy(() => import("./components/ParticleField.jsx"));

const NAV_LINKS = [
  { routeKey: ROUTE_KEYS.HOME, labelKey: "home" },
  { routeKey: ROUTE_KEYS.SERVICES, labelKey: "services" },
  { routeKey: ROUTE_KEYS.AUDIT, labelKey: "audit" },
  { routeKey: ROUTE_KEYS.CONTACT, labelKey: "contact" },
];

function Navbar() {
  const { copy, locale } = useI18n();
  const { setLocale } = useRouter();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 px-3 py-3 md:p-6 bg-gradient-to-b from-white/90 to-transparent dark:from-black/90 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            to={ROUTE_KEYS.HOME}
            className="inline-flex items-center gap-2 px-2.5 py-1.5 md:px-3 text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          >
            <Logo className="w-7 h-7 md:w-8 md:h-8 text-current" viewBox="0 0 324 210" />
          </Link>

          <div className="hidden md:flex gap-8 text-xs tracking-[0.15em] uppercase font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.routeKey}
                to={link.routeKey}
                className="text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
              >
                {copy.nav[link.labelKey]}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2 rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white/80 dark:bg-black/35 backdrop-blur-md px-1.5 py-1.5 md:px-2 md:py-1.5 shadow-[0_12px_28px_-18px_rgba(15,23,42,0.45)]">
          <Button
            aria-label={copy.nav.themeToggle}
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className="h-8 w-8 md:h-9 md:w-9 rounded-xl"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </Button>

          <div className="flex items-center rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900/70 p-0.5">
            <Button
              onClick={() => setLocale("es")}
              aria-current={locale === "es"}
              variant={locale === "es" ? "secondary" : "ghost"}
              size="xs"
              className="h-7 md:h-8 min-w-8 md:min-w-9 rounded-lg px-2"
            >
              {copy.nav.spanish}
            </Button>

            <Button
              onClick={() => setLocale("en")}
              aria-current={locale === "en"}
              variant={locale === "en" ? "secondary" : "ghost"}
              size="xs"
              className="h-7 md:h-8 min-w-8 md:min-w-9 rounded-lg px-2"
            >
              {copy.nav.english}
            </Button>
          </div>
        </div>
      </div>

      <div className="md:hidden mt-2 flex items-center justify-center gap-1.5">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.routeKey}
            to={link.routeKey}
            className="text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-lg border border-slate-200/90 dark:border-zinc-800 bg-white/70 dark:bg-black/30 text-slate-700 dark:text-gray-200"
          >
            {copy.nav[link.labelKey]}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function RouteContent() {
  const { routeKey } = useRouter();
  const { copy } = useI18n();

  if (routeKey === ROUTE_KEYS.HOME) {
    return <HomePage copy={copy} />;
  }

  const page =
    routeKey === ROUTE_KEYS.SERVICES ? (
      <ServicesPage copy={copy.services} />
    ) : routeKey === ROUTE_KEYS.AUDIT ? (
      <AuditPage copy={copy.audit} />
    ) : routeKey === ROUTE_KEYS.PRIVACY ? (
      <PrivacyPage copy={copy.privacy} />
    ) : routeKey === ROUTE_KEYS.NOT_FOUND ? (
      <NotFoundPage copy={copy.notFound} />
    ) : (
      <Contact copy={copy.contact} />
    );

  return (
    <>
      {page}
      <Footer copy={copy.footer} />
    </>
  );
}

export default function DexelLanding() {
  const { routeKey, locale, path } = useRouter();
  const { copy } = useI18n();

  // El canvas solo existe en el navegador: en el prerenderizado no hay WebGL.
  // Como el cliente monta de cero en vez de hidratar, no hace falta esperar a
  // un efecto para pintarlo, basta con que exista el DOM.
  const showParticles = typeof document !== "undefined";

  useEffect(() => {
    // El idioma se inyecta antes de medir: el documento pide `locale` en todos
    // los eventos, y ponerlo a mano en cada llamada se olvida tarde o temprano.
    setAnalyticsLocale(locale);
    const seo = updateSeo({ routeKey, locale });
    trackPageView({ path, locale, title: seo?.title });
  }, [routeKey, locale, path]);

  return (
    <div className="bg-slate-50 dark:bg-[#050505] min-h-screen text-slate-900 dark:text-white font-sans selection:bg-blue-200 dark:selection:bg-blue-900/30 selection:text-slate-900 dark:selection:text-white transition-colors duration-300">
      <div className="fixed inset-0 z-0 opacity-20 dark:opacity-40 pointer-events-none">
        {showParticles && (
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        )}
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center text-slate-300 dark:text-white">
        <Logo className="opacity-30 dark:opacity-20" />
        <div className="absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-slate-50 dark:from-black/30 dark:to-[#050505]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        <RouteContent />
      </main>

      <ConsentBanner copy={copy.consent} />
    </div>
  );
}
