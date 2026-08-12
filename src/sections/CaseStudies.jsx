import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe2,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { useCountUp } from "../hooks/useCountUp.js";
import { useInView } from "../hooks/useInView.js";
import { useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";

function Metric({ value, suffix, prefix, label, decimals = 0, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const count = useCountUp(value, { active: inView, decimals, duration: 1400 + delay });

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl md:text-3xl font-bold tracking-tight bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent tabular-nums">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-slate-500 dark:text-gray-500 font-mono leading-tight">
        {label}
      </p>
    </div>
  );
}

function PublishedCase({ item, copy }) {
  return (
    <div className="group relative rounded-3xl border border-slate-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/50 overflow-hidden hover:border-blue-500/40 transition-colors duration-500">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700" />

      <div className="relative p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            {copy.liveLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 border border-slate-200 dark:border-zinc-800 px-2.5 py-1 rounded-full">
            <Globe2 size={11} />
            {item.sector}
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <h3 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              {item.client}
            </h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light mb-8">
              {item.summary}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 mb-3">
                  {copy.challengeLabel}
                </p>
                <ul className="space-y-2">
                  {item.challenge.map((line, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-zinc-600" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 mb-3">
                  {copy.solutionLabel}
                </p>
                <ul className="space-y-2">
                  {item.work.map((line, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                      <Check size={15} className="mt-0.5 shrink-0 text-blue-500 dark:text-blue-400" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-gray-500 border border-slate-200 dark:border-zinc-800 rounded-lg px-2 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-5 md:p-6">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-5 text-center">
                {copy.resultLabel}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {item.metrics.map((metric, i) => (
                  <Metric key={metric.label} {...metric} delay={i * 120} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-black/30 p-5 md:p-6 flex-1 flex flex-col justify-between gap-4">
              <div>
                <Sparkles size={16} className="text-blue-500 dark:text-blue-400 mb-3" />
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-light italic">
                  {item.highlight}
                </p>
              </div>

              <Button
                as="a"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="w-full group/btn"
              >
                {copy.visitLabel}
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Caso bajo NDA con cifra real. Va aparte de la grilla de tarjetas porque es
 * el único que puede mostrar un número: el resultado manda, y meterlo entre
 * cuatro tarjetas de alcance genérico lo desperdiciaría.
 */
function ConfidentialFeatured({ item, lockLabel }) {
  return (
    <div className="group relative rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 overflow-hidden mb-4 md:mb-5">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative p-5 md:p-8 grid md:grid-cols-5 gap-6 md:gap-8 items-center">
        <div className="md:col-span-2 text-center md:text-left">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-3">
            {item.metricLabel}
          </p>
          <p className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            {item.before}
          </p>
          <p className="my-1 text-blue-500 dark:text-blue-400 text-xl md:text-2xl leading-none">↓</p>
          <p className="text-2xl md:text-4xl font-bold tracking-tight bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent leading-tight">
            {item.after}
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 border border-slate-200 dark:border-zinc-800 rounded-full px-2 py-0.5">
              {item.sector}
            </span>
            <Lock size={14} className="shrink-0 text-slate-400 dark:text-zinc-600" />
          </div>

          {/* Nombre censurado: bloques sólidos, nunca texto real oculto con CSS */}
          <div className="flex items-center gap-1 mb-4" aria-label={lockLabel}>
            {item.redacted.map((width, i) => (
              <span
                key={i}
                className="h-3.5 rounded-[3px] bg-slate-300/90 dark:bg-zinc-700/90"
                style={{ width: `${width}px` }}
              />
            ))}
          </div>

          <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
            {item.scope}
          </p>

          <p className="text-xs text-slate-500 dark:text-gray-500 italic mb-4">{item.note}</p>

          <div className="flex flex-wrap gap-1.5">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-mono uppercase tracking-wider text-slate-500 dark:text-gray-500 border border-slate-200 dark:border-zinc-800 rounded px-1.5 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfidentialCard({ item, lockLabel }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 overflow-hidden hover:border-blue-500/30 transition-colors duration-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Línea de escaneo: reacciona al hover, sugiere "documento clasificado" */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/70 to-transparent transition-opacity duration-300 ${
          hovered ? "opacity-100 animate-dexel-scan" : "opacity-0"
        }`}
      />

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 border border-slate-200 dark:border-zinc-800 rounded-full px-2 py-0.5">
            {item.sector}
          </span>
          <Lock
            size={14}
            className="shrink-0 text-slate-400 dark:text-zinc-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300"
          />
        </div>

        {/* Nombre censurado: bloques sólidos, nunca texto real oculto con CSS */}
        <div className="flex items-center gap-1 mb-4" aria-label={lockLabel}>
          {item.redacted.map((width, i) => (
            <span
              key={i}
              className="h-3.5 rounded-[3px] bg-slate-300/90 dark:bg-zinc-700/90 group-hover:bg-slate-300 dark:group-hover:bg-zinc-600 transition-colors duration-500"
              style={{ width: `${width}px` }}
            />
          ))}
        </div>

        <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-5 min-h-[3.5rem]">
          {item.scope}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-mono uppercase tracking-wider text-slate-500 dark:text-gray-500 border border-slate-200 dark:border-zinc-800 rounded px-1.5 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies({ copy }) {
  const { navigateTo } = useRouter();

  return (
    <section id="casos" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-[#050505] dark:via-black/60 dark:to-[#050505] z-0" />

      <div className="max-w-6xl w-full mx-auto px-4 md:px-6 relative z-10">
        <Reveal className="mb-10 md:mb-16 text-center">
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 border border-blue-400/40 px-3 py-1 rounded-full bg-blue-500/10">
            {copy.badge}
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
            {copy.title}
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-gray-400 text-base md:text-lg leading-relaxed font-light mb-6">
            {copy.subtitle}
          </p>
          <div className="w-12 h-0.5 bg-blue-500 mx-auto" />
        </Reveal>

        <div className="space-y-6 md:space-y-8">
          {copy.published.map((item) => (
            <PublishedCase key={item.id} item={item} copy={copy} />
          ))}
        </div>

        {/* Proyectos bajo NDA: la confidencialidad se presenta como señal de
            seriedad y como razón para agendar una llamada, no como una excusa. */}
        <div className="mt-14 md:mt-20">
          <Reveal className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 border border-slate-200 dark:border-zinc-800 rounded-full px-3 py-1 mb-4">
              <ShieldCheck size={12} />
              {copy.confidential.badge}
            </div>
            <h3 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              {copy.confidential.title}
            </h3>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light">
              {copy.confidential.description}
            </p>
          </Reveal>

          {copy.confidential.featured && (
            <ConfidentialFeatured
              item={copy.confidential.featured}
              lockLabel={copy.confidential.lockLabel}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {copy.confidential.items.map((item, i) => (
              <ConfidentialCard
                key={i}
                item={item}
                lockLabel={copy.confidential.lockLabel}
              />
            ))}
          </div>

          <div className="mt-8 md:mt-10">
            <div className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
              <div>
                <p className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-1">
                  {copy.confidential.ctaTitle}
                </p>
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-light">
                  {copy.confidential.ctaText}
                </p>
              </div>
              <Button
                onClick={() => navigateTo(ROUTE_KEYS.CONTACT)}
                variant="primary"
                size="lg"
                className="shrink-0 group/cta w-full md:w-auto"
              >
                {copy.confidential.ctaButton}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
