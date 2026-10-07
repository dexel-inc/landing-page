import React from "react";
import Reveal from "../components/ui/Reveal.jsx";
import {
  VisualPortfolio,
  VisualWhatsAppButton,
  visualOutlineClass,
} from "../components/VisualContentShared.jsx";
import { Link } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";

/**
 * "Advertising images and videos": hero with the three prices, a card per
 * package that jumps to its detail, the detail of each one and a closing band.
 *
 * It's not built on `CategoryPage`: that template brings a fixed FAQ and
 * process, and this page has neither. It takes its surfaces and spacing from
 * it so the two look like the same site. Every package's `id` is also the
 * anchor the menu and the cards point to; `section[id]` already carries the
 * `scroll-margin-top` that leaves it below the header.
 */

const eyebrowClass =
  "text-[10px] font-mono uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400";
const pillClass =
  "inline-flex items-center px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase";
const cardClass =
  "rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 p-5 md:p-6";

function Chips({ chips }) {
  if (chips.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <li
          key={chip}
          className="rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black/40 px-3 py-1 text-xs text-slate-600 dark:text-gray-300"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ title, intro }) {
  return (
    <Reveal className="mb-8 md:mb-10">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
        {title}
      </h2>
      {intro && (
        <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">{intro}</p>
      )}
      <div className="w-12 h-0.5 bg-blue-500 mt-4" />
    </Reveal>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed"
        >
          <span
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function PackageDetail({ copy, pkg }) {
  const headingId = `${pkg.id}-titulo`;

  return (
    <section
      id={pkg.id}
      aria-labelledby={headingId}
      className="relative z-10 px-4 md:px-6 pt-16 md:pt-24"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h2
            id={headingId}
            className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2"
          >
            {pkg.name}
          </h2>
          <p className="flex flex-wrap items-baseline gap-x-2 mb-4">
            <span className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
              {pkg.price}
            </span>
            {pkg.unit && (
              <span className="text-sm md:text-base text-slate-500 dark:text-gray-400">{pkg.unit}</span>
            )}
          </p>
          <Chips chips={pkg.chips} />
        </div>

        <div className="grid gap-4 md:gap-5 lg:grid-cols-[1fr_1.25fr_1fr]">
          <div className={cardClass}>
            <h3 className={`${eyebrowClass} mb-4`}>{copy.includesTitle}</h3>
            <BulletList items={pkg.includes} />
          </div>

          <div className={cardClass}>
            <h3 className={`${eyebrowClass} mb-4`}>{copy.stepsTitle}</h3>
            <ol className="space-y-5">
              {pkg.steps.map((step, index) => (
                <li key={step.title} className="flex items-start gap-3.5">
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/10 text-sm font-bold text-blue-600 dark:text-blue-300"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-snug mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
                      {step.text}
                    </p>
                    {step.when && (
                      <span className="mt-2 inline-flex items-center rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black/40 px-3 py-1 text-xs text-slate-600 dark:text-gray-300">
                        {step.when}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={cardClass}>
            <h3 className={`${eyebrowClass} mb-4`}>{copy.needsTitle}</h3>
            <BulletList items={pkg.needs} />
          </div>
        </div>

        <div className="mt-6 flex">
          <VisualWhatsAppButton copy={copy} />
        </div>
      </div>
    </section>
  );
}

export default function VisualContentPage({ copy }) {
  return (
    <div className="pt-[calc(var(--header-h)+2rem)] pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-slate-50/80 via-white/60 to-slate-100/80 dark:from-[#050505]/85 dark:via-black/55 dark:to-[#050505]/85 z-0" />
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-3xl pointer-events-none z-0" />

      {/* 1 — Hero */}
      <section className="relative z-10 px-4 md:px-6">
        <Reveal className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-2.5 mb-6">
            <span className={pillClass}>{copy.badge}</span>
            <span className={pillClass}>{copy.delivery}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
            {copy.title}
          </h1>
          <p className="text-base md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            <strong className="font-semibold text-slate-900 dark:text-white">{copy.promiseLead}</strong>{" "}
            {copy.promiseRest}
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-8 text-left md:text-center">
            {copy.packages.map((pkg) => (
              <li
                key={pkg.id}
                className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 px-6 py-4"
              >
                <p className={`${eyebrowClass} mb-1.5`}>{pkg.name}</p>
                <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {pkg.price}
                </p>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">{pkg.note}</p>
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <VisualWhatsAppButton copy={copy} />
          </div>
        </Reveal>
      </section>

      {/* 2 — Package picker */}
      <section
        aria-labelledby="paquetes-titulo"
        className="relative z-10 px-4 md:px-6 pt-16 md:pt-24"
      >
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-8 md:mb-10">
            <h2
              id="paquetes-titulo"
              className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3"
            >
              {copy.packagesTitle}
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">
              {copy.packagesIntro}
            </p>
            <div className="w-12 h-0.5 bg-blue-500 mt-4" />
          </Reveal>

          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
            {copy.packages.map((pkg) => (
              <li key={pkg.id} className="flex">
                <Link
                  to={ROUTE_KEYS.VISUAL_CONTENT}
                  hash={pkg.id}
                  className={`group flex w-full flex-col rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 p-5 md:p-6 hover:border-blue-500/30 transition-colors duration-500 ${visualOutlineClass}`}
                >
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug mb-1.5">
                    {pkg.name}
                  </h3>
                  <p className="flex flex-wrap items-baseline gap-x-2 mb-4">
                    <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                      {pkg.price}
                    </span>
                    {pkg.unit && (
                      <span className="text-sm text-slate-500 dark:text-gray-400">{pkg.unit}</span>
                    )}
                  </p>
                  {pkg.chips.length > 0 && (
                    <div className="mb-4">
                      <Chips chips={pkg.chips} />
                    </div>
                  )}
                  <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed mb-5">
                    {pkg.description}
                  </p>
                  <span className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                    {copy.detailCta}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 — Detail per package */}
      {copy.packages.map((pkg) => (
        <PackageDetail key={pkg.id} copy={copy} pkg={pkg} />
      ))}

      <VisualPortfolio copy={copy.portfolio} />

      {/* 4 — Closing band */}
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
        <div className="max-w-5xl mx-auto rounded-3xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
              {copy.ctaTitle}
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-gray-300 max-w-xl">
              {copy.ctaText}
            </p>
          </div>
          <VisualWhatsAppButton copy={copy} />
        </div>
      </section>
    </div>
  );
}
