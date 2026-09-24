import React from "react";
import { AlertTriangle, Bot, Check, Sparkles } from "lucide-react";
import Button from "./ui/Button.jsx";
import Reveal from "./ui/Reveal.jsx";
import { useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";
import { formatPrice, priceAmount, pricesIncludeVat } from "../config/pricing.js";
import { EVENTS, track } from "../analytics/track.js";
import { INTENT, setIntent } from "../analytics/intent.js";

/**
 * What's specific to the automation page: the comparison between responding
 * and doing, and the custom agents block.
 *
 * Kept apart from `CategoryPage` because it's content for a single
 * category, and kept together in one file because the two pieces tell the
 * same story: a chatbot responds, an agent executes, and building the
 * latter requires tools that have to be written.
 *
 * `Packs`, `BotComparison`, and `CustomAgents` are exported separately
 * because `App.jsx` also reuses them as `children` of individual service
 * pages (WhatsApp Support reuses `BotComparison`, Custom Agents reuses
 * `CustomAgents`): same component, same copy, zero duplication between the
 * category page and its children.
 *
 * Each one wraps itself in its own `<section>` with the same margin as the
 * rest of the page —same as `MicropagesDemos`—, instead of relying on
 * whoever uses them to add the wrapper: that way they look the same
 * regardless of whether `AutomationDetail` renders them on the category
 * page or `ServiceDetailPage` renders them on a child page.
 */

/**
 * The three packs.
 *
 * Scope is stated in countable units —one process, two integrations, three
 * weeks, thirty days of support— because that's the only thing that allows
 * comparison without requesting a quote. "From $X" forces someone to write
 * an email to find out what's included, and almost nobody writes that email.
 */
export function Packs({ copy, chrome }) {
  const { navigateTo, locale } = useRouter();
  const showVat = pricesIncludeVat(locale);

  const requestPack = (pack) => {
    setIntent({
      type: INTENT.PACK,
      category: "automation",
      service_id: "automatizacion",
      service_name: pack.name,
      pack_name: pack.name,
      value: priceAmount(pack.priceKey, locale),
      location: `automation_pack_${pack.key}`,
    });

    track(EVENTS.CTA_CLICK, { category: "automation", pack_name: pack.name });
    navigateTo(ROUTE_KEYS.CONTACT);
  };

  return (
    <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
    <div className="max-w-5xl mx-auto">
      <Reveal className="mb-8 md:mb-10">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          {copy.title}
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">
          {copy.intro}
        </p>
        {/* VAT included is a business decision, not a footnote: competitors
            publish "+ VAT" and here what you see is what gets billed. */}
        {chrome?.vatNote && (
          <p className="mt-2 text-sm text-slate-500 dark:text-gray-500">{chrome.vatNote}</p>
        )}
        <div className="w-12 h-0.5 bg-blue-500 mt-4" />
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        {copy.items.map((pack) => (
          <div
            key={pack.key}
            className={`flex flex-col rounded-2xl border p-5 md:p-6 ${
              pack.featured
                ? "border-blue-300/60 dark:border-blue-500/30 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40"
                : "border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40"
            }`}
          >
            {pack.featured && (
              <span className="self-start mb-3 text-[10px] font-mono uppercase tracking-[0.16em] text-blue-600 dark:text-blue-300 border border-blue-400/50 bg-blue-500/10 px-2.5 py-1 rounded-full">
                {copy.featuredLabel}
              </span>
            )}

            <p className="text-base font-bold tracking-tight text-slate-900 dark:text-white mb-1">
              {pack.name}
            </p>
            <p className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
              {formatPrice(pack.priceKey, locale, { from: pack.from })}
            </p>
            {showVat && chrome?.vatLabel && (
              <p className="text-xs text-slate-500 dark:text-gray-500 mb-4">{chrome.vatLabel}</p>
            )}

            <ul className={`space-y-2 mb-5 ${showVat ? "" : "mt-4"}`}>
              {pack.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-gray-300 leading-relaxed"
                >
                  <Check size={15} className="mt-0.5 shrink-0 text-blue-500 dark:text-blue-400" />
                  {item}
                </li>
              ))}
            </ul>

            <Button
              onClick={() => requestPack(pack)}
              variant={pack.featured ? "primary" : "secondary"}
              size="md"
              className="mt-auto w-full"
            >
              {copy.cta}
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed font-light">
        {copy.discoveryNote}
      </p>
    </div>
    </section>
  );
}

/**
 * The comparison is built by column and not as a table: on a phone a
 * four-column table forces horizontal scrolling, and here each option
 * stacks as a card with its own labels. A single DOM for both sizes, with
 * no content duplicated for screen readers.
 */
export function BotComparison({ copy }) {
  const { lead, intro, rowLabels, columns, note } = copy;
  const rows = [
    ["does", rowLabels.does],
    ["example", rowLabels.example],
    ["when", rowLabels.when],
    ["cost", rowLabels.cost],
  ];

  return (
    <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
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
        {columns.map((column) => {
          const isAgent = column.key === "agent";

          return (
            <div
              key={column.key}
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
            </div>
          );
        })}
      </div>

      {note && (
        <div>
          <p className="mt-6 text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed font-light">
            {note}
          </p>
        </div>
      )}
    </div>
    </section>
  );
}

export function CustomAgents({ copy }) {
  return (
    <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
    <div className="max-w-5xl mx-auto">
      <Reveal className="mb-8 md:mb-10">
        <h2 className="flex items-center gap-2.5 text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          <Bot size={24} className="text-blue-500 dark:text-blue-400 shrink-0" />
          {copy.title}
        </h2>
        <div className="w-12 h-0.5 bg-blue-500 mt-4" />
      </Reveal>

      <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-6 md:p-8 mb-4 md:mb-5">
        <p className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          {copy.leadTitle}
        </p>
        <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
          {copy.leadText}
        </p>
      </div>

      <div className="mb-4 md:mb-5">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-gray-600 mb-3">
          {copy.examplesTitle}
        </p>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {copy.examples.map((example) => (
            <div
              key={example.name}
              className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-5"
            >
              <p className="flex items-center gap-2 text-base font-bold tracking-tight text-slate-900 dark:text-white mb-1.5">
                <Sparkles size={15} className="text-blue-500 dark:text-blue-400 shrink-0" />
                {example.name}
              </p>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                {example.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-6 md:p-7 mb-4 md:mb-5">
        <p className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          {copy.edgeTitle}
        </p>
        <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
          {copy.edgeText}
        </p>
      </div>

      {/* The warning is in plain sight, not in fine print: an agent that
          executes can make mistakes while doing so, and whoever hires it
          needs to know that before signing, not after the first
          badly-created order. */}
      <div className="rounded-2xl border border-amber-400/50 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/20 p-6 md:p-7">
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
      </div>
    </div>
    </section>
  );
}

/**
 * `Packs`, `BotComparison`, and `CustomAgents` already come with their own
 * `<section>` (see the note above), so here they're just chained
 * conditionally, the same way they'd be chained when passed as `children`
 * of a child page.
 */
export default function AutomationDetail({ copy, chrome }) {
  return (
    <>
      {copy.packs && <Packs copy={copy.packs} chrome={chrome} />}
      {copy.comparison && <BotComparison copy={copy.comparison} />}
      {copy.agents && <CustomAgents copy={copy.agents} />}
    </>
  );
}
