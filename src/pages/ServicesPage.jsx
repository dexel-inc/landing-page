import React from "react";
import { ArrowRight, Clock3, ScanSearch, Tag, Wrench, Zap } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import FaqList from "../components/ui/FaqList.jsx";
import { Link, useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";
import { EVENTS, track } from "../analytics/track.js";

/**
 * Índice de servicios: las tres categorías, cada una con su página.
 *
 * Dejó de ser la página larga con anclas cuando cada categoría pasó a tener URL
 * propia. Su trabajo ahora es orientar en diez segundos —qué son las tres
 * categorías, desde cuánto y en cuánto tiempo— y mandar a la página que
 * corresponda; el alcance completo vive allí, no aquí.
 */

const categoryIcons = { webDev: Wrench, automation: Zap, audit: ScanSearch };

function CategoryCard({ category, index, copy, onOpen }) {
  const Icon = categoryIcons[category.key] ?? Wrench;

  return (
    <Reveal
      delay={index * 80}
      className="group relative flex flex-col rounded-3xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm hover:border-blue-500/30 transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative flex flex-1 flex-col p-5 md:p-7">
        <div className="flex items-start gap-4 mb-4">
          <div className="shrink-0 text-slate-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300 p-2.5 bg-white/80 dark:bg-black/50 rounded-xl border border-slate-200 dark:border-zinc-800 group-hover:scale-110">
            <Icon size={22} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-1.5">
              {category.navLabel}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1.5 text-base font-bold text-blue-600 dark:text-blue-400">
                <Tag size={13} />
                {category.price}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-500 font-mono uppercase tracking-[0.12em]">
                <Clock3 size={12} />
                {category.delivery}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed mb-5">
          {category.subtitle}
        </p>

        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-500 dark:text-blue-400 mb-3">
          {copy.categoryLabel}
        </p>
        <ul className="space-y-1.5 mb-6">
          {category.fronts.map((name) => (
            <li
              key={name}
              className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-400 leading-relaxed"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-zinc-600" />
              {name}
            </li>
          ))}
        </ul>

        {/* `Link` y no un botón: el índice es la página desde la que un
            rastreador tiene que poder llegar a las tres categorías sin
            ejecutar JavaScript. */}
        <Link
          to={category.routeKey}
          onClick={onOpen}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl h-11 px-6 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 dark:text-slate-900 shadow-[0_12px_30px_-14px_rgba(37,99,235,0.7)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 group/cta"
        >
          {copy.categoryCta}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover/cta:translate-x-1"
          />
        </Link>
      </div>
    </Reveal>
  );
}

export default function ServicesPage({ copy, categories, audit }) {
  const { navigateTo } = useRouter();

  const cards = [
    {
      key: "webDev",
      routeKey: ROUTE_KEYS.WEB_DEV,
      navLabel: categories.webDev.navLabel,
      subtitle: categories.webDev.subtitle,
      price: categories.webDev.price,
      delivery: categories.webDev.delivery,
      fronts: categories.webDev.fronts.map((front) => front.name),
    },
    {
      key: "automation",
      routeKey: ROUTE_KEYS.AUTOMATION,
      navLabel: categories.automation.navLabel,
      subtitle: categories.automation.subtitle,
      price: categories.automation.price,
      delivery: categories.automation.delivery,
      fronts: categories.automation.fronts.map((front) => front.name),
    },
    {
      key: "audit",
      routeKey: ROUTE_KEYS.AUDIT,
      navLabel: audit.navLabel,
      subtitle: audit.subtitle,
      price: audit.price,
      delivery: audit.delivery,
      fronts: audit.deliverables.map((item) => item.title),
    },
  ];

  const openCategory = (card) => {
    track(EVENTS.SERVICE_DETAIL_VIEWED, {
      category: card.key,
      service_name: card.navLabel,
      location: "services_index",
    });
  };

  return (
    <div className="pt-32 md:pt-28 pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-slate-50/80 via-white/60 to-slate-100/80 dark:from-[#050505]/85 dark:via-black/55 dark:to-[#050505]/85 z-0" />
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-3xl pointer-events-none z-0" />

      <section className="relative z-10 px-4 md:px-6">
        <Reveal className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase mb-6">
            {copy.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
            {copy.title}
          </h1>
          <p className="text-base md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            {copy.intro}
          </p>
        </Reveal>
      </section>

      <section className="relative z-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {cards.map((card, i) => (
            <CategoryCard
              key={card.key}
              category={card}
              index={i}
              copy={copy}
              onOpen={() => openCategory(card)}
            />
          ))}
        </div>
      </section>

      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
        <FaqList
          title={copy.faqTitle}
          subtitle={copy.faqSubtitle}
          faqs={copy.faqs}
          idPrefix="faq-services"
        />
      </section>

      <section className="relative z-10 px-4 md:px-6 pt-12 md:pt-16 text-center">
        <Button
          onClick={() => navigateTo(ROUTE_KEYS.CONTACT)}
          variant="secondary"
          size="lg"
          className="group/cta"
        >
          {copy.quoteCta}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover/cta:translate-x-1"
          />
        </Button>
      </section>
    </div>
  );
}
