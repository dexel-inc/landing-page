# Cómo contribuir

Este repositorio sigue **Git Flow** y **Conventional Commits**.

## Ramas

| Rama | Para qué | Quién la crea | Se fusiona en |
|---|---|---|---|
| `main` | Lo que está en producción | Nadie trabaja aquí | — |
| `develop` | Integración del trabajo terminado | Nadie trabaja aquí | — |
| `feature/<id>-<descripcion>` | Una tarea del Tablero | Desarrolladores, desde `develop` | `develop`, por PR |
| `fix/<id>-<descripcion>` | Un error encontrado en `develop` | Desarrolladores, desde `develop` | `develop`, por PR |
| `chore/<descripcion>` | Mantenimiento sin cambio funcional | Desarrolladores, desde `develop` | `develop`, por PR |
| `release/<version>` | Preparar una versión para producción | **Solo con aprobación de Dogo** | `main` y `develop` |
| `hotfix/<version>` | Arreglo urgente en producción | **Solo con aprobación de Dogo** | `main` y `develop` |

`<id>` es el identificador de la tarea en el Tablero. `<descripcion>` va en minúsculas y con guiones: `feature/42-asistencia-guia`.

## Flujo de una tarea

1. Crea la rama desde `develop` actualizado.
2. Haz commits pequeños con Conventional Commits (ver abajo).
3. Sube la rama y abre un PR hacia `develop` con la plantilla del repositorio.
4. El Líder de desarrollo revisa el PR contra los criterios de aceptación. Si pide cambios, se corrigen en la misma rama.
5. Solo el Líder fusiona hacia `develop`. Nadie fusiona hacia `main`: eso pasa por un `release/*` o un `hotfix/*` que aprueba Dogo.

No se hace push directo a `main`, `develop`, `release/*` ni `hotfix/*`, y nunca se usa `--force`.

## Conventional Commits

Formato: `tipo(alcance opcional): descripción en imperativo`

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

Ejemplos:

```
feat(asistencia): marca de llegada por viajero
fix(api): devuelve 403 cuando el guía no es dueño de la salida
test(asistencia): cubre el historial de correcciones
```

Un cambio que rompe compatibilidad lleva `!` (`feat(api)!: …`) o un pie `BREAKING CHANGE: …`.

El hook `commit-msg` rechaza los mensajes que no siguen este formato.

## Antes de abrir el PR

- Las pruebas pasan en local.
- No hay secretos, tokens ni datos personales reales en el código ni en los commits. Para pruebas se usan datos ficticios.
- El PR solo trae cambios de su tarea.
