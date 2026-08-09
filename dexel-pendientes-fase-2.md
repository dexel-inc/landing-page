# TAREA: Pendientes fase 2 — dexel-inc.com

## Contexto

Los objetivos 3, 4 y 6 de `dexel-ajustes-fase-2.md` quedaron bien y están
verificados en producción: la terminología está unificada (cero apariciones de
"diagnóstico" fuera del uso correcto, solo "discovery" para la llamada
gratuita), los CTA muestran el precio ("Solicitar auditoría de procesos —
$450 USD") y distinguen la llamada gratuita ("Agendar llamada de discovery sin
costo"), el tratamiento de "usted" es consistente, "vanguardia" desapareció, y
las páginas de privacidad están publicadas y enlazadas.

El pixel de navegador `1065161589428764` está cargando correctamente.

Quedaron tres cosas sin implementar. Están especificadas en
`dexel-ajustes-fase-2.md` pero no aparecen en el DOM de
`https://www.dexel-inc.com/es`. Verificado buscando en
`document.documentElement.textContent`, que incluye contenido colapsado y no
visible.

---

## PENDIENTE 1 — Bloque "Qué pasa después de la auditoría"

**Estado:** no existe. La búsqueda de "Recibe el informe" y "descuentan" en
todo el documento no devuelve nada.

**Por qué importa:** la auditoría pasó de ser gratuita a costar $450. Nadie
paga esa cifra sin ver el camino completo antes de dar clic. Los 8 entregables
dicen qué recibe; este bloque dice qué pasa después y por qué el riesgo es
bajo. Es el que cierra la venta.

**Ubicación:** dentro del detalle de la auditoría de procesos, inmediatamente
después de la lista "QUÉ RECIBE" / "WHAT YOU GET".

**Formato:** línea de tiempo horizontal de 4 pasos, con el mismo tratamiento
visual de la sección de proceso de 6 fases que ya existe en el sitio.

### Contenido (español)

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

### Contenido (inglés)

**Step 1 — You get the report** · DAY 5-7
With concrete numbers. The report is yours: use it with us or take it to any
other vendor.

**Step 2 — You decide what to implement** · NO DEADLINE
Implement all of it, part of it, or none. If the audit concludes you don't
need to build anything, we put that in writing.

**Step 3 — Closed proposal** · 48 HOURS
Closed scope, fixed price, and timeline. If it isn't written down, it isn't
included, and we say so upfront.

**Step 4 — The $450 comes off** · 60 DAYS
If you decide to move forward within the next 60 days, the full cost of the
audit is credited toward the project.

---

## PENDIENTE 2 — Nota de alcance mínimo

**Estado:** no existe.

**Ubicación:** inmediatamente debajo de la línea de tiempo del Pendiente 1,
con tratamiento visual de nota o aclaración, no de bloque destacado.

**Español:**

> La auditoría tiene sentido a partir de 8-10 personas en el equipo, o cuando
> hay varios procesos corriendo en paralelo. Si su operación es más pequeña,
> dígalo en la llamada de discovery y le ahorramos el gasto.

**Inglés:**

> The audit makes sense from about 8-10 people on the team, or when you have
> several processes running in parallel. If your operation is smaller, say so
> on the discovery call and we'll save you the expense.

Esta nota filtra al cliente demasiado pequeño antes de que pague, y refuerza
la honestidad que ya es el eje de la marca.

---

## PENDIENTE 3 — Los dos niveles de Presencia web

**Estado:** no existe. No hay ninguna aparición de "Nivel Landing" ni de "$100"
en el documento.

**Problema actual:** la tarjeta dice "en dos niveles según lo que necesite
resolver" pero los bullets visibles no distinguen entre uno y otro. El
visitante no sabe qué recibe por $300 ni que existe una opción por debajo.

**Ubicación:** dentro del detalle del servicio "Presencia web", reemplazando
o complementando la lista genérica actual.

### Nivel Landing · desde $100 USD · 5 a 7 días hábiles

- Página única enfocada en conversión
- Diseño sobre plantillas probadas
- Formulario de contacto conectado a WhatsApp
- SEO básico y analítica
- Hosting y dominio por 1 año

### Nivel Sitio completo · desde $300 USD · 2 a 4 semanas

- Páginas múltiples con diseño propio
- Panel para administrar el contenido usted mismo
- SEO avanzado y analítica configurada
- Soporte 30 días post-lanzamiento
- Hosting y dominio por 1 año

**Restricción crítica:** el precio de $100 aparece ÚNICAMENTE dentro de este
detalle. Nunca en la tarjeta principal del servicio, nunca en ningún listado
resumido, nunca en datos estructurados JSON-LD, nunca en metadatos. El precio
visible de la tarjeta sigue siendo "Desde $300 USD".

Verifica esto después de implementar: buscar "$100" en el HTML de la página de
servicios solo debe devolver coincidencias dentro del detalle expandido.

---

## PENDIENTE 4 — Banner de consentimiento de cookies

**Estado:** las páginas de privacidad se publicaron correctamente, pero no hay
banner de consentimiento.

Implementar un banner que:

1. Aparezca en la primera visita, en el idioma de la página.
2. Permita **Aceptar** y **Rechazar** con el mismo peso visual. No usar patrones
   donde rechazar sea más difícil que aceptar.
3. Mantenga el pixel de Meta en estado revocado por defecto:
   `fbq('consent', 'revoke')` al cargar, y `fbq('consent', 'grant')` solo tras
   la aceptación explícita.
4. Aplique lo mismo a GA4 cuando se configure.
5. Persista la decisión y no vuelva a preguntar.
6. Enlace a la política de privacidad correspondiente al idioma.

No usar librerías pesadas de gestión de consentimiento. Una implementación
propia y ligera es suficiente para este caso.

---

## Verificación antes de dar por cerrado

Ejecutar en la consola del navegador sobre `https://www.dexel-inc.com/es` y
confirmar que todo devuelve `true`:

```js
const t = document.documentElement.textContent;
({
  pasos:        /Recibe el informe/i.test(t) && /descuentan/i.test(t),
  alcance:      /8-10 personas/i.test(t),
  nivelLanding: /Nivel Landing/i.test(t),
  nivelCompleto:/Nivel Sitio completo/i.test(t),
  banner:       !!document.querySelector('[data-consent-banner]')
})
```

Y repetir la primera comprobación en `/en` con los textos en inglés.

---

## Restricciones

- Mantener el sistema de diseño actual. Esto no es un rediseño.
- No tocar nada de lo que ya quedó bien: terminología, CTA con precio,
  tratamiento de usted, páginas de privacidad.
- No introducir precios, plazos ni cifras que no estén en este documento o ya
  publicados en el sitio.

## Entregable

1. Resumen de archivos modificados.
2. Salida de la verificación de arriba, en ambos idiomas.
3. Confirmación de que "$100" no aparece fuera del detalle de Presencia web.
