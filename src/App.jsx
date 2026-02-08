import React, {useEffect, useRef, useState} from "react";
import {createTimeline, svg} from "animejs";
import {CheckCircle, Code, Cpu, Globe, Send} from "lucide-react";
import {Canvas, useFrame} from "@react-three/fiber";
import {PointMaterial, Points} from "@react-three/drei";
import * as random from 'maath/random/dist/maath-random.esm';

const clamp01 = (n) => Math.max(0, Math.min(1, n));

export function DexelLogoBuild({ progress = 0 }) {
    const svgRef = useRef(null);
    const tlRef = useRef(null);

    useEffect(() => {
        const root = svgRef.current;
        if (!root) return;

        const p1 = root.querySelector(".p1");
        const p2 = root.querySelector(".p2");
        if (!p1 || !p2) return;

        const setupPath = (p) => {
            p.setAttribute("stroke", "#ffffff");
            p.setAttribute("strokeWidth", "2");

            p.setAttribute("fill", "#ffffff");
            p.setAttribute("fill-opacity", "0");
        };

        setupPath(p1);
        setupPath(p2);

        const d1 = svg.createDrawable(p1);
        const d2 = svg.createDrawable(p2);

        tlRef.current = createTimeline({
            autoplay: false,
            defaults: {ease: "inOutSine"},
        })
            .add(d1, {draw: "0 1", duration: 3000})
            .add(d2, {draw: "0 1", duration: 2000}, "-=250")
            .add([p1, p2], {fillOpacity: [0, 1], duration: 4000}, "-=300")
            .add([p1, p2], {strokeOpacity: [1, 1], duration: 4500}, "-=300");
        return () => {
            tlRef.current = null;
        };
    }, []);

    useEffect(() => {
        const tl = tlRef.current;
        if (!tl) return;
        tl.seek(tl.duration * clamp01(progress));
    }, [progress]);

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 200 200"
            className="h-auto opacity-20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M69.3334 1.20004L64.8 2.00004L82.5334 26.6667C92.2667 40.2667 102.667 54.5334 105.467 58.2667L110.667 65.3334H123.467C133.467 65.3334 135.867 64.9334 134.933 63.6C127.2 53.7334 105.067 22.4 105.467 22C105.733 21.7334 115.467 21.3334 126.933 21.2C138.4 21.2 147.867 20.5334 147.867 19.8667C147.867 19.2 144.8 14.5334 141.067 9.33337L134.267 3.72827e-05L104 0.133371C87.4667 0.266704 71.8667 0.666704 69.3334 1.20004Z" fill="white"/>
            <path d="M205.467 6.93337C202.667 10.8 199.2 15.6 198 17.6L195.6 21.2L215.733 21.6L236 22L224.4 38.6667C196.267 79.2 190 88 189.067 88C188.533 88 182 79.7334 174.533 69.4667C162.133 52.6667 160.533 50.9334 156.133 50.1334C149.6 49.0667 135.867 49.0667 135.867 50.1334C135.867 50.6667 144.533 63.2 155.2 78.1334C165.867 93.0667 174.933 106.133 175.333 107.333C176.133 109.333 169.467 119.733 149.733 147.6L140.933 160H153.733H166.4L177.467 143.733C183.6 134.8 189.2 127.333 189.867 127.2C191.067 126.8 218.8 163.2 230.133 180L234.4 186.4L229.467 187.2C226.8 187.6 218.133 188 210.267 188C202.267 188 195.867 188.4 195.867 188.8C195.867 189.333 198.933 193.733 202.667 198.8C208.533 206.8 210 208 213.6 208C216 208 228.133 208.4 240.667 208.933C253.2 209.333 266.267 209.333 269.6 208.8L275.867 207.867L270.667 200.267C267.733 196.133 252.267 174.667 236 152.667C219.867 130.667 205.867 111.333 205.067 109.6C202.8 105.6 196.133 116.133 261.6 21.0667L274.667 2.00004L270.933 1.20004C268.933 0.666705 254.533 0.266705 238.933 0.133371L210.667 3.79165e-05L205.467 6.93337Z" fill="white"/>
            <path d="M58.1333 67.9999C58.5333 76.7999 58.5333 83.9999 58.1333 83.9999C57.6 83.9999 56 82.7999 54.5333 81.3333C53.2 79.9999 48.8 77.8666 44.8 76.6666C27.7333 71.7333 7.86667 82.3999 2 99.7333C-0.666667 107.467 -0.666667 120.533 2 128.267C8.8 148.4 32.2667 157.867 51.0667 148.133L58.5333 144.133V147.467C58.5333 150.533 58.8 150.667 67.8667 150.667H77.2V101.333V51.9999H67.2H57.3333L58.1333 67.9999ZM47.2 95.0666C60.9333 102.8 62.6667 120.933 50.6667 131.067C47.0667 134.133 45.0667 134.667 38.4 134.667C31.2 134.667 30.1333 134.267 25.2 129.867C15.8667 121.333 15.2 109.733 23.4667 99.8666C30.2667 91.8666 38.5333 90.1333 47.2 95.0666Z" fill="white"/>
            <path d="M305.2 101.333V150.667H314.533H323.867V101.333V52H314.533H305.2V101.333Z" fill="white"/>
            <path d="M114.933 76.1333C96.1333 79.5999 82.2666 97.8666 84.2666 116.667C86.5333 139.333 103.467 153.333 126.4 151.733C136.267 150.933 143.867 147.733 149.733 141.467C154.267 136.8 153.467 135.067 145.467 131.467C140.4 129.2 140.267 129.2 135.2 132.533C128.667 136.933 119.067 137.2 112 133.2C106.533 130.267 103.067 125.6 104.8 124C106.267 122.667 124.8 121.467 144.933 121.333H161.2V114.933C161.2 103.2 157.733 95.0666 149.467 86.6666C143.867 81.1999 140.267 78.7999 135.867 77.5999C127.333 75.4666 121.333 75.0666 114.933 76.1333ZM129.6 92.5333C135.467 94.9333 143.467 104 140.933 105.467C138.533 107.067 102.533 106.933 102.533 105.467C102.533 102.8 110 95.4666 115.2 93.1999C121.6 90.2666 124 90.1333 129.6 92.5333Z" fill="white"/>
            <path d="M252.267 76.1334C240.133 78.4 230.267 86.2667 224.933 98C220.8 107.2 220.8 122.267 225.067 131.067C233.2 148 253.867 156 273.067 149.733C279.467 147.733 290.533 139.867 290.533 137.333C290.533 136.667 287.733 134.533 284.4 132.533L278.4 128.933L272 132.533C261.067 138.4 249.867 136.4 242.8 126.933L239.467 122.667L255.733 122.533C264.533 122.4 272.533 122.133 273.2 122C274 121.867 280 121.6 286.667 121.467L298.933 121.333L298.267 112.267C296.533 88.2667 275.467 71.7334 252.267 76.1334ZM267.467 93.4667C271.867 95.0667 278.533 101.067 278.533 103.467C278.533 105.867 273.733 106.667 257.467 106.667C239.2 106.667 237.6 105.2 246.267 97.0667C250.933 92.8 252.667 92 257.733 92C261.067 92 265.333 92.6667 267.467 93.4667Z" fill="white"/>
            <path d="M82.8001 184C73.8668 197.2 66.5334 208.267 66.5334 208.667C66.5334 209.067 82.0001 209.333 100.933 209.333H135.333L142.4 199.2C146.267 193.6 149.2 188.933 148.933 188.667C148.4 188.267 121.467 186.8 112.8 186.667H106.4L114.533 174.667C118.933 168.133 122.533 162.133 122.533 161.333C122.533 160.533 118 160 110.8 160H99.0668L82.8001 184Z" fill="white"/>
        </svg>
    );
}


// --- CHATBOT (arreglé los template strings de className) ---
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

export function DexelLanding() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const totalScroll = document.documentElement.scrollTop || 0;
                const windowHeight =
                    document.documentElement.scrollHeight -
                    document.documentElement.clientHeight;

                const raw = windowHeight > 0 ? totalScroll / windowHeight : 0;
                setScrollProgress(clamp01(raw));

                ticking = false;
            });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const logoProgress = clamp01(scrollProgress / 0.3);

    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-blue-900/30 selection:text-white">
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticleObject />
                </Canvas>
            </div>

            <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
                <DexelLogoBuild progress={logoProgress} />
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
                            Ingeniería de Software de Élite
                          </span>
                        </div>
                        <svg
                            className="w-60 h-60"
                            viewBox="0 0 324 210"
                            width="324" height="210" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M69.3334 1.20004L64.8 2.00004L82.5334 26.6667C92.2667 40.2667 102.667 54.5334 105.467 58.2667L110.667 65.3334H123.467C133.467 65.3334 135.867 64.9334 134.933 63.6C127.2 53.7334 105.067 22.4 105.467 22C105.733 21.7334 115.467 21.3334 126.933 21.2C138.4 21.2 147.867 20.5334 147.867 19.8667C147.867 19.2 144.8 14.5334 141.067 9.33337L134.267 3.72827e-05L104 0.133371C87.4667 0.266704 71.8667 0.666704 69.3334 1.20004Z" fill="white"/>
                            <path d="M205.467 6.93337C202.667 10.8 199.2 15.6 198 17.6L195.6 21.2L215.733 21.6L236 22L224.4 38.6667C196.267 79.2 190 88 189.067 88C188.533 88 182 79.7334 174.533 69.4667C162.133 52.6667 160.533 50.9334 156.133 50.1334C149.6 49.0667 135.867 49.0667 135.867 50.1334C135.867 50.6667 144.533 63.2 155.2 78.1334C165.867 93.0667 174.933 106.133 175.333 107.333C176.133 109.333 169.467 119.733 149.733 147.6L140.933 160H153.733H166.4L177.467 143.733C183.6 134.8 189.2 127.333 189.867 127.2C191.067 126.8 218.8 163.2 230.133 180L234.4 186.4L229.467 187.2C226.8 187.6 218.133 188 210.267 188C202.267 188 195.867 188.4 195.867 188.8C195.867 189.333 198.933 193.733 202.667 198.8C208.533 206.8 210 208 213.6 208C216 208 228.133 208.4 240.667 208.933C253.2 209.333 266.267 209.333 269.6 208.8L275.867 207.867L270.667 200.267C267.733 196.133 252.267 174.667 236 152.667C219.867 130.667 205.867 111.333 205.067 109.6C202.8 105.6 196.133 116.133 261.6 21.0667L274.667 2.00004L270.933 1.20004C268.933 0.666705 254.533 0.266705 238.933 0.133371L210.667 3.79165e-05L205.467 6.93337Z" fill="white"/>
                            <path d="M58.1333 67.9999C58.5333 76.7999 58.5333 83.9999 58.1333 83.9999C57.6 83.9999 56 82.7999 54.5333 81.3333C53.2 79.9999 48.8 77.8666 44.8 76.6666C27.7333 71.7333 7.86667 82.3999 2 99.7333C-0.666667 107.467 -0.666667 120.533 2 128.267C8.8 148.4 32.2667 157.867 51.0667 148.133L58.5333 144.133V147.467C58.5333 150.533 58.8 150.667 67.8667 150.667H77.2V101.333V51.9999H67.2H57.3333L58.1333 67.9999ZM47.2 95.0666C60.9333 102.8 62.6667 120.933 50.6667 131.067C47.0667 134.133 45.0667 134.667 38.4 134.667C31.2 134.667 30.1333 134.267 25.2 129.867C15.8667 121.333 15.2 109.733 23.4667 99.8666C30.2667 91.8666 38.5333 90.1333 47.2 95.0666Z" fill="white"/>
                            <path d="M305.2 101.333V150.667H314.533H323.867V101.333V52H314.533H305.2V101.333Z" fill="white"/>
                            <path d="M114.933 76.1333C96.1333 79.5999 82.2666 97.8666 84.2666 116.667C86.5333 139.333 103.467 153.333 126.4 151.733C136.267 150.933 143.867 147.733 149.733 141.467C154.267 136.8 153.467 135.067 145.467 131.467C140.4 129.2 140.267 129.2 135.2 132.533C128.667 136.933 119.067 137.2 112 133.2C106.533 130.267 103.067 125.6 104.8 124C106.267 122.667 124.8 121.467 144.933 121.333H161.2V114.933C161.2 103.2 157.733 95.0666 149.467 86.6666C143.867 81.1999 140.267 78.7999 135.867 77.5999C127.333 75.4666 121.333 75.0666 114.933 76.1333ZM129.6 92.5333C135.467 94.9333 143.467 104 140.933 105.467C138.533 107.067 102.533 106.933 102.533 105.467C102.533 102.8 110 95.4666 115.2 93.1999C121.6 90.2666 124 90.1333 129.6 92.5333Z" fill="white"/>
                            <path d="M252.267 76.1334C240.133 78.4 230.267 86.2667 224.933 98C220.8 107.2 220.8 122.267 225.067 131.067C233.2 148 253.867 156 273.067 149.733C279.467 147.733 290.533 139.867 290.533 137.333C290.533 136.667 287.733 134.533 284.4 132.533L278.4 128.933L272 132.533C261.067 138.4 249.867 136.4 242.8 126.933L239.467 122.667L255.733 122.533C264.533 122.4 272.533 122.133 273.2 122C274 121.867 280 121.6 286.667 121.467L298.933 121.333L298.267 112.267C296.533 88.2667 275.467 71.7334 252.267 76.1334ZM267.467 93.4667C271.867 95.0667 278.533 101.067 278.533 103.467C278.533 105.867 273.733 106.667 257.467 106.667C239.2 106.667 237.6 105.2 246.267 97.0667C250.933 92.8 252.667 92 257.733 92C261.067 92 265.333 92.6667 267.467 93.4667Z" fill="white"/>
                            <path d="M82.8001 184C73.8668 197.2 66.5334 208.267 66.5334 208.667C66.5334 209.067 82.0001 209.333 100.933 209.333H135.333L142.4 199.2C146.267 193.6 149.2 188.933 148.933 188.667C148.4 188.267 121.467 186.8 112.8 186.667H106.4L114.533 174.667C118.933 168.133 122.533 162.133 122.533 161.333C122.533 160.533 118 160 110.8 160H99.0668L82.8001 184Z" fill="white"/>
                        </svg>

                        <p className="max-w-xl mx-auto text-gray-400 text-md leading-relaxed font-light">
                            Donde la complejidad técnica se encuentra con el diseño elegante.
                            Creamos ecosistemas digitales a medida para empresas que no
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
                <section
                    id="services"
                    className="min-h-screen flex items-center justify-center py-24 relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/40 to-[#050505] z-0"></div>
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Nuestros servicios
                            </h2>
                            <p className="text-xl text-white">
                                Soluciones a medida para tus necesidades digitales
                            </p>
                            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <div
                            className="text-white dark:bg-secondary-dark rounded-xl shadow-lg overflow-hidden hover:shadow-xl group flex flex-col h-full initially-hidden"
                            >
                            <div className="bg-primary p-6 text-center relative">
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-primary-light rounded-full opacity-20"></div>
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <template >
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                                <line x1="9" y1="21" x2="9" y2="9"></line>
                                            </template>
                                            <template >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                            </template>
                                            <template>
                                                <polyline points="16 18 22 12 16 6"></polyline>
                                                <polyline points="8 6 2 12 8 18"></polyline>
                                            </template>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Páginas Web</h3>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <p className="text-white mb-4 text-center">Páginas individuales diseñadas para presentar información clave de manera clara y accesible.</p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                            Diseño genérico
                                    </li> <li className="flex items-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        Diseño responsivo
                                    </li> <li className="flex items-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        Formulario de contacto
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-auto pt-6 rounded-xl text-center">
                                <div className="inline-block w-full py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors duration-300"> Más información</div>
                        </div>
                    </div>
        </div>
</div>

    <div className="text-center mt-12">
        <div
            to="/services"
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors duration-300"
        >
            Ver todos los servicios
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
        </div>
    </div>
</div>
</section>


                {/* SERVICIOS */}
                <section
                    id="servicios"
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

export default function App() {
    return <DexelLanding />;
}
