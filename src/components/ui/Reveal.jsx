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
 * Envuelve un encabezado de sección y lo desplaza levemente al entrar en
 * viewport.
 *
 * Dos reglas, y las dos vienen de haber roto la página con la versión anterior:
 *
 * 1. **El contenido nunca deja de verse.** El estado previo a la animación es
 *    un desplazamiento de 12 px y una atenuación parcial, no opacidad cero. Con
 *    opacidad cero, un scroll rápido dejaba secciones enteras en blanco —el
 *    bloque de "qué pasa después de la auditoría" aparecía como 300 px vacíos—
 *    porque el observador no alcanzaba a dispararse. Si la animación no llega a
 *    correr nunca, lo peor que pasa es que el bloque queda 12 px más abajo.
 *
 * 2. **Solo envuelve encabezados y bloques destacados.** Las tarjetas de una
 *    grilla, los ítems de una lista y los párrafos van sin animación: eran la
 *    mayor parte de los 131 elementos animados que tenía el sitio y ninguno
 *    ganaba nada por aparecer con retraso.
 *
 * `delay` sigue existiendo para escalonar dos o tres bloques hermanos, no para
 * escalonar una grilla.
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

  const settled = !mounted || reducedMotion || inView;

  // Sin `prefers-reduced-motion` no hay transición ni transformación: quien pide
  // que nada se mueva recibe el marcado tal cual, sin clases de movimiento.
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
