import { formatPrice } from "../config/pricing.js";
import { ROUTE_KEYS } from "../router/routes.js";

/**
 * Las tres categorías de servicio, cada una con su propia página.
 *
 * Antes esto era una sola página con anclas. La estructura de cada categoría es
 * idéntica —encabezado, frentes, qué incluye, cómo trabajamos, preguntas, CTA—
 * y solo cambia el contenido: es lo que permite que `CategoryPage` sea una
 * plantilla y no tres páginas que se van desincronizando.
 *
 * `navLabel` y `navItems` alimentan el desplegable del menú. Los subservicios
 * del menú son los mismos frentes de la página, escritos corto: si aquí se
 * agrega un frente, el menú lo muestra sin tocar nada más.
 *
 * Ninguna cifra se escribe a mano: todas salen de `config/pricing.js`.
 */

const es = {
  webDev: {
    key: "webDev",
    routeKey: ROUTE_KEYS.WEB_DEV,
    navLabel: "Desarrollo web",
    badge: "Desarrollo web",
    title: "Software que su operación sí usa.",
    subtitle:
      "Sitios, aplicaciones y paneles construidos alrededor de cómo trabaja su empresa.",
    priceLabel: "Precio de entrada",
    price: formatPrice("webPresence", "es", { from: true }),
    priceNote: `Aplicaciones ${formatPrice("customSoftware", "es", { from: true }).toLowerCase()}`,
    deliveryLabel: "Entrega",
    delivery: "5 días a 8 semanas",

    frontsTitle: "Frentes de trabajo",
    frontsIntro: "Seis frentes. Se contrata el que resuelve su problema, no el paquete completo.",
    fronts: [
      {
        iconName: "Globe",
        name: "Sitios web",
        text: "Presencia profesional, en dos niveles según lo que necesite resolver.",
      },
      {
        iconName: "Cpu",
        name: "Aplicaciones web a la medida",
        text: "Cuando ninguna herramienta del mercado se ajusta a su operación.",
      },
      {
        iconName: "LayoutDashboard",
        name: "Paneles de administración",
        text: "Para que su equipo gestione la operación sin depender de nosotros.",
      },
      {
        iconName: "Plug",
        name: "Integraciones y APIs",
        text: "Conectar lo que ya tiene con lo que va a construir.",
      },
      {
        iconName: "CreditCard",
        name: "Pasarelas de pago",
        text: "Cobrar en línea, con las pasarelas que se usan en Colombia y la región.",
      },
      {
        iconName: "Wrench",
        name: "Mantenimiento",
        text: "Actualizaciones, respaldos y corrección de errores.",
        meta: formatPrice("maintenance", "es", { from: true, perMonth: true }),
      },
    ],

    tiersTitle: "Los dos niveles de presencia web",
    tiersIntro: "La misma decisión de siempre: una página que convierta, o un sitio que su equipo administre.",

    includesTitle: "Qué incluye",
    includesIntro: "El alcance completo, antes de que firme.",
    includes: [
      "Sitio o aplicación publicada y funcionando en su dominio",
      "Diseño responsivo: se usa igual desde un celular que desde un escritorio",
      "Panel para administrar el contenido o la operación usted mismo",
      "Base de datos diseñada para su flujo real, no para un caso genérico",
      "API propia para conectar con los sistemas que ya usa",
      "Control de usuarios y permisos por rol",
      "SEO y analítica configuradas desde el primer día",
      "Formulario de contacto conectado a WhatsApp",
      "Hosting y dominio por 1 año",
      "El repositorio a nombre de su empresa, desde el primer commit",
    ],

    processTitle: "Cómo trabajamos",
    processIntro: "Seis fases. Usted ve una demo funcionando cada viernes, no un informe de avance.",

    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de arrancar un desarrollo",
    faqs: [
      {
        question: "¿Cuánto se demora un sitio y cuánto una aplicación?",
        answer:
          "Un sitio de una página, entre 5 y 7 días hábiles. Un sitio completo administrable, de 2 a 4 semanas. Una aplicación a la medida, de 4 a 8 semanas según el alcance que quede cerrado en la propuesta.",
      },
      {
        question: "¿Voy a poder actualizar el contenido sin llamarlos?",
        answer:
          "Sí. El nivel de sitio completo y todas las aplicaciones incluyen panel de administración, y la entrega incluye capacitación a su equipo y documentación en lenguaje claro. Depender del proveedor para cambiar un texto no es un modelo de negocio que nos interese.",
      },
      {
        question: "¿De quién queda el código?",
        answer:
          "Suyo, desde el primer commit. El repositorio queda a nombre de su empresa, no de Dexel. Si mañana decide trabajar con otro proveedor, se lleva todo sin pedirnos permiso.",
      },
      {
        question: "¿Pueden conectar el sitio con los sistemas que ya uso?",
        answer:
          "Es justamente el frente de integraciones y APIs. Conectamos el desarrollo nuevo con su facturación, su CRM, su inventario o lo que ya esté corriendo, para que nadie tenga que copiar datos de un lado a otro.",
      },
      {
        question: "¿Qué pasa después de que el proyecto sale a producción?",
        answer: `El mantenimiento es opcional y mensual, sin permanencia, ${formatPrice(
          "maintenance",
          "es",
          { from: true, perMonth: true },
        )}. Incluye actualizaciones de seguridad, corrección de errores, respaldos automáticos y monitoreo. Si prefiere manejarlo con su propio equipo, la documentación se lo permite.`,
      },
      {
        question: "¿Y si a mitad del proyecto cambia lo que necesito?",
        answer:
          "El precio se cierra antes de escribir la primera línea de código. Si aparece algo nuevo, lo cotizamos aparte y usted decide si entra ahora o después. Nunca le llega una factura con sorpresas.",
      },
    ],

    ctaTitle: "¿Tiene claro qué necesita construir?",
    ctaText: "Cuéntenos qué proceso quiere resolver y le decimos qué se puede construir y en cuánto tiempo.",
    cta: "Solicitar cotización",
  },

  automation: {
    key: "automation",
    routeKey: ROUTE_KEYS.AUTOMATION,
    navLabel: "Automatización",
    badge: "Automatización",
    title: "Las horas que su equipo gasta en tareas repetitivas.",
    subtitle:
      "Automatizamos los procesos manuales que consumen su día e integramos los sistemas que ya tiene.",
    priceLabel: "Precio de entrada",
    price: formatPrice("automation", "es", { from: true }),
    priceNote: null,
    deliveryLabel: "Entrega",
    delivery: "2 a 6 semanas",

    frontsTitle: "Frentes de trabajo",
    frontsIntro: "Siete frentes. Se empieza por el proceso que más horas está consumiendo.",
    fronts: [
      {
        iconName: "Workflow",
        name: "Workflows con n8n",
        text: "Automatización alojada en su propia infraestructura, sin costos por operación que crecen con el volumen.",
      },
      {
        iconName: "MessageSquareCode",
        name: "Chatbot de WhatsApp con IA",
        text: "Responde, califica y deriva a una persona cuando hace falta.",
      },
      {
        iconName: "MessageSquare",
        name: "Chatbot de WhatsApp sin IA",
        text: "Flujos de respuesta con reglas fijas, para procesos que no necesitan un modelo de lenguaje. Más barato, más predecible.",
      },
      {
        iconName: "Bot",
        name: "Agentes conversacionales",
        text: "Agendan, cotizan y hacen seguimiento dentro del flujo de su operación.",
      },
      {
        iconName: "Plug",
        name: "Integración entre sistemas",
        text: "Que sus herramientas dejen de necesitar que alguien copie datos entre ellas.",
      },
      {
        iconName: "LineChart",
        name: "Reportes automáticos",
        text: "Los informes que hoy alguien arma a mano cada semana.",
      },
      {
        iconName: "FileScan",
        name: "Lectura automática de documentos",
        text: "Extraer datos de facturas, PDFs e imágenes sin digitación manual.",
      },
    ],

    /**
     * El chatbot sin IA es el diferenciador y va explicado, no escondido: la
     * mayoría de proveedores vende IA para todo, y decir de frente cuándo un
     * flujo con reglas es la mejor opción es lo que genera confianza.
     */
    noteTitle: "No todo necesita inteligencia artificial",
    noteText:
      "La mayoría de proveedores vende IA para todo. Hay procesos donde un flujo con reglas fijas es mejor: cuesta menos, responde siempre igual y no alucina. Si su caso es uno de esos, se lo decimos y lo construimos así. La IA entra donde aporta —conversaciones abiertas, clasificación, documentos sin formato— y no donde solo encarece.",

    includesTitle: "Qué incluye",
    includesIntro: "El alcance completo, antes de que firme.",
    includes: [
      "Mapa del proceso actual, con el punto exacto donde se pierden las horas",
      "Automatización construida y corriendo en su propia infraestructura",
      "Integración con los sistemas que ya paga, sin migrar nada",
      "Manejo de errores y reintentos: si una integración falla, alguien se entera",
      "Tablero de monitoreo para ver qué corrió, cuándo y con qué resultado",
      "Capacitación a su equipo y documentación en lenguaje claro",
      "Medición de horas recuperadas al mes, contra la línea base inicial",
      "El repositorio y los flujos a nombre de su empresa",
    ],

    processTitle: "Cómo trabajamos",
    processIntro: "Seis fases. Usted ve una demo funcionando cada viernes, no un informe de avance.",

    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de automatizar",
    faqs: [
      {
        question: "¿Por qué n8n y no una herramienta por suscripción?",
        answer:
          "Porque queda alojado en su propia infraestructura. Las plataformas por suscripción cobran por operación ejecutada: la automatización que hoy le sale barata se vuelve cara justo cuando empieza a funcionar y el volumen sube. Con n8n el costo no crece con el uso.",
      },
      {
        question: "¿Cuándo conviene un chatbot sin IA?",
        answer:
          "Cuando el proceso tiene respuestas conocidas: horarios, estados de pedido, agendamiento, preguntas frecuentes. Un flujo con reglas cuesta menos, responde siempre igual y no inventa. La IA vale la pena cuando la conversación es abierta o hay que interpretar texto libre.",
      },
      {
        question: "¿Tengo que cambiar los sistemas que ya uso?",
        answer:
          "No. El frente de integración existe precisamente para eso: conectamos lo que ya tiene. Migrar sistemas es un proyecto aparte y solo lo recomendamos cuando la herramienta actual es el problema, no el síntoma.",
      },
      {
        question: "¿Qué pasa si una automatización falla en producción?",
        answer:
          "Todo flujo se entrega con manejo de errores, reintentos y alertas: si algo falla, alguien de su equipo se entera el mismo día y queda registrado qué corrió y qué no. Un proceso automático que falla en silencio es peor que no tenerlo.",
      },
      {
        question: "¿Cómo sé cuántas horas recuperé de verdad?",
        answer:
          "Porque medimos la línea base antes de automatizar y la comparamos después. Si no sabemos cuántas horas consume hoy el proceso, no hay forma honesta de decirle cuántas le devolvimos.",
      },
      {
        question: "¿Necesito la auditoría antes de automatizar?",
        answer: `No es obligatoria. Si ya tiene identificado el proceso que le duele, se cotiza directo. La auditoría (${formatPrice(
          "audit",
          "es",
        )}) tiene sentido cuando hay varios procesos en paralelo y no está seguro de cuál automatizar primero; además se descuenta completa del proyecto.`,
      },
    ],

    ctaTitle: "¿Sabe qué proceso le está consumiendo más horas?",
    ctaText: "Cuéntenoslo y le decimos si se puede automatizar, cuánto costaría y cuántas horas al mes recuperaría.",
    cta: "Solicitar cotización",
    secondaryCta: "Agendar llamada de discovery sin costo",
  },
};

const en = {
  webDev: {
    key: "webDev",
    routeKey: ROUTE_KEYS.WEB_DEV,
    navLabel: "Web development",
    badge: "Web development",
    title: "Software your operation actually uses.",
    subtitle: "Sites, applications, and admin panels built around how your company works.",
    priceLabel: "Starting price",
    price: formatPrice("webPresence", "en", { from: true }),
    priceNote: `Applications ${formatPrice("customSoftware", "en", { from: true }).toLowerCase()}`,
    deliveryLabel: "Delivery",
    delivery: "5 days to 8 weeks",

    frontsTitle: "What we build",
    frontsIntro: "Six fronts. You hire the one that solves your problem, not the whole package.",
    fronts: [
      {
        iconName: "Globe",
        name: "Websites and landing pages",
        text: "A professional presence, in two tiers depending on what you need to solve.",
      },
      {
        iconName: "Cpu",
        name: "Custom web applications",
        text: "For when no off-the-shelf tool fits how you actually work.",
      },
      {
        iconName: "LayoutDashboard",
        name: "Admin panels",
        text: "So your team runs the operation without depending on us.",
      },
      {
        iconName: "Plug",
        name: "Integrations and APIs",
        text: "Connecting what you already have to what you're about to build.",
      },
      {
        iconName: "CreditCard",
        name: "Payment gateways",
        text: "Charging online, with the gateways actually used in Colombia and the region.",
      },
      {
        iconName: "Wrench",
        name: "Maintenance",
        text: "Updates, backups, and bug fixes.",
        meta: formatPrice("maintenance", "en", { from: true, perMonth: true }),
      },
    ],

    tiersTitle: "The two web presence tiers",
    tiersIntro: "The same decision as always: one page that converts, or a site your team manages.",

    includesTitle: "What's included",
    includesIntro: "The full scope, before you sign.",
    includes: [
      "Site or application published and running on your domain",
      "Responsive design: it works the same on a phone and on a desktop",
      "A panel to manage the content or the operation yourself",
      "A database designed for how you actually work, not for a generic case",
      "Your own API to connect with the systems you already use",
      "User and role-based permission control",
      "SEO and analytics configured from day one",
      "Contact form connected to WhatsApp",
      "Hosting and domain for 1 year",
      "The repository in your company's name, from the first commit",
    ],

    processTitle: "How we work",
    processIntro: "Six phases. You see a working demo every Friday, not a status report.",

    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before starting a build",
    faqs: [
      {
        question: "How long does a site take, and how long an application?",
        answer:
          "A single-page site, 5 to 7 business days. A full manageable site, 2 to 4 weeks. A custom application, 4 to 8 weeks depending on the scope closed in the proposal.",
      },
      {
        question: "Will I be able to update the content without calling you?",
        answer:
          "Yes. The full-site tier and every application include an admin panel, and delivery includes training for your team plus documentation in plain language. Depending on your vendor to change a paragraph isn't a business model we're interested in.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do, from the first commit. The repository is in your company's name, not Dexel's. If you decide to work with another vendor tomorrow, you take everything without asking us.",
      },
      {
        question: "Can you connect the site to the systems I already use?",
        answer:
          "That's exactly what the integrations and APIs front is for. We connect the new build to your billing, your CRM, your inventory, or whatever is already running, so nobody has to copy data between them.",
      },
      {
        question: "What happens once the project is in production?",
        answer: `Maintenance is optional and monthly, with no lock-in, ${formatPrice(
          "maintenance",
          "en",
          { from: true, perMonth: true },
        )}. It covers security updates, bug fixes, automated backups, and monitoring. If you'd rather handle it with your own team, the documentation lets you.`,
      },
      {
        question: "What if what I need changes mid-project?",
        answer:
          "The price is closed before we write the first line of code. If something new comes up, we quote it separately and you decide whether it goes in now or later. You never get an invoice with surprises.",
      },
    ],

    ctaTitle: "Do you know what you need to build?",
    ctaText: "Tell us which process you want to solve and we'll tell you what can be built, and how long it takes.",
    cta: "Request a quote",
  },

  automation: {
    key: "automation",
    routeKey: ROUTE_KEYS.AUTOMATION,
    navLabel: "Automation",
    badge: "Automation",
    title: "The hours your team spends on repetitive work.",
    subtitle:
      "We automate the manual processes that eat your day and integrate the systems you already have.",
    priceLabel: "Starting price",
    price: formatPrice("automation", "en", { from: true }),
    priceNote: null,
    deliveryLabel: "Delivery",
    delivery: "2 to 6 weeks",

    frontsTitle: "What we build",
    frontsIntro: "Seven fronts. You start with the process eating the most hours.",
    fronts: [
      {
        iconName: "Workflow",
        name: "n8n workflows",
        text: "Automation hosted on your own infrastructure, with no per-operation costs that grow with volume.",
      },
      {
        iconName: "MessageSquareCode",
        name: "WhatsApp chatbot with AI",
        text: "It answers, qualifies, and hands off to a person when it needs to.",
      },
      {
        iconName: "MessageSquare",
        name: "WhatsApp chatbot without AI",
        text: "Rule-based reply flows, for processes that don't need a language model. Cheaper, more predictable.",
      },
      {
        iconName: "Bot",
        name: "Conversational agents",
        text: "They book, quote, and follow up inside your actual operation.",
      },
      {
        iconName: "Plug",
        name: "System integration",
        text: "So your tools stop needing someone to copy data between them.",
      },
      {
        iconName: "LineChart",
        name: "Automated reports",
        text: "The reports somebody builds by hand every week today.",
      },
      {
        iconName: "FileScan",
        name: "Automated document reading",
        text: "Pulling data out of invoices, PDFs, and images without retyping any of it.",
      },
    ],

    noteTitle: "Not everything needs artificial intelligence",
    noteText:
      "Most vendors sell AI for everything. There are processes where a fixed-rule flow is simply better: it costs less, it answers the same way every time, and it doesn't hallucinate. If yours is one of those, we'll say so and build it that way. AI goes where it earns its place — open conversations, classification, unstructured documents — and not where it only adds cost.",

    includesTitle: "What's included",
    includesIntro: "The full scope, before you sign.",
    includes: [
      "A map of the current process, pinpointing where the hours are lost",
      "Automation built and running on your own infrastructure",
      "Integration with the systems you already pay for, with nothing to migrate",
      "Error handling and retries: if an integration fails, somebody finds out",
      "A monitoring dashboard showing what ran, when, and with what result",
      "Training for your team and documentation in plain language",
      "Measurement of hours recovered per month, against the original baseline",
      "The repository and the workflows in your company's name",
    ],

    processTitle: "How we work",
    processIntro: "Six phases. You see a working demo every Friday, not a status report.",

    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before automating",
    faqs: [
      {
        question: "Why n8n instead of a subscription tool?",
        answer:
          "Because it runs on your own infrastructure. Subscription platforms charge per operation executed: the automation that looks cheap today gets expensive precisely when it starts working and volume goes up. With n8n the cost doesn't grow with usage.",
      },
      {
        question: "When is a chatbot without AI the right call?",
        answer:
          "When the process has known answers: opening hours, order status, booking, frequently asked questions. A rule-based flow costs less, answers the same way every time, and doesn't make things up. AI earns its place when the conversation is open-ended or there's free text to interpret.",
      },
      {
        question: "Do I have to replace the systems I already use?",
        answer:
          "No. The integration front exists precisely for that: we connect what you already have. Migrating systems is a separate project, and we only recommend it when the current tool is the problem rather than the symptom.",
      },
      {
        question: "What happens if an automation fails in production?",
        answer:
          "Every workflow ships with error handling, retries, and alerts: if something fails, someone on your team finds out the same day, and there's a record of what ran and what didn't. An automated process that fails silently is worse than not having one.",
      },
      {
        question: "How do I know how many hours I actually got back?",
        answer:
          "Because we measure the baseline before automating and compare it afterward. If we don't know how many hours the process consumes today, there's no honest way to tell you how many we gave back.",
      },
      {
        question: "Do I need the audit before automating?",
        answer: `It isn't mandatory. If you've already identified the process that hurts, we quote it directly. The audit (${formatPrice(
          "audit",
          "en",
        )}) makes sense when several processes run in parallel and you're not sure which to automate first — and it's credited back in full toward the project.`,
      },
    ],

    ctaTitle: "Do you know which process is eating the most hours?",
    ctaText: "Tell us, and we'll say whether it can be automated, what it would cost, and how many hours a month you'd get back.",
    cta: "Request a quote",
    secondaryCta: "Book a free discovery call",
  },
};

export const categoriesCopy = { es, en };

/** Etiquetas compartidas por la plantilla de categoría, en los dos idiomas. */
export const categoryChromeCopy = {
  es: {
    menuLabel: "Servicios",
    menuIndex: "Ver todos los servicios",
    backLabel: "Ver todos los servicios",
    quoteCta: "Solicitar cotización",
    discoveryCta: "Agendar llamada de discovery sin costo",
  },
  en: {
    menuLabel: "Services",
    menuIndex: "See all services",
    backLabel: "See all services",
    quoteCta: "Request a quote",
    discoveryCta: "Book a free discovery call",
  },
};

/**
 * Los tres grupos del menú de servicios, derivados del mismo contenido que
 * renderizan las páginas: un frente nuevo aparece en el desplegable sin tocar
 * el componente. La auditoría entra desde `audit` porque su contenido vive en
 * `services.js` desde antes de que existieran las categorías.
 */
export function serviceMenuGroups(copy) {
  return [
    {
      key: "webDev",
      routeKey: ROUTE_KEYS.WEB_DEV,
      label: copy.categories.webDev.navLabel,
      items: copy.categories.webDev.fronts.map((front) => front.name),
    },
    {
      key: "automation",
      routeKey: ROUTE_KEYS.AUTOMATION,
      label: copy.categories.automation.navLabel,
      items: copy.categories.automation.fronts.map((front) => front.name),
    },
    {
      key: "audit",
      routeKey: ROUTE_KEYS.AUDIT,
      label: copy.audit.navLabel,
      items: copy.audit.deliverables.map((item) => item.title),
    },
  ];
}
