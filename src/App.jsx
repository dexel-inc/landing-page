import React, { Suspense, lazy, useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import Logo from "./icons/logo.jsx";
import Button from "./components/ui/Button.jsx";
import Footer from "./sections/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import AuditPage from "./pages/AuditPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AutomationDetail from "./components/AutomationDetail.jsx";
import ConsentBanner from "./components/ConsentBanner.jsx";
import Contact from "./sections/Contact.jsx";
import { ServicesAccordion, ServicesDropdown } from "./components/ServicesMenu.jsx";
import { serviceMenuGroups } from "./i18n/categories.js";
import { useI18n } from "./i18n/I18nContext.jsx";
import { Link, useRouter } from "./router/RouterContext.jsx";
import { ROUTE_KEYS } from "./router/routes.js";
import { useTheme } from "./theme/ThemeContext.jsx";
import { updateSeo } from "./seo/updateSeo.js";
import { setAnalyticsLocale, trackPageView } from "./analytics/track.js";

// El fondo 3D se carga aparte: no existe durante el prerenderizado y tampoco
// tiene por qué retrasar el primer contenido útil.
const ParticleField = lazy(() => import("./components/ParticleField.jsx"));

/** Enlaces sueltos del menú. Servicios va aparte: es un desplegable. */
const NAV_LINKS = [
  { routeKey: ROUTE_KEYS.HOME, labelKey: "home" },
  { routeKey: ROUTE_KEYS.AUDIT, labelKey: "audit" },
  { routeKey: ROUTE_KEYS.CONTACT, labelKey: "contact" },
];

const linkClass =
  "text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all";

function Navbar() {
  const { copy, locale } = useI18n();
  const { setLocale, path } = useRouter();
  const { theme, toggleTheme } = useTheme();
  // El panel móvil se guarda como "abierto en esta ruta" en vez de como un
  // booleano: al navegar, la ruta cambia y el panel queda cerrado solo, sin un
  // efecto que corrija el estado después de pintar.
  const [openForPath, setOpenForPath] = useState(null);
  const mobileOpen = openForPath === path;

  const groups = serviceMenuGroups(copy);

  return (
    <nav className="fixed top-0 w-full z-50 px-3 py-3 md:p-6 bg-gradient-to-b from-white/90 to-transparent dark:from-black/90 backdrop-blur-sm">
      {/* `relative` para el desplegable: el panel se ancla a esta fila, que
          ocupa todo el ancho, y no al ítem del menú. Anclado al ítem se salía
          por el borde izquierdo de la ventana y cortaba la primera columna. */}
      <div className="relative flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            to={ROUTE_KEYS.HOME}
            className="inline-flex items-center gap-2 px-2.5 py-1.5 md:px-3 text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          >
            {/* Alto fijo y ancho libre. Dentro de una caja cuadrada el lockup
                —la palabra más el monograma— se encogía hasta quedar de 21 px
                de alto y no se distinguía ninguno de los dos. */}
            <Logo className="h-8 w-auto md:h-10 text-current" viewBox="0 0 324 210" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.15em] uppercase font-medium">
            <Link to={ROUTE_KEYS.HOME} className={linkClass}>
              {copy.nav.home}
            </Link>

            <ServicesDropdown
              groups={groups}
              label={copy.nav.services}
              indexLabel={copy.chrome.menuIndex}
            />

            <Link to={ROUTE_KEYS.AUDIT} className={linkClass}>
              {copy.nav.audit}
            </Link>

            <Link to={ROUTE_KEYS.CONTACT} className={linkClass}>
              {copy.nav.contact}
            </Link>
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

          <Button
            aria-label={mobileOpen ? copy.nav.menuClose : copy.nav.menu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setOpenForPath(mobileOpen ? null : path)}
            variant="outline"
            size="icon"
            className="md:hidden h-8 w-8 rounded-xl"
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </Button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="md:hidden mt-3 rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 max-h-[70svh] overflow-y-auto"
      >
        <div className="flex flex-col gap-1 mb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.routeKey}
              to={link.routeKey}
              className="px-1 py-2 text-xs uppercase tracking-[0.12em] text-slate-800 dark:text-white"
            >
              {copy.nav[link.labelKey]}
            </Link>
          ))}
        </div>

        <ServicesAccordion
          groups={groups}
          label={copy.nav.services}
          indexLabel={copy.chrome.menuIndex}
        />
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

  const webPresence = copy.services.items.find((item) => item.id === "presencia-web");

  const page =
    routeKey === ROUTE_KEYS.SERVICES ? (
      <ServicesPage copy={copy.services} categories={copy.categories} audit={copy.audit} />
    ) : routeKey === ROUTE_KEYS.WEB_DEV ? (
      <CategoryPage
        copy={copy.categories.webDev}
        process={copy.process}
        chrome={copy.chrome}
        tiers={webPresence?.tiers}
        serviceId="presencia-web"
      />
    ) : routeKey === ROUTE_KEYS.AUTOMATION ? (
      <CategoryPage
        copy={copy.categories.automation}
        process={copy.process}
        chrome={copy.chrome}
        afterFronts={<AutomationDetail copy={copy.categories.automation} />}
        serviceId="automatizacion"
      />
    ) : routeKey === ROUTE_KEYS.AUDIT ? (
      <AuditPage copy={copy.audit} process={copy.process} chrome={copy.chrome} />
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

      {/* Marca de agua: vuelve al tamaño de borde a borde que tenía antes de la
          tarea de navegación, pero más tenue. Con la opacidad original —0.20 en
          oscuro— los trazos del logotipo cruzan el titular del hero y compiten
          con él; una marca de agua se percibe cuando se la busca, no mientras
          se lee lo que va encima. */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center text-slate-300 dark:text-white">
        <Logo className="opacity-[0.14] dark:opacity-[0.06]" />
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
