import React from "react";
import { Info } from "lucide-react";

/**
 * Línea de tiempo "qué pasa después de la auditoría" y su nota de alcance.
 *
 * Vive en un componente propio porque aparece en dos sitios: en el detalle de
 * la auditoría y en la tarjeta destacada de la home. Es el bloque que sostiene
 * la venta de un producto de $450 —nadie paga esa cifra sin ver el camino
 * completo antes de dar clic—, así que no puede depender de que el visitante
 * navegue a otra página para encontrarlo.
 *
 * En pantallas anchas los cuatro pasos van en fila, como la sección de proceso
 * de seis fases; en móvil la fila se convierte en columna y el conector pasa a
 * ser vertical.
 */
function Step({ step, index, isLast, compact }) {
  const bullet = compact ? "h-7 w-7 text-[11px]" : "h-8 w-8 md:h-10 md:w-10 text-xs md:text-sm";
  const connectorTop = compact ? "md:top-[13px]" : "md:top-[19px]";
  const connectorShift = compact ? "md:translate-x-4" : "md:translate-x-6";

  return (
    <div
      className={`relative flex-1 flex gap-4 md:block ${compact ? "pb-6" : "pb-8"} last:pb-0 md:pb-0`}
    >
      {/* Conector: vertical en móvil, horizontal en escritorio. */}
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
 * Nota de alcance mínimo. Tratamiento de aclaración y no de bloque destacado:
 * su función es filtrar al cliente demasiado pequeño antes de que pague, no
 * competir con la oferta.
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
