import { useEffect, useLayoutEffect, useRef, useState } from "react";

const isBrowser = typeof window !== "undefined";
const supportsObserver = isBrowser && typeof IntersectionObserver !== "undefined";

/**
 * `useLayoutEffect` warns when it runs on the server, where there's no
 * layout to measure. During prerendering it falls back to `useEffect`,
 * which doesn't run there either.
 */
export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

/**
 * Observes an element and returns `true` the first time it enters the
 * viewport. Unsubscribes after the first trigger: entrance animations don't
 * repeat when scrolling back up.
 *
 * Whatever is already visible gets resolved synchronously before the first
 * paint, by measuring the rect in a layout effect. Waiting for the observer
 * left a frame with the content at zero opacity, which is exactly the
 * flicker the animation is meant to avoid.
 */
export function useInView({ threshold = 0.15, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  // Without IntersectionObserver —prerendering in Node included— nothing
  // stays hidden: the content never depends on an animation actually running.
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
