import React, { useState, useRef, useEffect } from "react";
import { Clock3, Code, Send } from "lucide-react";
import { EVENTS, track } from "../analytics/track.js";
import { INTENT, clearIntent, readIntent } from "../analytics/intent.js";

import { SITE } from "../config/site.js";

const WHATSAPP_NUMBER = SITE.whatsapp;

function interpolate(template, data) {
  return template.replace(/\{\{(\w+)}}/g, (_, key) => data[key] ?? "");
}

/**
 * Arma el mensaje de WhatsApp solo con los campos que el visitante llegó a
 * responder, para que el flujo pueda cambiar sin romper este resumen.
 */
function buildWhatsAppMessage(data, waMsgCopy) {
  const { header, intro, fields, outro } = waMsgCopy;
  const lines = Object.entries(fields)
    .filter(([key]) => data[key])
    .map(([key, label]) => `${label} ${data[key]}`);

  return `${header}

${intro}

${lines.join("\n")}

${outro}`;
}

const ChatbotForm = ({ copy }) => {
  const flow = copy?.flow ?? [];

  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState({});
  const [history, setHistory] = useState([
    { role: "bot", text: flow[0]?.bot ?? "" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [done, setDone] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /**
   * Muestra el paso `index` y, si ese paso no pide ningún dato y no es el
   * final, encadena automáticamente el siguiente. Esto permite que el bot
   * entregue valor (un rango, una estimación) antes de volver a preguntar.
   */
  const playFrom = (index, currentData) => {
    if (index >= flow.length) return;

    setIsTyping(true);
    const step = flow[index];
    const delay = index === 0 ? 0 : 900;

    timers.current.push(
      setTimeout(() => {
        setIsTyping(false);
        setHistory((prev) => [...prev, { role: "bot", text: interpolate(step.bot, currentData) }]);
        setStepIndex(index);

        if (step.isFinal) {
          setDone(true);
          track(EVENTS.CHAT_COMPLETED);
          return;
        }

        // Paso informativo: sigue solo, sin esperar respuesta del visitante.
        if (!step.field) {
          timers.current.push(setTimeout(() => playFrom(index + 1, currentData), 700));
        }
      }, delay),
    );
  };

  const handleSend = () => {
    if (!input.trim() || isTyping || done) return;

    const userMessage = input.trim();
    const currentStep = flow[stepIndex];
    const newData = currentStep?.field
        ? { ...data, [currentStep.field]: userMessage }
        : { ...data };

    // Primera respuesta del visitante: es el momento en que el asistente deja
    // de ser decoración y pasa a ser una conversación.
    if (stepIndex === 0) track(EVENTS.CHAT_STARTED, { location: "chatbot" });

    setData(newData);
    setHistory((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");

    playFrom(stepIndex + 1, newData);
  };

  /**
   * Entrega a WhatsApp: es el envío real del formulario, así que aquí es donde
   * se cuenta la conversión. El evento depende de con qué intención llegó el
   * visitante —comprar la auditoría, cotizar otro servicio o agendar la llamada
   * gratuita—; contarlas todas como lo mismo haría inservible la optimización
   * de campaña.
   */
  const handleWhatsApp = () => {
    const intent = readIntent();
    const shared = {
      location: "chatbot",
      // `category` viaja desde las páginas de categoría: sin él las tres
      // páginas nuevas convertirían dentro de un mismo montón indistinguible.
      category: intent?.category,
      service_id: intent?.service_id,
      service_name: intent?.service_name,
      entry: intent?.location,
    };

    if (intent?.type === INTENT.AUDIT) {
      track(EVENTS.AUDIT_REQUESTED, shared);
    } else if (intent?.type === INTENT.TRAINING) {
      // El formato viaja desde la página de formación: sin él no se puede saber
      // si la campaña está trayendo sesiones ejecutivas o programas completos,
      // que valen el doble.
      track(EVENTS.TRAINING_REQUESTED, {
        ...shared,
        format: intent.format,
        value: intent.value,
      });
    } else if (intent?.type === INTENT.PACK) {
      track(EVENTS.PACK_REQUESTED, {
        ...shared,
        pack_name: intent.pack_name,
        value: intent.value,
      });
    } else if (intent?.type === INTENT.QUOTE) {
      track(EVENTS.QUOTE_REQUESTED, shared);
    } else {
      // Sin intención declarada, la conversación abierta equivale a pedir la
      // llamada de discovery, que es el paso gratuito por defecto.
      track(EVENTS.DISCOVERY_BOOKED, shared);
    }

    clearIntent();
    track(EVENTS.WHATSAPP_OPENED, { source: "chatbot" });
    const message = buildWhatsAppMessage(data, copy.whatsappMessage);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
      <div className="bg-white/85 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200 dark:border-zinc-700/50 rounded-xl p-6 max-w-md w-full shadow-2xl shadow-blue-900/10">
        <div className="flex items-center gap-3 mb-4 border-b border-slate-200 dark:border-zinc-800 pb-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-mono text-slate-500 dark:text-gray-400 tracking-widest">
          {copy?.status ?? "DEXEL_ASSISTANT - ONLINE"}
        </span>
        </div>

        <div className="h-72 overflow-y-auto mb-6 space-y-4 pr-2 font-mono text-sm leading-relaxed" ref={chatContainerRef}>
          {history.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                    className={`max-w-[85%] p-4 rounded-2xl whitespace-pre-wrap ${
                        msg.role === "user"
                            ? "bg-blue-600 text-white rounded-tr-none"
                            : "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-gray-300 rounded-tl-none border border-slate-200 dark:border-zinc-700"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
          ))}

          {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-zinc-700 flex gap-1 items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
          )}
        </div>

        {done ? (
            <button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white font-mono text-sm font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {copy?.whatsappButton ?? "Continuar en WhatsApp"}
            </button>
        ) : (
            <div className="flex gap-2 relative">
              <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={copy?.placeholder ?? "Escribí tu respuesta..."}
                  disabled={isTyping}
                  className="flex-1 bg-white dark:bg-black/50 border border-slate-300 dark:border-zinc-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500/50 transition-colors font-mono text-sm pl-10 disabled:opacity-50"
              />
              <Code size={18} className="absolute left-3 top-3.5 text-slate-400 dark:text-gray-500" />
              <button
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-white rounded-lg h-11 w-11 flex items-center justify-center shrink-0"
              >
                <Send size={18} className="-ml-0.5 mt-0.5" />
              </button>
            </div>
        )}

        {copy?.responseTime && (
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-500 dark:text-gray-500 font-mono uppercase tracking-[0.12em]">
              <Clock3 size={11} />
              {copy.responseTime}
            </p>
        )}
      </div>
  );
};

export default function Contact({ copy }) {
  return (
      <section
          id="contacto"
          className="min-h-screen flex items-center justify-center py-16 md:py-24 px-4 md:px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-b from-slate-100 via-white to-slate-100 dark:from-[#050505] dark:via-black/80 dark:to-[#050505] z-0" />

        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 relative z-10">
          <div className="max-w-md text-left">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-tight tracking-tighter text-slate-900 dark:text-white">
              {copy?.titleStart ?? "Iniciemos el"}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-slate-700 dark:from-blue-400 dark:to-white">
              {copy?.titleHighlight ?? "Proceso."}
            </span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 mb-8 md:mb-10 text-base md:text-lg leading-relaxed font-light">
              {copy?.description ?? "Olvídese de los formularios estáticos. Cuéntenos su problema técnico y obtenga una evaluación preliminar en tiempo real."}
            </p>
          </div>

          <div className="w-full md:w-auto max-w-md">
            <ChatbotForm copy={copy?.chat} />
          </div>
        </div>
      </section>
  );
}