export const HOME_DESIGN1_HERO_ANIMATION_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
] as const;

export type HomeDesign1HeroAnimationId =
  (typeof HOME_DESIGN1_HERO_ANIMATION_IDS)[number];

export const homeDesign1HeroAnimations: ReadonlyArray<{
  id: HomeDesign1HeroAnimationId;
  label: string;
  navLabel: string;
  hint: string;
}> = [
  {
    id: 3,
    label: "Pop",
    navLabel: "1 · Pop",
    hint: "Spring comic — principal",
  },
  {
    id: 1,
    label: "Secuencial",
    navLabel: "Anim · Secuencial",
    hint: "Fade lento paso a paso",
  },
  {
    id: 2,
    label: "Lateral",
    navLabel: "Anim · Lateral",
    hint: "Entrada con blur desde los bordes",
  },
  {
    id: 4,
    label: "Barrido",
    navLabel: "Anim · Barrido",
    hint: "Zoom + giro desde los lados",
  },
  {
    id: 5,
    label: "Coro",
    navLabel: "Anim · Coro",
    hint: "Tres colores juntos, logo después",
  },
  {
    id: 6,
    label: "Relámpago",
    navLabel: "Anim · Relámpago",
    hint: "Stagger ultra rápido, snap",
  },
  {
    id: 7,
    label: "Tinta",
    navLabel: "Anim · Tinta",
    hint: "Trazo de líneas, luego color",
  },
  {
    id: 8,
    label: "Impacto",
    navLabel: "Anim · Impacto",
    hint: "Giro fuerte + logo que aterriza",
  },
  {
    id: 9,
    label: "Flotar",
    navLabel: "Anim · Flotar",
    hint: "Subida lenta con desenfoque",
  },
  {
    id: 10,
    label: "Espejo",
    navLabel: "Anim · Espejo",
    hint: "Logo primero, colores al revés",
  },
  {
    id: 11,
    label: "Cortina",
    navLabel: "Anim · Cortina",
    hint: "Paneles caen desde arriba",
  },
  {
    id: 12,
    label: "Persiana",
    navLabel: "Anim · Persiana",
    hint: "Apertura vertical por franjas",
  },
  {
    id: 13,
    label: "Onda",
    navLabel: "Anim · Onda",
    hint: "Verde al centro, luego rojo y azul",
  },
  {
    id: 14,
    label: "Glitch",
    navLabel: "Anim · Glitch",
    hint: "Saltos rápidos y temblor",
  },
  {
    id: 15,
    label: "Piezas",
    navLabel: "Anim · Piezas",
    hint: "Entran desde las esquinas",
  },
  {
    id: 16,
    label: "Pulso",
    navLabel: "Anim · Pulso",
    hint: "Logo late primero, colores responden",
  },
  {
    id: 17,
    label: "Chispa",
    navLabel: "Anim · Chispa",
    hint: "Líneas primero, flash de color",
  },
  {
    id: 18,
    label: "Manga",
    navLabel: "Anim · Manga",
    hint: "Barrido horizontal tipo viñeta",
  },
] as const;

const heroAnimationIdSet = new Set<number>(HOME_DESIGN1_HERO_ANIMATION_IDS);

export function parseHomeDesign1HeroAnimation(
  value: string | string[] | undefined,
): HomeDesign1HeroAnimationId {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === undefined || raw === "") return 3;
  const n = Number.parseInt(raw, 10);
  if (heroAnimationIdSet.has(n)) {
    return n as HomeDesign1HeroAnimationId;
  }
  return 3;
}

export function homeDesign1HeroHref(
  id: HomeDesign1HeroAnimationId = 3,
  design: 1 | 10 = 1,
): string {
  if (id === 3) return `/?diseno=${design}`;
  return `/?diseno=${design}&hero=${id}`;
}

export function homeDesign1HeroAnimationLabel(
  id: HomeDesign1HeroAnimationId,
): string {
  return (
    homeDesign1HeroAnimations.find((entry) => entry.id === id)?.label ?? "Pop"
  );
}

export function homeDesign1HeroAnimationHint(
  id: HomeDesign1HeroAnimationId,
): string {
  return (
    homeDesign1HeroAnimations.find((entry) => entry.id === id)?.hint ?? ""
  );
}
