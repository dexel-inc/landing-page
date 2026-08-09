import React, { useState } from "react";
import {
  useInView,
  useIsomorphicLayoutEffect,
  usePrefersReducedMotion,
} from "../../hooks/useInView.js";

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
 *
 * El contenido se renderiza visible y solo se oculta una vez montado en el
 * navegador y confirmado que está fuera de pantalla. Antes ocurría al revés:
 * el estado inicial era opacidad cero, así que el HTML que genera el build
 * llegaba con todo el contenido invisible y un rastreador que renderiza CSS
 * podía leerlo como contenido oculto. La animación decora; nunca decide si
 * algo se ve.
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

  // En un layout effect: el estado definitivo queda listo antes del pintado,
  // así que nada se ve aparecer y desaparecer.
  useIsomorphicLayoutEffect(() => setMounted(true), []);

  const visible = !mounted || reducedMotion || inView;

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
