import { ROUTE_KEYS } from "../router/routes.js";

/**
 * Copy de las siete páginas de servicio individuales del hub de desarrollo
 * web: sitios web, software a la medida, micropáginas, SEO, integraciones,
 * pasarelas de pago y mantenimiento.
 *
 * Cada entrada sigue la misma forma: `{ key, badge, title, intro, tiers,
 * faqs, cases?, related? }`. `tiers` lleva `priceKey` —no un precio ya
 * formateado— porque `ServiceDetailPage` calcula el precio con `formatPrice`
 * según el idioma activo, y el mismo `priceKey` alimenta el `Offer` de
 * `seo/seo.js`.
 *
 * Ninguna cifra se escribe a mano: todas salen de `config/pricing.js`.
 */

const es = {
  websites: {
    key: "websites",
    badge: "Desarrollo web",
    title: "Sitios web construidos para lo que necesita resolver",
    intro:
      "Tres niveles, del más simple al más completo. Se elige según lo que su operación necesita mostrar o administrar, no al revés.",
    tiers: [
      {
        key: "landing",
        name: "Landing",
        priceKey: "webPresenceLanding",
        delivery: "5 a 7 días hábiles",
        includes: [
          "Página única enfocada en conversión",
          "Diseño sobre plantillas probadas",
          "Formulario de contacto conectado a WhatsApp",
          "SEO básico y analítica",
          "Hosting y dominio por 1 año",
        ],
        cta: "Solicitar landing",
      },
      {
        key: "full",
        name: "Sitio completo con panel",
        priceKey: "webPresence",
        delivery: "2 a 4 semanas",
        featured: true,
        includes: [
          "Páginas múltiples con diseño propio",
          "Panel para administrar el contenido usted mismo",
          "SEO avanzado y analítica configurada",
          "Soporte 30 días post-lanzamiento",
          "Hosting y dominio por 1 año",
        ],
        adds: [
          "Páginas múltiples con diseño propio, no una plantilla",
          "Panel de administración: usted actualiza el contenido sin llamarnos",
          "SEO avanzado y soporte 30 días post-lanzamiento",
        ],
        cta: "Solicitar sitio completo",
      },
      {
        key: "catalog",
        name: "Catálogo o tienda en línea",
        priceKey: "webCatalog",
        delivery: "3 a 5 semanas",
        includes: [
          "Catálogo de productos o servicios con búsqueda y filtros",
          "Carrito y flujo de pedido, listo para conectar una pasarela de pago",
          "Panel para administrar productos, precios e inventario",
          "SEO avanzado y analítica configurada",
          "Hosting y dominio por 1 año",
        ],
        adds: [
          "Catálogo con búsqueda, filtros y carrito de pedido",
          "Panel para administrar productos, precios e inventario",
        ],
        cta: "Solicitar catálogo o tienda",
      },
    ],
    casesTitle: "En producción",
    cases: [
      {
        client: "Iglesia Bautista Fundamental Casa Grande",
        summary:
          "Sitio bilingüe ES/EN con el video y la radio sincronizados solos desde YouTube: el equipo publica como siempre y el sitio se actualiza sin que nadie toque un panel.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de elegir nivel",
    faqs: [
      {
        question: "¿Cómo sé cuál nivel necesito?",
        answer:
          "Si solo necesita una página que convierta —un servicio, un evento, una campaña—, la landing alcanza. Si va a publicar contenido con frecuencia o necesita que su equipo administre la información, el sitio completo. Si va a vender en línea, el catálogo. Cuéntenos qué necesita mostrar y le confirmamos el nivel.",
      },
      {
        question: "¿Puedo empezar en un nivel y subir después?",
        answer:
          "Sí. Una landing puede crecer a sitio completo más adelante; se cotiza la diferencia de alcance, no el proyecto entero de nuevo.",
      },
      {
        question: "¿El catálogo cobra en línea?",
        answer:
          "El catálogo deja el pedido listo para pagar; conectar la pasarela de cobro es el frente de pasarelas de pago, aparte, porque no todos los catálogos cobran del mismo modo.",
      },
      {
        question: "¿Quién escribe el contenido del sitio?",
        answer:
          "El texto y las fotos los aporta usted; nosotros los organizamos y los redactamos en formato web si hace falta. La estructura, el diseño y la parte técnica son nuestras.",
      },
    ],
    related: [
      { routeKey: ROUTE_KEYS.SEO, label: "SEO" },
      { routeKey: ROUTE_KEYS.MAINTENANCE, label: "Mantenimiento" },
      { routeKey: ROUTE_KEYS.MICROPAGES, label: "Micropáginas" },
    ],
    ctaTitle: "¿Tiene claro qué necesita mostrar o administrar?",
    ctaText: "Cuéntenos y le confirmamos el nivel y el tiempo de entrega.",
  },

  customSoftware: {
    key: "customSoftware",
    badge: "Desarrollo web",
    title: "Software construido alrededor de su operación",
    intro:
      "Cuando ninguna herramienta del mercado se ajusta a cómo trabaja su empresa. Todo nivel incluye su panel de administración: gestionar pedidos, inventario, clientes o procesos internos es justamente lo que resuelve.",
    tiers: [
      {
        key: "tool",
        name: "Herramienta a la medida",
        priceKey: "customTool",
        delivery: "2 a 3 semanas",
        includes: [
          "Una función puntual resuelta a la medida: un cálculo, un flujo de aprobación, un formulario complejo",
          "Panel simple para operar la herramienta",
          "Base de datos propia",
          "Documentación en lenguaje claro",
        ],
        cta: "Solicitar herramienta a la medida",
      },
      {
        key: "app",
        name: "Aplicación a la medida",
        priceKey: "customSoftware",
        delivery: "Desde 4 semanas",
        featured: true,
        includes: [
          "Sistema completo para administrar pedidos, inventario, clientes o la operación interna",
          "Panel de administración con control de usuarios y permisos por rol",
          "Base de datos diseñada para su flujo real",
          "API propia para conectar con otros sistemas",
          "Desplegada en la nube y lista para crecer",
        ],
        adds: [
          "Sistema completo, no una función puntual",
          "Control de usuarios y permisos por rol",
          "API propia para conectar con otros sistemas",
        ],
        cta: "Solicitar aplicación a la medida",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de construir software a la medida",
    faqs: [
      {
        question: "¿Incluye panel de administración?",
        answer:
          "Sí, en los dos niveles. Todo software a la medida incluye el panel para operarlo: no tendría sentido entregar un sistema que solo nosotros podemos actualizar.",
      },
      {
        question: "¿Cuál es la diferencia entre herramienta y aplicación?",
        answer:
          "La herramienta resuelve una función puntual dentro de un proceso que ya existe. La aplicación es el sistema completo: varias funciones, varios roles, la operación entera administrada desde un solo panel.",
      },
      {
        question: "¿Pueden integrarla con los sistemas que ya uso?",
        answer:
          "Sí, es justamente el frente de integraciones. Se cotiza aparte porque el alcance depende de qué sistemas y qué tan abierta sea su API.",
      },
    ],
    related: [
      { routeKey: ROUTE_KEYS.INTEGRATIONS, label: "Integraciones y APIs" },
      { routeKey: ROUTE_KEYS.AUTOMATION, label: "Automatización" },
      { routeKey: ROUTE_KEYS.MAINTENANCE, label: "Mantenimiento" },
    ],
    ctaTitle: "¿Qué proceso está resolviendo hoy con planillas o correos?",
    ctaText: "Cuéntenos cómo trabaja su equipo y le decimos qué se puede construir.",
  },

  micropages: {
    key: "micropages",
    badge: "Desarrollo web",
    title: "La invitación digital de su evento",
    intro:
      "Bodas, XV años, grados, bautizos, baby showers, revelaciones de género. Una página para su evento, con cuenta regresiva, galería, música y confirmación de asistencia por WhatsApp.",
    tiers: [
      {
        key: "essential",
        name: "Esencial",
        priceKey: "micropageEssential",
        delivery: "24 a 48 horas",
        includes: [
          "Diseño personalizado sobre base Dexel",
          "Fotos, música y cuenta regresiva",
          "Mapa del lugar del evento",
          "Confirmación de asistencia (RSVP) por WhatsApp",
          "2 rondas de ajustes",
        ],
        cta: "Solicitar micropágina Esencial",
      },
      {
        key: "premium",
        name: "Premium",
        priceKey: "micropagePremium",
        delivery: "2 a 4 días",
        featured: true,
        includes: [
          "Todo lo del nivel Esencial",
          "Galería ampliada de fotos",
          "Mesa de regalos o lluvia de sobres con datos de pago",
          "Estadísticas de confirmación de asistencia",
          "Subdominio propio",
        ],
        adds: [
          "Galería ampliada de fotos",
          "Mesa de regalos o lluvia de sobres con datos de pago",
          "Estadísticas de confirmación y subdominio propio",
        ],
        cta: "Solicitar micropágina Premium",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que preguntan antes de encargar la invitación",
    faqs: [
      {
        question: "¿Cómo me la entregan?",
        answer:
          "Un enlace propio que comparte por WhatsApp, redes o donde prefiera. Sus invitados la abren desde el celular, sin instalar nada.",
      },
      {
        question: "¿Cuántos cambios incluye?",
        answer:
          "El nivel Esencial incluye 2 rondas de ajustes sobre el diseño ya construido: cambiar textos, fotos o el orden de la información. Un rediseño completo se cotiza aparte.",
      },
      {
        question: "¿Cuánto tiempo queda publicada?",
        answer:
          "Mínimo hasta un mes después de la fecha del evento, para que quien no alcanzó a confirmar o quiera ver las fotos después siga teniendo acceso.",
      },
      {
        question: "¿Qué pasa después del evento?",
        answer:
          "La página se queda como recuerdo mientras esté activa. Si más adelante quiere renovarla para otro evento, se cotiza como una nueva micropágina.",
      },
    ],
    related: [{ routeKey: ROUTE_KEYS.WEBSITES, label: "Sitios web" }],
    ctaTitle: "¿Ya tiene la fecha de su evento?",
    ctaText: "Cuéntenos el tipo de evento y la fecha, y le confirmamos el nivel y la entrega.",
    demos: {
      sectionTitle: "Así se ve por dentro",
      sectionIntro: "Tres ejemplos con datos ficticios, dentro de un marco de celular. Toque una pestaña para ver el demo.",
      frameLabel: "Vista previa en celular",
      types: [
        {
          key: "boda",
          tabLabel: "Boda",
          eventTitle: "Laura & Mateo",
          hosts: "Los invitan a celebrar su boda",
          location: "Jardín Botánico, Medellín",
        },
        {
          key: "xv",
          tabLabel: "XV años",
          eventTitle: "Valentina cumple 15",
          hosts: "Sus papás la invitan a celebrar",
          location: "Club Campestre, Bogotá",
        },
        {
          key: "babyshower",
          tabLabel: "Baby shower",
          eventTitle: "Familia Gómez espera a Emma",
          hosts: "Los invitan a compartir la alegría",
          location: "Casa Gómez, Cali",
        },
      ],
      countdownLabel: "Falta para el gran día",
      countdownUnits: { days: "Días", hours: "Horas", minutes: "Min", seconds: "Seg" },
      locationLabel: "Lugar",
      galleryTitle: "Galería",
      musicLabel: "Reproducir música",
      musicPlayingLabel: "Sonando",
      rsvpTitle: "Confirmar asistencia",
      rsvpButton: "Confirmar mi asistencia",
      rsvpConfirmed: "¡Asistencia confirmada!",
    },
  },

  seo: {
    key: "seo",
    badge: "Desarrollo web",
    title: "Que su sitio aparezca cuando lo buscan",
    intro:
      "Trabajo entregado cada mes —contenido publicado, enlaces conseguidos, reporte de lo hecho—, nunca una posición prometida. Empiece por la auditoría o directamente por un plan mensual.",
    tiers: [
      {
        key: "audit",
        name: "Auditoría SEO",
        priceKey: "seoAudit",
        delivery: "5 a 7 días hábiles",
        includes: [
          "Revisión técnica completa: velocidad, indexación, estructura de URLs",
          "Auditoría de contenido y palabras clave actuales",
          "Matriz de oportunidades ordenada por impacto",
          "Informe con recomendaciones priorizadas",
        ],
        cta: "Solicitar auditoría SEO",
      },
      {
        key: "local",
        name: "Local",
        priceKey: "seoLocal",
        delivery: "Mensual",
        perMonth: true,
        includes: [
          "Google Business Profile optimizado y gestionado",
          "SEO local para una ciudad",
          "Optimización on-page continua",
          "4 contenidos publicados al mes",
          "Reporte mensual de trabajo entregado",
        ],
        cta: "Solicitar plan Local",
      },
      {
        key: "growth",
        name: "Crecimiento",
        priceKey: "seoGrowth",
        delivery: "Mensual",
        perMonth: true,
        featured: true,
        includes: [
          "SEO técnico continuo",
          "8 contenidos publicados al mes",
          "3 enlaces conseguidos al mes",
          "Calendario editorial trimestral",
          "Pruebas A/B de landings",
          "Reporte mensual de trabajo entregado",
        ],
        adds: [
          "8 contenidos y 3 enlaces al mes, no 4 y ninguno",
          "SEO técnico continuo y calendario editorial trimestral",
          "Pruebas A/B de landings",
        ],
        cta: "Solicitar plan Crecimiento",
      },
      {
        key: "authority",
        name: "Autoridad",
        priceKey: "seoAuthority",
        delivery: "Mensual",
        perMonth: true,
        includes: [
          "15 contenidos publicados al mes",
          "8 enlaces conseguidos al mes",
          "Relaciones públicas digitales (Digital PR)",
          "Video y contenido de marca",
          "Dashboard ejecutivo",
          "Reporte mensual de trabajo entregado",
        ],
        adds: [
          "15 contenidos y 8 enlaces al mes",
          "Digital PR, video y contenido de marca",
          "Dashboard ejecutivo",
        ],
        cta: "Solicitar plan Autoridad",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de contratar SEO",
    faqs: [
      {
        question: "¿Me garantizan una posición en Google?",
        answer:
          "No, y ningún proveedor serio lo hace: la posición depende de factores que no controla nadie por fuera de Google. Lo que sí garantizamos es el trabajo: los contenidos, los enlaces y las mejoras técnicas quedan entregados cada mes, con reporte.",
      },
      {
        question: "¿Necesito la auditoría antes de un plan mensual?",
        answer:
          "No es obligatoria, pero ayuda a elegir el plan correcto si no sabe en qué estado está su sitio hoy. Si ya sabe qué necesita, puede empezar directo en Local, Crecimiento o Autoridad.",
      },
      {
        question: "¿Quién escribe los contenidos?",
        answer:
          "Nuestro equipo, a partir de la información y el enfoque que usted nos da sobre su negocio. Usted revisa y aprueba antes de publicar.",
      },
      {
        question: "¿Hay permanencia mínima?",
        answer:
          "Los planes son mensuales y se pueden cancelar de un mes a otro. El SEO acumula resultado con el tiempo, así que recomendamos al menos 3 meses para evaluarlo con datos reales.",
      },
    ],
    related: [{ routeKey: ROUTE_KEYS.WEBSITES, label: "Sitios web" }],
    ctaTitle: "¿Quiere saber en qué estado está su SEO hoy?",
    ctaText: "Cuéntenos su sitio y le decimos si conviene empezar por la auditoría o por un plan mensual.",
  },

  integrations: {
    key: "integrations",
    badge: "Desarrollo web",
    title: "Que sus sistemas se hablen entre sí",
    intro:
      "Su sistema de facturación no habla con su CRM. Su inventario no se actualiza solo cuando vende en línea. Conectamos lo que ya tiene para que nadie tenga que copiar datos de un lado a otro.",
    tiers: [
      {
        key: "integration",
        name: "Integración individual",
        priceKey: "integration",
        delivery: "1 a 2 semanas",
        includes: [
          "Conexión entre dos sistemas: el que ya tiene y el que necesita que le hable",
          "Sincronización de datos automática, sin digitación manual",
          "Manejo de errores y reintentos si un sistema falla",
          "Documentación de la conexión",
        ],
        cta: "Solicitar integración",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de integrar dos sistemas",
    faqs: [
      {
        question: "¿Qué cuenta como una integración?",
        answer:
          "La conexión entre dos sistemas puntuales: su facturación con su CRM, su tienda en línea con su inventario, su formulario con su hoja de cálculo. Conectar tres o más sistemas en un mismo flujo es un proyecto de automatización, no una integración suelta.",
      },
      {
        question: "¿Necesito que los dos sistemas tengan API?",
        answer:
          "Ayuda, pero no siempre es obligatorio: algunos sistemas se pueden conectar por otras vías (webhooks, archivos, correo). Revisamos su caso puntual antes de cotizar.",
      },
      {
        question: "¿Qué pasa si uno de los sistemas cambia después?",
        answer:
          "La integración queda documentada, así que ajustarla si un sistema cambia su forma de conectarse es un trabajo acotado, no empezar de nuevo.",
      },
    ],
    related: [
      { routeKey: ROUTE_KEYS.AUTOMATION, label: "Automatización" },
      { routeKey: ROUTE_KEYS.CUSTOM_SOFTWARE, label: "Software a la medida" },
    ],
    ctaTitle: "¿Qué dos sistemas necesita que se hablen?",
    ctaText: "Cuéntenos cuáles son y le confirmamos si es una integración directa o algo más grande.",
  },

  paymentGateways: {
    key: "paymentGateways",
    badge: "Desarrollo web",
    title: "Cobre en línea en el sitio que ya tiene",
    intro:
      "Para quien ya tiene un sitio con productos o servicios y quiere que sus clientes paguen ahí mismo, sin salir a otra plataforma.",
    tiers: [
      {
        key: "gateway",
        name: "Implementación de pasarela",
        priceKey: "paymentGateway",
        delivery: "1 a 2 semanas",
        includes: [
          "Conexión de la pasarela que use en Colombia o la región (tarjetas, PSE, transferencias)",
          "Flujo de pago integrado a su catálogo o carrito actual",
          "Confirmación automática del pedido tras el pago",
          "Pruebas de pago antes de salir a producción",
        ],
        cta: "Solicitar pasarela de pago",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de cobrar en línea",
    faqs: [
      {
        question: "¿Necesito tener sitio ya construido?",
        answer:
          "Sí, esta implementación es para conectar el cobro a un sitio o catálogo que ya existe. Si todavía no tiene sitio, vea el frente de sitios web: el nivel de catálogo ya deja el pedido listo para conectar la pasarela.",
      },
      {
        question: "¿Con qué pasarelas trabajan?",
        answer:
          "Con las que se usan en Colombia y la región: tarjetas, PSE y transferencias, según lo que ya tenga contratado o lo que le recomendemos según su volumen.",
      },
      {
        question: "¿Quién abre la cuenta con la pasarela?",
        answer:
          "Esa cuenta es suya y queda a nombre de su empresa, no de Dexel: es su dinero y sus condiciones comerciales con el proveedor de pagos. Nosotros hacemos la conexión técnica.",
      },
    ],
    related: [{ routeKey: ROUTE_KEYS.WEBSITES, label: "Sitios web" }],
    ctaTitle: "¿Ya tiene sitio y quiere empezar a cobrar en línea?",
    ctaText: "Cuéntenos qué pasarela usa o quiere usar, y le confirmamos el alcance.",
  },

  maintenanceDetail: {
    key: "maintenanceDetail",
    badge: "Desarrollo web",
    title: "Soporte continuo para lo que ya está en producción",
    intro:
      "Tres niveles, según qué tan crítico sea que su sitio, aplicación o agente no se detenga. Mensual, sin permanencia.",
    tiers: [
      {
        key: "basic",
        name: "Básico",
        priceKey: "careBasic",
        delivery: "Mensual",
        perMonth: true,
        includes: [
          "Para sitios estáticos: landing o sitio informativo",
          "Actualizaciones de seguridad",
          "Corrección de errores",
          "Respaldo automático mensual",
        ],
        cta: "Solicitar mantenimiento Básico",
      },
      {
        key: "standard",
        name: "Estándar",
        priceKey: "careStandard",
        delivery: "Mensual",
        perMonth: true,
        featured: true,
        includes: [
          "Para sitios con panel de administración o aplicaciones a la medida",
          "Todo lo del nivel Básico",
          "Respaldos automáticos semanales",
          "Monitoreo de rendimiento y disponibilidad",
          "Soporte técnico prioritario",
        ],
        adds: [
          "Pensado para sitios con panel o aplicaciones, no solo páginas estáticas",
          "Respaldos semanales y monitoreo de disponibilidad",
          "Soporte técnico prioritario",
        ],
        cta: "Solicitar mantenimiento Estándar",
      },
      {
        key: "priority",
        name: "Prioritario",
        priceKey: "carePriority",
        delivery: "Mensual",
        perMonth: true,
        includes: [
          "Para agentes y automatizaciones con consumo de tokens o de API",
          "Todo lo del nivel Estándar",
          "Monitoreo del consumo de tokens y de las integraciones activas",
          "Ajustes menores incluidos sin cotizar aparte",
          "Tiempo de respuesta más corto ante una caída",
        ],
        adds: [
          "Pensado para agentes y automatizaciones con consumo de tokens o de API",
          "Monitoreo del consumo y de las integraciones activas",
          "Ajustes menores incluidos y respuesta más rápida ante una caída",
        ],
        cta: "Solicitar mantenimiento Prioritario",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de contratar mantenimiento",
    faqs: [
      {
        question: "¿Cuál nivel me corresponde?",
        answer:
          "Depende de lo que tenga en producción: un sitio sin panel administrable pesa distinto que uno con panel, y un agente que consume tokens o llama APIs de terceros necesita un monitoreo que un sitio estático no necesita. Cuéntenos qué construimos y le confirmamos el nivel.",
      },
      {
        question: "¿Es obligatorio contratarlo?",
        answer:
          "No. Es opcional y mensual, sin permanencia. Si prefiere manejarlo con su propio equipo, la documentación que entregamos con el proyecto se lo permite.",
      },
      {
        question: "¿Qué pasa si necesito un cambio que no es mantenimiento?",
        answer:
          "Una función nueva o un cambio de alcance se cotiza aparte, como cualquier proyecto. El mantenimiento cubre que lo ya construido siga funcionando, no que crezca.",
      },
    ],
    related: [
      { routeKey: ROUTE_KEYS.WEBSITES, label: "Sitios web" },
      { routeKey: ROUTE_KEYS.CUSTOM_SOFTWARE, label: "Software a la medida" },
    ],
    ctaTitle: "¿Qué tiene en producción hoy?",
    ctaText: "Cuéntenos qué construimos o qué tiene funcionando, y le confirmamos el nivel.",
  },
};

const en = {
  websites: {
    key: "websites",
    badge: "Web development",
    title: "Websites built for what you need to solve",
    intro:
      "Three tiers, from the simplest to the most complete. Chosen by what your operation needs to show or manage, not the other way around.",
    tiers: [
      {
        key: "landing",
        name: "Landing",
        priceKey: "webPresenceLanding",
        delivery: "5 to 7 business days",
        includes: [
          "Single page focused on conversion",
          "Design on proven templates",
          "Contact form connected to WhatsApp",
          "Basic SEO and analytics",
          "Hosting and domain for 1 year",
        ],
        cta: "Request a landing page",
      },
      {
        key: "full",
        name: "Full site with admin panel",
        priceKey: "webPresence",
        delivery: "2 to 4 weeks",
        featured: true,
        includes: [
          "Multiple pages with a custom design",
          "Admin panel to update content yourself",
          "Advanced SEO and configured analytics",
          "30 days of post-launch support",
          "Hosting and domain for 1 year",
        ],
        adds: [
          "Multiple pages with a custom design, not a template",
          "Admin panel: you update content without calling us",
          "Advanced SEO and 30 days of post-launch support",
        ],
        cta: "Request a full site",
      },
      {
        key: "catalog",
        name: "Online catalog or store",
        priceKey: "webCatalog",
        delivery: "3 to 5 weeks",
        includes: [
          "Product or service catalog with search and filters",
          "Cart and order flow, ready to connect a payment gateway",
          "Admin panel to manage products, prices, and inventory",
          "Advanced SEO and configured analytics",
          "Hosting and domain for 1 year",
        ],
        adds: [
          "Catalog with search, filters, and order cart",
          "Admin panel to manage products, prices, and inventory",
        ],
        cta: "Request a catalog or store",
      },
    ],
    casesTitle: "In production",
    cases: [
      {
        client: "Casa Grande Fundamental Baptist Church",
        summary:
          "Bilingual ES/EN site with video and radio syncing automatically from YouTube: the team publishes as usual and the site updates itself, without anyone touching an admin panel.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before choosing a tier",
    faqs: [
      {
        question: "How do I know which tier I need?",
        answer:
          "If you just need a page that converts — a service, an event, a campaign — the landing is enough. If you'll publish content regularly or need your team to manage the information, the full site. If you'll sell online, the catalog. Tell us what you need to show and we'll confirm the tier.",
      },
      {
        question: "Can I start at one tier and move up later?",
        answer:
          "Yes. A landing can grow into a full site later; we quote the difference in scope, not the whole project again.",
      },
      {
        question: "Does the catalog take payments online?",
        answer:
          "The catalog leaves the order ready to be paid; connecting the payment gateway is the separate payment gateways service, because not every catalog charges the same way.",
      },
      {
        question: "Who writes the site's content?",
        answer:
          "You provide the text and photos; we organize them and write them for the web where needed. The structure, design, and technical work are on us.",
      },
    ],
    related: [
      { routeKey: ROUTE_KEYS.SEO, label: "SEO" },
      { routeKey: ROUTE_KEYS.MAINTENANCE, label: "Maintenance" },
      { routeKey: ROUTE_KEYS.MICROPAGES, label: "Micropages" },
    ],
    ctaTitle: "Do you know what you need to show or manage?",
    ctaText: "Tell us and we'll confirm the tier and the delivery time.",
  },

  customSoftware: {
    key: "customSoftware",
    badge: "Web development",
    title: "Software built around your operation",
    intro:
      "For when no tool on the market fits how your business works. Every tier includes its admin panel: managing orders, inventory, customers, or internal processes is exactly what it's for.",
    tiers: [
      {
        key: "tool",
        name: "Custom tool",
        priceKey: "customTool",
        delivery: "2 to 3 weeks",
        includes: [
          "One specific function solved to fit: a calculation, an approval flow, a complex form",
          "Simple panel to operate the tool",
          "Its own database",
          "Documentation in plain language",
        ],
        cta: "Request a custom tool",
      },
      {
        key: "app",
        name: "Custom application",
        priceKey: "customSoftware",
        delivery: "From 4 weeks",
        featured: true,
        includes: [
          "Full system to manage orders, inventory, customers, or your internal operation",
          "Admin panel with user control and role-based permissions",
          "Database designed for your real workflow",
          "Its own API to connect with other systems",
          "Deployed on the cloud and ready to grow",
        ],
        adds: [
          "A full system, not a single function",
          "User control and role-based permissions",
          "Its own API to connect with other systems",
        ],
        cta: "Request a custom application",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before building custom software",
    faqs: [
      {
        question: "Does it include an admin panel?",
        answer:
          "Yes, at both tiers. Every custom build includes the panel to operate it: shipping a system only we could update wouldn't make sense.",
      },
      {
        question: "What's the difference between a tool and an application?",
        answer:
          "The tool solves one specific function within a process that already exists. The application is the full system: several functions, several roles, the whole operation managed from a single panel.",
      },
      {
        question: "Can you connect it to the systems I already use?",
        answer:
          "Yes, that's exactly the integrations service. It's quoted separately because the scope depends on which systems and how open their API is.",
      },
    ],
    related: [
      { routeKey: ROUTE_KEYS.INTEGRATIONS, label: "Integrations and APIs" },
      { routeKey: ROUTE_KEYS.AUTOMATION, label: "Automation" },
      { routeKey: ROUTE_KEYS.MAINTENANCE, label: "Maintenance" },
    ],
    ctaTitle: "What process are you solving today with spreadsheets or email?",
    ctaText: "Tell us how your team works and we'll tell you what can be built.",
  },

  micropages: {
    key: "micropages",
    badge: "Web development",
    title: "The digital invitation for your event",
    intro:
      "Weddings, quinceañeras, graduations, baptisms, baby showers, gender reveals. A page for your event, with a countdown, gallery, music, and WhatsApp RSVP.",
    tiers: [
      {
        key: "essential",
        name: "Essential",
        priceKey: "micropageEssential",
        delivery: "24 to 48 hours",
        includes: [
          "Custom design on a Dexel base",
          "Photos, music, and countdown",
          "Map of the event location",
          "RSVP by WhatsApp",
          "2 rounds of edits",
        ],
        cta: "Request an Essential micropage",
      },
      {
        key: "premium",
        name: "Premium",
        priceKey: "micropagePremium",
        delivery: "2 to 4 days",
        featured: true,
        includes: [
          "Everything in Essential",
          "Extended photo gallery",
          "Gift registry or cash gift section with payment details",
          "RSVP statistics",
          "Its own subdomain",
        ],
        adds: [
          "Extended photo gallery",
          "Gift registry or cash gift section with payment details",
          "RSVP statistics and its own subdomain",
        ],
        cta: "Request a Premium micropage",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before ordering the invitation",
    faqs: [
      {
        question: "How is it delivered?",
        answer:
          "A link of your own that you share on WhatsApp, social media, or wherever you prefer. Your guests open it from their phone, with nothing to install.",
      },
      {
        question: "How many changes are included?",
        answer:
          "The Essential tier includes 2 rounds of edits on the built design: changing text, photos, or the order of the information. A full redesign is quoted separately.",
      },
      {
        question: "How long does it stay published?",
        answer:
          "At least until a month after the event date, so anyone who couldn't confirm in time, or wants to see the photos afterward, still has access.",
      },
      {
        question: "What happens after the event?",
        answer:
          "The page stays up as a keepsake while it's active. If you want to reuse it for another event later, it's quoted as a new micropage.",
      },
    ],
    related: [{ routeKey: ROUTE_KEYS.WEBSITES, label: "Websites" }],
    ctaTitle: "Do you already have the date for your event?",
    ctaText: "Tell us the type of event and the date, and we'll confirm the tier and delivery.",
    demos: {
      sectionTitle: "Here's what it looks like",
      sectionIntro: "Three examples with made-up details, inside a phone frame. Tap a tab to see the demo.",
      frameLabel: "Phone preview",
      types: [
        {
          key: "boda",
          tabLabel: "Wedding",
          eventTitle: "Laura & Mateo",
          hosts: "Invite you to celebrate their wedding",
          location: "Botanical Garden, Medellín",
        },
        {
          key: "xv",
          tabLabel: "Quinceañera",
          eventTitle: "Valentina turns 15",
          hosts: "Her parents invite you to celebrate",
          location: "Club Campestre, Bogotá",
        },
        {
          key: "babyshower",
          tabLabel: "Baby shower",
          eventTitle: "The Gómez family is expecting Emma",
          hosts: "Invite you to share the joy",
          location: "Gómez home, Cali",
        },
      ],
      countdownLabel: "Until the big day",
      countdownUnits: { days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec" },
      locationLabel: "Location",
      galleryTitle: "Gallery",
      musicLabel: "Play music",
      musicPlayingLabel: "Playing",
      rsvpTitle: "RSVP",
      rsvpButton: "Confirm my attendance",
      rsvpConfirmed: "Attendance confirmed!",
    },
  },

  seo: {
    key: "seo",
    badge: "Web development",
    title: "Show up when people search for you",
    intro:
      "Work delivered every month — content published, links earned, a report of what was done — never a promised ranking. Start with the audit or go straight to a monthly plan.",
    tiers: [
      {
        key: "audit",
        name: "SEO audit",
        priceKey: "seoAudit",
        delivery: "5 to 7 business days",
        includes: [
          "Full technical review: speed, indexing, URL structure",
          "Audit of current content and keywords",
          "Opportunity matrix ranked by impact",
          "Report with prioritized recommendations",
        ],
        cta: "Request an SEO audit",
      },
      {
        key: "local",
        name: "Local",
        priceKey: "seoLocal",
        delivery: "Monthly",
        perMonth: true,
        includes: [
          "Google Business Profile optimized and managed",
          "Local SEO for one city",
          "Ongoing on-page optimization",
          "4 pieces of content published per month",
          "Monthly report of work delivered",
        ],
        cta: "Request the Local plan",
      },
      {
        key: "growth",
        name: "Growth",
        priceKey: "seoGrowth",
        delivery: "Monthly",
        perMonth: true,
        featured: true,
        includes: [
          "Ongoing technical SEO",
          "8 pieces of content published per month",
          "3 links earned per month",
          "Quarterly editorial calendar",
          "A/B testing on landing pages",
          "Monthly report of work delivered",
        ],
        adds: [
          "8 pieces of content and 3 links a month, not 4 and none",
          "Ongoing technical SEO and a quarterly editorial calendar",
          "A/B testing on landing pages",
        ],
        cta: "Request the Growth plan",
      },
      {
        key: "authority",
        name: "Authority",
        priceKey: "seoAuthority",
        delivery: "Monthly",
        perMonth: true,
        includes: [
          "15 pieces of content published per month",
          "8 links earned per month",
          "Digital PR",
          "Video and branded content",
          "Executive dashboard",
          "Monthly report of work delivered",
        ],
        adds: ["15 pieces of content and 8 links a month", "Digital PR, video, and branded content", "Executive dashboard"],
        cta: "Request the Authority plan",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before hiring SEO",
    faqs: [
      {
        question: "Do you guarantee a ranking on Google?",
        answer:
          "No, and no serious provider does: ranking depends on factors nobody outside Google controls. What we do guarantee is the work: the content, the links, and the technical improvements get delivered every month, with a report.",
      },
      {
        question: "Do I need the audit before a monthly plan?",
        answer:
          "It's not required, but it helps pick the right plan if you don't know where your site stands today. If you already know what you need, you can start directly on Local, Growth, or Authority.",
      },
      {
        question: "Who writes the content?",
        answer:
          "Our team, based on the information and focus you give us about your business. You review and approve before anything is published.",
      },
      {
        question: "Is there a minimum commitment?",
        answer:
          "Plans are monthly and can be canceled month to month. SEO compounds over time, so we recommend at least 3 months to evaluate it with real data.",
      },
    ],
    related: [{ routeKey: ROUTE_KEYS.WEBSITES, label: "Websites" }],
    ctaTitle: "Want to know where your SEO stands today?",
    ctaText: "Tell us about your site and we'll tell you whether to start with the audit or a monthly plan.",
  },

  integrations: {
    key: "integrations",
    badge: "Web development",
    title: "Get your systems talking to each other",
    intro:
      "Your billing system doesn't talk to your CRM. Your inventory doesn't update itself when you sell online. We connect what you already have so nobody has to copy data from one place to another.",
    tiers: [
      {
        key: "integration",
        name: "Individual integration",
        priceKey: "integration",
        delivery: "1 to 2 weeks",
        includes: [
          "Connection between two systems: the one you have and the one it needs to talk to",
          "Automatic data sync, with no manual entry",
          "Error handling and retries if a system fails",
          "Documentation of the connection",
        ],
        cta: "Request an integration",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before integrating two systems",
    faqs: [
      {
        question: "What counts as one integration?",
        answer:
          "The connection between two specific systems: your billing with your CRM, your online store with your inventory, your form with your spreadsheet. Connecting three or more systems in one flow is an automation project, not a standalone integration.",
      },
      {
        question: "Do both systems need to have an API?",
        answer:
          "It helps, but it's not always required: some systems can be connected through other means (webhooks, files, email). We review your specific case before quoting.",
      },
      {
        question: "What happens if one of the systems changes later?",
        answer:
          "The integration is documented, so adjusting it if a system changes how it connects is a scoped fix, not starting over.",
      },
    ],
    related: [
      { routeKey: ROUTE_KEYS.AUTOMATION, label: "Automation" },
      { routeKey: ROUTE_KEYS.CUSTOM_SOFTWARE, label: "Custom software" },
    ],
    ctaTitle: "Which two systems need to talk to each other?",
    ctaText: "Tell us which ones and we'll confirm whether it's a direct integration or something bigger.",
  },

  paymentGateways: {
    key: "paymentGateways",
    badge: "Web development",
    title: "Take payments on the site you already have",
    intro:
      "For anyone who already has a site with products or services and wants customers to pay right there, without leaving for another platform.",
    tiers: [
      {
        key: "gateway",
        name: "Payment gateway implementation",
        priceKey: "paymentGateway",
        delivery: "1 to 2 weeks",
        includes: [
          "Connection to the gateway used in Colombia and the region (cards, PSE, transfers)",
          "Payment flow integrated into your current catalog or cart",
          "Automatic order confirmation after payment",
          "Payment testing before going live",
        ],
        cta: "Request a payment gateway",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before taking payments online",
    faqs: [
      {
        question: "Do I need a site already built?",
        answer:
          "Yes, this service connects payments to a site or catalog you already have. If you don't have a site yet, see the websites service: the catalog tier already leaves the order ready to connect a gateway.",
      },
      {
        question: "Which gateways do you work with?",
        answer:
          "The ones used in Colombia and the region: cards, PSE, and transfers, based on what you already have set up or what we recommend given your volume.",
      },
      {
        question: "Who opens the account with the gateway?",
        answer:
          "That account is yours and stays under your company's name, not Dexel's: it's your money and your commercial terms with the payment provider. We handle the technical connection.",
      },
    ],
    related: [{ routeKey: ROUTE_KEYS.WEBSITES, label: "Websites" }],
    ctaTitle: "Already have a site and want to start taking payments online?",
    ctaText: "Tell us which gateway you use or want to use, and we'll confirm the scope.",
  },

  maintenanceDetail: {
    key: "maintenanceDetail",
    badge: "Web development",
    title: "Ongoing support for what's already in production",
    intro:
      "Three tiers, based on how critical it is that your site, application, or agent never stops. Monthly, no lock-in.",
    tiers: [
      {
        key: "basic",
        name: "Basic",
        priceKey: "careBasic",
        delivery: "Monthly",
        perMonth: true,
        includes: [
          "For static sites: a landing or informational site",
          "Security updates",
          "Bug fixes",
          "Automatic monthly backup",
        ],
        cta: "Request Basic maintenance",
      },
      {
        key: "standard",
        name: "Standard",
        priceKey: "careStandard",
        delivery: "Monthly",
        perMonth: true,
        featured: true,
        includes: [
          "For sites with an admin panel or custom applications",
          "Everything in Basic",
          "Weekly automatic backups",
          "Performance and uptime monitoring",
          "Priority technical support",
        ],
        adds: [
          "Built for sites with a panel or applications, not just static pages",
          "Weekly backups and uptime monitoring",
          "Priority technical support",
        ],
        cta: "Request Standard maintenance",
      },
      {
        key: "priority",
        name: "Priority",
        priceKey: "carePriority",
        delivery: "Monthly",
        perMonth: true,
        includes: [
          "For agents and automations with token or API consumption",
          "Everything in Standard",
          "Monitoring of token consumption and active integrations",
          "Minor adjustments included, no separate quote",
          "Faster response time if something goes down",
        ],
        adds: [
          "Built for agents and automations with token or API consumption",
          "Monitoring of consumption and active integrations",
          "Minor adjustments included and faster response if something goes down",
        ],
        cta: "Request Priority maintenance",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before hiring maintenance",
    faqs: [
      {
        question: "Which tier fits me?",
        answer:
          "It depends on what you have in production: a site with no admin panel is different from one with a panel, and an agent that consumes tokens or calls third-party APIs needs monitoring a static site doesn't. Tell us what we built and we'll confirm the tier.",
      },
      {
        question: "Is it required?",
        answer:
          "No. It's optional and monthly, with no lock-in. If you'd rather handle it with your own team, the documentation we deliver with the project lets you.",
      },
      {
        question: "What if I need a change that isn't maintenance?",
        answer:
          "A new feature or a change in scope is quoted separately, like any project. Maintenance covers keeping what's already built running, not growing it.",
      },
    ],
    related: [
      { routeKey: ROUTE_KEYS.WEBSITES, label: "Websites" },
      { routeKey: ROUTE_KEYS.CUSTOM_SOFTWARE, label: "Custom software" },
    ],
    ctaTitle: "What do you have in production today?",
    ctaText: "Tell us what we built or what you're running, and we'll confirm the tier.",
  },
};

export const serviceDetailsCopy = { es, en };
