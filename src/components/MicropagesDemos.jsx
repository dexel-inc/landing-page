import React, { useEffect, useState } from "react";
import { Check, MapPin, Music, Music4 } from "lucide-react";
import Reveal from "./ui/Reveal.jsx";
import { EVENTS, track } from "../analytics/track.js";

const GALLERY = [
  "/images/micropage-placeholder-1.svg",
  "/images/micropage-placeholder-2.svg",
  "/images/micropage-placeholder-3.svg",
];

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Cuenta regresiva contra una fecha objetivo calculada al montar en el
 * navegador, nunca en el prerenderizado: el servidor no tiene por qué animar
 * nada, y como el cliente monta de cero (no hidrata), no hay riesgo de
 * desfase entre lo que pintó Node y lo que calcula el navegador.
 */
function useCountdown() {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    const target = Date.now() + 45 * DAY_MS;

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setRemaining({
        days: Math.floor(diff / DAY_MS),
        hours: Math.floor((diff % DAY_MS) / (60 * 60 * 1000)),
        minutes: Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000)),
        seconds: Math.floor((diff % (60 * 1000)) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return remaining;
}

function pad(value) {
  return String(value ?? 0).padStart(2, "0");
}

/**
 * Tres demos interactivos —boda, XV años, baby shower— dentro de un marco de
 * celular hecho con CSS. Viven en la propia página de micropáginas, sin ruta
 * propia: cero impacto en sitemap y prerenderizado.
 */
export default function MicropagesDemos({ copy }) {
  const [activeKey, setActiveKey] = useState(copy.types[0].key);
  const [musicOn, setMusicOn] = useState(false);
  const [rsvp, setRsvp] = useState(false);
  const countdown = useCountdown();

  const active = copy.types.find((type) => type.key === activeKey) ?? copy.types[0];

  const selectType = (type) => {
    setActiveKey(type.key);
    setMusicOn(false);
    setRsvp(false);
    track(EVENTS.SERVICE_DETAIL_VIEWED, {
      service_id: "micropaginas",
      location: `micropages_demo_${type.key}`,
    });
  };

  return (
    <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
      <div className="max-w-5xl mx-auto">
        <Reveal className="mb-8 md:mb-10 text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            {copy.sectionTitle}
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
            {copy.sectionIntro}
          </p>
        </Reveal>

        {/* Selector de demo */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {copy.types.map((type) => (
            <button
              key={type.key}
              type="button"
              onClick={() => selectType(type)}
              aria-pressed={type.key === activeKey}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.1em] border transition-colors cursor-pointer ${
                type.key === activeKey
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 text-slate-600 dark:text-gray-400 hover:border-blue-400/50"
              }`}
            >
              {type.tabLabel}
            </button>
          ))}
        </div>

        {/* Marco de celular */}
        <div className="flex justify-center">
          <div
            role="img"
            aria-label={copy.frameLabel}
            className="relative w-[280px] rounded-[2.5rem] border-[10px] border-slate-900 dark:border-zinc-800 bg-slate-900 dark:bg-zinc-800 shadow-[0_30px_60px_-25px_rgba(15,23,42,0.55)] overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-6 flex items-center justify-center z-10">
              <div className="w-24 h-4 bg-slate-900 dark:bg-zinc-800 rounded-b-2xl" />
            </div>

            <div className="bg-linear-to-b from-blue-100 via-white to-white dark:from-blue-950/60 dark:via-zinc-950 dark:to-zinc-950 min-h-[520px] pt-9 pb-6 px-4 flex flex-col items-center text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 font-semibold mb-2">
                {active.hosts}
              </p>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 leading-snug">
                {active.eventTitle}
              </h3>

              {/* Cuenta regresiva */}
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-gray-500 mb-1.5">
                {copy.countdownLabel}
              </p>
              <div className="grid grid-cols-4 gap-1.5 mb-4 w-full">
                {[
                  [countdown?.days, copy.countdownUnits.days],
                  [countdown?.hours, copy.countdownUnits.hours],
                  [countdown?.minutes, copy.countdownUnits.minutes],
                  [countdown?.seconds, copy.countdownUnits.seconds],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-lg bg-white/80 dark:bg-black/40 border border-slate-200 dark:border-zinc-800 py-1.5"
                  >
                    <p className="text-sm font-bold tabular-nums text-slate-900 dark:text-white">
                      {pad(value)}
                    </p>
                    <p className="text-[8px] uppercase tracking-wider text-slate-400 dark:text-gray-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Galería */}
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-gray-500 mb-1.5 self-start">
                {copy.galleryTitle}
              </p>
              <div className="grid grid-cols-3 gap-1.5 mb-4 w-full">
                {GALLERY.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="w-full aspect-[3/4] object-cover rounded-lg border border-slate-200 dark:border-zinc-800"
                  />
                ))}
              </div>

              {/* Lugar */}
              <p className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-gray-400 mb-4">
                <MapPin size={13} className="text-blue-500 dark:text-blue-400 shrink-0" />
                {active.location}
              </p>

              {/* Música */}
              <button
                type="button"
                onClick={() => setMusicOn((value) => !value)}
                className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-gray-400 mb-4 px-3 py-1.5 rounded-full border border-slate-200 dark:border-zinc-800 cursor-pointer hover:border-blue-400/50 transition-colors"
              >
                {musicOn ? (
                  <Music4 size={13} className="text-blue-500 dark:text-blue-400" />
                ) : (
                  <Music size={13} />
                )}
                {musicOn ? copy.musicPlayingLabel : copy.musicLabel}
              </button>

              {/* RSVP */}
              <div className="mt-auto w-full pt-2">
                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-gray-500 mb-2">
                  {copy.rsvpTitle}
                </p>
                <button
                  type="button"
                  onClick={() => setRsvp(true)}
                  disabled={rsvp}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-[0.1em] transition-colors cursor-pointer disabled:cursor-default ${
                    rsvp
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {rsvp ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Check size={13} />
                      {copy.rsvpConfirmed}
                    </span>
                  ) : (
                    copy.rsvpButton
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
