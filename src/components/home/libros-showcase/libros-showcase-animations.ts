import type { Transition } from "motion/react";

export type LibrosShowcaseAnimationId =
  | "cover-flow"
  | "deck-breathe"
  | "deck-drift"
  | "deck-soft-tilt"
  | "deck-editorial"
  | "deck-snap"
  | "deck-film"
  | "deck-whip"
  | "deck-magnetic"
  | "deck-cascade"
  | "deck-prism"
  | "deck-fan"
  | "deck-depth"
  | "deck-spotlight"
  | "deck-glass"
  | "deck-stack"
  | "deck-glide"
  | "deck-pop"
  | "deck-pendulum"
  | "deck-zoom"
  | "deck-vignette"
  | "deck-focus-blur"
  | "deck-elastic"
  | "deck-cinematic"
  | "deck-wave"
  | "deck-tilt-deep"
  | "deck-parallax"
  | "deck-shuffle"
  | "deck-mirror"
  | "bold-rocket"
  | "bold-swing"
  | "bold-vortex"
  | "bold-slalom"
  | "bold-tornado"
  | "bold-springboard"
  | "bold-neon"
  | "bold-jelly"
  | "bold-whirl"
  | "bold-surge"
  | "bold-burst"
  | "bold-chaos"
  | "bold-storm"
  | "bold-flip"
  | "bold-maxtilt"
  | "bold-dash"
  | "bold-helix"
  | "express-orbit"
  | "express-page-turn"
  | "express-dolly"
  | "express-ripple"
  | "express-fling"
  | "express-frost"
  | "express-ink-wash"
  | "express-lift-row"
  | "express-wobble"
  | "express-jolt"
  | "express-pulse"
  | "express-spine"
  | "express-hopscotch"
  | "express-swing-door"
  | "express-zoom-rush"
  | "express-wave-x"
  | "express-rack-3d"
  | "express-glitter"
  | "express-tidal"
  | "express-snapline"
  | "express-vault"
  | "focus-scale"
  | "spring-carousel"
  | "vertical-lift"
  | "crossfade";

export type LibrosShowcaseAnimationOption = {
  id: LibrosShowcaseAnimationId;
  label: string;
  hint: string;
  group?: "deck" | "classic" | "bold" | "express";
};

export const LIBROS_SHOWCASE_DEFAULT_ANIMATION: LibrosShowcaseAnimationId =
  "deck-film";

const deckOptions = [
  ["cover-flow", "Referencia", "Abanico amplio, escala y opacidad en capas."],
  ["deck-breathe", "Respiración", "El activo flota; resorte suave."],
  ["deck-drift", "Deriva", "Arco vertical tipo muelle."],
  ["deck-soft-tilt", "Inclinación suave", "Perspectiva 3D tenue en laterales."],
  ["deck-editorial", "Editorial", "Centro elevado; laterales desaturados."],
  ["deck-snap", "Snap", "Resorte rápido con rebote."],
  ["deck-film", "Película", "Laterales en gris; activo a color."],
  ["deck-whip", "Latigazo", "Entrada rápida con ease-out marcado."],
  ["deck-magnetic", "Magnético", "Los vecinos se acercan un poco al centro."],
  ["deck-cascade", "Cascada", "Escalera vertical por distancia al activo."],
  ["deck-prism", "Prisma", "RotateY más pronunciado, estilo vitrina."],
  ["deck-fan", "Abanico Z", "Giro leve en Z, cartas en mesa."],
  ["deck-depth", "Profundidad", "Escala más contrastada + blur leve."],
  ["deck-spotlight", "Foco", "Centro más brillante; laterales apagados."],
  ["deck-glass", "Cristal", "Laterales difuminados, activo nítido."],
  ["deck-stack", "Pila", "Cada capa más baja, sensación de stack."],
  ["deck-glide", "Planeo", "Transición larga y muy suave."],
  ["deck-pop", "Pop", "El activo hace pop al entrar."],
  ["deck-pendulum", "Péndulo", "Oscilación en Z al desplazar."],
  ["deck-zoom", "Zoom", "Centro más grande, cambio rápido."],
  ["deck-vignette", "Viñeta", "Laterales más oscuros."],
  ["deck-focus-blur", "Enfoque", "Solo el centro nítido (blur en lados)."],
  ["deck-elastic", "Elástico", "Resorte muy elástico al navegar."],
  ["deck-cinematic", "Cine", "Centro alto + laterales bajos, ritmo lento."],
  ["deck-wave", "Ola", "Onda vertical continua en el eje."],
  ["deck-tilt-deep", "Inclinación profunda", "Perspectiva fuerte en Y."],
  ["deck-parallax", "Parallax", "Los lejanos se mueven menos en X."],
  ["deck-shuffle", "Barajar", "Pequeño desfase vertical alternado."],
  ["deck-mirror", "Espejo", "Laterales con brillo invertido suave."],
] as const satisfies ReadonlyArray<
  readonly [LibrosShowcaseAnimationId, string, string]
>;

const boldOptions = [
  ["bold-rocket", "Cohete", "El activo salta fuerte; resorte wild."],
  ["bold-swing", "Columpio", "Giros amplios en Z + arco vertical."],
  ["bold-vortex", "Vórtice", "RotateY agresivo; entra girando."],
  ["bold-slalom", "Slalom", "Desplazamiento en S en horizontal."],
  ["bold-tornado", "Tornado", "Cada libro rota más cuanto más lejos."],
  ["bold-springboard", "Trampolín", "Rebote vertical marcado al foco."],
  ["bold-neon", "Neón", "Pop de escala + saturación en el centro."],
  ["bold-jelly", "Gelatina", "Escala elástica exagerada."],
  ["bold-whirl", "Remolino", "Perspectiva + giro Y extremo."],
  ["bold-surge", "Oleada", "Onda alta y step amplio."],
  ["bold-burst", "Explosión", "Centro grande; laterales se encogen."],
  ["bold-chaos", "Caos", "Combina giro, ola y escala máxima."],
  ["bold-storm", "Tormenta", "Blur + movimiento vertical intenso."],
  ["bold-flip", "Flip", "Inclinación en X; efecto carta levantada."],
  ["bold-maxtilt", "Max tilt", "Laterales casi de perfil (Y)."],
  ["bold-dash", "Dash", "Entrada rápida con overshoot lateral."],
  ["bold-helix", "Hélice", "Y sinusoidal + rotateZ progresivo."],
] as const satisfies ReadonlyArray<
  readonly [LibrosShowcaseAnimationId, string, string]
>;

const expressOptions = [
  ["express-orbit", "Órbita", "Trayectoria circular; continuidad espacial."],
  ["express-page-turn", "Página", "Giro tipo hoja de libro (Y + X)."],
  ["express-dolly", "Dolly", "Zoom inverso al alejarse del centro."],
  ["express-ripple", "Ripple", "Ondas en escala y vertical."],
  ["express-fling", "Fling", "Lanzamiento lateral con giro Z."],
  ["express-frost", "Escarcha", "Blur frío y luz apagada en lados."],
  ["express-ink-wash", "Tinta", "Laterales desaturados como acuarela."],
  ["express-lift-row", "Fila viva", "Centro alto, vecinos en distintas alturas."],
  ["express-wobble", "Tambaleo", "Oscilación rápida en Z."],
  ["express-jolt", "Sacudida", "Entrada seca con overshoot."],
  ["express-pulse", "Pulso", "El activo late en escala."],
  ["express-spine", "Lomo", "Perspectiva de estantería (Y)."],
  ["express-hopscotch", "Rayuela", "Saltos verticales alternados."],
  ["express-swing-door", "Puerta", "Laterales casi de perfil al pasar."],
  ["express-zoom-rush", "Zoom rush", "Acercamiento agresivo al foco."],
  ["express-wave-x", "Ola X", "Movimiento horizontal sinusoidal."],
  ["express-rack-3d", "Rack 3D", "Inclinación + profundidad simulada."],
  ["express-glitter", "Brillo", "Centro saturado; chispa visual."],
  ["express-tidal", "Marea", "Sube y baja amplia en Y."],
  ["express-snapline", "Snapline", "Resorte seco + retardo escalonado."],
  ["express-vault", "Bóveda", "Arco vertical pronunciado al navegar."],
] as const satisfies ReadonlyArray<
  readonly [LibrosShowcaseAnimationId, string, string]
>;

const classicOptions = [
  ["focus-scale", "Escala focal", "Centro grande, laterales compactos."],
  ["spring-carousel", "Carrusel elástico", "Horizontal snappy."],
  ["vertical-lift", "Elevación", "Activo sube; resto apoyado."],
  ["crossfade", "Crossfade", "Opacidad suave."],
] as const satisfies ReadonlyArray<
  readonly [LibrosShowcaseAnimationId, string, string]
>;

export const librosShowcaseAnimationOptions: readonly LibrosShowcaseAnimationOption[] =
  [
    ...boldOptions.map(([id, label, hint]) => ({
      id,
      label,
      hint,
      group: "bold" as const,
    })),
    ...expressOptions.map(([id, label, hint]) => ({
      id,
      label,
      hint,
      group: "express" as const,
    })),
    ...deckOptions.map(([id, label, hint]) => ({
      id,
      label,
      hint,
      group: "deck" as const,
    })),
    ...classicOptions.map(([id, label, hint]) => ({
      id,
      label,
      hint,
      group: "classic" as const,
    })),
  ];

export const librosShowcaseBoldAnimationOptions =
  librosShowcaseAnimationOptions.filter((opt) => opt.group === "bold");

export const librosShowcaseExpressAnimationOptions =
  librosShowcaseAnimationOptions.filter((opt) => opt.group === "express");

export const librosShowcaseDeckAnimationOptions =
  librosShowcaseAnimationOptions.filter((opt) => opt.group === "deck");

const DECK_STEP = 218;
const BOLD_STEP = 236;
const EXPRESS_STEP = 228;
const DECK_MAX_VISIBLE = 3;

function staggerTransition(
  transition: Transition,
  abs: number,
  reduceMotion: boolean,
): Transition {
  if (reduceMotion) return transition;
  return { ...transition, delay: abs * 0.042 };
}

export function librosShowcaseIsExpress(
  animationId: LibrosShowcaseAnimationId,
): boolean {
  return animationId.startsWith("express-");
}

const DECK_PERSPECTIVE_IDS = new Set<LibrosShowcaseAnimationId>([
  "deck-soft-tilt",
  "deck-prism",
  "deck-tilt-deep",
  "deck-fan",
  "bold-vortex",
  "bold-whirl",
  "bold-maxtilt",
  "bold-flip",
  "express-page-turn",
  "express-spine",
  "express-swing-door",
  "express-rack-3d",
]);

const EASE_EDITORIAL: Transition = { duration: 0.48, ease: [0.16, 1, 0.3, 1] };
const EASE_SMOOTH: Transition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] };
const EASE_GLIDE: Transition = { duration: 0.62, ease: [0.25, 0.8, 0.2, 1] };
const EASE_WHIP: Transition = { duration: 0.28, ease: [0.12, 0.85, 0.18, 1] };

const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.82,
};

const SPRING_BREATHE: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.95,
};

const SPRING_SNAP: Transition = {
  type: "spring",
  stiffness: 520,
  damping: 32,
  mass: 0.75,
};

const SPRING_ELASTIC: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 22,
  mass: 0.88,
};

const SPRING_WILD: Transition = {
  type: "spring",
  stiffness: 640,
  damping: 22,
  mass: 0.68,
};

const SPRING_HYPER: Transition = {
  type: "spring",
  stiffness: 820,
  damping: 18,
  mass: 0.62,
};

export type LibrosShowcaseItemMotion = {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  zIndex: number;
  filter?: string;
  transition: Transition;
};

type DeckBuildArgs = {
  delta: number;
  abs: number;
  scale: number;
  opacity: number;
};

function deckScale(abs: number): number {
  if (abs === 0) return 1.05;
  if (abs === 1) return 0.84;
  if (abs === 2) return 0.72;
  return 0.62;
}

function deckOpacity(abs: number): number {
  if (abs === 0) return 1;
  if (abs === 1) return 0.82;
  if (abs === 2) return 0.68;
  return 0.52;
}

function deckHidden(
  delta: number,
  instant: Transition,
): LibrosShowcaseItemMotion {
  return {
    x: delta * DECK_STEP,
    y: 0,
    scale: 0.55,
    opacity: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    zIndex: 0,
    transition: instant,
  };
}

function deckReduceMotion(
  delta: number,
  abs: number,
  instant: Transition,
  scale: number,
  opacity: number,
): LibrosShowcaseItemMotion {
  return {
    x: delta * DECK_STEP,
    y: 0,
    scale: abs === 0 ? 1 : scale,
    opacity: abs === 0 ? 1 : opacity,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    zIndex: 40 - abs,
    transition: instant,
  };
}

function referenceDeckMotion(
  delta: number,
  abs: number,
  reduceMotion: boolean,
): LibrosShowcaseItemMotion {
  const instant: Transition = {
    duration: reduceMotion ? 0.01 : 0.22,
    ease: "easeOut",
  };

  if (abs > DECK_MAX_VISIBLE) return deckHidden(delta, instant);

  const scale = deckScale(abs);
  const opacity = deckOpacity(abs);

  if (reduceMotion) {
    return deckReduceMotion(delta, abs, instant, scale, opacity);
  }

  return {
    x: delta * DECK_STEP,
    y: abs * 3,
    scale,
    opacity,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    zIndex: 50 - abs,
    transition: EASE_SMOOTH,
  };
}

function deckVariantMotion(
  delta: number,
  abs: number,
  reduceMotion: boolean,
  build: (args: DeckBuildArgs) => Omit<
    LibrosShowcaseItemMotion,
    "transition" | "rotateX"
  > & { transition?: Transition; rotateX?: number },
): LibrosShowcaseItemMotion {
  const instant: Transition = {
    duration: reduceMotion ? 0.01 : 0.22,
    ease: "easeOut",
  };

  if (abs > DECK_MAX_VISIBLE) return deckHidden(delta, instant);

  const scale = deckScale(abs);
  const opacity = deckOpacity(abs);

  if (reduceMotion) {
    return deckReduceMotion(delta, abs, instant, scale, opacity);
  }

  const built = build({ delta, abs, scale, opacity });
  return {
    x: built.x,
    y: built.y,
    scale: built.scale,
    opacity: built.opacity,
    rotateX: built.rotateX ?? 0,
    rotateY: built.rotateY,
    rotateZ: built.rotateZ,
    zIndex: built.zIndex,
    filter: built.filter,
    transition: built.transition ?? EASE_SMOOTH,
  };
}

function expressPreset(
  animationId: LibrosShowcaseAnimationId,
  delta: number,
  abs: number,
  reduceMotion: boolean,
): LibrosShowcaseItemMotion | null {
  const step = EXPRESS_STEP;

  switch (animationId) {
    case "express-orbit":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step * 0.88 + Math.sin(delta * 0.95) * 42,
        y: Math.cos(delta * 0.95) * 36 + (delta === 0 ? -20 : abs * 6),
        scale: delta === 0 ? scale + 0.08 : scale * 0.9,
        opacity,
        rotateX: delta * -5,
        rotateY: delta * -18,
        rotateZ: delta * 6,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_WILD, abs, reduceMotion),
      }));
    case "express-page-turn":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (step + abs * 6),
        y: delta === 0 ? -26 : abs * 14,
        scale: delta === 0 ? 1.12 : scale * 0.88,
        opacity,
        rotateX: delta === 0 ? 0 : -16 - abs * 5,
        rotateY: delta === 0 ? 0 : delta * -72,
        rotateZ: delta * 4,
        zIndex: 50 - abs,
        transition: staggerTransition(EASE_EDITORIAL, abs, reduceMotion),
      }));
    case "express-dolly":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (step + abs * 10),
        y: abs * 8,
        scale: delta === 0 ? 1.2 : scale / (1 + abs * 0.12),
        opacity: delta === 0 ? 1 : opacity * (0.78 - abs * 0.04),
        rotateX: 0,
        rotateY: delta * -10,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: staggerTransition(EASE_SMOOTH, abs, reduceMotion),
      }));
    case "express-ripple":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: Math.sin(delta * 2.1) * 28 + abs * 8,
        scale: delta === 0 ? 1.14 : scale * (1 + Math.sin(abs) * 0.04),
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: Math.sin(delta * 1.6) * 8,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_BREATHE, abs, reduceMotion),
      }));
    case "express-fling":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (BOLD_STEP + 36) + delta * abs * 6,
        y: delta === 0 ? -14 : Math.abs(delta) * 10,
        scale: delta === 0 ? 1.1 : scale * 0.86,
        opacity,
        rotateX: 0,
        rotateY: delta * -8,
        rotateZ: delta * 22,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_HYPER, abs, reduceMotion),
      }));
    case "express-frost":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 12,
        scale,
        opacity: delta === 0 ? 1 : opacity * 0.7,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        filter:
          delta === 0
            ? "brightness(1.06)"
            : "blur(2px) brightness(0.82) saturate(0.7)",
        transition: staggerTransition(EASE_GLIDE, abs, reduceMotion),
      }));
    case "express-ink-wash":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: delta === 0 ? -18 : abs * 16,
        scale: delta === 0 ? scale + 0.05 : scale * 0.94,
        opacity: delta === 0 ? 1 : opacity * 0.62,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        filter:
          delta === 0
            ? "saturate(1.1)"
            : "saturate(0.45) contrast(0.92) brightness(0.9)",
        transition: staggerTransition(EASE_EDITORIAL, abs, reduceMotion),
      }));
    case "express-lift-row":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: delta === 0 ? -38 : abs === 1 ? -8 : abs * 18,
        scale: delta === 0 ? 1.16 : scale * 0.9,
        opacity,
        rotateX: 0,
        rotateY: delta * -6,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_SNAPPY, abs, reduceMotion),
      }));
    case "express-wobble":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (step + Math.sin(delta * 3) * 12),
        y: abs * 6,
        scale,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: Math.sin(delta * 2.8) * 14,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_ELASTIC, abs, reduceMotion),
      }));
    case "express-jolt":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (step + 28) + (delta !== 0 ? delta * 14 : 0),
        y: delta === 0 ? -8 : abs * 4,
        scale: delta === 0 ? 1.15 : scale * 0.88,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: delta * 9,
        zIndex: 50 - abs,
        transition: staggerTransition(EASE_WHIP, abs, reduceMotion),
      }));
    case "express-pulse":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: delta === 0 ? -22 : abs * 8,
        scale: delta === 0 ? 1.24 : scale * 0.84,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_HYPER, abs, reduceMotion),
      }));
    case "express-spine":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (step * 0.82),
        y: abs * 10,
        scale: delta === 0 ? 1.08 : scale * 0.96,
        opacity,
        rotateX: 0,
        rotateY: delta === 0 ? 0 : delta * -52,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_WILD, abs, reduceMotion),
      }));
    case "express-hopscotch":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: (Math.abs(delta) % 2 === 0 ? -1 : 1) * (12 + abs * 16) + abs * 6,
        scale,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: delta * 5,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_SNAP, abs, reduceMotion),
      }));
    case "express-swing-door":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (step * 0.75),
        y: abs * 6,
        scale: abs === 1 ? scale * 0.78 : scale,
        opacity: abs > 1 ? opacity * 0.5 : opacity,
        rotateX: 0,
        rotateY: delta === 0 ? 0 : delta * (abs === 1 ? -78 : -32),
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: staggerTransition(EASE_EDITORIAL, abs, reduceMotion),
      }));
    case "express-zoom-rush":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (step + abs * 18),
        y: delta === 0 ? -28 : abs * 12,
        scale: delta === 0 ? 1.26 : scale * 0.72,
        opacity: delta === 0 ? 1 : opacity * 0.55,
        rotateX: delta === 0 ? -6 : 0,
        rotateY: delta * -8,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_HYPER, abs, reduceMotion),
      }));
    case "express-wave-x":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step + Math.sin(delta * 1.4) * 58,
        y: Math.cos(delta * 0.8) * 16,
        scale,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: Math.sin(delta * 1.2) * 6,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_BREATHE, abs, reduceMotion),
      }));
    case "express-rack-3d":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (step - abs * 8),
        y: abs * 14,
        scale: delta === 0 ? 1.1 : scale * (0.92 - abs * 0.03),
        opacity,
        rotateX: abs * 6,
        rotateY: delta === 0 ? 0 : delta * -38,
        rotateZ: delta * 3,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_WILD, abs, reduceMotion),
      }));
    case "express-glitter":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: delta === 0 ? -24 : abs * 10,
        scale: delta === 0 ? 1.18 : scale * 0.9,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        filter:
          delta === 0
            ? "saturate(1.45) brightness(1.12) contrast(1.04)"
            : "saturate(0.55) brightness(0.78)",
        transition: staggerTransition(SPRING_WILD, abs, reduceMotion),
      }));
    case "express-tidal":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: Math.sin(delta * 0.55) * 52 + (delta === 0 ? -16 : 0),
        scale,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: delta * 4,
        zIndex: 50 - abs,
        transition: staggerTransition(EASE_GLIDE, abs, reduceMotion),
      }));
    case "express-snapline":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (step + abs * 4),
        y: delta === 0 ? -10 : abs * 5,
        scale: delta === 0 ? 1.12 : scale,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_SNAP, abs, reduceMotion),
      }));
    case "express-vault":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: -Math.abs(delta) * 22 - abs * 8 + (delta === 0 ? -8 : 0),
        scale: delta === 0 ? 1.14 : scale * 0.88,
        opacity,
        rotateX: delta === 0 ? 0 : 8 + abs * 3,
        rotateY: delta * -10,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: staggerTransition(SPRING_ELASTIC, abs, reduceMotion),
      }));
    default:
      return null;
  }
}

function deckPreset(
  animationId: LibrosShowcaseAnimationId,
  delta: number,
  abs: number,
  reduceMotion: boolean,
): LibrosShowcaseItemMotion | null {
  const step = DECK_STEP;
  const base = ({ scale, opacity }: DeckBuildArgs) => ({
    x: delta * step,
    y: abs * 3,
    scale,
    opacity,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    zIndex: 50 - abs,
  });

  switch (animationId) {
    case "deck-breathe":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        ...base({ delta, abs, scale, opacity }),
        y: delta === 0 ? -14 : abs * 5,
        scale: delta === 0 ? scale + 0.04 : scale,
        transition: SPRING_BREATHE,
      }));
    case "deck-drift":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        ...base({ delta, abs, scale, opacity }),
        y: Math.sin(delta * 0.65) * 18 + abs * 2,
        transition: SPRING_BREATHE,
      }));
    case "deck-soft-tilt":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        ...base({ delta, abs, scale, opacity }),
        y: abs * 4,
        rotateY: delta === 0 ? 0 : delta * -14,
      }));
    case "deck-editorial":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        ...base({ delta, abs, scale, opacity }),
        y: delta === 0 ? -20 : abs * 6,
        scale: delta === 0 ? scale + 0.02 : scale * 0.98,
        opacity: delta === 0 ? 1 : opacity * 0.88,
        filter: delta === 0 ? "none" : "saturate(0.72) brightness(0.94)",
        transition: EASE_EDITORIAL,
      }));
    case "deck-snap":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        ...base({ delta, abs, scale, opacity }),
        y: delta === 0 ? -6 : 0,
        scale: delta === 0 ? 1.08 : scale * 0.96,
        transition: SPRING_SNAP,
      }));
    case "deck-film":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        ...base({ delta, abs, scale, opacity }),
        filter: delta === 0 ? "none" : "grayscale(0.85) contrast(0.96)",
      }));
    case "deck-whip":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        ...base({ delta, abs, scale, opacity }),
        y: delta === 0 ? -8 : abs * 2,
        transition: EASE_WHIP,
      }));
    case "deck-magnetic":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (step - abs * 12),
        y: abs * 2,
        scale: delta === 0 ? scale + 0.03 : scale * 1.02,
        opacity,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: SPRING_BREATHE,
      }));
    case "deck-cascade":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 14 + (delta < 0 ? -4 : delta > 0 ? 4 : 0),
        scale,
        opacity,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
      }));
    case "deck-prism":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 5,
        scale,
        opacity,
        rotateY: delta === 0 ? 0 : delta * -22,
        rotateZ: 0,
        zIndex: 50 - abs,
      }));
    case "deck-fan":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 6,
        scale,
        opacity,
        rotateY: delta === 0 ? 0 : delta * -8,
        rotateZ: delta * 3.5,
        zIndex: 50 - abs,
      }));
    case "deck-depth":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 8,
        scale: delta === 0 ? 1.1 : scale * 0.92,
        opacity: delta === 0 ? 1 : opacity * 0.75,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        filter: delta === 0 ? "none" : "blur(0.6px)",
      }));
    case "deck-spotlight":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 3,
        scale,
        opacity,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        filter:
          delta === 0
            ? "brightness(1.06)"
            : "brightness(0.82) saturate(0.8)",
      }));
    case "deck-glass":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 4,
        scale,
        opacity: delta === 0 ? 1 : opacity * 0.7,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        filter: delta === 0 ? "none" : "blur(1.2px) saturate(1.1)",
      }));
    case "deck-stack":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 18,
        scale: scale * (1 - abs * 0.02),
        opacity,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
      }));
    case "deck-glide":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        ...base({ delta, abs, scale, opacity }),
        transition: EASE_GLIDE,
      }));
    case "deck-pop":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: delta === 0 ? -10 : abs * 4,
        scale: delta === 0 ? 1.12 : scale * 0.94,
        opacity,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: SPRING_SNAP,
      }));
    case "deck-pendulum":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 3,
        scale,
        opacity,
        rotateY: 0,
        rotateZ: delta * 5,
        zIndex: 50 - abs,
        transition: SPRING_BREATHE,
      }));
    case "deck-zoom":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: delta === 0 ? -4 : abs * 2,
        scale: delta === 0 ? 1.14 : scale * 0.9,
        opacity,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: EASE_WHIP,
      }));
    case "deck-vignette":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 3,
        scale,
        opacity,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        filter: delta === 0 ? "none" : "brightness(0.78)",
      }));
    case "deck-focus-blur":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 2,
        scale,
        opacity,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        filter: delta === 0 ? "none" : "blur(2px)",
      }));
    case "deck-elastic":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        ...base({ delta, abs, scale, opacity }),
        transition: SPRING_ELASTIC,
      }));
    case "deck-cinematic":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: delta === 0 ? -24 : abs * 10,
        scale: delta === 0 ? scale + 0.05 : scale * 0.94,
        opacity: delta === 0 ? 1 : opacity * 0.6,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: EASE_EDITORIAL,
      }));
    case "deck-wave":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: Math.sin(delta * 0.9) * 22,
        scale,
        opacity,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: SPRING_BREATHE,
      }));
    case "deck-tilt-deep":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 6,
        scale,
        opacity,
        rotateY: delta === 0 ? 0 : delta * -32,
        rotateZ: 0,
        zIndex: 50 - abs,
      }));
    case "deck-parallax":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (step - abs * 18),
        y: abs * 4,
        scale,
        opacity,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
      }));
    case "deck-shuffle":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: (delta % 2 === 0 ? 1 : -1) * abs * 8 + abs * 4,
        scale,
        opacity,
        rotateY: 0,
        rotateZ: delta * 2,
        zIndex: 50 - abs,
        transition: SPRING_SNAPPY,
      }));
    case "deck-mirror":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 3,
        scale,
        opacity,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        filter:
          delta === 0
            ? "none"
            : "invert(0.04) contrast(0.95) brightness(0.9)",
      }));
    case "bold-rocket":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * BOLD_STEP,
        y: delta === 0 ? -52 : abs * 22,
        scale: delta === 0 ? 1.2 : scale * 0.88,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: delta * 4,
        zIndex: 50 - abs,
        transition: SPRING_WILD,
      }));
    case "bold-swing":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * BOLD_STEP,
        y: Math.sin(delta * 0.85) * 38 + abs * 8,
        scale,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: delta * 16,
        zIndex: 50 - abs,
        transition: SPRING_HYPER,
      }));
    case "bold-vortex":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * BOLD_STEP,
        y: abs * 12,
        scale: delta === 0 ? 1.14 : scale * 0.9,
        opacity,
        rotateX: delta === 0 ? -6 : 0,
        rotateY: delta === 0 ? 0 : delta * -52,
        rotateZ: delta * 10,
        zIndex: 50 - abs,
        transition: SPRING_WILD,
      }));
    case "bold-slalom":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * BOLD_STEP + Math.sin(delta * 1.2) * 44,
        y: Math.cos(delta * 0.9) * 26,
        scale,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: delta * 8,
        zIndex: 50 - abs,
        transition: SPRING_HYPER,
      }));
    case "bold-tornado":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * BOLD_STEP,
        y: abs * 16,
        scale: scale * (1 - abs * 0.04),
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: delta * (10 + abs * 5),
        zIndex: 50 - abs,
        transition: SPRING_WILD,
      }));
    case "bold-springboard":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: delta === 0 ? -44 : abs * 18,
        scale: delta === 0 ? 1.18 : scale * 0.86,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: SPRING_HYPER,
      }));
    case "bold-neon":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * BOLD_STEP,
        y: delta === 0 ? -16 : abs * 6,
        scale: delta === 0 ? 1.22 : scale * 0.92,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 50 - abs,
        filter:
          delta === 0
            ? "saturate(1.35) brightness(1.08)"
            : "saturate(0.65) brightness(0.8)",
        transition: SPRING_WILD,
      }));
    case "bold-jelly":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * step,
        y: abs * 10,
        scale: delta === 0 ? scale + 0.14 : scale * 0.8,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: delta * 3,
        zIndex: 50 - abs,
        transition: SPRING_HYPER,
      }));
    case "bold-whirl":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * BOLD_STEP,
        y: Math.sin(delta * 1.1) * 20,
        scale,
        opacity,
        rotateX: abs * 4,
        rotateY: delta === 0 ? 0 : delta * -58,
        rotateZ: delta * 12,
        zIndex: 50 - abs,
        transition: SPRING_WILD,
      }));
    case "bold-surge":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (BOLD_STEP + abs * 8),
        y: Math.sin(delta * 0.75) * 42,
        scale: delta === 0 ? 1.12 : scale,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: delta * 6,
        zIndex: 50 - abs,
        transition: SPRING_WILD,
      }));
    case "bold-burst":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (BOLD_STEP + abs * 14),
        y: delta === 0 ? -12 : abs * 14,
        scale: delta === 0 ? 1.2 : scale * 0.58,
        opacity: delta === 0 ? 1 : opacity * 0.55,
        rotateX: 0,
        rotateY: 0,
        rotateZ: delta * 5,
        zIndex: 50 - abs,
        transition: SPRING_HYPER,
      }));
    case "bold-chaos":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * BOLD_STEP + Math.sin(delta * 2) * 28,
        y: Math.sin(delta * 1.4) * 36 + abs * 12,
        scale: delta === 0 ? 1.16 : scale * (0.82 - abs * 0.04),
        opacity,
        rotateX: delta === 0 ? -8 : abs * 3,
        rotateY: delta * -24,
        rotateZ: delta * 18,
        zIndex: 50 - abs,
        transition: SPRING_HYPER,
      }));
    case "bold-storm":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * BOLD_STEP,
        y: Math.sin(delta * 1.8) * 32 + abs * 10,
        scale,
        opacity: delta === 0 ? 1 : opacity * 0.65,
        rotateX: 0,
        rotateY: 0,
        rotateZ: delta * 9,
        zIndex: 50 - abs,
        filter: delta === 0 ? "none" : "blur(1.8px) brightness(0.85)",
        transition: SPRING_WILD,
      }));
    case "bold-flip":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * BOLD_STEP,
        y: delta === 0 ? -22 : abs * 12,
        scale: delta === 0 ? 1.1 : scale * 0.9,
        opacity,
        rotateX: delta === 0 ? 0 : -12 - abs * 4,
        rotateY: delta * -18,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: SPRING_WILD,
      }));
    case "bold-maxtilt":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * BOLD_STEP,
        y: abs * 8,
        scale,
        opacity,
        rotateX: 0,
        rotateY: delta === 0 ? 0 : delta * -68,
        rotateZ: 0,
        zIndex: 50 - abs,
        transition: SPRING_WILD,
      }));
    case "bold-dash":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * (BOLD_STEP + 24) + (delta !== 0 ? delta * 8 : 0),
        y: delta === 0 ? -10 : abs * 6,
        scale: delta === 0 ? 1.14 : scale * 0.9,
        opacity,
        rotateX: 0,
        rotateY: 0,
        rotateZ: delta * 7,
        zIndex: 50 - abs,
        transition: EASE_WHIP,
      }));
    case "bold-helix":
      return deckVariantMotion(delta, abs, reduceMotion, ({ scale, opacity }) => ({
        x: delta * BOLD_STEP,
        y: Math.sin(delta * 1.25) * 34 + delta * 6,
        scale,
        opacity,
        rotateX: abs * 2,
        rotateY: delta * -12,
        rotateZ: delta * (6 + abs * 3),
        zIndex: 50 - abs,
        transition: SPRING_HYPER,
      }));
    default:
      return null;
  }
}

export function librosShowcaseUsesPerspective(
  animationId: LibrosShowcaseAnimationId,
): boolean {
  return DECK_PERSPECTIVE_IDS.has(animationId);
}

export function librosShowcaseItemMotion(
  animationId: LibrosShowcaseAnimationId,
  index: number,
  activeIndex: number,
  reduceMotion: boolean,
): LibrosShowcaseItemMotion {
  const delta = index - activeIndex;
  const abs = Math.abs(delta);
  const instant: Transition = {
    duration: reduceMotion ? 0.01 : 0.22,
    ease: "easeOut",
  };

  if (animationId === "cover-flow") {
    return referenceDeckMotion(delta, abs, reduceMotion);
  }

  const express = expressPreset(animationId, delta, abs, reduceMotion);
  if (express) return express;

  const deck = deckPreset(animationId, delta, abs, reduceMotion);
  if (deck) return deck;

  if (reduceMotion) {
    return {
      x: delta * 125,
      y: 0,
      scale: delta === 0 ? 1 : 0.85,
      opacity: delta === 0 ? 1 : 0.5,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      zIndex: 10 - abs,
      transition: instant,
    };
  }

  switch (animationId) {
    case "spring-carousel":
      return {
        x: delta * 172,
        y: 0,
        scale: delta === 0 ? 1.04 : 0.7,
        opacity: delta === 0 ? 1 : 0.38,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 20 - abs,
        transition: SPRING_SNAPPY,
      };
    case "vertical-lift":
      return {
        x: delta * 140,
        y: delta === 0 ? -28 : abs * 4,
        scale: delta === 0 ? 1.02 : 0.74,
        opacity: delta === 0 ? 1 : 0.48,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 20 - abs,
        transition: SPRING_SNAPPY,
      };
    case "crossfade":
      return {
        x: delta * 115,
        y: 0,
        scale: delta === 0 ? 1 : 0.78,
        opacity: delta === 0 ? 1 : 0.28,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 10 - abs,
        filter: delta === 0 ? "none" : "saturate(0.75)",
        transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
      };
    case "focus-scale":
    default:
      return {
        x: delta * 166,
        y: 0,
        scale: delta === 0 ? 1.06 : 0.68,
        opacity: delta === 0 ? 1 : 0.36,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 20 - abs,
        transition: EASE_SMOOTH,
      };
  }
}
