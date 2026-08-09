# TAREA: Reestructuración de la sección de servicios — dexel-inc.com

## Contexto

Eres un desarrollador senior trabajando en el sitio de Dexel Digital Excellence
(dexel-inc.com), una empresa colombiana de 5 desarrolladores que automatiza
procesos, integra sistemas y construye software a la medida para clientes en
LATAM y Estados Unidos.

El sitio actual es una SPA (React/Vite) que funciona bien pero tiene tres
problemas de negocio que hay que resolver en código:

1. El servicio principal de la empresa (automatización de procesos e
   integración de sistemas) se promete en el hero pero NO existe como servicio
   comprable en la lista.
2. La auditoría de procesos —el diferenciador central— se ofrece gratis y no
   es un producto. Debe convertirse en producto pagado.
3. El primer precio visible es $100 USD, lo que ancla la marca como proveedor
   barato y destruye el poder de precio en el mercado estadounidense.

Antes de escribir código: explora el repositorio, identifica dónde vive la
sección de servicios y cómo están estructurados los datos de cada servicio.
Muéstrame tu plan antes de ejecutar cambios grandes.

---

## OBJETIVO 1 — Reestructurar la lista de servicios

### Estado actual (6 servicios, en este orden)

1. Landing pages — desde $100 USD
2. Websites — desde $300 USD
3. Web apps — desde $1000 USD
4. Social media bot — desde $250 USD
5. Technology consulting — desde $250 USD
6. Project maintenance — desde $150 USD/mes

### Estado objetivo (5 servicios, en este orden)

**POSICIÓN 1 — Auditoría de procesos** (NUEVO, destacado visualmente
por encima de los demás, con tratamiento distinto: es el producto de entrada)

- Precio: `$450 USD` · Entrega: `5 a 7 días hábiles`
- Etiqueta destacada: `SE DESCUENTA 100% DEL PROYECTO`
- NOTA DE IMPLEMENTACIÓN: el precio debe quedar en una constante o archivo de
  configuración, no incrustado en el componente. Se va a ajustar por mercado
  (LATAM $450, Estados Unidos $1,200-1,500) y es el número que más se va a
  iterar. Déjalo en un solo lugar del código.
- Descripción corta:
  "Revisamos cómo trabaja tu equipo hoy y te decimos exactamente qué procesos
  se pueden automatizar, cuántas horas al mes recuperarías y cuánto costaría
  cada implementación. Si concluimos que no necesitas construir nada, te lo
  decimos."
- CTA propio y distinto al resto: `Solicitar auditoría`
  (los demás servicios mantienen `Solicitar cotización`)

**POSICIÓN 2 — Automatización e integración** (NUEVO)

- Precio: `Desde $1,500 USD` · Entrega: `2 a 6 semanas`
- Descripción:
  "Automatizamos los procesos manuales que consumen horas de tu equipo e
  integramos los sistemas que ya tienes para que dejen de necesitar que
  alguien copie datos entre ellos."
- Bullets:
  - Automatización de procesos operativos
  - Integración entre sistemas existentes
  - Automatización en WhatsApp Business
  - Bots de atención y respuesta automática
  - Sincronización de datos entre plataformas
  - Reportes que se generan solos
- NOTA: este servicio absorbe el actual "Social media bot". Elimina esa
  tarjeta y reubica sus capacidades aquí, reencuadradas como automatización
  operativa, no como marketing en redes.

**POSICIÓN 3 — Software a la medida** (renombrado desde "Web apps")

- Precio: `Desde $1,000 USD` · Entrega: `4 a 8 semanas`
- Descripción (reescribir la actual, que es demasiado técnica):
  "Convertimos tu operación en un sistema. Aplicaciones web construidas
  alrededor de cómo trabaja tu empresa, no al revés."
- Bullets (traducir de features a resultados):
  - Panel para administrar tu operación sin depender de nosotros
  - Base de datos diseñada para tu flujo real
  - API propia para conectar con otros sistemas
  - Control de usuarios y permisos
  - Desplegado en la nube y listo para crecer

**POSICIÓN 4 — Presencia web** (fusión de "Landing pages" + "Websites")

- Precio: `Desde $300 USD` · Entrega: `5 días a 4 semanas`
- Una sola tarjeta con dos niveles internos:
  - Nivel "Landing" (desde $100): página única, diseño sobre plantillas
    probadas, SEO básico, formulario, hosting y dominio 1 año
  - Nivel "Sitio completo" (desde $300): páginas múltiples con diseño propio,
    panel de administración, SEO avanzado, analítica, soporte 30 días
- IMPORTANTE: el precio de $100 NO debe aparecer como precio principal de la
  tarjeta. Solo dentro del detalle del nivel Landing. El precio visible en la
  tarjeta es "Desde $300".
- CAMBIO DE COPY OBLIGATORIO: si en algún lugar del sitio aparece
  "Generic design" o "Diseño genérico" como característica, reemplázalo por
  "Diseño sobre plantillas probadas". Nunca anunciar algo como genérico.

**POSICIÓN 5 — Mantenimiento** (sin cambios de contenido)

- Precio: `Desde $150 USD/mes`
- Mantener bullets actuales.

### Servicio a eliminar

- **Technology consulting ($250)**: eliminar la tarjeta por completo. Sus
  capacidades (análisis de viabilidad, definición de arquitectura, estimación
  de costos, roadmap) quedan absorbidas dentro de la Auditoría de procesos.
  Verifica que no queden enlaces rotos ni referencias huérfanas a este
  servicio en menús, footer, sitemap o rutas.

---

## OBJETIVO 2 — Detalle de la auditoría y qué pasa después

Crear una vista o sección ampliada para la auditoría (al hacer clic en
"Ver detalles" o en ruta propia). Debe contener dos bloques:

### Bloque A — Qué entregamos (8 entregables numerados)

1. **Mapa de procesos actuales** — cómo funciona hoy tu operación, paso a paso.
2. **Matriz de oportunidades** — qué se puede automatizar, ordenado por
   impacto.
3. **Cuantificación de horas** — cuántas horas al mes consume cada proceso y
   cuánto cuestan esas horas.
4. **Quick win identificado y presupuestado** — la automatización de mayor
   retorno y menor esfuerzo, con precio cerrado.
5. **Roadmap por fases** — en qué orden conviene implementar y por qué.
6. **Revisión de herramientas que ya pagas** — licencias subutilizadas,
   duplicadas o que se pisan entre sí.
7. **Riesgos operativos** — procesos que dependen de una sola persona,
   respaldos, continuidad si algo falla.
8. **Sesión de resultados** — presentación en vivo con tu equipo, no un PDF
   enviado por correo.

### Bloque B — Qué pasa después de la auditoría

Esta sección es crítica: el comprador necesita ver el camino completo antes
de pagar. Representar como una línea de tiempo de 4 pasos:

- **Paso 1 — Recibes el informe** (día 5-7)
  Con cifras concretas. Es tuyo, lo puedas usar con nosotros o con cualquier
  otro proveedor.

- **Paso 2 — Decides qué quieres implementar** (sin presión, sin plazo)
  Puedes implementar todo, una parte, o nada. Si la auditoría concluye que no
  hace falta construir nada, lo decimos por escrito.

- **Paso 3 — Propuesta cerrada en 48 horas**
  Alcance cerrado, precio fijo y cronograma. Lo que no está escrito no está
  incluido, y lo decimos de frente.

- **Paso 4 — Los $450 se descuentan**
  Si decides avanzar dentro de los 60 días siguientes, el costo completo de
  la auditoría se descuenta del proyecto.

Incluir además una nota de alcance honesta:
"La auditoría tiene sentido a partir de 8-10 personas en el equipo o cuando
hay varios procesos corriendo en paralelo. Si tu operación es más pequeña,
dilo en la llamada de discovery y te ahorramos el gasto."

---

## OBJETIVO 3 — Sitio bilingüe ES/EN

El sitio está hoy íntegramente en inglés, pero la empresa es colombiana, el
tráfico pagado va a apuntar a Colombia y LATAM, y el caso de éxito que se
muestra es de una congregación hispanohablante.

- Implementar i18n con español como idioma por defecto e inglés disponible.
- Detectar idioma del navegador; permitir cambio manual persistente.
- Rutas localizadas: `/es/servicios` y `/en/services`, con `hreflang`
  correctamente declarado y `canonical` por idioma.
- Traducir todo el contenido, no solo la sección de servicios.
- Los precios se mantienen en USD en ambos idiomas, con la etiqueta "USD"
  siempre visible para evitar confusión con pesos colombianos.

Nota: la empresa ya construyó un sitio bilingüe ES/EN sobre un solo codebase
para un cliente (caso Casa Grande). Reutiliza ese enfoque si el código está
disponible en este repositorio o en otro accesible.

---

## OBJETIVO 4 — Renderizado para buscadores (CRÍTICO)

Verificado: `curl https://www.dexel-inc.com/` devuelve HTML sin contenido —
solo el `<title>` y el meta viewport. El contenido solo aparece tras ejecutar
JavaScript. Esto significa que los rastreadores de buscadores, los previews
de WhatsApp y LinkedIn, y los rastreadores de buscadores con IA no ven nada.

Además, `https://www.dexel-inc.com/servicios` devolvía 404, lo que sugiere que
las rutas profundas no tienen fallback configurado en el servidor.

Tareas:

1. Implementar SSR o prerenderizado en build para todas las rutas públicas.
   Si el stack es Vite + React, evaluar prerender en build o migración de las
   páginas de marketing a un framework con SSR.
2. Configurar el fallback de rutas en el hosting para que las URLs profundas
   no devuelvan 404 al entrar directamente.
3. Añadir metadatos por página: `title`, `description`, Open Graph y Twitter
   Card. Verificar que el preview se renderice correctamente al compartir por
   WhatsApp.
4. Generar `sitemap.xml` y `robots.txt`.
5. Añadir datos estructurados JSON-LD: `Organization` y `Service` para cada
   servicio con su precio.

**Criterio de aceptación:** `curl -s https://www.dexel-inc.com/ | grep -i
"auditoría"` debe devolver resultados. Repetir para cada ruta pública.

---

## OBJETIVO 5 — Medición

El sitio va a recibir tráfico pagado. Sin medición, la campaña es ciega.

1. Instalar Meta Pixel.
2. Configurar Conversions API del lado servidor (no solo el pixel de
   navegador).
3. Definir eventos personalizados:
   - `AuditRequested` — evento de conversión principal
   - `QuoteRequested` — cotización de cualquier otro servicio
   - `ServiceDetailViewed` — con el nombre del servicio como parámetro
   - `ProcessStarted` — interacción con el asistente conversacional
4. Instalar Google Analytics 4 con los mismos eventos.
5. Verificar que los eventos disparen correctamente antes de dar por cerrada
   la tarea.

---

## OBJETIVO 6 — Correcciones puntuales

1. **Contadores del caso de éxito**: los tres contadores de resultados
   (idiomas, horas/mes de mantenimiento, % de contenido sincronizado) aparecen
   en `0` cuando la página se lee sin scroll o sin JavaScript de animación.
   Asegurar que el valor final esté en el HTML y que la animación sea
   progresiva desde ese valor, no que el valor dependa de la animación.

2. **Nuevo caso anonimizado**: añadir un caso bajo NDA con cifra real,
   siguiendo el formato de los casos anonimizados que ya existen:

   > **4 horas → 45 minutos**
   > Un proceso operativo interno que consumía media jornada cada vez que se
   > ejecutaba. Después de automatizarlo: menos de una hora.
   > Si corre tres veces por semana, son más de 500 horas al año recuperadas.
   > *Sistema interno bajo acuerdo de confidencialidad.*

   No incluir nombre de cliente, ni nombre de herramienta, ni capturas.

3. **Auditar coherencia de plazos**: los plazos que aparecen en las tarjetas
   de servicio deben coincidir exactamente con los de la sección de preguntas
   frecuentes. Reportar cualquier discrepancia antes de corregirla.

---

## Restricciones

- **No toques** la sección "We audit first. Then we build.", la sección de
  proceso (los 6 pasos), los tres compromisos por escrito, ni la sección de
  equipo. Son el mejor contenido del sitio y funcionan como están.
- Mantén el sistema de diseño actual: paleta oscura, acentos azules,
  tipografía y tratamiento de tarjetas existentes. Esto es reestructuración
  de contenido y arquitectura, no rediseño visual.
- Todo el copy nuevo debe hablar de horas y dinero recuperados, no de
  tecnología. No liderar con "IA" en titulares.
- No prometer porcentajes de ahorro sin auditoría previa.
- No inventar casos, cifras ni testimonios. Solo se usa lo que está en este
  documento o ya existe en el sitio.

---

## Entregable

Al terminar, entrégame:

1. Resumen de archivos modificados y creados.
2. Confirmación de que `curl` devuelve contenido en todas las rutas públicas.
3. Lista de eventos de medición instalados y cómo verificarlos.
4. Cualquier discrepancia o problema que hayas encontrado y no estuviera en
   este documento.
