import React, { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, CreditCard, Sparkles } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import FaqList from "../components/ui/FaqList.jsx";
import { Link, useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";
import { formatPrice } from "../config/pricing.js";
import { EVENTS, track } from "../analytics/track.js";
import { INTENT, setIntent } from "../analytics/intent.js";

/**
 * Plantilla común de las siete páginas de servicio individuales
 * (sitios web, software a la medida, micropáginas, SEO, integraciones,
 * pasarelas de pago, mantenimiento).
 *
 * Hermana de `CategoryPage`, con la misma factura visual, pero donde el
 * contenido principal son los niveles de precio y no los "frentes de
 * trabajo": aquí ya se sabe qué servicio es, falta elegir el alcance.
 *
 * `children` es el hueco para lo que solo tiene una página —los demos
 * interactivos de micropáginas— sin obligar a las otras seis a cargar con un
 * hueco vacío.
 */
export default function ServiceDetailPage({ copy, chrome, categoryRouteKey, serviceId, children }) {
  const { navigateTo, locale } = useRouter();
  const service = copy.key;

  useEffect(() => {
    track(EVENTS.SERVICE_DETAIL_VIEWED, { service_id: serviceId, service_name: copy.title, locale });
  }, [serviceId, copy.title, locale]);

  const goToContact = (tier, location) => {
    setIntent({
      type: INTENT.QUOTE,
      category: categoryRouteKey,
      service_id: serviceId,
      service_name: tier ? `${copy.title} — ${tier.name}` : copy.title,
      location,
    });

    track(EVENTS.CTA_CLICK, { service_id: serviceId, location });
    navigateTo(ROUTE_KEYS.CONTACT);
  };

  return (
    <div className="pt-[calc(var(--header-h)+2rem)] pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-slate-50/80 via-white/60 to-slate-100/80 dark:from-[#050505]/85 dark:via-black/55 dark:to-[#050505]/85 z-0" />
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-3xl pointer-events-none z-0" />

      {/* 1 — Encabezado */}
      <section className="relative z-10 px-4 md:px-6">
        <Reveal className="max-w-4xl mx-auto text-center">
          <Link
            to={categoryRouteKey}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase mb-6 hover:bg-blue-500/20 transition-colors"
          >
            {copy.badge}
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
            {copy.title}
          </h1>
          <p className="text-base md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {copy.intro}
          </p>

          {chrome?.vatNote && (
            <p className="text-sm text-slate-500 dark:text-gray-500 mb-2">{chrome.vatNote}</p>
          )}
        </Reveal>
      </section>

      {/* 2 — Niveles */}
      <section className="relative z-10 px-4 md:px-6 pt-12 md:pt-16">
        <div className="max-w-5xl mx-auto">
          <div
            className={`grid gap-4 md:gap-5 ${
              copy.tiers.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"
            }`}
          >
            {copy.tiers.map((tier, index) => (
              <Reveal
                key={tier.key}
                className={`relative rounded-2xl border p-5 md:p-6 flex flex-col ${
                  tier.featured
                    ? "border-blue-400/60 dark:border-blue-500/40 bg-linear-to-br from-blue-100/60 via-white/90 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 shadow-[0_20px_45px_-30px_rgba(37,99,235,0.55)]"
                    : "border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-semibold uppercase tracking-[0.14em]">
                    <Sparkles size={11} />
                    {chrome.featuredLabel}
                  </span>
                )}

                <p className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-1">
                  {tier.name}
                </p>
                <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
                  {formatPrice(tier.priceKey, locale, { perMonth: !!tier.perMonth })}
                </p>
                {tier.delivery && (
                  <p className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-slate-400 dark:text-gray-600 mb-4">
                    <Clock3 size={10} />
                    {tier.delivery}
                  </p>
                )}
                {tier.payment && (
                  <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-500 mb-4">
                    <CreditCard size={12} />
                    {tier.payment}
                  </p>
                )}

                <ul className="space-y-1.5 mb-5 grow">
                  {index > 0 && tier.adds?.length > 0 ? (
                    <>
                      {chrome.addsLabel && (
                        <li className="text-xs font-semibold uppercase tracking-[0.1em] text-blue-600 dark:text-blue-400 mb-1">
                          {chrome.addsLabel}
                        </li>
                      )}
                      {tier.adds.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-400 leading-relaxed"
                        >
                          <Check size={15} className="mt-0.5 shrink-0 text-blue-500 dark:text-blue-400" />
                          {item}
                        </li>
                      ))}
                    </>
                  ) : (
                    tier.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-400 leading-relaxed"
                      >
                        <Check size={15} className="mt-0.5 shrink-0 text-blue-500 dark:text-blue-400" />
                        {item}
                      </li>
                    ))
                  )}
                </ul>

                <Button
                  onClick={() => goToContact(tier, `${serviceId}_page_${tier.key}`)}
                  variant={tier.featured ? "primary" : "secondary"}
                  size="md"
                  className="w-full mt-auto"
                >
                  {tier.cta ?? chrome.quoteCta}
                  <ArrowRight size={15} />
                </Button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2b — Lo propio de una sola página (demos de micropáginas) */}
      {children}

      {/* 3 — Casos, si el copy trae datos */}
      {copy.cases?.length > 0 && (
        <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
          <div className="max-w-5xl mx-auto">
            <Reveal className="mb-8">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                {copy.casesTitle}
              </h2>
              <div className="w-12 h-0.5 bg-blue-500 mt-4" />
            </Reveal>

            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              {copy.cases.map((item) => (
                <div
                  key={item.client}
                  className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-5 md:p-6"
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{item.client}</p>
                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4 — Preguntas frecuentes */}
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
        <FaqList
          title={copy.faqTitle}
          subtitle={copy.faqSubtitle}
          faqs={copy.faqs}
          idPrefix={`faq-${service}`}
        />
      </section>

      {/* 5 — Servicios complementarios */}
      {copy.related?.length > 0 && (
        <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
          <div className="max-w-5xl mx-auto">
            {copy.relatedTitle && (
              <Reveal className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {copy.relatedTitle}
                </h2>
              </Reveal>
            )}
            <div className="flex flex-wrap gap-3">
              {copy.related.map((item) => (
                <Link
                  key={item.routeKey}
                  to={item.routeKey}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 text-sm text-slate-700 dark:text-gray-300 hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.label}
                  <ArrowRight size={13} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6 — CTA */}
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-blue-300/50 dark:border-blue-500/25 bg-linear-to-br from-blue-100/60 via-white/80 to-white dark:from-blue-900/25 dark:via-zinc-900/70 dark:to-zinc-900/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
            <div>
              <p className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-1">
                {copy.ctaTitle}
              </p>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-light">
                {copy.ctaText}
              </p>
            </div>

            <Button
              onClick={() => goToContact(null, `${serviceId}_page_footer`)}
              variant="primary"
              size="lg"
              className="group/cta w-full md:w-auto shrink-0"
            >
              {chrome.quoteCta}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Button>
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => navigateTo(categoryRouteKey)}
              variant="ghost"
              size="md"
              className="text-slate-500 dark:text-gray-500"
            >
              <ArrowLeft size={15} />
              {chrome.backLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
