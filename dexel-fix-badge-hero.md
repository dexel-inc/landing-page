# TAREA: El badge del hero queda tapado por el navbar

## El problema

En pantallas de poca altura —portátiles, especialmente MacBook— el badge
"AUTOMATIZACIÓN · INTEGRACIÓN · SOFTWARE A LA MEDIDA" queda parcialmente
oculto detrás del encabezado fijo. Se ve cortado por la mitad.

## Medición en producción

Reproducido con viewport de 771 px de alto:

| | Valor |
|---|---|
| Altura del viewport | 771 px |
| Altura del encabezado (`position: fixed`) | **107 px** |
| Borde inferior del encabezado | 107 px |
| Borde superior del badge | **72 px** |
| **Solapamiento** | **35 px** |

El hero está configurado así:

```
display: flex
justify-content: center
min-height: 771px   (equivalente a 100vh)
padding-top: 16px
```

## La causa

El hero usa `min-height: 100vh` con el contenido centrado verticalmente, pero
solo tiene 16 px de relleno superior. El encabezado es `fixed`, así que no
ocupa espacio en el flujo: no empuja nada hacia abajo.

Al centrar el contenido dentro de los 771 px completos, el bloque queda
posicionado sin tener en cuenta los 107 px que el encabezado ocupa
visualmente encima. En pantallas altas sobra espacio y no se nota. En
pantallas bajas, el primer elemento del hero —el badge— se mete debajo del
encabezado.

**No es un problema del badge.** Es que el hero no reserva el espacio del
encabezado fijo.

## La corrección

El hero debe reservar la altura del encabezado antes de centrar su contenido.
Dos formas válidas, en orden de preferencia:

**Opción A (recomendada).** Definir la altura del encabezado como variable CSS
y usarla en el hero:

```css
:root { --header-h: 107px; }        /* ajustar por breakpoint si cambia */

.hero {
  min-height: 100vh;
  padding-top: calc(var(--header-h) + 1.5rem);
  padding-bottom: 1.5rem;
  box-sizing: border-box;
}
```

Así el contenido se centra dentro del espacio realmente disponible, no dentro
del viewport completo.

**Opción B.** Reducir la altura mínima del hero para descontar el encabezado:

```css
.hero { min-height: calc(100vh - var(--header-h)); margin-top: var(--header-h); }
```

Cualquiera de las dos sirve. Elija la que encaje mejor con la estructura
actual, pero **la altura del encabezado debe quedar en una sola variable**, no
repetida como número mágico en varios sitios.

## Requisitos adicionales

- Verificar la altura real del encabezado en cada breakpoint. Si en móvil mide
  distinto, la variable debe cambiar con él.
- Usar `100svh` en lugar de `100vh` donde el navegador lo soporte. En móvil,
  `100vh` no tiene en cuenta la barra de direcciones y provoca exactamente
  este mismo tipo de recorte.
- Revisar si el mismo patrón se repite en los heros de las demás páginas
  (`/es/servicios`, `/es/servicios/*`, `/es/formacion`, `/es/contacto`). Si
  comparten el mismo componente, el arreglo debe aplicarse una sola vez; si
  no, corregir cada uno.

## Criterio de aceptación

Con el navegador maximizado y también reducido, el badge del hero debe quedar
completamente visible por debajo del encabezado, con al menos 16 px de
separación, a estas alturas de viewport:

- 600 px (caso extremo)
- 700 px
- **771 px** (el caso reportado)
- 900 px
- 1080 px

Y en móvil a 390×844, confirmar que el hero no queda cortado ni por arriba ni
por abajo, con y sin la barra de direcciones visible.

Comprobación rápida en consola, con la página en el tope:

```js
const h = document.querySelector('header').getBoundingClientRect();
const badge = Array.from(document.querySelectorAll('*'))
  .find(e => e.children.length === 0 && /AUTOMATIZACI[OÓ]N\s*·/i.test(e.textContent))
  .getBoundingClientRect();
({ separacion: Math.round(badge.top - h.bottom) })   // debe ser >= 16
```

## Restricciones

- No cambiar el tamaño ni el diseño del badge. El problema es de espaciado del
  hero, no del componente.
- No reducir la altura del encabezado.
- Mantener el sistema de diseño actual.

## Entregable

1. Archivos modificados y dónde quedó definida la variable de altura.
2. Resultado de la comprobación en las cinco alturas de viewport.
3. Confirmación de si el problema existía también en las otras páginas.
