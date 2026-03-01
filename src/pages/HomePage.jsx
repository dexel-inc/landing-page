import React from "react";
import Logo from "../icons/logo.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../sections/Footer.jsx";
import Services from "../sections/Services.jsx";
import Stack from "../sections/Stack.jsx";

export default function HomePage({ copy, onNavigate }) {
  return (
    <>
      <section
        id="inicio"
        className="min-h-svh flex flex-col justify-center items-center text-center px-4 relative pt-28 pb-10 md:py-4"
      >
        <div className="absolute inset-0 items-center bg-linear-to-b from-transparent via-transparent to-slate-100 dark:to-[#050505] z-0"></div>
        <div className="z-10 relative justify-center items-center flex flex-col my-4">
          <div className="flex justify-center animate-pulse mt-6 md:mt-16 mb-2">
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] md:tracking-widest text-blue-500 dark:text-blue-400 border border-blue-400/40 px-3 py-1 rounded-full bg-blue-500/10">
              {copy.hero.badge}
            </span>
          </div>
          <Logo className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 text-slate-800 dark:text-white" viewBox="0 0 324 210" />

          <p className="max-w-xl mx-auto text-slate-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed font-light px-2">{copy.hero.title}</p>

          <div className="mt-10 md:mt-16 flex flex-col items-center gap-3 md:gap-4">
            <div className="w-px h-10 md:h-16 bg-linear-to-b from-blue-500 to-transparent animate-pulse"></div>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-slate-500 dark:text-gray-500 font-mono">{copy.hero.scroll}</span>
          </div>
        </div>
      </section>

      <Contact copy={copy.contact} />
      <Services copy={copy.services} />
      <Stack copy={copy.stack} />
      <Footer copy={copy.footer} onNavigate={onNavigate} />
    </>
  );
}
