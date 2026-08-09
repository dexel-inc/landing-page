import React from "react";
import { useInView, usePrefersReducedMotion } from "../../hooks/useInView.js";

const directionClasses = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: "",
};

/**
 * Envuelve contenido y lo anima al entrar en viewport.
 * `delay` en ms escalona elementos de una misma grilla.
 * Con `prefers-reduced-motion` el contenido se muestra sin transición.
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

  const visible = reducedMotion || inView;

  const motionClass = reducedMotion
    ? ""
    : `transition-all duration-700 ease-out ${
        visible
          ? "opacity-100 translate-x-0 translate-y-0 blur-0"
          : `opacity-0 blur-[2px] ${directionClasses[direction]}`
      }`;

  return (
    <div
      ref={ref}
      className={`${motionClass} ${className}`.trim()}
      style={reducedMotion ? undefined : { transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...props}
    >
      {children}
    </div>
  );
}
