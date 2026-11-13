/** Variantes de glitch sobre la imagen del hero, solo diseño 2. */

export const COVER2_HERO_GLITCH_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
] as const;

export type Cover2HeroGlitchId = (typeof COVER2_HERO_GLITCH_IDS)[number];

export const COVER2_HERO_GLITCH_AMPS = ["hard", "soft"] as const;

export type Cover2HeroGlitchAmp = (typeof COVER2_HERO_GLITCH_AMPS)[number];

export const COVER2_HERO_GLITCH_STORAGE_KEY = "cover2-hero-glitch";

export const COVER2_HERO_GLITCH_AMP_STORAGE_KEY = "cover2-hero-glitch-amp";

/** Lo que se ve en el sitio mientras el resto vive en el panel. */
export const COVER2_HERO_GLITCH_LIVE: Cover2HeroGlitchId = 13;

export const COVER2_HERO_GLITCH_AMP_LIVE: Cover2HeroGlitchAmp = "soft";

export const COVER2_HERO_GLITCH_SHORT: Record<Cover2HeroGlitchId, string> = {
  1: "RGB",
  2: "Cortes",
  3: "Scan",
  4: "Bloques",
  5: "VHS",
  6: "Ghost",
  7: "Grieta",
  8: "Prisma",
  9: "Parpadeo",
  10: "Pulso",
  11: "Corto",
  12: "Doble",
  13: "Largo",
  14: "Franja",
  15: "Raro",
  16: "Flash",
  17: "Triple",
  18: "Ancho",
  19: "Eco",
  20: "Tajo",
};

export const COVER2_HERO_GLITCH_LABELS: Record<Cover2HeroGlitchId, string> = {
  1: "Aberración cromática: fantasmas rojo y cian",
  2: "Cortes horizontales que se desplazan",
  3: "Pantalla CRT: scanlines y parpadeo",
  4: "Corrupción digital: bloques que saltan",
  5: "Cinta VHS: tracking y barrido",
  6: "Rastro RGB: fantasmas rojo y cian siempre desfasados",
  7: "Grieta: una franja partida en dos canales",
  8: "Franja prismática en el borde",
  9: "Strobe: destello y split RGB",
  10: "Temblor cromático de toda la imagen",
  11: "Limpia; un destello Ghost rápido",
  12: "Limpia; dos golpes Ghost seguidos",
  13: "Limpia; el rastro se queda un poco más",
  14: "Limpia; solo una franja Ghost",
  15: "Limpia; un Ghost más espaciado",
  16: "Limpia; un flash Ghost más breve",
  17: "Limpia; tres golpes Ghost",
  18: "Limpia; Ghost de cuadro entero",
  19: "Limpia; rojo primero, cian después",
  20: "Limpia; dos tajos finos",
};

export function parseCover2HeroGlitch(
  value?: string | string[] | null | undefined,
): Cover2HeroGlitchId {
  const raw = Array.isArray(value) ? value[0] : value;
  const n = Number(raw);
  if (n >= 1 && n <= 20) {
    return n as Cover2HeroGlitchId;
  }
  return 1;
}

export function parseCover2HeroGlitchAmp(
  value?: string | string[] | null | undefined,
): Cover2HeroGlitchAmp {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "soft" ? "soft" : "hard";
}
