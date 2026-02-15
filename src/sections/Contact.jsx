import React, {useState} from "react";
import {Code, Send} from "lucide-react";

const ChatbotForm = () => {
    const [step, setStep] = useState(0);
    const [history, setHistory] = useState([
        {
            role: "bot",
            text: "Iniciando protocolo DEXEL... Detectando necesidades. ¿Cuál es el desafío de software más crítico que impide el crecimiento de su empresa hoy?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;
        const newHistory = [...history, { role: "user", text: input }];
        setHistory(newHistory);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            let botReply = "";
            if (step === 0)
                botReply =
                    "Análisis preliminar: Detectamos una oportunidad para optimización de arquitectura. ¿Buscan modernizar una plataforma existente o construir un ecosistema nuevo desde cero?";
            else if (step === 1)
                botReply =
                    "Comprendido. Nuestros ingenieros senior se especializan en ese tipo de despliegue. Por favor, ingrese un correo corporativo para recibir el pre-diagnóstico técnico.";
            else
                botReply =
                    "Datos recibidos. El sistema ha agendado una revisión prioritaria. Un arquitecto de soluciones de Dexel le contactará en breve. Fin de la transmisión.";

            setHistory((prev) => [...prev, { role: "bot", text: botReply }]);
            setStep((prev) => prev + 1);
        }, 1200);
    };

    return (
        <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-xl p-6 max-w-md w-full shadow-2xl shadow-blue-900/20">
            <div className="flex items-center gap-3 mb-4 border-b border-zinc-800 pb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-gray-400 tracking-widest">
          DEXEL_AI_CORE // ONLINE
        </span>
            </div>

            <div className="h-72 overflow-y-auto mb-6 space-y-4 pr-2 font-mono text-sm leading-relaxed">
                {history.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[85%] p-4 rounded-2xl ${
                                msg.role === "user"
                                    ? "bg-white text-black rounded-tr-none"
                                    : "bg-zinc-800 text-gray-300 rounded-tl-none border border-zinc-700"
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none border border-zinc-700 flex gap-1">
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-2 relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Escriba su requerimiento..."
                    className="flex-1 bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors font-mono text-sm pl-10"
                />
                <Code size={18} className="absolute left-3 top-3.5 text-gray-500" />
                <button
                    onClick={handleSend}
                    className="bg-white text-black p-3 rounded-lg hover:bg-blue-50 transition hover:scale-105 active:scale-95"
                >
                    <Send size={20} className="-ml-0.5 mt-0.5" />
                </button>
            </div>
        </div>
    );
};

export default function Contact() {
    return (
        <section
            id="contacto"
            className="min-h-screen flex items-center justify-center py-24 px-6 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] z-0"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[50vh] pointer-events-none z-0"></div>

            <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="max-w-md text-left">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
                        Iniciemos el
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                  Proceso.
                </span>
                    </h2>
                    <p className="text-gray-400 mb-10 text-lg leading-relaxed font-light">
                        Olvídese de los formularios estáticos. Interactúe directamente
                        con nuestro núcleo de pre-análisis. Cuéntenos su problema
                        técnico y obtenga una evaluación preliminar en tiempo real.
                    </p>
                    <div className="flex flex-col gap-4 text-sm text-gray-500 font-mono">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>
                    Respuesta promedio:{" "}
                                <span className="text-gray-300">Tiempo real</span>
                  </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>
                    Disponibilidad de ingeniería:{" "}
                                <span className="text-gray-300">Alta</span>
                  </span>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-auto">
                    <ChatbotForm />
                </div>
            </div>
        </section>
    );
}