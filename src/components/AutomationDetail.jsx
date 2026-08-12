import React from "react";
import { AlertTriangle, Bot, Sparkles } from "lucide-react";
import Reveal from "./ui/Reveal.jsx";

/**
 * Lo propio de la página de automatización: la comparación entre responder y
 * hacer, y el bloque de agentes a la medida.
 *
 * Va aparte de `CategoryPage` porque es contenido de una sola categoría, y va
 * junto en un archivo porque las dos piezas cuentan la misma idea: un chatbot
 * responde, un agente ejecuta, y construir el segundo exige herramientas que
 * hay que escribir.
 */

/**
 * La comparación se arma por columna y no como tabla: en un teléfono una tabla
 * de cuatro columnas obliga a desplazarse en horizontal, y aquí cada opción se
 * apila como tarjeta con sus propias etiquetas. Un solo DOM para los dos
 * tamaños, sin duplicar el contenido para lectores de pantalla.
 */
function BotComparison({ copy }) {
  const { lead, intro, rowLabels, columns, note } = copy;
  const rows = [
    ["does", rowLabels.does],
    ["example", rowLabels.example],
    ["when", rowLabels.when],
    ["cost", rowLabels.cost],
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <Reveal className="mb-8 md:mb-10">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          {lead}
        </h2>
        {intro && (
          <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">
            {intro}
          </p>
        )}
        <div className="w-12 h-0.5 bg-blue-500 mt-4" />
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        {columns.map((column, i) => {
          const isAgent = column.key === "agent";

          return (
            <Reveal
              key={column.key}
              delay={i * 70}
              className={`rounded-2xl border p-5 md:p-6 ${
                isAgent
                  ? "border-blue-300/60 dark:border-blue-500/30 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40"
                  : "border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40"
              }`}
            >
              <p
                className={`text-base font-bold tracking-tight mb-4 ${
                  isAgent
                    ? "text-blue-700 dark:text-blue-300"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {column.name}
              </p>

              <dl className="space-y-3">
                {rows.map(([key, label]) => (
                  <div key={key}>
                    <dt className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400 dark:text-gray-600 mb-1">
                      {label}
                    </dt>
                    <dd className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                      {column[key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          );
        })}
      </div>

      {note && (
        <Reveal delay={120}>
          <p className="mt-6 text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed font-light">
            {note}
          </p>
        </Reveal>
      )}
    </div>
  );
}

function CustomAgents({ copy }) {
  return (
    <div className="max-w-5xl mx-auto">
      <Reveal className="mb-8 md:mb-10">
        <h2 className="flex items-center gap-2.5 text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          <Bot size={24} className="text-blue-500 dark:text-blue-400 shrink-0" />
          {copy.title}
        </h2>
        <div className="w-12 h-0.5 bg-blue-500 mt-4" />
      </Reveal>

      <Reveal className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-6 md:p-8 mb-4 md:mb-5">
        <p className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          {copy.leadTitle}
        </p>
        <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
          {copy.leadText}
        </p>
      </Reveal>

      <Reveal className="mb-4 md:mb-5">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-gray-600 mb-3">
          {copy.examplesTitle}
        </p>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {copy.examples.map((example, i) => (
            <Reveal
              key={example.name}
              delay={i * 60}
              className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-5"
            >
              <p className="flex items-center gap-2 text-base font-bold tracking-tight text-slate-900 dark:text-white mb-1.5">
                <Sparkles size={15} className="text-blue-500 dark:text-blue-400 shrink-0" />
                {example.name}
              </p>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                {example.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-6 md:p-7 mb-4 md:mb-5">
        <p className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          {copy.edgeTitle}
        </p>
        <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
          {copy.edgeText}
        </p>
      </Reveal>

      {/* La advertencia va a la vista y no en letra chica: un agente que ejecuta
          puede equivocarse haciendo, y quien lo contrata tiene que saberlo antes
          de firmar, no después del primer pedido mal creado. */}
      <Reveal className="rounded-2xl border border-amber-400/50 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/20 p-6 md:p-7">
        <p className="flex items-center gap-2 text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          <AlertTriangle
            size={17}
            className="text-amber-600 dark:text-amber-400 shrink-0"
          />
          {copy.warningTitle}
        </p>
        <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
          {copy.warningText}
        </p>
      </Reveal>
    </div>
  );
}

export default function AutomationDetail({ copy }) {
  return (
    <>
      {copy.comparison && (
        <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
          <BotComparison copy={copy.comparison} />
        </section>
      )}

      {copy.agents && (
        <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
          <CustomAgents copy={copy.agents} />
        </section>
      )}
    </>
  );
}
