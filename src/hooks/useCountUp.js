import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./useInView.js";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Shows `target` and, once `active` turns true, animates it up from zero.
 *
 * The default value is the final one, not zero: the number used to depend
 * on the animation actually running, so the figure showed up as 0 if the
 * visitor didn't scroll, if there was no JavaScript, or if prerendering
 * generated it on the server. Now zero only exists while an animation is
 * in progress, and control returns to the real value once it finishes.
 */
export function useCountUp(target, { active = true, duration = 1600, decimals = 0 } = {}) {
  const reducedMotion = usePrefersReducedMotion();
  // `null` means "no animation in progress" → the final value is shown.
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
