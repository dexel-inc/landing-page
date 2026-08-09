import React from "react";
import { Linkedin, MapPin } from "lucide-react";
import Reveal from "../components/ui/Reveal.jsx";
import { EVENTS, track } from "../analytics/track.js";

/** Iniciales a partir del nombre, para el avatar cuando no hay foto. */
function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function MemberCard({ member, index }) {
  return (
    <Reveal
      delay={index * 90}
      className="group relative rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/50 p-5 md:p-6 text-center hover:bg-white dark:hover:bg-zinc-800/70 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative">
        <div className="mx-auto mb-4 h-20 w-20 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 group-hover:border-blue-500/40 group-hover:scale-105 transition-all duration-500">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="h-full w-full object-cover"
              loading="lazy"
              width="80"
              height="80"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-linear-to-br from-blue-600/15 to-cyan-500/15 dark:from-blue-500/20 dark:to-cyan-400/15">
              <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-300">
                {initials(member.name)}
              </span>
            </div>
          )}
        </div>

        <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-1">
          {member.name}
        </h3>
        <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-blue-500 dark:text-blue-400 mb-4 leading-relaxed">
          {member.role}
        </p>

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(EVENTS.TEAM_PROFILE_CLICK, { member: member.name })}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-zinc-800 hover:border-blue-500/40 rounded-lg px-3 py-1.5 transition-colors duration-300"
        >
          <Linkedin size={13} />
          LinkedIn
        </a>
      </div>
    </Reveal>
  );
}

export default function Team({ copy }) {
  return (
    <section id="equipo" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-[#050505] dark:via-black/60 dark:to-[#050505] z-0" />

      <div className="max-w-6xl w-full mx-auto px-4 md:px-6 relative z-10">
        <Reveal className="mb-10 md:mb-14 text-center">
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 border border-blue-400/40 px-3 py-1 rounded-full bg-blue-500/10">
            {copy.badge}
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
            {copy.title}
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-gray-400 text-base md:text-lg leading-relaxed font-light mb-5">
            {copy.subtitle}
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-500 font-mono uppercase tracking-[0.12em]">
            <MapPin size={12} />
            {copy.location}
          </div>
          <div className="w-12 h-0.5 bg-blue-500 mx-auto mt-6" />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {copy.members.map((member, i) => (
            <MemberCard key={member.linkedin} member={member} index={i} />
          ))}
        </div>

        <Reveal delay={140} className="mt-8 md:mt-10 text-center">
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed font-light">
            {copy.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
