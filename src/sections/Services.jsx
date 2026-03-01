import React, { useState } from "react";
import { CheckCircle, Check, Code, Cpu, Globe, MessageCircle, FileText, Wrench } from "lucide-react";

export default function Services({ copy }) {
  const [flippedCard, setFlippedCard] = useState(null);

  const iconComponents = {
    Code,
    Cpu,
    Globe,
    MessageCircle,
    FileText,
    Wrench,
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-[#050505] dark:via-black/80 dark:to-[#050505] z-0"></div>

      <div className="max-w-6xl w-full px-4 md:px-6 relative z-10">
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">{copy.title}</h2>
          <div className="w-12 h-[2px] bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-12">
          {copy.list.map((service, i) => {
            const IconComponent = iconComponents[service.iconName] ?? Code;
            return (
              <div
                key={i}
                className="relative h-[300px] md:h-[320px] cursor-pointer perspective-1000"
                onClick={() => setFlippedCard(flippedCard === i ? null : i)}
              >
                <div
                  className={`relative w-full h-full transition-all duration-700 transform-style-3d ${
                    flippedCard === i ? "rotate-y-180" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flippedCard === i ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="absolute w-full h-full backface-hidden group bg-white/80 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800/80 rounded-2xl hover:bg-white dark:hover:bg-zinc-800/80 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-500 -translate-y-1/2 translate-x-1/2"></div>

                    <div className="p-5 md:p-8">
                      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <div className="text-slate-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300 p-3 bg-white/80 dark:bg-black/50 rounded-xl border border-slate-200 dark:border-zinc-800 group-hover:scale-110">
                          <IconComponent size={32} />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">{service.title}</h3>
                          <p className="text-xs text-slate-500 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:scale-105 transition-all duration-300 inline-block">
                            {service.price}
                          </p>
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-4 md:mb-6 line-clamp-4 md:line-clamp-none">{service.desc}</p>
                      <div className="flex items-center text-blue-500 dark:text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {copy.cta} <CheckCircle size={14} className="ml-2" />
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-100/70 via-white/90 to-white border border-blue-300/60 dark:from-blue-900/40 dark:via-zinc-900/90 dark:to-zinc-900/50 dark:border-blue-500/30 rounded-2xl overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="p-5 md:p-8 h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-4 md:mb-6">
                        <div className="text-blue-500 dark:text-blue-400 p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                          <IconComponent size={32} />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">{service.title}</h3>
                      </div>

                      <div className="flex-1 space-y-2 md:space-y-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3 group/item">
                            <Check
                              size={18}
                              className="text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform"
                            />
                            <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
