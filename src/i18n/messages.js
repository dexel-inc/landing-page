import { auditCopy, servicesCopy } from "./services.js";
import { categoriesCopy, categoryChromeCopy } from "./categories.js";
import { consentCopy, notFoundCopy, privacyCopy } from "./legal.js";
import { trainingCopy } from "./training.js";
import { serviceDetailsCopy } from "./serviceDetails.js";
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
        "Cinco servicios: auditoría de procesos, automatización e integración, software a la medida, presencia web y mantenimiento. Precios en pesos con IVA incluido y tiempos de entrega por escrito.",
      webDevTitle: "Desarrollo web a la medida | Dexel",
      webDevDescription: `Sitios, aplicaciones web y paneles de administración construidos alrededor de su operación. SEO técnico, integraciones, APIs y pasarelas de pago. ${formatPrice(
        "webPresence",
        "es",
        { from: true },
      )}.`,
      automationTitle: "Automatización de procesos e integración | Dexel",
      automationDescription: `Atención automatizada por WhatsApp, agentes a la medida, workflows con n8n, integración entre sistemas y lectura automática de documentos. ${formatPrice(
        "automation",
        "es",
        { from: true },
      )}, entrega en 2 a 6 semanas.`,
      auditTitle: "Auditoría de procesos, software e IA | Dexel",
      auditDescription: `Auditoría de procesos, de herramientas y licencias, de software y diagnóstico de IA. Cifras concretas antes de construir, y el valor se descuenta del proyecto. ${formatPrice(
        "auditFocus",
        "es",
        { from: true },
      )}.`,
      processAuditTitle: "Auditoría de procesos | Dexel",
      processAuditDescription: `Qué procesos automatizar, cuántas horas al mes recuperaría y cuánto costaría cada implementación. Tres alcances, ${formatPrice(
        "auditFocus",
        "es",
        { from: true },
      ).toLowerCase()}.`,
      toolsAuditTitle: "Auditoría de herramientas y licencias de software | Dexel",
      toolsAuditDescription: `Lo que paga en software y lo que de verdad usa: qué conservar, qué consolidar y qué cancelar, con el ahorro calculado. ${formatPrice(
        "toolsAudit",
        "es",
        { from: true },
      )}.`,
      softwareAuditTitle: "Auditoría de software: código, seguridad e infraestructura | Dexel",
      softwareAuditDescription: `Revisión de sitios y aplicaciones: velocidad, seguridad, respaldos, código y deuda técnica, con un plan de arreglos. ${formatPrice(
        "softwareAuditSite",
        "es",
        { from: true },
      )}.`,
      aiAssessmentTitle: "Diagnóstico de IA para empresas | Dexel",
      aiAssessmentDescription: `Dónde aporta la IA en su operación, con qué datos y con qué riesgos, priorizado por retorno. ${formatPrice(
        "aiWorkshop",
        "es",
        { from: true },
      )}.`,
      websitesTitle: "Sitios web a la medida | Dexel",
      websitesDescription: `Landing, sitio completo con panel o catálogo en línea. ${formatPrice(
        "webPresence",
        "es",
        { from: true },
      )}, entrega desde 5 días hábiles.`,
      customSoftwareDetailTitle: "Software a la medida | Dexel",
      customSoftwareDetailDescription: `Herramientas y aplicaciones construidas alrededor de su operación, con panel de administración incluido. ${formatPrice(
        "customTool",
        "es",
        { from: true },
      )}.`,
      micropagesTitle: "Micropáginas e invitaciones digitales | Dexel",
      micropagesDescription: `Invitaciones digitales para bodas, XV años, grados y otros eventos: cuenta regresiva, galería, música y confirmación por WhatsApp. ${formatPrice(
        "micropageEssential",
        "es",
        { from: true },
      )}, entrega en 24-48 horas.`,
      seoDetailTitle: "SEO: posicionamiento en buscadores | Dexel",
      seoDetailDescription: `Auditoría SEO, contenido mensual y link building, con reporte de trabajo entregado cada mes. ${formatPrice(
        "seoAudit",
        "es",
        { from: true },
      )}.`,
      integrationsTitle: "Integraciones y APIs | Dexel",
      integrationsDescription: `Conectamos los sistemas que ya tiene para que nadie tenga que copiar datos entre ellos. ${formatPrice(
        "integration",
        "es",
        { from: true },
      )} por integración.`,
      paymentGatewaysTitle: "Pasarelas de pago | Dexel",
      paymentGatewaysDescription: `Cobre en línea en su sitio actual, con las pasarelas que se usan en Colombia y la región. ${formatPrice(
        "paymentGateway",
        "es",
        { from: true },
      )}.`,
      maintenanceDetailTitle: "Mantenimiento web mensual | Dexel",
      maintenanceDetailDescription: `Actualizaciones, respaldos y soporte para sitios, aplicaciones y agentes en producción, en tres niveles. ${formatPrice(
        "careBasic",
        "es",
        { from: true, perMonth: true },
      )}.`,
      whatsappAutomationTitle: "Automatización de WhatsApp Business | Dexel",
      whatsappAutomationDescription: `Chatbots y agentes que responden, califican leads y confirman citas por WhatsApp, con reglas fijas o con IA según el proceso. ${formatPrice(
        "whatsappBasic",
        "es",
        { from: true },
      )}.`,
      customAgentsTitle: "Agentes a la medida | Dexel",
      customAgentsDescription: `Agentes que consultan sus sistemas, deciden y ejecutan la acción que cierra el proceso, no solo responden. ${formatPrice(
        "automationAgent",
        "es",
        { from: true },
      )}.`,
      n8nWorkflowsTitle: "Workflows con n8n | Dexel",
      n8nWorkflowsDescription: `Automatización alojada en su propia infraestructura, sin costos por operación que crecen con el volumen. ${formatPrice(
        "automation",
        "es",
        { from: true },
      )}.`,
      systemIntegrationTitle: "Integración entre sistemas | Dexel",
      systemIntegrationDescription: `Que sus sistemas dejen de necesitar que alguien copie datos entre ellos. ${formatPrice(
        "systemIntegrationBasic",
        "es",
        { from: true },
      )}.`,
      automatedReportsTitle: "Reportes automáticos | Dexel",
      automatedReportsDescription: `El informe que hoy alguien arma a mano cada semana, generado solo. ${formatPrice(
        "automatedReportsBasic",
        "es",
        { from: true },
      )}.`,
      documentReadingTitle: "Lectura automática de documentos | Dexel",
      documentReadingDescription: `Extraiga datos de facturas, PDFs e imágenes sin digitación manual. ${formatPrice(
        "documentReadingBasic",
        "es",
        { from: true },
      )}.`,
      trainingTitle: "Formación en automatización e IA para equipos | Dexel",
      trainingDescription: `Formación virtual en automatización e IA, desde una sesión 1:1 hasta un programa a la medida. Cada participante sale con una automatización real de su operación funcionando. ${formatPrice(
        "mentoringSession",
        "es",
        { from: true },
      )}.`,
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
      training: "Formación",
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
      // The audit stopped being the entry point: asking a stranger to pay for
      // a diagnosis upfront is the highest-friction action in the catalog. The
      // hero opens with the free call; the audit is argued for — and charged
      // for — where its value gets explained.
      primaryCta: "Agendar una llamada sin costo (30 min)",
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
            { value: 300, suffix: "+", label: "Visitas/mes sostenidas" },
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
        ctaButton: "Agendar una llamada sin costo (30 min)",
        // NDA case with a real figure. No client name, no tool name, and no
        // screenshots: that's all the agreement allows us to show.
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
        // ⚠️ IMPORTANT: replace these items with real Dexel projects before
        // going live. Sector, scope, and stack are enough — no invented names
        // or metrics. A fake case falls apart in the first meeting.
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
    advisory: {
      badge: "Más que desarrollo",
      title: "Primero auditamos. Después construimos.",
      subtitle:
        "Casi todos los clientes llegan pidiendo una solución que ya tienen en mente. Nuestro trabajo no es solo construirla: es revisar el proceso completo y decirle si esa es la que realmente le conviene, incluso cuando la respuesta honesta nos deja menos trabajo.",
      askedLabel: "Nos pidieron",
      foundLabel: "Al revisar el proceso",
      proposedLabel: "Lo que propusimos",
      // ⚠️ Replace with real reframes from Dexel projects. The value of this
      // block comes entirely from these being situations that actually happened.
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
            "Al revisar el proceso encontramos que el sistema funcionaba bien: lo que faltaba eran los reportes configurados, y el equipo los armaba a mano en Excel cada semana.",
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
        "Si la auditoría muestra que no hace falta desarrollar nada, se lo decimos con la misma claridad.",
      pledgeText:
        "El informe es suyo y le sirve de todas formas, y usted invierte solo en lo que su operación realmente necesita.",
      // This section argues for the audit more than any other, so its button
      // leads to buying it, not to booking the free call.
      cta: `Solicitar auditoría de procesos — ${formatPrice("audit", "es")}`,
    },
    process: {
      badge: "Cómo trabajamos",
      title: "Sin cajas negras ni sorpresas",
      subtitle:
        "Nuestro proceso es visible de principio a fin: usted sabe en qué fase está, qué recibe y cuándo.",
      phases: [
        {
          iconName: "Search",
          title: "Llamada inicial",
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
      commitmentsTitle: "Cuatro compromisos por escrito",
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
        {
          // Training was already happening on every project and appeared
          // nowhere on the site. It's the direct answer to the fear anyone
          // buying custom software has: paying for something their people
          // won't use.
          iconName: "GraduationCap",
          title: "Capacitamos a su equipo antes de irnos",
          desc: "Toda entrega incluye una sesión de capacitación en vivo con las personas que van a usar el sistema, y resolución de dudas en directo. No entregamos un manual y desaparecemos.",
        },
      ],
      cta: "Agendar una llamada sin costo (30 min)",
    },
    contact: {
      titleStart: "Iniciemos el",
      titleHighlight: "Proceso.",
      description:
        "Escríbanos por WhatsApp y cuéntenos qué necesita resolver. Le respondemos con el siguiente paso: una propuesta, una llamada de 30 minutos sin costo, o la franqueza de decirle que no hace falta construir nada.",
      button: "Escribir por WhatsApp",
      responseTime: "Respondemos en menos de 4 horas hábiles",
    },
    services: servicesCopy.es,
    categories: categoriesCopy.es,
    training: trainingCopy.es,
    chrome: categoryChromeCopy.es,
    audit: auditCopy.es,
    serviceDetails: serviceDetailsCopy.es,
    privacy: privacyCopy.es,
    notFound: notFoundCopy.es,
    consent: consentCopy.es,
    footer: {
      title: "Hablemos de su proyecto",
      contactButton: "Contáctenos",
      responseTime: "Respondemos en menos de 4 horas hábiles",
      services: "Servicios",
      audit: "Auditoría",
      training: "Formación",
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
      webDevDescription: `Websites, web applications, and admin panels built around your operation. Technical SEO, integrations, APIs, and payment gateways. ${formatPrice(
        "webPresence",
        "en",
        { from: true },
      )}.`,
      automationTitle: "Process automation and integration | Dexel",
      automationDescription: `Automated WhatsApp support, custom agents, n8n workflows, system integration, and automated document reading. ${formatPrice(
        "automation",
        "en",
        { from: true },
      )}, delivered in 2 to 6 weeks.`,
      auditTitle: "Process, software, and AI audits | Dexel",
      auditDescription: `Process audit, tools and licenses audit, software audit, and AI assessment. Concrete numbers before building, credited toward the project. ${formatPrice(
        "auditFocus",
        "en",
        { from: true },
      )}.`,
      processAuditTitle: "Process audit | Dexel",
      processAuditDescription: `Which processes to automate, how many hours a month you'd get back, and what each implementation would cost. Three scopes, ${formatPrice(
        "auditFocus",
        "en",
        { from: true },
      ).toLowerCase()}.`,
      toolsAuditTitle: "Software tools and licenses audit | Dexel",
      toolsAuditDescription: `What you pay for in software and what you actually use: what to keep, consolidate, and cancel, with the savings calculated. ${formatPrice(
        "toolsAudit",
        "en",
        { from: true },
      )}.`,
      softwareAuditTitle: "Software audit: code, security, and infrastructure | Dexel",
      softwareAuditDescription: `Review of websites and applications: speed, security, backups, code, and technical debt, with a fix plan. ${formatPrice(
        "softwareAuditSite",
        "en",
        { from: true },
      )}.`,
      aiAssessmentTitle: "AI assessment for companies | Dexel",
      aiAssessmentDescription: `Where AI helps your operation, with what data and what risks, ranked by return. ${formatPrice(
        "aiWorkshop",
        "en",
        { from: true },
      )}.`,
      websitesTitle: "Custom websites | Dexel",
      websitesDescription: `Landing page, full site with an admin panel, or an online catalog. ${formatPrice(
        "webPresence",
        "en",
        { from: true },
      )}, delivery from 5 business days.`,
      customSoftwareDetailTitle: "Custom software | Dexel",
      customSoftwareDetailDescription: `Tools and applications built around your operation, with an admin panel included. ${formatPrice(
        "customTool",
        "en",
        { from: true },
      )}.`,
      micropagesTitle: "Micropages and digital invitations | Dexel",
      micropagesDescription: `Digital invitations for weddings, quinceañeras, graduations, and other events: countdown, gallery, music, and WhatsApp RSVP. ${formatPrice(
        "micropageEssential",
        "en",
        { from: true },
      )}, delivered in 24-48 hours.`,
      seoDetailTitle: "SEO: search engine positioning | Dexel",
      seoDetailDescription: `SEO audit, monthly content, and link building, with a monthly report of work delivered. ${formatPrice(
        "seoAudit",
        "en",
        { from: true },
      )}.`,
      integrationsTitle: "Integrations and APIs | Dexel",
      integrationsDescription: `We connect the systems you already have so nobody has to copy data between them. ${formatPrice(
        "integration",
        "en",
        { from: true },
      )} per integration.`,
      paymentGatewaysTitle: "Payment gateways | Dexel",
      paymentGatewaysDescription: `Take payments online on your existing site, with the gateways used in Colombia and the region. ${formatPrice(
        "paymentGateway",
        "en",
        { from: true },
      )}.`,
      maintenanceDetailTitle: "Monthly web maintenance | Dexel",
      maintenanceDetailDescription: `Updates, backups, and support for sites, applications, and agents in production, in three tiers. ${formatPrice(
        "careBasic",
        "en",
        { from: true, perMonth: true },
      )}.`,
      whatsappAutomationTitle: "WhatsApp Business automation | Dexel",
      whatsappAutomationDescription: `Chatbots and agents that answer, qualify leads, and confirm appointments over WhatsApp, with fixed rules or AI depending on the process. ${formatPrice(
        "whatsappBasic",
        "en",
        { from: true },
      )}.`,
      customAgentsTitle: "Custom agents | Dexel",
      customAgentsDescription: `Agents that query your systems, decide, and carry out the action that closes the process, not just respond. ${formatPrice(
        "automationAgent",
        "en",
        { from: true },
      )}.`,
      n8nWorkflowsTitle: "n8n workflows | Dexel",
      n8nWorkflowsDescription: `Automation hosted on your own infrastructure, with no per-operation costs that grow with volume. ${formatPrice(
        "automation",
        "en",
        { from: true },
      )}.`,
      systemIntegrationTitle: "System integration | Dexel",
      systemIntegrationDescription: `Getting your systems to stop needing someone to copy data between them. ${formatPrice(
        "systemIntegrationBasic",
        "en",
        { from: true },
      )}.`,
      automatedReportsTitle: "Automated reports | Dexel",
      automatedReportsDescription: `The report somebody builds by hand every week today, generated on its own. ${formatPrice(
        "automatedReportsBasic",
        "en",
        { from: true },
      )}.`,
      documentReadingTitle: "Automated document reading | Dexel",
      documentReadingDescription: `Pull data out of invoices, PDFs, and images without any manual retyping. ${formatPrice(
        "documentReadingBasic",
        "en",
        { from: true },
      )}.`,
      trainingTitle: "Automation and AI training for teams | Dexel",
      trainingDescription: `Live virtual automation and AI training, from a 1:1 session to a custom program. Every participant leaves with a real automation from their operation up and running. ${formatPrice(
        "mentoringSession",
        "en",
        { from: true },
      )}.`,
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
      training: "Training",
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
      primaryCta: "Book a free discovery call",
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
            { value: 300, suffix: "+", label: "Sustained monthly visits" },
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
            "Reviewing the process, we found the system worked fine: what was missing were the configured reports, so the team rebuilt them by hand in Excel every week.",
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
      pledgeTitle:
        "If the audit shows you don't need to build anything, we'll say so with the same clarity.",
      pledgeText:
        "The report is yours and it's useful either way, and you invest only in what your operation actually needs.",
      cta: `Request a process audit — ${formatPrice("audit", "en")}`,
    },
    process: {
      badge: "How we work",
      title: "No black boxes, no surprises",
      subtitle:
        "Our process is visible end to end: you always know what phase you're in, what you get, and when.",
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
      commitmentsTitle: "Four commitments in writing",
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
        {
          iconName: "GraduationCap",
          title: "We train your team before we leave",
          desc: "Every delivery includes a live training session with the people who will actually use the system, plus live Q&A. We don't hand over a manual and disappear.",
        },
      ],
      cta: "Book a free discovery call",
    },
    contact: {
      titleStart: "Let's start the",
      titleHighlight: "Process.",
      description:
        "Message us on WhatsApp and tell us what you need to solve. We'll reply with the next step: a proposal, a free 30-minute call, or the honesty to tell you there's nothing you need to build.",
      button: "Message us on WhatsApp",
      responseTime: "We reply within 4 business hours",
    },
    services: servicesCopy.en,
    categories: categoriesCopy.en,
    training: trainingCopy.en,
    chrome: categoryChromeCopy.en,
    audit: auditCopy.en,
    serviceDetails: serviceDetailsCopy.en,
    privacy: privacyCopy.en,
    notFound: notFoundCopy.en,
    consent: consentCopy.en,
    footer: {
      title: "Let's talk about your project",
      contactButton: "Contact us",
      responseTime: "We reply in under 4 business hours",
      services: "Services",
      audit: "Audit",
      training: "Training",
      contact: "Contact us",
      privacy: "Privacy",
      rights: "All rights reserved.",
      whatsappAria: "Open WhatsApp chat",
      whatsappText: "Hi Dexel, I want a quote",
    },
  },
};

export const defaultLocale = "es";
