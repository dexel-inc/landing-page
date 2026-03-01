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
  const { theme, preference, toggleTheme, setPreference } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 bg-gradient-to-b from-white/90 to-transparent dark:from-black/90 backdrop-blur-sm">
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

      <div className="ml-auto flex items-center gap-2">
        <Button
          aria-label={copy.nav.themeToggle}
          onClick={toggleTheme}
          variant="outline"
          size="icon"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </Button>

        <Button
          onClick={() => setPreference("system")}
          variant={preference === "system" ? "secondary" : "outline"}
          size="xs"
        >
          {copy.nav.auto}
        </Button>

        <Button
          onClick={() => setLocale("es")}
          variant={locale === "es" ? "secondary" : "outline"}
          size="xs"
        >
          {copy.nav.spanish}
        </Button>

        <Button
          onClick={() => setLocale("en")}
          variant={locale === "en" ? "secondary" : "outline"}
          size="xs"
        >
          {copy.nav.english}
        </Button>
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
