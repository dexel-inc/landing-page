import { formatPrice } from "../config/pricing.js";
import { ROUTE_KEYS } from "../router/routes.js";

/**
 * Formación in-company: contenido de `/es/formacion` y `/en/training`.
 *
 * Es una línea propia, no una categoría de servicio, y por eso vive en su
 * archivo y no dentro de `categories.js`. La diferencia importa para el copy:
 * los servicios se contratan para que Dexel haga el trabajo; la formación se
 * contrata para que lo haga el equipo del cliente.
 *
 * El eje es "lo que aprendimos implementando". No es un curso de IA: de eso hay
 * contenido gratuito de sobra y competir ahí sería competir por precio. Lo que
 * no se consigue gratis es la lista de lo que falla cuando esto entra en una
 * operación real, y esa lista solo la tiene quien ya implementó.
 *
 * Ninguna cifra se escribe a mano: todas salen de `config/pricing.js`.
 */

const es = {
  key: "training",
  routeKey: ROUTE_KEYS.TRAINING,
  navLabel: "Formación",
  badge: "Formación in-company",

  title: "Enseñamos lo que aprendimos implementando.",
  subtitle:
    "Formación en automatización e IA para equipos que van a hacer el trabajo, no para asistir a una charla. Cada participante sale con una automatización real de su propia operación funcionando.",

  priceLabel: "Desde",
  price: formatPrice("trainingExecutive", "es"),
  formatLabel: "Formatos",
  formatSummary: "Medio día, un día o programa a la medida",

  cta: "Solicitar formación para mi equipo",
  secondaryCta: "Agendar llamada de discovery sin costo",

  /**
   * El dato va con fuente porque es de un tercero y porque es el argumento
   * central: el problema no es aprender la herramienta, es que lo aprendido
   * llegue a la operación.
   */
  stat: {
    value: "70%",
    text: "de los proyectos de IA no supera la fase piloto por falta de integración con los procesos existentes.",
    source: "Estudio de Boston Consulting Group y MIT Sloan Management Review",
    note: "Ese es exactamente el problema que esta formación previene: el trabajo del último día no es entender la herramienta, es dejar algo corriendo dentro de su operación.",
  },

  noteTitle: "Esto no es un curso de inteligencia artificial",
  noteText:
    "De cómo usar ChatGPT hay contenido gratuito de sobra y no tendría sentido cobrar por repetirlo. Lo que no se consigue gratis es qué falla cuando esto entra en una operación real: qué procesos no conviene automatizar, qué costos aparecen después del piloto y por qué un equipo abandona la herramienta a los tres meses. Eso no se aprende leyendo; se aprende implementando, que es lo que llevamos años haciendo.",

  programTitle: "Contenido del programa",
  programIntro:
    "Seis bloques, en el orden en que hacen falta. Toque cada uno para ver qué se cubre.",
  highlightLabel: "El entregable",
  blocks: [
    {
      key: "what-not",
      iconName: "Ban",
      title: "Qué NO automatizar",
      text: "Procesos sin reglas claras. Procesos que van a cambiar en seis meses. Procesos que corren dos veces al mes. Y el más importante: el proceso roto que hay que arreglar antes, no automatizar. Automatizar un proceso malo multiplica el problema.",
    },
    {
      key: "arithmetic",
      iconName: "Calculator",
      title: "La aritmética real",
      text: "Cómo medir el estado actual: horas por ejecución, frecuencia, personas involucradas. El costo total que casi nadie calcula: licencias, mantenimiento y el tiempo de quien supervisa que el sistema siga funcionando. Y cómo saber cuándo el retorno simplemente no da.",
    },
    {
      key: "tools",
      iconName: "Map",
      title: "El mapa de herramientas, sin fanatismo",
      text: "n8n, Make y Zapier: cuándo conviene cada uno y cuánto cuestan de verdad al crecer el volumen. Cuándo NO hace falta IA porque un flujo con reglas es más barato y más predecible. Qué es un agente y cuándo tiene sentido. Herramientas del mercado colombiano: facturación electrónica y DIAN, WhatsApp Business API.",
    },
    {
      key: "hands-on",
      iconName: "Hammer",
      title: "Manos a la obra",
      text: "Cada participante construye una automatización real de su propia operación, no un ejemplo de juguete. Sale funcionando al terminar la sesión.",
      highlight: true,
    },
    {
      key: "failures",
      iconName: "AlertTriangle",
      title: "Lo que falla",
      text: "Cuando el modelo inventa respuestas y cómo acotarlo. Qué pasa cuando cambia una API de la que depende un flujo. Qué datos no deberían salir hacia un modelo de terceros. Y por qué el equipo abandona la herramienta a los tres meses, que es el fracaso más común y el menos discutido.",
    },
    {
      key: "developer",
      iconName: "Code2",
      title: "Cuándo llamar a un desarrollador",
      text: "Los límites reales de lo que se puede resolver sin escribir código, y las señales de que un proceso los superó.",
    },
  ],

  formatsTitle: "Formatos y precios",
  formatsIntro: "Tres formas de contratarlo, según cuánta gente y cuánto tiempo.",
  formatLabels: {
    duration: "Duración",
    participants: "Participantes",
    price: "Precio",
    cta: "Solicitar este formato",
  },
  formats: [
    {
      key: "executive",
      name: "Sesión ejecutiva",
      duration: "Medio día",
      participants: "Hasta 8",
      price: formatPrice("trainingExecutive", "es"),
      value: "trainingExecutive",
      workload: "PT4H",
    },
    {
      key: "full",
      name: "Formación completa",
      duration: "Un día",
      participants: "Hasta 12",
      price: formatPrice("trainingFull", "es"),
      value: "trainingFull",
      workload: "PT8H",
      featured: true,
    },
    {
      key: "custom",
      name: "Programa a la medida",
      duration: "Varias sesiones",
      participants: "A convenir",
      price: "Cotización",
      value: null,
    },
  ],

  includedTitle: "Incluido en todos los formatos",
  included: [
    "Modalidad presencial en Colombia o remota",
    "Material de referencia para el equipo",
    "Sesión de seguimiento a las dos semanas, para resolver dudas de lo que hayan intentado por su cuenta",
  ],

  creditTitle: "El 50% se descuenta si después implementamos",
  creditText:
    "Si su empresa contrata un proyecto dentro de los 60 días siguientes a la formación, la mitad de lo que pagó por ella se descuenta del proyecto. Es la mitad y no el total —como sí ocurre con la auditoría— porque la formación tiene valor por sí sola y no es un paso previo obligatorio para contratarnos.",

  faqTitle: "Preguntas frecuentes",
  faqSubtitle: "Lo que nos preguntan antes de contratar una formación",
  faqs: [
    {
      question: "¿Necesitamos saber programar?",
      answer:
        "No. La formación está hecha para las personas que conocen el proceso, no para un equipo técnico: quien sabe cómo se hace hoy el trabajo es quien puede decidir qué vale la pena automatizar. Si alguien de sistemas participa, mejor, pero no es requisito de nadie.",
    },
    {
      question: "¿Es presencial o remoto?",
      answer:
        "Ambos. Presencial en Colombia y remoto para el resto. El bloque de manos a la obra funciona igual en los dos casos: cada participante trabaja sobre su propia operación.",
    },
    {
      question: "¿Qué pasa si después queremos que ustedes lo implementen?",
      answer:
        "Se cotiza como cualquier proyecto, con alcance cerrado y precio fijo antes de empezar. Si la contratación ocurre dentro de los 60 días siguientes a la formación, el 50% de lo que pagó por ella se descuenta del proyecto.",
    },
    {
      question: "¿Sirve si ya usamos alguna herramienta de automatización?",
      answer:
        "Sí, y suele ser el caso más provechoso. Cuando ya hay flujos corriendo, la conversación deja de ser teórica: se revisa qué está montado, qué cuesta de verdad al crecer el volumen y qué pasos siguen dependiendo de que alguien se acuerde de hacerlos.",
    },
    {
      question: "¿Cuántas personas mínimo?",
      answer:
        "No hay mínimo: el precio es por sesión y no por participante. Sí hay máximo, porque cada quien sale con una automatización propia funcionando y eso exige acompañamiento uno a uno: hasta 8 en la sesión ejecutiva y hasta 12 en la formación completa.",
    },
    {
      question: "¿Nos dan material o grabación?",
      answer:
        "Material de referencia sí, en todos los formatos, y queda en manos de su equipo. La grabación depende de la modalidad: en remoto se puede grabar si todos los participantes están de acuerdo; en presencial no grabamos.",
    },
  ],

  ctaTitle: "¿Quiere que su equipo salga con algo funcionando?",
  ctaText:
    "Cuéntenos cuántas personas son y qué procesos manejan, y le decimos qué formato tiene sentido.",
};

const en = {
  key: "training",
  routeKey: ROUTE_KEYS.TRAINING,
  navLabel: "Training",
  badge: "In-company training",

  title: "We teach what we learned building.",
  subtitle:
    "Automation and AI training for teams that will do the work, not attend a talk. Every participant leaves with a real automation from their own operation up and running.",

  priceLabel: "From",
  price: formatPrice("trainingExecutive", "en"),
  formatLabel: "Formats",
  formatSummary: "Half a day, a full day, or a custom program",

  cta: "Request training for my team",
  secondaryCta: "Book a free discovery call",

  stat: {
    value: "70%",
    text: "of AI projects never make it past the pilot stage, for lack of integration with existing processes.",
    source: "Study by Boston Consulting Group and MIT Sloan Management Review",
    note: "That is exactly what this training prevents: the work on the last day isn't understanding the tool, it's leaving something running inside your operation.",
  },

  noteTitle: "This is not an AI course",
  noteText:
    "There is plenty of free content on how to use ChatGPT, and charging to repeat it would make no sense. What you can't get for free is what breaks when this reaches a real operation: which processes shouldn't be automated, which costs show up after the pilot, and why a team abandons the tool three months in. You don't learn that by reading; you learn it by building, which is what we have been doing for years.",

  programTitle: "What the program covers",
  programIntro: "Six blocks, in the order they're needed. Tap each one to see what's inside.",
  highlightLabel: "The deliverable",
  blocks: [
    {
      key: "what-not",
      iconName: "Ban",
      title: "What NOT to automate",
      text: "Processes without clear rules. Processes that will change in six months. Processes that run twice a month. And the most important one: the broken process that has to be fixed first, not automated. Automating a bad process multiplies the problem.",
    },
    {
      key: "arithmetic",
      iconName: "Calculator",
      title: "The real arithmetic",
      text: "How to measure where you stand today: hours per run, frequency, people involved. The total cost almost nobody adds up: licenses, maintenance, and the time of whoever keeps an eye on the system. And how to tell when the return simply isn't there.",
    },
    {
      key: "tools",
      iconName: "Map",
      title: "The tool map, without fanaticism",
      text: "n8n, Make, and Zapier: when each one fits and what they really cost as volume grows. When you do NOT need AI, because a rules-based flow is cheaper and more predictable. What an agent is and when it makes sense. Tools specific to the Colombian market: electronic invoicing and DIAN, WhatsApp Business API.",
    },
    {
      key: "hands-on",
      iconName: "Hammer",
      title: "Hands on",
      text: "Each participant builds a real automation from their own operation, not a toy example. It's running by the end of the session.",
      highlight: true,
    },
    {
      key: "failures",
      iconName: "AlertTriangle",
      title: "What goes wrong",
      text: "When the model makes answers up and how to fence it in. What happens when an API a flow depends on changes. Which data should never leave for a third-party model. And why teams abandon the tool three months in, the most common failure and the least discussed.",
    },
    {
      key: "developer",
      iconName: "Code2",
      title: "When to call a developer",
      text: "The real limits of what can be solved without writing code, and the signs that a process has passed them.",
    },
  ],

  formatsTitle: "Formats and pricing",
  formatsIntro: "Three ways to run it, depending on how many people and how much time.",
  formatLabels: {
    duration: "Duration",
    participants: "Participants",
    price: "Price",
    cta: "Request this format",
  },
  formats: [
    {
      key: "executive",
      name: "Executive session",
      duration: "Half a day",
      participants: "Up to 8",
      price: formatPrice("trainingExecutive", "en"),
      value: "trainingExecutive",
      workload: "PT4H",
    },
    {
      key: "full",
      name: "Full training",
      duration: "One day",
      participants: "Up to 12",
      price: formatPrice("trainingFull", "en"),
      value: "trainingFull",
      workload: "PT8H",
      featured: true,
    },
    {
      key: "custom",
      name: "Custom program",
      duration: "Several sessions",
      participants: "To be agreed",
      price: "On request",
      value: null,
    },
  ],

  includedTitle: "Included in every format",
  included: [
    "On-site in Colombia or remote",
    "Reference material for the team",
    "A follow-up session two weeks later, for questions about what they tried on their own",
  ],

  creditTitle: "50% comes off the project if we build it afterwards",
  creditText:
    "If your company hires a project within 60 days of the training, half of what you paid for it comes off the project price. Half and not the full amount —as happens with the audit— because the training stands on its own and isn't a required step before working with us.",

  faqTitle: "Frequently asked questions",
  faqSubtitle: "What companies ask before booking a training",
  faqs: [
    {
      question: "Do we need to know how to code?",
      answer:
        "No. The training is built for the people who know the process, not for a technical team: whoever knows how the work gets done today is the one who can decide what's worth automating. If someone from IT joins, all the better, but it isn't a requirement for anyone.",
    },
    {
      question: "Is it on-site or remote?",
      answer:
        "Both. On-site in Colombia and remote everywhere else. The hands-on block works the same either way: each participant works on their own operation.",
    },
    {
      question: "What if afterwards we want you to build it?",
      answer:
        "It gets quoted like any other project, with a closed scope and a fixed price before we start. If you hire within 60 days of the training, 50% of what you paid for it comes off the project.",
    },
    {
      question: "Is it useful if we already use an automation tool?",
      answer:
        "Yes, and it's usually the most productive case. When flows are already running, the conversation stops being theoretical: we look at what's built, what it really costs as volume grows, and which steps still depend on somebody remembering to do them.",
    },
    {
      question: "What's the minimum number of people?",
      answer:
        "There's no minimum: the price is per session, not per participant. There is a maximum, because everyone leaves with their own automation working and that takes one-on-one time: up to 8 in the executive session and up to 12 in the full training.",
    },
    {
      question: "Do we get materials or a recording?",
      answer:
        "Reference material, yes, in every format, and it stays with your team. A recording depends on the format: remote sessions can be recorded if every participant agrees; on-site sessions we don't record.",
    },
  ],

  ctaTitle: "Want your team to leave with something running?",
  ctaText: "Tell us how many people you are and which processes they handle, and we'll tell you which format fits.",
};

export const trainingCopy = { es, en };
