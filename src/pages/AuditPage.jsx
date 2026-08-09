import React from "react";
import { ArrowLeft, ArrowRight, Clock3, Info, ScanSearch, Tag } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";
import { EVENTS, track } from "../analytics/track.js";

/**
 * Detalle de la auditoría de procesos.
 *
 * Responde las dos preguntas que frenan la compra de un producto de
 * diagnóstico: qué recibo exactamente por ese dinero, y qué pasa después de
 * que lo reciba. Por eso el "qué pasa después" no es letra pequeña al final
 * sino un bloque propio, con el mismo peso visual que los entregables.
 */
function Deliverable({ item, index }) {
  return (
    <Reveal
      delay={index * 60}
      className="group relative rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 p-5 md:p-6 hover:border-blue-500/30 transition-colors duration-500"
    >
      <div className="flex items-start gap-4">
        <span className="shrink-0 grid place-items-center h-9 w-9 rounded-xl border border-blue-300/50 dark:border-blue-500/30 bg-blue-500/10 text-sm font-bold tabular-nums text-blue-600 dark:text-blue-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-snug mb-1.5">
            {item.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Step({ step, index, isLast }) {
  return (
    <Reveal delay={index * 90} className="relative pl-10 md:pl-12 pb-8 last:pb-0">
      {/* Línea de tiempo continua salvo en el último paso */}
      {!isLast && (
        <span className="absolute left-[15px] md:left-[19px] top-9 bottom-0 w-px bg-linear-to-b from-blue-500/50 to-slate-200 dark:to-zinc-800" />
      )}

      <span className="absolute left-0 top-0 grid place-items-center h-8 w-8 md:h-10 md:w-10 rounded-full border border-blue-400/50 bg-blue-500/10 text-xs md:text-sm font-bold tabular-nums text-blue-600 dark:text-blue-400">
        {index + 1}
      </span>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
        <h3 className="text-base md:text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
          {step.title}
        </h3>
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-500 dark:text-gray-500 border border-slate-200 dark:border-zinc-800 rounded-full px-2.5 py-0.5">
          {step.when}
        </span>
      </div>

      <p className="text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl">
        {step.text}
      </p>
    </Reveal>
  );
}

export default function AuditPage({ copy }) {
  const { navigateTo } = useRouter();

  const requestAudit = (location) => {
    track(EVENTS.AUDIT_REQUESTED, { service_id: "auditoria", service_name: copy.title, location });
    navigateTo(ROUTE_KEYS.CONTACT);
  };

  return (
    <div className="pt-32 md:pt-28 pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-slate-50 via-white to-slate-100 dark:from-[#050505] dark:via-black/80 dark:to-[#050505] z-0" />
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-3xl pointer-events-none z-0" />

      <section className="relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase">
              <ScanSearch size={13} />
              {copy.badge}
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs tracking-[0.18em] uppercase">
              {copy.discountBadge}
            </span>
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

          <Button
            onClick={() => requestAudit("audit_page_hero")}
            variant="primary"
            size="lg"
            className="group/cta"
          >
            {copy.cta}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/cta:translate-x-1"
            />
          </Button>
        </div>
      </section>

      {/* Bloque A — Qué entregamos */}
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              {copy.deliverablesTitle}
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">
              {copy.deliverablesIntro}
            </p>
            <div className="w-12 h-0.5 bg-blue-500 mt-4" />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {copy.deliverables.map((item, i) => (
              <Deliverable key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bloque B — Qué pasa después */}
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
        <div className="max-w-4xl mx-auto">
          <Reveal className="mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              {copy.afterTitle}
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">
              {copy.afterIntro}
            </p>
            <div className="w-12 h-0.5 bg-blue-500 mt-4" />
          </Reveal>

          <div>
            {copy.steps.map((step, i) => (
              <Step key={step.title} step={step} index={i} isLast={i === copy.steps.length - 1} />
            ))}
          </div>

          <Reveal delay={120} className="mt-10 md:mt-12">
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-black/30 p-5 md:p-6">
              <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-gray-600 mb-2.5">
                <Info size={12} />
                {copy.scopeTitle}
              </p>
              <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
                {copy.scopeNote}
              </p>
            </div>
          </Reveal>

          <Reveal delay={160} className="mt-8 md:mt-10">
            <div className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
              <div>
                <p className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-1">
                  {copy.title} · {copy.price}
                </p>
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-light">
                  {copy.discountBadge}
                </p>
              </div>

              <Button
                onClick={() => requestAudit("audit_page_footer")}
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
          </Reveal>

          <div className="mt-8 text-center">
            <Button
              onClick={() => navigateTo(ROUTE_KEYS.SERVICES)}
              variant="ghost"
              size="md"
              className="text-slate-500 dark:text-gray-500"
            >
              <ArrowLeft size={15} />
              {copy.backLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
