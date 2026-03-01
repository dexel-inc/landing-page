import React, { useState } from "react";
import { Code, Send } from "lucide-react";
import Button from "../components/ui/Button.jsx";

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
    <div className="bg-white/85 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200 dark:border-zinc-700/50 rounded-xl p-6 max-w-md w-full shadow-2xl shadow-blue-900/10">
      <div className="flex items-center gap-3 mb-4 border-b border-slate-200 dark:border-zinc-800 pb-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-mono text-slate-500 dark:text-gray-400 tracking-widest">{copy.status}</span>
      </div>

      <div className="h-72 overflow-y-auto mb-6 space-y-4 pr-2 font-mono text-sm leading-relaxed">
        {history.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] p-4 rounded-2xl ${
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
            <div className="bg-slate-100 dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-zinc-700 flex gap-1">
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
          className="flex-1 bg-white dark:bg-black/50 border border-slate-300 dark:border-zinc-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500/50 transition-colors font-mono text-sm pl-10"
        />
        <Code size={18} className="absolute left-3 top-3.5 text-slate-400 dark:text-gray-500" />
        <Button
          onClick={handleSend}
          variant="primary"
          size="icon"
          className="rounded-lg h-[46px] w-[46px]"
        >
          <Send size={20} className="-ml-0.5 mt-0.5" />
        </Button>
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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-[#050505] dark:via-black/80 dark:to-[#050505] z-0"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[50vh] pointer-events-none z-0"></div>

      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        <div className="max-w-md text-left">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter text-slate-900 dark:text-white">
            {copy.titleStart}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-slate-700 dark:from-blue-400 dark:to-white">{copy.titleHighlight}</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mb-10 text-lg leading-relaxed font-light">{copy.description}</p>
          <div className="flex flex-col gap-4 text-sm text-slate-500 dark:text-gray-500 font-mono">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>
                {copy.averageResponseLabel} <span className="text-slate-700 dark:text-gray-300">{copy.averageResponseValue}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>
                {copy.engineeringAvailabilityLabel} <span className="text-slate-700 dark:text-gray-300">{copy.engineeringAvailabilityValue}</span>
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
