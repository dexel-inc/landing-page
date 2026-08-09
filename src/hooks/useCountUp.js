import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./useInView.js";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Anima un número de 0 a `target` cuando `active` pasa a true.
 * Devuelve el valor formateado con los decimales pedidos.
 */
export function useCountUp(target, { active = true, duration = 1600, decimals = 0 } = {}) {
  const reducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active || reducedMotion) return;

    let frame;
    let start;

    const tick = (timestamp) => {
      if (start === undefined) start = timestamp;
      const elapsed = Math.min((timestamp - start) / duration, 1);
      setProgress(easeOutExpo(elapsed));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration, reducedMotion]);

  // Con motion reducido mostramos el valor final directo, sin animar.
  const value = reducedMotion ? target : target * progress;

  return value.toFixed(decimals);
}
