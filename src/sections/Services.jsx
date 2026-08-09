import React, { useState } from "react";
import { ArrowRight, Check, CheckCircle, Clock3, Cpu, Globe, ScanSearch, Wrench, Zap } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";
import { EVENTS, track } from "../analytics/track.js";
import { INTENT, setIntent } from "../analytics/intent.js";
import { AuditScopeNote, AuditSteps } from "../components/AuditTimeline.jsx";

const iconComponents = { ScanSearch, Zap, Cpu, Globe, Wrench };

/**
 * La auditoría no comparte tratamiento con el resto: es el producto de entrada
 * y el único que se vende antes de construir nada. Por eso ocupa el ancho
 * completo, sobre la grilla, y no gira como las demás tarjetas — su contenido
 * tiene que ser legible sin interactuar.
 */
function FeaturedService({ service, copy, audit, onQuote, onDetail }) {
  const Icon = iconComponents[service.iconName] ?? ScanSearch;

  return (
    <Reveal className="group relative rounded-3xl border-2 border-blue-500/40 dark:border-blue-500/35 bg-linear-to-br from-blue-100/70 via-white/90 to-white dark:from-blue-900/30 dark:via-zinc-900/80 dark:to-zinc-900/50 overflow-hidden mb-6 md:mb-8">
      <div className="absolute -top-32 -right-24 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />

      <div className="relative p-6 md:p-9">
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300 border border-blue-400/50 bg-blue-500/10 px-2.5 py-1 rounded-full">
            {copy.featuredLabel}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 rounded-full">
            {service.badge}
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-7 lg:gap-10">
          <div className="lg:col-span-3">
            <div className="flex items-start gap-4 mb-5">
              <div className="shrink-0 text-blue-600 dark:text-blue-400 p-3 bg-white/80 dark:bg-black/50 rounded-xl border border-blue-300/50 dark:border-blue-500/30">
                <Icon size={28} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-2">
                  {service.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {service.price}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-500 font-mono uppercase tracking-[0.12em]">
                    <Clock3 size={12} />
                    {service.delivery}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed mb-7">
              {service.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={onQuote} variant="primary" size="lg" className="group/cta w-full sm:w-auto">
                {copy.auditCta}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/cta:translate-x-1"
                />
              </Button>
              <Button onClick={onDetail} variant="secondary" size="lg" className="w-full sm:w-auto">
                {copy.detailCta}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-black/30 p-5 md:p-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 mb-3.5">
              {copy.deliverablesLabel}
            </p>
            <ul className="space-y-2">
              {service.deliverables.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-gray-300 leading-relaxed"
                >
                  <Check size={15} className="mt-0.5 shrink-0 text-blue-500 dark:text-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {audit && (
          <div className="mt-8 md:mt-10 pt-7 md:pt-8 border-t border-slate-200/80 dark:border-zinc-800">
            <h4 className="text-base md:text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-1.5">
              {audit.afterTitle}
            </h4>
            <p className="text-sm text-slate-600 dark:text-gray-400 font-light mb-6">
              {audit.afterIntro}
            </p>

            <AuditSteps steps={audit.steps} compact />

            <div className="mt-6">
              <AuditScopeNote title={audit.scopeTitle} text={audit.scopeNote} compact />
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function FlipCard({ service, copy, flipped, onFlip }) {
  const Icon = iconComponents[service.iconName] ?? Cpu;

  return (
    <div
      className="relative min-h-75 md:min-h-80 h-full cursor-pointer perspective-1000"
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-expanded={flipped}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onFlip();
        }
      }}
    >
      <div
        className="relative w-full h-full transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 z-10 group bg-white/80 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800/80 rounded-2xl hover:bg-white dark:hover:bg-zinc-800/80 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-500 -translate-y-1/2 translate-x-1/2" />

          <div className="p-5 md:p-7">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
              <div className="text-slate-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300 p-3 bg-white/80 dark:bg-black/50 rounded-xl border border-slate-200 dark:border-zinc-800 group-hover:scale-110">
                <Icon size={28} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
                  {service.title}
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  {service.price}
                </p>
              </div>
            </div>

            <p className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-gray-500 font-mono uppercase tracking-[0.12em] mb-3">
              <Clock3 size={11} />
              {service.delivery}
            </p>

            <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
              {service.desc}
            </p>

            <div className="flex items-center text-blue-500 dark:text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {copy.cta} <CheckCircle size={14} className="ml-2" />
            </div>
          </div>
        </div>

        <div
          className="relative min-h-full bg-linear-to-br from-blue-100/70 via-white/90 to-white border border-blue-300/60 dark:from-blue-900/40 dark:via-zinc-900/90 dark:to-zinc-900/50 dark:border-blue-500/30 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="p-5 md:p-7 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-blue-500 dark:text-blue-400 p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <Icon size={24} />
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
                {service.title}
              </h3>
            </div>

            {/* Presencia web es el único servicio con niveles. Al girar la
                tarjeta se muestran separados, porque una lista genérica no
                dejaba ver qué se recibe por $300 ni que existe algo por
                debajo. El precio de entrada vive aquí dentro y nunca en la
                cara frontal, en un resumen ni en los datos estructurados. */}
            {service.tiers ? (
              <div className="space-y-3">
                {service.tiers.map((tier) => (
                  <div key={tier.name}>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-[13px] font-bold tracking-tight text-slate-900 dark:text-white">
                        {tier.name}
                      </p>
                      <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        {tier.price}
                      </p>
                    </div>

                    {tier.delivery && (
                      <p className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.12em] text-slate-400 dark:text-gray-600 mt-0.5 mb-1.5">
                        <Clock3 size={9} />
                        {tier.delivery}
                      </p>
                    )}

                    <ul className="space-y-0.5">
                      {tier.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-gray-400 leading-[1.3]"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-zinc-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 space-y-2">
                {service.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check size={16} className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                    <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services({ copy, audit }) {
  const { navigateTo } = useRouter();
  const [flippedCard, setFlippedCard] = useState(null);

  const featured = copy.items.find((item) => item.featured);
  const rest = copy.items.filter((item) => !item.featured);

  // El clic declara intención; la conversión se cuenta al entregar el
  // formulario a WhatsApp. Ver `analytics/intent.js`.
  const goToContact = (service) => {
    const payload = {
      service_id: service.id,
      service_name: service.title,
      location: "home_services",
    };

    setIntent({ type: service.featured ? INTENT.AUDIT : INTENT.QUOTE, ...payload });
    track(EVENTS.CTA_CLICK, payload);
    navigateTo(ROUTE_KEYS.CONTACT);
  };

  const handleFlip = (index, service) => {
    const opening = flippedCard !== index;
    setFlippedCard(opening ? index : null);

    if (opening) {
      track(EVENTS.SERVICE_DETAIL_VIEWED, {
        service_id: service.id,
        service_name: service.title,
        location: "home_services",
      });
    }
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
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-gray-400 text-base md:text-lg leading-relaxed font-light mb-6">
            {copy.intro}
          </p>
          <div className="w-12 h-0.5 bg-blue-500 mx-auto" />
        </Reveal>

        {featured && (
          <FeaturedService
            service={featured}
            copy={copy}
            audit={audit}
            onQuote={() => goToContact(featured)}
            onDetail={() => {
              track(EVENTS.SERVICE_DETAIL_VIEWED, {
                service_id: featured.id,
                service_name: featured.title,
                location: "home_services",
              });
              navigateTo(ROUTE_KEYS.AUDIT);
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {rest.map((service, i) => (
            <FlipCard
              key={service.id}
              service={service}
              copy={copy}
              flipped={flippedCard === i}
              onFlip={() => handleFlip(i, service)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
