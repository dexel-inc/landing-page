/**
 * Copy for the seven individual service pages in the web-development hub:
 * websites, custom software, micropages, SEO, integrations, payment gateways,
 * and maintenance.
 *
 * Every entry follows the same shape: `{ key, badge, title, intro, tiers,
 * faqs }`. `tiers` carries a `priceKey` — not an already
 * formatted price — because `ServiceDetailPage` computes the price with
 * `formatPrice` for the active language, and the same `priceKey` feeds the
 * `Offer` in `seo/seo.js`.
 *
 * No figure is ever hand-written: they all come from `config/pricing.js`.
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
        from: true,
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
        from: true,
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
        from: true,
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
        from: true,
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
    ctaTitle: "¿Qué tiene en producción hoy?",
    ctaText: "Cuéntenos qué construimos o qué tiene funcionando, y le confirmamos el nivel.",
  },

  whatsappAutomation: {
    key: "whatsappAutomation",
    badge: "Automatización",
    title: "Que su WhatsApp responda solo, sin perder el tono de su negocio",
    intro:
      "Horarios, preguntas frecuentes, calificación de leads, confirmación de citas. Con reglas fijas cuando el proceso es predecible, con IA cuando la conversación es abierta: usted describe el proceso y nosotros elegimos con qué se construye.",
    tiers: [
      {
        key: "puntual",
        name: "Automatización de WhatsApp",
        priceKey: "whatsappBasic",
        delivery: "2 a 3 semanas",
        includes: [
          "Un flujo de WhatsApp de principio a fin: recibe, responde y deriva a una persona cuando hace falta",
          "Reglas fijas, respuestas con IA, o una combinación, según lo que pida el proceso",
          "1 a 2 integraciones con su calendario, CRM o sistema de turnos",
          "30 días de soporte",
          "Capacitación en vivo para su equipo",
          "50% al iniciar, 50% contra entrega",
        ],
        cta: "Solicitar automatización de WhatsApp",
      },
      {
        key: "agente",
        name: "Agente de WhatsApp",
        priceKey: "whatsappAgent",
        featured: true,
        delivery: "4 a 6 semanas",
        includes: [
          "Todo lo del pack anterior",
          "Un agente que además de responder consulta sus sistemas, decide y ejecuta la acción que cierra el proceso",
          "3 a 4 integraciones",
          "Construcción de las herramientas que su sistema no expone",
          "60 días de soporte",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        adds: [
          "Un agente que agenda, cotiza o hace el pedido, no solo responde",
          "3 a 4 integraciones y las herramientas que su sistema no expone",
          "60 días de soporte",
        ],
        cta: "Solicitar agente de WhatsApp",
      },
      {
        key: "sistema",
        name: "Sistema de atención completo",
        priceKey: "whatsappSystem",
        from: true,
        delivery: "6 a 10 semanas",
        includes: [
          "Todo lo del pack anterior",
          "Varios agentes coordinados entre sí, atendiendo distintos procesos además de WhatsApp",
          "Integraciones profundas con el resto de su operación",
          "90 días de soporte",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        adds: [
          "Varios agentes coordinados, no uno solo",
          "Integraciones profundas con el resto de su operación",
          "90 días de soporte",
        ],
        cta: "Solicitar sistema de atención completo",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de automatizar WhatsApp",
    faqs: [
      {
        question: "¿Necesito la API oficial de WhatsApp Business?",
        answer:
          "Para un volumen serio de conversaciones, sí: es lo que permite automatizar sin que Meta bloquee el número. La damos de alta como parte del proyecto si todavía no la tiene.",
      },
      {
        question: "¿Qué pasa si el cliente pide hablar con una persona?",
        answer:
          "El flujo siempre tiene una salida a un humano. Un chatbot que atrapa a alguien en un árbol de opciones sin salida es peor que no tener automatización.",
      },
      {
        question: "¿Puede funcionar sin IA?",
        answer:
          "Sí, y muchas veces conviene: horarios, estados de pedido o preguntas frecuentes se responden mejor con reglas fijas, que cuestan menos y no alucinan. La IA entra donde la conversación es abierta.",
      },
      {
        question: "¿Cuánto se demora en estar funcionando?",
        answer:
          "Una automatización puntual, de 2 a 3 semanas. Un agente que además ejecuta acciones en sus sistemas, de 4 a 6 semanas, según cuántas integraciones necesite.",
      },
      {
        question: "¿Se conecta con mi CRM o mi sistema de agendamiento?",
        answer:
          "Sí, es parte del alcance desde el primer pack: sin esa conexión, alguien termina copiando a mano lo que el bot ya recogió.",
      },
    ],
    ctaTitle: "¿Cuántas horas al día se van en responder WhatsApp?",
    ctaText: "Cuéntenos cómo es hoy esa conversación y le decimos qué se puede automatizar y en cuánto tiempo.",
  },

  customAgents: {
    key: "customAgents",
    badge: "Automatización",
    title: "Un agente que no solo responde: ejecuta",
    intro:
      "Un agente genérico usa herramientas que ya existen: leer un calendario, buscar en documentos, enviar un correo. Un agente a la medida usa herramientas que hay que construir, porque solo existen dentro de la operación de su empresa.",
    tiers: [
      {
        key: "puntual",
        name: "Agente a la medida",
        priceKey: "automationAgent",
        delivery: "4 a 6 semanas",
        includes: [
          "Un agente que consulta sus sistemas, decide y ejecuta la acción que cierra el proceso",
          "1 a 2 integraciones con sistemas existentes",
          "Construcción de las herramientas que su sistema no expone: es el mismo trabajo de desarrollo que hacemos todos los días",
          "Límites definidos y confirmación humana en las acciones críticas",
          "45 días de soporte",
          "Capacitación en vivo para su equipo",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        cta: "Solicitar agente a la medida",
      },
      {
        key: "agente",
        name: "Agente con herramientas propias",
        priceKey: "customAgentsStandard",
        featured: true,
        delivery: "6 a 8 semanas",
        includes: [
          "Todo lo del pack anterior",
          "3 a 4 integraciones, incluyendo sistemas sin API pública",
          "Herramientas adicionales construidas a la medida, para ampliar lo que el agente puede hacer",
          "60 días de soporte",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        adds: [
          "3 a 4 integraciones, incluyendo sistemas sin API pública",
          "Herramientas adicionales construidas a la medida",
          "60 días de soporte",
        ],
        cta: "Solicitar agente con más herramientas",
      },
      {
        key: "sistema",
        name: "Sistema multiagente",
        priceKey: "customAgentsSystem",
        from: true,
        delivery: "8 a 12 semanas",
        includes: [
          "Todo lo del pack anterior",
          "Varios agentes coordinados entre sí, no uno solo",
          "Desarrollo propio de los componentes que hagan falta",
          "Integraciones profundas con la operación",
          "90 días de soporte",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        adds: [
          "Varios agentes coordinados entre sí",
          "Desarrollo propio de los componentes que hagan falta",
          "Integraciones profundas con toda la operación",
        ],
        cta: "Solicitar sistema multiagente",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de construir un agente",
    faqs: [
      {
        question: "¿Cuál es la diferencia entre un chatbot y un agente?",
        answer:
          "Un chatbot responde. Un agente entiende, decide y ejecuta una acción en sus sistemas: crea el pedido, descuenta el inventario, arma la cotización. La diferencia no es la tecnología, es dónde termina el proceso.",
      },
      {
        question: "¿Qué pasa si el agente se equivoca?",
        answer:
          "Por eso se construyen con límites definidos, confirmación humana en las acciones críticas y registro de todo lo que ejecuta. Un agente que actúa sobre sistemas reales puede equivocarse haciendo, no solo diciendo, y hay que diseñarlo sabiendo eso.",
      },
      {
        question: "¿Qué herramientas necesita el agente?",
        answer:
          "Las que ya existen en sus sistemas —si tienen API— y las que no existen, que construimos nosotros. Cuando el sistema de un cliente no expone lo que el agente necesita, ahí es donde una agencia de automatización se queda sin oferta y nosotros seguimos, porque es el mismo trabajo de desarrollo que hacemos siempre.",
      },
      {
        question: "¿Cuánto se demora construir uno?",
        answer:
          "De 4 a 6 semanas para un agente con 1 a 2 integraciones. Con más herramientas propias o varios agentes coordinados entre sí, de 6 a 12 semanas, según cuántos procesos cubran.",
      },
      {
        question: "¿Cómo se controla lo que el agente puede hacer?",
        answer:
          "Con permisos y alcance definidos desde el diseño: qué sistemas puede tocar, qué acciones puede ejecutar solo y cuáles necesitan que alguien las confirme antes de salir.",
      },
    ],
    ctaTitle: "¿Qué proceso termina siempre en una acción, no en una respuesta?",
    ctaText: "Cuéntenoslo y le decimos si conviene un agente, qué herramientas hay que construirle y cuánto costaría.",
  },

  n8nWorkflows: {
    key: "n8nWorkflows",
    badge: "Automatización",
    title: "Automatización que corre en su propia infraestructura",
    intro:
      "n8n se aloja donde usted decide, no en la nube de un tercero que cobra por cada operación ejecutada. La automatización que hoy le sale barata no se vuelve cara justo cuando empieza a funcionar y el volumen sube.",
    tiers: [
      {
        key: "puntual",
        name: "Automatización puntual",
        priceKey: "automation",
        delivery: "2 a 3 semanas",
        includes: [
          "1 flujo de trabajo automatizado de principio a fin",
          "1 a 2 integraciones con sistemas existentes",
          "Manejo de errores y reintentos: si el flujo falla, alguien se entera",
          "30 días de soporte",
          "Capacitación en vivo para su equipo",
          "50% al iniciar, 50% contra entrega",
        ],
        cta: "Solicitar workflow con n8n",
      },
      {
        key: "agente",
        name: "Agente a la medida",
        priceKey: "automationAgent",
        featured: true,
        delivery: "4 a 6 semanas",
        includes: [
          "Todo lo del pack anterior",
          "Flujos con lógica condicional y pasos de aprobación humana antes de ejecutar una acción sensible",
          "3 a 4 integraciones",
          "Un agente que decide dentro del flujo, no solo lo dispara",
          "60 días de soporte",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        adds: [
          "Lógica condicional y aprobación humana antes de una acción sensible",
          "3 a 4 integraciones",
          "Un agente que decide dentro del flujo",
        ],
        cta: "Solicitar flujo con agente",
      },
      {
        key: "sistema",
        name: "Sistema completo",
        priceKey: "automationSystem",
        from: true,
        delivery: "6 a 10 semanas",
        includes: [
          "Todo lo del pack anterior",
          "Varios flujos coordinados entre sí, cubriendo procesos completos y no pasos sueltos",
          "Tablero de monitoreo de qué corrió, cuándo y con qué resultado",
          "Integraciones profundas con toda la operación",
          "90 días de soporte",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        adds: [
          "Varios flujos coordinados cubriendo procesos completos",
          "Tablero de monitoreo de qué corrió y con qué resultado",
          "Integraciones profundas con toda la operación",
        ],
        cta: "Solicitar sistema completo",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de automatizar con n8n",
    faqs: [
      {
        question: "¿Qué es n8n, en una frase?",
        answer:
          "Una herramienta de automatización de flujos que se puede alojar en su propia infraestructura, en vez de pagarle a un tercero por cada operación que ejecuta.",
      },
      {
        question: "¿Por qué n8n y no Zapier o Make?",
        answer:
          "Porque esas plataformas cobran por operación ejecutada: lo que hoy le sale barato se vuelve caro justo cuando el volumen sube. Alojado en su propia infraestructura, el costo no crece con el uso.",
      },
      {
        question: "¿Quién administra los flujos después de entregados?",
        answer:
          "Quedan documentados y a nombre de su empresa. Su equipo puede operarlos con la capacitación que incluye el proyecto, o dejarlos con nosotros bajo un plan de mantenimiento mensual.",
      },
      {
        question: "¿Qué pasa si un flujo falla en producción?",
        answer:
          "Todo flujo se entrega con manejo de errores, reintentos y alertas: si algo falla, alguien de su equipo se entera el mismo día. Un flujo que falla en silencio es peor que no tenerlo.",
      },
      {
        question: "¿Puedo pedir cambios después de que el flujo esté funcionando?",
        answer:
          "Sí, es trabajo de mantenimiento o un ajuste de alcance, según el tamaño del cambio. Al quedar documentado, modificarlo no es empezar de nuevo.",
      },
    ],
    ctaTitle: "¿Qué proceso manual le gustaría dejar de tocar?",
    ctaText: "Descríbanoslo y le decimos si se puede automatizar con n8n, con qué integra y cuánto costaría.",
  },

  systemIntegration: {
    key: "systemIntegration",
    badge: "Automatización",
    title: "Que sus sistemas se hablen entre sí",
    intro:
      "Su facturación no habla con su CRM, su inventario no se actualiza solo cuando vende en línea. Esto no es construir nada nuevo: es que lo que ya tiene deje de necesitar que alguien copie datos de un lado a otro. (Si lo que necesita es conectar un desarrollo nuevo con sus sistemas actuales, ese es el frente de Integraciones y APIs de desarrollo web; este frente conecta sistemas que ya existen entre sí.)",
    tiers: [
      {
        key: "puntual",
        name: "Integración puntual",
        priceKey: "systemIntegrationBasic",
        delivery: "2 a 3 semanas",
        includes: [
          "1 a 2 integraciones entre los sistemas que ya tiene",
          "Sincronización de datos automática, sin digitación manual",
          "Manejo de errores y reintentos si un sistema falla",
          "30 días de soporte",
          "50% al iniciar, 50% contra entrega",
        ],
        cta: "Solicitar integración entre sistemas",
      },
      {
        key: "agente",
        name: "Integración con agente",
        priceKey: "systemIntegrationStandard",
        featured: true,
        delivery: "4 a 6 semanas",
        includes: [
          "Todo lo del pack anterior",
          "3 a 4 integraciones, incluyendo sistemas sin API pública",
          "Un agente que consulta varios sistemas a la vez y decide con esa información",
          "60 días de soporte",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        adds: [
          "3 a 4 integraciones, incluyendo sistemas sin API pública",
          "Un agente que consulta varios sistemas y decide con esa información",
        ],
        cta: "Solicitar integraciones con agente",
      },
      {
        key: "sistema",
        name: "Integración de toda la operación",
        priceKey: "systemIntegrationSystem",
        from: true,
        delivery: "6 a 10 semanas",
        includes: [
          "Todo lo del pack anterior",
          "Integraciones profundas con toda la operación, no sistemas sueltos",
          "Varios agentes coordinados usando esa información en conjunto",
          "90 días de soporte",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        adds: [
          "Integraciones profundas con toda la operación",
          "Varios agentes coordinados usando esa información en conjunto",
        ],
        cta: "Solicitar integración completa",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de integrar sistemas",
    faqs: [
      {
        question: "¿Qué diferencia hay con \"Integraciones y APIs\" de desarrollo web?",
        answer:
          "Ese frente conecta algo nuevo que construimos con lo que usted ya tiene. Este conecta sistemas que ya existen entre sí, sin construir nada nuevo: es automatización, no desarrollo.",
      },
      {
        question: "¿Qué pasa si mi sistema no tiene API pública?",
        answer:
          "Muchas veces igual se puede: por webhooks, archivos, correo o incluso automatización de la interfaz cuando no queda otra vía. Revisamos su caso puntual antes de cotizar.",
      },
      {
        question: "¿Cuántas integraciones necesito?",
        answer:
          "Depende de cuántos sistemas tiene que dejen de requerir copiar datos a mano. Cuéntenos cuáles son y le confirmamos si entran en el pack puntual o si necesita el de agente.",
      },
      {
        question: "¿Qué pasa si un sistema cambia después?",
        answer:
          "La integración queda documentada, así que ajustarla si un sistema cambia su forma de conectarse es un trabajo acotado, no empezar de nuevo.",
      },
      {
        question: "¿Necesito la auditoría antes de integrar?",
        answer:
          "No es obligatoria. Si ya sabe qué dos sistemas necesita que se hablen, se cotiza directo. La auditoría ayuda cuando hay varios sistemas sueltos y no está seguro de por dónde empezar.",
      },
    ],
    ctaTitle: "¿Qué dos sistemas necesita que dejen de vivir aislados?",
    ctaText: "Cuéntenos cuáles son y le confirmamos si es una integración puntual o algo más grande.",
  },

  automatedReports: {
    key: "automatedReports",
    badge: "Automatización",
    title: "El informe que hoy arma alguien a mano, cada semana",
    intro:
      "Consolidar números de varios sistemas en una hoja de cálculo y mandarlos por correo cada lunes es trabajo que no necesita a una persona haciéndolo cada vez. El reporte se genera solo, con los mismos datos que ya tiene.",
    tiers: [
      {
        key: "puntual",
        name: "Reporte automático",
        priceKey: "automatedReportsBasic",
        delivery: "2 a 3 semanas",
        includes: [
          "1 reporte automatizado, con la periodicidad que necesite (diaria, semanal o mensual)",
          "Consolidación de 1 a 2 fuentes de datos en un solo entregable",
          "Entrega por correo, WhatsApp o tablero, según lo que prefiera",
          "30 días de soporte",
          "50% al iniciar, 50% contra entrega",
        ],
        cta: "Solicitar reporte automático",
      },
      {
        key: "agente",
        name: "Tablero con alertas",
        priceKey: "automatedReportsStandard",
        featured: true,
        delivery: "4 a 6 semanas",
        includes: [
          "Todo lo del pack anterior",
          "3 a 4 fuentes de datos consolidadas en un solo reporte o tablero",
          "Alertas automáticas cuando una métrica sale del rango que usted defina",
          "60 días de soporte",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        adds: [
          "3 a 4 fuentes de datos en un solo reporte",
          "Alertas cuando una métrica sale de rango",
        ],
        cta: "Solicitar tablero con alertas",
      },
      {
        key: "sistema",
        name: "Reportes de toda la operación",
        priceKey: "automatedReportsSystem",
        from: true,
        delivery: "6 a 10 semanas",
        includes: [
          "Todo lo del pack anterior",
          "Varios reportes y tableros coordinados, para distintas áreas de la operación",
          "Integraciones profundas con las fuentes de datos de toda la empresa",
          "90 días de soporte",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        adds: [
          "Varios reportes y tableros coordinados para distintas áreas",
          "Integraciones profundas con toda la operación",
        ],
        cta: "Solicitar sistema de reportes",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de automatizar un reporte",
    faqs: [
      {
        question: "¿De dónde saca los datos el reporte?",
        answer:
          "De los sistemas que ya usa: su CRM, su facturación, sus hojas de cálculo o la herramienta que hoy alguien revisa a mano. No hay que migrar nada para automatizarlo.",
      },
      {
        question: "¿En qué formato llega?",
        answer:
          "El que necesite: PDF o Excel por correo, mensaje por WhatsApp, o un tablero que se actualiza solo y consulta cuando quiera. Se define en la cotización.",
      },
      {
        question: "¿Puedo pedir que cambien las métricas después?",
        answer:
          "Sí, es un ajuste de alcance normal. El reporte queda documentado, así que agregar o quitar una métrica no es rehacerlo desde cero.",
      },
      {
        question: "¿Reemplaza mi herramienta de analítica o de BI?",
        answer:
          "No necesariamente. Muchas veces el reporte automático consulta esa misma herramienta y entrega el resumen ya armado, para que nadie tenga que entrar a revisarla manualmente.",
      },
      {
        question: "¿Qué tan seguido se genera?",
        answer:
          "Con la periodicidad que decida: diaria, semanal, mensual, o disparado por un evento puntual (por ejemplo, al cerrar el día de ventas).",
      },
    ],
    ctaTitle: "¿Qué reporte arma alguien de su equipo a mano cada semana?",
    ctaText: "Cuéntenos cómo lo arman hoy y le decimos si se puede automatizar y en qué formato le llegaría.",
  },

  documentReading: {
    key: "documentReading",
    badge: "Automatización",
    title: "Cero digitación: los datos salen solos de sus documentos",
    intro:
      "Facturas, recibos, formularios en papel o PDFs de proveedores. Extraemos los datos y los cargamos directo en su sistema, sin que nadie los transcriba a mano ni cometa el error de siempre al hacerlo.",
    tiers: [
      {
        key: "puntual",
        name: "Lectura de documentos",
        priceKey: "documentReadingBasic",
        delivery: "2 a 3 semanas",
        includes: [
          "Lectura automática de 1 tipo de documento (facturas, recibos o formularios)",
          "Extracción de los campos que defina y carga en el sistema de destino",
          "Validación básica contra lo que ya existe en su sistema",
          "30 días de soporte",
          "50% al iniciar, 50% contra entrega",
        ],
        cta: "Solicitar lectura de documentos",
      },
      {
        key: "agente",
        name: "Lectura con agente",
        priceKey: "documentReadingStandard",
        featured: true,
        delivery: "4 a 6 semanas",
        includes: [
          "Todo lo del pack anterior",
          "2 a 3 tipos de documento distintos, incluyendo manuscritos o de calidad variable",
          "Un agente que valida los datos extraídos y decide qué hacer con las excepciones",
          "60 días de soporte",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        adds: [
          "2 a 3 tipos de documento, incluyendo manuscritos o de calidad variable",
          "Un agente que decide qué hacer con las excepciones",
        ],
        cta: "Solicitar lectura con agente",
      },
      {
        key: "sistema",
        name: "Lectura de grandes volúmenes",
        priceKey: "documentReadingSystem",
        from: true,
        delivery: "6 a 10 semanas",
        includes: [
          "Todo lo del pack anterior",
          "Grandes volúmenes de documentos, de cualquier tipo, en un flujo continuo",
          "Integración directa con su sistema contable u operativo",
          "90 días de soporte",
          "40% al iniciar, 30% a mitad de proyecto, 30% contra entrega",
        ],
        adds: [
          "Grandes volúmenes en un flujo continuo, no lotes puntuales",
          "Integración directa con su sistema contable u operativo",
        ],
        cta: "Solicitar lectura a gran escala",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqSubtitle: "Lo que nos preguntan antes de automatizar la lectura de documentos",
    faqs: [
      {
        question: "¿Qué tan exacta es la extracción?",
        answer:
          "Depende de la calidad del documento de origen. Por eso el pack puntual valida contra lo que ya existe en su sistema y el de agente decide qué hacer con las excepciones: nunca se carga un dato sin poder confirmarlo.",
      },
      {
        question: "¿Funciona con documentos manuscritos o de mala calidad?",
        answer:
          "Sí, con reconocimiento de caracteres manuscritos, aunque la precisión baja frente a un documento digital limpio. Es justo lo que cubre el pack de agente, con validación de excepciones.",
      },
      {
        question: "¿A dónde van los datos extraídos?",
        answer:
          "Al sistema que usted defina: su contabilidad, su ERP, una hoja de cálculo o el sistema que hoy alimenta a mano. No se quedan en un archivo suelto que alguien tiene que volver a copiar.",
      },
      {
        question: "¿Cómo manejan la información sensible?",
        answer:
          "El procesamiento corre en la infraestructura del proyecto, con los mismos controles de acceso que el resto de la automatización, y los documentos no se comparten con nadie fuera del alcance acordado.",
      },
      {
        question: "¿Sirve para grandes volúmenes?",
        answer:
          "Sí, es justo el pack de sistema completo: un flujo continuo en vez de lotes puntuales, con integración directa a su sistema contable u operativo.",
      },
    ],
    ctaTitle: "¿Cuántas horas al mes se van digitando facturas o formularios?",
    ctaText: "Cuéntenos qué documentos son y le decimos qué tan automatizable es y cuánto costaría.",
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
        from: true,
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
        from: true,
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
        from: true,
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
        from: true,
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
    ctaTitle: "What do you have in production today?",
    ctaText: "Tell us what we built or what you're running, and we'll confirm the tier.",
  },

  whatsappAutomation: {
    key: "whatsappAutomation",
    badge: "Automation",
    title: "Your WhatsApp, answering on its own, without losing your tone",
    intro:
      "Hours, FAQs, lead qualification, appointment confirmation. Fixed rules when the process is predictable, AI when the conversation is open-ended: you describe the process and we choose what it's built with.",
    tiers: [
      {
        key: "puntual",
        name: "WhatsApp automation",
        priceKey: "whatsappBasic",
        delivery: "2 to 3 weeks",
        includes: [
          "One WhatsApp flow end to end: it receives, answers, and hands off to a person when it needs to",
          "Fixed rules, AI replies, or a mix, depending on what the process calls for",
          "1 to 2 integrations with your calendar, CRM, or booking system",
          "30 days of support",
          "Live training for your team",
          "50% up front, 50% on delivery",
        ],
        cta: "Request WhatsApp automation",
      },
      {
        key: "agente",
        name: "WhatsApp agent",
        priceKey: "whatsappAgent",
        featured: true,
        delivery: "4 to 6 weeks",
        includes: [
          "Everything in the previous pack",
          "An agent that, besides answering, queries your systems, decides, and carries out the action that closes the process",
          "3 to 4 integrations",
          "Building the tools your system doesn't expose",
          "60 days of support",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        adds: [
          "An agent that books, quotes, or places the order, not just answers",
          "3 to 4 integrations and the tools your system doesn't expose",
          "60 days of support",
        ],
        cta: "Request a WhatsApp agent",
      },
      {
        key: "sistema",
        name: "Full support system",
        priceKey: "whatsappSystem",
        from: true,
        delivery: "6 to 10 weeks",
        includes: [
          "Everything in the previous pack",
          "Several agents coordinated with each other, covering other processes beyond WhatsApp",
          "Deep integrations with the rest of your operation",
          "90 days of support",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        adds: [
          "Several agents coordinated with each other, not just one",
          "Deep integrations with the rest of your operation",
          "90 days of support",
        ],
        cta: "Request the full support system",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before automating WhatsApp",
    faqs: [
      {
        question: "Do I need the official WhatsApp Business API?",
        answer:
          "For any serious volume of conversations, yes: it's what lets you automate without Meta blocking the number. We set it up as part of the project if you don't have it yet.",
      },
      {
        question: "What happens if the customer asks for a person?",
        answer:
          "The flow always has an exit to a human. A chatbot that traps someone in an option tree with no way out is worse than having no automation.",
      },
      {
        question: "Can it work without AI?",
        answer:
          "Yes, and often it should: opening hours, order status, or FAQs are better answered with fixed rules, which cost less and don't hallucinate. AI earns its place where the conversation is open-ended.",
      },
      {
        question: "How long until it's up and running?",
        answer:
          "A single automation, 2 to 3 weeks. An agent that also executes actions in your systems, 4 to 6 weeks, depending on how many integrations it needs.",
      },
      {
        question: "Does it connect to my CRM or booking system?",
        answer:
          "Yes, it's part of the scope from the first pack: without that connection, someone ends up retyping by hand what the bot already collected.",
      },
    ],
    ctaTitle: "How many hours a day go into answering WhatsApp?",
    ctaText: "Tell us what that conversation looks like today and we'll say what can be automated, and how long it takes.",
  },

  customAgents: {
    key: "customAgents",
    badge: "Automation",
    title: "An agent that doesn't just answer: it executes",
    intro:
      "A generic agent uses tools that already exist: reading a calendar, searching documents, sending an email. A custom agent uses tools that have to be built, because they only exist inside your company's operation.",
    tiers: [
      {
        key: "puntual",
        name: "Custom agent",
        priceKey: "automationAgent",
        delivery: "4 to 6 weeks",
        includes: [
          "An agent that queries your systems, decides, and carries out the action that closes the process",
          "1 to 2 integrations with existing systems",
          "Building the tools your system doesn't expose: the same development work we do every day",
          "Defined limits and human confirmation on critical actions",
          "45 days of support",
          "Live training for your team",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        cta: "Request a custom agent",
      },
      {
        key: "agente",
        name: "Agent with custom tools",
        priceKey: "customAgentsStandard",
        featured: true,
        delivery: "6 to 8 weeks",
        includes: [
          "Everything in the previous pack",
          "3 to 4 integrations, including systems with no public API",
          "Additional custom-built tools, expanding what the agent can do",
          "60 days of support",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        adds: [
          "3 to 4 integrations, including systems with no public API",
          "Additional custom-built tools",
          "60 days of support",
        ],
        cta: "Request an agent with more tools",
      },
      {
        key: "sistema",
        name: "Multi-agent system",
        priceKey: "customAgentsSystem",
        from: true,
        delivery: "8 to 12 weeks",
        includes: [
          "Everything in the previous pack",
          "Several agents coordinated with each other, not just one",
          "Custom development of whatever components are missing",
          "Deep integrations with your operation",
          "90 days of support",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        adds: [
          "Several agents coordinated with each other",
          "Custom development of whatever components are missing",
          "Deep integrations with your entire operation",
        ],
        cta: "Request a multi-agent system",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before building an agent",
    faqs: [
      {
        question: "What's the difference between a chatbot and an agent?",
        answer:
          "A chatbot answers. An agent understands, decides, and carries out an action in your systems: creates the order, deducts inventory, builds the quote. The difference isn't the technology, it's where the process ends.",
      },
      {
        question: "What happens if the agent gets it wrong?",
        answer:
          "That's why they're built with defined limits, human confirmation on critical actions, and a log of everything they execute. An agent acting on real systems can get things wrong by doing, not just by saying, and it has to be designed knowing that.",
      },
      {
        question: "What tools does the agent need?",
        answer:
          "The ones that already exist in your systems — if they have an API — and the ones that don't, which we build. When a client's system doesn't expose what the agent needs, that's where an automation agency runs out of offer, and we keep going, because it's the same development work we already do.",
      },
      {
        question: "How long does it take to build one?",
        answer:
          "4 to 6 weeks for an agent with 1 to 2 integrations. With more custom tools or several agents coordinated with each other, 6 to 12 weeks, depending on how many processes they cover.",
      },
      {
        question: "How is what the agent can do controlled?",
        answer:
          "With defined permissions and scope from the design stage: what systems it can touch, what actions it can execute on its own, and which ones need someone to confirm before they go out.",
      },
    ],
    ctaTitle: "Which process always ends in an action, not an answer?",
    ctaText: "Tell us, and we'll say whether an agent fits, what tools it would need, and what it would cost.",
  },

  n8nWorkflows: {
    key: "n8nWorkflows",
    badge: "Automation",
    title: "Automation that runs on your own infrastructure",
    intro:
      "n8n runs wherever you decide, not on a third party's cloud that charges per operation executed. The automation that looks cheap today doesn't get expensive right when it starts working and volume goes up.",
    tiers: [
      {
        key: "puntual",
        name: "Single automation",
        priceKey: "automation",
        delivery: "2 to 3 weeks",
        includes: [
          "1 workflow automated end to end",
          "1 to 2 integrations with existing systems",
          "Error handling and retries: if the flow fails, somebody finds out",
          "30 days of support",
          "Live training for your team",
          "50% up front, 50% on delivery",
        ],
        cta: "Request an n8n workflow",
      },
      {
        key: "agente",
        name: "Custom agent",
        priceKey: "automationAgent",
        featured: true,
        delivery: "4 to 6 weeks",
        includes: [
          "Everything in the previous pack",
          "Conditional logic and human-approval steps before executing a sensitive action",
          "3 to 4 integrations",
          "An agent that decides inside the flow, not just triggers it",
          "60 days of support",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        adds: [
          "Conditional logic and human approval before a sensitive action",
          "3 to 4 integrations",
          "An agent that decides inside the flow",
        ],
        cta: "Request a flow with an agent",
      },
      {
        key: "sistema",
        name: "Full system",
        priceKey: "automationSystem",
        from: true,
        delivery: "6 to 10 weeks",
        includes: [
          "Everything in the previous pack",
          "Several flows coordinated with each other, covering full processes rather than loose steps",
          "A monitoring dashboard showing what ran, when, and with what result",
          "Deep integrations with your entire operation",
          "90 days of support",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        adds: [
          "Several flows coordinated, covering full processes",
          "A monitoring dashboard of what ran and with what result",
          "Deep integrations with your entire operation",
        ],
        cta: "Request the full system",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before automating with n8n",
    faqs: [
      {
        question: "What is n8n, in one sentence?",
        answer:
          "A workflow automation tool that can run on your own infrastructure, instead of paying a third party for every operation it executes.",
      },
      {
        question: "Why n8n instead of Zapier or Make?",
        answer:
          "Because those platforms charge per operation executed: what looks cheap today gets expensive right when volume goes up. Hosted on your own infrastructure, cost doesn't grow with usage.",
      },
      {
        question: "Who manages the workflows after they're delivered?",
        answer:
          "They're documented and in your company's name. Your team can run them with the training included in the project, or leave them with us under a monthly maintenance plan.",
      },
      {
        question: "What happens if a workflow fails in production?",
        answer:
          "Every workflow ships with error handling, retries, and alerts: if something fails, someone on your team finds out the same day. A workflow that fails silently is worse than not having one.",
      },
      {
        question: "Can I request changes after the workflow is running?",
        answer:
          "Yes, it's either maintenance work or a scope adjustment, depending on the size of the change. Since it's documented, modifying it isn't starting over.",
      },
    ],
    ctaTitle: "Which manual process would you like to stop touching?",
    ctaText: "Describe it to us and we'll say whether it can be automated with n8n, what it connects to, and what it would cost.",
  },

  systemIntegration: {
    key: "systemIntegration",
    badge: "Automation",
    title: "Getting your systems to talk to each other",
    intro:
      "Your billing doesn't talk to your CRM, your inventory doesn't update itself when you sell online. This isn't building anything new: it's what you already have no longer needing someone to copy data from one place to another. (If what you need is connecting a new build to your current systems, that's the Integrations and APIs front under web development; this front connects systems that already exist with each other.)",
    tiers: [
      {
        key: "puntual",
        name: "Single integration",
        priceKey: "systemIntegrationBasic",
        delivery: "2 to 3 weeks",
        includes: [
          "1 to 2 integrations between the systems you already have",
          "Automatic data sync, with no manual retyping",
          "Error handling and retries if a system fails",
          "30 days of support",
          "50% up front, 50% on delivery",
        ],
        cta: "Request system integration",
      },
      {
        key: "agente",
        name: "Integration with an agent",
        priceKey: "systemIntegrationStandard",
        featured: true,
        delivery: "4 to 6 weeks",
        includes: [
          "Everything in the previous pack",
          "3 to 4 integrations, including systems with no public API",
          "An agent that queries several systems at once and decides using that information",
          "60 days of support",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        adds: [
          "3 to 4 integrations, including systems with no public API",
          "An agent that queries several systems and decides with that information",
        ],
        cta: "Request integrations with an agent",
      },
      {
        key: "sistema",
        name: "Full operation integration",
        priceKey: "systemIntegrationSystem",
        from: true,
        delivery: "6 to 10 weeks",
        includes: [
          "Everything in the previous pack",
          "Deep integrations across your whole operation, not standalone systems",
          "Several agents coordinated using that information together",
          "90 days of support",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        adds: [
          "Deep integrations across your whole operation",
          "Several agents coordinated using that information together",
        ],
        cta: "Request full integration",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before integrating systems",
    faqs: [
      {
        question: "How is this different from web development's \"Integrations and APIs\"?",
        answer:
          "That front connects something new we build to what you already have. This one connects systems that already exist with each other, with nothing new built: it's automation, not development.",
      },
      {
        question: "What if my system has no public API?",
        answer:
          "Often it's still possible: through webhooks, files, email, or even interface automation when there's no other way. We review your specific case before quoting.",
      },
      {
        question: "How many integrations do I need?",
        answer:
          "It depends on how many systems need to stop requiring someone to copy data by hand. Tell us which ones and we'll confirm whether it fits the single-automation pack or you need the agent pack.",
      },
      {
        question: "What happens if a system changes later?",
        answer:
          "The integration is documented, so adjusting it if a system changes how it connects is a scoped piece of work, not starting over.",
      },
      {
        question: "Do I need the audit before integrating?",
        answer:
          "It isn't mandatory. If you already know which two systems need to talk, we quote it directly. The audit helps when you have several disconnected systems and aren't sure where to start.",
      },
    ],
    ctaTitle: "Which two systems need to stop living in isolation?",
    ctaText: "Tell us which ones, and we'll confirm whether it's a single integration or something bigger.",
  },

  automatedReports: {
    key: "automatedReports",
    badge: "Automation",
    title: "The report somebody builds by hand every week today",
    intro:
      "Pulling numbers from several systems into a spreadsheet and emailing it out every Monday is work that doesn't need a person doing it each time. The report generates itself, from the same data you already have.",
    tiers: [
      {
        key: "puntual",
        name: "Automated report",
        priceKey: "automatedReportsBasic",
        delivery: "2 to 3 weeks",
        includes: [
          "1 automated report, at whatever frequency you need (daily, weekly, or monthly)",
          "Consolidating 1 to 2 data sources into a single deliverable",
          "Delivered by email, WhatsApp, or dashboard, whichever you prefer",
          "30 days of support",
          "50% up front, 50% on delivery",
        ],
        cta: "Request an automated report",
      },
      {
        key: "agente",
        name: "Dashboard with alerts",
        priceKey: "automatedReportsStandard",
        featured: true,
        delivery: "4 to 6 weeks",
        includes: [
          "Everything in the previous pack",
          "3 to 4 data sources consolidated into a single report or dashboard",
          "Automatic alerts when a metric moves outside the range you define",
          "60 days of support",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        adds: [
          "3 to 4 data sources in a single report",
          "Alerts when a metric moves outside range",
        ],
        cta: "Request a dashboard with alerts",
      },
      {
        key: "sistema",
        name: "Company-wide reporting",
        priceKey: "automatedReportsSystem",
        from: true,
        delivery: "6 to 10 weeks",
        includes: [
          "Everything in the previous pack",
          "Several reports and dashboards coordinated across different areas of the operation",
          "Deep integrations with data sources across the company",
          "90 days of support",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        adds: [
          "Several reports and dashboards coordinated across areas",
          "Deep integrations across your entire operation",
        ],
        cta: "Request a company-wide reporting system",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before automating a report",
    faqs: [
      {
        question: "Where does the report get its data from?",
        answer:
          "From the systems you already use: your CRM, your billing, your spreadsheets, or whatever tool someone reviews by hand today. Nothing needs to be migrated to automate it.",
      },
      {
        question: "What format does it arrive in?",
        answer:
          "Whichever you need: PDF or Excel by email, a WhatsApp message, or a dashboard that updates itself and you check whenever you want. It's defined in the quote.",
      },
      {
        question: "Can I ask for the metrics to change later?",
        answer:
          "Yes, it's a normal scope adjustment. The report is documented, so adding or removing a metric isn't rebuilding it from scratch.",
      },
      {
        question: "Does it replace my analytics or BI tool?",
        answer:
          "Not necessarily. Often the automated report queries that same tool and delivers the summary already built, so nobody has to go check it manually.",
      },
      {
        question: "How often does it get generated?",
        answer:
          "At whatever frequency you decide: daily, weekly, monthly, or triggered by a specific event (say, when the day's sales close).",
      },
    ],
    ctaTitle: "Which report does someone on your team build by hand every week?",
    ctaText: "Tell us how they build it today and we'll say whether it can be automated and what format you'd get it in.",
  },

  documentReading: {
    key: "documentReading",
    badge: "Automation",
    title: "Zero retyping: the data comes straight out of your documents",
    intro:
      "Invoices, receipts, paper forms, or vendor PDFs. We pull out the data and load it straight into your system, with nobody transcribing it by hand or making the usual mistake while doing it.",
    tiers: [
      {
        key: "puntual",
        name: "Document reading",
        priceKey: "documentReadingBasic",
        delivery: "2 to 3 weeks",
        includes: [
          "Automated reading of 1 document type (invoices, receipts, or forms)",
          "Extracting the fields you define and loading them into the target system",
          "Basic validation against what's already in your system",
          "30 days of support",
          "50% up front, 50% on delivery",
        ],
        cta: "Request document reading",
      },
      {
        key: "agente",
        name: "Reading with an agent",
        priceKey: "documentReadingStandard",
        featured: true,
        delivery: "4 to 6 weeks",
        includes: [
          "Everything in the previous pack",
          "2 to 3 different document types, including handwritten or variable-quality ones",
          "An agent that validates the extracted data and decides what to do with exceptions",
          "60 days of support",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        adds: [
          "2 to 3 document types, including handwritten or variable-quality ones",
          "An agent that decides what to do with exceptions",
        ],
        cta: "Request reading with an agent",
      },
      {
        key: "sistema",
        name: "High-volume reading",
        priceKey: "documentReadingSystem",
        from: true,
        delivery: "6 to 10 weeks",
        includes: [
          "Everything in the previous pack",
          "High document volumes, of any type, in a continuous flow",
          "Direct integration with your accounting or operating system",
          "90 days of support",
          "40% up front, 30% at the midpoint, 30% on delivery",
        ],
        adds: [
          "High volumes in a continuous flow, not one-off batches",
          "Direct integration with your accounting or operating system",
        ],
        cta: "Request high-volume reading",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqSubtitle: "What people ask before automating document reading",
    faqs: [
      {
        question: "How accurate is the extraction?",
        answer:
          "It depends on the quality of the source document. That's why the single-automation pack validates against what's already in your system, and the agent pack decides what to do with exceptions: no data ever gets loaded without a way to confirm it.",
      },
      {
        question: "Does it work with handwritten or poor-quality documents?",
        answer:
          "Yes, with handwritten character recognition, though accuracy drops compared to a clean digital document. That's exactly what the agent pack covers, with exception validation.",
      },
      {
        question: "Where does the extracted data go?",
        answer:
          "Into whatever system you define: your accounting, your ERP, a spreadsheet, or the system that's fed by hand today. It doesn't sit in a loose file someone has to copy again.",
      },
      {
        question: "How is sensitive information handled?",
        answer:
          "Processing runs on the project's own infrastructure, with the same access controls as the rest of the automation, and documents aren't shared with anyone outside the agreed scope.",
      },
      {
        question: "Does it work for high volumes?",
        answer:
          "Yes, that's exactly what the full-system pack covers: a continuous flow instead of one-off batches, with direct integration into your accounting or operating system.",
      },
    ],
    ctaTitle: "How many hours a month go into retyping invoices or forms?",
    ctaText: "Tell us which documents they are and we'll say how automatable it is and what it would cost.",
  },
};

export const serviceDetailsCopy = { es, en };
