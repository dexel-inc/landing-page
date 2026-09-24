/**
 * Pre-filled WhatsApp messages, per language.
 *
 * Every call to action opens WhatsApp with one of these already written, so
 * the conversation starts knowing which service —and which plan, if one was
 * chosen— the visitor came for. `*text*` renders bold inside WhatsApp.
 */
export const whatsappCopy = {
  es: {
    greeting: "Hola Dexel 👋",
    service: (service) => `Me interesa *${service}*.`,
    plan: (plan) => `Plan: *${plan}*.`,
    serviceClose: "¿Me pueden dar más información?",
    discovery: "Quiero agendar la llamada de 30 minutos sin costo.",
    discoveryAbout: (service) => `Me interesa: ${service}.`,
    general: "Quiero contarles sobre mi proyecto.",
  },
  en: {
    greeting: "Hi Dexel 👋",
    service: (service) => `I'm interested in *${service}*.`,
    plan: (plan) => `Plan: *${plan}*.`,
    serviceClose: "Could you tell me more?",
    discovery: "I'd like to book the free 30-minute call.",
    discoveryAbout: (service) => `I'm interested in: ${service}.`,
    general: "I'd like to tell you about my project.",
  },
};
