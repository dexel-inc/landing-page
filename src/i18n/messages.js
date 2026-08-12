import { auditCopy, servicesCopy } from "./services.js";
import { categoriesCopy, categoryChromeCopy } from "./categories.js";
import { consentCopy, notFoundCopy, privacyCopy } from "./legal.js";
import { formatPrice } from "../config/pricing.js";

export const messages = {
  es: {
    meta: {
      brand: "Dexel",
      homeTitle: "Dexel | Automatización de procesos y software a la medida",
      homeDescription:
        "Automatizamos procesos, integramos sistemas y construimos software a la medida. Empiece por una auditoría de procesos que le dice cuántas horas al mes puede recuperar.",
      servicesTitle: "Dexel | Auditoría de procesos, automatización y software",
      servicesDescription:
        "Cinco servicios: auditoría de procesos, automatización e integración, software a la medida, presencia web y mantenimiento. Precios en USD y tiempos de entrega por escrito.",
      webDevTitle: "Desarrollo web a la medida | Dexel",
      webDevDescription:
        "Sitios, aplicaciones web y paneles de administración construidos alrededor de su operación. Integraciones, APIs y pasarelas de pago. Desde $300 USD.",
      automationTitle: "Automatización de procesos e integración | Dexel",
      automationDescription:
        "Workflows con n8n, chatbots de WhatsApp con y sin IA, integración entre sistemas y lectura automática de documentos. Desde $1,500 USD, entrega en 2 a 6 semanas.",
      auditTitle: "Auditoría de procesos | Dexel",
      auditDescription:
        "Le decimos qué procesos se pueden automatizar, cuántas horas al mes recuperaría y cuánto costaría cada implementación. Ocho entregables en 5 a 7 días hábiles.",
      contactTitle: "Dexel | Contacto y cotización de software",
      contactDescription:
        "Cuéntenos qué proceso le está consumiendo más tiempo y le decimos qué se puede automatizar. Respondemos en menos de 4 horas hábiles.",
      privacyTitle: "Política de tratamiento de datos | Dexel",
      privacyDescription:
        "Qué datos recogemos en dexel-inc.com, para qué los usamos, con quién los compartimos y cómo ejercer sus derechos bajo la Ley 1581 de 2012.",
      notFoundTitle: "Página no encontrada | Dexel",
      notFoundDescription: "La página que busca no existe o cambió de dirección.",
      siteName: "Dexel",
      type: "website",
    },
    nav: {
      home: "Inicio",
      services: "Servicios",
      menu: "Abrir menú",
      menuClose: "Cerrar menú",
      audit: "Auditoría",
      contact: "Contacto",
      language: "Idioma",
      spanish: "ES",
      english: "EN",
      theme: "Tema",
      auto: "Auto",
      themeToggle: "Cambiar tema",
    },
    hero: {
      badge: "Automatización · Integración · Software a la medida",
      title:
        "Automatizamos procesos, integramos sus sistemas y desarrollamos software a la medida. Somos cinco desarrolladores en Colombia con más de 6 años de experiencia.",
      scroll: "Scroll para hacer su idea realidad",
      h1: "Software que le devuelve horas a su empresa",
      primaryCta: `Solicitar auditoría de procesos — ${formatPrice("audit", "es")}`,
      secondaryCta: "Ver casos reales",
      responseTime: "Respondemos en menos de 4 horas hábiles",
    },
    homeSeo: {
      title: "Soluciones digitales orientadas a resultados",
      intro:
        "En Dexel combinamos estrategia, diseño y tecnología para construir productos digitales rápidos, escalables y mantenibles.",
      points: [
        {
          title: "Arquitectura sólida",
          text: "Definimos bases técnicas claras para que su producto pueda crecer sin deuda innecesaria.",
        },
        {
          title: "Enfoque en negocio",
          text: "Cada decisión de producto y desarrollo se conecta con objetivos medibles de su empresa.",
        },
        {
          title: "Ejecución ágil",
          text: "Entregamos en ciclos iterativos con visibilidad constante de avances, riesgos y prioridades.",
        },
      ],
    },
    cases: {
      badge: "Casos reales",
      title: "Trabajo entregado, no promesas",
      subtitle:
        "Software en producción hoy, con clientes reales. Algunos proyectos podemos mostrarlos; otros están protegidos por acuerdos de confidencialidad.",
      liveLabel: "En producción",
      challengeLabel: "El reto",
      solutionLabel: "Qué construimos",
      resultLabel: "Resultado",
      visitLabel: "Ver el sitio en vivo",
      published: [
        {
          id: "ibf-casa-grande",
          client: "Iglesia Bautista Fundamental Casa Grande",
          sector: "Casa Grande, Arizona · EE.UU.",
          url: "https://ibfcasagrande.org/",
          summary:
            "Una congregación hispanohablante en Arizona necesitaba un sitio que sirviera por igual a su comunidad en español y en inglés, y que mantuviera al día sus contenidos de video y radio sin depender de nadie que supiera de tecnología.",
          challenge: [
            "Comunidad bilingüe: cada contenido debía existir en español e inglés.",
            "Publicaban video en YouTube y transmitían radio en vivo, pero el sitio quedaba siempre desactualizado.",
            "Nadie en el equipo de la iglesia podía administrar un gestor de contenidos.",
          ],
          work: [
            "Sitio bilingüe completo ES/EN sobre una sola base de código.",
            "El último video y los reels se sincronizan solos desde el canal de YouTube.",
            "Radio en vivo embebida y reproducible desde cualquier página.",
            "Módulos de donaciones, misioneros, testimonios y suscripción por correo.",
            "Mapa con indicaciones de llegada desde distintos puntos de la ciudad.",
          ],
          metrics: [
            { value: 2, label: "Idiomas · 1 código" },
            { value: 0, label: "Horas/mes de gestión" },
            { value: 100, suffix: "%", label: "Contenido auto-sync" },
          ],
          highlight:
            "El equipo de la iglesia no toca código ni un panel de administración: publican en YouTube como siempre y el sitio se actualiza solo.",
          stack: ["React", "Vite", "i18n", "YouTube API", "Vercel"],
        },
      ],
      confidential: {
        badge: "Acuerdos de confidencialidad",
        title: "Lo que no podemos mostrar",
        description:
          "La mayor parte de nuestro trabajo son sistemas internos: procesos de negocio, datos de operación y ventajas competitivas que nuestros clientes no quieren públicos. Firmamos acuerdos de confidencialidad y los respetamos, incluso cuando nos costaría menos presumir. Es la misma discreción que tendríamos con su proyecto.",
        lockLabel: "Cliente protegido por acuerdo de confidencialidad",
        ctaTitle: "¿Quiere ver estos casos con detalle?",
        ctaText:
          "En una llamada podemos mostrarle arquitectura, métricas y aprendizajes sin exponer datos de nuestros clientes.",
        ctaButton: "Agendar una llamada sin costo",
        // Caso bajo NDA con cifra real. Sin nombre de cliente, sin nombre de
        // herramienta y sin capturas: es todo lo que el acuerdo permite mostrar.
        featured: {
          sector: "Operación interna",
          redacted: [34, 26, 42],
          metricLabel: "Antes → Después",
          before: "4 horas",
          after: "45 minutos",
          scope:
            "Un proceso operativo interno que consumía media jornada cada vez que se ejecutaba. Después de automatizarlo: menos de una hora. Si corre tres veces por semana, son más de 500 horas al año recuperadas.",
          note: "Sistema interno bajo acuerdo de confidencialidad.",
          stack: ["Automatización", "Integración"],
        },
        // ⚠️ IMPORTANTE: reemplazar estos ítems por proyectos reales de Dexel antes
        // de publicar. Basta con sector, alcance y stack — sin nombres ni métricas
        // inventadas. Un caso falso se cae en la primera reunión.
        items: [
          {
            sector: "Retail",
            redacted: [46, 22, 34],
            scope: "Plataforma de comercio electrónico con gestión de inventario y pasarela de pagos.",
            stack: ["Laravel", "MySQL"],
          },
          {
            sector: "Logística",
            redacted: [30, 40, 18],
            scope: "Sistema interno de seguimiento de despachos con reportes en tiempo real.",
            stack: ["React", "Node.js"],
          },
          {
            sector: "Servicios",
            redacted: [38, 26, 30],
            scope: "Automatización de procesos administrativos e integración con software contable.",
            stack: ["Python", "APIs"],
          },
          {
            sector: "Salud",
            redacted: [24, 44, 20],
            scope: "Aplicación web de gestión de agendas y registro de atenciones.",
            stack: ["Vue.js", "Spring Boot"],
          },
        ],
      },
    },
    team: {
      badge: "Quiénes somos",
      title: "Cinco personas con nombre y apellido",
      subtitle:
        "No somos una agencia con rotación ni un intermediario que subcontrata. El equipo que ve aquí es el mismo que va a construir su proyecto, y puede verificar a cada uno en LinkedIn.",
      location: "Colombia · Trabajamos con clientes en LATAM y EE.UU.",
      // ⚠️ Confirmar nombres visibles y roles con cada integrante antes de publicar.
      // Los roles están redactados en forma neutra a propósito.
      members: [
        {
          name: "Alejandro Castrillón Ciro",
          role: "Desarrollo Full Stack",
          linkedin: "https://www.linkedin.com/in/alejandro-castrillon-ciro-9539491ba/",
        },
        {
          name: "Ana María Granada Rodas",
          role: "Desarrollo Full Stack",
          linkedin: "https://www.linkedin.com/in/ana-maria-granada-rodas-945712244/",
        },
        {
          name: "Valeria Granada Rodas",
          role: "Desarrollo Full Stack",
          linkedin: "https://www.linkedin.com/in/vale0722/",
        },
        {
          name: "Anderson Cardona",
          role: "Desarrollo Full Stack",
          linkedin: "https://www.linkedin.com/in/anderson-cardona-dev/",
        },
        {
          name: "Alejandro Cristancho", // ⚠️ confirmar apellido
          role: "Desarrollo Full Stack",
          linkedin: "https://www.linkedin.com/in/alejandrocristm/",
        },
      ],
      note: "Trabajamos con inteligencia artificial en nuestro propio proceso de desarrollo. Por eso entregamos en semanas lo que a un equipo del mismo tamaño le tomaría meses, y por eso sabemos implementarla en el suyo.",
    },
    advisory: {
      badge: "Más que desarrollo",
      title: "Primero auditamos. Después construimos.",
      subtitle:
        "Casi todos los clientes llegan pidiendo una solución que ya tienen en mente. Nuestro trabajo no es solo construirla: es revisar el proceso completo y decirle si esa es la que realmente le conviene, incluso cuando la respuesta honesta nos deja menos trabajo.",
      askedLabel: "Nos pidieron",
      foundLabel: "Al revisar el proceso",
      proposedLabel: "Lo que propusimos",
      // ⚠️ Reemplazar por replanteos reales de proyectos de Dexel. El valor de
      // este bloque está en que sean situaciones que de verdad ocurrieron.
      reframes: [
        {
          asked: "Necesitamos una página web para mostrar nuestro catálogo.",
          found:
            "Los pedidos llegaban por WhatsApp y dos personas los digitaban a mano en el sistema. La página no tocaba ese problema.",
          proposed:
            "Catálogo en línea con el pedido entrando directo al sistema. La página era la mitad visible de un problema mucho más caro.",
        },
        {
          asked: "Queremos reemplazar todo el sistema actual, ya no nos sirve.",
          found:
            "El sistema funcionaba bien. Lo que fallaba era que nadie había configurado los reportes y el equipo los armaba en Excel cada semana.",
          proposed:
            "Una integración de dos semanas en lugar de un desarrollo de seis meses. Costó una fracción y resolvió lo que dolía.",
        },
        {
          asked: "Queremos una app móvil para nuestros clientes.",
          found:
            "Casi todos sus clientes ya les escribían por WhatsApp. Pedirles instalar otra aplicación era una barrera, no una mejora.",
          proposed:
            "Automatización sobre WhatsApp Business. El mismo objetivo, sin pedirle a nadie que descargue nada.",
        },
      ],
      auditTitle: "Qué revisamos antes de proponer",
      auditSubtitle:
        "No miramos solo el software: miramos cómo trabaja su equipo todos los días. Casi siempre aparecen ahorros que nadie había medido.",
      auditPoints: [
        {
          iconName: "Copy",
          title: "Trabajo duplicado",
          desc: "Datos que se digitan dos o tres veces en sistemas distintos.",
        },
        {
          iconName: "ClipboardList",
          title: "Reportes manuales",
          desc: "Informes que alguien arma a mano cada semana y podrían generarse solos.",
        },
        {
          iconName: "CreditCard",
          title: "Herramientas que ya paga",
          desc: "Licencias contratadas que se usan al 20% o que se solapan entre sí.",
        },
        {
          iconName: "UserCog",
          title: "Dependencia de personas",
          desc: "Procesos que solo una persona sabe hacer y se frenan si falta.",
        },
        {
          iconName: "Gauge",
          title: "Cuellos de botella",
          desc: "El paso exacto donde se acumula el trabajo y se pierde el tiempo.",
        },
        {
          iconName: "ShieldAlert",
          title: "Riesgos y respaldos",
          desc: "Qué pasaría mañana si se pierde la información o se cae el servidor.",
        },
        {
          iconName: "Plug",
          title: "Integraciones faltantes",
          desc: "Sistemas que ya tiene y que podrían hablarse entre sí sin desarrollo nuevo.",
        },
        {
          iconName: "ClipboardList",
          title: "Oportunidades no vistas",
          desc: "Mejoras que nadie había considerado porque nadie había mirado el proceso completo.",
        },
      ],
      pledgeTitle:
        "Si la auditoría concluye que no necesita desarrollar nada, se lo decimos.",
      pledgeText:
        "Preferimos perder un proyecto que entregar algo que no le sirva. Un cliente que resolvió su problema con dos semanas de integración vuelve; uno al que le vendimos seis meses innecesarios, no.",
      // Esta sección es la que más argumenta a favor de la auditoría, así que
      // su botón lleva a comprarla, no a agendar la llamada gratuita.
      cta: `Solicitar auditoría de procesos — ${formatPrice("audit", "es")}`,
    },
    process: {
      badge: "Cómo trabajamos",
      title: "Sin cajas negras ni sorpresas",
      subtitle:
        "El miedo de todo cliente es pagar y no volver a saber nada. Por eso nuestro proceso es visible de principio a fin: usted sabe en qué fase está, qué recibe y cuándo.",
      phases: [
        {
          iconName: "Search",
          title: "Llamada de discovery",
          duration: "30–45 min · sin costo",
          desc: "Escuchamos cómo funciona su operación hoy y dónde se pierde el tiempo. Sin vender nada todavía.",
          outputLabel: "Usted recibe",
          output: "Una lectura honesta de qué vale la pena automatizar y qué no.",
        },
        {
          iconName: "FileCheck2",
          title: "Propuesta",
          duration: "48 horas",
          desc: "Alcance cerrado, precio fijo y cronograma. Lo que no está escrito, no está incluido, y lo decimos de frente.",
          outputLabel: "Usted recibe",
          output: "Propuesta con precio cerrado y entregables definidos.",
        },
        {
          iconName: "LayoutTemplate",
          title: "Diseño",
          duration: "3–5 días",
          desc: "Prototipo navegable antes de escribir una línea de código. Cambiar aquí cuesta minutos; cambiar después cuesta semanas.",
          outputLabel: "Usted recibe",
          output: "Prototipo interactivo que usted aprueba antes de continuar.",
        },
        {
          iconName: "Code2",
          title: "Construcción",
          duration: "Sprints de 1 semana",
          desc: "Desarrollamos en ciclos cortos con demo funcionando cada viernes y acceso al tablero de avance.",
          outputLabel: "Usted recibe",
          output: "Demo funcional semanal y visibilidad total del progreso.",
        },
        {
          iconName: "Rocket",
          title: "Entrega",
          duration: "1 semana",
          desc: "Puesta en producción, capacitación a su equipo y documentación en lenguaje claro.",
          outputLabel: "Usted recibe",
          output: "Sistema en producción, su equipo capacitado y el repositorio a su nombre.",
        },
        {
          iconName: "LineChart",
          title: "Evolución",
          duration: "Mensual",
          desc: "Medimos si el sistema está dando el resultado prometido y lo mejoramos de forma continua.",
          outputLabel: "Usted recibe",
          output: "Reporte de métricas y plan de mejoras priorizado.",
        },
      ],
      commitmentsTitle: "Tres compromisos por escrito",
      commitmentsSubtitle:
        "No son eslóganes: quedan en el contrato y puede exigirlos.",
      commitments: [
        {
          iconName: "CalendarCheck",
          title: "Demo cada viernes",
          desc: "Cada semana ve el avance funcionando, no un informe de estado. Si no hay demo, esa semana no se factura.",
        },
        {
          iconName: "FileCheck2",
          title: "Precio cerrado antes de empezar",
          desc: "El valor se define antes de la primera línea de código. Si el alcance cambia, se cotiza aparte y usted decide.",
        },
        {
          iconName: "GitBranch",
          title: "El código es suyo desde el día 1",
          desc: "Repositorio a nombre de su empresa desde el primer commit. Nunca quedará secuestrado por su proveedor.",
        },
      ],
      cta: "Agendar llamada de discovery sin costo",
    },
    contact: {
      titleStart: "Iniciemos el",
      titleHighlight: "Proceso.",
      description:
        "Olvídese de los formularios estáticos. Interactúe directamente con nuestro núcleo de pre-análisis. Cuéntenos su problema técnico y obtenga una evaluación preliminar en tiempo real.",
      chat: {
        status: "DEXEL - ONLINE",
        placeholder: "Escriba su requerimiento...",
          "whatsappButton": "Continuar en WhatsApp",
          "responseTime": "Respondemos en menos de 4 horas hábiles",
          // Flujo invertido: primero entendemos el problema y devolvemos algo
          // útil, y solo al final pedimos el contacto. Los pasos sin "field"
          // son informativos y avanzan solos.
          "flow": [
            {
              "bot": "👋 Hola, soy el asistente de DEXEL.\n\nPara ayudarle rápido necesito una sola cosa: ¿qué tarea o proceso le está quitando más tiempo a su equipo hoy?",
              "field": "problema"
            },
            {
              "bot": "Entendido. Ese tipo de proceso casi siempre se puede automatizar, total o parcialmente.\n\nPara darle una estimación con sentido y no una cifra al aire, me falta un dato:",
              "field": null
            },
            {
              "bot": "¿Cuántas personas lo hacen y cuánto tiempo al día, aproximadamente?\n\nCon un estimado me basta (por ejemplo: \"2 personas, unas 3 horas cada una\").",
              "field": "volumen"
            },
            {
              "bot": "Perfecto, con eso ya puedo ubicarlo. 📊\n\nUn proceso así normalmente se resuelve en implementaciones de 2 a 6 semanas, y la inversión se recupera con las horas que deja de gastar el equipo.\n\nEl siguiente paso es una llamada de discovery de 30 minutos, sin costo, donde confirmamos si la auditoría de procesos tiene sentido en su caso.",
              "field": null
            },
            {
              "bot": "¿A nombre de quién agendamos la llamada?",
              "field": "nombre"
            },
            {
              "bot": "Listo, {{nombre}}. 🎉\n\nArmé el resumen de lo que me contó. Al presionar el botón pasa a WhatsApp con esa información ya escrita, y agendamos los 30 minutos.",
              "field": null,
              "isFinal": true
            }
          ],
          "whatsappMessage": {
            "header": "*Nuevo contacto desde el sitio — DEXEL*",
            "intro": "¡Hola! Me comunico desde el sitio web con la siguiente información:",
            "fields": {
              "nombre": "*Nombre / Empresa:*",
              "problema": "*Proceso que consume más tiempo:*",
              "volumen": "*Personas y tiempo dedicado:*"
            },
            "outro": "Quedo atento para agendar la llamada de discovery de 30 minutos."
          }
      },
    },
    services: servicesCopy.es,
    categories: categoriesCopy.es,
    chrome: categoryChromeCopy.es,
    audit: auditCopy.es,
    privacy: privacyCopy.es,
    notFound: notFoundCopy.es,
    consent: consentCopy.es,
    footer: {
      title: "¿Qué está esperando?",
      contactButton: "Contáctenos",
      responseTime: "Respondemos en menos de 4 horas hábiles",
      services: "Servicios",
      audit: "Auditoría de procesos",
      contact: "Contáctenos",
      privacy: "Privacidad",
      rights: "Todos los derechos reservados.",
      whatsappAria: "Abrir chat de WhatsApp",
      whatsappText: "Hola Dexel, quiero una cotización",
    },
  },
  en: {
    meta: {
      brand: "Dexel",
      homeTitle: "Dexel | Process automation and custom software",
      homeDescription:
        "We automate processes, integrate systems, and build custom software. Start with a process audit that tells you how many hours a month you can get back.",
      servicesTitle: "Dexel | Process audit, automation, and custom software",
      servicesDescription:
        "Five services: process audit, automation and integration, custom software, web presence, and maintenance. Prices in USD and delivery times in writing.",
      webDevTitle: "Custom web development | Dexel",
      webDevDescription:
        "Websites, web applications, and admin panels built around your operation. Integrations, APIs, and payment gateways. From $300 USD.",
      automationTitle: "Process automation and integration | Dexel",
      automationDescription:
        "n8n workflows, WhatsApp chatbots with and without AI, system integration, and automated document reading. From $1,500 USD, delivered in 2 to 6 weeks.",
      auditTitle: "Process audit | Dexel",
      auditDescription:
        "We tell you which processes can be automated, how many hours a month you would get back, and what each implementation would cost. Eight deliverables in 5 to 7 business days.",
      contactTitle: "Dexel | Contact and software quote",
      contactDescription:
        "Tell us which process is eating the most time and we'll tell you what can be automated. We reply in under 4 business hours.",
      privacyTitle: "Data protection policy | Dexel",
      privacyDescription:
        "What data we collect on dexel-inc.com, what we use it for, who we share it with, and how to exercise your rights under Colombian Law 1581 of 2012.",
      notFoundTitle: "Page not found | Dexel",
      notFoundDescription: "The page you're looking for doesn't exist or moved.",
      siteName: "Dexel",
      type: "website",
    },
    nav: {
      home: "Home",
      services: "Services",
      menu: "Open menu",
      menuClose: "Close menu",
      audit: "Audit",
      contact: "Contact",
      language: "Language",
      spanish: "ES",
      english: "EN",
      theme: "Theme",
      auto: "Auto",
      themeToggle: "Toggle theme",
    },
    hero: {
      badge: "Automation · Integration · Custom software",
      title:
        "We automate processes, integrate your systems, and build custom software. Five developers based in Colombia with over 6 years of experience.",
      scroll: "Scroll to bring your idea to life",
      h1: "Software that gives your company its hours back",
      primaryCta: `Request a process audit — ${formatPrice("audit", "en")}`,
      secondaryCta: "See real cases",
      responseTime: "We reply in under 4 business hours",
    },
    homeSeo: {
      title: "Digital solutions focused on outcomes",
      intro:
        "At Dexel, we combine strategy, design, and technology to build fast, scalable, and maintainable digital products.",
      points: [
        {
          title: "Solid architecture",
          text: "We define clear technical foundations so your product can grow without unnecessary technical debt.",
        },
        {
          title: "Business-driven approach",
          text: "Every product and engineering decision is tied to measurable business goals.",
        },
        {
          title: "Agile execution",
          text: "We deliver in iterative cycles with continuous visibility on progress, risks, and priorities.",
        },
      ],
    },
    cases: {
      badge: "Real work",
      title: "Shipped work, not promises",
      subtitle:
        "Software running in production today, with real clients. Some projects we can show; others are protected by confidentiality agreements.",
      liveLabel: "In production",
      challengeLabel: "The challenge",
      solutionLabel: "What we built",
      resultLabel: "Outcome",
      visitLabel: "View the live site",
      published: [
        {
          id: "ibf-casa-grande",
          client: "Iglesia Bautista Fundamental Casa Grande",
          sector: "Casa Grande, Arizona · USA",
          url: "https://ibfcasagrande.org/",
          summary:
            "A Spanish-speaking congregation in Arizona needed a site that served its community equally well in Spanish and English, and that kept its video and radio content current without relying on anyone with technical skills.",
          challenge: [
            "Bilingual community: every piece of content had to exist in Spanish and English.",
            "They published video on YouTube and streamed live radio, but the site was always out of date.",
            "No one on the church team could administer a content management system.",
          ],
          work: [
            "Fully bilingual ES/EN site running on a single codebase.",
            "Latest video and reels sync automatically from the YouTube channel.",
            "Live radio embedded and playable from any page.",
            "Donations, missionaries, testimonials, and email subscription modules.",
            "Map with directions from different points around the city.",
          ],
          metrics: [
            { value: 2, label: "Languages · 1 codebase" },
            { value: 0, label: "Hours/month of upkeep" },
            { value: 100, suffix: "%", label: "Content auto-synced" },
          ],
          highlight:
            "The church team never touches code or an admin panel: they publish on YouTube as always, and the site updates itself.",
          stack: ["React", "Vite", "i18n", "YouTube API", "Vercel"],
        },
      ],
      confidential: {
        badge: "Confidentiality agreements",
        title: "What we cannot show",
        description:
          "Most of our work is internal systems: business processes, operational data, and competitive advantages our clients would rather keep private. We sign confidentiality agreements and we honor them, even when showing off would be easier. Your project would get the same discretion.",
        lockLabel: "Client protected by a confidentiality agreement",
        ctaTitle: "Want to see these cases in detail?",
        ctaText:
          "On a call we can walk you through architecture, metrics, and lessons learned without exposing any client data.",
        ctaButton: "Book a free call",
        featured: {
          sector: "Internal operation",
          redacted: [34, 26, 42],
          metricLabel: "Before → After",
          before: "4 hours",
          after: "45 minutes",
          scope:
            "An internal operational process that ate half a workday every time it ran. After automating it: under an hour. If it runs three times a week, that is over 500 hours a year recovered.",
          note: "Internal system under a non-disclosure agreement.",
          stack: ["Automation", "Integration"],
        },
        // ⚠️ IMPORTANT: replace these items with real Dexel projects before going
        // live. Sector, scope, and stack are enough — no invented names or metrics.
        // A fake case falls apart in the first meeting.
        items: [
          {
            sector: "Retail",
            redacted: [46, 22, 34],
            scope: "E-commerce platform with inventory management and payment gateway.",
            stack: ["Laravel", "MySQL"],
          },
          {
            sector: "Logistics",
            redacted: [30, 40, 18],
            scope: "Internal shipment tracking system with real-time reporting.",
            stack: ["React", "Node.js"],
          },
          {
            sector: "Services",
            redacted: [38, 26, 30],
            scope: "Back-office process automation and accounting software integration.",
            stack: ["Python", "APIs"],
          },
          {
            sector: "Healthcare",
            redacted: [24, 44, 20],
            scope: "Web application for scheduling and patient visit records.",
            stack: ["Vue.js", "Spring Boot"],
          },
        ],
      },
    },
    team: {
      badge: "Who we are",
      title: "Five people with names and faces",
      subtitle:
        "We're not an agency with constant turnover, nor a middleman who subcontracts. The team you see here is the same one that will build your project, and you can verify each of us on LinkedIn.",
      location: "Colombia · Working with clients across LATAM and the US",
      // ⚠️ Confirm display names and roles with each member before going live.
      members: [
        {
          name: "Alejandro Castrillón Ciro",
          role: "Full Stack Development",
          linkedin: "https://www.linkedin.com/in/alejandro-castrillon-ciro-9539491ba/",
        },
        {
          name: "Ana María Granada Rodas",
          role: "Full Stack Development",
          linkedin: "https://www.linkedin.com/in/ana-maria-granada-rodas-945712244/",
        },
        {
          name: "Valeria Granada Rodas",
          role: "Full Stack Development",
          linkedin: "https://www.linkedin.com/in/vale0722/",
        },
        {
          name: "Anderson Cardona",
          role: "Full Stack Development",
          linkedin: "https://www.linkedin.com/in/anderson-cardona-dev/",
        },
        {
          name: "Alejandro Cristancho", // ⚠️ confirm last name
          role: "Full Stack Development",
          linkedin: "https://www.linkedin.com/in/alejandrocristm/",
        },
      ],
      note: "We use AI inside our own development process. That's why we ship in weeks what a team our size would normally take months to deliver — and why we know how to implement it in yours.",
    },
    advisory: {
      badge: "More than development",
      title: "We audit first. Then we build.",
      subtitle:
        "Almost every client arrives asking for a solution they already have in mind. Our job isn't just to build it: it's to review the whole process and tell you whether that's really the right one — even when the honest answer means less work for us.",
      askedLabel: "They asked for",
      foundLabel: "Reviewing the process",
      proposedLabel: "What we proposed",
      // ⚠️ Replace with real reframes from Dexel projects. The value of this
      // block comes entirely from these being situations that actually happened.
      reframes: [
        {
          asked: "We need a website to show our catalog.",
          found:
            "Orders came in over WhatsApp and two people retyped them into the system by hand. The website didn't touch that problem.",
          proposed:
            "An online catalog with orders flowing straight into the system. The website was the visible half of a much more expensive problem.",
        },
        {
          asked: "We want to replace the whole current system, it no longer works for us.",
          found:
            "The system worked fine. What failed was that nobody had configured the reports, so the team rebuilt them in Excel every week.",
          proposed:
            "A two-week integration instead of a six-month build. It cost a fraction and fixed what actually hurt.",
        },
        {
          asked: "We want a mobile app for our customers.",
          found:
            "Nearly all their customers were already messaging them on WhatsApp. Asking them to install another app was a barrier, not an improvement.",
          proposed:
            "Automation on WhatsApp Business. Same goal, without asking anyone to download anything.",
        },
      ],
      auditTitle: "What we review before proposing",
      auditSubtitle:
        "We don't just look at software: we look at how your team actually works day to day. Savings nobody had measured almost always show up.",
      auditPoints: [
        {
          iconName: "Copy",
          title: "Duplicated work",
          desc: "Data typed two or three times into different systems.",
        },
        {
          iconName: "ClipboardList",
          title: "Manual reporting",
          desc: "Reports someone rebuilds by hand every week that could generate themselves.",
        },
        {
          iconName: "CreditCard",
          title: "Tools you already pay for",
          desc: "Licenses used at 20% of their capacity, or overlapping with each other.",
        },
        {
          iconName: "UserCog",
          title: "Key-person dependency",
          desc: "Processes only one person knows how to run, which stall when they're away.",
        },
        {
          iconName: "Gauge",
          title: "Bottlenecks",
          desc: "The exact step where work piles up and time gets lost.",
        },
        {
          iconName: "ShieldAlert",
          title: "Risk and backups",
          desc: "What would happen tomorrow if data were lost or the server went down.",
        },
        {
          iconName: "Plug",
          title: "Missing integrations",
          desc: "Systems you already own that could talk to each other without new development.",
        },
        {
          iconName: "ClipboardList",
          title: "Unseen opportunities",
          desc: "Improvements nobody considered because nobody had looked at the whole process.",
        },
      ],
      pledgeTitle: "If the audit concludes you don't need to build anything, we'll say so.",
      pledgeText:
        "We'd rather lose a project than deliver something that doesn't help. A client who solved their problem with a two-week integration comes back; one we sold six unnecessary months to does not.",
      cta: `Request a process audit — ${formatPrice("audit", "en")}`,
    },
    process: {
      badge: "How we work",
      title: "No black boxes, no surprises",
      subtitle:
        "Every client's fear is paying and never hearing back. That's why our process is visible end to end: you always know what phase you're in, what you get, and when.",
      phases: [
        {
          iconName: "Search",
          title: "Discovery call",
          duration: "30–45 min · free",
          desc: "We listen to how your operation works today and where time is lost. No selling yet.",
          outputLabel: "You get",
          output: "An honest read on what's worth automating and what isn't.",
        },
        {
          iconName: "FileCheck2",
          title: "Proposal",
          duration: "48 hours",
          desc: "Closed scope, fixed price, and timeline. If it isn't written down, it isn't included — and we say so upfront.",
          outputLabel: "You get",
          output: "A proposal with a fixed price and defined deliverables.",
        },
        {
          iconName: "LayoutTemplate",
          title: "Design",
          duration: "3–5 days",
          desc: "A clickable prototype before a single line of code. Changing it here takes minutes; changing it later takes weeks.",
          outputLabel: "You get",
          output: "An interactive prototype you approve before we continue.",
        },
        {
          iconName: "Code2",
          title: "Build",
          duration: "1-week sprints",
          desc: "We build in short cycles with a working demo every Friday and access to the progress board.",
          outputLabel: "You get",
          output: "A working demo each week and full visibility into progress.",
        },
        {
          iconName: "Rocket",
          title: "Launch",
          duration: "1 week",
          desc: "Production rollout, training for your team, and documentation in plain language.",
          outputLabel: "You get",
          output: "A live system, a trained team, and the repository under your name.",
        },
        {
          iconName: "LineChart",
          title: "Evolution",
          duration: "Monthly",
          desc: "We measure whether the system delivers the promised outcome and keep improving it.",
          outputLabel: "You get",
          output: "A metrics report and a prioritized improvement plan.",
        },
      ],
      commitmentsTitle: "Three commitments in writing",
      commitmentsSubtitle: "These aren't slogans: they go in the contract and you can hold us to them.",
      commitments: [
        {
          iconName: "CalendarCheck",
          title: "A demo every Friday",
          desc: "Each week you see working progress, not a status report. No demo means that week isn't billed.",
        },
        {
          iconName: "FileCheck2",
          title: "Fixed price before we start",
          desc: "The price is set before the first line of code. If scope changes, it's quoted separately and you decide.",
        },
        {
          iconName: "GitBranch",
          title: "The code is yours from day 1",
          desc: "Repository under your company's name from the first commit. It will never be held hostage by your vendor.",
        },
      ],
      cta: "Book a free discovery call",
    },
    contact: {
      titleStart: "Let's start the",
      titleHighlight: "Process.",
      description:
          "Forget static forms. Interact directly with our pre-analysis core. Tell us your technical challenge and get a preliminary read in real time.",
      chat: {
        status: "DEXEL - ONLINE",
        placeholder: "Type your requirement...",
        "whatsappButton": "Continue on WhatsApp",
        "responseTime": "We reply in under 4 business hours",
        // Inverted flow: understand the problem and give something useful
        // first, ask for contact details last. Steps without "field" are
        // informational and advance on their own.
        "flow": [
          {
            "bot": "👋 Hi, I'm DEXEL's assistant.\n\nTo help you quickly I only need one thing: which task or process is eating the most time from your team right now?",
            "field": "problema"
          },
          {
            "bot": "Got it. That kind of process can almost always be automated, fully or partially.\n\nTo give you a meaningful estimate instead of a number out of thin air, I need one more detail:",
            "field": null
          },
          {
            "bot": "How many people handle it, and roughly how much time per day?\n\nA rough figure is enough (for example: \"2 people, about 3 hours each\").",
            "field": "volumen"
          },
          {
            "bot": "Perfect, that's enough to place you. 📊\n\nA process like this is usually solved with a 2 to 6 week implementation, and the investment pays back through the hours your team stops spending on it.\n\nThe next step is a free 30-minute discovery call, where we confirm whether the process audit makes sense in your case.",
            "field": null
          },
          {
            "bot": "Who should we book the call for?",
            "field": "nombre"
          },
          {
            "bot": "All set, {{nombre}}. 🎉\n\nI've put together a summary of what you told me. Press the button and you'll land on WhatsApp with that information already written, so we can book the 30 minutes.",
            "field": null,
            "isFinal": true
          }
        ],
        "whatsappMessage": {
          "header": "*New contact from the website — DEXEL*",
          "intro": "Hello! I'm reaching out from the website with the following information:",
          "fields": {
            "nombre": "*Name / Company:*",
            "problema": "*Process consuming the most time:*",
            "volumen": "*People and time spent:*"
          },
          "outro": "Looking forward to booking the 30-minute discovery call."
        },
      },
    },
    services: servicesCopy.en,
    categories: categoriesCopy.en,
    chrome: categoryChromeCopy.en,
    audit: auditCopy.en,
    privacy: privacyCopy.en,
    notFound: notFoundCopy.en,
    consent: consentCopy.en,
    footer: {
      title: "What are you waiting for?",
      contactButton: "Contact us",
      responseTime: "We reply in under 4 business hours",
      services: "Services",
      audit: "Process audit",
      contact: "Contact us",
      privacy: "Privacy",
      rights: "All rights reserved.",
      whatsappAria: "Open WhatsApp chat",
      whatsappText: "Hi Dexel, I want a quote",
    },
  },
};

export const defaultLocale = "es";
