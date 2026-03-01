import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { Moon, Sun } from "lucide-react";
import * as random from "maath/random/dist/maath-random.esm";
import Logo from "./icons/logo.jsx";
import Button from "./components/ui/Button.jsx";
import Footer from "./sections/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import { useI18n } from "./i18n/I18nContext.jsx";
import { Link, useRouter } from "./router/RouterContext.jsx";
import { routes } from "./data/index.js";
import { useTheme } from "./theme/ThemeContext.jsx";

function ParticleObject() {
  const ref = useRef({});
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
  const { theme } = useTheme();

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    ref.current.scale.set(1, 1, 1);
    ref.current.material.color.set(theme === "dark" ? "#ffffff" : "#1e3a8a");
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

function Navbar() {
  const { copy, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 px-3 py-3 md:p-6 bg-gradient-to-b from-white/90 to-transparent dark:from-black/90 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 md:gap-8">
          <Link
              to="/"
              className="inline-flex items-center gap-2  px-2.5 py-1.5 md:px-3 text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          >
            <Logo className="w-7 h-7 md:w-8 md:h-8 text-current" viewBox="0 0 324 210" />
          </Link>

          <div className="hidden md:flex gap-10 text-xs tracking-[0.15em] uppercase font-medium">
            <Link
              to="/"
              className="text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
            >
              {copy.nav.home}
            </Link>
            <Link
              to="/servicios"
              className="text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
            >
              {copy.nav.services}
            </Link>
            <Link
              to="/contacto"
              className="text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
            >
              {copy.nav.contact}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2 rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white/80 dark:bg-black/35 backdrop-blur-md px-1.5 py-1.5 md:px-2 md:py-1.5 shadow-[0_12px_28px_-18px_rgba(15,23,42,0.45)]">
          <Button
            aria-label={copy.nav.themeToggle}
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className="h-8 w-8 md:h-9 md:w-9 rounded-xl"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </Button>

          <div className="flex items-center rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900/70 p-0.5">
            <Button
              onClick={() => setLocale("es")}
              variant={locale === "es" ? "secondary" : "ghost"}
              size="xs"
              className="h-7 md:h-8 min-w-8 md:min-w-9 rounded-lg px-2 md:px-2"
            >
              {copy.nav.spanish}
            </Button>

            <Button
              onClick={() => setLocale("en")}
              variant={locale === "en" ? "secondary" : "ghost"}
              size="xs"
              className="h-7 md:h-8 min-w-8 md:min-w-9 rounded-lg px-2 md:px-2"
            >
              {copy.nav.english}
            </Button>
          </div>
        </div>
      </div>

      <div className="md:hidden mt-2 flex items-center justify-center gap-2">
        <Link
          to="/"
          className="text-[10px] uppercase tracking-[0.15em] px-2 py-1 rounded-lg border border-slate-200/90 dark:border-zinc-800 bg-white/70 dark:bg-black/30 text-slate-700 dark:text-gray-200"
        >
          {copy.nav.home}
        </Link>
        <Link
          to="/servicios"
          className="text-[10px] uppercase tracking-[0.15em] px-2 py-1 rounded-lg border border-slate-200/90 dark:border-zinc-800 bg-white/70 dark:bg-black/30 text-slate-700 dark:text-gray-200"
        >
          {copy.nav.services}
        </Link>
        <Link
          to="/contacto"
          className="text-[10px] uppercase tracking-[0.15em] px-2 py-1 rounded-lg border border-slate-200/90 dark:border-zinc-800 bg-white/70 dark:bg-black/30 text-slate-700 dark:text-gray-200"
        >
          {copy.nav.contact}
        </Link>
      </div>
    </nav>
  );
}

function RouteContent() {
  const { path, navigate } = useRouter();
  const { copy } = useI18n();
  const dataFromPath = routes[path] ?? "none";

  if (dataFromPath === "none") {
    return <HomePage copy={copy} onNavigate={navigate} />;
  }

  const PathComponent = dataFromPath.component;

  return (
    <>
      <PathComponent copy={copy[dataFromPath.key]} />
      <Footer copy={copy.footer} onNavigate={navigate} />
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
    <div className="bg-slate-50 dark:bg-[#050505] min-h-screen text-slate-900 dark:text-white font-sans selection:bg-blue-200 dark:selection:bg-blue-900/30 selection:text-slate-900 dark:selection:text-white transition-colors duration-300">
      <div className="fixed inset-0 z-0 opacity-20 dark:opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleObject />
        </Canvas>
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center text-slate-300 dark:text-white">
        <Logo className="opacity-30 dark:opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-slate-50 dark:from-black/30 dark:to-[#050505]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        <RouteContent />
      </main>
    </div>
  );
}
