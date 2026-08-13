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
    frontsIntro: "Siete frentes. Se contrata el que resuelve su problema, no el paquete completo.",
    fronts: [
      {
        iconName: "Globe",
        name: "Sitios web",
        text: "Presencia profesional, en tres niveles según lo que necesite resolver.",
        routeKey: ROUTE_KEYS.WEBSITES,
      },
      {
        iconName: "Cpu",
        name: "Software a la medida",
        text: "Cuando ninguna herramienta del mercado se ajusta a su operación, con panel de administración incluido.",
        routeKey: ROUTE_KEYS.CUSTOM_SOFTWARE,
      },
      {
        iconName: "PartyPopper",
        name: "Micropáginas e invitaciones digitales",
        text: "Invitaciones para bodas, XV años, grados y otros eventos, con cuenta regresiva, galería y confirmación por WhatsApp.",
        routeKey: ROUTE_KEYS.MICROPAGES,
      },
      {
        iconName: "Search",
        name: "SEO y visibilidad",
        text: "Que su sitio aparezca cuando alguien busca lo que usted vende. Estructura técnica, contenido y medición.",
        routeKey: ROUTE_KEYS.SEO,
      },
      {
        iconName: "Plug",
        name: "Integraciones y APIs",
        text: "Conectar lo que ya tiene con lo que va a construir.",
        routeKey: ROUTE_KEYS.INTEGRATIONS,
      },
      {
        iconName: "CreditCard",
        name: "Pasarelas de pago",
        text: "Cobrar en línea, con las pasarelas que se usan en Colombia y la región.",
        routeKey: ROUTE_KEYS.PAYMENT_GATEWAYS,
      },
      {
        iconName: "Wrench",
        name: "Mantenimiento",
        text: "Actualizaciones, respaldos y corrección de errores.",
        meta: formatPrice("careBasic", "es", { from: true, perMonth: true }),
        routeKey: ROUTE_KEYS.MAINTENANCE,
      },
    ],

    /**
     * El frente de SEO se explica como trabajo técnico y no como servicio de
     * marketing: es lo que efectivamente se entrega, y prometer posiciones o
     * plazos de posicionamiento sería prometer algo que no depende de nosotros.
     */
    noteTitle: "SEO técnico, no promesas de posicionamiento",
    noteText:
      "Lo que construimos es la parte que sí depende de nosotros: renderizado del lado del servidor para que el buscador reciba contenido y no una página vacía, metadatos y datos estructurados, velocidad de carga, arquitectura de URLs y medición configurada desde el primer día. No vendemos posiciones ni plazos para llegar a ellas. Este mismo sitio tenía ese problema —entregaba HTML vacío a los rastreadores— y se resolvió con el trabajo que le estamos describiendo.",

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
      "Sesión de capacitación en vivo con las personas que van a usar el sistema, y resolución de dudas en directo",
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
          "Sí. El nivel de sitio completo y todas las aplicaciones incluyen panel de administración, y la entrega incluye capacitación a su equipo y documentación en lenguaje claro. Usted queda con el control de su contenido.",
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
          "careBasic",
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

    /**
     * Los frentes se ordenan por capacidad y no por canal. La lista anterior
     * mezclaba las dos cosas —WhatsApp con IA, WhatsApp sin IA, agente—, y
     * obligaba al visitante a elegir tecnología antes de describir su proceso,
     * que es exactamente al revés de cómo se decide.
     */
    frontsTitle: "Frentes de trabajo",
    frontsIntro: "Seis frentes. Se empieza por el proceso que más horas está consumiendo.",
    fronts: [
      {
        iconName: "MessageSquare",
        name: "Atención automatizada por WhatsApp",
        text: "Responde, califica y deriva a una persona cuando hace falta. Con reglas o con IA, según lo que pida el proceso.",
      },
      {
        iconName: "Bot",
        name: "Agentes a la medida",
        text: "No solo responden: consultan sus sistemas, deciden y ejecutan la acción que cierra el proceso.",
      },
      {
        iconName: "Workflow",
        name: "Workflows con n8n",
        text: "Automatización alojada en su propia infraestructura, sin costos por operación que crecen con el volumen.",
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
     * Que un proceso no necesite IA es el diferenciador y va explicado, no
     * escondido: la mayoría de proveedores vende IA para todo, y decir de
     * frente cuándo un flujo con reglas es la mejor opción genera confianza.
     */
    noteTitle: "Usamos IA donde aporta",
    noteText:
      "Hay procesos donde un flujo con reglas fijas es mejor: cuesta menos, responde siempre igual y no alucina. Si su caso es uno de esos, se lo decimos y lo construimos así. La IA entra donde aporta —conversaciones abiertas, clasificación, documentos sin formato— y no donde solo encarece.",

    /**
     * Tres packs con alcance en unidades contables —procesos, integraciones,
     * semanas, días de soporte—. "Desde $X" no dice qué recibe nadie por ese
     * dinero, y lo que no se puede comparar no se compra sin escribir un correo.
     */
    packs: {
      title: "Tres formas de empezar",
      intro: "Alcance definido y precio cerrado. Se elige por tamaño del problema, no por tecnología.",
      featuredLabel: "El más elegido",
      cta: "Solicitar este pack",
      discoveryNote:
        "Si no está seguro de cuál elegir, agende una llamada de 30 minutos sin costo y se lo decimos ahí mismo.",
      items: [
        {
          key: "puntual",
          name: "Automatización puntual",
          priceKey: "automation",
          items: [
            "1 proceso automatizado de principio a fin",
            "1 a 2 integraciones con sistemas existentes",
            "Entrega en 2 a 3 semanas",
            "30 días de soporte",
            "Capacitación en vivo para su equipo",
            "50% al iniciar, 50% contra entrega",
          ],
        },
        {
          key: "agente",
          name: "Agente a la medida",
          priceKey: "automationAgent",
          featured: true,
          items: [
            "Todo lo del pack anterior, más:",
            "1 agente que ejecuta acciones en sus sistemas, no solo responde",
            "3 a 4 integraciones",
            "Construcción de las herramientas que su sistema no expone",
            "Entrega en 4 a 6 semanas",
            "60 días de soporte",
            "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
          ],
        },
        {
          key: "sistema",
          name: "Sistema completo",
          priceKey: "automationSystem",
          from: true,
          items: [
            "Todo lo del pack anterior, más:",
            "Varios agentes coordinados entre sí, no uno solo",
            "Desarrollo propio de los componentes que hagan falta",
            "Integraciones profundas con la operación",
            "Entrega en 6 a 10 semanas",
            "90 días de soporte",
            "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
          ],
        },
      ],
    },

    /**
     * Con IA o sin IA es una decisión de diseño, no dos productos distintos.
     * La comparación existe para que el visitante describa su proceso en vez
     * de pedir una tecnología por nombre.
     */
    comparison: {
      lead: "Un chatbot responde. Un agente hace cosas.",
      intro:
        "La diferencia no es la marca de la tecnología, es dónde termina el proceso: en una respuesta o en una acción.",
      rowLabels: {
        does: "Qué hace",
        example: "Ejemplo",
        when: "Cuándo conviene",
        cost: "Costo relativo",
      },
      columns: [
        {
          key: "rules",
          name: "Respuestas con reglas",
          does: "Responde según un árbol de opciones definido",
          example: "«Marque 1 para horarios»",
          when: "Procesos con reglas fijas y pocas variantes",
          cost: "Bajo",
        },
        {
          key: "ai",
          name: "Respuestas con IA",
          does: "Entiende lenguaje natural y responde",
          example: "«¿A qué hora abren los sábados?»",
          when: "Preguntas abiertas sobre información que ya existe",
          cost: "Medio",
        },
        {
          key: "agent",
          name: "Agente",
          does: "Entiende, decide y ejecuta acciones en sus sistemas",
          example:
            "«Necesito 20 unidades del código A-12» → consulta stock, crea el pedido, descuenta inventario, avisa a bodega",
          when: "Cuando el proceso termina en una acción, no en una respuesta",
          cost: "Alto",
        },
      ],
      note: "Usted describe el proceso; nosotros elegimos con qué se construye. No son tres productos de catálogo entre los que haya que escoger a ciegas.",
    },

    /**
     * El bloque de agentes a la medida es la oferta que otra agencia de
     * automatización no puede sostener, y por eso va con espacio propio: la
     * herramienta que le falta al agente es trabajo de desarrollo, que es la
     * otra mitad de lo que hacemos.
     */
    agents: {
      title: "Agentes a la medida",
      leadTitle: "Qué lo hace «a la medida»",
      leadText:
        "Un agente solo puede hacer aquello para lo que existe una herramienta. Un agente genérico usa herramientas que ya existen: leer un calendario, buscar en documentos, enviar un correo. Un agente a la medida usa herramientas que hay que construir, porque solo existen dentro de la operación de su empresa.",
      examplesTitle: "Cuatro ejemplos",
      examples: [
        {
          name: "Agente de cotización",
          text: "Recibe la solicitud, consulta la lista de precios, aplica las reglas de descuento del cliente, arma la cotización y la registra.",
        },
        {
          name: "Agente de pedidos",
          text: "Recibe el pedido, valida disponibilidad, crea la orden, descuenta inventario y notifica a despacho.",
        },
        {
          name: "Agente de conciliación",
          text: "Cruza extractos bancarios contra facturas y marca las diferencias.",
        },
        {
          name: "Agente de soporte interno",
          text: "El equipo pregunta por procedimientos y responde desde la documentación de la propia empresa.",
        },
      ],
      edgeTitle: "Por qué se lo podemos construir",
      edgeText:
        "Cuando el sistema de un cliente no expone lo que el agente necesita, una agencia de automatización se queda sin oferta. Nosotros construimos la herramienta que falta: es el mismo trabajo de desarrollo que ya hacemos todos los días.",
      warningTitle: "Lo que hay que tener en cuenta",
      warningText:
        "Un agente que ejecuta acciones sobre sistemas reales puede equivocarse haciendo, no solo diciendo. Por eso se construyen con límites definidos, confirmación humana en las acciones críticas y registro de todo lo que ejecuta.",
    },

    includesTitle: "Qué incluye",
    includesIntro: "El alcance completo, antes de que firme.",
    includes: [
      "Mapa del proceso actual, con el punto exacto donde se pierden las horas",
      "Automatización construida y corriendo en su propia infraestructura",
      "Integración con los sistemas que ya paga, sin migrar nada",
      "Manejo de errores y reintentos: si una integración falla, alguien se entera",
      "Tablero de monitoreo para ver qué corrió, cuándo y con qué resultado",
      "Sesión de capacitación en vivo con quienes van a operar los flujos, y documentación en lenguaje claro",
      "Medición de horas recuperadas al mes, contra la línea base inicial",
      "El repositorio y los flujos a nombre de su empresa",
    ],

    processTitle: "Cómo trabajamos",
    processIntro: "Seis fases. Cada viernes ve una demo funcionando: evidencia en vivo del avance.",

    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de automatizar",
    faqs: [
      {
        question: "¿Por qué n8n y no una herramienta por suscripción?",
        answer:
          "Porque queda alojado en su propia infraestructura. Las plataformas por suscripción cobran por operación ejecutada: la automatización que hoy le sale barata se vuelve cara justo cuando empieza a funcionar y el volumen sube. Con n8n el costo no crece con el uso.",
      },
      {
        question: "¿Cuándo conviene responder con reglas y no con IA?",
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
    secondaryCta: "Agendar una llamada sin costo (30 min)",
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
    frontsIntro: "Seven fronts. You hire the one that solves your problem, not the whole package.",
    fronts: [
      {
        iconName: "Globe",
        name: "Websites",
        text: "A professional presence, in three tiers depending on what you need to solve.",
        routeKey: ROUTE_KEYS.WEBSITES,
      },
      {
        iconName: "Cpu",
        name: "Custom software",
        text: "For when no off-the-shelf tool fits how you actually work, with an admin panel included.",
        routeKey: ROUTE_KEYS.CUSTOM_SOFTWARE,
      },
      {
        iconName: "PartyPopper",
        name: "Micropages and digital invitations",
        text: "Invitations for weddings, quinceañeras, graduations, and other events, with a countdown, gallery, and WhatsApp RSVP.",
        routeKey: ROUTE_KEYS.MICROPAGES,
      },
      {
        iconName: "Search",
        name: "SEO and visibility",
        text: "So your site shows up when someone searches for what you sell. Technical structure, content, and measurement.",
        routeKey: ROUTE_KEYS.SEO,
      },
      {
        iconName: "Plug",
        name: "Integrations and APIs",
        text: "Connecting what you already have to what you're about to build.",
        routeKey: ROUTE_KEYS.INTEGRATIONS,
      },
      {
        iconName: "CreditCard",
        name: "Payment gateways",
        text: "Charging online, with the gateways actually used in Colombia and the region.",
        routeKey: ROUTE_KEYS.PAYMENT_GATEWAYS,
      },
      {
        iconName: "Wrench",
        name: "Maintenance",
        text: "Updates, backups, and bug fixes.",
        meta: formatPrice("careBasic", "en", { from: true, perMonth: true }),
        routeKey: ROUTE_KEYS.MAINTENANCE,
      },
    ],

    noteTitle: "Technical SEO, not ranking promises",
    noteText:
      "What we build is the part that actually depends on us: server-side rendering so search engines get content instead of an empty page, metadata and structured data, load speed, URL architecture, and measurement configured from day one. We don't sell positions or deadlines to reach them. This very site had that problem — it served empty HTML to crawlers — and it was fixed with the work we're describing here.",

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
      "A live training session with the people who will use the system, plus live Q&A",
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
          "Yes. The full-site tier and every application include an admin panel, and delivery includes training for your team plus documentation in plain language. You stay in control of your content.",
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
          "careBasic",
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
    frontsIntro: "Six fronts. You start with the process eating the most hours.",
    fronts: [
      {
        iconName: "MessageSquare",
        name: "Automated WhatsApp support",
        text: "It answers, qualifies, and hands off to a person when it needs to. With rules or with AI, depending on what the process calls for.",
      },
      {
        iconName: "Bot",
        name: "Custom agents",
        text: "They don't just answer: they query your systems, decide, and carry out the action that closes the process.",
      },
      {
        iconName: "Workflow",
        name: "n8n workflows",
        text: "Automation hosted on your own infrastructure, with no per-operation costs that grow with volume.",
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

    noteTitle: "We use AI where it earns its place",
    noteText:
      "There are processes where a fixed-rule flow is simply better: it costs less, it answers the same way every time, and it doesn't hallucinate. If yours is one of those, we'll say so and build it that way. AI goes where it earns its place — open conversations, classification, unstructured documents — and not where it only adds cost.",

    packs: {
      title: "Three ways to start",
      intro: "Defined scope and a closed price. You pick by the size of the problem, not by technology.",
      featuredLabel: "Most chosen",
      cta: "Request this pack",
      discoveryNote:
        "If you're not sure which one to pick, book a free discovery call and we'll tell you in 30 minutes.",
      items: [
        {
          key: "puntual",
          name: "Single automation",
          priceKey: "automation",
          items: [
            "1 process automated end to end",
            "1 to 2 integrations with existing systems",
            "Delivered in 2 to 3 weeks",
            "30 days of support",
            "Live training for your team",
            "50% up front, 50% on delivery",
          ],
        },
        {
          key: "agente",
          name: "Custom agent",
          priceKey: "automationAgent",
          featured: true,
          items: [
            "Everything in the previous pack, plus:",
            "1 agent that executes actions in your systems, not just responds",
            "3 to 4 integrations",
            "Building the tools your system doesn't expose",
            "Delivered in 4 to 6 weeks",
            "60 days of support",
            "40% up front, 30% at the midpoint, 30% on delivery",
          ],
        },
        {
          key: "sistema",
          name: "Full system",
          priceKey: "automationSystem",
          from: true,
          items: [
            "Everything in the previous pack, plus:",
            "Several agents coordinated with each other, not just one",
            "Custom development of whatever components are missing",
            "Deep integrations with your operation",
            "Delivered in 6 to 10 weeks",
            "90 days of support",
            "40% up front, 30% at the midpoint, 30% on delivery",
          ],
        },
      ],
    },

    comparison: {
      lead: "A chatbot answers. An agent does things.",
      intro:
        "The difference isn't the brand of technology, it's where the process ends: in an answer, or in an action.",
      rowLabels: {
        does: "What it does",
        example: "Example",
        when: "When it fits",
        cost: "Relative cost",
      },
      columns: [
        {
          key: "rules",
          name: "Rule-based replies",
          does: "Answers according to a defined option tree",
          example: "“Press 1 for opening hours”",
          when: "Processes with fixed rules and few variations",
          cost: "Low",
        },
        {
          key: "ai",
          name: "AI replies",
          does: "Understands natural language and answers",
          example: "“What time do you open on Saturdays?”",
          when: "Open questions about information that already exists",
          cost: "Medium",
        },
        {
          key: "agent",
          name: "Agent",
          does: "Understands, decides, and carries out actions in your systems",
          example:
            "“I need 20 units of item A-12” → checks stock, creates the order, deducts inventory, notifies the warehouse",
          when: "When the process ends in an action, not in an answer",
          cost: "High",
        },
      ],
      note: "You describe the process; we choose what it's built with. These aren't three catalog products you have to pick between blindly.",
    },

    agents: {
      title: "Custom agents",
      leadTitle: "What makes one “custom”",
      leadText:
        "An agent can only do what there's a tool for. A generic agent uses tools that already exist: reading a calendar, searching documents, sending an email. A custom agent uses tools that have to be built, because they only exist inside your company's operation.",
      examplesTitle: "Four examples",
      examples: [
        {
          name: "Quoting agent",
          text: "Takes the request, checks the price list, applies that client's discount rules, builds the quote, and records it.",
        },
        {
          name: "Ordering agent",
          text: "Takes the order, validates availability, creates it, deducts inventory, and notifies dispatch.",
        },
        {
          name: "Reconciliation agent",
          text: "Matches bank statements against invoices and flags the differences.",
        },
        {
          name: "Internal support agent",
          text: "Your team asks about procedures and it answers from your own company's documentation.",
        },
      ],
      edgeTitle: "Why we can build it",
      edgeText:
        "When a client's system doesn't expose what the agent needs, an automation agency runs out of offer. We build the missing tool: it's the same development work we already do every day.",
      warningTitle: "What to keep in mind",
      warningText:
        "An agent that carries out actions on real systems can get things wrong by doing, not just by saying. That's why they're built with defined limits, human confirmation on critical actions, and a log of everything they execute.",
    },

    includesTitle: "What's included",
    includesIntro: "The full scope, before you sign.",
    includes: [
      "A map of the current process, pinpointing where the hours are lost",
      "Automation built and running on your own infrastructure",
      "Integration with the systems you already pay for, with nothing to migrate",
      "Error handling and retries: if an integration fails, somebody finds out",
      "A monitoring dashboard showing what ran, when, and with what result",
      "A live training session with the people who will operate the flows, plus documentation in plain language",
      "Measurement of hours recovered per month, against the original baseline",
      "The repository and the workflows in your company's name",
    ],

    processTitle: "How we work",
    processIntro: "Six phases. Every Friday you see a working demo: live evidence of progress.",

    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before automating",
    faqs: [
      {
        question: "Why n8n instead of a subscription tool?",
        answer:
          "Because it runs on your own infrastructure. Subscription platforms charge per operation executed: the automation that looks cheap today gets expensive precisely when it starts working and volume goes up. With n8n the cost doesn't grow with usage.",
      },
      {
        question: "When is answering with rules the right call instead of AI?",
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

/**
 * Etiquetas compartidas por la plantilla de categoría, en los dos idiomas.
 *
 * `vatLabel` y `vatNote` solo existen en español: los precios en pesos se
 * publican con IVA incluido y eso se dice junto a cada cifra, no en una nota al
 * pie. En dólares no aplica IVA colombiano y por eso van en `null`, que es lo
 * que hace que la interfaz no pinte nada en inglés.
 */
export const categoryChromeCopy = {
  es: {
    menuLabel: "Servicios",
    menuIndex: "Ver todos los servicios",
    backLabel: "Ver todos los servicios",
    quoteCta: "Solicitar cotización",
    discoveryCta: "Agendar una llamada sin costo (30 min)",
    vatLabel: "IVA incluido",
    vatNote: "Todos nuestros precios en pesos incluyen IVA. Lo que ve es lo que factura.",
    featuredLabel: "El más elegido",
    addsLabel: "Incluye todo lo anterior, más:",
  },
  en: {
    menuLabel: "Services",
    menuIndex: "See all services",
    backLabel: "See all services",
    quoteCta: "Request a quote",
    discoveryCta: "Book a free discovery call",
    vatLabel: null,
    vatNote: null,
    featuredLabel: "Most chosen",
    addsLabel: "Includes everything above, plus:",
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
      items: copy.categories.webDev.fronts.map((front) => ({
        label: front.name,
        routeKey: front.routeKey ?? null,
      })),
    },
    {
      key: "automation",
      routeKey: ROUTE_KEYS.AUTOMATION,
      label: copy.categories.automation.navLabel,
      items: copy.categories.automation.fronts.map((front) => ({
        label: front.name,
        routeKey: front.routeKey ?? null,
      })),
    },
    {
      key: "audit",
      routeKey: ROUTE_KEYS.AUDIT,
      label: copy.audit.navLabel,
      items: copy.audit.deliverables.map((item) => ({ label: item.title, routeKey: null })),
    },
  ];
}
