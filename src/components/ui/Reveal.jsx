import React, { useState } from "react";
import {
  useInView,
  useIsomorphicLayoutEffect,
  usePrefersReducedMotion,
} from "../../hooks/useInView.js";

const directionClasses = {
  up: "translate-y-3",
  down: "-translate-y-3",
  left: "translate-x-3",
  right: "-translate-x-3",
  none: "",
};

/**
 * Wraps a section heading and shifts it slightly as it enters the viewport.
 *
 * Two rules, and both come from having broken the page with the previous
 * version:
 *
 * 1. **The content never stops being visible.** The pre-animation state is
 *    a 12px offset and partial dimming, not zero opacity. With zero
 *    opacity, a fast scroll left whole sections blank —the "what happens
 *    after the audit" block showed up as 300px of empty space— because the
 *    observer never got a chance to fire. If the animation never runs at
 *    all, the worst that happens is the block sits 12px lower.
 *
 * 2. **It only wraps headings and highlighted blocks.** Cards in a grid,
 *    list items, and paragraphs go without animation: they made up most of
 *    the 131 animated elements the site used to have, and none of them
 *    gained anything by appearing with a delay.
 *
 * `delay` still exists to stagger two or three sibling blocks, not to
 * stagger a grid.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  ...props
}) {
  const [ref, inView] = useInView();
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  // In a layout effect: the final state is ready before painting, so
  // nothing is seen popping in and out.
  useIsomorphicLayoutEffect(() => setMounted(true), []);

  const settled = !mounted || reducedMotion || inView;

  // With `prefers-reduced-motion` there's no transition or transform:
  // whoever asks for nothing to move gets the markup as-is, with no motion classes.
  const motionClass = reducedMotion
    ? ""
    : `transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
        settled ? "opacity-100 translate-x-0 translate-y-0" : `opacity-70 ${directionClasses[direction]}`
      }`;

  return (
    <div
      ref={ref}
      className={`${motionClass} ${className}`.trim()}
      style={reducedMotion ? undefined : { transitionDelay: settled ? `${delay}ms` : "0ms" }}
      {...props}
    >
      {children}
    </div>
  );
}
