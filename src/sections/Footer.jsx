import React from "react";
import { Clock3 } from "lucide-react";
import Logo from "../icons/logo.jsx";
import Button from "../components/ui/Button.jsx";
import { EVENTS, track } from "../analytics/track.js";
import { Link } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";
import { SITE } from "../config/site.js";

export default function Footer({ whatsappNumber = SITE.whatsapp, copy }) {
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(copy.whatsappText)}`;

  return (
    <footer className="text-slate-900 dark:text-white bg-slate-100 dark:bg-[#050505] pt-10 md:pt-12 text-center justify-center align-middle flex flex-col relative z-10 w-full px-4">
      <div className="flex mt-4 md:mt-8 flex-col justify-between items-center gap-4">
        <div className="w-full text-xl md:text-7xl font-bold">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight tracking-tighter">{copy.title}</h2>
        </div>
        <div className="w-full max-w-55 pt-3 md:pt-0">
          <Button
            as="a"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => track(EVENTS.WHATSAPP_OPENED, { source: "footer" })}
            variant="primary"
            size="lg"
            className="w-full justify-center"
          >
            {copy.contactButton}
          </Button>
        </div>
        {copy.responseTime && (
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-gray-500 font-mono uppercase tracking-[0.12em]">
            <Clock3 size={12} />
            {copy.responseTime}
          </p>
        )}
      </div>
      <div className="flex flex-col w-full justify-center">
        <div className="flex my-2 flex-col gap-6 md:gap-8 md:flex-row items-center md:px-10 justify-between">
          <div className="md:mr-10 text-xl font-bold tracking-[0.2em] text-black dark:text-white flex flex-col align-middle">
            <Logo className="w-30 h-30" viewBox="0 0 324 210" />
          </div>
          {/* Enlaces reales con href localizado: un rastreador tiene que poder
              seguirlos sin ejecutar JavaScript. */}
          {/* Con cinco enlaces la fila ya no cabe de una sola línea en una
              tableta: envuelve en vez de empujar scroll horizontal. */}
          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-4 md:gap-x-6 md:gap-y-3 md:text-start">
            <Link
              to={ROUTE_KEYS.SERVICES}
              className="cursor-pointer text-slate-500 dark:text-gray-600 hover:text-slate-900 dark:hover:text-white uppercase"
            >
              {copy.services}
            </Link>
            <Link
              to={ROUTE_KEYS.AUDIT}
              className="cursor-pointer text-slate-500 dark:text-gray-600 hover:text-slate-900 dark:hover:text-white uppercase"
            >
              {copy.audit}
            </Link>
            <Link
              to={ROUTE_KEYS.TRAINING}
              className="cursor-pointer text-slate-500 dark:text-gray-600 hover:text-slate-900 dark:hover:text-white uppercase"
            >
              {copy.training}
            </Link>
            <Link
              to={ROUTE_KEYS.CONTACT}
              className="cursor-pointer text-slate-500 dark:text-gray-600 hover:text-slate-900 dark:hover:text-white uppercase"
            >
              {copy.contact}
            </Link>
            <Link
              to={ROUTE_KEYS.PRIVACY}
              className="cursor-pointer text-slate-500 dark:text-gray-600 hover:text-slate-900 dark:hover:text-white uppercase"
            >
              {copy.privacy}
            </Link>
          </div>
        </div>
        <hr className="border-slate-300 dark:border-gray-300 opacity-20 dark:opacity-5" />
        <p className="w-full text-center my-8 md:my-12 text-sm md:text-base text-slate-500 dark:text-gray-600">
          &copy; {new Date().getFullYear()} DEXEL DIGITAL EXCELLENCE. {copy.rights}
        </p>
      </div>
      <Button
        as="a"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label={copy.whatsappAria}
        onClick={() => track(EVENTS.WHATSAPP_OPENED, { source: "floating_button" })}
        variant="primary"
        size="icon"
        className="fixed bottom-4 right-4 md:bottom-5 md:right-5 z-50 rounded-full h-12 w-12 md:h-16 md:w-16"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="30" height="30" className="md:w-9 md:h-9" fill="currentColor">
          <g>
            <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
          </g>
        </svg>
      </Button>
    </footer>
  );
}
