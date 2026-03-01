export const messages = {
  es: {
    meta: {
      brand: "Dexel",
      homeTitle: "Dexel - Desarrollo de software a la medida",
      homeDescription:
        "Dexel desarrolla software a la medida para empresas: páginas web, sitios corporativos, aplicaciones web, automatización y consultoría tecnológica.",
      servicesTitle: "Dexel | Servicios de desarrollo de software",
      servicesDescription:
        "Conoce los servicios de Dexel: páginas web, sitios web, aplicaciones web y soluciones técnicas para escalar tu negocio.",
      contactTitle: "Dexel | Contacto y cotización de software",
      contactDescription:
        "Contáctanos para cotizar tu proyecto de software. Te ayudamos a diseñar y construir soluciones digitales alineadas a tus objetivos.",
      siteName: "Dexel",
      type: "website",
    },
    nav: {
      home: "Inicio",
      services: "Servicios",
      stack: "Stack",
      contact: "Contacto",
      language: "Idioma",
      spanish: "ES",
      english: "EN",
      theme: "Tema",
      auto: "Auto",
      themeToggle: "Cambiar tema",
    },
    hero: {
      badge: "Desarrollo de Software a la medida",
      title:
        "Donde la complejidad técnica se encuentra con el diseño elegante. Creamos ecosistemas digitales a la medida para personas o empresas que no aceptan límites.",
      scroll: "Scroll para hacer tu idea realidad",
      h1: "Desarrollo de software a la medida para empresas",
    },
    homeSeo: {
      title: "Soluciones digitales orientadas a resultados",
      intro:
        "En Dexel combinamos estrategia, diseño y tecnología para construir productos digitales rápidos, escalables y mantenibles.",
      points: [
        {
          title: "Arquitectura sólida",
          text: "Definimos bases técnicas claras para que tu producto pueda crecer sin deuda innecesaria.",
        },
        {
          title: "Enfoque en negocio",
          text: "Cada decisión de producto y desarrollo se conecta con objetivos medibles de tu empresa.",
        },
        {
          title: "Ejecución ágil",
          text: "Entregamos en ciclos iterativos con visibilidad constante de avances, riesgos y prioridades.",
        },
      ],
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
          "flow": [
            {
              "bot": "👋 ¡Hola! Soy el asistente de DEXEL.\n\nEstoy aquí para ayudarte a dar el primer paso con tu proyecto. ¿Cuál es tu nombre o el nombre de tu empresa?",
              "field": "nombre"
            },
            {
              "bot": "¡Un placer, {{nombre}}! 😊\n\n¿A qué se dedica tu empresa o en qué industria operás?",
              "field": "industria"
            },
            {
              "bot": "Perfecto 👍\n\n¿Cuál es el principal problema o necesidad que querés resolver con software? Contámelo con tus palabras.",
              "field": "problema"
            },
            {
              "bot": "¡Muy claro! ¿Tenés alguna idea del tipo de solución que buscás?\n\nPor ejemplo: app mobile, sistema web, automatización, integración de herramientas, etc.",
              "field": "solucion"
            },
            {
              "bot": "Excelente 🚀\n\n¿En qué plazo aproximado necesitarías tener esto funcionando?",
              "field": "plazo"
            },
            {
              "bot": "¡Listo, {{nombre}}! Ya tengo todo lo que necesito. 🎉\n\nPreparé un resumen con tu información. Al presionar el botón vas a ser redirigido a WhatsApp para que nuestro equipo te contacte y arranquemos juntos.",
              "field": null,
              "isFinal": true
            }
          ],
          "whatsappMessage": {
            "header": "*Nuevo contacto desde el sitio — DEXEL*",
            "intro": "¡Hola! Me comunico desde el sitio web con la siguiente información:",
            "fields": {
              "nombre": "*Nombre / Empresa:*",
              "industria": "*Industria:*",
              "problema": "*Problema a resolver:*",
              "solucion": "*Tipo de solución buscada:*",
              "plazo": "*Plazo estimado:*"
            },
            "outro": "Quedo a disposición para iniciar el proceso de toma de requerimientos."
          }
      },
    },
    services: {
      title: "Nuestros Servicios",
      badge: "Servicios Dexel",
      subtitle: "Soluciones digitales adaptadas a tus necesidades",
      serviceLabel: "Servicio",
      cta: "Ver detalles",
      ctaButton: "Solicitar cotización",
      list: [
        {
          iconName: "Code",
          title: "Páginas web",
          price: "Desde $100 USD",
          desc: "Páginas individuales diseñadas para presentar información clave de manera clara y accesible. Perfectas para emprendedores y pequeños negocios que necesitan presencia digital rápida.",
          features: [
            "Diseño responsive y moderno",
            "Optimización SEO básica",
            "Formulario de contacto",
            "Enlace a redes sociales",
            "Hosting y dominio incluido (1 año)",
          ],
        },
        {
          iconName: "Globe",
          title: "Sitios web",
          price: "Desde $500 USD",
          desc: "Conjunto de páginas interconectadas que brindan una experiencia estructurada y profesional. Ideales para empresas que requieren múltiples secciones y navegación intuitiva.",
          features: [
            "Múltiples páginas personalizadas",
            "Panel de administración",
            "Optimización SEO avanzada",
            "Integración con analíticas",
            "Soporte técnico 30 días",
          ],
        },
        {
          iconName: "Cpu",
          title: "Aplicativos web",
          price: "Desde $1000 USD",
          desc: "Aplicaciones web escalables para automatizar procesos y gestionar datos en tiempo real. Soluciones personalizadas que transforman operaciones complejas en sistemas eficientes.",
          features: [
            "Arquitectura escalable",
            "Base de datos optimizada",
            "API REST personalizada",
            "Autenticación de usuarios",
            "Despliegue en la nube",
          ],
        },
        {
          iconName: "MessageCircle",
          title: "Bot de redes sociales",
          price: "Desde $250 USD",
          desc: "Automatización inteligente para gestionar interacciones y respuestas en tus redes sociales. Mantén a tu audiencia comprometida 24/7 con respuestas instantáneas.",
          features: [
            "Respuestas automáticas 24/7",
            "Integración multi-plataforma",
            "Análisis de sentimientos",
            "Programación de publicaciones",
            "Dashboard de estadísticas",
          ],
        },
        {
          iconName: "FileText",
          title: "Asesoría tecnológica",
          price: "Consultar",
          desc: "Análisis y definición de requisitos técnicos para materializar tus ideas en soluciones digitales. Te acompañamos desde la conceptualización hasta el plan de ejecución.",
          features: [
            "Análisis de viabilidad técnica",
            "Definición de arquitectura",
            "Estimación de costos",
            "Roadmap de desarrollo",
            "Recomendación de tecnologías",
          ],
        },
        {
          iconName: "Wrench",
          title: "Mantenimiento de proyectos",
          price: "Consultar",
          desc: "Soporte continuo y actualizaciones para proyectos desarrollados por Dexel, garantizando su óptimo funcionamiento.",
          features: [
            "Actualizaciones de seguridad",
            "Corrección de bugs",
            "Backups automáticos",
            "Monitoreo de rendimiento",
            "Soporte técnico prioritario",
          ],
        },
      ],
      detailedList: [
        {
          id: "pagina-web",
          iconName: "Code",
          title: "Páginas web",
          price: "Desde $100",
          pricingNote: "Pago único / Entrega de 5 a 7 días hábiles",
          description:
            "Páginas individuales diseñadas para presentar información clave de manera clara, accesible y visualmente atractiva.",
          features: ["Diseño genérico", "Diseño responsivo", "Formulario de contacto"],
          image: "/images/services/service-web-page.svg",
        },
        {
          id: "sitio-web",
          iconName: "Globe",
          title: "Sitios web",
          price: "Desde $300",
          pricingNote: "Según requerimientos / Entrega de 2 a 4 semanas",
          description:
            "Sitios web profesionales con múltiples páginas, diseño personalizado y estructura adaptable para una experiencia sólida en cualquier dispositivo.",
          features: [
            "Diseño personalizado",
            "Hasta 5 páginas web",
            "Diseño responsivo",
            "Gestión de contenido básico",
            "Soporte para múltiples idiomas",
            "Certificado SSL incluido",
          ],
          image: "/images/services/service-website.svg",
        },
        {
          id: "aplicacion-web",
          iconName: "Cpu",
          title: "Aplicaciones web",
          price: "Desde $1,000",
          pricingNote: "Según requerimientos",
          description:
            "Soluciones web personalizadas con funcionalidades avanzadas para necesidades específicas de negocio.",
          features: [
            "Análisis y planificación detallada",
            "Diseño de interfaz intuitiva",
            "Desarrollo front-end y back-end",
            "Panel de administración personalizado",
            "Integraciones con APIs y servicios externos",
            "Soporte técnico post-lanzamiento",
          ],
          image: "/images/services/service-web-app.svg",
        },
        {
          id: "servicios-generales",
          iconName: "Wrench",
          title: "Servicios generales",
          price: "Precio variable",
          pricingNote: "Según requerimientos",
          description:
            "Servicios técnicos a medida como integraciones de pasarela de pago, consultoría técnica y soporte evolutivo.",
          features: [
            "Integración con pasarelas de pago",
            "Consultoría técnica para proyectos web",
            "Desarrollo front-end y back-end",
            "Integraciones con APIs y servicios externos",
            "Soporte técnico post-lanzamiento",
          ],
          image: "/images/services/service-general.svg",
        },
      ],
      faqTitle: "Preguntas Frecuentes",
      faqSubtitle: "Respuestas a las dudas más comunes sobre nuestros servicios",
      faqs: [
        {
          question: "¿Cuánto tiempo toma desarrollar un proyecto?",
          answer:
            "Depende del alcance. Una página web puede estar en 5-7 días hábiles, un sitio web en 2-4 semanas y una aplicación web entre 4-8 semanas según complejidad.",
        },
        {
          question: "¿Qué incluye el mantenimiento de mi sitio web?",
          answer:
            "Incluye actualizaciones de seguridad, copias de seguridad regulares, soporte técnico y correcciones de errores. Ajustamos el plan al contexto de cada cliente.",
        },
        {
          question: "¿Puedo actualizar mi sitio web por mi cuenta?",
          answer:
            "Sí. Podemos integrar un CMS para que edites textos e imágenes sin conocimientos técnicos avanzados.",
        },
        {
          question: "¿Ofrecen servicios de hosting y dominio?",
          answer:
            "Sí, podemos gestionar hosting y dominio, o trabajar con proveedores que ya tengas contratados.",
        },
      ],
    },
    stack: {
      title: "Stack tecnológico",
      subtitle: "Herramientas de vanguardia para proyectos de calidad",
    },
    footer: {
      title: "¿Qué estás esperando?",
      contactButton: "Contáctanos",
      services: "Servicios",
      contact: "Contáctanos",
      rights: "Todos los derechos reservados.",
      whatsappAria: "Abrir chat de WhatsApp",
      whatsappText: "Hola Dexel, quiero una cotización",
    },
  },
  en: {
    meta: {
      brand: "Dexel",
      homeTitle: "Dexel - Custom software development",
      homeDescription:
        "Dexel builds custom software for companies: landing pages, business websites, web applications, automation, and technology consulting.",
      servicesTitle: "Dexel | Software development services",
      servicesDescription:
        "Explore Dexel services: web pages, websites, web applications, and technical solutions to scale your business.",
      contactTitle: "Dexel | Contact and software quote",
      contactDescription:
        "Contact us to quote your software project. We help design and build digital solutions aligned with your business goals.",
      siteName: "Dexel",
      type: "website",
    },
    nav: {
      home: "Home",
      services: "Services",
      stack: "Stack",
      contact: "Contact",
      language: "Language",
      spanish: "ES",
      english: "EN",
      theme: "Theme",
      auto: "Auto",
      themeToggle: "Toggle theme",
    },
    hero: {
      badge: "Custom Software Development",
      title:
        "Where technical complexity meets elegant design. We build tailored digital ecosystems for people and companies that do not accept limits.",
      scroll: "Scroll to bring your idea to life",
      h1: "Custom software development for companies",
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
    contact: {
      titleStart: "Let's start the",
      titleHighlight: "Process.",
      description:
          "Forget static forms. Interact directly with our pre-analysis core. Tell us your technical challenge and get a preliminary assessment in real time.",
      chat: {
        status: "DEXEL - ONLINE",
        placeholder: "Type your requirement...",
        "whatsappButton": "Continue on WhatsApp",
        "flow": [
          {
            "bot": "👋 Hi! I'm DEXEL's assistant.\n\nI'm here to help you take the first step with your project. What's your name or your company's name?",
            "field": "nombre"
          },
          {
            "bot": "Great to meet you, {{nombre}}! 😊\n\nWhat does your company do or what industry do you operate in?",
            "field": "industria"
          },
          {
            "bot": "Perfect 👍\n\nWhat's the main problem or need you want to solve with software? Tell me in your own words.",
            "field": "problema"
          },
          {
            "bot": "Got it! Do you have any idea of the type of solution you're looking for?\n\nFor example: mobile app, web system, automation, tool integration, etc.",
            "field": "solucion"
          },
          {
            "bot": "Excellent 🚀\n\nIn what approximate timeframe would you need this up and running?",
            "field": "plazo"
          },
          {
            "bot": "All done, {{nombre}}! I have everything I need. 🎉\n\nI've prepared a summary with your information. By pressing the button you'll be redirected to WhatsApp so our team can contact you and we can get started together.",
            "field": null,
            "isFinal": true
          }
        ],
        "whatsappMessage": {
          "header": "*New contact from the website — DEXEL*",
          "intro": "Hello! I'm reaching out from the website with the following information:",
          "fields": {
            "nombre": "*Name / Company:*",
            "industria": "*Industry:*",
            "problema": "*Problem to solve:*",
            "solucion": "*Type of solution sought:*",
            "plazo": "*Estimated timeframe:*"
          },
          "outro": "I'm available to start the requirements gathering process."
        },
      },
    },
    services: {
      title: "Our Services",
      badge: "Dexel Services",
      subtitle: "Digital solutions tailored to your needs",
      serviceLabel: "Service",
      cta: "View details",
      ctaButton: "Request a quote",
      list: [
        {
          iconName: "Code",
          title: "Landing pages",
          price: "Starting at $100 USD",
          desc: "Single pages designed to present key information clearly and accessibly. Perfect for entrepreneurs and small businesses needing quick digital presence.",
          features: [
            "Modern responsive design",
            "Basic SEO optimization",
            "Contact form",
            "Social media links",
            "Hosting and domain included (1 year)",
          ],
        },
        {
          iconName: "Globe",
          title: "Websites",
          price: "Starting at $500 USD",
          desc: "A set of interconnected pages providing a structured, professional experience. Ideal for companies requiring multiple sections and intuitive navigation.",
          features: [
            "Multiple custom pages",
            "Admin panel",
            "Advanced SEO optimization",
            "Analytics integration",
            "30-day technical support",
          ],
        },
        {
          iconName: "Cpu",
          title: "Web apps",
          price: "Starting at $1000 USD",
          desc: "Scalable web applications to automate processes and manage data in real time. Custom solutions that turn complex operations into efficient systems.",
          features: [
            "Scalable architecture",
            "Optimized database",
            "Custom REST API",
            "User authentication",
            "Cloud deployment",
          ],
        },
        {
          iconName: "MessageCircle",
          title: "Social media bot",
          price: "Starting at $250 USD",
          desc: "Intelligent automation to manage interactions and responses across your social platforms. Keep your audience engaged 24/7 with instant replies.",
          features: [
            "24/7 automated responses",
            "Multi-platform integration",
            "Sentiment analysis",
            "Content scheduling",
            "Analytics dashboard",
          ],
        },
        {
          iconName: "FileText",
          title: "Technology consulting",
          price: "Quote",
          desc: "Technical requirement analysis and definition to turn your ideas into digital solutions. We support you from concept to execution roadmap.",
          features: [
            "Technical feasibility analysis",
            "Architecture definition",
            "Cost estimation",
            "Development roadmap",
            "Technology recommendations",
          ],
        },
        {
          iconName: "Wrench",
          title: "Project maintenance",
          price: "Quote",
          desc: "Continuous support and updates for projects built by Dexel, ensuring optimal operation and stability.",
          features: [
            "Security updates",
            "Bug fixes",
            "Automated backups",
            "Performance monitoring",
            "Priority technical support",
          ],
        },
      ],
      detailedList: [
        {
          id: "web-page",
          iconName: "Code",
          title: "Web pages",
          price: "From $100",
          pricingNote: "One-time payment / Delivery in 5 to 7 business days",
          description:
            "Single pages designed to present key information in a clear, accessible, and visually attractive way.",
          features: ["Generic design", "Responsive design", "Contact form"],
          image: "/images/services/service-web-page.svg",
        },
        {
          id: "website",
          iconName: "Globe",
          title: "Websites",
          price: "From $300",
          pricingNote: "Based on requirements / Delivery in 2 to 4 weeks",
          description:
            "Professional multi-page websites with custom design and adaptable structure for an optimal experience across devices.",
          features: [
            "Custom design",
            "Up to 5 web pages",
            "Responsive design",
            "Basic content management",
            "Support for multiple languages",
            "SSL certificate included",
          ],
          image: "/images/services/service-website.svg",
        },
        {
          id: "web-application",
          iconName: "Cpu",
          title: "Web applications",
          price: "From $1,000",
          pricingNote: "Based on requirements",
          description:
            "Custom web solutions with advanced functionality for specific business needs.",
          features: [
            "Detailed analysis and planning",
            "Intuitive UI design",
            "Front-end and back-end development",
            "Custom admin panel",
            "API and external service integrations",
            "Post-launch technical support",
          ],
          image: "/images/services/service-web-app.svg",
        },
        {
          id: "general-services",
          iconName: "Wrench",
          title: "General services",
          price: "Variable pricing",
          pricingNote: "Based on requirements",
          description:
            "Tailored technical services including payment gateway integrations, technical consulting, and iterative support.",
          features: [
            "Payment gateway integration",
            "Technical consulting for web projects",
            "Front-end and back-end development",
            "API and external service integrations",
            "Post-launch technical support",
          ],
          image: "/images/services/service-general.svg",
        },
      ],
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Answers to the most common questions about our services",
      faqs: [
        {
          question: "How long does it take to develop a project?",
          answer:
            "Delivery time depends on scope. A web page can be ready in 5-7 business days, a website in 2-4 weeks, and a web application in 4-8 weeks depending on complexity.",
        },
        {
          question: "What does website maintenance include?",
          answer:
            "It includes security updates, regular backups, technical support, and bug fixes. We adapt each plan to each client context.",
        },
        {
          question: "Can I update my website on my own?",
          answer:
            "Yes. We can integrate a CMS so you can update text and images without advanced technical skills.",
        },
        {
          question: "Do you offer hosting and domain services?",
          answer:
            "Yes, we can manage hosting and domain, or work with providers you already use.",
        },
      ],
    },
    stack: {
      title: "Technology stack",
      subtitle: "Cutting-edge tools for high-quality projects",
    },
    footer: {
      title: "What are you waiting for?",
      contactButton: "Contact us",
      services: "Services",
      contact: "Contact us",
      rights: "All rights reserved.",
      whatsappAria: "Open WhatsApp chat",
      whatsappText: "Hi Dexel, I want a quote",
    },
  },
};

export const defaultLocale = "es";
