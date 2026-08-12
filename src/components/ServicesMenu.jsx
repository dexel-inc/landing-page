import React, { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";

/**
 * Menú de servicios: desplegable en escritorio, acordeón en móvil.
 *
 * Los grupos salen del mismo contenido que renderizan las páginas, así que un
 * frente nuevo aparece en el menú sin tocar este archivo. El encabezado de cada
 * grupo es un enlace real a su categoría, no un título: quien hace clic en
 * "Automatización" espera llegar a automatización, no a que se abra una lista.
 */
const groupLinkClass =
  "block text-xs tracking-[0.15em] uppercase font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 transition-colors";

const itemClass = "text-sm text-slate-600 dark:text-gray-400 leading-relaxed";

/**
 * Desplegable de escritorio.
 *
 * Abre con hover y también con clic o con Enter, porque un menú que solo
 * responde al puntero deja fuera a quien navega con teclado. Se cierra con
 * Escape —devolviendo el foco al disparador— y cuando el foco sale del bloque,
 * que es lo que ocurre al tabular más allá del último enlace.
 */
export function ServicesDropdown({ groups, label, indexLabel, onNavigate }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // `focusout` en el contenedor: cierra al tabular fuera del menú, pero no
  // cuando el foco se mueve entre los enlaces de adentro.
  const handleBlur = (event) => {
    if (!containerRef.current?.contains(event.relatedTarget)) setOpen(false);
  };

  const close = () => setOpen(false);

  /**
   * En un dispositivo con puntero, para cuando llega el clic el hover ya abrió
   * el panel: tratar el clic como un interruptor lo cerraría justo en el gesto
   * con el que el visitante pedía verlo. Ahí el clic no hace nada y el panel se
   * queda abierto. Donde no hay hover —o cuando se llega con Enter desde el
   * teclado— el clic sí abre y cierra, que es la única forma de operarlo.
   */
  const handleTriggerClick = () => {
    const hoverOpened = open && window.matchMedia?.("(hover: hover)").matches;
    if (!hoverOpened) setOpen((value) => !value);
  };

  return (
    <div
      ref={containerRef}
      className="static"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        data-services-dropdown
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={handleTriggerClick}
        className="inline-flex items-center gap-1.5 cursor-pointer text-xs tracking-[0.15em] uppercase font-medium text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded"
      >
        {label}
        <ChevronDown
          size={13}
          className={`transition-transform duration-300 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* El panel se mantiene en el DOM y solo se oculta: así los enlaces a las
          tres categorías siguen siendo rastreables sin abrir nada.

          El contenedor va de borde a borde de la fila del encabezado y la
          tarjeta se centra dentro: así el panel no depende de dónde caiga el
          ítem "Servicios" y nunca se sale de la ventana. De paso cubre el
          trayecto del puntero entre el disparador y la tarjeta, que con un
          panel centrado queda lejos del ítem. */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 right-0 top-full pt-4 flex justify-center"
      >
        <div className="w-max max-w-[min(56rem,calc(100vw-3rem))] rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)] p-6 grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
          {groups.map((group) => (
            <div key={group.key} className="min-w-44">
              <Link to={group.routeKey} onClick={() => { close(); onNavigate?.(group); }} className={groupLinkClass}>
                {group.label}
              </Link>
              <div className="w-8 h-0.5 bg-blue-500 mt-2 mb-3" />
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className={itemClass}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-full pt-1 border-t border-slate-200 dark:border-zinc-800">
            <Link
              to={ROUTE_KEYS.SERVICES}
              onClick={close}
              className="inline-block pt-3 text-xs tracking-[0.12em] uppercase text-blue-600 dark:text-blue-400 hover:underline"
            >
              {indexLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Acordeón de móvil.
 *
 * No intenta reproducir el desplegable: en una pantalla estrecha un panel
 * flotante de tres columnas no se puede usar. Aquí la categoría es un enlace y
 * el disparador del acordeón es un botón aparte, para que tocar el nombre lleve
 * a la página en vez de obligar a abrir la lista primero.
 */
export function ServicesAccordion({ groups, label, indexLabel, onNavigate }) {
  const [openGroup, setOpenGroup] = useState(null);

  return (
    <div>
      <p className="px-1 pb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-gray-600">
        {label}
      </p>

      <div className="space-y-1">
        {groups.map((group) => {
          const isOpen = openGroup === group.key;
          const panelId = `services-accordion-${group.key}`;

          return (
            <div
              key={group.key}
              className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-black/30 overflow-hidden"
            >
              <div className="flex items-stretch">
                <Link
                  to={group.routeKey}
                  onClick={() => onNavigate?.(group)}
                  className="flex-1 px-4 py-3 text-xs uppercase tracking-[0.12em] font-semibold text-slate-800 dark:text-white"
                >
                  {group.label}
                </Link>

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={group.label}
                  onClick={() => setOpenGroup(isOpen ? null : group.key)}
                  className="px-4 border-l border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/40"
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 motion-reduce:transition-none ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div
                id={panelId}
                className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="px-4 pb-3 space-y-1">
                    {group.items.map((item) => (
                      <li key={item} className="text-xs text-slate-600 dark:text-gray-400">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        to={ROUTE_KEYS.SERVICES}
        onClick={() => onNavigate?.(null)}
        className="inline-block mt-2 px-1 text-[11px] uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400"
      >
        {indexLabel}
      </Link>
    </div>
  );
}
