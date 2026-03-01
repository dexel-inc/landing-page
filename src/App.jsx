import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import Logo from "./icons/logo.jsx";
import Footer from "./sections/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import { useI18n } from "./i18n/I18nContext.jsx";
import { Link, useRouter } from "./router/RouterContext.jsx";
import {routes} from "./data/index.js";

function ParticleObject() {
  const ref = useRef({});
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;

    const expansion = 1;
    ref.current.scale.set(expansion, expansion, expansion);
    ref.current.material.color.setHSL(0.5, 0.8, 0.5);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

function Navbar() {
  const { copy, locale, setLocale } = useI18n();

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
      <div className="hidden md:flex gap-10 text-xs tracking-[0.15em] uppercase font-medium">
        <Link
          to="/"
          className="text-white hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
        >
          {copy.nav.home}
        </Link>
        <Link
          to="/servicios"
          className="text-white hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
        >
          {copy.nav.services}
        </Link>
        <Link
          to="/contacto"
          className="text-white hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
        >
          {copy.nav.contact}
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-2 text-xs uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setLocale("es")}
          className={`px-2 py-1 rounded border ${
            locale === "es" ? "border-blue-400 text-blue-300" : "border-zinc-700 text-gray-400"
          }`}
        >
          {copy.nav.spanish}
        </button>
        <button
          type="button"
          onClick={() => setLocale("en")}
          className={`px-2 py-1 rounded border ${
            locale === "en" ? "border-blue-400 text-blue-300" : "border-zinc-700 text-gray-400"
          }`}
        >
          {copy.nav.english}
        </button>
      </div>
    </nav>
  );
}

function RouteContent() {
    const { path, navigate } = useRouter();
    const { copy } = useI18n();
    const dataFromPath = routes[path] ?? 'none';

    if (dataFromPath === 'none') {
        return <HomePage copy={copy} onNavigate={navigate}/>;
    }

    const PathComponent = dataFromPath.component;

    return (
        <>
            <PathComponent copy={copy[dataFromPath.key]}/>
            <Footer copy={copy.footer} onNavigate={navigate}/>
        </>
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
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-[#050505]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        <RouteContent />
      </main>
    </div>
  );
}
