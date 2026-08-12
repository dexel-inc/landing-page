# TAREA: Correcciones visuales y contenido pendiente — dexel-inc.com

## Contexto

El menú desplegable de servicios y las tres páginas dedicadas ya están en
producción y funcionan. Este documento cubre tres regresiones visuales
introducidas en ese cambio, más el contenido que quedó sin aplicar.

Todo lo que sigue está verificado en `https://www.dexel-inc.com/es` en
viewport de 1920 px, modo oscuro.

---

## URGENTE 1 — La marca de agua del hero tapa el titular

**Síntoma:** el logotipo "dexel" que va detrás del hero se subió tanto de
opacidad que atraviesa el titular "Software que le devuelve horas a su
empresa". El texto compite con el fondo y pierde legibilidad.

**Causa:** hay dos capas semitransparentes superpuestas, y la primera es la
que causa el daño:

| Elemento | Clases actuales | Opacidad efectiva en oscuro |
|---|---|---|
| Capa de fondo | `fixed inset-0 z-0 opacity-20 dark:opacity-40 pointer-events-none` | **0.40** |
| Logotipo | `h-[55vh] w-auto max-w-none md:h-[70vh] opacity-40 dark:opacity-[0.16]` | 0.16 |

**Acción:** revertir estos valores a los que tenían antes de la tarea de
navegación. Revise el historial de git de esos componentes y restaure los
valores originales en lugar de inventar unos nuevos.

Si el valor original no se puede recuperar del historial, el criterio es:
la marca de agua debe percibirse solo cuando se la busca, nunca cuando se
lee el titular. Como referencia de partida, la capa de fondo no debería
pasar de `dark:opacity-10` y el logotipo de `dark:opacity-[0.06]`.

**Criterio de aceptación:** con el hero en pantalla, el titular debe leerse
sin que ninguna forma del fondo lo cruce visiblemente. Verificar en modo
claro y oscuro, y a 390, 1024 y 1920 px.

---

## URGENTE 2 — El logo del encabezado quedó ilegible

**Síntoma:** el logo de la barra superior es un SVG de 32×32 px que contiene
el logotipo completo (la palabra "dexel" más el monograma X superpuesto).
A ese tamaño los dos elementos se encabalgan y no se distingue ninguno.

**Elemento:** SVG con clases `w-7 h-7 md:w-8 md:h-8 text-current`, ubicado en
36,34.

**Acción:** restaurar el logo del encabezado a como estaba antes de la tarea
de navegación. Revise el historial de git del componente de encabezado.

El problema de fondo es que se está usando la versión de lockup completo
—pensada para anchos amplios— dentro de una caja cuadrada de tamaño de
monograma. Un logotipo con palabra necesita proporción horizontal, no un
cuadrado de 32 px. Si hay que reconstruirlo, use el monograma solo a ese
tamaño, o el lockup completo con ancho suficiente (aproximadamente 100-120 px
de ancho por 28-32 de alto).

---

## URGENTE 3 — El panel del desplegable se sale por la izquierda

**Síntoma:** al abrir SERVICIOS, el panel se extiende más allá del borde
izquierdo de la ventana. La primera columna, DESARROLLO WEB, queda cortada:
solo se alcanzan a ver fragmentos de sus enlaces ("...LA", "...TRACIÓN") en el
borde. De las tres columnas solo se ven completas AUTOMATIZACIÓN y AUDITORÍA
DE PROCESOS.

Verificado en viewport de 1920 px, así que no es un problema exclusivo de
pantallas pequeñas.

**Acción:** el panel debe quedar siempre contenido dentro del viewport.
Enfoques válidos, en orden de preferencia:

1. Anclar el panel al contenedor del encabezado en lugar de al ítem del menú,
   centrándolo respecto al ancho máximo del contenido del sitio. Es la
   solución más estable y la que usan los mega-menús bien hechos.
2. Si se mantiene anclado al ítem, aplicar corrección de desbordamiento: que
   el panel se desplace lo necesario para no cruzar ninguno de los dos bordes
   de la ventana.

Requisitos en cualquier caso:

- El panel nunca debe sobrepasar los bordes izquierdo ni derecho del viewport.
- No debe aparecer scroll horizontal en la página al abrirlo.
- Las tres columnas deben verse completas.
- En anchos intermedios (1024-1280 px), si las tres columnas no caben en una
  fila, deben reacomodarse en dos filas antes que recortarse.
- En móvil se mantiene el acordeón dentro del menú hamburguesa.

**Criterio de aceptación:** abrir el desplegable a 1024, 1280, 1440 y 1920 px
y confirmar que las tres columnas se ven íntegras y que
`document.documentElement.scrollWidth` no supera `window.innerWidth`.

---

## PENDIENTE 4 — Contenido que no se aplicó

El desplegable actual muestra, bajo AUTOMATIZACIÓN:

```
WORKFLOWS CON N8N
CHATBOT DE WHATSAPP CON IA
CHATBOT DE WHATSAPP SIN IA
AGENTES CONVERSACIONALES
INTEGRACIÓN ENTRE SISTEMAS
REPORTES AUTOMÁTICOS
LECTURA AUTOMÁTICA DE DOCUMENTOS
```

Esa es la versión anterior. La estructura corregida está en
`dexel-navegacion-y-paginas.md` y no llegó a aplicarse. Los tres cambios
pendientes de ese documento son:

### 4.1 — Añadir SEO a Desarrollo web

Nuevo frente en el desplegable y en la página, entre "Paneles de
administración" e "Integraciones y APIs":

**SEO y visibilidad** — que su sitio aparezca cuando alguien busca lo que
usted vende. Estructura técnica, contenido y medición.

En la página, desarrollarlo como SEO técnico —renderizado del lado servidor,
metadatos, datos estructurados, velocidad, arquitectura de URLs, medición
configurada— y no como servicio de marketing. No prometer posiciones ni
plazos de posicionamiento.

Argumento propio disponible: el sitio de Dexel tenía exactamente ese problema
(entregaba HTML vacío a los rastreadores) y se resolvió. Es un caso verificable
que no compromete a ningún cliente.

### 4.2 — Reorganizar Automatización por capacidad, no por canal

La lista actual mezcla canal (WhatsApp) con capacidad (con IA, sin IA,
agente). Sustituir por estos seis frentes:

```
ATENCIÓN AUTOMATIZADA POR WHATSAPP
AGENTES A LA MEDIDA
WORKFLOWS CON N8N
INTEGRACIÓN ENTRE SISTEMAS
REPORTES AUTOMÁTICOS
LECTURA AUTOMÁTICA DE DOCUMENTOS
```

En la página de automatización, incluir esta comparación en tres columnas,
precedida de la frase **"Un chatbot responde. Un agente hace cosas."**

| | Respuestas con reglas | Respuestas con IA | Agente |
|---|---|---|---|
| Qué hace | Responde según un árbol de opciones definido | Entiende lenguaje natural y responde | Entiende, decide y ejecuta acciones en sus sistemas |
| Ejemplo | "Marque 1 para horarios" | "¿A qué hora abren los sábados?" | "Necesito 20 unidades del código A-12" → consulta stock, crea el pedido, descuenta inventario, avisa a bodega |
| Cuándo conviene | Procesos con reglas fijas y pocas variantes | Preguntas abiertas sobre información que ya existe | Cuando el proceso termina en una acción, no en una respuesta |
| Costo relativo | Bajo | Medio | Alto |

El criterio de "con IA o sin IA" se explica como decisión de diseño, no como
dos productos separados. El visitante describe su proceso; Dexel elige la
tecnología.

### 4.3 — Bloque ampliado de Agentes a la medida

Dentro de la página de automatización, con su propio espacio destacado.

**Qué lo hace "a la medida":** un agente solo puede hacer aquello para lo que
existe una herramienta. Un agente genérico usa herramientas que ya existen
—leer un calendario, buscar en documentos, enviar un correo—. Un agente a la
medida usa herramientas que hay que construir porque solo existen dentro de la
operación de ese cliente.

Cuatro ejemplos a incluir:

- **Agente de cotización** — recibe la solicitud, consulta la lista de precios,
  aplica las reglas de descuento del cliente, arma la cotización y la registra.
- **Agente de pedidos** — recibe el pedido, valida disponibilidad, crea la
  orden, descuenta inventario y notifica a despacho.
- **Agente de conciliación** — cruza extractos bancarios contra facturas y
  marca las diferencias.
- **Agente de soporte interno** — el equipo pregunta por procedimientos y
  responde desde la documentación de la propia empresa.

**Argumento diferenciador, debe quedar escrito:** cuando el sistema de un
cliente no expone lo que el agente necesita, una agencia de automatización se
queda sin oferta. Dexel construye la herramienta que falta.

**Advertencia que debe aparecer, no esconderse:** un agente que ejecuta
acciones sobre sistemas reales puede equivocarse haciendo, no solo diciendo.
Por eso se construyen con límites definidos, confirmación humana en las
acciones críticas y registro de todo lo que ejecuta.

No prometer autonomía total ni porcentajes de precisión.

---

## Verificación antes de dar por cerrado

```js
// Sobre https://www.dexel-inc.com/es, con el desplegable abierto
({
  sinScrollHorizontal: document.documentElement.scrollWidth <= window.innerWidth,
  taxonomiaNueva: /AGENTES A LA MEDIDA/i.test(document.body.innerText),
  seoPresente: /SEO Y VISIBILIDAD/i.test(document.body.innerText),
  sinTaxonomiaVieja: !/CHATBOT DE WHATSAPP SIN IA/i.test(document.body.innerText)
})
```

Y una comprobación visual que no se puede automatizar: abrir el hero y
confirmar que el titular se lee limpio, sin que el fondo lo cruce. Adjuntar
captura si es posible.

---

## Restricciones

- Las tres correcciones urgentes son **restauraciones**, no rediseños.
  Recupere los valores del historial de git antes de proponer valores nuevos.
- No tocar la sección "Primero auditamos. Después construimos.", el proceso de
  6 fases, los tres compromisos por escrito ni la sección de equipo.
- No introducir precios ni plazos que no estén ya publicados.

## Entregable

1. Resumen de archivos modificados, indicando qué se restauró desde git y qué
   se escribió nuevo.
2. Resultado de la verificación anterior.
3. Confirmación visual del hero y del desplegable a 1024, 1280 y 1920 px.
