/** La primera es la portada actual. Las demás solo existen si se suben en el panel. */
export const cover2SlideSlots = ["portada2", "portada22", "portada23", "portada24", "portada25", "portada26"] as const;

export const cover2SlideMotions = [
  "fundido",
  "empuje",
  "zoom",
  "corte",
  "iris",
  "subir",
  "bajar",
  "vuelco",
  "giro",
  "desenfoque",
  "persiana",
  "flash",
  "alejarse",
  "diagonal",
  "cortina",
  "latido",
] as const;
export type Cover2SlideMotion = (typeof cover2SlideMotions)[number];

const cover2SlideMotionSet = new Set<string>(cover2SlideMotions);

export const cover2SlideMotionLabel: Record<Cover2SlideMotion, string> = {
  fundido: "Fundido",
  empuje: "Empuje",
  zoom: "Zoom",
  corte: "Corte",
  iris: "Iris",
  subir: "Subir",
  bajar: "Bajar",
  vuelco: "Vuelco",
  giro: "Giro",
  desenfoque: "Desenfoque",
  persiana: "Persiana",
  flash: "Flash",
  alejarse: "Alejarse",
  diagonal: "Diagonal",
  cortina: "Cortina",
  latido: "Latido",
};

export function parseCover2SlideMotion(value: string | null | undefined): Cover2SlideMotion {
  return value && cover2SlideMotionSet.has(value) ? (value as Cover2SlideMotion) : "fundido";
}

/** Segundos entre imágenes. 0 deja el pase solo en los triángulos. */
export function parseCover2SlideEvery(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.min(20, Math.max(0, Math.round(n)));
}

export const cover2MenuFonts = ["display", "outfit", "oswald", "sans"] as const;
export type Cover2MenuFont = (typeof cover2MenuFonts)[number];

/** Porcentaje sobre el tamaño base de la franja. */
export const cover2MenuScaleMin = 50;
export const cover2MenuScaleMax = 220;

export type Cover2MenuItem = {
  text: string;
  font: Cover2MenuFont;
  /** 50–220. 100 es el tamaño de la franja. */
  scale: number;
  bold: boolean;
  upper: boolean;
  color: string;
};

const fontSet = new Set<string>(cover2MenuFonts);

const legacyScale: Record<string, number> = { chico: 75, medio: 100, grande: 145 };

function scaleOf(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.min(cover2MenuScaleMax, Math.max(cover2MenuScaleMin, Math.round(value)));
  }
  if (typeof value === "string" && value in legacyScale) return legacyScale[value] ?? 100;
  return 100;
}

export const cover2MenuFontLabel: Record<Cover2MenuFont, string> = {
  display: "Condensada",
  outfit: "Outfit",
  oswald: "Oswald",
  sans: "Inter",
};

export const cover2MenuFontFamily: Record<Cover2MenuFont, string> = {
  display: "var(--font-display)",
  outfit: "var(--font-outfit), var(--font-sans), sans-serif",
  oswald: "var(--font-oswald), sans-serif",
  sans: "var(--font-sans)",
};

function rgb(value: unknown): string {
  const raw = typeof value === "string" ? value : "";
  return /^\d{1,3},\d{1,3},\d{1,3}$/.test(raw) ? raw : "255,255,255";
}

function item(value: unknown, fallback: Cover2MenuItem): Cover2MenuItem {
  const row = value && typeof value === "object" ? (value as Partial<Cover2MenuItem>) : {};
  const text = typeof row.text === "string" ? row.text.trim().slice(0, 28) : "";
  return {
    text: text || fallback.text,
    font: typeof row.font === "string" && fontSet.has(row.font) ? (row.font as Cover2MenuFont) : fallback.font,
    scale: scaleOf("scale" in row ? row.scale : "size" in row ? (row as { size?: unknown }).size : undefined),
    bold: typeof row.bold === "boolean" ? row.bold : fallback.bold,
    upper: typeof row.upper === "boolean" ? row.upper : fallback.upper,
    color: rgb(row.color),
  };
}

const base = (text: string): Cover2MenuItem => ({
  text,
  font: "display",
  scale: 100,
  bold: true,
  upper: true,
  color: "255,255,255",
});

export function defaultCover2Menu(): Cover2MenuItem[] {
  return ["Cómics", "Libros", "Cursos", "Tutoriales", "Suscripciones"].map(base);
}

export function parseCover2Menu(value: unknown): Cover2MenuItem[] {
  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      parsed = null;
    }
  }
  if (!Array.isArray(parsed) || parsed.length === 0) return defaultCover2Menu();
  const fallback = defaultCover2Menu();
  return parsed.slice(0, 8).map((entry, index) => item(entry, fallback[index] ?? base("Ítem")));
}
