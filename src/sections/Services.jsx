import React, { useState } from "react";
import {CheckCircle, Check, Code, Cpu, Globe, MessageCircle, FileText, Wrench} from "lucide-react";
import { services } from "../data";

export default function Services() {
    const [flippedCard, setFlippedCard] = useState(null);

    const iconComponents = {
        Code,
        Cpu,
        Globe,
        MessageCircle,
        FileText,
        Wrench
    };

    return (
        <section className="min-h-screen flex items-center justify-center py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b via-black/80 to-[#050505] z-0"></div>

            <div className="max-w-6xl w-full px-6 relative z-10">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Nuestros Servicios
                    </h2>
                    <div className="w-12 h-[2px] bg-blue-500 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {services.map((service, i) => {
                        const IconComponent = iconComponents[service.iconName];
                        return (
                        <div
                            key={i}
                            className="relative h-[320px] cursor-pointer perspective-1000"
                            onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                        >
                            <div
                                className={`relative w-full h-full transition-all duration-700 transform-style-3d ${
                                    flippedCard === i ? 'rotate-y-180' : ''
                                }`}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: flippedCard === i ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                }}
                            >
                                {/* FRENTE DE LA TARJETA */}
                                <div
                                    className="absolute w-full h-full backface-hidden group bg-zinc-900/50 border border-zinc-800/80 rounded-2xl hover:bg-zinc-800/80 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
                                    style={{ backfaceVisibility: 'hidden' }}
                                >
                                    {/* Efecto de brillo sutil */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-500 -translate-y-1/2 translate-x-1/2"></div>
                                    
                                    {/* Header con ícono y título */}
                                    <div className="p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="text-white group-hover:text-blue-400 transition-all duration-300 p-3 bg-black/50 rounded-xl border border-zinc-800 group-hover:scale-110">
                                                <IconComponent size={32} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold tracking-tight text-white mb-1">
                                                    {service.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 group-hover:text-blue-400 group-hover:scale-105 transition-all duration-300 inline-block">
                                                    {service.price}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Body con descripción */}
                                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                            {service.desc}
                                        </p>
                                        <div className="flex items-center text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            Ver detalles <CheckCircle size={14} className="ml-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* REVERSO DE LA TARJETA */}
                                <div
                                    className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-900/40 via-zinc-900/90 to-zinc-900/50 border border-blue-500/30 rounded-2xl overflow-hidden"
                                    style={{ 
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)'
                                    }}
                                >
                                    <div className="p-8 h-full flex flex-col">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="text-blue-400 p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                                                <IconComponent size={32} />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">
                                                {service.title}
                                            </h3>
                                        </div>
                                        
                                        <div className="flex-1 space-y-3">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3 group/item">
                                                    <Check 
                                                        size={18} 
                                                        className="text-blue-400 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" 
                                                    />
                                                    <p className="text-gray-300 text-sm leading-relaxed">
                                                        {feature}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </section>
    );
}