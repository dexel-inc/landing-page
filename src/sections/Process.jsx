import React from "react";
import {
  ArrowRight,
  FileCheck2,
  GitBranch,
  GraduationCap,
  LayoutTemplate,
  LineChart,
  Rocket,
  Search,
  Code2,
  CalendarCheck,
} from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { useInView } from "../hooks/useInView.js";

const phaseIcons = {
  Search,
  FileCheck2,
  LayoutTemplate,
  Code2,
  Rocket,
  LineChart,
};

const commitmentIcons = {
  CalendarCheck,
  FileCheck2,
  GitBranch,
  GraduationCap,
};

function PhaseCard({ phase, index }) {
  const Icon = phaseIcons[phase.iconName] ?? Search;

  return (
    <div
      className="group relative flex pl-14 md:pl-0 md:pt-16"
    >
      {/* Nodo sobre la línea del timeline */}
      <div className="absolute left-0 top-1 flex items-center justify-center md:left-1/2 md:top-6 md:-translate-x-1/2">
        <span className="absolute h-9 w-9 rounded-full bg-blue-500/15 scale-0 group-hover:scale-100 transition-transform duration-500" />
        <span className="relative flex h-3 w-3 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-50 dark:bg-[#050505] group-hover:bg-blue-500 transition-colors duration-500" />
      </div>

      <div className="relative flex w-full flex-col rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/50 p-5 md:p-6 hover:bg-white dark:hover:bg-zinc-800/70 hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
        <div className="relative flex flex-1 flex-col">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="text-slate-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300 p-2.5 bg-white/80 dark:bg-black/50 rounded-xl border border-slate-200 dark:border-zinc-800 group-hover:scale-110">
              <Icon size={22} />
            </div>
            <span className="text-3xl md:text-4xl font-bold text-slate-200 dark:text-zinc-800 group-hover:text-blue-500/25 dark:group-hover:text-blue-500/25 transition-colors duration-500 tabular-nums leading-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-1">
            {phase.title}
          </h3>
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400 mb-3">
            {phase.duration}
          </p>
          <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
            {phase.desc}
          </p>

          <div className="mt-auto pt-3 border-t border-slate-200 dark:border-zinc-800">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400 dark:text-gray-600 mb-1">
              {phase.outputLabel}
            </p>
            <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">{phase.output}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function chunk(items, size) {
  return items.reduce((acc, item, i) => {
    if (i % size === 0) acc.push([]);
    acc[acc.length - 1].push(item);
    return acc;
  }, []);
}

export default function Process({ copy, onNavigate }) {
  const [trackRef, trackInView] = useInView({ threshold: 0.05 });
  const rows = chunk(copy.phases, 3);

  return (
    <section id="proceso" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-[#050505] dark:via-black/70 dark:to-[#050505] z-0" />

      <div className="max-w-6xl w-full mx-auto px-4 md:px-6 relative z-10">
        <Reveal className="mb-12 md:mb-16 text-center">
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

        {/* Dos filas de 3: con 6 columnas las tarjetas quedaban demasiado
            angostas y el texto se partía en exceso. */}
        <div ref={trackRef} className="relative space-y-8 md:space-y-12">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative">
              {/* Riel de la fila: vertical en móvil, horizontal en desktop.
                  Se "dibuja" cuando la sección entra en viewport. */}
              <div className="absolute left-[5px] top-0 bottom-0 w-px bg-slate-200 dark:bg-zinc-800 overflow-hidden md:left-0 md:right-0 md:top-[27px] md:bottom-auto md:h-px md:w-full">
                <div
                  className={`bg-linear-to-b md:bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500 transition-[height,width] duration-[1600ms] ease-out motion-reduce:transition-none ${
                    trackInView ? "h-full w-full" : "h-0 w-full md:h-full md:w-0"
                  }`}
                  style={{ transitionDelay: `${rowIndex * 400}ms` }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-6">
                {row.map((phase, i) => (
                  <PhaseCard key={phase.title} phase={phase} index={rowIndex * 3 + i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Compromisos: el diferenciador real frente al miedo del cliente PYME */}
        <div className="mt-16 md:mt-24">
          <Reveal className="text-center mb-8 md:mb-10">
            <h3 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              {copy.commitmentsTitle}
            </h3>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light">
              {copy.commitmentsSubtitle}
            </p>
          </Reveal>

          {/* Con el cuarto compromiso, tres columnas dejaban una tarjeta sola en
              la segunda fila: dos y cuatro reparten parejo en cada tamaño. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {copy.commitments.map((commitment) => {
              const Icon = commitmentIcons[commitment.iconName] ?? CalendarCheck;
              return (
                <div
                  key={commitment.title}
                  className="group relative rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/50 p-6 hover:border-blue-500/30 hover:bg-white dark:hover:bg-zinc-800/70 transition-all duration-500 overflow-hidden"
                >
                  <div className="relative">
                    <div className="inline-flex text-blue-500 dark:text-blue-400 p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/25 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={20} />
                    </div>
                    <h4 className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                      {commitment.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                      {commitment.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button
              onClick={() => onNavigate?.("/contacto")}
              variant="primary"
              size="lg"
              className="group/cta"
            >
              {copy.cta}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
