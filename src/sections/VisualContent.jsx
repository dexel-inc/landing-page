import React from "react";
import { VisualPortfolio, VisualWhatsAppButton } from "../components/VisualContentShared.jsx";
import { Link } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";

/**
 * "Advertising images and videos" on the services index: a single summary
 * card that points to the page with the packages and their detail. The
 * `imagenes-videos` id stays, because that anchor may already be shared.
 *
 * The surface is the one `CategoryCard` uses. The button is the same one the
 * page has, with the same message and the same conversion event.
 */
export default function VisualContent({ copy }) {
  return (
    <section
      id="imagenes-videos"
      aria-labelledby="imagenes-videos-titulo"
      className="relative z-10 px-4 md:px-6 pt-16 md:pt-24"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 lg:items-center rounded-3xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm p-6 md:p-10">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 mb-3">
            {copy.badge}
          </p>
          <h2
            id="imagenes-videos-titulo"
            className="text-2xl md:text-4xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white mb-4"
          >
            {copy.title}
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 mb-5">
            <span className="font-semibold text-slate-900 dark:text-white">{copy.promiseLead}</span>{" "}
            {copy.promiseRest}
          </p>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase">
            {copy.delivery}
          </span>
        </div>

        <div>
          <ul className="mb-6">
            {copy.packages.map((pkg) => (
              <li
                key={pkg.id}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-slate-200 dark:border-zinc-800 py-3 first:pt-0"
              >
                <span className="text-base font-bold text-slate-900 dark:text-white">{pkg.name}</span>
                <span className="text-sm text-slate-600 dark:text-gray-300">
                  <span className="font-bold text-blue-600 dark:text-blue-400">{pkg.price}</span>{" "}
                  {pkg.note}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <Link
              to={ROUTE_KEYS.VISUAL_CONTENT}
              aria-label={copy.summaryCtaAria}
              className="inline-flex min-h-12 items-center justify-center rounded-lg text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#50A2FF] px-1"
            >
              {copy.summaryCta}
            </Link>
            <VisualWhatsAppButton copy={copy} />
          </div>
        </div>
      </div>

      <VisualPortfolio copy={copy.portfolio} />
    </section>
  );
}
