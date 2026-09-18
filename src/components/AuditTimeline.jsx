import React from "react";
import { Info } from "lucide-react";

/**
 * "What happens after the audit" timeline and its scope note.
 *
 * Lives in its own component because it appears in two places: in the
 * audit's detail page and in the home page's featured card. It's the block
 * that carries the sale of a $450 product —nobody pays that figure without
 * seeing the whole path before clicking—, so it can't depend on the
 * visitor navigating to another page to find it.
 *
 * On wide screens the four steps run in a row, like the six-phase process
 * section; on mobile the row becomes a column and the connector turns vertical.
 */
function Step({ step, index, isLast, compact }) {
  const bullet = compact ? "h-7 w-7 text-[11px]" : "h-8 w-8 md:h-10 md:w-10 text-xs md:text-sm";
  const connectorTop = compact ? "md:top-[13px]" : "md:top-[19px]";
  const connectorShift = compact ? "md:translate-x-4" : "md:translate-x-6";

  return (
    <div
      className={`relative flex-1 flex gap-4 md:block ${compact ? "pb-6" : "pb-8"} last:pb-0 md:pb-0`}
    >
      {/* Connector: vertical on mobile, horizontal on desktop. */}
      {!isLast && (
        <span
          className={`absolute left-[13px] top-9 bottom-0 w-px md:left-auto md:bottom-auto md:h-px md:w-full ${connectorTop} ${connectorShift} bg-linear-to-b md:bg-linear-to-r from-blue-500/50 to-slate-200 dark:to-zinc-800`}
        />
      )}

      <span
        className={`relative z-10 shrink-0 grid place-items-center ${bullet} rounded-full border border-blue-400/50 bg-blue-500/10 font-bold tabular-nums text-blue-600 dark:text-blue-400 ${compact ? "md:mb-3.5" : "md:mb-5"}`}
      >
        {index + 1}
      </span>

      <div className="md:pr-6">
        <span className="inline-block text-[10px] font-mono uppercase tracking-[0.15em] text-slate-500 dark:text-gray-500 border border-slate-200 dark:border-zinc-800 rounded-full px-2.5 py-0.5 mb-2">
          {step.when}
        </span>

        <h3
          className={`font-bold tracking-tight text-slate-900 dark:text-white leading-snug mb-2 ${
            compact ? "text-sm" : "text-base md:text-lg"
          }`}
        >
          {step.title}
        </h3>

        <p
          className={`text-slate-600 dark:text-gray-400 leading-relaxed ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {step.text}
        </p>
      </div>
    </div>
  );
}

export function AuditSteps({ steps, compact = false }) {
  return (
    <div className="flex flex-col md:flex-row md:gap-2">
      {steps.map((step, i) => (
        <Step
          key={step.title}
          step={step}
          index={i}
          isLast={i === steps.length - 1}
          compact={compact}
        />
      ))}
    </div>
  );
}

/**
 * Minimum scope note. Treated as a clarification, not a highlighted block:
 * its job is to filter out clients that are too small before they pay, not
 * to compete with the offer.
 */
export function AuditScopeNote({ title, text, compact = false }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-black/30 ${
        compact ? "p-4" : "p-5 md:p-6"
      }`}
    >
      <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-gray-600 mb-2.5">
        <Info size={12} />
        {title}
      </p>
      <p
        className={`text-slate-600 dark:text-gray-300 leading-relaxed ${
          compact ? "text-xs md:text-sm" : "text-sm md:text-base"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
