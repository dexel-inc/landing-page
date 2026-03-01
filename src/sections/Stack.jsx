import React from "react";
import { MoreHorizontal } from "lucide-react";
import { technologies } from "../data";

export default function Stack({ copy }) {
  return (
    <section className="min-h-screen flex items-center justify-center py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-[#050505] dark:via-black/50 dark:to-[#050505] z-0"></div>
      <div className="max-w-6xl w-full px-4 md:px-6 relative z-10">
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">{copy.title}</h2>

          <p className="text-slate-600 dark:text-gray-400 mb-8 md:mb-10 text-base md:text-lg leading-relaxed font-light">{copy.subtitle}</p>

          <div className="w-12 h-0.5 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 md:gap-5 lg:gap-8">
          {technologies.map((tech, i) => (
            <div
              key={i}
              className="group bg-white/80 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800/80 rounded-2xl hover:bg-white dark:hover:bg-zinc-800/80 hover:border-blue-500/30 justify-center items-center flex p-4 md:p-6 transition duration-500 hover:scale-105 relative overflow-hidden"
            >
              {tech.icon ? (
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-16 h-16 object-contain"
                  loading="lazy"
                  width="64"
                  height="64"
                />
              ) : (
                <MoreHorizontal size={32} className="text-slate-800 dark:text-white" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
