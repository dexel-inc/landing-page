import { useEffect, useRef, useState } from "react";

const supportsObserver = typeof IntersectionObserver !== "undefined";

/**
 * Observa un elemento y devuelve `true` la primera vez que entra en viewport.
 * Se desuscribe tras el primer disparo: las animaciones de entrada no se repiten
 * al hacer scroll hacia arriba, que es el comportamiento que espera el usuario.
 */
export function useInView({ threshold = 0.15, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  // Sin IntersectionObserver mostramos el contenido de entrada: nunca oculto.
  const [inView, setInView] = useState(!supportsObserver);

  useEffect(() => {
    const node = ref.current;
    if (!node || !supportsObserver) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setReduced(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
