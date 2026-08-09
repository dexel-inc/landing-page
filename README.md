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
| `scripts/prerender.mjs` | Prerenderizado, sitemap y robots |
| `api/meta-capi.js` | Conversions API de Meta (función serverless de Vercel) |

## Rutas

| Español | Inglés |
|---|---|
| `/es` | `/en` |
| `/es/servicios` | `/en/services` |
| `/es/servicios/auditoria` | `/en/services/process-audit` |
| `/es/contacto` | `/en/contact` |

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

| Evento | Cuándo |
|---|---|
| `AuditRequested` | CTA de la auditoría (home, `/servicios`, detalle) |
| `QuoteRequested` | CTA de cotización de cualquier otro servicio |
| `ServiceDetailViewed` | Se abre el detalle de un servicio (`service_name` como parámetro) |
| `ProcessStarted` | Primera respuesta en el asistente conversacional |

Cada evento lleva un `event_id` compartido entre el pixel del navegador y la
Conversions API, que es lo que usa Meta para deduplicar.
