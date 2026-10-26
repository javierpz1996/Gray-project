# AGENTS.md

Guía permanente del proyecto para agentes y humanos.
Complementa: [`DESIGN.md`](./DESIGN.md) (legado) · [`GLOSSARY.md`](./GLOSSARY.md) ·
[`/desing-system`](./src/app/desing-system/page.tsx) (referencia Gray) ·
[`docs/adr/`](./docs/adr/) (incl. **ADR 0004** — DS obligatorio)

---

## Qué es esto

Landing page de un artista: muestra su **obra** (colección de **piezas**), sus
**documentos** (PDFs descargables), su **bio** y sus vías de **contacto**.
Ver el vocabulario canónico en [`GLOSSARY.md`](./GLOSSARY.md) — usar esos
términos, no sinónimos.

- **Idioma:** solo español. Sin i18n.
- **Sin backend:** no hay base de datos, CMS, autenticación ni formularios
  (ADR 0002). El contacto es `mailto:` + enlaces a redes.
- **Despliegue:** Vercel.

## Stack

| Capa | Elección |
| --- | --- |
| Framework | Next.js 16.4 — App Router, `cacheComponents` |
| React | 19.3 |
| Estilos | Tailwind v4 (`@theme`, CSS-first, **no hay `tailwind.config.js`**) |
| Componentes | shadcn/ui 4.22 (Radix) |
| Lenguaje | TypeScript estricto + `noUncheckedIndexedAccess` |
| Paquetes | **pnpm** (no npm, no yarn, no bun) |
| Lint | ESLint (`eslint.config.mjs`); no hay Prettier |

## Comandos

```bash
pnpm dev      # servidor de desarrollo
pnpm build    # build de producción (Turbopack)
pnpm lint     # eslint
```

Añadir componentes de shadcn: `pnpm dlx shadcn@latest add <componente> -y`.
**Tras añadirlos, alinearlos al design system Gray** (ver "Reglas duras" y
`/desing-system`).

---

## Estructura

```
src/app/desing-system/     ← FUENTE DE VERDAD visual Gray (tokens, reglas, demos)
src/content/desing-system-*.ts
src/components/desing-system/ui/
DESIGN.md                  ← legado editorial; no añadir UI nueva solo con esto
GLOSSARY.md                ← vocabulario canónico del dominio
AGENTS.md                  ← este fichero
docs/adr/                  ← decisiones difíciles de revertir (0001–0004)
public/
  obra/                    ← imágenes de las piezas (versionadas)
  documentos/              ← PDFs y portadas
  og.png                   ← imagen para Open Graph
src/
  app/
    globals.css            ← tokens del sitio (deben converger con Gray / ADR 0004)
    gray-tokens.css        ← tokens canónicos compartidos
    layout.tsx             ← fuentes y metadata (sin chrome)
    (site)/                ← landing y rutas públicas (header + footer aquí)
      layout.tsx · page.tsx · portafolio/[slug]/ · documentos/ · not-found.tsx
    desing-system/         ← documentación viva del DS (obligatoria, sin chrome del sitio)
    not-found.tsx          ← 404 global con chrome
    sitemap.ts · robots.ts · icon.svg
  components/
    ui/                    ← shadcn (sobrescrito para ajustarse al design system)
    layout/                ← header, footer
    obra/                  ← hero, pieza-card, portafolio-grid
    documentos/            ← documento-card, documento-list
    section.tsx            ← patrón de sección + Grid12
    reveal.tsx             ← revelado de scroll
    bio.tsx · contacto.tsx
  config/site.ts           ← ÚNICO sitio editable: nombre, email, redes, año
  content/                 ← datos tipados: piezas.ts, documentos.ts
  lib/utils.ts
```

---

## Reglas duras (no negociables)

1. **El design system Gray manda (ADR 0004).** La referencia obligatoria es
   `/desing-system`: tokens en `desing-system.css`, reglas en
   `desing-system-guidelines.ts`, componentes en `components/desing-system/ui`.
   Todo el sitio debe usar ese sistema; no inventar variantes paralelas.
2. **Cero valores hardcodeados.** Aparece un hex en un componente → es un bug.
   Usar tokens documentados (`--ds-*` en DS; en el sitio principal, utilities
   alineadas tras migración). Excepción: `site.themeColor` (literal exigido por
   Next).
3. **shadcn/Radix son implementación, no diseño.** Sus variables son alias de
   los tokens Gray; el DS documentado gana siempre.
4. **QA por sección:** antes de cerrar UI, revisar contra `/desing-system` con
   `web-design-guidelines` e `impeccable`.
5. **Nuevos componentes de shadcn:** integrarlos vía el DS (estilos en
   `desing-system-ui.css` o equivalente en `globals.css` una vez unificado).
6. **Términos de dominio:** usar `GLOSSARY.md` (`Pieza`, `Obra`, `Portafolio`,
   `Documento`, `Bio`, `Contacto`). No inventar sinónimos.
7. **`DESIGN.md` monocromo:** legado; no usarlo para justificar UI nueva. El
   trabajo nuevo sigue Gray hasta migración explícita del sitio principal.

## Convenciones de código

- **Server Components por defecto.** `"use client"` solo donde haga falta
  (`Reveal`, `SiteHeader`, `DocumentoCard`). Los `page.tsx` son server:
  exportan `metadata` y no pueden ser client.
- **`params` y `searchParams` son `Promise`** en Next 16. Acceso solo con
  `await`. Usa el helper global `PageProps<'/ruta'>`.
- **Nada de `new Date()` / `Date.now()` / `Math.random()` en el shell** —
  `cacheComponents` falla en el prerender. El año del footer vive en
  `site.year`.
- **`generateStaticParams` debe devolver al menos un elemento.**
- **`next/image`**: `priority` está deprecado → usar `loading="eager"` +
  `fetchPriority="high"`. Siempre `alt` y `sizes` con `fill`.
- **Fuentes:** solo `Instrument_Serif` (`weight: "400"`, no es variable) e `Inter`,
  cargadas en `layout.tsx` vía `next/font/google`. Cualquier cambio de tipografía
  empieza en `DESIGN.md §3`.
- **Animaciones:** transiciones cortas (`150ms` hover, `200ms` imagen,
  `600ms` revelado), siempre `ease-out`, siempre bajo `prefers-reduced-motion`.

## Comportamiento conocido

- **`/portafolio/<slug inexistente>`**: la primera petición en frío devuelve
  **200** (se sirve el *shell* estático del Partial Prerender) y el `notFound()`
  llega streaming; las peticiones siguientes devuelven **404**. Es el
  comportamiento de App-Shell ISR de `cacheComponents` en Next 16, no un bug.
  No se "arregla" con `dynamicParams`, que está eliminado en esta versión.

## Contenido

Para publicar el sitio de verdad se sustituyen los datos de ejemplo:

- `src/config/site.ts` — nombre del artista, email, redes, URL, año.
- `src/content/piezas.ts` — la obra real.
- `src/content/documentos.ts` — los PDFs reales (van en `public/documentos/`).
- `public/obra/` y `public/og.png` — imágenes reales.
- `src/components/bio.tsx` — el texto biográfico.

---

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
