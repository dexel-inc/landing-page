import React from "react";
import { ArrowRight, Clock3 } from "lucide-react";
import Logo from "../icons/logo.jsx";
import Button from "../components/ui/Button.jsx";
import { EVENTS, track } from "../analytics/track.js";
import { INTENT, setIntent } from "../analytics/intent.js";
import Advisory from "../sections/Advisory.jsx";
import CaseStudies from "../sections/CaseStudies.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../sections/Footer.jsx";
import Process from "../sections/Process.jsx";
import Services from "../sections/Services.jsx";
import Stack from "../sections/Stack.jsx";
import Team from "../sections/Team.jsx";
import { useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";

export default function HomePage({ copy }) {
  const { navigateTo } = useRouter();

  return (
    <>
      <section
        id="inicio"
        className="min-h-svh flex flex-col justify-center items-center text-center px-4 relative pt-28 pb-10 md:py-4"
      >
        <div className="absolute inset-0 items-center bg-linear-to-b from-transparent via-transparent to-slate-100 dark:to-[#050505] z-0"></div>
        <div className="z-10 relative justify-center items-center flex flex-col my-4">
          <div className="flex justify-center mt-4 md:mt-10 mb-2">
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] md:tracking-widest text-blue-500 dark:text-blue-400 border border-blue-400/40 px-3 py-1 rounded-full bg-blue-500/10">
              {copy.hero.badge}
            </span>
          </div>

          <Logo className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 text-slate-800 dark:text-white" viewBox="0 0 324 210" />

          {/* El h1 lleva la propuesta de valor, no el nombre de la marca:
              es lo primero que leen el visitante y los buscadores. */}
          <h1 className="max-w-3xl mx-auto text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] px-2">
            {copy.hero.h1}
          </h1>

          <p className="mt-5 max-w-xl mx-auto text-slate-600 dark:text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed font-light px-2">
            {copy.hero.title}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md sm:max-w-none justify-center px-2">
            {/* La auditoría es el producto de entrada, así que el CTA principal
                del hero lleva a ella y no a un formulario genérico. */}
            <Button
              onClick={() => {
                track(EVENTS.SERVICE_DETAIL_VIEWED, {
                  service_id: "auditoria",
                  service_name: copy.audit.title,
                  location: "hero",
                });
                navigateTo(ROUTE_KEYS.AUDIT);
              }}
              variant="primary"
              size="lg"
              className="group/cta w-full sm:w-auto"
            >
              {copy.hero.primaryCta}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/cta:translate-x-1"
              />
            </Button>

            <Button
              as="a"
              href="#casos"
              onClick={() => track(EVENTS.CTA_CLICK, { location: "hero", action: "casos" })}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {copy.hero.secondaryCta}
            </Button>
          </div>

          <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] md:text-xs text-slate-500 dark:text-gray-500 font-mono uppercase tracking-[0.12em]">
            <Clock3 size={12} />
            {copy.hero.responseTime}
          </p>

          <div className="mt-8 md:mt-12 flex flex-col items-center gap-3">
            <div className="w-px h-8 md:h-12 bg-linear-to-b from-blue-500 to-transparent animate-pulse"></div>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-slate-500 dark:text-gray-500 font-mono">{copy.hero.scroll}</span>
          </div>
        </div>
      </section>

      {/* Orden deliberado: prueba social → oferta → criterio → método.
          Casos → Servicios → Asesoría → Proceso → Stack → Contacto. */}
      <CaseStudies copy={copy.cases} />
      <Services copy={copy.services} audit={copy.audit} />
      {/* "Primero auditamos" es la sección que más argumenta a favor de la
          auditoría: su botón lleva al producto pagado. El de la sección de
          proceso lleva a la llamada gratuita, que es cosa distinta. */}
      <Advisory
        copy={copy.advisory}
        onNavigate={() => {
          track(EVENTS.SERVICE_DETAIL_VIEWED, {
            service_id: "auditoria",
            service_name: copy.audit.title,
            location: "advisory",
          });
          navigateTo(ROUTE_KEYS.AUDIT);
        }}
      />
      <Process
        copy={copy.process}
        onNavigate={() => {
          setIntent({ type: INTENT.DISCOVERY, location: "process" });
          track(EVENTS.CTA_CLICK, { location: "process", action: "discovery" });
          navigateTo(ROUTE_KEYS.CONTACT);
        }}
      />
      <Team copy={copy.team} />
      <Stack copy={copy.stack} />
      <Contact copy={copy.contact} />
      <Footer copy={copy.footer} />
    </>
  );
}
