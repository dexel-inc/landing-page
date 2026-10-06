import React from "react";
import Button from "../components/ui/Button.jsx";
import { INTENT, trackWhatsAppContact, whatsappUrl } from "../contact/whatsapp.js";

/**
 * "Advertising images and videos" block of the services page: three
 * per-piece packages and a single WhatsApp button.
 *
 * Cards reuse the surface of `CategoryCard`; the chips are the only new style.
 * The button is a real link with its own pre-written message, the same in
 * both languages, and sends the same conversion event as every other
 * WhatsApp CTA through `trackWhatsAppContact`.
 */

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

function Portfolio({ copy, cases }) {
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
        {cases.map((item) => (
          <div key={item.id} className="grid grid-cols-2 gap-3">
            <PortfolioImage image={item.before} label={copy.beforeLabel} />
            <PortfolioImage image={item.after} label={copy.afterLabel} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VisualContent({ copy, includesLabel }) {
  return (
    <section
      id="imagenes-videos"
      aria-labelledby="imagenes-videos-titulo"
      className="relative z-10 px-4 md:px-6 pt-16 md:pt-24"
    >
      <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs tracking-[0.18em] uppercase mb-6">
          {copy.badge}
        </span>
        <h2
          id="imagenes-videos-titulo"
          className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight text-slate-900 dark:text-white"
        >
          {copy.title}
        </h2>
        <p className="text-base md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
          <span className="font-semibold text-slate-900 dark:text-white">{copy.promiseLead}</span>{" "}
          {copy.promiseRest}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {copy.packages.map((pkg) => {
          const headingId = `imagenes-videos-${pkg.id}`;
          return (
            <article
              key={pkg.id}
              aria-labelledby={headingId}
              className="group relative flex flex-col rounded-3xl border border-slate-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm hover:border-blue-500/30 transition-colors duration-500 overflow-hidden p-5 md:p-7"
            >
              <h3
                id={headingId}
                className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-1.5"
              >
                {pkg.name}
              </h3>
              <p className="flex flex-wrap items-baseline gap-x-2 mb-4">
                <span className="text-base font-bold text-blue-600 dark:text-blue-400">{pkg.price}</span>
                {pkg.unit && <span className="text-sm text-slate-500 dark:text-gray-500">{pkg.unit}</span>}
              </p>

              {pkg.chips.length > 0 && (
                <ul className="flex flex-wrap gap-2 mb-4">
                  {pkg.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black/40 px-3 py-1 text-xs text-slate-600 dark:text-gray-300"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              )}

              <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed mb-5">
                {pkg.description}
              </p>

              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-500 dark:text-blue-400 mb-3">
                {includesLabel}
              </p>
              <ul className="space-y-1.5">
                {copy.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-400 leading-relaxed"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      {portfolio.length > 0 && <Portfolio copy={copy.portfolio} cases={portfolio} />}

      <div className="max-w-6xl mx-auto mt-10 md:mt-12 flex justify-center">
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
          className="w-full sm:w-auto min-h-12 focus-visible:ring-[3px] focus-visible:ring-[#50A2FF]!"
        >
          <WhatsAppIcon />
          {copy.cta}
        </Button>
      </div>
    </section>
  );
}
