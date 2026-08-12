import React from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";
import { CONSENT, setConsent } from "../consent/consent.js";
import { useConsent } from "../consent/useConsent.js";

/**
 * Política de tratamiento de datos.
 *
 * Además del texto, incluye el control para cambiar la decisión sobre cookies:
 * la ley exige que revocar sea tan fácil como autorizar, y un banner que solo
 * aparece una vez no cumple eso por sí solo.
 */
function ConsentControl({ copy }) {
  // El estado sale del store de consentimiento, no de un efecto: en el HTML
  // prerenderizado no existe `localStorage` y el valor llega como `undefined`.
  const state = useConsent();

  const stateText =
    state === CONSENT.GRANTED
      ? copy.consentStates.granted
      : state === CONSENT.DENIED
        ? copy.consentStates.denied
        : copy.consentStates.unset;

  return (
    <div className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-6 md:p-8">
      <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 mb-3">
        <ShieldCheck size={12} />
        {copy.consentTitle}
      </p>
      <p className="text-sm md:text-base text-slate-700 dark:text-gray-300 leading-relaxed mb-5">
        <span className="font-semibold">{copy.consentStateLabel}: </span>
        {stateText}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={() => setConsent(CONSENT.GRANTED)} variant="primary" size="md">
          {copy.consentAccept}
        </Button>
        <Button onClick={() => setConsent(CONSENT.DENIED)} variant="secondary" size="md">
          {copy.consentReject}
        </Button>
      </div>
    </div>
  );
}

export default function PrivacyPage({ copy }) {
  const { navigateTo } = useRouter();

  return (
    <div className="pt-[calc(var(--header-h)+2rem)] pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-slate-50 via-white to-slate-100 dark:from-[#050505] dark:via-black/80 dark:to-[#050505] z-0" />

      <section className="relative z-10 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-10 md:mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase mb-6">
              <ShieldCheck size={13} />
              {copy.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight text-slate-900 dark:text-white">
              {copy.title}
            </h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-gray-600 mb-6">
              {copy.updatedLabel}: {copy.updated}
            </p>
            <p className="text-base md:text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
              {copy.intro}
            </p>
            <div className="w-12 h-0.5 bg-blue-500 mt-6" />
          </Reveal>

          <div className="space-y-10">
            {copy.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                  {section.title}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed mb-3"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <ul className="space-y-2 mt-2">
                    {section.list.map((item) => (
                      <li
                        key={item.slice(0, 40)}
                        className="flex items-start gap-2.5 text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-black/30 p-6">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-gray-600 mb-3">
                {copy.responsibleTitle}
              </p>
              {copy.responsible.map((line) => (
                <p key={line} className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <ConsentControl copy={copy} />
          </div>

          <div className="mt-10 text-center">
            <Button
              onClick={() => navigateTo(ROUTE_KEYS.HOME)}
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
