import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Cpu,
  Globe,
  Layers,
  ScanSearch,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";
import { EVENTS, track } from "../analytics/track.js";
import { INTENT, setIntent } from "../analytics/intent.js";

const iconComponents = { ScanSearch, Zap, Cpu, Globe, Wrench };

function ServiceCard({ service, index, copy, onQuote, onDetail }) {
  const Icon = iconComponents[service.iconName] ?? Cpu;
  const isFeatured = Boolean(service.featured);

  return (
    <Reveal
      delay={index * 70}
      id={service.slug}
      className={`group relative rounded-3xl overflow-hidden transition-colors duration-500 scroll-mt-32 ${
        isFeatured
          ? "border-2 border-blue-500/40 dark:border-blue-500/35 bg-linear-to-br from-blue-100/70 via-white/90 to-white dark:from-blue-900/30 dark:via-zinc-900/80 dark:to-zinc-900/50"
          : "border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm hover:border-blue-500/30"
      }`}
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative grid lg:grid-cols-5 gap-6 lg:gap-8 p-5 md:p-7">
        <div className="lg:col-span-3">
          {isFeatured && (
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300 border border-blue-400/50 bg-blue-500/10 px-2.5 py-1 rounded-full">
                {copy.featuredLabel}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                {service.badge}
              </span>
            </div>
          )}

          <div className="flex items-start gap-4 mb-5">
            <div
              className={`shrink-0 p-2.5 rounded-xl border transition-all duration-300 group-hover:scale-110 ${
                isFeatured
                  ? "text-blue-600 dark:text-blue-400 bg-white/80 dark:bg-black/50 border-blue-300/50 dark:border-blue-500/30"
                  : "text-slate-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 bg-white/80 dark:bg-black/50 border-slate-200 dark:border-zinc-800"
              }`}
            >
              <Icon size={22} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-1.5">
                {service.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {service.price}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-500 font-mono uppercase tracking-[0.12em]">
                  <Clock3 size={12} />
                  {service.delivery}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
            {service.desc}
          </p>

          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-500 dark:text-blue-400 mb-3">
            {copy.deliverablesLabel}
          </p>
          <ul className="space-y-2 mb-6">
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

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={onQuote} variant="primary" size="lg" className="w-full sm:w-auto group/cta">
              {copy[service.ctaKey] ?? copy.quoteCta}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/cta:translate-x-1"
              />
            </Button>

            {service.detailRouteKey && (
              <Button onClick={onDetail} variant="secondary" size="lg" className="w-full sm:w-auto">
                {copy.detailCta}
              </Button>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/70 to-white dark:from-blue-900/25 dark:via-zinc-900/60 dark:to-zinc-900/30 p-5">
            <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 mb-2.5">
              <Target size={12} />
              {copy.forWhoLabel}
            </p>
            <p className="text-sm text-slate-700 dark:text-gray-200 leading-relaxed">
              {service.forWho}
            </p>
          </div>

          {/* Los niveles solo existen en Presencia web. El precio de entrada
              vive aquí dentro y nunca en el encabezado de la tarjeta: abrir la
              oferta con la cifra más baja arrastra hacia abajo todo lo demás. */}
          {service.tiers && (
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-black/30 p-5 flex-1">
              <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-gray-600 mb-4">
                <Layers size={12} />
                {copy.tiersLabel}
              </p>

              <div className="space-y-4">
                {service.tiers.map((tier) => (
                  <div key={tier.name}>
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                        {tier.name}
                      </p>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        {tier.price}
                      </p>
                    </div>
                    {tier.delivery && (
                      <p className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-slate-400 dark:text-gray-600 mb-2">
                        <Clock3 size={10} />
                        {tier.delivery}
                      </p>
                    )}
                    <ul className="space-y-1">
                      {tier.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-600 dark:text-gray-400 leading-relaxed"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-zinc-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function ServicesPage({ copy }) {
  const { navigateTo } = useRouter();
  const [openFaqs, setOpenFaqs] = useState(() => new Set());

  const items = copy.items ?? [];

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  /**
   * El clic no es la conversión: la conversión es completar el formulario. Aquí
   * solo se declara con qué intención va el visitante, para que al entregar la
   * conversación a WhatsApp se cuente `AuditRequested` o `QuoteRequested` según
   * corresponda y no las dos como una sola cosa.
   */
  const handleQuote = (service) => {
    setIntent({
      type: service.featured ? INTENT.AUDIT : INTENT.QUOTE,
      service_id: service.id,
      service_name: service.title,
      location: "services_page",
    });

    track(EVENTS.CTA_CLICK, {
      service_id: service.id,
      service_name: service.title,
      location: "services_page",
    });
    navigateTo(ROUTE_KEYS.CONTACT);
  };

  const handleDetail = (service) => {
    track(EVENTS.SERVICE_DETAIL_VIEWED, {
      service_id: service.id,
      service_name: service.title,
      location: "services_page",
    });
    navigateTo(service.detailRouteKey);
  };

  return (
    <div className="pt-32 md:pt-28 pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-slate-50 via-white to-slate-100 dark:from-[#050505] dark:via-black/80 dark:to-[#050505] z-0" />
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-3xl pointer-events-none z-0" />

      <section className="relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase mb-6">
            {copy.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
            {copy.title}
          </h1>
          <p className="text-base md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            {copy.intro}
          </p>
        </div>

        <nav className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2 mb-12 md:mb-16">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.slug}`}
              className="text-xs md:text-sm px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 transition-colors duration-300"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </section>

      <section className="relative z-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto space-y-5 md:space-y-6">
          {items.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              copy={copy}
              onQuote={() => handleQuote(service)}
              onDetail={() => handleDetail(service)}
            />
          ))}
        </div>
      </section>

      <section className="relative z-10 px-4 md:px-6 pt-14 md:pt-20">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {copy.faqTitle}
            </h2>
            <p className="text-base md:text-xl text-slate-600 dark:text-gray-400">
              {copy.faqSubtitle}
            </p>
          </Reveal>

          <div className="space-y-3">
            {copy.faqs.map((faq, index) => {
              const isOpen = openFaqs.has(index);
              const answerId = `faq-answer-${index}`;

              return (
                <div
                  key={index}
                  className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${
                    isOpen
                      ? "border-blue-400/50 bg-white/90 dark:bg-zinc-900/80"
                      : "border-slate-200 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/60 hover:border-blue-500/30"
                  }`}
                >
                  {/* Botón nativo en vez del componente Button: su clase base
                      trae justify-center, que ganaba sobre justify-between y
                      dejaba la pregunta centrada contra una respuesta alineada
                      a la izquierda. */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 md:px-6 md:py-5 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/40"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white leading-snug">
                      {faq.question}
                    </h3>
                    <span
                      className={`shrink-0 grid place-items-center h-8 w-8 rounded-lg border transition-all duration-300 ${
                        isOpen
                          ? "border-blue-400/50 bg-blue-500/10 text-blue-500 dark:text-blue-400 rotate-180"
                          : "border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-gray-600"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  {/* grid-rows 0fr→1fr anima la altura sin medirla en JS. La
                      respuesta queda siempre en el HTML, así que un rastreador
                      la lee aunque el acordeón esté cerrado. */}
                  <div
                    id={answerId}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-6 pb-5 md:pb-6">
                        <div className="h-px bg-slate-200 dark:bg-zinc-800 mb-4" />
                        <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
