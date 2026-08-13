import React from "react";
import { ArrowRight, Clock3, ScanSearch, Tag, Wrench, Zap } from "lucide-react";
import { Link } from "../router/RouterContext.jsx";

/**
 * Tarjeta de resumen de una categoría de servicio: precio de entrada,
 * entrega, sus frentes de trabajo y un enlace a la página completa.
 *
 * Compartida entre el índice de servicios (`ServicesPage`) y el bloque de
 * servicios del inicio (`sections/Services`): las dos tienen el mismo
 * trabajo —enrutar a la categoría, no vender el detalle— y antes tenían dos
 * diseños que se iban desincronizando.
 */
const categoryIcons = { webDev: Wrench, automation: Zap, audit: ScanSearch };

export default function CategoryCard({ category, copy, chrome, onOpen }) {
  const Icon = categoryIcons[category.key] ?? Wrench;

  return (
    <div className="group relative flex flex-col rounded-3xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm hover:border-blue-500/30 transition-colors duration-500 overflow-hidden">
      <div className="relative flex flex-1 flex-col p-5 md:p-7">
        <div className="flex items-start gap-4 mb-4">
          <div className="shrink-0 text-slate-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300 p-2.5 bg-white/80 dark:bg-black/50 rounded-xl border border-slate-200 dark:border-zinc-800 group-hover:scale-110">
            <Icon size={22} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-1.5">
              {category.navLabel}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1.5 text-base font-bold text-blue-600 dark:text-blue-400">
                <Tag size={13} />
                {category.price}
              </span>
              {chrome?.vatLabel && (
                <span className="text-xs text-slate-500 dark:text-gray-500">{chrome.vatLabel}</span>
              )}
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-500 font-mono uppercase tracking-[0.12em]">
                <Clock3 size={12} />
                {category.delivery}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed mb-5">
          {category.subtitle}
        </p>

        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-500 dark:text-blue-400 mb-3">
          {copy.categoryLabel}
        </p>
        <ul className="space-y-1.5 mb-6">
          {category.fronts.map((name) => (
            <li
              key={name}
              className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-400 leading-relaxed"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-zinc-600" />
              {name}
            </li>
          ))}
        </ul>

        {/* `Link` y no un botón: quien llega sin JavaScript —incluidos los
            rastreadores— tiene que poder llegar a las tres categorías. */}
        <Link
          to={category.routeKey}
          onClick={onOpen}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl h-11 px-6 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 dark:text-slate-900 shadow-[0_12px_30px_-14px_rgba(37,99,235,0.7)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 group/cta"
        >
          {copy.categoryCta}
          <ArrowRight size={16} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
