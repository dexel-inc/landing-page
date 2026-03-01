import React, { useState } from "react";
import { Code, Send } from "lucide-react";

const ChatbotForm = ({ copy }) => {
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([
    {
      role: "bot",
      text: copy.conversation[0],
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
      const nextStep = step + 1;
      const botReply = copy.conversation[nextStep] ?? copy.conversation[copy.conversation.length - 1];
      setHistory((prev) => [...prev, { role: "bot", text: botReply }]);
      setStep(nextStep);
    }, 1200);
  };

  return (
    <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-xl p-6 max-w-md w-full shadow-2xl shadow-blue-900/20">
      <div className="flex items-center gap-3 mb-4 border-b border-zinc-800 pb-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-mono text-gray-400 tracking-widest">{copy.status}</span>
      </div>

      <div className="h-72 overflow-y-auto mb-6 space-y-4 pr-2 font-mono text-sm leading-relaxed">
        {history.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
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
          placeholder={copy.placeholder}
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

export default function Contact({ copy }) {
  return (
    <section
      id="contacto"
      className="min-h-screen flex items-center justify-center py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#050505] via-black/80 to-[#050505] z-0"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[50vh] pointer-events-none z-0"></div>

      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        <div className="max-w-md text-left">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
            {copy.titleStart}
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-white">{copy.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed font-light">{copy.description}</p>
          <div className="flex flex-col gap-4 text-sm text-gray-500 font-mono">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>
                {copy.averageResponseLabel} <span className="text-gray-300">{copy.averageResponseValue}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>
                {copy.engineeringAvailabilityLabel} <span className="text-gray-300">{copy.engineeringAvailabilityValue}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <ChatbotForm copy={copy.chat} />
        </div>
      </div>
    </section>
  );
}
