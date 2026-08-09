import { SITE } from "../config/site.js";

/**
 * Contenido legal y páginas de servicio (privacidad, 404, banner de cookies).
 *
 * Vive aparte del copy comercial porque cambia por motivos distintos: el resto
 * del sitio se itera por conversión, esto se toca cuando cambia la ley o
 * cambian las herramientas que recogen datos.
 *
 * ⚠️ Esta política declara con precisión lo que el sitio hace hoy: Meta Pixel,
 * Conversions API y Google Analytics 4, sin coincidencia avanzada automática.
 * No es asesoría legal. Antes de atender clientes en la Unión Europea o
 * California conviene que un abogado la revise, porque el RGPD y la CCPA
 * imponen obligaciones que la Ley 1581 de 2012 no cubre.
 */

// ⚠️ Canal de contacto para derechos de habeas data. Hoy apunta al WhatsApp
// que ya está publicado en el sitio, que es el único canal verificable. Si la
// empresa tiene un correo institucional, reemplácelo aquí: un correo que no
// existe en una política de datos es peor que no poner ninguno.
const CONTACT_CHANNEL_ES = `WhatsApp +${SITE.whatsapp}`;
const CONTACT_CHANNEL_EN = `WhatsApp +${SITE.whatsapp}`;

const es = {
  badge: "Legal",
  title: "Política de tratamiento de datos personales",
  updatedLabel: "Última actualización",
  updated: "9 de agosto de 2026",
  intro: `Dexel Digital Excellence, sociedad domiciliada en Colombia, es responsable del tratamiento de los datos personales que se recogen a través de ${SITE.url}. Esta política explica qué datos recogemos, para qué los usamos, con quién los compartimos y cómo puede ejercer sus derechos. Se rige por la Ley 1581 de 2012 y el Decreto 1074 de 2015.`,
  sections: [
    {
      title: "Qué datos recogemos",
      paragraphs: [
        "Datos que usted nos entrega voluntariamente: el nombre o empresa, la descripción del proceso que quiere resolver y los datos de contacto que escriba en el asistente conversacional o que nos envíe por WhatsApp.",
        "Datos de navegación que se recogen automáticamente si usted acepta las cookies analíticas y publicitarias: dirección IP, tipo de navegador y dispositivo, idioma, páginas visitadas, tiempo de permanencia, origen de la visita e interacciones con botones y formularios.",
      ],
      list: null,
    },
    {
      title: "Herramientas de terceros que usamos",
      paragraphs: [
        "Si usted acepta las cookies, activamos estas herramientas. Cada una recibe datos de navegación y los trata bajo sus propias políticas:",
      ],
      list: [
        "Meta Pixel y API de conversiones (Meta Platforms, Inc., Estados Unidos): mide qué anuncios generan solicitudes de auditoría o cotización. La coincidencia avanzada automática está desactivada, así que no le enviamos correos ni teléfonos. La API de conversiones envía el mismo evento desde nuestro servidor, con la dirección IP y el identificador de la cookie del pixel.",
        "Google Analytics 4 (Google LLC, Estados Unidos): mide tráfico y comportamiento agregado del sitio.",
        "Vercel Inc. (Estados Unidos): aloja el sitio y registra las peticiones al servidor, incluida la dirección IP, por seguridad y diagnóstico.",
        "WhatsApp (Meta Platforms, Inc.): si usted decide continuar la conversación por WhatsApp, ese intercambio se rige además por las condiciones de WhatsApp.",
      ],
    },
    {
      title: "Transferencia internacional",
      paragraphs: [
        "Los proveedores mencionados están ubicados en Estados Unidos, de modo que sus datos se transfieren fuera de Colombia. Al aceptar las cookies analíticas y publicitarias, o al enviarnos sus datos de contacto, usted autoriza esa transferencia en los términos del artículo 26 de la Ley 1581 de 2012.",
      ],
      list: null,
    },
    {
      title: "Para qué usamos los datos",
      paragraphs: null,
      list: [
        "Responder su solicitud y preparar una cotización o una auditoría de procesos.",
        "Contactarlo por los medios que usted nos indique.",
        "Medir qué canales y anuncios traen solicitudes reales, y optimizar la inversión publicitaria.",
        "Entender cómo se usa el sitio para mejorarlo.",
      ],
    },
    {
      title: "Cuánto tiempo los conservamos",
      paragraphs: [
        "Los datos de contacto comerciales se conservan mientras exista una relación comercial o una negociación en curso, y hasta cinco años después del último contacto para atender obligaciones legales y contables. Los datos de navegación de Meta y Google se conservan según los plazos de cada plataforma: hasta 14 meses en Google Analytics 4 y hasta 90 días para los datos de eventos de Meta. Si usted solicita la supresión, la atendemos antes de esos plazos.",
      ],
      list: null,
    },
    {
      title: "Sus derechos",
      paragraphs: [
        "Usted puede conocer, actualizar y rectificar sus datos; solicitar prueba de la autorización otorgada; ser informado sobre el uso que les hemos dado; revocar la autorización o solicitar la supresión cuando no exista un deber legal o contractual que lo impida; y presentar quejas ante la Superintendencia de Industria y Comercio.",
        `Para ejercerlos, escríbanos por ${CONTACT_CHANNEL_ES} indicando su solicitud y un dato que permita identificarlo. Respondemos las consultas en un máximo de diez días hábiles y los reclamos en quince días hábiles, según los artículos 14 y 15 de la Ley 1581 de 2012.`,
      ],
      list: null,
    },
    {
      title: "Cookies y cómo retirar el consentimiento",
      paragraphs: [
        "Las cookies estrictamente necesarias para que el sitio funcione —como la que recuerda su idioma, su tema visual y su decisión sobre las cookies— se usan siempre y no requieren autorización.",
        "Las cookies analíticas y publicitarias solo se activan si usted las acepta en el banner. Puede cambiar esa decisión en cualquier momento con el botón que aparece más abajo, o borrando los datos del sitio desde su navegador.",
      ],
      list: null,
    },
    {
      title: "Seguridad y cambios",
      paragraphs: [
        "Aplicamos medidas técnicas y administrativas razonables para proteger los datos contra pérdida, uso indebido o acceso no autorizado. El sitio se sirve cifrado por HTTPS.",
        "Si esta política cambia, publicaremos la nueva versión en esta misma dirección con su fecha de actualización.",
      ],
      list: null,
    },
  ],
  responsibleTitle: "Responsable del tratamiento",
  responsible: [
    "Dexel Digital Excellence",
    "Colombia",
    `Contacto: ${CONTACT_CHANNEL_ES}`,
    `Sitio: ${SITE.url}`,
  ],
  consentTitle: "Su decisión sobre las cookies",
  consentStateLabel: "Estado actual",
  consentStates: {
    granted: "Aceptadas: las cookies analíticas y publicitarias están activas.",
    denied: "Rechazadas: no se envía ningún dato a Meta ni a Google.",
    unset: "Sin decidir: no se envía ningún dato hasta que usted acepte.",
  },
  consentAccept: "Aceptar cookies",
  consentReject: "Rechazar cookies",
  backLabel: "Volver al inicio",
};

const en = {
  badge: "Legal",
  title: "Personal data protection policy",
  updatedLabel: "Last updated",
  updated: "August 9, 2026",
  intro: `Dexel Digital Excellence, a company domiciled in Colombia, is the controller of the personal data collected through ${SITE.url}. This policy explains what data we collect, what we use it for, who we share it with, and how you can exercise your rights. It is governed by Colombian Law 1581 of 2012 and Decree 1074 of 2015.`,
  sections: [
    {
      title: "What data we collect",
      paragraphs: [
        "Data you give us voluntarily: your name or company, a description of the process you want to solve, and the contact details you type into the conversational assistant or send us over WhatsApp.",
        "Browsing data collected automatically if you accept analytics and advertising cookies: IP address, browser and device type, language, pages visited, time on page, traffic source, and interactions with buttons and forms.",
      ],
      list: null,
    },
    {
      title: "Third-party tools we use",
      paragraphs: [
        "If you accept cookies, we activate these tools. Each one receives browsing data and processes it under its own policy:",
      ],
      list: [
        "Meta Pixel and Conversions API (Meta Platforms, Inc., United States): measures which ads generate audit or quote requests. Automatic advanced matching is disabled, so we do not send email addresses or phone numbers. The Conversions API sends the same event from our server, including the IP address and the pixel cookie identifier.",
        "Google Analytics 4 (Google LLC, United States): measures aggregate site traffic and behavior.",
        "Vercel Inc. (United States): hosts the site and logs server requests, including the IP address, for security and diagnostics.",
        "WhatsApp (Meta Platforms, Inc.): if you choose to continue the conversation on WhatsApp, that exchange is also governed by WhatsApp's terms.",
      ],
    },
    {
      title: "International transfer",
      paragraphs: [
        "The providers listed above are located in the United States, so your data is transferred outside Colombia. By accepting analytics and advertising cookies, or by sending us your contact details, you authorize that transfer under article 26 of Law 1581 of 2012.",
      ],
      list: null,
    },
    {
      title: "What we use the data for",
      paragraphs: null,
      list: [
        "Responding to your request and preparing a quote or a process audit.",
        "Contacting you through the channels you tell us to use.",
        "Measuring which channels and ads bring real requests, and optimizing ad spend.",
        "Understanding how the site is used so we can improve it.",
      ],
    },
    {
      title: "How long we keep it",
      paragraphs: [
        "Commercial contact data is kept while a commercial relationship or an active negotiation exists, and for up to five years after the last contact to meet legal and accounting obligations. Browsing data held by Meta and Google follows each platform's retention: up to 14 months in Google Analytics 4 and up to 90 days for Meta event data. If you request deletion, we honor it before those periods end.",
      ],
      list: null,
    },
    {
      title: "Your rights",
      paragraphs: [
        "You may access, update, and correct your data; request proof of the authorization you granted; be informed of how we have used it; revoke your authorization or request deletion where no legal or contractual duty prevents it; and file complaints with Colombia's Superintendence of Industry and Commerce.",
        `To exercise them, write to us on ${CONTACT_CHANNEL_EN} with your request and something that identifies you. We answer inquiries within ten business days and complaints within fifteen business days, per articles 14 and 15 of Law 1581 of 2012.`,
      ],
      list: null,
    },
    {
      title: "Cookies and withdrawing consent",
      paragraphs: [
        "Cookies strictly necessary for the site to work — the ones remembering your language, your visual theme, and your cookie decision — are always used and require no authorization.",
        "Analytics and advertising cookies are activated only if you accept them in the banner. You can change that decision at any time with the button below, or by clearing this site's data in your browser.",
      ],
      list: null,
    },
    {
      title: "Security and changes",
      paragraphs: [
        "We apply reasonable technical and administrative measures to protect data against loss, misuse, or unauthorized access. The site is served encrypted over HTTPS.",
        "If this policy changes, we will publish the new version at this same address with its update date.",
      ],
      list: null,
    },
  ],
  responsibleTitle: "Data controller",
  responsible: [
    "Dexel Digital Excellence",
    "Colombia",
    `Contact: ${CONTACT_CHANNEL_EN}`,
    `Site: ${SITE.url}`,
  ],
  consentTitle: "Your cookie decision",
  consentStateLabel: "Current status",
  consentStates: {
    granted: "Accepted: analytics and advertising cookies are active.",
    denied: "Rejected: no data is sent to Meta or Google.",
    unset: "Not decided: nothing is sent until you accept.",
  },
  consentAccept: "Accept cookies",
  consentReject: "Reject cookies",
  backLabel: "Back to home",
};

export const privacyCopy = { es, en };

export const notFoundCopy = {
  es: {
    code: "404",
    title: "Esta página no existe",
    text: "El enlace que siguió está roto o la página se movió. Estos son los caminos que sí funcionan.",
    home: "Ir al inicio",
    services: "Ver los servicios",
    audit: "Auditoría de procesos",
  },
  en: {
    code: "404",
    title: "This page doesn't exist",
    text: "The link you followed is broken or the page moved. Here's where you can actually go.",
    home: "Go to home",
    services: "See the services",
    audit: "Process audit",
  },
};

export const consentCopy = {
  es: {
    title: "Cookies",
    text: "Usamos cookies analíticas y publicitarias para saber qué anuncios traen solicitudes reales. Sin su autorización no enviamos nada a Meta ni a Google.",
    accept: "Aceptar",
    reject: "Rechazar",
    policy: "Ver la política",
    ariaLabel: "Aviso de cookies",
  },
  en: {
    title: "Cookies",
    text: "We use analytics and advertising cookies to know which ads bring real requests. Without your authorization we send nothing to Meta or Google.",
    accept: "Accept",
    reject: "Reject",
    policy: "Read the policy",
    ariaLabel: "Cookie notice",
  },
};
