# DESIGN.md — meech213.com/photo

Referencia: [https://www.meech213.com/photo](https://www.meech213.com/photo)

Captura: Firecrawl (`pnpm exec firecrawl scrape … -o .firecrawl/design-reference.json`, scrapeId `01a1a997-4ed5-70ba-b6da-403fe0d8d69f`) + screenshot local `.firecrawl/design-reference.png` y `docs/design-references/meech213-photo-firecrawl.png`.

Inspección complementaria: agent-browser (cursor-ide-browser) a 1440×900 — DOM, logo SVG, enlaces sociales, menú reloj.

## Tokens observados

| Rol | Valor | Evidencia |
| --- | --- | --- |
| Fondo página | `#F5F4F1` / `rgb(245, 244, 241)` | Firecrawl `branding.colors.background`, `getComputedStyle(body)` |
| Texto principal | `#22201F` | Firecrawl `branding.colors.textPrimary` |
| Cuerpo UI | Articulat CF, sans-serif | Firecrawl fonts + computed `font-family` en referencia |
| Títulos menú / footer | Serif display grande, uppercase, tracking negativo | Screenshot + `.clock-menu` CSS en referencia |
| Radio | `0` (bordes rectos en tarjetas) | Firecrawl `spacing.borderRadius` |

En Gray usamos `--font-display` (Instrument Serif) y `--font-sans` (Inter) como aproximación tipográfica hasta cargar Articulat CF con licencia.

## Layout (topología)

1. **Viewport fijo** `100dvh`, fondo crema, `overflow: clip`.
2. **Capa WebGL** a pantalla completa: tira horizontal de retratos inclinados alternando yaw; scroll con rueda / arrastre; click en tarjeta → detalle.
3. **Etiquetas fantasma** (`PHOTO`, `ABOUT`, `BOOK`, `HOME`) en la parte inferior, opacidad muy baja, detrás del menú.
4. **Header absoluto** (grid 3 columnas): `Back` | logo MEECH213 SVG | Email, Twitter, Facebook, Instagram (columna derecha).
5. **Footer absoluto** (grid 3 columnas): © año | **clock menu** (arco + manecillas) | “Site by TBP”.

## Clock menu (Photo activo)

- Ítems principales en arco: About, Video, **Photo** (activo), Home, Book (+ slots atenuados abajo).
- Subnav horizontal en Photo: ALL, Beauty, Brands, Artiste, Fashion, Magazines — filtra la tira WebGL.
- Manecillas decorativas (`hour` ~ −38°, `minute` ~ −20°) ancladas al 84% vertical del dial.

## Contenido galería

- **98 proyectos** enlazados en el markdown de Firecrawl (slugs `elle`, `sophia`, …).
- Implementación Gray: **bloques de color** + etiqueta serif inclinada en canvas (sin CDN de imágenes de terceros).

## Implementación en este repo

| Ruta | Uso |
| --- | --- |
| `/meech213-photo` | Clon standalone sin chrome Gray; 98 ítems de referencia; chrome fiel (Back, logo, redes, TBP). |
| Sección `#portafolio` en home | Variante adaptada al sitio (nombre, WhatsApp, crédito “Gray”). |
| `/demo-editorial-gallery` | Demo con modo standalone (sigue bajo layout del sitio). |

Código: `src/components/home/editorial-gallery/*`, motor `meech-photo-engine.ts`, datos `meech213-reference-items.ts`.

## Comportamiento (agent-browser)

- **Scroll horizontal** en canvas (rueda vertical traducida a desplazamiento; drag con cursor grab).
- **Lenis** en la referencia (`html.lenis`); no replicado en el clon (scroll nativo en canvas).
- **Reduced motion**: transiciones del canvas y menú desactivadas vía CSS.

## Pendiente / aproximaciones

- Tipografía Articulat CF (referencia) vs Instrument Serif + Inter (Gray).
- Imágenes reales (usuario pidió colores por ahora).
- Animaciones de entrada exactas del bundle TBP (WebGL + GSAP en producción).
- WhatsApp no aparece en la referencia; omitido en modo standalone.

## Derechos

Logos, fotos y copy pertenecen a Meech213 / TBP. Uso solo como referencia de diseño en desarrollo local.
