# TAREA: Navegación por categorías, páginas dedicadas y correcciones visuales

## Contexto

El sitio ya tiene la estructura de servicios correcta, bilingüe, con
prerenderizado, pixel de Meta y banner de consentimiento funcionando.

Esta tarea cambia la arquitectura de navegación: pasar de una página única de
servicios con anclas (`/es/servicios#automatizacion-e-integracion`) a tres
páginas dedicadas por categoría, accesibles desde un menú desplegable.

Explore primero la estructura actual de rutas y componentes, y muestre su plan
antes de ejecutar cambios grandes.

---

## PARTE A — Correcciones

### A1. Eliminar la sección de stack tecnológico

Quitar por completo la sección de tecnologías de la home, en ambos idiomas.
Al comprador no le interesa qué framework se usa; le interesa cuántas horas
recupera. Eliminar también sus cadenas de i18n para no dejar texto huérfano.

### A2. Animaciones ausentes en servicios y auditoría

La home tiene animaciones de entrada al hacer scroll que no se aplican en
`/es/servicios` ni en `/es/servicios/auditoria`. Identificar el componente o
hook que las gestiona en la home y aplicarlo consistentemente en esas dos
páginas.

Requisito: respetar `prefers-reduced-motion`. Si el sistema operativo del
visitante pide movimiento reducido, las animaciones no deben ejecutarse.

### A3. Logo de fondo con contraste insuficiente

El logo que aparece como marca de agua detrás del contenido en las páginas de
servicios y auditoría es casi invisible. Subir su opacidad hasta que se
perciba sin competir con el texto, y verificar el resultado en pantalla
brillante y en móvil.

Si al subir la opacidad el texto pierde legibilidad, la alternativa es
aumentar el tamaño del logo y bajar aún más la opacidad: una marca de agua
grande y muy tenue se lee mejor que una pequeña y media.

---

## PARTE B — Menú desplegable de servicios

Convertir el ítem "SERVICIOS" del menú principal en un desplegable con tres
grupos. Cada grupo enlaza a su propia página y muestra los subservicios que
contiene.

### Estructura

```
SERVICIOS ▾
│
├── DESARROLLO WEB                    → /es/servicios/desarrollo-web
│     Sitios web y landing pages
│     Aplicaciones web a la medida
│     Paneles de administración
│     Integraciones y APIs
│     Pasarelas de pago
│     Mantenimiento y soporte
│
├── AUTOMATIZACIÓN                    → /es/servicios/automatizacion
│     Workflows con n8n
│     Chatbots de WhatsApp con IA
│     Chatbots de WhatsApp sin IA
│     Agentes conversacionales
│     Integración entre sistemas
│     Reportes automáticos
│     Lectura automática de documentos
│
└── AUDITORÍA DE PROCESOS             → /es/servicios/auditoria
      Mapa de procesos actuales
      Matriz de oportunidades
      Cuantificación de horas
      Quick win presupuestado
      Roadmap por fases
      Revisión de herramientas
      Riesgos operativos
      Sesión de resultados
```

Rutas en inglés: `/en/services/web-development`, `/en/services/automation`,
`/en/services/process-audit`.

### Requisitos del desplegable

- Debe abrirse con hover en escritorio y con clic o toque en móvil.
- El encabezado de cada grupo es un enlace en sí mismo, no solo un título:
  al hacer clic en "AUTOMATIZACIÓN" se va a la página de automatización.
- Accesible por teclado: navegable con Tab, se cierra con Escape,
  con `aria-expanded` y `aria-haspopup` correctos.
- En móvil, un acordeón dentro del menú hamburguesa. No intentar reproducir
  el desplegable de escritorio en pantalla pequeña.
- `/es/servicios` se mantiene como página índice con las tres categorías.
  Las anclas actuales (`#automatizacion-e-integracion`, etc.) deben redirigir
  a la página nueva correspondiente para no romper enlaces existentes.

---

## PARTE C — Las tres páginas dedicadas

Cada página sigue la misma plantilla. Contenido distinto, estructura idéntica.

### Estructura común

1. **Encabezado** — titular orientado a resultado (no al servicio), subtítulo
   de una línea, precio de entrada y plazo.
2. **Frentes** — de 4 a 7 tarjetas, una por subservicio. Cada una con nombre
   concreto y una línea de qué resuelve. No listas de tecnología.
3. **Qué incluye** — el detalle del alcance.
4. **Cómo trabajamos** — reutilizar el proceso de 6 fases que ya existe,
   en versión compacta.
5. **Preguntas frecuentes** — de 4 a 6, específicas de esa categoría.
6. **CTA** — el que corresponda a esa categoría.

Todas las páginas necesitan `title`, `description`, Open Graph, `canonical`,
`hreflang` y JSON-LD de tipo `Service` propios.

### C1 — Desarrollo web · `/es/servicios/desarrollo-web`

Titular: **Software que su operación sí usa.**
Subtítulo: Sitios, aplicaciones y paneles construidos alrededor de cómo
trabaja su empresa.
Precio de entrada: Desde $300 USD · Aplicaciones desde $1,000 USD

Frentes:
- **Sitios web** — presencia profesional, en dos niveles según lo que
  necesite resolver.
- **Aplicaciones web a la medida** — cuando ninguna herramienta del mercado
  se ajusta a su operación.
- **Paneles de administración** — para que su equipo gestione la operación
  sin depender de nosotros.
- **Integraciones y APIs** — conectar lo que ya tiene con lo que va a
  construir.
- **Pasarelas de pago** — cobrar en línea, con las pasarelas que se usan en
  Colombia y la región.
- **Mantenimiento** — actualizaciones, respaldos y corrección de errores.
  Desde $150 USD/mes.

Los dos niveles de Presencia web (Landing desde $100 / Sitio completo desde
$300) van dentro de esta página. Sigue vigente la restricción: el $100 no
aparece en la tarjeta principal ni en JSON-LD ni en metadatos.

CTA: Solicitar cotización

### C2 — Automatización · `/es/servicios/automatizacion`

Titular: **Las horas que su equipo gasta en tareas repetitivas.**
Subtítulo: Automatizamos los procesos manuales que consumen su día e
integramos los sistemas que ya tiene.
Precio de entrada: Desde $1,500 USD · Entrega en 2 a 6 semanas

Frentes:
- **Workflows con n8n** — automatización alojada en su propia
  infraestructura, sin costos por operación que crecen con el volumen.
- **Chatbot de WhatsApp con IA** — responde, califica y deriva a una persona
  cuando hace falta.
- **Chatbot de WhatsApp sin IA** — flujos de respuesta con reglas fijas,
  para procesos que no necesitan un modelo de lenguaje. Más barato, más
  predecible.
- **Agentes conversacionales** — agendan, cotizan y hacen seguimiento dentro
  del flujo de su operación.
- **Integración entre sistemas** — que sus herramientas dejen de necesitar
  que alguien copie datos entre ellas.
- **Reportes automáticos** — los informes que hoy alguien arma a mano cada
  semana.
- **Lectura automática de documentos** — extraer datos de facturas, PDFs e
  imágenes sin digitación manual.

Nota importante sobre el chatbot sin IA: es un diferenciador real y hay que
explicarlo, no esconderlo. La mayoría de proveedores vende IA para todo. Decir
de frente que hay procesos donde un flujo con reglas es mejor —más barato, más
predecible, sin alucinaciones— es coherente con la posición de la marca y
genera confianza.

CTA: Solicitar cotización · secundario: Agendar llamada de discovery sin costo

### C3 — Auditoría de procesos · `/es/servicios/auditoria`

La página ya existe. Mantener su contenido (los 8 entregables, los 4 pasos
posteriores, la nota de alcance) y adaptarla a la plantilla común para que
las tres páginas se vean consistentes.

CTA: Solicitar auditoría de procesos — $450 USD

---

## PARTE D — Eventos de medición

Las páginas nuevas necesitan sus eventos, con la misma implementación de pixel
y Conversions API que ya existe:

| Evento | Cuándo dispara | Parámetros |
|---|---|---|
| `ServiceCategoryViewed` | Carga de cualquiera de las tres páginas | `category`, `locale` |
| `QuoteRequested` | Solicitud de cotización | `category`, `locale` |
| `AuditRequested` | Solicitud de auditoría | `value: 450`, `currency: USD`, `locale` |
| `DiscoveryBooked` | Agendamiento de llamada sin costo | `category`, `locale` |

Mantener la deduplicación por `event_id` entre pixel y CAPI. Los eventos no
deben dispararse antes de que el visitante acepte el consentimiento.

---

## Verificación antes de dar por cerrado

Ejecutar en consola sobre `https://www.dexel-inc.com/es` y confirmar:

```js
({
  sinStack:   !/stack tecnol|vanguardia/i.test(document.body.innerText),
  dropdown:   !!document.querySelector('[aria-haspopup="true"], [data-services-dropdown]'),
  reduceMotion: !!document.querySelector('style,link') // revisar manualmente
})
```

Y comprobar con `curl` que las seis rutas nuevas devuelven 200 con contenido
prerenderizado:

```
/es/servicios/desarrollo-web      /en/services/web-development
/es/servicios/automatizacion      /en/services/automation
/es/servicios/auditoria           /en/services/process-audit
```

Verificar además que las anclas antiguas redirigen correctamente y que el
`sitemap.xml` incluye las rutas nuevas.

---

## Restricciones

- Mantener el sistema de diseño actual. Esto no es un rediseño.
- No tocar la sección "Primero auditamos. Después construimos.", el proceso de
  6 fases, los tres compromisos por escrito ni la sección de equipo.
- No introducir precios, plazos ni cifras que no estén en este documento o ya
  publicados en el sitio.
- Todo el copy nuevo habla de horas y dinero recuperados, no de tecnología.
  Los nombres de herramientas (n8n, WhatsApp) sí se pueden usar porque son
  términos que el comprador busca.

## Entregable

1. Resumen de archivos creados y modificados.
2. Confirmación de que las seis rutas devuelven contenido prerenderizado.
3. Resultado de la verificación de eventos.
4. Cualquier problema encontrado que no esté en este documento.
