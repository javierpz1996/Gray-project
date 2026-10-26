# Landing de artista

Sitio de un artista: obra, documentos en PDF, bio y contacto.
Una sola página con secciones ancladas, más ficha por pieza y ruta propia de
documentos.

## Stack

Next.js 16 · React 19 · Tailwind v4 · shadcn/ui · TypeScript · pnpm · Vercel

## Arrancar

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
```

## Documentación del proyecto

| Ficha | Qué contiene |
| --- | --- |
| [`AGENTS.md`](./AGENTS.md) | Contexto del proyecto, comandos, estructura y reglas duras |
| [`/desing-system`](http://localhost:3000/desing-system) | **Fuente de verdad** del design system Gray (obligatorio en todo el sitio; ver ADR 0004) |
| [`DESIGN.md`](./DESIGN.md) | Documento editorial legado; en migración hacia Gray |
| [`GLOSSARY.md`](./GLOSSARY.md) | Vocabulario canónico del dominio (Pieza, Obra, Portafolio, Documento…) |
| [`docs/adr/`](./docs/adr/) | Decisiones arquitectónicas 0001–0004 |

## Personalizar

Todo lo editable vive en un solo sitio: **`src/config/site.ts`** (nombre,
email, redes, URL, año). La obra y los documentos se sustituyen en
`src/content/` y `public/`.

Los archivos incluidos ahora son **datos de ejemplo**: imágenes SVG
placeholder y PDFs de relleno. Hay que sustituirlos por la obra real.

## Estructura de rutas

- `/` — landing: hero con la pieza destacada, portafolio, documentos, bio, contacto
- `/portafolio/[slug]` — ficha de una pieza
- `/documentos` — listado de documentos (vista previa + descarga)
