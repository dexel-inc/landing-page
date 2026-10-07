import React, { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useRouter } from "../router/RouterContext.jsx";
import { ROUTE_KEYS } from "../router/routes.js";

/**
 * Services menu: dropdown on desktop, accordion on mobile.
 *
 * The groups come from the same content the pages render, so a new front
 * shows up in the menu without touching this file. Each group's heading is
 * a real link to its category, not a title: someone clicking "Automation"
 * expects to land on automation, not to have a list open.
 */
// `py-2` over 12px text keeps the link at about 44px tall without enlarging
// the type: it's the reasonable minimum for a finger to tap.
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded";
const accent = "text-blue-600 dark:text-blue-400";

const groupLinkClass = `block py-2.5 text-xs tracking-[0.15em] uppercase font-semibold hover:text-blue-600 dark:hover:text-blue-300 focus-visible:text-blue-600 dark:focus-visible:text-blue-300 transition-colors ${focusRing}`;
// The group of the page you're on takes the accent, so the menu shows where you are.
const groupInkClass = (active) => (active ? accent : "text-slate-900 dark:text-white");

const itemClass = "block text-sm text-slate-600 dark:text-gray-400 leading-relaxed";
const itemLinkClass = `block text-sm text-slate-600 dark:text-gray-400 leading-relaxed hover:text-blue-600 dark:hover:text-blue-400 focus-visible:text-blue-600 dark:focus-visible:text-blue-400 transition-colors ${focusRing}`;

/**
 * A submenu item is a real link when its front has its own page
 * (`routeKey`) and plain text when it doesn't. The panel stays `hidden`
 * and crawlable either way. `hash` points to an anchor inside that page.
 */
function MenuItem({ item, onClose, small = false }) {
  const textClass = small ? "text-xs text-slate-600 dark:text-gray-400" : itemClass;
  const linkClass = small
    ? `flex items-center min-h-10 text-xs text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:text-blue-600 dark:focus-visible:text-blue-400 transition-colors ${focusRing}`
    : itemLinkClass;

  if (!item.routeKey) {
    return <li className={textClass}>{item.label}</li>;
  }

  return (
    <li>
      <Link to={item.routeKey} hash={item.hash} onClick={onClose} className={linkClass}>
        {item.label}
      </Link>
    </li>
  );
}

/**
 * Desktop dropdown.
 *
 * Opens on hover and also on click or Enter, because a menu that only
 * responds to the pointer leaves out anyone navigating by keyboard. Closes
 * on Escape —returning focus to the trigger— and when focus leaves the
 * block, which is what happens when tabbing past the last link.
 */
export function ServicesDropdown({ groups, label, indexLabel, onNavigate }) {
  const [open, setOpen] = useState(false);
  // Where the panel's center goes, in px from the left edge of the container.
  const [centerX, setCenterX] = useState(0);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const panelId = useId();
  const { routeKey } = useRouter();

  /**
   * The panel is centered on the viewport, not on the item: four columns at
   * up to 72rem wouldn't fit hanging off the item's left edge at 1366px.
   * It's measured when it opens and when the window is resized.
   */
  const measure = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setCenterX(document.documentElement.clientWidth / 2 - rect.left);
  };

  const show = () => {
    measure();
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    // Touch has no `mouseleave`: a tap outside is what closes it there.
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const onResize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) setCenterX(document.documentElement.clientWidth / 2 - rect.left);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // `focusout` on the container: closes when tabbing out of the menu, but
  // not when focus moves between the links inside it.
  const handleBlur = (event) => {
    if (!containerRef.current?.contains(event.relatedTarget)) setOpen(false);
  };

  const close = () => setOpen(false);

  /**
   * On a pointer-capable device, by the time the click arrives hover has
   * already opened the panel: treating the click as a toggle would close it
   * on the very gesture the visitor used to ask to see it. There the click
   * does nothing and the panel stays open. Where there's no hover —or when
   * it's reached with Enter from the keyboard— the click does open and
   * close it, which is the only way to operate it.
   */
  const handleTriggerClick = () => {
    const hoverOpened = open && window.matchMedia?.("(hover: hover)").matches;
    if (hoverOpened) return;
    if (open) setOpen(false);
    else show();
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={show}
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
        className="inline-flex items-center py-3 gap-1.5 cursor-pointer text-xs tracking-[0.15em] uppercase font-medium text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded"
      >
        {label}
        <ChevronDown
          size={13}
          className={`transition-transform duration-300 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* The panel stays in the DOM and is only hidden: that way the links to
          the three categories remain crawlable without opening anything.

          It hangs off the item —not the header row— and starts flush
          against it: the `pt-4` is part of the panel, so moving the pointer
          down from the trigger to the card never leaves the block.
          Centering it on the viewport left that strip uncovered and the
          menu closed right as you went to pick a service.

          Horizontally it is centered on the viewport (`centerX`, measured
          from the item) and its width is capped at `100vw - 4rem`, so with
          four columns it fits at 1366px and never spills off either edge.
          From `xl` it's four columns in up to 72rem; between `lg` and `xl`
          it's two by two in up to 56rem. */}
      <div
        id={panelId}
        hidden={!open}
        style={{ left: centerX }}
        className="absolute top-full -translate-x-1/2 pt-4 w-[min(56rem,calc(100vw-4rem))] xl:w-[min(72rem,calc(100vw-4rem))]"
      >
        {/* Height cap in case the panel grows taller than the viewport —two
            columns on 768px screens, or a language with long names—:
            instead of spilling off the bottom, it scrolls internally. */}
        <div className="max-h-[calc(100svh-7rem)] overflow-y-auto rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 backdrop-blur-xl shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)] p-6 grid grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-6">
          {groups.map((group) => (
            <div key={group.key} className="min-w-0">
              <Link
                to={group.routeKey}
                aria-current={routeKey === group.routeKey ? "page" : undefined}
                onClick={() => {
                  close();
                  onNavigate?.(group);
                }}
                className={`${groupLinkClass} ${groupInkClass(routeKey === group.routeKey)}`}
              >
                {group.label}
              </Link>
              <div className="w-8 h-0.5 bg-blue-500 mt-2 mb-3" />
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <MenuItem key={item.label} item={item} onClose={close} />
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-full pt-1 border-t border-slate-200 dark:border-zinc-800">
            <Link
              to={ROUTE_KEYS.SERVICES}
              onClick={close}
              className="inline-block pt-3.5 pb-2.5 text-xs tracking-[0.12em] uppercase text-blue-600 dark:text-blue-400 hover:underline"
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
 * Mobile accordion.
 *
 * Doesn't try to reproduce the dropdown: on a narrow screen a floating
 * three-column panel isn't usable. Here the category is a link and the
 * accordion's trigger is a separate button, so tapping the name goes to the
 * page instead of forcing the list open first.
 */
export function ServicesAccordion({ groups, label, indexLabel, onNavigate }) {
  const [openGroup, setOpenGroup] = useState(null);
  const { routeKey } = useRouter();

  return (
    <div>
      <p className="px-1 pb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-gray-600">
        {label}
      </p>

      {/* One column on a phone, two by two from `sm` (640px). `items-start`
          so opening one card doesn't stretch its neighbor in the row. */}
      <div className="grid gap-1 sm:grid-cols-2 sm:gap-2 items-start">
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
                  aria-current={routeKey === group.routeKey ? "page" : undefined}
                  onClick={() => onNavigate?.(group)}
                  className={`flex-1 flex items-center min-h-11 px-4 py-3 text-xs uppercase tracking-[0.12em] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/40 ${
                    routeKey === group.routeKey ? accent : "text-slate-800 dark:text-white"
                  }`}
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

              {/* `inert` while collapsed: the rows are only clipped, so without it
                  Tab would land on links nobody can see. */}
              <div
                id={panelId}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="px-4 pb-3 space-y-1">
                    {group.items.map((item) => (
                      <MenuItem
                        key={item.label}
                        item={item}
                        small
                        onClose={() => onNavigate?.(group)}
                      />
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
        className="inline-block mt-2 px-2 py-3.5 text-[11px] uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400"
      >
        {indexLabel}
      </Link>
    </div>
  );
}
