import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal.jsx";

/**
 * Acordeón de preguntas frecuentes.
 *
 * Vive aquí y no dentro de una página porque lo usan la página índice de
 * servicios y las tres páginas de categoría: tenerlo duplicado era la vía
 * directa a que una de ellas quedara sin la corrección de la siguiente.
 *
 * `idPrefix` evita que dos listas en el mismo documento compartan el `id` del
 * panel y rompan la relación `aria-controls`.
 */
export default function FaqList({ title, subtitle, faqs = [], idPrefix = "faq" }) {
  const [openFaqs, setOpenFaqs] = useState(() => new Set());

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  if (!faqs.length) return null;

  return (
    <div className="max-w-3xl mx-auto">
      {title && (
        <Reveal className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base md:text-xl text-slate-600 dark:text-gray-400">{subtitle}</p>
          )}
        </Reveal>
      )}

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openFaqs.has(index);
          const answerId = `${idPrefix}-answer-${index}`;

          return (
            <div
              key={faq.question}
              className={`rounded-2xl overflow-hidden border transition-colors duration-300 ${
                isOpen
                  ? "border-blue-400/50 bg-white/90 dark:bg-zinc-900/80"
                  : "border-slate-200 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/60 hover:border-blue-500/30"
              }`}
            >
              {/* Botón nativo en vez del componente Button: su clase base trae
                  justify-center, que ganaba sobre justify-between y dejaba la
                  pregunta centrada contra una respuesta alineada a la izquierda. */}
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 md:px-6 md:py-5 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/40"
              >
                <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white leading-snug">
                  {faq.question}
                </h3>
                <span
                  className={`shrink-0 grid place-items-center h-8 w-8 rounded-lg border transition-all duration-300 ${
                    isOpen
                      ? "border-blue-400/50 bg-blue-500/10 text-blue-500 dark:text-blue-400 rotate-180"
                      : "border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-gray-600"
                  }`}
                >
                  <ChevronDown size={16} />
                </span>
              </button>

              {/* grid-rows 0fr→1fr anima la altura sin medirla en JS. La
                  respuesta queda siempre en el HTML, así que un rastreador la
                  lee aunque el acordeón esté cerrado. */}
              <div
                id={answerId}
                role="region"
                className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <div className="h-px bg-slate-200 dark:bg-zinc-800 mb-4" />
                    <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
