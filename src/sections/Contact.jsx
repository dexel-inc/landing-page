import React from "react";
import { Clock3 } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import { useRouter } from "../router/RouterContext.jsx";
import { INTENT, contactOnWhatsApp } from "../contact/whatsapp.js";

/**
 * Contact block: a direct line to WhatsApp.
 *
 * There used to be a scripted assistant here that answered the same thing
 * whatever the visitor typed. Every service button now opens WhatsApp with
 * its own pre-filled message, so this block only covers whoever arrives
 * without having picked a service.
 *
 * `first` marks that this block opens the page, which is the case on
 * `/contacto`. There the fixed header's strip has to be reserved before
 * centering; inside the homepage, on the other hand, it sits mid-page and
 * the normal padding is enough: adding the header's height would leave an
 * unjustified gap above it.
 */
export default function Contact({ copy, first = false }) {
  const { locale } = useRouter();

  return (
    <section
      id="contacto"
      className={`flex items-center justify-center px-4 md:px-6 relative overflow-hidden pb-16 md:pb-24 ${
        first ? "min-h-svh pt-[calc(var(--header-h)+2rem)]" : "pt-16 md:pt-24"
      }`}
    >
      <div className="absolute inset-0 bg-linear-to-b from-slate-100 via-white to-slate-100 dark:from-[#050505] dark:via-black/80 dark:to-[#050505] z-0" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-tight tracking-tighter text-slate-900 dark:text-white">
          {copy.titleStart}{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-slate-700 dark:from-blue-400 dark:to-white">
            {copy.titleHighlight}
          </span>
        </h2>
        <p className="text-slate-600 dark:text-gray-400 mb-8 md:mb-10 text-base md:text-lg leading-relaxed font-light">
          {copy.description}
        </p>

        <Button
          onClick={() =>
            contactOnWhatsApp({ type: INTENT.GENERAL, locale, location: first ? "contact_page" : "contact_section" })
          }
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
        >
          {copy.button}
        </Button>

        {copy.responseTime && (
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-gray-500 font-mono uppercase tracking-[0.12em]">
            <Clock3 size={12} />
            {copy.responseTime}
          </p>
        )}
      </div>
    </section>
  );
}
