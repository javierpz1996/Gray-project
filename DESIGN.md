# DESIGN.md — Sistema de diseño (legado)

> **No es la fuente de verdad actual.** El design system **Gray** documentado en
> [`/desing-system`](./src/app/desing-system/page.tsx) (ADR 0004) es **obligatorio**
> para todo el sitio: tokens, reglas y componentes. El trabajo nuevo debe seguir Gray;
> este fichero describe el sistema editorial monocromo histórico hasta completar
> la migración de `globals.css` y los componentes del portafolio.
>
> Regla operativa vigente: **si un valor no está en `/desing-system`, no existe**
> hasta que se documente ahí.

---

## 1. Principio rector

Registro **editorial / catálogo de galería**. La página es papel impreso: neutra,
aireada, silenciosa. **El único color del sitio lo pone la obra.** La interfaz no
compite con la imagen: no hay color de marca, ni sombras, ni esquinas redondeadas,
ni degradados.

---

## 2. Color — monocromo estricto

Escala neutra cálida ("papel"). **Ningún matiz fuera de esta tabla.**

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-canvas` | `#FBFAF8` | Fondo de página |
| `--color-surface` | `#FFFFFF` | Fondo elevado (modales, tarjetas sobre canvas) |
| `--color-fg` | `#111110` | Texto principal, titulares |
| `--color-fg-muted` | `#6B6A66` | Texto secundario, metadata, pies |
| `--color-fg-subtle` | `#9C9A94` | Eyebrows, texto deshabilitado |
| `--color-border` | `#E7E4DE` | Hairlines, separadores, retícula |
| `--color-border-strong` | `#C9C5BC` | Bordes en foco/hover |
| `--color-hover` | `#F2F0EB` | Fondo de hover en superficies interactivas |
| `--color-ink` | `#111110` | Botón sólido / inversión (texto sobre `ink` = `canvas`) |

- **Contraste mínimo AA (4.5:1)** para `fg` y `fg-muted` sobre `canvas`.
- **No existe color de acento.** Si un CTA se pierde, se resuelve con peso tipográfico
  o con inversión (`bg-ink` / `text-canvas`), no con un color nuevo.

---

## 3. Tipografía

| Rol | Fuente | Pesos | CSS variable |
| --- | --- | --- | --- |
| Display / titulares | **Instrument Serif** | 400 (incluida cursiva) | `--font-serif` |
| Cuerpo / UI | **Inter** | variable 100–900 | `--font-sans` |

Cargadas con `next/font/google`. Ninguna otra familia está permitida.

### Escala fluida (sin breakpoints: `clamp()`)

| Token | `clamp()` | Uso |
| --- | --- | --- |
| `--text-display` | `clamp(2.75rem, 8vw, 6rem)` | Héroes, nombre del artista |
| `--text-h1` | `clamp(2.25rem, 5vw, 3.5rem)` | Título de página |
| `--text-h2` | `clamp(1.75rem, 3.2vw, 2.5rem)` | Título de sección |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.5rem)` | Subtítulo, título de ficha |
| `--text-lead` | `clamp(1.0625rem, 1.4vw, 1.25rem)` | Párrafo de entrada |
| `--text-body` | `1rem` | Cuerpo (16px base) |
| `--text-small` | `0.875rem` | Metadata de pieza |
| `--text-micro` | `0.8125rem` | Eyebrow, etiquetas |

Reglas:
- **Titulares: `font-serif` + `tracking-[-0.01em]` + `leading-[1.05]`.**
- **Cuerpo: `font-sans` + `leading-[1.6]` + medida máxima `65ch`.**
- **Eyebrow:** `font-sans`, `--text-micro`, `uppercase`, `tracking-[0.14em]`, `fg-subtle`.
- Interlineado de titular **nunca** mayor a `1.15`.

---

## 4. Espaciado — escala base 4px

Sólo estos valores, vía utilities de Tailwind (`p-1`…`p-32`):

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

**Ritmo vertical de sección:** `96px` en desktop, `64px` en mobile
(`py-24` / `py-16`).

**Página:**
- Contenedor: token `--container-site` → **72rem**, utility `max-w-site`, centrado, `px-6`.
- `--container-prose` → **65ch**, `max-w-prose`. Medida de lectura (§3).
- `--container-caption` → **36rem**, `max-w-caption`. Bloque de texto sobre imagen (hero).
- `--container-viewer` → **56rem**, `max-w-viewer`. Visor de documentos en modal.
- Retícula: **12 columnas**, gap `24px`.
- Gutter de viewport: `24px` (mobile `16px`).

---

## 5. Geometría

| Propiedad | Valor |
| --- | --- |
| Radio | **`0`** en todo (botones, imágenes, tarjetas, modales) |
| Bordes | **`1px`** hairline con `--color-border` |
| Sombras | **Ninguna.** Prohibido `shadow-*`. |
| Bordes de foco | `2px` sólido `--color-fg` con `offset: 2px` |

---

## 6. Componentes

### Botón
- Alto `40px`, `px-6`, `text-small`, `font-medium`, **radio 0**.
- **Sólido:** `bg-ink` / `text-canvas`; hover → `bg-fg-muted`.
- **Tinta (outline):** `border border-fg` / `text-fg`; hover → `bg-ink text-canvas`.
- **Fantasma:** `text-fg` sin borde; hover → subrayado.
- Transición `150ms ease-out`.

### Tarjeta de pieza (`PiezaCard`)
- Imagen `aspect-[4/5]`, `object-cover`, **sin radio, sin sombra, sin borde**.
- Debajo: `titulo` (`--text-h3`, serif) + `año · técnica` (`--text-small`, `fg-muted`).
- Hover: la imagen baja a `opacity-0.85` en `200ms`; el título no se mueve.

### Cabecera (`Header`)
- `sticky top-0`, fondo `canvas` con `border-b border-border`, alto `64px`.
- Wordmark a la izquierda (serif, `--text-h3`), anclas a la derecha (`text-small`).
- Activa → `text-fg` + subrayado `1px`; resto `fg-muted`.

### Pie (`Footer`)
- `border-t border-border`, `py-12`, `text-small` `fg-muted`.
- Sin año dinámico: el año se fija en `src/config/site.ts`.

### Botón de documento (`DocumentoCard`)
- Portada `aspect-[3/4]` con borde hairline, título debajo.
- Acciones: **"Ver"** (abre visor modal) y **"Descargar"** (`download`).

---

## 7. Motion

| Caso | Valor |
| --- | --- |
| Hover / foco / estados | `150ms ease-out` |
| Revelado de sección | `opacity 0→1` + `translateY 8px→0`, `600ms ease-out`, una sola vez |
| Entrada de imagen | `200ms ease-out` sobre `opacity` |

- Herramienta: `transition` + `IntersectionObserver` (`src/components/reveal.tsx`).
- **Prohibido:** parallax, bounce, escalado, carruseles automáticos, movimiento continuo.
- **`prefers-reduced-motion: reduce` → sin transformaciones, opacidad instantánea.**

---

## 8. Prohibido

1. **Hex/rgb hardcodeados** fuera de `globals.css`. Todo pasa por `var(--…)` o por
   utilities del tema (`bg-canvas`, `text-fg-muted`, `border-border`…).
   *Única excepción admitida:* `site.themeColor` (`src/config/site.ts`) — la API
   `viewport.themeColor` de Next exige un literal y no admite `var()`. Debe
   mantenerse sincronizado con `--canvas` a mano.
2. Cualquier **color fuera de la escala** de la sección 2.
3. **`shadow-*`** en cualquier componente.
4. **`rounded-*`** distinto de `rounded-none`.
5. Tamaños de fuente fuera de la escala fluida (sin `text-[13px]`).
6. Spacing fuera de la escala de 4px (`gap-[7px]`, `mt-[13px]`…).
7. Una **segunda tipografía**.
8. Animaciones que no respeten `prefers-reduced-motion`.

---

## 9. Enforcement (obligatorio)

1. **Cero valores hardcodeados.** Aparece un hex en un componente → es un bug.
2. **QA por sección** al terminarla: revisar contra este documento con los skills
   `web-design-guidelines` e `impeccable`. No se da por buena una sección sin pasar ese filtro.
3. **Esta sección 8 es un checklist de rechazo.** Si un componente incumple cualquiera
   de los 8 puntos, se corrige antes de mergear, no después.

---

## 10. Tokens → implementación

Los valores anteriores se mapean 1:1 en `src/app/globals.css`:

- `@theme` de Tailwind v4 expone `--color-*` y `--text-*` → utilities `bg-canvas`,
  `text-fg-muted`, `border-border`, `text-display`, `text-h2`, etc.
- `--font-serif` / `--font-sans` → `font-serif`, `font-sans`.
- Los tokens de **spacing** y **radius** son los nativos de Tailwind
  (base 4px) — se respetan sin redefinir.
