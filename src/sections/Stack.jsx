import React from "react";
import { MoreHorizontal } from "lucide-react";
import { technologies } from "../data";

export default function Stack({ copy }) {
  return (
    <section className="min-h-screen flex items-center justify-center py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/50 to-[#050505] z-0"></div>
      <div className="max-w-6xl w-full px-6 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{copy.title}</h2>

          <p className="text-gray-400 mb-10 text-lg leading-relaxed font-light">{copy.subtitle}</p>

          <div className="w-12 h-[2px] bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-8 lg:gap-12">
          {technologies.map((tech, i) => (
            <div
              key={i}
              className="group bg-zinc-900/50 border border-zinc-800/80 rounded-2xl hover:bg-zinc-800/80 hover:border-blue-500/30 justify-center items-center flex p-6 transition duration-500 hover:scale-105 relative overflow-hidden"
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
                <MoreHorizontal size={32} className="text-white" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
