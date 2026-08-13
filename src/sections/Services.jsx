import React from "react";
import Reveal from "../components/ui/Reveal.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import { buildCategoryCards } from "../components/categoryCards.js";
import { ROUTE_KEYS } from "../router/routes.js";
import { EVENTS, track } from "../analytics/track.js";

/**
 * Bloque de servicios del inicio: enruta, no vende.
 *
 * Antes eran cinco tarjetas con el detalle completo de cada servicio,
 * duplicando lo que ya cuenta cada página propia. Ahora son las mismas tres
 * tarjetas de categoría que usa `ServicesPage` —mismo componente, mismo
 * copy—, así que el inicio y el índice de servicios nunca se desincronizan.
 */
export default function Services({ copy, categories, audit, chrome }) {
  const cards = buildCategoryCards({ categories, audit, routeKeys: ROUTE_KEYS });

  const openCategory = (card) => {
    track(EVENTS.SERVICE_DETAIL_VIEWED, {
      category: card.key,
      service_name: card.navLabel,
      location: "home_services",
    });
  };

  return (
    <section id="services" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-[#050505] dark:via-black/80 dark:to-[#050505] z-0" />

      <div className="max-w-6xl w-full mx-auto px-4 md:px-6 relative z-10">
        <Reveal className="mb-10 md:mb-14 text-center">
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 border border-blue-400/40 px-3 py-1 rounded-full bg-blue-500/10">
            {copy.badge}
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
            {copy.title}
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-gray-400 text-base md:text-lg leading-relaxed font-light mb-3">
            {copy.intro}
          </p>
          {chrome?.vatNote && (
            <p className="max-w-2xl mx-auto text-sm text-slate-500 dark:text-gray-500 mb-6">
              {chrome.vatNote}
            </p>
          )}
          <div className="w-12 h-0.5 bg-blue-500 mx-auto" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
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
      </div>
    </section>
  );
}
