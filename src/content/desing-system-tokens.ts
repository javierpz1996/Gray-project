/** Tokens canónicos del design system Gray (ADR 0004). Referencia obligatoria para todo el sitio. */

export const dsColors = {
  marca: [
    {
      name: "Coral primario",
      token: "--ds-coral",
      hex: "#FF5A4E",
      role: "CTA, logo, activo",
    },
    {
      name: "Azul pintura",
      token: "--ds-blue",
      hex: "#5799C6",
      role: "Acento frío",
    },
    {
      name: "Rojo pintura",
      token: "--ds-red",
      hex: "#BB0702",
      role: "Énfasis",
    },
    {
      name: "Naranja pintura",
      token: "--ds-orange",
      hex: "#FF7800",
      role: "Calor",
    },
    {
      name: "Amarillo pintura",
      token: "--ds-yellow",
      hex: "#F7E335",
      role: "Highlight",
    },
  ],
  neutros: [
    { name: "Fondo", token: "--ds-bg", hex: "#F9F9F9", role: "Canvas de página" },
    {
      name: "Superficie",
      token: "--ds-surface",
      hex: "#FFFFFF",
      role: "Tarjetas, chips",
    },
    { name: "Texto", token: "--ds-ink", hex: "#1A1A1A", role: "Titulares" },
    {
      name: "Texto secundario",
      token: "--ds-muted",
      hex: "#757575",
      role: "Cuerpo apoyo",
    },
    { name: "Borde", token: "--ds-line", hex: "#E8E8E8", role: "Hairlines" },
  ],
  acentos: [
    { name: "Crema", token: "--ds-cream", hex: "#F5F2EB", role: "Secciones alternas" },
  ],
  semantico: [
    {
      name: "Éxito",
      token: "--ds-green",
      hex: "#3ECF8E",
      role: "Confirmaciones, estados OK",
    },
    {
      name: "Error",
      token: "--ds-red",
      hex: "#BB0702",
      role: "Validación, alertas críticas",
    },
    {
      name: "Info",
      token: "--ds-sky",
      hex: "#8ECAE6",
      role: "Avisos informativos",
    },
  ],
} as const;

export const dsPaintStrip = [
  "--ds-blue",
  "--ds-red",
  "--ds-orange",
  "--ds-yellow",
] as const;

export const dsSpacing = [
  { label: "4", css: "--ds-space-1", px: 4 },
  { label: "8", css: "--ds-space-2", px: 8 },
  { label: "12", css: "--ds-space-3", px: 12 },
  { label: "16", css: "--ds-space-4", px: 16 },
  { label: "24", css: "--ds-space-6", px: 24 },
  { label: "32", css: "--ds-space-8", px: 32 },
  { label: "48", css: "--ds-space-12", px: 48 },
  { label: "64", css: "--ds-space-16", px: 64 },
] as const;

export const dsRadii = [
  { name: "sm — botones", token: "--ds-radius-sm", value: "6px" },
  { name: "md — chips", token: "--ds-radius-md", value: "8px" },
  { name: "lg — tarjetas", token: "--ds-radius-lg", value: "10px" },
  { name: "xl — hero", token: "--ds-radius-xl", value: "12px" },
  { name: "pill", token: "--ds-radius-pill", value: "9999px" },
  {
    name: "sticker — modo play",
    token: "--ds-radius-sticker",
    value: "12px",
  },
] as const;

export const dsShadows = [
  { name: "xs", className: "ds-shadow-xs", token: "--ds-shadow-xs" },
  { name: "sm", className: "ds-shadow-sm", token: "--ds-shadow-sm" },
  { name: "md", className: "ds-shadow-md", token: "--ds-shadow-md" },
  { name: "lg", className: "ds-shadow-lg", token: "--ds-shadow-lg" },
  { name: "float", className: "ds-shadow-float", token: "--ds-shadow-float" },
] as const;

export const dsMotion = [
  {
    name: "Rápida",
    token: "--ds-duration-fast",
    value: "150ms",
    use: "Hover, bordes, color",
  },
  {
    name: "Media",
    token: "--ds-duration-base",
    value: "200ms",
    use: "Imágenes, paneles",
  },
  {
    name: "Lenta",
    token: "--ds-duration-slow",
    value: "600ms",
    use: "Revelado, entradas",
  },
] as const;

export const dsEasing = {
  name: "ease-out UI",
  token: "--ds-ease-out",
  value: "cubic-bezier(0.22, 1, 0.36, 1)",
  use: "Transiciones y keyframes",
} as const;
