import React from "react";
import {
  ArrowDown,
  ArrowRight,
  ClipboardList,
  Copy,
  CreditCard,
  Gauge,
  Lightbulb,
  MessageSquareQuote,
  Plug,
  ScanSearch,
  ShieldAlert,
  UserCog,
} from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";

const auditIcons = {
  Copy,
  ClipboardList,
  CreditCard,
  UserCog,
  Gauge,
  ShieldAlert,
  Plug,
};

/**
 * Tarjeta de "replanteo": lo que el cliente pidió, lo que encontramos al
 * auditar el proceso, y lo que terminamos proponiendo. Es la forma más
 * concreta de mostrar que aportamos criterio y no solo horas de código.
 */
function ReframeCard({ item, copy, index }) {
  return (
    <Reveal
      delay={index * 120}
      className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/50 p-5 md:p-6 hover:border-blue-500/30 hover:bg-white dark:hover:bg-zinc-800/70 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative flex flex-1 flex-col">
        {/* 1. Lo que pidió */}
        <div>
          <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400 dark:text-gray-600 mb-2">
            <MessageSquareQuote size={12} />
            {copy.askedLabel}
          </p>
          <p className="text-sm text-slate-500 dark:text-gray-500 leading-relaxed italic">
            “{item.asked}”
          </p>
        </div>

        <div className="flex justify-center py-3">
          <ArrowDown
            size={14}
            className="text-slate-300 dark:text-zinc-700 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-y-0.5 transition-all duration-500"
          />
        </div>

        {/* 2. Lo que encontramos al revisar el proceso */}
        <div>
          <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400 mb-2">
            <ScanSearch size={12} />
            {copy.foundLabel}
          </p>
          <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">{item.found}</p>
        </div>

        <div className="flex justify-center py-3">
          <ArrowDown
            size={14}
            className="text-slate-300 dark:text-zinc-700 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-y-0.5 transition-all duration-500"
          />
        </div>

        {/* 3. Lo que propusimos */}
        <div className="mt-auto rounded-xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/70 to-white dark:from-blue-900/25 dark:via-zinc-900/60 dark:to-zinc-900/30 p-4">
          <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400 mb-2">
            <Lightbulb size={12} />
            {copy.proposedLabel}
          </p>
          <p className="text-sm text-slate-700 dark:text-gray-200 leading-relaxed font-medium">
            {item.proposed}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Advisory({ copy, onNavigate }) {
  return (
    <section id="asesoria" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-[#050505] dark:via-black/60 dark:to-[#050505] z-0" />

      <div className="max-w-6xl w-full mx-auto px-4 md:px-6 relative z-10">
        <Reveal className="mb-10 md:mb-16 text-center">
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 border border-blue-400/40 px-3 py-1 rounded-full bg-blue-500/10">
            {copy.badge}
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
            {copy.title}
          </h2>
          <p className="max-w-3xl mx-auto text-slate-600 dark:text-gray-400 text-base md:text-lg leading-relaxed font-light mb-6">
            {copy.subtitle}
          </p>
          <div className="w-12 h-0.5 bg-blue-500 mx-auto" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {copy.reframes.map((item, i) => (
            <ReframeCard key={i} item={item} copy={copy} index={i} />
          ))}
        </div>

        {/* Qué se revisa en la auditoría: hace tangible el "analizamos" */}
        <div className="mt-14 md:mt-20">
          <Reveal className="text-center mb-8 md:mb-10">
            <h3 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              {copy.auditTitle}
            </h3>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light">
              {copy.auditSubtitle}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {copy.auditPoints.map((point, i) => {
              const Icon = auditIcons[point.iconName] ?? ClipboardList;
              return (
                <Reveal
                  key={point.title}
                  delay={i * 70}
                  className="group relative rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 p-5 hover:border-blue-500/30 hover:bg-white dark:hover:bg-zinc-800/60 transition-all duration-500"
                >
                  <div className="inline-flex text-slate-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 p-2 bg-white/80 dark:bg-black/50 rounded-lg border border-slate-200 dark:border-zinc-800 mb-3 group-hover:scale-110 transition-all duration-300">
                    <Icon size={18} />
                  </div>
                  <h4 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white mb-1.5">
                    {point.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                    {point.desc}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Cierre: la promesa que ninguna fábrica de páginas hace */}
        <Reveal delay={120} className="mt-12 md:mt-16">
          <div className="relative rounded-3xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-6 md:p-10 overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="max-w-2xl">
                <p className="text-lg md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 leading-snug">
                  {copy.pledgeTitle}
                </p>
                <p className="text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed font-light">
                  {copy.pledgeText}
                </p>
              </div>
              <Button
                onClick={() => onNavigate?.("/contacto")}
                variant="primary"
                size="lg"
                className="shrink-0 group/cta w-full md:w-auto"
              >
                {copy.cta}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/cta:translate-x-1"
                />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
