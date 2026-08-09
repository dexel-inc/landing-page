import React, { useState } from "react";
import { Cookie } from "lucide-react";
import Button from "./ui/Button.jsx";
import { Link } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";
import { CONSENT, setConsent } from "../consent/consent.js";
import { useConsent } from "../consent/useConsent.js";

/**
 * Banner de consentimiento.
 *
 * Aparece solo cuando el visitante todavía no decidió, y rechazar cuesta un
 * clic igual que aceptar: un banner donde "rechazar" está escondido no
 * constituye autorización libre.
 *
 * Se monta después del primer render para no salir en el HTML prerenderizado,
 * donde no hay forma de saber qué eligió esta persona.
 */
export default function ConsentBanner({ copy }) {
  const consent = useConsent();
  const [dismissed, setDismissed] = useState(false);

  // `undefined` es el prerenderizado, donde no se sabe qué eligió esta persona.
  if (consent !== null || dismissed) return null;

  const decide = (value) => setConsent(value);

  return (
    <div
      data-consent-banner=""
      role="region"
      aria-label={copy.ariaLabel}
      className="fixed inset-x-0 bottom-0 z-60 px-3 pb-3 md:px-5 md:pb-5 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-[0_20px_50px_-20px_rgba(15,23,42,0.5)] p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 mb-1.5">
              <Cookie size={12} />
              {copy.title}
            </p>
            <p className="text-xs md:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
              {copy.text}{" "}
              <Link
                to={ROUTE_KEYS.PRIVACY}
                onClick={() => setDismissed(true)}
                className="underline underline-offset-2 text-blue-600 dark:text-blue-400 hover:text-blue-500"
              >
                {copy.policy}
              </Link>
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <Button onClick={() => decide(CONSENT.DENIED)} variant="secondary" size="md">
              {copy.reject}
            </Button>
            <Button onClick={() => decide(CONSENT.GRANTED)} variant="primary" size="md">
              {copy.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
