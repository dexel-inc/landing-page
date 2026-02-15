import React, {useEffect, useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {PointMaterial, Points} from "@react-three/drei";
import * as random from 'maath/random/dist/maath-random.esm';
import Logo from "./icons/logo.jsx";
import Stack from "./sections/Stack.jsx";
import Services from "./sections/Services.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";


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

                <Contact />
                <Services />
                <Stack id="stack" />
                <Footer />
            </main>
        </div>
    );
}
