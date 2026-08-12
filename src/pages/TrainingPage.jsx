import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  BadgePercent,
  Calculator,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  GraduationCap,
  Hammer,
  Info,
  Map,
  Tag,
  Users,
} from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import FaqList from "../components/ui/FaqList.jsx";
import { useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";
import { PRICES } from "../config/pricing.js";
import { EVENTS, track } from "../analytics/track.js";
import { INTENT, setIntent } from "../analytics/intent.js";

/**
 * Formación in-company.
 *
 * No usa `CategoryPage`: esa plantilla describe un servicio que Dexel ejecuta
 * —frentes, alcance, entrega— y aquí lo que se compra es que el equipo del
 * cliente termine sabiendo hacerlo. La estructura es otra: programa, formatos y
 * qué se lleva puesto cada participante.
 *
 * El sistema visual sí es el mismo del resto del sitio; no es un rediseño.
 */

const blockIcons = { Ban, Calculator, Map, Hammer, AlertTriangle, Code2 };

/**
 * Los seis bloques como acordeón: el orden es parte del argumento —empezar por
 * qué NO automatizar es lo que separa esto de un curso genérico— y con seis
 * tarjetas abiertas ese orden se pierde en el desplazamiento.
 *
 * El texto queda siempre en el HTML aunque el bloque esté cerrado, para que un
 * rastreador lea el temario completo.
 */
function ProgramBlocks({ copy }) {
  const [openBlocks, setOpenBlocks] = useState(() => new Set());

  const toggle = (key) => {
    setOpenBlocks((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {copy.blocks.map((block, index) => {
        const Icon = blockIcons[block.iconName] ?? Hammer;
        const isOpen = openBlocks.has(block.key);
        const panelId = `training-block-${block.key}`;

        return (
          <Reveal
            key={block.key}
            delay={index * 60}
            className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${
              block.highlight
                ? "border-blue-300/60 dark:border-blue-500/30 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40"
                : isOpen
                  ? "border-blue-400/50 bg-white/90 dark:bg-zinc-900/80"
                  : "border-slate-200 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/60 hover:border-blue-500/30"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(block.key)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center gap-4 text-left px-5 py-4 md:px-6 md:py-5 cursor-pointer hover:bg-slate-50/60 dark:hover:bg-zinc-800/40 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/40"
            >
              <span className="shrink-0 text-slate-800 dark:text-white p-2.5 bg-white/80 dark:bg-black/50 rounded-xl border border-slate-200 dark:border-zinc-800">
                <Icon size={18} />
              </span>

              <span className="flex-1 min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                    {String(index + 1).padStart(2, "0")}. {block.title}
                  </h3>
                  {block.highlight && (
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                      {copy.highlightLabel}
                    </span>
                  )}
                </span>
              </span>

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

            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <div className="h-px bg-slate-200 dark:bg-zinc-800 mb-4" />
                  <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
                    {block.text}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function TrainingPage({ copy }) {
  const { navigateTo, locale } = useRouter();

  useEffect(() => {
    // El idioma va explícito y no por el que guarda la capa de medición: los
    // efectos de los hijos corren antes que el del contenedor que lo inyecta.
    track(EVENTS.TRAINING_PAGE_VIEWED, { locale });
  }, [locale]);

  /**
   * El clic no es la conversión: la conversión es entregar la conversación a
   * WhatsApp. Aquí solo se declara con qué intención va el visitante —y con qué
   * formato, que es lo que le da valor monetario al evento— para que al
   * convertir se cuente `TrainingRequested` y no la conversión genérica.
   */
  const requestTraining = (format, location) => {
    setIntent({
      type: INTENT.TRAINING,
      service_id: "formacion",
      service_name: copy.navLabel,
      format: format?.key ?? "unspecified",
      value: format?.value ? PRICES[format.value] : undefined,
      location,
    });

    track(EVENTS.CTA_CLICK, { service_id: "formacion", format: format?.key, location });
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase mb-6">
            <GraduationCap size={13} />
            {copy.badge}
          </span>

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
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-black/30 px-6 py-4 min-w-40 flex flex-col justify-center">
              <p className="flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-gray-600 mb-1.5">
                <Clock3 size={11} />
                {copy.formatLabel}
              </p>
              <p className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                {copy.formatSummary}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              onClick={() => requestTraining(null, "training_page_hero")}
              variant="primary"
              size="lg"
              className="group/cta w-full sm:w-auto"
            >
              {copy.cta}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/cta:translate-x-1"
              />
            </Button>

            <Button
              onClick={() => {
                setIntent({ type: INTENT.DISCOVERY, location: "training_page_hero_discovery" });
                track(EVENTS.CTA_CLICK, { location: "training_page_hero_discovery" });
                navigateTo(ROUTE_KEYS.CONTACT);
              }}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {copy.secondaryCta}
            </Button>
          </div>
        </Reveal>
      </section>

      {/* 2 — El dato que explica por qué existe esta formación */}
      <section className="relative z-10 px-4 md:px-6 pt-14 md:pt-20">
        <Reveal className="max-w-5xl mx-auto rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <p className="text-5xl md:text-6xl font-black tracking-tight text-blue-600 dark:text-blue-400 shrink-0 tabular-nums">
              {copy.stat.value}
            </p>
            <div>
              <p className="text-base md:text-lg text-slate-700 dark:text-gray-200 leading-relaxed">
                {copy.stat.text}
              </p>
              {/* La fuente va a la vista: el dato es de un tercero y sin fuente
                  sería una cifra más de las que este mercado repite sin citar. */}
              <p className="mt-2 text-xs text-slate-500 dark:text-gray-500">{copy.stat.source}</p>
            </div>
          </div>
          <p className="mt-5 pt-5 border-t border-slate-200 dark:border-zinc-800 text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
            {copy.stat.note}
          </p>
        </Reveal>
      </section>

      {/* 3 — Posicionamiento: qué no es esto */}
      <section className="relative z-10 px-4 md:px-6 pt-8 md:pt-10">
        <Reveal className="max-w-5xl mx-auto rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-6 md:p-7">
          <p className="flex items-center gap-2 text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            <Info size={17} className="text-blue-600 dark:text-blue-400 shrink-0" />
            {copy.noteTitle}
          </p>
          <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
            {copy.noteText}
          </p>
        </Reveal>
      </section>

      {/* 4 — Programa */}
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              {copy.programTitle}
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">
              {copy.programIntro}
            </p>
            <div className="w-12 h-0.5 bg-blue-500 mt-4" />
          </Reveal>

          <ProgramBlocks copy={copy} />
        </div>
      </section>

      {/* 5 — Formatos, lo incluido y el crédito */}
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              {copy.formatsTitle}
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">
              {copy.formatsIntro}
            </p>
            <div className="w-12 h-0.5 bg-blue-500 mt-4" />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {copy.formats.map((format, i) => (
              <Reveal
                key={format.key}
                delay={i * 70}
                className={`flex flex-col rounded-2xl border p-5 md:p-6 ${
                  format.featured
                    ? "border-blue-300/60 dark:border-blue-500/30 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40"
                    : "border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40"
                }`}
              >
                <p className="text-base font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                  {format.name}
                </p>

                <dl className="space-y-3 mb-5">
                  <div>
                    <dt className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400 dark:text-gray-600 mb-1">
                      <Clock3 size={10} />
                      {copy.formatLabels.duration}
                    </dt>
                    <dd className="text-sm text-slate-600 dark:text-gray-300">{format.duration}</dd>
                  </div>

                  <div>
                    <dt className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400 dark:text-gray-600 mb-1">
                      <Users size={10} />
                      {copy.formatLabels.participants}
                    </dt>
                    <dd className="text-sm text-slate-600 dark:text-gray-300">
                      {format.participants}
                    </dd>
                  </div>

                  <div>
                    <dt className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400 dark:text-gray-600 mb-1">
                      <Tag size={10} />
                      {copy.formatLabels.price}
                    </dt>
                    <dd className="text-lg font-bold tracking-tight text-blue-600 dark:text-blue-400">
                      {format.price}
                    </dd>
                  </div>
                </dl>

                <Button
                  onClick={() => requestTraining(format, `training_page_format_${format.key}`)}
                  variant={format.featured ? "primary" : "secondary"}
                  size="md"
                  className="mt-auto w-full"
                >
                  {copy.formatLabels.cta}
                </Button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-6 md:p-7">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-gray-600 mb-3">
              {copy.includedTitle}
            </p>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
              {copy.included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed"
                >
                  <Check size={16} className="mt-1 shrink-0 text-blue-500 dark:text-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* El crédito va en verde y no en azul: es el mismo tratamiento que
              lleva el descuento de la auditoría, y son el mismo mecanismo. */}
          <Reveal delay={150} className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-50/80 dark:bg-emerald-950/20 p-6 md:p-7">
            <p className="flex items-center gap-2 text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">
              <BadgePercent size={17} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              {copy.creditTitle}
            </p>
            <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
              {copy.creditText}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6 — Preguntas frecuentes */}
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
        <FaqList
          title={copy.faqTitle}
          subtitle={copy.faqSubtitle}
          faqs={copy.faqs}
          idPrefix="faq-training"
        />
      </section>

      {/* 7 — CTA */}
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-20">
        <div className="max-w-5xl mx-auto">
          <Reveal className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
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
                onClick={() => requestTraining(null, "training_page_footer")}
                variant="primary"
                size="lg"
                className="group/cta w-full md:w-auto"
              >
                {copy.cta}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/cta:translate-x-1"
                />
              </Button>

              <Button
                onClick={() => {
                  setIntent({ type: INTENT.DISCOVERY, location: "training_page_footer_discovery" });
                  track(EVENTS.CTA_CLICK, { location: "training_page_footer_discovery" });
                  navigateTo(ROUTE_KEYS.CONTACT);
                }}
                variant="secondary"
                size="lg"
                className="w-full md:w-auto"
              >
                {copy.secondaryCta}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
