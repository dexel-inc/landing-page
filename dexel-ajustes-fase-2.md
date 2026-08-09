# TAREA: Ajustes fase 2 — dexel-inc.com

## Contexto

La reestructuración de servicios ya se ejecutó y quedó bien. El sitio está
bilingüe (/es y /en), los cinco servicios están en el orden correcto, la
auditoría de procesos está publicada a $450 USD como producto de entrada, el
prerenderizado funciona y los datos estructurados están completos.

Este documento cubre lo que quedó pendiente. Está ordenado por prioridad: el
Objetivo 1 bloquea el lanzamiento de campañas pagadas, el 2 afecta
directamente la conversión del producto de $450, y del 3 en adelante son
correcciones de consistencia.

Explora primero cómo está estructurado el sitio y muéstrame tu plan antes de
ejecutar cambios grandes.

---

## OBJETIVO 1 — Medición (BLOQUEANTE)

Verificado en el navegador: `window.fbq` está `undefined`, `window.gtag` está
`undefined`, y no hay ningún script de analítica cargado. No hay Meta Pixel,
no hay Conversions API, no hay Google Analytics.

Sin esto no se puede pautar: la campaña sería completamente ciega y Meta no
podría optimizar hacia conversiones.

### Credenciales

El conjunto de datos ya está creado en Meta Events Manager con el nombre
`Dexel Web`.

```
META_PIXEL_ID = 1065161589428764
META_CAPI_ACCESS_TOKEN = (pendiente — se genera en Events Manager >
                          Configuración > API de conversiones)
META_DOMAIN_VERIFICATION = (pendiente — meta tag de verificación de dominio)
GA4_MEASUREMENT_ID = (pendiente — opcional)
```

El Pixel ID es público y puede quedar en el bundle del cliente. El token de la
Conversions API es una credencial sensible: va en variables de entorno del
servidor, nunca en el código del cliente ni en el repositorio. Verifica que
`.env` esté en `.gitignore` antes de empezar.

1. Instalar **Meta Pixel** en todas las páginas, en ambos idiomas.
2. Configurar **Conversions API** del lado servidor. No basta el pixel de
   navegador: los bloqueadores y las restricciones de iOS hacen que se pierda
   una parte importante de los eventos.
3. Instalar **Google Analytics 4**.
4. Definir estos eventos personalizados, disparados en ambos idiomas y
   enviados tanto por pixel como por Conversions API:

   | Evento | Cuándo dispara | Parámetros |
   |---|---|---|
   | `AuditRequested` | Envío del formulario de auditoría de procesos | `value: 450`, `currency: USD`, `locale` |
   | `QuoteRequested` | Solicitud de cotización de cualquier otro servicio | `service_name`, `locale` |
   | `DiscoveryBooked` | Agendamiento de llamada de discovery gratuita | `locale` |
   | `ServiceDetailViewed` | Apertura de "Ver detalles" / "Ver qué incluye" | `service_name`, `locale` |
   | `ChatStarted` | Primer mensaje enviado al asistente conversacional | `locale` |

   `AuditRequested` es el evento de conversión principal de la campaña.

5. Verificar cada evento con el Events Manager de Meta y el modo DebugView de
   GA4 antes de dar la tarea por cerrada. Reportar el resultado de la
   verificación, no solo que el código está escrito.

6. Deduplicar eventos entre pixel y Conversions API usando `event_id`
   compartido, para que no se cuenten dos veces.

---

### Privacidad y consentimiento

El pixel se creó con Automatic Advanced Matching **desactivado**, que es lo
correcto para arrancar. Aun así, el pixel y GA4 recogen datos de navegación y
los envían a terceros, así que el sitio necesita respaldo legal antes de
escalar presupuesto publicitario. Hoy no tiene ni política de privacidad ni
banner de consentimiento.

1. **Página de política de privacidad** en `/es/privacidad` y `/en/privacy`,
   enlazada desde el footer. Debe declarar: qué datos se recogen, que se usa
   Meta Pixel y Google Analytics, con qué finalidad, cuánto tiempo se
   conservan, y cómo ejercer los derechos de acceso, rectificación y
   supresión. Aplica la Ley 1581 de 2012 de protección de datos personales de
   Colombia.

2. **Banner de consentimiento de cookies** que permita rechazar las cookies
   analíticas y publicitarias. El pixel no debe dispararse hasta que el
   visitante acepte. Implementar con el modo de consentimiento de Meta
   (`fbq('consent', 'revoke')` por defecto y `'grant'` tras la aceptación).

Nota: no soy abogado y esto no es asesoría legal. El contenido exacto de la
política conviene revisarlo con un abogado antes de publicarlo, sobre todo si
se atienden clientes en Estados Unidos o Europa.

---

## OBJETIVO 2 — Bloque "Qué pasa después de la auditoría"

Este bloque estaba en la especificación anterior y no se implementó. Es el que
sostiene la venta de un producto de $450: nadie paga esa cifra sin ver el
camino completo antes de dar clic.

Ubicación: dentro del detalle de la auditoría de procesos, inmediatamente
después de la lista de 8 entregables ("QUÉ RECIBE" / "WHAT YOU GET").

Formato: línea de tiempo horizontal de 4 pasos, mismo tratamiento visual que
la sección de proceso de 6 fases que ya existe.

**Paso 1 — Recibe el informe** · DÍA 5-7
Con cifras concretas. El informe es suyo: puede usarlo con nosotros o llevarlo
a cualquier otro proveedor.

**Paso 2 — Decide qué implementar** · SIN PLAZO
Puede implementar todo, una parte o nada. Si la auditoría concluye que no hace
falta construir nada, se lo decimos por escrito.

**Paso 3 — Propuesta cerrada** · 48 HORAS
Alcance cerrado, precio fijo y cronograma. Lo que no está escrito no está
incluido, y lo decimos de frente.

**Paso 4 — Se descuentan los $450** · 60 DÍAS
Si decide avanzar dentro de los 60 días siguientes, el costo completo de la
auditoría se descuenta del proyecto.

### Nota de alcance (debajo de la línea de tiempo)

> La auditoría tiene sentido a partir de 8-10 personas en el equipo, o cuando
> hay varios procesos corriendo en paralelo. Si su operación es más pequeña,
> dígalo en la llamada de discovery y le ahorramos el gasto.

Esta nota filtra al cliente demasiado pequeño antes de que pague, y refuerza
la honestidad que ya es el eje de la marca.

---

## OBJETIVO 3 — Unificar el tratamiento (tú / usted)

El español mezcla las dos formas, a veces dentro de la misma tarjeta. Ejemplos
detectados:

- Hero: "Software que le devuelve horas a **su** empresa" → usted
- Auditoría, descripción: "cómo trabaja **tu** equipo... **te** lo decimos" → tú
- Auditoría, entregables: "Mapa de **sus** procesos... herramientas que ya
  **paga**" → usted
- Automatización: "consumen horas de **tu** equipo... los sistemas que ya
  **tienes**" → tú
- Software a la medida: "Convertimos **tu** operación" y luego bullets con
  "**su** operación", "**su** flujo real" → mezcla en la misma tarjeta

**Decisión: usar "usted" en todo el sitio en español.**

Razones: el comprador objetivo es un gerente o dueño de PYME en Colombia y
LATAM, donde "usted" es el registro comercial estándar; el resto del sitio
(proceso, compromisos, equipo) ya está consistentemente en usted; y para el
mercado estadounidense de habla hispana también es el registro más seguro.

Barrer todo el contenido en español y unificar. Revisar especialmente las
tarjetas de servicio, que son donde está la mayor mezcla.

---

## OBJETIVO 4 — Separar claramente las dos ofertas

Hoy hay tres nombres distintos para dos cosas, y se pisan entre sí:

- "Solicitar auditoría de procesos" (hero) → producto pagado de $450
- "Solicitar auditoría" (tarjeta de servicio) → producto pagado de $450
- "Solicitar diagnóstico" (final de la sección "Primero auditamos") → ¿cuál?
- "Agendar diagnóstico sin costo" (final de la sección de proceso) → llamada gratis
- "Diagnóstico" (paso 01 del proceso, 30-45 min sin costo) → llamada gratis

Un visitante no puede distinguir si "diagnóstico" es lo gratis o lo de $450.
Esa ambigüedad hace que la gente agende la llamada gratis en lugar de comprar
la auditoría, o peor, que crea que la auditoría es gratis y se sienta engañado
al llegar al formulario.

**Unificar la terminología así:**

| Concepto | Nombre único ES | Nombre único EN |
|---|---|---|
| Llamada gratuita de 30-45 min | **Llamada de discovery** | **Discovery call** |
| Producto pagado de $450 | **Auditoría de procesos** | **Process audit** |

- Eliminar la palabra "diagnóstico" de todo el sitio, o usarla exclusivamente
  para la llamada gratuita. No usarla nunca para el producto pagado.
- El paso 01 del proceso pasa a llamarse "Llamada de discovery".
- El CTA al final de "Primero auditamos. Después construimos." debe apuntar al
  producto pagado y decir "Solicitar auditoría de procesos — $450 USD".
  Esa sección es la que más argumenta a favor de la auditoría; su botón debe
  llevar a comprarla, no a agendar una llamada.
- Cada CTA de llamada gratuita debe decir explícitamente "sin costo" o "free".
- Cada CTA de auditoría debe mostrar el precio.

---

## OBJETIVO 5 — Detalle de los dos niveles de Presencia web

La tarjeta dice "en dos niveles según lo que necesite resolver" pero los
bullets visibles no distinguen entre uno y otro. El visitante no sabe qué
recibe por $300 ni qué existe por debajo.

Dentro del detalle del servicio, mostrar los dos niveles separados:

**Nivel Landing** · desde $100 USD · 5 a 7 días hábiles
- Página única enfocada en conversión
- Diseño sobre plantillas probadas
- Formulario de contacto conectado a WhatsApp
- SEO básico y analítica
- Hosting y dominio por 1 año

**Nivel Sitio completo** · desde $300 USD · 2 a 4 semanas
- Páginas múltiples con diseño propio
- Panel para administrar el contenido usted mismo
- SEO avanzado y analítica configurada
- Soporte 30 días post-lanzamiento
- Hosting y dominio por 1 año

El precio de $100 solo aparece aquí dentro, nunca en la tarjeta principal ni
en ningún listado resumido.

---

## OBJETIVO 6 — Correcciones menores

1. **Término prohibido**: la sección de stack tecnológico dice "Herramientas de
   vanguardia para proyectos de calidad" (ES) / "Cutting-edge tools for
   high-quality projects" (EN). Ambas frases son genéricas y no dicen nada.
   Reemplazar por algo concreto, por ejemplo:
   ES: "Trabajamos con tecnologías estables y con comunidad activa. Nada
   experimental en producción."
   EN: "We work with stable, well-supported technologies. Nothing experimental
   in production."

2. **Página 404**: `/es/no-existe` devuelve un 404 correcto (bien), pero la
   página de error viene con `lang="en"` sin importar el idioma de la ruta.
   Localizarla y añadirle enlaces de vuelta a la home del idioma correcto y a
   la sección de servicios.

3. **Imagen social**: `og:image` apunta a `/img.png`. Verificar que sea una
   tarjeta social real de 1200×630 px con el logo y el mensaje
   "Software que le devuelve horas a su empresa", no un logo suelto ni una
   captura. Es lo que se ve al compartir por WhatsApp y LinkedIn, que va a ser
   un canal importante.

4. **Verificar el prerenderizado desde fuera**: al hacer `fetch` desde el
   propio navegador todas las rutas devuelven HTML completo con contenido
   (85 KB, `lang` correcto). Pero un fetch externo a la raíz devolvió una
   versión antigua y vacía, con el título anterior
   ("Dexel - Desarrollo de software a la medida"). Esto sugiere caché obsoleta
   en el CDN o en el edge para `/`.

   Acciones: purgar la caché del CDN, verificar los headers `Cache-Control` de
   la raíz, y comprobar con `curl -A "Mozilla/5.0"` desde fuera de la red
   local que `/`, `/es` y `/en` devuelven el contenido nuevo. Confirmar además
   en Google Search Console con la herramienta de inspección de URL.

---

## Restricciones

- No tocar la sección "Primero auditamos. Después construimos.", el proceso de
  6 fases, los tres compromisos por escrito, ni la sección de equipo, salvo
  los cambios de terminología del Objetivo 4.
- Mantener el sistema de diseño actual. Esto no es un rediseño.
- No introducir precios, plazos ni cifras que no estén en este documento o ya
  publicados en el sitio.

## Entregable

1. Resumen de archivos modificados.
2. Resultado de la verificación de eventos en Events Manager y GA4 DebugView.
3. Confirmación del estado de la caché del CDN tras el purgado.
4. Cualquier problema encontrado que no esté en este documento.
