import React from "react";
import Logo from "../icons/logo.jsx";
import Button from "../components/ui/Button.jsx";

export default function Footer({
  whatsappNumber = "573135632235",
  copy,
  onNavigate,
}) {
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(copy.whatsappText)}`;

  return (
    <footer className="text-slate-900 dark:text-white bg-slate-100 dark:bg-[#050505] pt-12 text-center justify-center align-middle flex flex-col relative z-10 w-full px-4">
      <div className="flex mt-8 flex-col justify-between items-center gap-4">
        <div className="w-full text-xl md:text-7xl font-bold">
          <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">{copy.title}</h2>
        </div>
        <div className="w-44 pt-6 md:pt-0">
          <Button
            as="a"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            size="lg"
            className="w-full justify-center"
          >
            {copy.contactButton}
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center">
        <div className="flex my-2 flex-col gap-8 md:flex-row items-center md:px-10 justify-between">
          <div className="md:mr-10 text-xl font-bold tracking-[0.2em] text-slate-500 dark:text-gray-300 flex flex-col align-middle">
            <Logo className="w-30 h-30" viewBox="0 0 324 210" />
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:text-start">
            <a
              href="/servicios"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("/servicios");
              }}
              className="cursor-pointer text-slate-500 dark:text-gray-600 hover:text-slate-900 dark:hover:text-white uppercase"
            >
              {copy.services}
            </a>
            <a
              href="/contacto"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("/contacto");
              }}
              className="cursor-pointer text-slate-500 dark:text-gray-600 hover:text-slate-900 dark:hover:text-white uppercase"
            >
              {copy.contact}
            </a>
          </div>
        </div>
        <hr className="border-slate-300 dark:border-gray-300 opacity-20 dark:opacity-5" />
        <p className="w-full text-center my-12 text-slate-500 dark:text-gray-600">
          &copy; {new Date().getFullYear()} DEXEL DIGITAL EXCELLENCE. {copy.rights}
        </p>
      </div>
      <Button
        as="a"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label={copy.whatsappAria}
        variant="primary"
        size="icon"
        className="fixed bottom-5 right-5 z-50 rounded-full h-14 w-14 md:h-16 md:w-16"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="36" height="36" fill="currentColor">
          <g>
            <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
          </g>
        </svg>
      </Button>
    </footer>
  );
}
