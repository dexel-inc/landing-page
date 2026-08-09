import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./useInView.js";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Muestra `target` y, cuando `active` pasa a true, lo anima desde cero.
 *
 * El valor por defecto es el final, no el cero: antes el número dependía de que
 * la animación llegara a correr, así que la cifra aparecía en 0 si el visitante
 * no hacía scroll, si no había JavaScript o si el prerenderizado la generaba en
 * el servidor. Ahora el cero solo existe mientras hay una animación en curso, y
 * al terminar se devuelve el control al valor real.
 */
export function useCountUp(target, { active = true, duration = 1600, decimals = 0 } = {}) {
  const reducedMotion = usePrefersReducedMotion();
  // `null` significa "sin animación en curso" → se muestra el valor final.
  const [animatedValue, setAnimatedValue] = useState(null);

  useEffect(() => {
    if (!active || reducedMotion) return;

    let frame;
    let start;

    const tick = (timestamp) => {
      if (start === undefined) start = timestamp;
      const elapsed = Math.min((timestamp - start) / duration, 1);

      if (elapsed >= 1) {
        setAnimatedValue(null);
        return;
      }

      setAnimatedValue(target * easeOutExpo(elapsed));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration, reducedMotion]);

  const value = animatedValue ?? target;

  return value.toFixed(decimals);
}
