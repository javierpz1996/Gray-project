/**
 * Modo sticker (extensión opcional del DS).
 * Los tokens de apoyo reutilizan la paleta propia (--ds-coral, pintura, neutros).
 */

/** Colores del DS usados en modo sticker (mapeo en --ds-play-* en desing-system.css). */
export const dsPlayColors = [
  {
    name: "Coral primario",
    token: "--ds-coral",
    hex: "#FF5A4E",
    role: "CTA relleno (→ --ds-play-green)",
  },
  {
    name: "Crema",
    token: "--ds-cream",
    hex: "#F5F2EB",
    role: "Lavados y paneles de logro (→ --ds-play-green-wash)",
  },
  {
    name: "Azul pintura",
    token: "--ds-blue",
    hex: "#5799C6",
    role: "CTA contorno y enlaces (→ --ds-play-blue)",
  },
  {
    name: "Amarillo pintura",
    token: "--ds-yellow",
    hex: "#F7E335",
    role: "Enlaces sobre bandas coral (→ --ds-play-leaf)",
  },
  {
    name: "Verde",
    token: "--ds-green",
    hex: "#3ECF8E",
    role: "Éxito y refuerzo positivo en stickers",
  },
  {
    name: "Texto",
    token: "--ds-ink-soft",
    hex: "#424245",
    role: "Titulares marketing (→ --ds-play-ink)",
  },
  {
    name: "Texto apoyo",
    token: "--ds-muted",
    hex: "#6E6E73",
    role: "Cuerpo (→ --ds-play-muted)",
  },
  {
    name: "Borde",
    token: "--ds-line-strong",
    hex: "rgb(0 0 0 / 16%)",
    role: "Contornos 2px (→ --ds-play-border)",
  },
] as const;

export const dsReferoPrinciples = [
  "El CTA sticker relleno usa coral (--ds-coral) como acción principal.",
  "Botones sticker: radio 12px, borde 2px; el contorno es ciudadano de primera clase.",
  "Cuerpo en --ds-muted; el color vive en titulares, CTAs y bandas.",
  "Azul pintura para secundarios contorneados; no competir con coral en la misma fila.",
  "Sin sombras ni glass en este modo: superficies planas sobre --ds-surface.",
  "Naranja, rojo y cielo de la paleta solo en acentos puntuales, no en todo el chrome.",
] as const;

export const dsReferoComponents = [
  {
    id: "cta-fill",
    title: "CTA relleno",
    description: "Coral sólido, texto blanco — acción principal de campaña.",
  },
  {
    id: "cta-outline",
    title: "CTA contorno",
    description: "Azul pintura con borde hairline fuerte.",
  },
  {
    id: "pill",
    title: "Pill de navegación",
    description: "Selector de idioma o filtro con borde sticker.",
  },
  {
    id: "wash",
    title: "Panel lavado",
    description: "Fondo crema para tips o logros.",
  },
  {
    id: "band",
    title: "Banda de pie",
    description: "Franja coral con enlaces en amarillo pintura.",
  },
] as const;
