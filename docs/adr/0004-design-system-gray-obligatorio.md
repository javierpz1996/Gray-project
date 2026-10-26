# ADR 0004 — Design system Gray obligatorio en todo el sitio

## Estado

Aceptado — 2025-10-25

## Contexto

El proyecto tiene documentación visual en dos capas: `DESIGN.md` + `globals.css`
(editorial monocromo histórico) y la referencia **Gray** en `/desing-system`
(tokens en `src/app/desing-system/desing-system.css`, reglas en
`src/content/desing-system-guidelines.ts`, componentes en
`src/components/desing-system/ui`).

Se define que la referencia Gray es la **única fuente de verdad** para diseño y
UI en todo el sitio público y en herramientas internas del repo.

## Decisión

1. **Obligatorio:** cualquier pantalla, componente o estilo nuevo debe usar los
   tokens, reglas y patrones documentados en `/desing-system`.
2. **Sin excepciones ad hoc:** no colores, radios, sombras, tipografías ni
   animaciones fuera de lo documentado; si falta un token, se añade primero al
   design system y luego se consume.
3. **Componentes:** preferir `Ds*` y utilidades alineadas al DS; shadcn/Radix
   solo como base, estilizada con los tokens Gray.
4. **Migración:** el sitio principal puede ir convergiendo de `DESIGN.md`
   monocromo hacia Gray; el trabajo nuevo no debe reforzar el sistema antiguo.

## Consecuencias

- Agentes y humanos consultan `/desing-system` y `desing-system-guidelines.ts`
  antes de tocar UI.
- `AGENTS.md` y `README.md` apuntan a Gray como fuente de verdad.
- `DESIGN.md` queda como legado hasta alinearse o sustituirse explícitamente.
- PRs que introduzcan estilos fuera del DS se rechazan en revisión.

## Referencias

- `src/app/desing-system/`
- `src/content/desing-system-guidelines.ts`
- `src/content/desing-system-tokens.ts`
