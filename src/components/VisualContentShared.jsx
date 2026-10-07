import React from "react";
import Button from "./ui/Button.jsx";
import { INTENT, trackWhatsAppContact, whatsappUrl } from "../contact/whatsapp.js";

/**
 * Pieces shared by the "Advertising images and videos" page and by its
 * summary on the services index: the WhatsApp button and the portfolio.
 *
 * The button is a real link with its own pre-written message, the same in
 * both languages, and sends the same conversion event as every other
 * WhatsApp CTA through `trackWhatsAppContact`.
 */

/**
 * Focus of the approved prototype: 3px solid accent outline, 3px away from the
 * element, 8px corners. Only the new images-and-videos elements use it. The
 * `!` makes it win over the ring and `outline-none` that `Button` and the menu
 * bring by default, and `ring-0` keeps the old ring from adding a second one.
 */
export const visualFocusClass =
  "focus-visible:outline-solid! focus-visible:outline-3! focus-visible:outline-offset-3! focus-visible:outline-[#155DFC]! dark:focus-visible:outline-[#51A2FF]! focus-visible:rounded-lg! focus-visible:ring-0!";

const WHATSAPP_TEXT = "Hola, quiero cotizar imágenes y videos para mi marca";
const TRACK_LOCATION = "servicios-imagenes-videos";

/**
 * Before/after cases: `{ id, before: { src, alt }, after: { src, alt } }`.
 * Empty until marketing delivers approved material; while it is, the whole
 * portfolio block —title and container included— is not rendered.
 */
const portfolio = [];

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" />
    </svg>
  );
}

export function VisualWhatsAppButton({ copy, className = "" }) {
  return (
    <Button
      as="a"
      href={whatsappUrl(WHATSAPP_TEXT)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.ctaAria}
      onClick={() =>
        trackWhatsAppContact({ type: INTENT.QUOTE, location: TRACK_LOCATION, service: copy.title })
      }
      variant="primary"
      size="lg"
      className={`w-full sm:w-auto min-h-12 ${visualFocusClass} ${className}`}
    >
      <WhatsAppIcon />
      {copy.cta}
    </Button>
  );
}

/** Image slot with a reserved #18181B box: if the image fails it stays as a labelled square. */
function PortfolioImage({ image, label }) {
  return (
    <figure className="m-0">
      <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#18181B]">
        <img
          src={image.src}
          alt={image.alt}
          width={400}
          height={500}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
        />
      </div>
      <figcaption className="mt-2 text-xs font-mono uppercase tracking-[0.12em] text-slate-500 dark:text-gray-500">
        {label}
      </figcaption>
    </figure>
  );
}

/** Prepared but not shown: it renders nothing while `portfolio` is empty. */
export function VisualPortfolio({ copy }) {
  if (portfolio.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto mt-10 md:mt-14">
      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-500 dark:text-blue-400 mb-3">
        {copy.label}
      </p>
      {copy.title && (
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          {copy.title}
        </h3>
      )}
      <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 mb-6">{copy.subtitle}</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        {portfolio.map((item) => (
          <div key={item.id} className="grid grid-cols-2 gap-3">
            <PortfolioImage image={item.before} label={copy.beforeLabel} />
            <PortfolioImage image={item.after} label={copy.afterLabel} />
          </div>
        ))}
      </div>
    </div>
  );
}
