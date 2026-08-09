# Dexel — sitio público

React 19 + Vite + Tailwind v4. Sitio bilingüe ES/EN con rutas localizadas y
prerenderizado en build, desplegado en Vercel.

## Comandos

```bash
npm install
npm run dev        # desarrollo
npm run build      # build completo: cliente + servidor + prerenderizado
npm run build:spa  # solo el bundle de cliente, sin prerenderizar
npm run preview    # sirve dist/ tal como lo haría Vercel
npm run lint
```

`npm run build` corre tres pasos encadenados:

1. `vite build` — bundle de cliente en `dist/`.
2. `vite build --ssr src/entry-server.jsx` — bundle de servidor en `dist-server/`,
   usado solo durante el build.
3. `node scripts/prerender.mjs` — renderiza cada ruta a HTML estático, inyecta
   los metadatos y genera `sitemap.xml` y `robots.txt`.

Al terminar, cada ruta pública tiene su propio `index.html` con el contenido ya
renderizado. Para verificarlo en local hay que servir `dist/` **respetando el
sistema de archivos**; `serve -s` fuerza modo SPA y devuelve la misma página
para todo:

```bash
npx serve dist -l 4173          # correcto
curl -s http://127.0.0.1:4173/es/servicios | grep -i auditoría
```

## Estructura

| Ruta | Qué hay |
|---|---|
| `src/config/pricing.js` | **Todos los precios.** Fuente única: copy, FAQ y JSON-LD salen de aquí |
| `src/config/site.js` | Origen del sitio, imagen OG, WhatsApp |
| `src/router/routes.js` | Tabla de rutas localizadas y detección de idioma |
| `src/i18n/services.js` | Catálogo de servicios y detalle de la auditoría (ES/EN) |
| `src/i18n/messages.js` | Resto del copy (ES/EN) |
| `src/seo/seo.js` | Metadatos y JSON-LD por página, sin tocar el DOM |
| `src/analytics/track.js` | Capa de medición (GA4 + Meta Pixel + Conversions API) |
| `src/analytics/intent.js` | Con qué intención llega alguien al formulario |
| `src/consent/consent.js` | Consentimiento de cookies. Nada se envía sin él |
| `src/i18n/legal.js` | Política de datos, 404 y banner de cookies |
| `scripts/og-card.template.html` | Fuente de `public/img.png`, la tarjeta social 1200×630 |
| `scripts/prerender.mjs` | Prerenderizado, sitemap y robots |
| `api/meta-capi.js` | Conversions API de Meta (función serverless de Vercel) |

## Rutas

| Español | Inglés |
|---|---|
| `/es` | `/en` |
| `/es/servicios` | `/en/services` |
| `/es/servicios/auditoria` | `/en/services/process-audit` |
| `/es/contacto` | `/en/contact` |
| `/es/privacidad` | `/en/privacy` |

`/` sirve el contenido en español con canónico a `/es`, para que los
rastreadores encuentren HTML en la raíz. En el navegador se resuelve al idioma
guardado o al del navegador. Las rutas viejas sin prefijo redirigen con 308
desde `vercel.json`.

## Cambiar precios

Editar `src/config/pricing.js` y reconstruir. Un solo cambio se propaga al
copy, al FAQ, a la línea de tiempo de la auditoría y a los datos estructurados,
en los dos idiomas.

Para repreciar la auditoría por mercado, cambiar `ACTIVE_MARKET` a `"us"`.

## Medición

Variables en `.env.example`. Eventos de conversión:

| Evento | Cuándo | Parámetros |
|---|---|---|
| `AuditRequested` | Entrega del formulario con intención de auditoría | `value`, `currency`, `locale`, `service_name` |
| `QuoteRequested` | Entrega del formulario con intención de cotizar otro servicio | `service_name`, `locale` |
| `DiscoveryBooked` | Entrega del formulario sin intención declarada, o desde la sección de proceso | `locale` |
| `ServiceDetailViewed` | Se abre el detalle de un servicio | `service_name`, `locale` |
| `ChatStarted` | Primer mensaje enviado al asistente | `locale` |

La conversión se cuenta al entregar la conversación a WhatsApp, no al hacer
clic: un clic no es una solicitud. El CTA solo declara la intención en
`analytics/intent.js`, que es lo que decide cuál de los tres eventos sale.

Cada evento lleva un `event_id` compartido entre el pixel del navegador y la
Conversions API, que es lo que usa Meta para deduplicar.

**Nada se envía sin consentimiento.** El pixel se inicializa con
`fbq('consent','revoke')` y GA4 con el modo de consentimiento en `denied`; el
banner los activa al aceptar. El visitante puede cambiar la decisión en
`/es/privacidad`.

## Tarjeta social

`public/img.png` se genera desde `scripts/og-card.template.html`:

```bash
python3 -m http.server 4321 --directory scripts &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --window-size=1200,700 --screenshot=card.png --virtual-time-budget=4000 \
  http://127.0.0.1:4321/og-card.template.html
# recortar a 1200×630 y copiar a public/img.png
```
