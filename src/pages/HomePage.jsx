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
        className="h-screen flex flex-col justify-center items-center text-center px-4 relative py-4"
      >
        <div className="absolute inset-0 items-center bg-gradient-to-b from-transparent via-transparent to-[#050505] z-0"></div>
        <div className="z-10 relative justify-center items-center flex flex-col my-4">
          <div className="flex justify-center animate-pulse mt-30 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 border border-blue-400/30 px-3 py-1 rounded-full bg-blue-900/10">
              {copy.hero.badge}
            </span>
          </div>
          <Logo className="w-60 h-60" viewBox="0 0 324 210" />

          <p className="max-w-xl mx-auto text-gray-400 text-md leading-relaxed font-light">{copy.hero.title}</p>

          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-mono">{copy.hero.scroll}</span>
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
