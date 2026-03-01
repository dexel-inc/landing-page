import React, { useMemo, useState } from "react";
import { Check, ChevronDown, Code, Cpu, Globe, Wrench } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import { useRouter } from "../router/RouterContext.jsx";

export default function ServicesPage({ copy }) {
  const { navigate } = useRouter();
  const [openFaqs, setOpenFaqs] = useState(() => new Set());

  const iconComponents = useMemo(
    () => ({
      Code,
      Cpu,
      Globe,
      Wrench,
    }),
    [],
  );

  const detailedServices = copy.detailedList ?? [];
  const serviceLabel = copy.serviceLabel ?? "Service";
  const servicesBadge = copy.badge ?? "Dexel Services";

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <main className="pt-32 md:pt-28 pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-[#050505] dark:via-black/80 dark:to-[#050505] z-0"></div>
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-3xl pointer-events-none z-0"></div>

      <section className="relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase mb-6">
            {servicesBadge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">{copy.title}</h1>
          <p className="text-base md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">{copy.subtitle}</p>
        </div>
      </section>

      <section className="relative z-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-14">
          {detailedServices.map((service, index) => {
            const IconComponent = iconComponents[service.iconName] ?? Code;
            const isReversed = index % 2 !== 0;

            return (
              <article key={service.id ?? index} id={service.id} className="group">
                <div
                  className={`relative flex flex-col md:flex-row items-stretch gap-7 rounded-3xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm p-5 md:p-6 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.35)] ${
                    isReversed ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-full md:w-1/2 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/65 p-5 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-blue-500 dark:text-blue-300">{serviceLabel} {index + 1}</span>
                      <div className="h-px flex-1 bg-slate-200 dark:bg-zinc-800"></div>
                    </div>

                    <h2 className="text-2xl md:text-[2rem] font-bold text-slate-900 dark:text-white mb-4 leading-tight">{service.title}</h2>

                    <div className="flex flex-wrap items-center mb-6 gap-x-3 gap-y-1">
                      <span className="text-2xl font-bold text-blue-500 dark:text-blue-400">{service.price}</span>
                      <span className="text-sm text-slate-500 dark:text-gray-500">{service.pricingNote}</span>
                    </div>

                    <p className="text-slate-600 dark:text-gray-300 mb-6 leading-relaxed text-sm md:text-base">{service.description}</p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2">
                          <Check size={18} className="text-blue-500 dark:text-blue-300 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => navigate("/contacto")}
                      variant="primary"
                      size="lg"
                      className="w-full md:w-auto"
                    >
                      {copy.ctaButton}
                    </Button>
                  </div>

                  <div className="w-full md:w-1/2">
                    <div className="h-full min-h-[320px] rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/70 relative">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      ) : null}

                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-black/20 to-black/65 dark:from-black/15 dark:via-black/45 dark:to-black/85"></div>

                      <div className="absolute inset-0 p-4 md:p-6 flex items-end justify-between">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.2em] text-blue-300 mb-2">Dexel</p>
                          <p className="text-lg md:text-2xl font-semibold tracking-tight text-white">{service.title}</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-black/45 border border-zinc-700/90 backdrop-blur-sm">
                          <IconComponent size={34} className="text-blue-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 px-4 md:px-6 pt-14 md:pt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{copy.faqTitle}</h2>
            <p className="text-base md:text-xl text-slate-600 dark:text-gray-400">{copy.faqSubtitle}</p>
          </div>

          <div className="space-y-4">
            {copy.faqs.map((faq, index) => {
              const isOpen = openFaqs.has(index);

              return (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden border transition-colors duration-300 ${
                    isOpen
                      ? "border-blue-400/50 bg-white/90 dark:bg-zinc-900/80"
                      : "border-slate-200 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/60"
                  }`}
                >
                  <Button
                    onClick={() => toggleFaq(index)}
                    variant="ghost"
                    className="w-full h-auto p-4 md:p-6 justify-between text-left rounded-none hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white pr-3 md:pr-4">{faq.question}</h3>
                    <ChevronDown
                      size={20}
                      className={`text-blue-500 dark:text-blue-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </Button>

                  {isOpen ? (
                    <div className="px-4 md:px-6 pb-4 md:pb-6">
                      <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
