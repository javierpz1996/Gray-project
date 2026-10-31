import type { Transition } from "motion/react";
import type { HomeDesign1HeroAnimationId } from "@/lib/home-design-1-hero-animation";

export const HOME_DESIGN1_MOTION_STEP_S = 0.52;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export type HomeDesign1PanelSlot = "left" | "center" | "right";

export type HomeDesign1MotionStepConfig = {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  transition: Transition;
};

function reducedTransition(base: Transition, reduced: boolean): Transition {
  if (!reduced) return base;
  return { duration: 0.22, ease: EASE_OUT, delay: base.delay ?? 0 };
}

export function homeDesign1PanelDelayS(
  animationId: HomeDesign1HeroAnimationId,
  slot: HomeDesign1PanelSlot,
): number {
  const step = HOME_DESIGN1_MOTION_STEP_S;
  switch (animationId) {
    case 5:
      return 0;
    case 6:
      return slot === "left" ? 0 : slot === "center" ? 0.18 : 0.36;
    case 7:
      return slot === "left" ? 0.72 : slot === "center" ? 0.88 : 1.04;
    case 10:
      if (slot === "right") return step;
      if (slot === "center") return step * 2;
      return step * 3;
    case 13:
      if (slot === "center") return 0;
      if (slot === "left") return step * 0.85;
      return step * 1.7;
    case 14:
      return slot === "left" ? 0 : slot === "center" ? 0.07 : 0.14;
    case 16:
      return step * 1.1 + (slot === "left" ? 0 : slot === "center" ? step * 0.35 : step * 0.7);
    case 17:
      return slot === "left" ? 0.14 : slot === "center" ? 0.22 : 0.3;
    case 18:
      if (slot === "right") return 0;
      if (slot === "center") return step * 0.75;
      return step * 1.5;
    default:
      if (slot === "left") return 0;
      if (slot === "center") return step;
      return step * 2;
  }
}

export function homeDesign1LogoDelayS(
  animationId: HomeDesign1HeroAnimationId,
): number {
  switch (animationId) {
    case 5:
      return HOME_DESIGN1_MOTION_STEP_S + 0.2;
    case 7:
      return 1.25;
    case 10:
    case 16:
      return 0;
    case 17:
      return 0.52;
    case 14:
      return HOME_DESIGN1_MOTION_STEP_S * 2.2;
    default:
      return HOME_DESIGN1_MOTION_STEP_S * 3;
  }
}

export function homeDesign1DividerDelayS(
  animationId: HomeDesign1HeroAnimationId,
  divider: "first" | "second",
): number {
  const step = HOME_DESIGN1_MOTION_STEP_S;
  switch (animationId) {
    case 5:
      return divider === "first" ? step + 0.1 : step + 0.28;
    case 7:
      return divider === "first" ? 0.08 : 0.32;
    case 10:
      return divider === "first" ? step * 2 : step * 3;
    case 13:
      return divider === "first" ? step * 0.5 : step * 1.35;
    case 17:
      return divider === "first" ? 0 : 0.06;
    case 18:
      return divider === "first" ? step * 1.4 : step * 2.1;
    default:
      return divider === "first" ? step : step * 2;
  }
}

function panelTransition(
  animationId: HomeDesign1HeroAnimationId,
  slot: HomeDesign1PanelSlot,
  reduced: boolean,
  transition: Transition,
): Transition {
  return reducedTransition(
    { ...transition, delay: homeDesign1PanelDelayS(animationId, slot) },
    reduced,
  );
}

export function homeDesign1PanelTransformOrigin(
  animationId: HomeDesign1HeroAnimationId,
  slot: HomeDesign1PanelSlot,
): string {
  if (animationId === 12) {
    if (slot === "left") return "0% 100%";
    if (slot === "right") return "100% 100%";
    return "50% 100%";
  }
  if (animationId === 18) {
    if (slot === "left") return "0% 50%";
    if (slot === "right") return "100% 50%";
    return "50% 50%";
  }
  return "center";
}

export function getHomeDesign1PanelMotion(
  animationId: HomeDesign1HeroAnimationId,
  slot: HomeDesign1PanelSlot,
  reducedMotion: boolean,
): HomeDesign1MotionStepConfig {
  switch (animationId) {
    case 1:
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          duration: 0.65,
          ease: EASE_OUT,
        }),
      };
    case 2:
      return {
        initial: {
          opacity: 0,
          x: slot === "left" ? "-45%" : slot === "right" ? "45%" : 0,
          y: slot === "center" ? "28%" : 0,
          filter: "blur(10px)",
        },
        animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
        transition: panelTransition(animationId, slot, reducedMotion, {
          type: "spring",
          stiffness: 260,
          damping: 28,
        }),
      };
    case 3:
      return {
        initial: { opacity: 0, scale: 0.82 },
        animate: { opacity: 1, scale: 1 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          type: "spring",
          stiffness: 380,
          damping: 20,
          mass: 0.8,
        }),
      };
    case 4:
      return {
        initial: {
          opacity: 0,
          scale: 0.6,
          rotate: slot === "left" ? -8 : slot === "right" ? 8 : 0,
          x: slot === "left" ? "-25%" : slot === "right" ? "25%" : 0,
        },
        animate: { opacity: 1, scale: 1, rotate: 0, x: 0 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          duration: 0.75,
          ease: EASE_OUT,
        }),
      };
    case 5:
      return {
        initial: { opacity: 0, scale: 1.22 },
        animate: { opacity: 1, scale: 1 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          type: "spring",
          stiffness: 200,
          damping: 18,
        }),
      };
    case 6:
      return {
        initial: { opacity: 0, scale: 0.55, y: "8%" },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          type: "spring",
          stiffness: 640,
          damping: 32,
        }),
      };
    case 7:
      return {
        initial: { opacity: 0, scale: 1.08 },
        animate: { opacity: 1, scale: 1 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          duration: 0.45,
          ease: EASE_OUT,
        }),
      };
    case 8:
      return {
        initial: {
          opacity: 0,
          scale: 0.35,
          rotate: slot === "left" ? -18 : slot === "right" ? 18 : -6,
        },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          type: "spring",
          stiffness: 480,
          damping: 16,
        }),
      };
    case 9:
      return {
        initial: { opacity: 0, y: "35%", filter: "blur(8px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: panelTransition(animationId, slot, reducedMotion, {
          type: "spring",
          stiffness: 90,
          damping: 22,
          mass: 1.2,
        }),
      };
    case 10:
      return {
        initial: {
          opacity: 0,
          x: slot === "left" ? "-20%" : slot === "right" ? "20%" : 0,
          scale: 0.9,
        },
        animate: { opacity: 1, x: 0, scale: 1 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          duration: 0.5,
          ease: EASE_OUT,
        }),
      };
    case 11:
      return {
        initial: { opacity: 0, y: "-105%" },
        animate: { opacity: 1, y: 0 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          type: "spring",
          stiffness: 180,
          damping: 22,
        }),
      };
    case 12:
      return {
        initial: { opacity: 0, scaleY: 0 },
        animate: { opacity: 1, scaleY: 1 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          duration: 0.55,
          ease: EASE_OUT,
        }),
      };
    case 13:
      return {
        initial: { opacity: 0, scale: slot === "center" ? 0.4 : 0.85, y: "12%" },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          type: "spring",
          stiffness: 220,
          damping: 24,
        }),
      };
    case 14:
      return {
        initial: {
          opacity: 0,
          x: slot === "left" ? "-8%" : slot === "right" ? "8%" : "-4%",
          y: slot === "center" ? "4%" : "-3%",
        },
        animate: { opacity: 1, x: 0, y: 0 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          type: "spring",
          stiffness: 820,
          damping: 38,
        }),
      };
    case 15:
      return {
        initial: {
          opacity: 0,
          x: slot === "left" ? "-35%" : slot === "right" ? "35%" : 0,
          y: slot === "center" ? "-38%" : "-28%",
          rotate: slot === "left" ? -6 : slot === "right" ? 6 : 0,
        },
        animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          type: "spring",
          stiffness: 200,
          damping: 20,
        }),
      };
    case 16:
      return {
        initial: { opacity: 0, scale: 0.88 },
        animate: { opacity: 1, scale: 1 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          type: "spring",
          stiffness: 300,
          damping: 14,
        }),
      };
    case 17:
      return {
        initial: { opacity: 0, scale: 1.06 },
        animate: { opacity: 1, scale: 1 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          duration: 0.18,
          ease: EASE_OUT,
        }),
      };
    case 18:
      return {
        initial: {
          opacity: 0,
          scaleX: 0,
          scaleY: 1,
        },
        animate: { opacity: 1, scaleX: 1, scaleY: 1 },
        transition: panelTransition(animationId, slot, reducedMotion, {
          duration: 0.62,
          ease: EASE_OUT,
        }),
      };
    default:
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: panelTransition(1, slot, reducedMotion, {
          duration: 0.6,
          ease: EASE_OUT,
        }),
      };
  }
}

export function getHomeDesign1LogoMotion(
  animationId: HomeDesign1HeroAnimationId,
  reducedMotion: boolean,
): HomeDesign1MotionStepConfig {
  const delay = homeDesign1LogoDelayS(animationId);

  switch (animationId) {
    case 5:
      return {
        initial: { opacity: 0, scale: 0.5, rotate: -12 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        transition: reducedTransition(
          { type: "spring", stiffness: 340, damping: 18, delay },
          reducedMotion,
        ),
      };
    case 8:
      return {
        initial: { opacity: 0, scale: 0.2, rotate: 160 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        transition: reducedTransition(
          { type: "spring", stiffness: 420, damping: 14, delay },
          reducedMotion,
        ),
      };
    case 10:
      return {
        initial: { opacity: 0, scale: 0.4, y: "20%" },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: reducedTransition(
          { type: "spring", stiffness: 300, damping: 20, delay },
          reducedMotion,
        ),
      };
    case 14:
      return {
        initial: { opacity: 0, scale: 0.92, rotate: -4 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        transition: reducedTransition(
          { type: "spring", stiffness: 520, damping: 26, delay },
          reducedMotion,
        ),
      };
    case 16:
      return {
        initial: { opacity: 0, scale: 1.45 },
        animate: { opacity: 1, scale: 1 },
        transition: reducedTransition(
          { type: "spring", stiffness: 260, damping: 12, delay },
          reducedMotion,
        ),
      };
    case 17:
      return {
        initial: { opacity: 0, scale: 0.55 },
        animate: { opacity: 1, scale: 1 },
        transition: reducedTransition(
          { type: "spring", stiffness: 680, damping: 28, delay },
          reducedMotion,
        ),
      };
    case 18:
      return {
        initial: { opacity: 0, scale: 0.7, scaleX: 0.4 },
        animate: { opacity: 1, scale: 1, scaleX: 1 },
        transition: reducedTransition(
          { duration: 0.45, ease: EASE_OUT, delay },
          reducedMotion,
        ),
      };
    default:
      return {
        initial: { opacity: 0, scale: 0.75 },
        animate: { opacity: 1, scale: 1 },
        transition: reducedTransition(
          {
            type: "spring",
            stiffness: animationId === 3 ? 380 : 320,
            damping: 22,
            delay,
          },
          reducedMotion,
        ),
      };
  }
}

export function getHomeDesign1DividerMotion(
  animationId: HomeDesign1HeroAnimationId,
  divider: "first" | "second",
  reducedMotion: boolean,
): HomeDesign1MotionStepConfig {
  const delay = homeDesign1DividerDelayS(animationId, divider);

  if (animationId === 7) {
    return {
      initial: { pathLength: 0, opacity: 0.4 },
      animate: { pathLength: 1, opacity: 1 },
      transition: reducedTransition(
        { duration: 0.7, ease: EASE_OUT, delay },
        reducedMotion,
      ),
    };
  }

  if (animationId === 2) {
    return {
      initial: { opacity: 0, scaleY: 0, rotate: divider === "first" ? -4 : 4 },
      animate: { opacity: 1, scaleY: 1, rotate: 0 },
      transition: reducedTransition(
        { duration: 0.4, ease: EASE_OUT, delay },
        reducedMotion,
      ),
    };
  }

  if (animationId === 8) {
    return {
      initial: { pathLength: 0, opacity: 0, scale: 1.2 },
      animate: { pathLength: 1, opacity: 1, scale: 1 },
      transition: reducedTransition(
        { duration: 0.35, ease: EASE_OUT, delay },
        reducedMotion,
      ),
    };
  }

  if (animationId === 13) {
    return {
      initial: { pathLength: 0, opacity: 0.5 },
      animate: { pathLength: 1, opacity: 1 },
      transition: reducedTransition(
        { duration: 0.55, ease: EASE_OUT, delay },
        reducedMotion,
      ),
    };
  }

  if (animationId === 17) {
    return {
      initial: { pathLength: 0, opacity: 0.3 },
      animate: { pathLength: 1, opacity: 1 },
      transition: reducedTransition(
        { duration: 0.22, ease: EASE_OUT, delay },
        reducedMotion,
      ),
    };
  }

  if (animationId === 11) {
    return {
      initial: { opacity: 0, pathLength: 0.3 },
      animate: { opacity: 1, pathLength: 1 },
      transition: reducedTransition(
        { duration: 0.45, ease: EASE_OUT, delay },
        reducedMotion,
      ),
    };
  }

  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: reducedTransition(
      { duration: 0.35, ease: EASE_OUT, delay },
      reducedMotion,
    ),
  };
}
