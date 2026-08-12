# TAREA: UX, precios por moneda y packs de automatización — dexel-inc.com

## Contexto

El sitio está estructuralmente bien: bilingüe, con prerenderizado, pixel,
consentimiento, menú por categorías y páginas dedicadas. Esta tarea cubre tres
frentes distintos y conviene ejecutarlos en este orden:

1. **Correcciones de UX** — hay contenido que no se ve. Es lo más urgente.
2. **Precios por moneda** — COP en español, USD en inglés, IVA incluido.
3. **Packs de automatización y reubicación de los CTA** — cambio comercial.

Explore la estructura actual y muestre su plan antes de ejecutar.

---

# PARTE 1 — Correcciones de UX

## 1.1 · El contenido no debe depender de la animación (CRÍTICO)

**Verificado en producción:** hay 131 elementos con animación de revelado por
scroll. Al hacer scroll a velocidad normal, secciones enteras aparecen vacías
porque el contenido arranca en `opacity-0` y espera a que se dispare el
observador.

El caso más grave está en la home: el bloque "Qué pasa después de la
auditoría" muestra su título y su subtítulo, y debajo quedan unos 300 px
vacíos donde deberían estar los cuatro pasos. Ese bloque es justamente el que
justifica pagar la auditoría.

**Acciones:**

- El contenido debe estar **visible por defecto**. La animación desplaza o
  atenúa levemente, pero nunca es la condición para que exista.
- Reducir drásticamente la cantidad de elementos animados. De 131 a un máximo
  de 20, y solo en encabezados de sección o elementos destacados. Nunca en
  párrafos, ítems de lista ni tarjetas dentro de una grilla.
- Bajar la duración de las transiciones. Las de 700 ms son demasiado lentas
  para contenido que el visitante ya está mirando; 200-300 ms es suficiente.
- Respetar `prefers-reduced-motion`: sin animación alguna cuando esté activo.

**Criterio de aceptación:** desactivar JavaScript y confirmar que todo el
contenido se lee. Y hacer scroll rápido de arriba a abajo sin que aparezca
ninguna zona vacía.

## 1.2 · El encabezado es completamente transparente

**Verificado:** `background-color: rgba(0, 0, 0, 0)` con únicamente
`backdrop-filter: blur(8px)`. El texto de la página se lee por debajo del menú
y produce un revoltijo visual al hacer scroll.

**Acción:** al hacer scroll más allá del hero, el encabezado adopta un fondo
semiopaco del color base del tema, con desenfoque reforzado. En el tope de la
página puede seguir transparente sobre el hero.

## 1.3 · El panel del desplegable deja traslucir el hero

Mismo problema. Se alcanza a leer el titular del hero por debajo del panel de
SERVICIOS. Aumentar la opacidad del fondo del panel hasta que el contenido de
la página deje de verse a través.

## 1.4 · Áreas táctiles pequeñas

Los ítems del menú principal miden 16 px de alto. El mínimo recomendado para
interacción táctil es 44 px. Hay 15 elementos por debajo del umbral.

**Acción:** aumentar el área táctil mediante relleno vertical, sin cambiar el
tamaño visual del texto.

## 1.5 · Repetición del CTA en la home

"$450 USD" aparece cinco veces en la home. Tras la Parte 3 este número cambia,
pero la regla se mantiene: **máximo tres apariciones del mismo CTA con precio
en una misma página.** Las demás llamadas usan texto sin precio.

---

# PARTE 2 — Precios por moneda

## 2.1 · Regla

- Rutas `/es/*` → precios en **pesos colombianos (COP)**
- Rutas `/en/*` → precios en **dólares (USD)**

No es una conversión automática por tasa de cambio: son **dos listas de
precios independientes**, definidas comercialmente. No implementar
conversión en tiempo real ni consultar ninguna API de divisas.

Los precios deben vivir en un único archivo de configuración, con las dos
monedas juntas por servicio, para que cambiar uno sea trivial.

## 2.2 · IVA incluido

**Todos los precios en COP incluyen IVA del 19%.**

Debe aparecer explícito junto a cada precio, en texto pequeño pero legible:
`IVA incluido`.

Y en la sección de precios de cada página, una línea de contexto:

> Todos nuestros precios en pesos incluyen IVA. Lo que ve es lo que factura.

Esto es un diferenciador frente a la competencia colombiana, que publica sus
precios "+ IVA". Debe leerse como una decisión deliberada, no como una nota
al pie.

Para los precios en USD de `/en`, no aplica IVA colombiano. No mencionarlo.

## 2.3 · Tabla de precios

| Servicio | COP (IVA incl.) | USD |
|---|---|---|
| Auditoría de procesos | $1.200.000 | $450 |
| Automatización — Pack puntual | $2.200.000 | $850 |
| Automatización — Agente a la medida | $5.900.000 | $2.200 |
| Automatización — Sistema completo | Desde $12.900.000 | Desde $4.500 |
| Software a la medida | $3.200.000 | $1.000 |
| Presencia web | $950.000 | $300 |
| Nivel Landing (solo dentro del detalle) | $350.000 | $100 |
| Mantenimiento | $450.000/mes | $150/mes |
| Formación medio día | $1.800.000 | $600 |
| Formación día completo | $3.500.000 | $1.200 |

Actualizar también el JSON-LD: `priceCurrency` debe ser `COP` en las páginas
en español y `USD` en las páginas en inglés, con el valor correspondiente.

Se mantiene la restricción sobre el nivel Landing: su precio aparece
únicamente dentro del detalle de Presencia web, nunca en la tarjeta principal,
en listados resumidos, en metadatos ni en JSON-LD.

---

# PARTE 3 — Packs de automatización y reubicación de CTA

## 3.1 · El problema

Hoy la página de automatización dice "Desde $1.500 USD" y no explica qué
recibe el cliente por ese dinero. La competencia publica packs con alcance
definido en unidades contables, y eso se compra sin escribir un correo.

Además, el CTA principal del hero de la home es "Solicitar auditoría de
procesos — $450 USD". Eso pone el producto de mayor fricción como primera
acción ofrecida a un desconocido. La mayoría de visitantes no llega buscando
un diagnóstico: llega sabiendo que pierde horas y queriendo saber cuánto
cuesta resolverlo.

## 3.2 · Los tres packs

Publicar en `/es/servicios/automatizacion` y `/en/services/automation`, como
tres tarjetas comparables lado a lado. Marcar la segunda como la más elegida.

**Automatización puntual — $2.200.000 COP / $850 USD**
- 1 proceso automatizado de principio a fin
- 1 a 2 integraciones con sistemas existentes
- Entrega en 2 a 3 semanas
- 30 días de soporte
- Capacitación en vivo para su equipo

**Agente a la medida — $5.900.000 COP / $2.200 USD**
- 1 agente que ejecuta acciones en sus sistemas
- 3 a 4 integraciones
- Construcción de las herramientas que su sistema no expone
- Entrega en 4 a 6 semanas
- 60 días de soporte
- Capacitación en vivo para su equipo

**Sistema completo — Desde $12.900.000 COP / Desde $4.500 USD**
- Varios agentes coordinados
- Desarrollo propio de los componentes que hagan falta
- Integraciones profundas con la operación
- Entrega en 6 a 10 semanas
- 90 días de soporte
- Capacitación en vivo para su equipo

Debajo de los tres, una línea:

> ¿No sabe cuál necesita? Agende una llamada de discovery sin costo y se lo
> decimos en 30 minutos.

## 3.3 · Reubicación de los CTA

**Hero de la home:**
- CTA principal pasa a ser: **"Agendar llamada de discovery sin costo"**
- CTA secundario: **"Ver casos reales"**
- Retirar del hero el CTA de auditoría con precio

**Sección "Primero auditamos. Después construimos.":**
- Aquí sí va el CTA de auditoría con precio, porque es donde se argumenta
  su valor. Mantener.

**Tarjeta de auditoría en la lista de servicios:**
- Mantener el CTA con precio.

**Razón del cambio:** la auditoría deja de ser la puerta de entrada
obligatoria y pasa a ser el producto para quien tiene varios procesos y no
sabe por dónde empezar. Quien ya sabe qué quiere compra un pack directamente;
quien no está seguro agenda una llamada.

## 3.4 · Eventos de medición

Añadir a los eventos existentes, con la misma implementación de pixel y
Conversions API, deduplicación por `event_id` y respetando el consentimiento:

| Evento | Cuándo dispara | Parámetros |
|---|---|---|
| `PackRequested` | Solicitud de cualquiera de los tres packs | `pack_name`, `value`, `currency`, `locale` |

`DiscoveryBooked` pasa a ser el evento de conversión principal de la home.
`AuditRequested` y `PackRequested` siguen siendo conversiones de mayor valor.

Los tres deben crearse como conversiones personalizadas en Meta Events Manager
para poder optimizar campañas hacia ellos.

---

# PARTE 4 — Español como idioma por defecto

## 4.1 · Regla de resolución de idioma

El enfoque comercial es LATAM, así que el español pasa a ser el idioma por
defecto. Pero **por defecto no significa forzado**: el inglés debe seguir
siendo plenamente accesible e indexable, porque es el mercado de mayor ticket.

Resolver el idioma en este orden estricto de prioridad:

1. **Elección explícita del visitante.** Si ya usó el selector ES/EN, esa
   preferencia manda sobre todo lo demás. Persistente entre visitas.
2. **Idioma del navegador.** Cualquier variante de español (`es`, `es-CO`,
   `es-MX`, `es-419`, etc.) resuelve a español. El resto resuelve a inglés.
3. **Sin señal clara** → español.

El punto 3 es el cambio principal: hoy el respaldo es inglés y debe invertirse.

## 4.2 · Excepción crítica: las URLs directas nunca se redirigen

Si un visitante abre `/en/services`, ve inglés. Sin importar su idioma de
navegador y sin importar su elección previa guardada.

Esto no es negociable: los buscadores y los enlaces compartidos dependen de
que una URL devuelva siempre el mismo contenido. Si `/en/*` redirige a
español según el navegador, la versión en inglés deja de indexarse y se pierde
el canal orgánico en el mercado que mejor paga.

La resolución automática de idioma aplica **únicamente** a la raíz del
dominio y a rutas sin prefijo de idioma.

## 4.3 · La raíz del dominio

`dexel-inc.com` sin ruta redirige a `/es`, **con código 302, no 301**.

El 302 indica que la redirección es circunstancial y que ambas versiones
siguen siendo válidas. Un 301 puede llevar a que el buscador consolide todo
en la versión en español y desindexe la versión en inglés.

## 4.4 · Metadatos

- `x-default` en `hreflang` debe apuntar a la versión en español. Es la señal
  formal de cuál es la versión para quien no encaja en ningún idioma
  declarado.
- Mantener las declaraciones `hreflang` recíprocas entre `/es` y `/en` como
  están hoy.
- El atributo `lang` del documento debe corresponder siempre a la ruta, no al
  navegador.

## 4.5 · El selector de idioma en móvil

Verificar que el selector ES/EN sea alcanzable en móvil **sin abrir el menú
hamburguesa**. Un visitante que aterrizó en el idioma equivocado tiene unos
segundos de paciencia antes de irse.

---

## Verificación antes de dar por cerrado

```js
// Sobre /es
({
  sinZonasVacias: 'comprobar manualmente con scroll rápido',
  headerOpaco: getComputedStyle(document.querySelector('header')).backgroundColor !== 'rgba(0, 0, 0, 0)',
  precioCOP: /\$1\.200\.000/.test(document.body.innerText),
  ivaVisible: /IVA incluido/i.test(document.body.innerText),
  ctaHero: /Agendar llamada de discovery sin costo/i.test(document.body.innerText),
  animados: document.querySelectorAll('[class*="opacity-0"][class*="duration-"]').length
})
```

`animados` debe ser 20 o menos.

Y con JavaScript desactivado en el navegador, confirmar que todo el contenido
de la home y de las páginas de servicio se lee completo.

En `/en`, confirmar que los precios aparecen en USD y que no se menciona el
IVA en ninguna parte.

**Verificación de idioma:**

```
# La raíz redirige a español con 302, no 301
curl -sI https://www.dexel-inc.com/ | grep -i "HTTP/\|location"

# Una URL en inglés NUNCA redirige, ni con navegador en español
curl -sI -H "Accept-Language: es-CO" https://www.dexel-inc.com/en/services | grep -i "HTTP/\|location"

# x-default apunta a español
curl -s https://www.dexel-inc.com/es | grep -o 'hreflang="[^"]*" href="[^"]*"'
```

Y en el navegador: cambiar el idioma del sistema a inglés, abrir la raíz y
confirmar que resuelve a `/en`; volver a español y confirmar que resuelve a
`/es`; elegir manualmente el otro idioma y confirmar que la elección persiste
al recargar.

---

## Restricciones

- Mantener el sistema de diseño actual. No es un rediseño.
- No tocar la sección "Primero auditamos. Después construimos.", el proceso de
  6 fases, los cuatro compromisos por escrito ni la sección de equipo, salvo
  los cambios de CTA indicados en 3.3.
- No implementar conversión de divisas en tiempo real. Las dos listas de
  precios son independientes y se definen a mano.
- No introducir precios ni plazos que no estén en este documento.

## Entregable

1. Resumen de archivos modificados.
2. Resultado de la verificación, en ambos idiomas.
3. Confirmación de que el contenido se lee con JavaScript desactivado.
4. Cualquier problema encontrado que no esté en este documento.
