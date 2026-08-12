# TAREA: Conversions API y verificación de dominio — dexel-inc.com

## Contexto

El pixel de navegador ya está instalado y funcionando (`window.fbq` disponible,
`fbevents.js` cargando, consentimiento implementado con
`fbq('consent','revoke')` antes del `init`).

Falta la mitad del lado servidor: la Conversions API. Sin ella se pierde
entre el 20% y el 40% de los eventos por bloqueadores de anuncios y
restricciones de iOS.

También falta la meta tag de verificación de dominio de Meta.

Explore la implementación actual del pixel antes de empezar y muestre su plan.

---

## Credenciales

Ya están en `.env` (confirmado en `.gitignore`):

```
META_PIXEL_ID=1065161589428764
META_DOMAIN_VERIFICATION=x7k57sl0qhqkbc1lyax1hvyisikx8i
META_CAPI_ACCESS_TOKEN=...
META_TEST_EVENT_CODE=...
```

Reglas de manejo:

- `META_PIXEL_ID` y `META_DOMAIN_VERIFICATION` son públicos: pueden ir al
  bundle del cliente.
- `META_CAPI_ACCESS_TOKEN` y `META_TEST_EVENT_CODE` son **solo servidor**.
  Nunca deben aparecer en el bundle del cliente ni en el HTML.
- En Vercel hay que cargarlas con el alcance correspondiente.

---

## PARTE 1 — Meta tag de verificación de dominio

Insertar en el `<head>`:

```html
<meta name="facebook-domain-verification" content="x7k57sl0qhqkbc1lyax1hvyisikx8i" />
```

**CRÍTICO:** debe quedar en el `<head>` del HTML servido, no inyectada por
React, React Helmet ni ningún componente del cliente. Meta declara
explícitamente que no puede verificarla si la carga JavaScript de forma
dinámica.

Como el sitio ya tiene prerenderizado, debe ir en el `index.html` base o en la
plantilla de prerenderizado, de modo que aparezca en todas las rutas.

**Criterio de aceptación:**

```
curl -s https://www.dexel-inc.com/ | grep facebook-domain-verification
```

Debe devolver la línea. Repetir en `/es` y `/en`.

---

## PARTE 2 — Conversions API

### Endpoint del servidor

Crear una ruta de API (función serverless de Vercel) que reciba los eventos
del cliente y los reenvíe a Meta:

```
POST https://graph.facebook.com/v21.0/1065161589428764/events
```

El cliente **nunca** habla directo con Meta desde el servidor: llama a la ruta
interna, y esa ruta añade el token y reenvía. Así el token no sale del
servidor.

### Deduplicación

Este es el punto más importante de la implementación. Cada evento se envía dos
veces —una por navegador, una por servidor— y Meta debe reconocer que son el
mismo.

- Generar un `event_id` único por evento (UUID) **en el cliente**.
- Pasar ese mismo `event_id` al `fbq` del navegador y al payload de la CAPI.
- Enviar también el mismo `event_time` (timestamp Unix en segundos).

Si el `event_id` no coincide, las conversiones se cuentan doble y las métricas
quedan infladas.

### Parámetros de usuario

Enviar desde el servidor, hasheados con SHA-256 según especificación de Meta
(minúsculas y sin espacios antes de hashear):

- `client_ip_address` — de las cabeceras de la petición
- `client_user_agent` — de las cabeceras
- `fbp` — cookie `_fbp` si existe
- `fbc` — cookie `_fbc` si existe, o construido desde el parámetro `fbclid`
  de la URL
- `em` (email) y `ph` (teléfono) **solo si el visitante los proporcionó en un
  formulario**, hasheados. Nunca datos que no haya entregado voluntariamente.

`event_source_url` debe ser la URL real donde ocurrió el evento.
`action_source` debe ser `"website"`.

### Eventos

Todos los eventos existentes deben enviarse también por CAPI:

| Evento | Cuándo | Parámetros |
|---|---|---|
| `PageView` | Carga de página | `locale` |
| `ServiceCategoryViewed` | Carga de página de categoría | `category`, `locale` |
| `DiscoveryBooked` | Agendamiento de llamada sin costo | `locale` |
| `AuditRequested` | Solicitud de auditoría | `value`, `currency`, `locale` |
| `PackRequested` | Solicitud de pack de automatización | `pack_name`, `value`, `currency`, `locale` |
| `TrainingRequested` | Solicitud de formación | `format`, `value`, `currency`, `locale` |
| `QuoteRequested` | Solicitud de cotización | `service_name`, `locale` |

### Valores por moneda

El valor y la moneda dependen de la ruta. En `/es` van en COP; en `/en` en USD.

| Evento | Valor en `/es` (COP) | Valor en `/en` (USD) |
|---|---|---|
| `AuditRequested` | 1200000 | 450 |
| `PackRequested` — puntual | 2200000 | 850 |
| `PackRequested` — agente | 5900000 | 2200 |
| `PackRequested` — sistema | 12900000 | 4500 |
| `TrainingRequested` — medio día | 1800000 | 600 |
| `TrainingRequested` — día completo | 3500000 | 1200 |

El campo `currency` debe ser `"COP"` o `"USD"` según corresponda. Estos valores
deben leerse del mismo archivo de configuración de precios que ya existe, no
duplicarse aquí.

### Consentimiento

Ningún evento —ni de navegador ni de servidor— debe enviarse antes de que el
visitante acepte el banner de consentimiento. Si rechaza, no se envía nada por
ninguna de las dos vías.

La lógica de consentimiento ya existe en el cliente; hay que extenderla para
que también controle las llamadas a la ruta de CAPI.

### Test Event Code

`META_TEST_EVENT_CODE` debe incluirse en el payload **únicamente en desarrollo**.

En producción no debe enviarse nunca: si va incluido, Meta marca las
conversiones reales como prueba y no cuentan para la optimización de campañas.

Condicionarlo por entorno, no por variable presente.

---

## PARTE 3 — Manejo de errores

- Si la llamada a Meta falla, no romper la experiencia del usuario. El envío
  es asíncrono y no bloquea el formulario ni la navegación.
- Registrar los fallos en el log del servidor con el código de respuesta de
  Meta, para poder diagnosticar.
- Un fallo de CAPI no debe impedir que el evento de navegador se dispare.
- No reintentar indefinidamente: un reintento como máximo.

---

## Verificación antes de dar por cerrado

**1. Meta tag de verificación:**

```
curl -s https://www.dexel-inc.com/ | grep facebook-domain-verification
```

**2. El token no está en el cliente:**

```
curl -s https://www.dexel-inc.com/ | grep -i "EAA"
curl -s https://www.dexel-inc.com/assets/*.js | grep -i "EAA"
```

Ambos deben devolver vacío. Si el token aparece en el bundle, está expuesto y
hay que corregirlo antes de desplegar.

**3. Deduplicación en Events Manager:**

Con el Test Event Code activo en desarrollo, disparar un `AuditRequested` y
confirmar en la pestaña *Probar eventos* que:

- El evento llega **dos veces**: una marcada como navegador, otra como servidor
- Meta lo reporta como **deduplicado**, no como dos eventos distintos

Si aparecen dos eventos sin deduplicar, el `event_id` no se está compartiendo
correctamente y hay que corregirlo.

**4. Consentimiento:**

Rechazar el banner y confirmar que no sale ninguna petición ni a
`facebook.net` ni a la ruta interna de CAPI.

---

## Restricciones

- No tocar la implementación actual del pixel de navegador salvo para añadir
  el `event_id` compartido.
- No duplicar la tabla de precios: leerla de la configuración existente.
- No enviar datos personales que el visitante no haya proporcionado
  voluntariamente.
- Mantener el sistema de diseño y el comportamiento actual del sitio.

## Entregable

1. Resumen de archivos creados y modificados.
2. Resultado de las cuatro verificaciones anteriores.
3. Confirmación de que el token no aparece en ningún bundle del cliente.
4. Lista de variables que hay que cargar en Vercel y con qué alcance.
