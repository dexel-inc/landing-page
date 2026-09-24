import React, { Suspense, lazy, useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import Logo from "./icons/logo.jsx";
import Button from "./components/ui/Button.jsx";
import Footer from "./sections/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ServiceDetailPage from "./pages/ServiceDetailPage.jsx";
import MicropagesDemos from "./components/MicropagesDemos.jsx";
import AuditPage from "./pages/AuditPage.jsx";
import { AuditDeliverables } from "./components/AuditTimeline.jsx";
import TrainingPage from "./pages/TrainingPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AutomationDetail, { BotComparison, CustomAgents } from "./components/AutomationDetail.jsx";
import ConsentBanner from "./components/ConsentBanner.jsx";
import Contact from "./sections/Contact.jsx";
import { ServicesAccordion, ServicesDropdown } from "./components/ServicesMenu.jsx";
import { serviceMenuGroups } from "./i18n/categories.js";
import { useI18n } from "./i18n/I18nContext.jsx";
import { Link, useRouter } from "./router/RouterContext.jsx";
import { ROUTE_KEYS } from "./router/routes.js";
import { useTheme } from "./theme/ThemeContext.jsx";
import { updateSeo } from "./seo/updateSeo.js";
import { INTENT } from "./contact/whatsapp.js";
import { setAnalyticsLocale, trackPageView } from "./analytics/track.js";

// The 3D background loads separately: it doesn't exist during prerendering
// and there's no reason it should delay the first useful content.
const ParticleField = lazy(() => import("./components/ParticleField.jsx"));

/**
 * Standalone menu links. Services is separate: it's a dropdown.
 *
 * Training is its own item and not a fourth category inside Services:
 * services are things we do for the client, training is something we do
 * with them.
 *
 * Audit isn't here because it's already one of the three groups in the
 * dropdown —`serviceMenuGroups` lists it alongside web development and
 * automation, and it points to this same route—. Having it as a separate
 * item too gave two entries to the same destination on the same bar, which
 * reads as if they were two different things.
 */
const NAV_LINKS = [
  { routeKey: ROUTE_KEYS.HOME, labelKey: "home" },
  { routeKey: ROUTE_KEYS.TRAINING, labelKey: "training" },
  { routeKey: ROUTE_KEYS.CONTACT, labelKey: "contact" },
];

// The `py-3` doesn't change the text size: it enlarges the area that
// responds to touch. Without it the items were 16px tall, well below the
// 44px minimum for a finger.
const linkClass =
  "inline-flex items-center py-3.5 text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-1.5 after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all";

/**
 * `true` once the page has scrolled far enough that the header is no longer
 * over the hero. Listened to passively: the listener must not block
 * scrolling.
 */
function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

function Navbar() {
  const { copy, locale } = useI18n();
  const { setLocale, path } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const scrolled = useScrolled();
  // The mobile panel is stored as "open on this route" instead of as a
  // boolean: on navigation, the route changes and the panel closes on its
  // own, with no effect needed to fix the state after painting.
  const [openForPath, setOpenForPath] = useState(null);
  const mobileOpen = openForPath === path;

  const groups = serviceMenuGroups(copy);

  return (
    /* The header has its own background, not just blur: with a transparent
       gradient the page text showed through below the menu, and scrolling
       left a mess of two overlapping texts. Over the hero it's lighter;
       past the hero it closes up completely. */
    <header
      className={`fixed top-0 w-full z-50 px-3 py-3 md:p-6 transition-colors duration-300 motion-reduce:transition-none ${
        scrolled
          ? "bg-white/95 dark:bg-[#050505]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-zinc-800/80 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.55)]"
          : "bg-white/75 dark:bg-black/70 backdrop-blur-md"
      }`}
    >
      <nav className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            to={ROUTE_KEYS.HOME}
            className="inline-flex items-center gap-2 px-2.5 py-1.5 md:px-3 text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          >
            {/* Fixed height, free width. Inside a square box the lockup
                —the wordmark plus the monogram— shrank down to 21px tall
                and neither one was distinguishable anymore. */}
            <Logo className="h-8 w-auto md:h-10 text-current" viewBox="0 0 324 210" />
          </Link>

          {/* The link row appears from `lg` and not from `md`: at 768px it
              didn't fit alongside the logo and the controls, and the bar
              pushed horizontal scroll onto the whole page. It stays at `lg`
              now that there are four items instead of five: the margin left
              over at 768px is just a few pixels, and the labels don't measure
              the same in English. Between 768 and 1024 the same collapsible
              mobile panel is used, which already lists everything, including
              the services accordion. */}
          <div className="hidden lg:flex items-center gap-8 text-xs tracking-[0.15em] uppercase font-medium">
            <Link to={ROUTE_KEYS.HOME} className={linkClass}>
              {copy.nav.home}
            </Link>

            <ServicesDropdown
              groups={groups}
              label={copy.nav.services}
              indexLabel={copy.chrome.menuIndex}
            />

            <Link to={ROUTE_KEYS.TRAINING} className={linkClass}>
              {copy.nav.training}
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
            className="h-11 w-11 rounded-xl"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </Button>

          <div className="flex items-center rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900/70 p-0.5">
            <Button
              onClick={() => setLocale("es")}
              aria-current={locale === "es"}
              variant={locale === "es" ? "secondary" : "ghost"}
              size="xs"
              className="h-9 min-w-10 rounded-lg px-2.5"
            >
              {copy.nav.spanish}
            </Button>

            <Button
              onClick={() => setLocale("en")}
              aria-current={locale === "en"}
              variant={locale === "en" ? "secondary" : "ghost"}
              size="xs"
              className="h-9 min-w-10 rounded-lg px-2.5"
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
            className="lg:hidden h-11 w-11 rounded-xl"
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </Button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="lg:hidden mt-3 rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 max-h-[70svh] overflow-y-auto"
      >
        <div className="flex flex-col gap-1 mb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.routeKey}
              to={link.routeKey}
              className="px-2 py-3.5 text-xs uppercase tracking-[0.12em] text-slate-800 dark:text-white"
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
    </header>
  );
}

/**
 * The individual service pages —seven from the web development hub, six
 * from automation, four from audit— share `ServiceDetailPage`; only the
 * copy key, the service id (for analytics and intent), the parent category,
 * the intent a click declares (audits count as `AuditRequested`, not as a
 * quote), and whether they carry their own `children` slot change.
 *
 * `Children`/`childrenCopy` reuse pieces that already exist on the category
 * page —the micropage demos, the rules/AI/agent comparison, the custom
 * agents block— instead of repeating that JSX or that copy on a new page.
 * `childrenCopy` receives the full `copy` object and returns only the
 * portion that block needs, so `RouteContent` doesn't get coupled to each
 * one's internal shape.
 */
const SERVICE_DETAIL_ROUTES = {
  [ROUTE_KEYS.WEBSITES]: {
    detailKey: "websites",
    serviceId: "sitios-web",
    categoryRouteKey: ROUTE_KEYS.WEB_DEV,
  },
  [ROUTE_KEYS.CUSTOM_SOFTWARE]: {
    detailKey: "customSoftware",
    serviceId: "software-a-la-medida",
    categoryRouteKey: ROUTE_KEYS.WEB_DEV,
  },
  [ROUTE_KEYS.MICROPAGES]: {
    detailKey: "micropages",
    serviceId: "micropaginas",
    categoryRouteKey: ROUTE_KEYS.WEB_DEV,
    Children: MicropagesDemos,
    childrenCopy: (copy) => copy.serviceDetails.micropages.demos,
  },
  [ROUTE_KEYS.SEO]: { detailKey: "seo", serviceId: "seo", categoryRouteKey: ROUTE_KEYS.WEB_DEV },
  [ROUTE_KEYS.INTEGRATIONS]: {
    detailKey: "integrations",
    serviceId: "integraciones",
    categoryRouteKey: ROUTE_KEYS.WEB_DEV,
  },
  [ROUTE_KEYS.PAYMENT_GATEWAYS]: {
    detailKey: "paymentGateways",
    serviceId: "pasarelas-de-pago",
    categoryRouteKey: ROUTE_KEYS.WEB_DEV,
  },
  [ROUTE_KEYS.MAINTENANCE]: {
    detailKey: "maintenanceDetail",
    serviceId: "mantenimiento",
    categoryRouteKey: ROUTE_KEYS.WEB_DEV,
  },
  [ROUTE_KEYS.WHATSAPP_AUTOMATION]: {
    detailKey: "whatsappAutomation",
    serviceId: "atencion-whatsapp",
    categoryRouteKey: ROUTE_KEYS.AUTOMATION,
    Children: BotComparison,
    childrenCopy: (copy) => copy.categories.automation.comparison,
  },
  [ROUTE_KEYS.CUSTOM_AGENTS]: {
    detailKey: "customAgents",
    serviceId: "agentes-a-la-medida",
    categoryRouteKey: ROUTE_KEYS.AUTOMATION,
    Children: CustomAgents,
    childrenCopy: (copy) => copy.categories.automation.agents,
  },
  [ROUTE_KEYS.N8N_WORKFLOWS]: {
    detailKey: "n8nWorkflows",
    serviceId: "workflows-n8n",
    categoryRouteKey: ROUTE_KEYS.AUTOMATION,
  },
  [ROUTE_KEYS.SYSTEM_INTEGRATION]: {
    detailKey: "systemIntegration",
    serviceId: "integracion-de-sistemas",
    categoryRouteKey: ROUTE_KEYS.AUTOMATION,
  },
  [ROUTE_KEYS.AUTOMATED_REPORTS]: {
    detailKey: "automatedReports",
    serviceId: "reportes-automaticos",
    categoryRouteKey: ROUTE_KEYS.AUTOMATION,
  },
  [ROUTE_KEYS.DOCUMENT_READING]: {
    detailKey: "documentReading",
    serviceId: "lectura-de-documentos",
    categoryRouteKey: ROUTE_KEYS.AUTOMATION,
  },
  [ROUTE_KEYS.PROCESS_AUDIT]: {
    detailKey: "processAudit",
    serviceId: "auditoria",
    categoryRouteKey: ROUTE_KEYS.AUDIT,
    intentType: INTENT.AUDIT,
    Children: AuditDeliverables,
    childrenCopy: (copy) => ({
      title: copy.audit.deliverablesTitle,
      intro: copy.audit.deliverablesIntro,
      items: copy.audit.deliverables,
    }),
  },
  [ROUTE_KEYS.TOOLS_AUDIT]: {
    detailKey: "toolsAudit",
    serviceId: "auditoria-herramientas",
    categoryRouteKey: ROUTE_KEYS.AUDIT,
    intentType: INTENT.AUDIT,
  },
  [ROUTE_KEYS.SOFTWARE_AUDIT]: {
    detailKey: "softwareAudit",
    serviceId: "auditoria-software",
    categoryRouteKey: ROUTE_KEYS.AUDIT,
    intentType: INTENT.AUDIT,
  },
  [ROUTE_KEYS.AI_ASSESSMENT]: {
    detailKey: "aiAssessment",
    serviceId: "diagnostico-ia",
    categoryRouteKey: ROUTE_KEYS.AUDIT,
    intentType: INTENT.AUDIT,
  },
};

function RouteContent() {
  const { routeKey } = useRouter();
  const { copy } = useI18n();

  if (routeKey === ROUTE_KEYS.HOME) {
    return <HomePage copy={copy} />;
  }

  const webPresence = copy.services.items.find((item) => item.id === "presencia-web");
  const serviceDetailRoute = SERVICE_DETAIL_ROUTES[routeKey];
  // The short name the menu uses —"Sitios web", not the page's headline—
  // is what goes in the pre-filled WhatsApp message.
  const serviceName = serviceMenuGroups(copy)
    .flatMap((group) => group.items)
    .find((item) => item.routeKey === routeKey)?.label;

  const page = serviceDetailRoute ? (
    <ServiceDetailPage
      copy={copy.serviceDetails[serviceDetailRoute.detailKey]}
      chrome={copy.chrome}
      categoryRouteKey={serviceDetailRoute.categoryRouteKey}
      serviceId={serviceDetailRoute.serviceId}
      serviceName={serviceName}
      intentType={serviceDetailRoute.intentType}
    >
      {serviceDetailRoute.Children ? (
        <serviceDetailRoute.Children copy={serviceDetailRoute.childrenCopy(copy)} />
      ) : null}
    </ServiceDetailPage>
  ) : routeKey === ROUTE_KEYS.SERVICES ? (
      <ServicesPage
        copy={copy.services}
        categories={copy.categories}
        audit={copy.audit}
        chrome={copy.chrome}
      />
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
        afterFronts={<AutomationDetail copy={copy.categories.automation} chrome={copy.chrome} />}
        serviceId="automatizacion"
      />
    ) : routeKey === ROUTE_KEYS.AUDIT ? (
      <AuditPage copy={copy.audit} process={copy.process} chrome={copy.chrome} />
    ) : routeKey === ROUTE_KEYS.TRAINING ? (
      <TrainingPage copy={copy.training} chrome={copy.chrome} />
    ) : routeKey === ROUTE_KEYS.PRIVACY ? (
      <PrivacyPage copy={copy.privacy} />
    ) : routeKey === ROUTE_KEYS.NOT_FOUND ? (
      <NotFoundPage copy={copy.notFound} />
    ) : (
      <Contact copy={copy.contact} first />
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

  // The canvas only exists in the browser: there's no WebGL during
  // prerendering. Since the client mounts from scratch instead of
  // hydrating, there's no need to wait for an effect to paint it — the DOM
  // existing is enough.
  const showParticles = typeof document !== "undefined";

  useEffect(() => {
    // The language is injected before measuring: the endpoint requires
    // `locale` on every event, and setting it by hand on every call gets
    // forgotten sooner or later.
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

      {/* Watermark: back to the edge-to-edge size it had before the
          navigation work, but fainter. At the original opacity —0.20 in
          dark mode— the logo's strokes cross the hero headline and compete
          with it; a watermark is noticed when you look for it, not while
          reading what sits on top of it. */}
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
