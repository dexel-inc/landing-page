# TAREA: Módulo de Formación — dexel-inc.com

## Contexto

Dexel va a publicar formación como línea propia. Son **dos cosas distintas** y
el sitio debe dejarlo claro, porque confundirlas debilita ambas:

| | **Capacitación de entrega** | **Formación in-company** |
|---|---|---|
| Ya existe | Sí, se hace en todos los proyectos | No, es nuevo |
| Para quién | Clientes que ya contrataron | Empresas que nunca han trabajado con Dexel |
| Se cobra | No, va incluida | Sí, producto propio |
| Función | Que lo entregado se use | Ingreso y puerta de entrada |

La primera es un **entregable que hoy está invisible en el sitio** y hay que
sacarlo a la luz. La segunda es una **página nueva**.

Explore la estructura actual antes de empezar y muestre su plan.

---

## PARTE A — Hacer visible la capacitación de entrega

Todo proyecto de Dexel incluye una sesión de capacitación para que el equipo
del cliente aprenda a usar lo entregado, más resolución de dudas en vivo. Eso
no aparece en ninguna parte del sitio.

Es relevante porque ataca directamente el miedo principal del comprador de
software a la medida: *"voy a pagar por algo que mi gente no va a usar."*

### A1 — Añadir como cuarto compromiso

La sección de compromisos por escrito hoy tiene tres:
demo cada viernes, precio fijo antes de codificar, repositorio del cliente
desde el primer commit.

Añadir un cuarto, con el mismo tratamiento visual:

**Capacitamos a su equipo antes de irnos.**
Toda entrega incluye una sesión de capacitación en vivo con las personas que
van a usar el sistema, y resolución de dudas en directo. No entregamos un
manual y desaparecemos.

Traducción al inglés: **We train your team before we leave.**
Every delivery includes a live training session with the people who will
actually use the system, plus live Q&A. We don't hand over a manual and
disappear.

### A2 — Añadir a las tres páginas de servicio

Incluir una línea sobre la capacitación incluida en el bloque "qué incluye"
de `/es/servicios/desarrollo-web`, `/es/servicios/automatizacion` y en la
página de auditoría cuando desemboca en implementación.

### A3 — Añadir a las preguntas frecuentes

Nueva pregunta en el FAQ, en ambos idiomas:

**¿Nos enseñan a usar lo que construyen?**
Sí. Toda entrega incluye una sesión de capacitación en vivo con las personas
que van a usar el sistema y un espacio para resolver dudas en directo. Si más
adelante entra alguien nuevo al equipo, podemos repetir la sesión.

---

## PARTE B — Página de Formación in-company

Ruta nueva: `/es/formacion` y `/en/training`.

Este es el producto nuevo. El peso de la página va aquí, porque es lo que
trae clientes que todavía no conocen a Dexel.

### Posicionamiento

**No es un curso de IA.** El mercado de cursos de IA está saturado y hay
contenido gratuito de sobra. La ventaja de Dexel no es saber de IA: es haber
implementado y saber qué falla.

El eje de todo el copy es **"lo que aprendimos implementando"**, nunca "cómo
usar ChatGPT".

### Encabezado

Titular: **Enseñamos lo que aprendimos implementando.**

Subtítulo: Formación en automatización e IA para equipos que van a hacer el
trabajo, no para asistir a una charla. Cada participante sale con una
automatización real de su propia operación funcionando.

Dato de contexto a incluir, con su fuente: según un estudio de Boston
Consulting Group y MIT Sloan, el 70% de los proyectos de IA no supera la fase
piloto por falta de integración con los procesos existentes. Ese es
exactamente el problema que esta formación previene.

### Contenido del programa — seis bloques

Presentar como acordeón o tarjetas expandibles.

**1. Qué NO automatizar**
Procesos sin reglas claras. Procesos que van a cambiar en seis meses. Procesos
que corren dos veces al mes. Y el más importante: el proceso roto que hay que
arreglar antes, no automatizar. Automatizar un proceso malo multiplica el
problema.

*Nota de implementación: este bloque va primero, no en el medio. Abrir por lo
contraintuitivo es lo que separa esta formación de un curso genérico.*

**2. La aritmética real**
Cómo medir el estado actual: horas por ejecución, frecuencia, personas
involucradas. El costo total que casi nadie calcula: licencias, mantenimiento
y el tiempo de quien supervisa que el sistema siga funcionando. Y cómo saber
cuándo el retorno simplemente no da.

**3. El mapa de herramientas, sin fanatismo**
n8n, Make y Zapier: cuándo conviene cada uno y cuánto cuestan de verdad al
crecer el volumen. Cuándo NO hace falta IA porque un flujo con reglas es más
barato y más predecible. Qué es un agente y cuándo tiene sentido.
Herramientas del mercado colombiano: facturación electrónica y DIAN,
WhatsApp Business API.

**4. Manos a la obra**
Cada participante construye una automatización real de su propia operación,
no un ejemplo de juguete. Sale funcionando al terminar la sesión.

*Este es el entregable que justifica el precio. Debe estar destacado.*

**5. Lo que falla**
Cuando el modelo inventa respuestas y cómo acotarlo. Qué pasa cuando cambia
una API de la que depende un flujo. Qué datos no deberían salir hacia un
modelo de terceros. Y por qué el equipo abandona la herramienta a los tres
meses, que es el fracaso más común y el menos discutido.

**6. Cuándo llamar a un desarrollador**
Los límites reales de lo que se puede resolver sin escribir código, y las
señales de que un proceso los superó.

### Formatos y precios

**Estos precios son una propuesta a validar antes de publicar.** Están
calibrados contra la referencia de mercado colombiano (mentorías desde
$190.000 COP/hora, programas completos alrededor de $4.890.000 COP) y contra
el precio de la auditoría de Dexel ($450 USD).

| Formato | Duración | Participantes | Precio propuesto |
|---|---|---|---|
| **Sesión ejecutiva** | Medio día | Hasta 8 | $600 USD |
| **Formación completa** | Un día | Hasta 12 | $1,200 USD |
| **Programa a la medida** | Varias sesiones | A convenir | Cotización |

Incluir en todos los formatos: modalidad presencial en Colombia o remota;
material de referencia para el equipo; y una sesión de seguimiento a las dos
semanas para resolver dudas de lo que hayan intentado por su cuenta.

**Mecanismo de crédito**, con el mismo criterio que la auditoría: si la
empresa contrata un proyecto dentro de los 60 días siguientes, el 50% del
costo de la formación se descuenta. Ojo: aquí es 50%, no 100% como en la
auditoría, porque la formación tiene valor independiente y no es un paso
previo obligatorio.

### Preguntas frecuentes de la página

- ¿Necesitamos saber programar? No.
- ¿Es presencial o remoto? Ambos. Presencial en Colombia, remoto en el resto.
- ¿Qué pasa si después queremos que ustedes lo implementen?
- ¿Sirve si ya usamos alguna herramienta de automatización?
- ¿Cuántas personas mínimo?
- ¿Nos dan material o grabación?

### CTA

Principal: **Solicitar formación para mi equipo**
Secundario: **Agendar llamada de discovery sin costo**

---

## PARTE C — Navegación

Añadir **FORMACIÓN** como ítem propio del menú principal, al mismo nivel que
INICIO, SERVICIOS, AUDITORÍA y CONTACTO. Sin desplegable: enlace directo.

**No incluirlo como cuarta categoría dentro del desplegable de SERVICIOS.**
Los servicios son cosas que Dexel hace *para* el cliente; la formación es algo
que hace *con* el cliente. Mezclarlos diluye ambas promesas.

Nota de nomenclatura: usar **"Formación"**, no "Cursos". "Cursos" evoca
contenido grabado y de bajo precio. "Formación in-company" comunica un
servicio profesional con precio de servicio profesional. En inglés,
**"Training"**.

Actualizar el `sitemap.xml` con las rutas nuevas.

---

## PARTE D — Medición

Mismos mecanismos de pixel y Conversions API que el resto del sitio, con
deduplicación por `event_id` y respetando el consentimiento.

| Evento | Cuándo dispara | Parámetros |
|---|---|---|
| `TrainingPageViewed` | Carga de la página de formación | `locale` |
| `TrainingRequested` | Envío del formulario de solicitud | `format`, `value`, `currency: USD`, `locale` |

`TrainingRequested` debe crearse también como conversión personalizada en Meta
Events Manager para poder optimizar campañas hacia él.

---

## PARTE E — SEO y metadatos

Ambas rutas necesitan `title`, `description`, Open Graph, `canonical`,
`hreflang` y JSON-LD propios. Para el JSON-LD usar el tipo `Course` o
`EducationalOccupationalProgram` con el proveedor declarado como
`Organization` Dexel.

Título propuesto (ES): Formación en automatización e IA para equipos | Dexel
Título propuesto (EN): Automation and AI training for teams | Dexel

---

## Restricciones

- Mantener el sistema de diseño actual. No es un rediseño.
- El copy no promete resultados de negocio ni porcentajes de ahorro.
- No prometer certificaciones ni acreditaciones que Dexel no emita.
- No presentar la formación como sustituto de la implementación ni al revés.
- No tocar la sección "Primero auditamos. Después construimos.", el proceso de
  6 fases ni la sección de equipo.

## Entregable

1. Resumen de archivos creados y modificados.
2. Confirmación de que `/es/formacion` y `/en/training` devuelven contenido
   prerenderizado.
3. Confirmación de que el cuarto compromiso aparece en ambos idiomas.
4. Resultado de la verificación de eventos.
