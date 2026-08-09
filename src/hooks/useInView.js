import { useEffect, useLayoutEffect, useRef, useState } from "react";

const isBrowser = typeof window !== "undefined";
const supportsObserver = isBrowser && typeof IntersectionObserver !== "undefined";

/**
 * `useLayoutEffect` avisa cuando se ejecuta en el servidor, donde no hay
 * layout que medir. En el prerenderizado cae a `useEffect`, que allí no corre.
 */
export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

/**
 * Observa un elemento y devuelve `true` la primera vez que entra en viewport.
 * Se desuscribe tras el primer disparo: las animaciones de entrada no se
 * repiten al hacer scroll hacia arriba.
 *
 * Lo que ya está a la vista se resuelve de forma síncrona antes del primer
 * pintado, midiendo el rectángulo en un layout effect. Esperar al observer
 * dejaba un fotograma con el contenido en opacidad cero, que es justo el
 * parpadeo que la animación pretende evitar.
 */
export function useInView({ threshold = 0.15, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  // Sin IntersectionObserver —incluido el prerenderizado en Node— nada queda
  // oculto: el contenido nunca depende de que una animación llegue a correr.
  const [inView, setInView] = useState(!supportsObserver);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node || !supportsObserver || inView) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      return;
    }

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
  }, [threshold, rootMargin, inView]);

  return [ref, inView];
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => (isBrowser && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) ?? false,
  );

  useEffect(() => {
    if (!isBrowser || !window.matchMedia) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setReduced(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
