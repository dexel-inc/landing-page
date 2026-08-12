import { formatPrice } from "../config/pricing.js";

/**
 * Catálogo de servicios y detalle de la auditoría, en los dos idiomas.
 *
 * Vive fuera de `messages.js` por dos razones: es el contenido que más se
 * itera, y es el único que tiene estructura propia (niveles, entregables,
 * pasos) en vez de ser cadenas sueltas.
 *
 * Fuente única: tanto la sección de la home como la página `/servicios` leen
 * de `items`. Antes había dos catálogos distintos —seis tarjetas en la home y
 * cuatro líneas en la página— que ya se habían desincronizado entre sí.
 *
 * Ningún precio se escribe a mano aquí: todos salen de `config/pricing.js`.
 */

const es = {
  title: "Nuestros servicios",
  badge: "Servicios Dexel",
  subtitle: "Empiece por donde más le duela: no hace falta contratar todo.",
  intro:
    "Tres categorías. La primera mide, las otras dos construyen. Cada una tiene su propia página con el alcance completo. Todos los precios están en dólares estadounidenses.",
  categoryLabel: "Incluye",
  categoryCta: "Ver la página",

  featuredLabel: "Empiece por aquí",
  serviceLabel: "Servicio",
  forWhoLabel: "Para quién es",
  deliveryLabel: "Tiempo de entrega",
  deliverablesLabel: "Qué recibe",
  tiersLabel: "Dos niveles",
  detailCta: "Ver qué incluye",
  cta: "Ver detalles",
  quoteCta: "Solicitar cotización",
  auditCta: `Solicitar auditoría — ${formatPrice("audit", "es")}`,

  items: [
    {
      id: "auditoria",
      slug: "auditoria",
      iconName: "ScanSearch",
      featured: true,
      badge: "Se descuenta 100% del proyecto",
      title: "Auditoría de procesos",
      price: formatPrice("audit", "es"),
      delivery: "5 a 7 días hábiles",
      desc: "Revisamos cómo trabaja su equipo hoy y le decimos exactamente qué procesos se pueden automatizar, cuántas horas al mes recuperaría y cuánto costaría cada implementación. Si concluimos que no necesita construir nada, se lo decimos.",
      forWho:
        "Equipos desde 8-10 personas, o empresas con varios procesos corriendo en paralelo.",
      deliverables: [
        "Mapa de sus procesos actuales, paso a paso",
        "Matriz de oportunidades ordenada por impacto",
        "Cuántas horas al mes consume cada proceso y cuánto cuestan",
        "Un quick win identificado y presupuestado, con precio cerrado",
        "Roadmap por fases: en qué orden conviene implementar",
        "Revisión de las herramientas que ya paga",
        "Riesgos operativos de la operación actual",
        "Sesión de resultados en vivo con su equipo",
      ],
      ctaKey: "auditCta",
      detailRouteKey: "audit",
    },
    {
      id: "automatizacion",
      slug: "automatizacion-e-integracion",
      iconName: "Zap",
      title: "Automatización e integración",
      price: formatPrice("automation", "es", { from: true }),
      delivery: "2 a 6 semanas",
      desc: "Automatizamos los procesos manuales que consumen horas de su equipo e integramos los sistemas que ya tiene para que dejen de necesitar que alguien copie datos entre ellos.",
      forWho:
        "Equipos que copian datos entre sistemas, arman reportes a mano o digitan lo que llega por correo y WhatsApp.",
      deliverables: [
        "Automatización de procesos operativos",
        "Integración entre sistemas existentes",
        "Automatización en WhatsApp Business",
        "Bots de atención y respuesta automática",
        "Sincronización de datos entre plataformas",
        "Reportes que se generan solos",
      ],
      ctaKey: "quoteCta",
    },
    {
      id: "software-medida",
      slug: "software-a-la-medida",
      iconName: "Cpu",
      title: "Software a la medida",
      price: formatPrice("customSoftware", "es", { from: true }),
      delivery: "4 a 8 semanas",
      desc: "Convertimos su operación en un sistema. Aplicaciones web construidas alrededor de cómo trabaja su empresa, no al revés.",
      forWho:
        "Negocios que administran pedidos, inventario, clientes o procesos internos repartidos entre planillas y correos.",
      deliverables: [
        "Panel para administrar su operación sin depender de nosotros",
        "Base de datos diseñada para su flujo real",
        "API propia para conectar con otros sistemas",
        "Control de usuarios y permisos",
        "Desplegado en la nube y listo para crecer",
      ],
      ctaKey: "quoteCta",
    },
    {
      id: "presencia-web",
      slug: "presencia-web",
      iconName: "Globe",
      title: "Presencia web",
      price: formatPrice("webPresence", "es", { from: true }),
      delivery: "5 días a 4 semanas",
      desc: "Su empresa existiendo en internet, en dos niveles según lo que necesite resolver: una página única que convierta, o un sitio completo que su equipo pueda administrar.",
      forWho:
        "Empresas que todavía no tienen sitio, o que tienen uno que no pueden actualizar sin llamar a alguien.",
      deliverables: [
        "Sitio publicado y funcionando",
        "Diseño responsivo para celular",
        "SEO y analítica configuradas",
        "Formulario de contacto conectado a WhatsApp",
        "Hosting y dominio por 1 año",
      ],
      tiers: [
        {
          name: "Nivel Landing",
          price: formatPrice("webPresenceLanding", "es", { from: true }),
          delivery: "5 a 7 días hábiles",
          items: [
            "Página única enfocada en conversión",
            "Diseño sobre plantillas probadas",
            "Formulario de contacto conectado a WhatsApp",
            "SEO básico y analítica",
            "Hosting y dominio por 1 año",
          ],
        },
        {
          name: "Nivel Sitio completo",
          price: formatPrice("webPresence", "es", { from: true }),
          delivery: "2 a 4 semanas",
          items: [
            "Páginas múltiples con diseño propio",
            "Panel para administrar el contenido usted mismo",
            "SEO avanzado y analítica configurada",
            "Soporte 30 días post-lanzamiento",
            "Hosting y dominio por 1 año",
          ],
        },
      ],
      ctaKey: "quoteCta",
    },
    {
      id: "mantenimiento",
      slug: "mantenimiento",
      iconName: "Wrench",
      title: "Mantenimiento",
      price: formatPrice("maintenance", "es", { from: true, perMonth: true }),
      delivery: "Mensual, sin permanencia",
      desc: "Soporte continuo y actualizaciones para proyectos desarrollados por Dexel, garantizando su óptimo funcionamiento.",
      forWho:
        "Proyectos ya en producción que no pueden darse el lujo de caerse ni de quedarse quietos.",
      deliverables: [
        "Actualizaciones de seguridad",
        "Corrección de bugs",
        "Backups automáticos",
        "Monitoreo de rendimiento",
        "Soporte técnico prioritario",
      ],
      ctaKey: "quoteCta",
    },
  ],

  faqTitle: "Preguntas frecuentes",
  faqSubtitle: "Las dudas que nos hacen antes de contratar",
  faqs: [
    {
      question: "¿La auditoría se descuenta de verdad?",
      answer: `Sí, completa. Si decide avanzar con la implementación dentro de los 60 días siguientes a la entrega del informe, los ${formatPrice(
        "audit",
        "es",
      )} se descuentan del precio del proyecto. Antes de la auditoría hay una llamada de discovery de 30 minutos sin costo, para confirmar que la auditoría tiene sentido en su caso.`,
    },
    {
      question: "¿Y si la auditoría concluye que no necesito construir nada?",
      answer:
        "Se lo decimos por escrito, en el mismo informe. Es un resultado posible y no nos incomoda: el informe es suyo y le sirve igual, con nosotros o con cualquier otro proveedor. Preferimos perder un proyecto a venderle uno que no necesita.",
    },
    {
      question: "¿De quién es el código que ustedes desarrollan?",
      answer:
        "Suyo, desde el primer commit. El repositorio queda a nombre de su empresa, no de Dexel. Si mañana decide trabajar con otro proveedor, se lleva todo sin pedirnos permiso.",
    },
    {
      question: "¿Qué pasa si el alcance cambia a mitad del proyecto?",
      answer:
        "El precio se cierra antes de escribir la primera línea de código. Si aparece algo nuevo, lo cotizamos aparte y usted decide si entra ahora o después. Nunca le llega una factura con sorpresas.",
    },
    {
      question: "¿Firman acuerdos de confidencialidad?",
      answer:
        "Sí, y los cumplimos. La mayor parte de nuestro trabajo son sistemas internos que no podemos mostrar públicamente, justamente por eso. Su proyecto recibiría la misma discreción.",
    },
    {
      question: "¿Cuánto tiempo toma tener algo funcionando?",
      answer:
        "Depende del servicio: la auditoría de procesos en 5 a 7 días hábiles, presencia web entre 5 días y 4 semanas, una automatización o integración en 2 a 6 semanas, y software a la medida en 4 a 8 semanas. En todos los casos ve una demo funcionando cada viernes, no un informe de avance.",
    },
  ],
};

const auditEs = {
  navLabel: "Auditoría de procesos",
  badge: "Producto de entrada",
  title: "Auditoría de procesos",
  subtitle:
    "Antes de construir nada, medimos. Recibe cifras concretas sobre su propia operación: cuántas horas se van, en qué se van y cuánto costaría recuperarlas.",
  priceLabel: "Precio",
  price: formatPrice("audit", "es"),
  deliveryLabel: "Entrega",
  delivery: "5 a 7 días hábiles",
  discountBadge: "Se descuenta 100% del proyecto",

  deliverablesTitle: "Qué entregamos",
  deliverablesIntro: "Ocho entregables, todos por escrito.",
  deliverables: [
    {
      title: "Mapa de procesos actuales",
      text: "Cómo funciona hoy su operación, paso a paso.",
    },
    {
      title: "Matriz de oportunidades",
      text: "Qué se puede automatizar, ordenado por impacto.",
    },
    {
      title: "Cuantificación de horas",
      text: "Cuántas horas al mes consume cada proceso y cuánto cuestan esas horas.",
    },
    {
      title: "Quick win identificado y presupuestado",
      text: "La automatización de mayor retorno y menor esfuerzo, con precio cerrado.",
    },
    {
      title: "Roadmap por fases",
      text: "En qué orden conviene implementar y por qué.",
    },
    {
      title: "Revisión de herramientas que ya paga",
      text: "Licencias subutilizadas, duplicadas o que se pisan entre sí.",
    },
    {
      title: "Riesgos operativos",
      text: "Procesos que dependen de una sola persona, respaldos, continuidad si algo falla.",
    },
    {
      title: "Sesión de resultados",
      text: "Presentación en vivo con su equipo, no un PDF enviado por correo.",
    },
  ],

  afterTitle: "Qué pasa después de la auditoría",
  afterIntro: "El camino completo, antes de que pague.",
  steps: [
    {
      label: "Paso 1",
      title: "Recibe el informe",
      when: "Día 5-7",
      text: "Con cifras concretas. El informe es suyo: puede usarlo con nosotros o llevarlo a cualquier otro proveedor.",
    },
    {
      label: "Paso 2",
      title: "Decide qué implementar",
      when: "Sin plazo",
      text: "Puede implementar todo, una parte o nada. Si la auditoría concluye que no hace falta construir nada, se lo decimos por escrito.",
    },
    {
      label: "Paso 3",
      title: "Propuesta cerrada",
      when: "48 horas",
      text: "Alcance cerrado, precio fijo y cronograma. Lo que no está escrito no está incluido, y lo decimos de frente.",
    },
    {
      label: "Paso 4",
      title: `Se descuentan los ${formatPrice("audit", "es")}`,
      when: "60 días",
      text: "Si decide avanzar dentro de los 60 días siguientes, el costo completo de la auditoría se descuenta del proyecto.",
    },
  ],

  scopeTitle: "Cuándo tiene sentido",
  scopeNote:
    "La auditoría tiene sentido a partir de 8-10 personas en el equipo o cuando hay varios procesos corriendo en paralelo. Si su operación es más pequeña, dígalo en la llamada de discovery y le ahorramos el gasto.",

  processTitle: "Cómo trabajamos",
  processIntro:
    "Las seis fases completas, para que vea dónde encaja la auditoría antes de comprarla.",

  faqTitle: "Preguntas frecuentes",
  faqSubtitle: "Lo que nos preguntan antes de comprar la auditoría",
  faqs: [
    {
      question: "¿La auditoría se descuenta de verdad?",
      answer: `Sí, completa. Si decide avanzar con la implementación dentro de los 60 días siguientes a la entrega del informe, los ${formatPrice(
        "audit",
        "es",
      )} se descuentan del precio del proyecto. Antes de la auditoría hay una llamada de discovery de 30 minutos sin costo, para confirmar que la auditoría tiene sentido en su caso.`,
    },
    {
      question: "¿Y si la auditoría concluye que no necesito construir nada?",
      answer:
        "Se lo decimos por escrito, en el mismo informe. Es un resultado posible y no nos incomoda: el informe es suyo y le sirve igual, con nosotros o con cualquier otro proveedor. Preferimos perder un proyecto a venderle uno que no necesita.",
    },
    {
      question: "¿Desde qué tamaño de equipo tiene sentido?",
      answer:
        "Desde 8-10 personas, o cuando hay varios procesos corriendo en paralelo. Si su operación es más pequeña, dígalo en la llamada de discovery y le ahorramos el gasto: con un solo proceso identificado se puede cotizar la automatización directamente.",
    },
    {
      question: "¿Cuánto tiempo le toma a mi equipo?",
      answer:
        "La auditoría se entrega en 5 a 7 días hábiles y el trabajo pesado es nuestro. De su lado se necesitan las conversaciones con quienes ejecutan los procesos y acceso de lectura a las herramientas que ya usa, más la sesión de resultados en vivo al final.",
    },
    {
      question: "¿El informe sirve si trabajo con otro proveedor?",
      answer:
        "Sí. El informe es suyo y está escrito para que cualquier equipo técnico pueda ejecutarlo: mapa de procesos, matriz de oportunidades, horas cuantificadas y roadmap por fases. No lleva candado ni depende de que nos contrate.",
    },
  ],

  ctaTitle: "Empiece por medir",
  ctaText:
    "Cinco a siete días hábiles y sabrá exactamente qué automatizar, cuánto cuesta y cuántas horas al mes recupera.",

  cta: `Solicitar auditoría — ${formatPrice("audit", "es")}`,
  backLabel: "Ver todos los servicios",
};

const en = {
  title: "Our services",
  badge: "Dexel Services",
  subtitle: "Start wherever it hurts most: you don't have to buy all of it.",
  intro:
    "Three categories. The first one measures, the other two build. Each has its own page with the full scope. All prices are in US dollars.",
  categoryLabel: "Includes",
  categoryCta: "Open the page",

  featuredLabel: "Start here",
  serviceLabel: "Service",
  forWhoLabel: "Who it's for",
  deliveryLabel: "Delivery time",
  deliverablesLabel: "What you get",
  tiersLabel: "Two tiers",
  detailCta: "See what's included",
  cta: "View details",
  quoteCta: "Request a quote",
  auditCta: `Request the audit — ${formatPrice("audit", "en")}`,

  items: [
    {
      id: "auditoria",
      slug: "process-audit",
      iconName: "ScanSearch",
      featured: true,
      badge: "100% credited toward your project",
      title: "Process audit",
      price: formatPrice("audit", "en"),
      delivery: "5 to 7 business days",
      desc: "We review how your team works today and tell you exactly which processes can be automated, how many hours a month you would get back, and what each implementation would cost. If we conclude you don't need to build anything, we say so.",
      forWho:
        "Teams of 8-10 people and up, or companies running several processes in parallel.",
      deliverables: [
        "A map of your current processes, step by step",
        "An opportunity matrix ranked by impact",
        "How many hours a month each process consumes, and what they cost",
        "One quick win identified and budgeted, at a closed price",
        "A phased roadmap: what to implement first and why",
        "A review of the tools you already pay for",
        "Operational risks in your current setup",
        "A live results session with your team",
      ],
      ctaKey: "auditCta",
      detailRouteKey: "audit",
    },
    {
      id: "automatizacion",
      slug: "automation-and-integration",
      iconName: "Zap",
      title: "Automation & integration",
      price: formatPrice("automation", "en", { from: true }),
      delivery: "2 to 6 weeks",
      desc: "We automate the manual processes that eat your team's hours, and we integrate the systems you already have so nobody has to copy data between them anymore.",
      forWho:
        "Teams copying data between systems, building reports by hand, or retyping what arrives by email and WhatsApp.",
      deliverables: [
        "Operational process automation",
        "Integration between existing systems",
        "WhatsApp Business automation",
        "Support and auto-reply bots",
        "Data sync across platforms",
        "Reports that generate themselves",
      ],
      ctaKey: "quoteCta",
    },
    {
      id: "software-medida",
      slug: "custom-software",
      iconName: "Cpu",
      title: "Custom software",
      price: formatPrice("customSoftware", "en", { from: true }),
      delivery: "4 to 8 weeks",
      desc: "We turn your operation into a system. Web applications built around how your company actually works, not the other way around.",
      forWho:
        "Businesses managing orders, inventory, customers, or internal processes scattered across spreadsheets and email.",
      deliverables: [
        "A panel to run your operation without depending on us",
        "A database designed for how you actually work",
        "Your own API to connect with other systems",
        "User and permission control",
        "Deployed to the cloud and ready to grow",
      ],
      ctaKey: "quoteCta",
    },
    {
      id: "presencia-web",
      slug: "web-presence",
      iconName: "Globe",
      title: "Web presence",
      price: formatPrice("webPresence", "en", { from: true }),
      delivery: "5 days to 4 weeks",
      desc: "Your company existing online, in two tiers depending on what you need to solve: a single page that converts, or a full site your team can manage.",
      forWho:
        "Companies with no site yet, or with one they can't update without calling someone.",
      deliverables: [
        "Site published and running",
        "Responsive design for mobile",
        "SEO and analytics configured",
        "Contact form connected to WhatsApp",
        "Hosting and domain for 1 year",
      ],
      tiers: [
        {
          name: "Landing tier",
          price: formatPrice("webPresenceLanding", "en", { from: true }),
          delivery: "5 to 7 business days",
          items: [
            "Single page focused on conversion",
            "Design built on proven templates",
            "Contact form connected to WhatsApp",
            "Basic SEO and analytics",
            "Hosting and domain for 1 year",
          ],
        },
        {
          name: "Full site tier",
          price: formatPrice("webPresence", "en", { from: true }),
          delivery: "2 to 4 weeks",
          items: [
            "Multiple pages with custom design",
            "A panel to manage the content yourself",
            "Advanced SEO and configured analytics",
            "30 days of post-launch support",
            "Hosting and domain for 1 year",
          ],
        },
      ],
      ctaKey: "quoteCta",
    },
    {
      id: "mantenimiento",
      slug: "maintenance",
      iconName: "Wrench",
      title: "Maintenance",
      price: formatPrice("maintenance", "en", { from: true, perMonth: true }),
      delivery: "Monthly, no lock-in",
      desc: "Continuous support and updates for projects built by Dexel, keeping them running the way they should.",
      forWho:
        "Projects already in production that can't afford to go down or to stand still.",
      deliverables: [
        "Security updates",
        "Bug fixes",
        "Automated backups",
        "Performance monitoring",
        "Priority technical support",
      ],
      ctaKey: "quoteCta",
    },
  ],

  faqTitle: "Frequently asked questions",
  faqSubtitle: "What people ask us before signing",
  faqs: [
    {
      question: "Is the audit really credited back?",
      answer: `Yes, in full. If you move forward with implementation within 60 days of receiving the report, the ${formatPrice(
        "audit",
        "en",
      )} come off the project price. Before the audit there's a free 30-minute discovery call to confirm the audit makes sense in your case.`,
    },
    {
      question: "What if the audit concludes I don't need to build anything?",
      answer:
        "We say so in writing, in the report itself. It's a possible outcome and it doesn't bother us: the report is yours and it's useful either way, with us or with any other vendor. We'd rather lose a project than sell you one you don't need.",
    },
    {
      question: "Who owns the code you write?",
      answer:
        "You do, from the first commit. The repository is in your company's name, not Dexel's. If you decide to work with another vendor tomorrow, you take everything without asking us.",
    },
    {
      question: "What happens if the scope changes mid-project?",
      answer:
        "The price is closed before we write the first line of code. If something new comes up, we quote it separately and you decide whether it goes in now or later. You never get an invoice with surprises.",
    },
    {
      question: "Do you sign non-disclosure agreements?",
      answer:
        "Yes, and we honor them. Most of our work is internal systems we can't show publicly, precisely for that reason. Your project would get the same discretion.",
    },
    {
      question: "How long until something is working?",
      answer:
        "It depends on the service: the process audit in 5 to 7 business days, web presence between 5 days and 4 weeks, an automation or integration in 2 to 6 weeks, and custom software in 4 to 8 weeks. In every case you see a working demo every Friday, not a status report.",
    },
  ],
};

const auditEn = {
  navLabel: "Process audit",
  badge: "Entry product",
  title: "Process audit",
  subtitle:
    "Before we build anything, we measure. You get concrete numbers about your own operation: how many hours are going out, where, and what it would cost to get them back.",
  priceLabel: "Price",
  price: formatPrice("audit", "en"),
  deliveryLabel: "Delivery",
  delivery: "5 to 7 business days",
  discountBadge: "100% credited toward your project",

  deliverablesTitle: "What we deliver",
  deliverablesIntro: "Eight deliverables, all in writing.",
  deliverables: [
    {
      title: "Map of current processes",
      text: "How your operation works today, step by step.",
    },
    {
      title: "Opportunity matrix",
      text: "What can be automated, ranked by impact.",
    },
    {
      title: "Hours quantified",
      text: "How many hours a month each process consumes, and what those hours cost.",
    },
    {
      title: "Quick win identified and budgeted",
      text: "The automation with the highest return and lowest effort, at a closed price.",
    },
    {
      title: "Phased roadmap",
      text: "What order to implement in, and why.",
    },
    {
      title: "Review of tools you already pay for",
      text: "Underused licenses, duplicates, and tools that overlap with each other.",
    },
    {
      title: "Operational risks",
      text: "Processes that depend on a single person, backups, continuity if something fails.",
    },
    {
      title: "Results session",
      text: "A live presentation with your team, not a PDF sent by email.",
    },
  ],

  afterTitle: "What happens after the audit",
  afterIntro: "The whole path, before you pay.",
  steps: [
    {
      label: "Step 1",
      title: "You get the report",
      when: "Day 5-7",
      text: "With concrete numbers. The report is yours: use it with us or take it to any other vendor.",
    },
    {
      label: "Step 2",
      title: "You decide what to implement",
      when: "No deadline",
      text: "Implement all of it, part of it, or none. If the audit concludes you don't need to build anything, we put that in writing.",
    },
    {
      label: "Step 3",
      title: "Closed proposal",
      when: "48 hours",
      text: "Closed scope, fixed price, and timeline. If it isn't written down, it isn't included, and we say so upfront.",
    },
    {
      label: "Step 4",
      title: `The ${formatPrice("audit", "en")} comes off`,
      when: "60 days",
      text: "If you decide to move forward within the next 60 days, the full cost of the audit is credited toward the project.",
    },
  ],

  scopeTitle: "When it makes sense",
  scopeNote:
    "The audit makes sense from about 8-10 people on the team, or when you have several processes running in parallel. If your operation is smaller, say so on the discovery call and we'll save you the expense.",

  processTitle: "How we work",
  processIntro: "All six phases, so you can see where the audit fits before you buy it.",

  faqTitle: "Frequently asked questions",
  faqSubtitle: "What people ask before buying the audit",
  faqs: [
    {
      question: "Is the audit really credited back?",
      answer: `Yes, in full. If you move forward with implementation within 60 days of receiving the report, the ${formatPrice(
        "audit",
        "en",
      )} come off the project price. Before the audit there's a free 30-minute discovery call to confirm the audit makes sense in your case.`,
    },
    {
      question: "What if the audit concludes I don't need to build anything?",
      answer:
        "We say so in writing, in the report itself. It's a possible outcome and it doesn't bother us: the report is yours and it's useful either way, with us or with any other vendor. We'd rather lose a project than sell you one you don't need.",
    },
    {
      question: "How big does my team need to be for this to make sense?",
      answer:
        "From about 8-10 people, or when several processes run in parallel. If your operation is smaller, say so on the discovery call and we'll save you the expense: with a single identified process, the automation can be quoted directly.",
    },
    {
      question: "How much of my team's time does it take?",
      answer:
        "The audit is delivered in 5 to 7 business days and the heavy lifting is ours. On your side we need conversations with the people who actually run the processes and read access to the tools you already use, plus the live results session at the end.",
    },
    {
      question: "Is the report useful if I work with another vendor?",
      answer:
        "Yes. The report is yours and it's written so any technical team can execute it: process map, opportunity matrix, quantified hours, and a phased roadmap. It isn't locked, and it doesn't depend on you hiring us.",
    },
  ],

  ctaTitle: "Start by measuring",
  ctaText:
    "Five to seven business days and you'll know exactly what to automate, what it costs, and how many hours a month you get back.",

  cta: `Request the audit — ${formatPrice("audit", "en")}`,
  backLabel: "See all services",
};

export const servicesCopy = { es, en };
export const auditCopy = { es: auditEs, en: auditEn };
