import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import FaqList from "../components/ui/FaqList.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import { buildCategoryCards } from "../components/categoryCards.js";
import { useRouter } from "../router/RouterContext.jsx";
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

export default function ServicesPage({ copy, categories, audit, chrome }) {
  const { navigateTo } = useRouter();

  const cards = buildCategoryCards({ categories, audit, routeKeys: ROUTE_KEYS });

  const openCategory = (card) => {
    track(EVENTS.SERVICE_DETAIL_VIEWED, {
      category: card.key,
      service_name: card.navLabel,
      location: "services_index",
    });
  };

  return (
    <div className="pt-[calc(var(--header-h)+2rem)] pb-16 md:pb-24 relative overflow-hidden">
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
          {chrome?.vatNote && (
            <p className="mt-3 text-sm text-slate-500 dark:text-gray-500 max-w-2xl mx-auto">
              {chrome.vatNote}
            </p>
          )}
        </Reveal>
      </section>

      <section className="relative z-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {cards.map((card) => (
            <CategoryCard
              key={card.key}
              category={card}
              copy={copy}
              chrome={chrome}
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
