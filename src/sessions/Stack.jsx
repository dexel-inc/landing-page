import React from "react";
import {CheckCircle, Code, Cpu, Globe} from "lucide-react";

export default function Stack() {
    return (
        <section className="min-h-screen flex items-center justify-center py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/80 to-[#050505] z-0"></div>
            <div className="max-w-6xl w-full px-6 relative z-10">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Stack tecnológico
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
    );
}