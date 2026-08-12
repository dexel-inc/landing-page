import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  Clock3,
  Cpu,
  CreditCard,
  FileScan,
  Globe,
  Info,
  Layers,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Plug,
  ScanSearch,
  Search,
  Tag,
  Workflow,
  Wrench,
} from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import FaqList from "../components/ui/FaqList.jsx";
import ProcessCompact from "../components/ProcessCompact.jsx";
import { useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";
import { EVENTS, track } from "../analytics/track.js";
import { INTENT, setIntent } from "../analytics/intent.js";

/**
 * Plantilla común de las tres páginas de categoría.
 *
 * Encabezado → frentes → qué incluye → cómo trabajamos → preguntas → CTA. La
 * estructura es idéntica en las tres y solo cambia el contenido, que llega
 * entero por props: es lo que evita que "las tres páginas se vean consistentes"
 * dependa de acordarse de replicar cada ajuste tres veces.
 *
 * `children` es el hueco para lo que solo tiene una categoría —los cuatro pasos
 * posteriores y la nota de alcance de la auditoría— sin obligar a las otras dos
 * a cargar con secciones vacías. `afterFronts` es el mismo hueco, pero justo
 * después de los frentes: ahí van las piezas que explican qué se contrata
 * —la comparación entre responder y hacer— y que leídas después del alcance
 * llegarían tarde.
 */

const frontIcons = {
  Globe,
  Cpu,
  LayoutDashboard,
  Plug,
  CreditCard,
  Wrench,
  Workflow,
  MessageSquare,
  Bot,
  LineChart,
  FileScan,
  ScanSearch,
  Search,
};

function FrontCard({ front }) {
  const Icon = frontIcons[front.iconName] ?? Cpu;

  return (
    <div
      className="group relative rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 p-5 md:p-6 hover:border-blue-500/30 transition-colors duration-500"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 text-slate-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300 p-2.5 bg-white/80 dark:bg-black/50 rounded-xl border border-slate-200 dark:border-zinc-800 group-hover:scale-110">
          <Icon size={20} />
        </div>
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
            <h3 className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
              {front.name}
            </h3>
            {front.meta && (
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                {front.meta}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{front.text}</p>
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage({
  copy,
  process,
  chrome,
  fronts,
  tiers,
  afterFronts,
  intentType = INTENT.QUOTE,
  serviceId,
  children,
}) {
  const { navigateTo, locale } = useRouter();
  const category = copy.key;
  const items = fronts ?? copy.fronts ?? [];

  /**
   * El idioma va explícito y no por el que guarda la capa de medición: esta
   * página es hija de quien lo inyecta, y los efectos de los hijos corren
   * primero. Sin esto, la primera vista de una página en inglés se contaba como
   * español.
   */
  useEffect(() => {
    track(EVENTS.SERVICE_CATEGORY_VIEWED, { category, locale });
  }, [category, locale]);

  /**
   * El clic no es la conversión: la conversión es entregar la conversación a
   * WhatsApp. Aquí solo se declara con qué intención va el visitante, para que
   * al convertir se cuente `QuoteRequested`, `AuditRequested` o
   * `DiscoveryBooked` según corresponda y no las tres como una sola cosa.
   */
  const goToContact = (type, location) => {
    setIntent({
      type,
      category,
      service_id: serviceId ?? category,
      service_name: copy.title,
      location,
    });

    track(EVENTS.CTA_CLICK, { category, service_id: serviceId ?? category, location });
    navigateTo(ROUTE_KEYS.CONTACT);
  };

  return (
    <div className="pt-32 md:pt-28 pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-slate-50/80 via-white/60 to-slate-100/80 dark:from-[#050505]/85 dark:via-black/55 dark:to-[#050505]/85 z-0" />
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-3xl pointer-events-none z-0" />

      {/* 1 — Encabezado */}
      <section className="relative z-10 px-4 md:px-6">
        <Reveal className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-2.5 mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase">
              {copy.badge}
            </span>
            {copy.discountBadge && (
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs tracking-[0.18em] uppercase">
                {copy.discountBadge}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
            {copy.title}
          </h1>
          <p className="text-base md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {copy.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            <div className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 px-6 py-4 min-w-40">
              <p className="flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 mb-1.5">
                <Tag size={11} />
                {copy.priceLabel}
              </p>
              <p className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {copy.price}
              </p>
              {/* El IVA va pegado a la cifra, no en una nota al pie: es lo que
                  diferencia de la competencia local, que publica "+ IVA". En
                  inglés `vatLabel` es `null` y aquí no se pinta nada. */}
              {chrome?.vatLabel && (
                <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">{chrome.vatLabel}</p>
              )}
              {copy.priceNote && (
                <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">{copy.priceNote}</p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-black/30 px-6 py-4 min-w-40 flex flex-col justify-center">
              <p className="flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-gray-600 mb-1.5">
                <Clock3 size={11} />
                {copy.deliveryLabel}
              </p>
              <p className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                {copy.delivery}
              </p>
            </div>
          </div>

          {chrome?.vatNote && (
            <p className="text-sm text-slate-500 dark:text-gray-500 mb-8 -mt-4">{chrome.vatNote}</p>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              onClick={() => goToContact(intentType, `${category}_page_hero`)}
              variant="primary"
              size="lg"
              className="group/cta w-full sm:w-auto"
            >
              {copy.cta ?? chrome.quoteCta}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/cta:translate-x-1"
              />
            </Button>

            {copy.secondaryCta && (
              <Button
                onClick={() => goToContact(INTENT.DISCOVERY, `${category}_page_hero_discovery`)}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {copy.secondaryCta}
              </Button>
            )}
          </div>
        </Reveal>
      </section>

      {/* 2 — Frentes */}
      {items.length > 0 && (
        <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
          <div className="max-w-5xl mx-auto">
            <Reveal className="mb-8 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                {copy.frontsTitle}
              </h2>
              {copy.frontsIntro && (
                <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">
                  {copy.frontsIntro}
                </p>
              )}
              <div className="w-12 h-0.5 bg-blue-500 mt-4" />
            </Reveal>

            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              {items.map((front) => (
                <FrontCard key={front.name} front={front} />
              ))}
            </div>

            {copy.noteTitle && (
              <div className="mt-8 md:mt-10">
                <div className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-6 md:p-7">
                  <p className="flex items-center gap-2 text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                    <Info size={17} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    {copy.noteTitle}
                  </p>
                  <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
                    {copy.noteText}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 2a — Lo que explica qué se contrata, antes del alcance */}
      {afterFronts}

      {/* 2b — Niveles: hoy solo los tiene presencia web, dentro de desarrollo. */}
      {tiers?.length > 0 && (
        <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
          <div className="max-w-5xl mx-auto">
            <Reveal className="mb-8 md:mb-10">
              <h2 className="flex items-center gap-2.5 text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                <Layers size={22} className="text-blue-500 dark:text-blue-400 shrink-0" />
                {copy.tiersTitle}
              </h2>
              {copy.tiersIntro && (
                <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">
                  {copy.tiersIntro}
                </p>
              )}
              <div className="w-12 h-0.5 bg-blue-500 mt-4" />
            </Reveal>

            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-5 md:p-6"
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <p className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                      {tier.name}
                    </p>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {tier.price}
                    </p>
                  </div>
                  {tier.delivery && (
                    <p className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-slate-400 dark:text-gray-600 mb-3">
                      <Clock3 size={10} />
                      {tier.delivery}
                    </p>
                  )}
                  <ul className="space-y-1.5">
                    {tier.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-400 leading-relaxed"
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
        </section>
      )}

      {/* 3 — Qué incluye */}
      {copy.includes?.length > 0 && (
        <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
          <div className="max-w-5xl mx-auto">
            <Reveal className="mb-8 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                {copy.includesTitle}
              </h2>
              {copy.includesIntro && (
                <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">
                  {copy.includesIntro}
                </p>
              )}
              <div className="w-12 h-0.5 bg-blue-500 mt-4" />
            </Reveal>

            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-6 md:p-8">
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                {copy.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed"
                  >
                    <Check size={16} className="mt-1 shrink-0 text-blue-500 dark:text-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 3b — Lo propio de una sola categoría */}
      {children}

      {/* 4 — Cómo trabajamos */}
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
        <ProcessCompact
          title={copy.processTitle}
          intro={copy.processIntro}
          phases={process?.phases}
        />
      </section>

      {/* 5 — Preguntas frecuentes */}
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
        <FaqList
          title={copy.faqTitle}
          subtitle={copy.faqSubtitle}
          faqs={copy.faqs}
          idPrefix={`faq-${category}`}
        />
      </section>

      {/* 6 — CTA */}
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
            <div>
              <p className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-1">
                {copy.ctaTitle}
              </p>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-light">
                {copy.ctaText}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <Button
                onClick={() => goToContact(intentType, `${category}_page_footer`)}
                variant="primary"
                size="lg"
                className="group/cta w-full md:w-auto"
              >
                {copy.cta ?? chrome.quoteCta}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/cta:translate-x-1"
                />
              </Button>

              {copy.secondaryCta && (
                <Button
                  onClick={() => goToContact(INTENT.DISCOVERY, `${category}_page_footer_discovery`)}
                  variant="secondary"
                  size="lg"
                  className="w-full md:w-auto"
                >
                  {copy.secondaryCta}
                </Button>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => navigateTo(ROUTE_KEYS.SERVICES)}
              variant="ghost"
              size="md"
              className="text-slate-500 dark:text-gray-500"
            >
              <ArrowLeft size={15} />
              {copy.backLabel ?? chrome.backLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
