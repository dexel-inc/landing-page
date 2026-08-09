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
      badge: "Automatización · IA · Desarrollo a la medida",
      title:
        "Automatizamos procesos, integramos sus sistemas y desarrollamos software a la medida. Somos cinco desarrolladores en Colombia con más de 6 años de experiencia.",
      scroll: "Scroll para hacer tu idea realidad",
      h1: "Software que le devuelve horas a su empresa",
      primaryCta: "Agendar diagnóstico gratuito",
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
        ctaButton: "Agendar una llamada",
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
        "Si el diagnóstico concluye que no necesita desarrollar nada, se lo decimos.",
      pledgeText:
        "Preferimos perder un proyecto que entregar algo que no le sirva. Un cliente que resolvió su problema con dos semanas de integración vuelve; uno al que le vendimos seis meses innecesarios, no.",
      cta: "Solicitar diagnóstico",
    },
    process: {
      badge: "Cómo trabajamos",
      title: "Sin cajas negras ni sorpresas",
      subtitle:
        "El miedo de todo cliente es pagar y no volver a saber nada. Por eso nuestro proceso es visible de principio a fin: usted sabe en qué fase está, qué recibe y cuándo.",
      phases: [
        {
          iconName: "Search",
          title: "Diagnóstico",
          duration: "30–45 min · sin costo",
          desc: "Escuchamos cómo funciona su operación hoy y dónde se pierde el tiempo. Sin vender nada todavía.",
          outputLabel: "Usted recibe",
          output: "Un diagnóstico honesto de qué vale la pena automatizar y qué no.",
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
      cta: "Agendar diagnóstico sin costo",
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
              "bot": "👋 Hola, soy el asistente de DEXEL.\n\nPara ayudarte rápido necesito una sola cosa: ¿qué tarea o proceso le está quitando más tiempo a tu equipo hoy?",
              "field": "problema"
            },
            {
              "bot": "Entendido. Ese tipo de proceso casi siempre se puede automatizar, total o parcialmente.\n\nPara darte una estimación con sentido y no una cifra al aire, me falta un dato:",
              "field": null
            },
            {
              "bot": "¿Cuántas personas lo hacen y cuánto tiempo al día, aproximadamente?\n\nCon un estimado me basta (por ejemplo: \"2 personas, unas 3 horas cada una\").",
              "field": "volumen"
            },
            {
              "bot": "Perfecto, con eso ya puedo ubicarte. 📊\n\nUn proceso así normalmente se resuelve en implementaciones de 3 a 6 semanas, y la inversión se recupera con las horas que deja de gastar el equipo.\n\nEl diagnóstico detallado es gratuito, dura 30 minutos y de ahí sale el número exacto para tu caso.",
              "field": null
            },
            {
              "bot": "¿A nombre de quién preparamos el diagnóstico?",
              "field": "nombre"
            },
            {
              "bot": "Listo, {{nombre}}. 🎉\n\nArmé el resumen de lo que me contaste. Al presionar el botón pasás a WhatsApp con esa información ya escrita, y agendamos los 30 minutos.",
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
            "outro": "Quedo atento para agendar el diagnóstico de 30 minutos."
          }
      },
    },
    services: {
      title: "Nuestros Servicios",
      badge: "Servicios Dexel",
      subtitle: "Soluciones digitales adaptadas a tus necesidades",
      serviceLabel: "Servicio",
      cta: "Ver detalles",
      ctaButton: "Cotizar este servicio",
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
          price: "Desde $300 USD",
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
          price: "Desde $250 USD",
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
          price: "Desde $150 USD/mes",
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
      linesIntro:
        "Cuatro líneas de trabajo. Empiece por donde más le duela: no hace falta contratar todo.",
      forWhoLabel: "Para quién es",
      deliveryLabel: "Tiempo de entrega",
      deliverablesLabel: "Qué recibe",
      exampleLabel: "Ejemplo real",
      lines: [
        {
          id: "presencia",
          name: "Presencia digital",
          tagline: "Para que su empresa exista en internet y convierta visitas en clientes.",
          items: [
            {
              id: "pagina-web",
              iconName: "Code",
              title: "Páginas web",
              price: "Desde $100",
              pricingNote: "Pago único",
              description:
                "Una sola página que presenta lo esencial de su negocio de forma clara y rápida de leer.",
              forWho:
                "Emprendedores y negocios pequeños que todavía no tienen sitio y necesitan presencia digital ya.",
              delivery: "5 a 7 días hábiles",
              deliverables: [
                "Página publicada y funcionando",
                "Diseño responsivo para celular",
                "Formulario de contacto conectado a WhatsApp",
              ],
              example:
                "Un consultorio que solo necesitaba mostrar servicios, horarios y un botón para agendar.",
            },
            {
              id: "sitio-web",
              iconName: "Globe",
              title: "Sitios web",
              price: "Desde $300",
              pricingNote: "Según requerimientos",
              description:
                "Varias páginas con diseño propio y contenido que usted mismo puede actualizar.",
              forWho:
                "Empresas que necesitan varias secciones y quieren cambiar textos e imágenes sin depender de nadie.",
              delivery: "2 a 4 semanas",
              deliverables: [
                "Hasta 5 páginas con diseño personalizado",
                "Gestor de contenido para editar sin código",
                "Certificado SSL y soporte multi-idioma",
              ],
              example:
                "Iglesia Bautista Casa Grande (Arizona): sitio bilingüe ES/EN cuyo contenido de video se sincroniza solo desde YouTube.",
            },
            {
              id: "aplicacion-web",
              iconName: "Cpu",
              title: "Aplicaciones web",
              price: "Desde $1,000",
              pricingNote: "Según requerimientos",
              description:
                "Software que hace algo, no que solo muestra información: gestiona datos, usuarios y operaciones.",
              forWho:
                "Negocios que necesitan administrar pedidos, inventario, clientes o procesos internos desde un solo lugar.",
              delivery: "4 a 8 semanas",
              deliverables: [
                "Panel de administración a la medida",
                "Base de datos y API propias",
                "Usuarios, roles y permisos",
              ],
              example:
                "Un sistema de órdenes de servicio que reemplazó un Excel compartido que todos editaban al tiempo.",
            },
          ],
        },
        {
          id: "automatizacion",
          name: "Automatización de operaciones",
          tagline: "Para dejar de gastar horas en tareas que un sistema puede hacer solo.",
          items: [
            {
              id: "diagnostico",
              iconName: "ScanSearch",
              title: "Diagnóstico de automatización",
              price: "Desde $150",
              pricingNote: "Se descuenta del proyecto si decide continuar",
              description:
                "Revisamos cómo trabaja su equipo hoy y le decimos qué vale la pena automatizar y qué no.",
              forWho:
                "Cualquier empresa que sospeche que pierde horas en tareas repetitivas pero no sabe cuántas ni dónde.",
              delivery: "1 a 2 semanas",
              deliverables: [
                "Mapa de su proceso actual, paso a paso",
                "Cuántas horas y cuánto dinero se van hoy",
                "Plan priorizado con estimación de costo y tiempo",
              ],
              example:
                "Una empresa que creía necesitar un sistema nuevo y descubrió que le bastaba conectar dos que ya tenía.",
            },
            {
              id: "automatizacion-procesos",
              iconName: "Zap",
              title: "Automatización de procesos",
              price: "Desde $800",
              pricingNote: "Por proceso",
              description:
                "Convertimos un proceso manual y repetitivo en uno que corre solo y avisa cuando algo se sale de lo normal.",
              forWho:
                "Equipos que copian datos entre sistemas, arman reportes a mano o digitan lo que llega por correo y WhatsApp.",
              delivery: "3 a 6 semanas",
              deliverables: [
                "El proceso funcionando sin intervención manual",
                "Tablero de excepciones para lo que sí requiere revisión humana",
                "Capacitación a su equipo y documentación",
              ],
              example:
                "Pedidos que llegan por WhatsApp y entran solos al sistema, validando inventario y precios.",
            },
            {
              id: "integraciones",
              iconName: "Plug",
              title: "Integraciones entre sistemas",
              price: "Desde $600",
              pricingNote: "Por integración",
              description:
                "Hacemos que las herramientas que ya paga se hablen entre sí, sin que nadie tenga que pasar datos a mano.",
              forWho:
                "Empresas con varias herramientas que no se comunican, y alguien que las sincroniza manualmente.",
              delivery: "2 a 4 semanas",
              deliverables: [
                "Sistemas sincronizados automáticamente",
                "Manejo de errores y reintentos",
                "Monitoreo con alertas cuando algo falla",
              ],
              example:
                "Conectar la tienda en línea con el software contable para que las facturas se generen solas.",
            },
          ],
        },
        {
          id: "ia",
          name: "Inteligencia artificial aplicada",
          tagline: "IA que resuelve un problema concreto de su operación, no una demostración bonita.",
          items: [
            {
              id: "asistente-ia",
              iconName: "Sparkles",
              title: "Asistente con IA sobre sus documentos",
              price: "Desde $1,500",
              pricingNote: "Incluye evaluaciones de precisión",
              description:
                "Un asistente que responde preguntas sobre sus manuales, contratos, catálogos o políticas, citando de dónde sacó cada respuesta.",
              forWho:
                "Empresas cuyo equipo pierde tiempo buscando información dispersa en documentos internos.",
              delivery: "4 a 6 semanas",
              deliverables: [
                "Asistente que responde citando la fuente exacta",
                "Umbral de precisión acordado por escrito y medido",
                "Control de costos de uso mes a mes",
              ],
              example:
                "Un equipo de soporte que dejó de buscar entre 400 páginas de manual para responder cada consulta.",
            },
            {
              id: "agente-atencion",
              iconName: "MessageCircle",
              title: "Agente de atención al cliente",
              price: "Desde $1,200",
              pricingNote: "WhatsApp o web",
              description:
                "Atiende las preguntas repetitivas a toda hora y pasa a una persona cuando no está seguro. Nunca inventa.",
              forWho:
                "Negocios que reciben las mismas preguntas todo el día y responden una por una.",
              delivery: "3 a 5 semanas",
              deliverables: [
                "Agente en WhatsApp Business o en su sitio",
                "Escalamiento a una persona cuando la confianza es baja",
                "Tablero de conversaciones y temas frecuentes",
              ],
              example:
                "Responder horarios, precios y disponibilidad 24/7, dejando a las personas solo lo que de verdad las necesita.",
            },
          ],
        },
        {
          id: "acompanamiento",
          name: "Acompañamiento continuo",
          tagline: "Para que lo construido siga funcionando y mejorando después de la entrega.",
          items: [
            {
              id: "mantenimiento",
              iconName: "Wrench",
              title: "Mantenimiento y evolución",
              price: "Desde $150/mes",
              pricingNote: "Plan mensual, sin permanencia",
              description:
                "Nos hacemos cargo de que su sistema siga en pie, seguro y mejorando cada mes.",
              forWho:
                "Proyectos ya en producción que no pueden darse el lujo de quedarse quietos ni de caerse.",
              delivery: "Mensual, desde el día uno",
              deliverables: [
                "Actualizaciones de seguridad y copias de respaldo",
                "Horas mensuales para cambios y mejoras",
                "Monitoreo con reporte de lo que pasó en el mes",
              ],
              example:
                "Un sitio en producción que recibe mejoras cada mes en vez de quedarse igual hasta que algo se rompe.",
            },
            {
              id: "asesoria",
              iconName: "FileText",
              title: "Asesoría tecnológica",
              price: "Desde $250",
              pricingNote: "Por sesión o por proyecto",
              description:
                "Criterio técnico para decidir si construir, comprar o integrar, antes de gastar el presupuesto.",
              forWho:
                "Quien tiene que tomar una decisión técnica costosa y necesita un criterio que no le venda humo.",
              delivery: "1 a 2 semanas",
              deliverables: [
                "Análisis de viabilidad técnica",
                "Arquitectura recomendada y tecnologías",
                "Estimación de costos y hoja de ruta",
              ],
              example:
                "Una empresa que iba a mandar a construir un sistema desde cero y terminó resolviéndolo integrando lo que ya tenía.",
            },
          ],
        },
      ],
      faqTitle: "Preguntas Frecuentes",
      faqSubtitle: "Las dudas que nos hacen antes de contratar",
      faqs: [
        {
          question: "¿El diagnóstico gratuito realmente es gratis?",
          answer:
            "La llamada de 30 minutos no tiene costo ni compromiso: escuchamos su operación y le decimos qué se puede automatizar. El diagnóstico profundo, con mapa de proceso y estimaciones, sí tiene costo, y se lo descontamos del proyecto si decide seguir con nosotros.",
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
          question: "¿Cómo sé que un proyecto de inteligencia artificial va a funcionar?",
          answer:
            "Porque acordamos por escrito un umbral de precisión antes de empezar y lo medimos con pruebas reales de su negocio. Si no lo alcanzamos, no está terminado. Sin esa medición, un proyecto de IA no tiene forma de darse por cerrado.",
        },
        {
          question: "¿Firman acuerdos de confidencialidad?",
          answer:
            "Sí, y los cumplimos. La mayor parte de nuestro trabajo son sistemas internos que no podemos mostrar públicamente, justamente por eso. Su proyecto recibiría la misma discreción.",
        },
        {
          question: "¿Cuánto tiempo toma tener algo funcionando?",
          answer:
            "Depende del alcance: una página web en 5-7 días, un sitio en 2-4 semanas, una automatización en 3-6 semanas y una aplicación web en 4-8. En todos los casos ve una demo funcionando cada viernes, no un informe de avance.",
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
      responseTime: "Respondemos en menos de 4 horas hábiles",
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
      badge: "Automation · AI · Custom development",
      title:
        "We automate processes, integrate your systems, and build custom software. Five developers based in Colombia with over 6 years of experience.",
      scroll: "Scroll to bring your idea to life",
      h1: "Software that gives your company its hours back",
      primaryCta: "Book a free assessment",
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
        ctaButton: "Book a call",
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
      pledgeTitle: "If the assessment concludes you don't need to build anything, we'll say so.",
      pledgeText:
        "We'd rather lose a project than deliver something that doesn't help. A client who solved their problem with a two-week integration comes back; one we sold six unnecessary months to does not.",
      cta: "Request an assessment",
    },
    process: {
      badge: "How we work",
      title: "No black boxes, no surprises",
      subtitle:
        "Every client's fear is paying and never hearing back. That's why our process is visible end to end: you always know what phase you're in, what you get, and when.",
      phases: [
        {
          iconName: "Search",
          title: "Discovery",
          duration: "30–45 min · free",
          desc: "We listen to how your operation works today and where time is lost. No selling yet.",
          outputLabel: "You get",
          output: "An honest assessment of what's worth automating and what isn't.",
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
          "Forget static forms. Interact directly with our pre-analysis core. Tell us your technical challenge and get a preliminary assessment in real time.",
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
            "bot": "Perfect, that's enough to place you. 📊\n\nA process like this is usually solved with a 3 to 6 week implementation, and the investment pays back through the hours your team stops spending on it.\n\nThe detailed assessment is free, takes 30 minutes, and that's where the exact number for your case comes from.",
            "field": null
          },
          {
            "bot": "Who should we prepare the assessment for?",
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
          "outro": "Looking forward to booking the 30-minute assessment."
        },
      },
    },
    services: {
      title: "Our Services",
      badge: "Dexel Services",
      subtitle: "Digital solutions tailored to your needs",
      serviceLabel: "Service",
      cta: "View details",
      ctaButton: "Quote this service",
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
          price: "Starting at $300 USD",
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
          price: "From $250 USD",
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
          price: "From $150 USD/month",
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
      linesIntro:
        "Four service lines. Start wherever it hurts most: you don't have to buy all of it.",
      forWhoLabel: "Who it's for",
      deliveryLabel: "Delivery time",
      deliverablesLabel: "What you get",
      exampleLabel: "Real example",
      lines: [
        {
          id: "presence",
          name: "Digital presence",
          tagline: "So your company exists online and turns visits into customers.",
          items: [
            {
              id: "web-page",
              iconName: "Code",
              title: "Web pages",
              price: "From $100",
              pricingNote: "One-time payment",
              description:
                "A single page presenting the essentials of your business, clearly and quick to read.",
              forWho:
                "Founders and small businesses with no site yet who need a digital presence now.",
              delivery: "5 to 7 business days",
              deliverables: [
                "Page published and running",
                "Responsive design for mobile",
                "Contact form wired to WhatsApp",
              ],
              example:
                "A clinic that only needed to show services, hours, and a button to book an appointment.",
            },
            {
              id: "website",
              iconName: "Globe",
              title: "Websites",
              price: "From $300",
              pricingNote: "Based on requirements",
              description:
                "Multiple pages with custom design and content you can update yourself.",
              forWho:
                "Companies that need several sections and want to change text and images without depending on anyone.",
              delivery: "2 to 4 weeks",
              deliverables: [
                "Up to 5 pages with custom design",
                "Content manager to edit without code",
                "SSL certificate and multi-language support",
              ],
              example:
                "Iglesia Bautista Casa Grande (Arizona): a bilingual ES/EN site whose video content syncs itself from YouTube.",
            },
            {
              id: "web-application",
              iconName: "Cpu",
              title: "Web applications",
              price: "From $1,000",
              pricingNote: "Based on requirements",
              description:
                "Software that does something rather than just displaying information: it manages data, users, and operations.",
              forWho:
                "Businesses that need to run orders, inventory, customers, or internal processes from one place.",
              delivery: "4 to 8 weeks",
              deliverables: [
                "Custom admin panel",
                "Your own database and API",
                "Users, roles, and permissions",
              ],
              example:
                "A service-order system that replaced a shared spreadsheet everyone edited at once.",
            },
          ],
        },
        {
          id: "automation",
          name: "Operations automation",
          tagline: "Stop spending hours on tasks a system can handle on its own.",
          items: [
            {
              id: "assessment",
              iconName: "ScanSearch",
              title: "Automation assessment",
              price: "From $150",
              pricingNote: "Credited toward the project if you continue",
              description:
                "We review how your team works today and tell you what's worth automating and what isn't.",
              forWho:
                "Any company that suspects it loses hours on repetitive work but doesn't know how many or where.",
              delivery: "1 to 2 weeks",
              deliverables: [
                "A step-by-step map of your current process",
                "How many hours and how much money go out today",
                "A prioritized plan with cost and time estimates",
              ],
              example:
                "A company that thought it needed a new system and found it only had to connect two it already owned.",
            },
            {
              id: "process-automation",
              iconName: "Zap",
              title: "Process automation",
              price: "From $800",
              pricingNote: "Per process",
              description:
                "We turn a manual, repetitive process into one that runs itself and flags anything unusual.",
              forWho:
                "Teams copying data between systems, building reports by hand, or retyping what arrives by email and WhatsApp.",
              delivery: "3 to 6 weeks",
              deliverables: [
                "The process running without manual intervention",
                "An exceptions dashboard for whatever does need human review",
                "Training for your team plus documentation",
              ],
              example:
                "Orders arriving on WhatsApp that flow straight into the system, validating stock and pricing.",
            },
            {
              id: "integrations",
              iconName: "Plug",
              title: "System integrations",
              price: "From $600",
              pricingNote: "Per integration",
              description:
                "We make the tools you already pay for talk to each other, so nobody has to move data by hand.",
              forWho:
                "Companies with several tools that don't communicate, kept in sync by someone manually.",
              delivery: "2 to 4 weeks",
              deliverables: [
                "Systems synced automatically",
                "Error handling and retries",
                "Monitoring with alerts when something fails",
              ],
              example:
                "Connecting the online store to the accounting software so invoices generate themselves.",
            },
          ],
        },
        {
          id: "ai",
          name: "Applied artificial intelligence",
          tagline: "AI that solves a concrete problem in your operation, not a pretty demo.",
          items: [
            {
              id: "ai-assistant",
              iconName: "Sparkles",
              title: "AI assistant over your documents",
              price: "From $1,500",
              pricingNote: "Accuracy evaluations included",
              description:
                "An assistant that answers questions about your manuals, contracts, catalogs, or policies, citing where each answer came from.",
              forWho:
                "Companies whose teams lose time hunting for information scattered across internal documents.",
              delivery: "4 to 6 weeks",
              deliverables: [
                "An assistant that answers citing the exact source",
                "An accuracy threshold agreed in writing and measured",
                "Usage cost control month to month",
              ],
              example:
                "A support team that stopped digging through 400 pages of manual to answer every question.",
            },
            {
              id: "support-agent",
              iconName: "MessageCircle",
              title: "Customer support agent",
              price: "From $1,200",
              pricingNote: "WhatsApp or web",
              description:
                "It handles repetitive questions around the clock and hands off to a person when unsure. It never makes things up.",
              forWho:
                "Businesses fielding the same questions all day and answering them one by one.",
              delivery: "3 to 5 weeks",
              deliverables: [
                "An agent on WhatsApp Business or on your site",
                "Escalation to a person whenever confidence is low",
                "A dashboard of conversations and frequent topics",
              ],
              example:
                "Answering hours, prices, and availability 24/7, leaving people only what genuinely needs them.",
            },
          ],
        },
        {
          id: "ongoing",
          name: "Ongoing support",
          tagline: "So what we built keeps running and improving after handover.",
          items: [
            {
              id: "maintenance",
              iconName: "Wrench",
              title: "Maintenance and evolution",
              price: "From $150/month",
              pricingNote: "Monthly plan, no lock-in",
              description:
                "We take responsibility for keeping your system up, secure, and improving every month.",
              forWho:
                "Projects already in production that can't afford to stand still or go down.",
              delivery: "Monthly, from day one",
              deliverables: [
                "Security updates and backups",
                "Monthly hours for changes and improvements",
                "Monitoring with a report of what happened each month",
              ],
              example:
                "A production site that gets improvements every month instead of sitting still until something breaks.",
            },
            {
              id: "consulting",
              iconName: "FileText",
              title: "Technology consulting",
              price: "From $250",
              pricingNote: "Per session or per project",
              description:
                "Technical judgment on whether to build, buy, or integrate, before you spend the budget.",
              forWho:
                "Anyone facing an expensive technical decision who needs judgment that isn't selling them something.",
              delivery: "1 to 2 weeks",
              deliverables: [
                "Technical feasibility analysis",
                "Recommended architecture and technologies",
                "Cost estimate and roadmap",
              ],
              example:
                "A company about to commission a system from scratch that ended up solving it by integrating what it already had.",
            },
          ],
        },
      ],
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "The questions people ask us before hiring",
      faqs: [
        {
          question: "Is the free assessment really free?",
          answer:
            "The 30-minute call costs nothing and carries no commitment: we listen to your operation and tell you what can be automated. The in-depth assessment, with a process map and estimates, does have a cost, and we credit it toward the project if you decide to continue with us.",
        },
        {
          question: "Who owns the code you write?",
          answer:
            "You do, from the first commit. The repository is under your company's name, not Dexel's. If you decide to work with another vendor tomorrow, you take everything with you without asking our permission.",
        },
        {
          question: "What happens if the scope changes mid-project?",
          answer:
            "The price is fixed before the first line of code. If something new comes up, we quote it separately and you decide whether it goes in now or later. You never get an invoice with surprises.",
        },
        {
          question: "How do I know an AI project will actually work?",
          answer:
            "Because we agree on an accuracy threshold in writing before starting and measure it against real cases from your business. If we don't hit it, it isn't done. Without that measurement, an AI project has no way of being considered finished.",
        },
        {
          question: "Do you sign confidentiality agreements?",
          answer:
            "Yes, and we honor them. Most of our work is internal systems we can't show publicly, precisely for that reason. Your project would get the same discretion.",
        },
        {
          question: "How long until something is up and running?",
          answer:
            "It depends on scope: a web page in 5-7 days, a website in 2-4 weeks, an automation in 3-6 weeks, and a web application in 4-8. In every case you see a working demo each Friday, not a progress report.",
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
      responseTime: "We reply in under 4 business hours",
      services: "Services",
      contact: "Contact us",
      rights: "All rights reserved.",
      whatsappAria: "Open WhatsApp chat",
      whatsappText: "Hi Dexel, I want a quote",
    },
  },
};

export const defaultLocale = "es";
