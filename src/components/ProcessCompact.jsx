import React from "react";
import {
  Code2,
  FileCheck2,
  LayoutTemplate,
  LineChart,
  Rocket,
  Search,
} from "lucide-react";
import Reveal from "./ui/Reveal.jsx";

const phaseIcons = { Search, FileCheck2, LayoutTemplate, Code2, Rocket, LineChart };

/**
 * Las mismas seis fases de la home, en versión compacta.
 *
 * Lee de `copy.process.phases`, que es la única fuente: si mañana cambia una
 * fase, cambia en la home y en las tres páginas de categoría a la vez. Aquí se
 * omiten el entregable y el riel animado —eso es lo que hace de esta la versión
 * compacta— y se conserva lo que el visitante necesita para decidir: qué pasa
 * en cada fase y cuánto dura.
 */
export default function ProcessCompact({ title, intro, phases = [] }) {
  if (!phases.length) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <Reveal className="mb-8 md:mb-10">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          {title}
        </h2>
        {intro && (
          <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">
            {intro}
          </p>
        )}
        <div className="w-12 h-0.5 bg-blue-500 mt-4" />
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {phases.map((phase, index) => {
          const Icon = phaseIcons[phase.iconName] ?? Search;

          return (
            <div
              key={phase.title}
              className="group relative rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 p-5 hover:border-blue-500/30 transition-colors duration-500"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="text-slate-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300 p-2 bg-white/80 dark:bg-black/50 rounded-lg border border-slate-200 dark:border-zinc-800">
                  <Icon size={18} />
                </div>
                <span className="text-2xl font-bold text-slate-200 dark:text-zinc-800 tabular-nums leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white mb-1">
                {phase.title}
              </h3>
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400 mb-2.5">
                {phase.duration}
              </p>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                {phase.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
