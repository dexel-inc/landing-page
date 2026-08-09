import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Code,
  Cpu,
  FileText,
  Globe,
  Lightbulb,
  MessageCircle,
  Plug,
  ScanSearch,
  Sparkles,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { useRouter } from "../router/RouterContext.jsx";
import { EVENTS, track } from "../analytics/track.js";

const iconComponents = {
  Code,
  Cpu,
  FileText,
  Globe,
  MessageCircle,
  Plug,
  ScanSearch,
  Sparkles,
  Wrench,
  Zap,
};

/**
 * Tarjeta de servicio. La columna derecha reemplaza la ilustración genérica
 * anterior por la información que realmente usa el visitante para decidir:
 * si el servicio es para él, cuánto tarda y cómo se ve resuelto.
 */
function ServiceCard({ service, index, copy, onQuote }) {
  const Icon = iconComponents[service.iconName] ?? Code;

  return (
    <Reveal
      delay={index * 80}
      className="group relative rounded-3xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm overflow-hidden hover:border-blue-500/30 transition-colors duration-500"
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative grid lg:grid-cols-5 gap-6 lg:gap-8 p-5 md:p-7">
        {/* Qué es y qué cuesta */}
        <div className="lg:col-span-3">
          <div className="flex items-start gap-4 mb-5">
            <div className="shrink-0 text-slate-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 p-2.5 bg-white/80 dark:bg-black/50 rounded-xl border border-slate-200 dark:border-zinc-800 group-hover:scale-110 transition-all duration-300">
              <Icon size={22} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-1.5">
                {service.title}
              </h3>
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                <span className="text-lg font-bold text-blue-500 dark:text-blue-400">
                  {service.price}
                </span>
                <span className="text-xs text-slate-500 dark:text-gray-500">
                  {service.pricingNote}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
            {service.description}
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

          <Button
            onClick={() => onQuote(service.id)}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto group/cta"
          >
            {copy.ctaButton}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/cta:translate-x-1"
            />
          </Button>
        </div>

        {/* Información de decisión */}
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

          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-black/30 p-5">
            <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-gray-600 mb-2">
              <Clock3 size={12} />
              {copy.deliveryLabel}
            </p>
            <p className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              {service.delivery}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-black/30 p-5 flex-1">
            <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-gray-600 mb-2.5">
              <Lightbulb size={12} />
              {copy.exampleLabel}
            </p>
            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed italic">
              {service.example}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function ServicesPage({ copy }) {
  const { navigate } = useRouter();
  const [openFaqs, setOpenFaqs] = useState(() => new Set());

  const lines = copy.lines ?? [];

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleQuote = (serviceId) => {
    track(EVENTS.CTA_CLICK, { location: "services_page", service: serviceId });
    navigate("/contacto");
  };

  return (
    <main className="pt-32 md:pt-28 pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-slate-50 via-white to-slate-100 dark:from-[#050505] dark:via-black/80 dark:to-[#050505] z-0" />
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-3xl pointer-events-none z-0" />

      <section className="relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase mb-6">
            {copy.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
            {copy.title}
          </h1>
          <p className="text-base md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            {copy.linesIntro}
          </p>
        </div>

        {/* Navegación por línea: permite saltar a lo que se busca sin recorrer
            toda la página, que era el problema del listado anterior. */}
        <nav className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2 mb-14 md:mb-20">
          {lines.map((line) => (
            <a
              key={line.id}
              href={`#${line.id}`}
              className="text-xs md:text-sm px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 transition-colors duration-300"
            >
              {line.name}
            </a>
          ))}
        </nav>
      </section>

      {lines.map((line, lineIndex) => (
        <section key={line.id} id={line.id} className="relative z-10 px-4 md:px-6 mb-14 md:mb-20">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-6 md:mb-8">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl md:text-4xl font-bold text-slate-200 dark:text-zinc-800 tabular-nums leading-none">
                  {String(lineIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {line.name}
                </h2>
              </div>
              <p className="text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed font-light max-w-2xl">
                {line.tagline}
              </p>
              <div className="w-12 h-0.5 bg-blue-500 mt-4" />
            </Reveal>

            <div className="space-y-5 md:space-y-6">
              {line.items.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  copy={copy}
                  onQuote={handleQuote}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="relative z-10 px-4 md:px-6 pt-6 md:pt-10">
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

                  {/* grid-rows 0fr→1fr anima la altura sin medirla en JS */}
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
    </main>
  );
}
