import React, {useEffect, useRef, useState} from "react";
import {CheckCircle, Code, Cpu, Globe, Send} from "lucide-react";
import {Canvas, useFrame} from "@react-three/fiber";
import {PointMaterial, Points} from "@react-three/drei";
import * as random from 'maath/random/dist/maath-random.esm';
import Logo from "./icons/logo.jsx";
import Stack from "./sections/Stack.jsx";
import Services from "./sections/Services.jsx";

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

function ParticleObject() {
    const ref = useRef({});
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame((state, delta) => {
        // Rotación constante
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;


        const expansion = 1 + (1 - 1) * 2;
        ref.current.scale.set(expansion, expansion, expansion);
        ref.current.material.color.setHSL(0.5, 0.8, 0.5);
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function DexelLanding() {
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                ticking = false;
            });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-blue-900/30 selection:text-white">
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticleObject />
                </Canvas>
            </div>

            <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
                <Logo />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505]" />
            </div>

            {/* NAVBAR */}
             <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
                <div className="hidden md:flex gap-10 text-xs tracking-[0.15em] uppercase font-medium">
                    <a
                        href="#inicio"
                        className="text-white hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
                    >
                        Inicio
                    </a>
                    <a
                        href="#servicios"
                        className="text-white hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
                    >
                        Servicios
                    </a>
                    <a
                        href="#about"
                        className="text-white hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
                    >
                        Sobre Nosotros
                    </a>
                </div>
            </nav>

            <main className="relative z-10">
                {/* HERO */}
                <section
                    id="inicio"
                    className="h-screen flex flex-col justify-center items-center text-center px-4 relative py-4"
                >
                    <div className="absolute inset-0 items-center bg-gradient-to-b from-transparent via-transparent to-[#050505] z-0"></div>
                    <div className="z-10 relative justify-center items-center flex flex-col my-4">
                        <div className="flex justify-center animate-pulse mt-30 mb-1">
                          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 border border-blue-400/30 px-3 py-1 rounded-full bg-blue-900/10">
                            Desarrollo de Software a la medida
                          </span>
                        </div>
                        <Logo className="w-60 h-60" viewBox="0 0 324 210" />

                        <p className="max-w-xl mx-auto text-gray-400 text-md leading-relaxed font-light">
                            Donde la complejidad técnica se encuentra con el diseño elegante.
                            Creamos ecosistemas digitales a la medida para personas o empresas que no
                            aceptan límites.
                        </p>

                        <div className="mt-16 flex flex-col items-center gap-4">
                            <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent animate-pulse"></div>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-mono">
                                Scroll para hacer tu idea realidad
                            </span>
                        </div>
                    </div>
                </section>
                

                <Services />
                <Stack id="stack" />

                {/* SERVICIOS */}
                <section

                    className="min-h-screen flex items-center justify-center py-24 relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/80 to-[#050505] z-0"></div>

                    <div className="max-w-6xl w-full px-6 relative z-10">
                        <div className="mb-16 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                                Nuestra Arquitectura
                            </h2>
                            <div className="w-12 h-[2px] bg-blue-500 mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                            {[
                                {
                                    icon: <Code size={32} />,
                                    title: "Desarrollo a Medida",
                                    desc: "No usamos plantillas. Diseñamos arquitecturas escalables desde cero, optimizadas específicamente para la lógica única de su negocio.",
                                },
                                {
                                    icon: <Globe size={32} />,
                                    title: "Ecosistemas Web 3.0",
                                    desc: "Plataformas web progresivas de alto rendimiento. Integración de experiencias 3D inmersivas y animaciones fluidas que redefinen la interacción.",
                                },
                                {
                                    icon: <Cpu size={32} />,
                                    title: "Automatización & IA",
                                    desc: "Integración de modelos inteligentes y algoritmos complejos para automatizar flujos de trabajo operativos y reducir la fricción humana.",
                                },
                            ].map((service, i) => (
                                <div
                                    key={i}
                                    className="group bg-zinc-900/50 border border-zinc-800/80 p-8 rounded-2xl hover:bg-zinc-800/80 hover:border-blue-500/30 transition duration-500 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-500 -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="mb-6 text-gray-300 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 inline-block p-3 bg-black/50 rounded-xl border border-zinc-800">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 tracking-wide">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm font-light">
                                        {service.desc}
                                    </p>
                                    <div className="mt-6 flex items-center text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-mono uppercase tracking-wider">
                                        Explorar <CheckCircle size={14} className="ml-2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* CONTACTO */}
                <section
                    id="contacto"
                    className="min-h-screen flex items-center justify-center py-24 px-6 relative overflow-hidden"
                >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[50vh] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

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

                {/* FOOTER */}
                <footer className="border-t border-zinc-900/80 bg-[#050505] py-12 text-center relative z-10">
                    <div className="mb-6 text-xl font-bold tracking-[0.2em] text-gray-300">
                        &lt; DEXEL &gt;
                    </div>
                    <div className="flex justify-center gap-8 mb-8 text-gray-500 text-sm tracking-widest uppercase">
                        <a href="#" className="hover:text-white transition">
                            Linkedin
                        </a>
                        <a href="#" className="hover:text-white transition">
                            Github
                        </a>
                        <a href="#" className="hover:text-white transition">
                            Twitter
                        </a>
                    </div>
                    <p className="text-zinc-600 text-xs font-mono">
                        &copy; {new Date().getFullYear()} DEXEL DIGITAL EXCELLENCE. Todos los
                        derechos reservados.
                    </p>
                </footer>
            </main>
        </div>
    );
}
