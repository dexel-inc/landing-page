import React from "react";
import { Compass } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import { useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";

/**
 * Página 404.
 *
 * Se prerenderiza en `dist/404.html`, que es lo que Vercel sirve —con estado
 * 404 real, no un 200 disfrazado— cuando ninguna ruta coincide. El HTML
 * estático sale en el idioma por defecto; al montar en el navegador, el router
 * resuelve el idioma del prefijo de la URL o del navegador y el texto cambia.
 */
export default function NotFoundPage({ copy }) {
  const { navigateTo } = useRouter();

  return (
    <div className="min-h-svh flex items-center justify-center px-4 py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-slate-50 via-white to-slate-100 dark:from-[#050505] dark:via-black/80 dark:to-[#050505] z-0" />
      <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase mb-6">
          <Compass size={13} />
          {copy.code}
        </span>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight text-slate-900 dark:text-white">
          {copy.title}
        </h1>
        <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
          {copy.text}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button onClick={() => navigateTo(ROUTE_KEYS.HOME)} variant="primary" size="lg">
            {copy.home}
          </Button>
          <Button onClick={() => navigateTo(ROUTE_KEYS.SERVICES)} variant="secondary" size="lg">
            {copy.services}
          </Button>
          <Button onClick={() => navigateTo(ROUTE_KEYS.AUDIT)} variant="ghost" size="lg">
            {copy.audit}
          </Button>
        </div>
      </div>
    </div>
  );
}
