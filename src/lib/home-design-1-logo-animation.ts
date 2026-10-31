import type { TargetAndTransition, Transition } from "motion/react";
import type { HomeDesign1HeroAnimationId } from "@/lib/home-design-1-hero-animation";
import {
  getHomeDesign1LogoMotion,
  homeDesign1LogoDelayS,
} from "@/lib/home-design-1-hero-motion-presets";

/** 0 = el logo sigue la animación del hero elegida. */
export const HOME_DESIGN1_LOGO_ANIMATION_IDS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
] as const;

export type HomeDesign1LogoAnimationId =
  (typeof HOME_DESIGN1_LOGO_ANIMATION_IDS)[number];

export const homeDesign1LogoAnimations: ReadonlyArray<{
  id: HomeDesign1LogoAnimationId;
  label: string;
  hint: string;
}> = [
  { id: 0, label: "Del hero", hint: "Sigue la animación hero elegida" },
  { id: 1, label: "Moneda", hint: "Giro 3D de tres vueltas sobre su eje" },
  { id: 2, label: "Lanzada", hint: "Sube girando como moneda y cae con rebote" },
  { id: 3, label: "Canto", hint: "Giro plano tipo moneda de videojuego, se repite" },
  { id: 4, label: "Sello", hint: "Cae enorme y estampa con temblor" },
  { id: 5, label: "Rebote", hint: "Cae desde arriba con rebotes" },
  { id: 6, label: "Elástico", hint: "Se estira y vuelve como goma" },
  { id: 7, label: "Péndulo", hint: "Oscila colgado hasta frenar" },
  { id: 8, label: "Remolino", hint: "Entra girando en espiral" },
  { id: 9, label: "Vinilo", hint: "Entra y gira lento sin parar" },
  { id: 10, label: "Latido", hint: "Late como un corazón" },
  { id: 11, label: "Carta", hint: "Volteo vertical tipo naipe" },
  { id: 12, label: "Portal", hint: "Aparece desde un punto, desenfocado" },
  { id: 13, label: "Imán", hint: "Se acerca desde lejos y se clava" },
  { id: 14, label: "Flotar", hint: "Entra y queda flotando suave" },
  { id: 15, label: "Glitch", hint: "Saltos y parpadeos digitales" },
  { id: 16, label: "Gelatina", hint: "Tambaleo blando al aterrizar" },
  { id: 17, label: "Eclipse", hint: "Sale de la oscuridad con un destello" },
] as const;

const logoAnimationIdSet = new Set<number>(HOME_DESIGN1_LOGO_ANIMATION_IDS);

export function parseHomeDesign1LogoAnimation(
  value: string | string[] | undefined,
): HomeDesign1LogoAnimationId {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === undefined || raw === "") return 0;
  const n = Number.parseInt(raw, 10);
  return logoAnimationIdSet.has(n) ? (n as HomeDesign1LogoAnimationId) : 0;
}

/** URL del diseño 1 conservando la animación hero y la del logo. */
export function homeDesign1Href({
  design = 1,
  hero = 3,
  logo = 0,
}: {
  design?: 1 | 10;
  hero?: HomeDesign1HeroAnimationId;
  logo?: HomeDesign1LogoAnimationId;
}): string {
  const params = new URLSearchParams({ diseno: String(design) });
  if (hero !== 3) params.set("hero", String(hero));
  if (logo !== 0) params.set("logo", String(logo));
  return `/?${params.toString()}`;
}

type LogoStep = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
};

export type HomeDesign1LogoMotion = {
  /** Entrada del contenedor del logo. */
  enter: LogoStep;
  /** Movimiento continuo del disco una vez que entró. */
  idle?: { animate: TargetAndTransition; transition: Transition };
};

const BOUNCE = [0.34, 1.56, 0.64, 1] as const;

export function getHomeDesign1LogoAnimation(
  logoId: HomeDesign1LogoAnimationId,
  heroId: HomeDesign1HeroAnimationId,
  reducedMotion: boolean,
): HomeDesign1LogoMotion {
  const delay = homeDesign1LogoDelayS(heroId);

  if (logoId === 0) {
    return { enter: getHomeDesign1LogoMotion(heroId, reducedMotion) };
  }

  if (reducedMotion) {
    return {
      enter: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2, delay },
      },
    };
  }

  switch (logoId) {
    case 1:
      return {
        enter: {
          initial: { opacity: 0, rotateY: -1080, scale: 0.6 },
          animate: { opacity: 1, rotateY: 0, scale: 1 },
          transition: {
            rotateY: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay },
            scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay },
            opacity: { duration: 0.25, delay },
          },
        },
      };
    case 2:
      return {
        enter: {
          initial: { opacity: 0, y: "60%", rotateX: 0, scale: 0.5 },
          animate: {
            opacity: [0, 1, 1, 1, 1, 1],
            y: ["60%", "-90%", "-90%", "0%", "-8%", "0%"],
            rotateX: [0, 540, 900, 1080, 1080, 1080],
            scale: [0.5, 0.8, 0.8, 1, 1, 1],
          },
          transition: {
            duration: 1.5,
            times: [0, 0.35, 0.55, 0.8, 0.9, 1],
            ease: "easeInOut",
            delay,
          },
        },
      };
    case 3:
      return {
        enter: {
          initial: { opacity: 0, scale: 0.7 },
          animate: { opacity: 1, scale: 1 },
          transition: { type: "spring", stiffness: 320, damping: 20, delay },
        },
        idle: {
          animate: { scaleX: [1, 0.05, -1, 0.05, 1] },
          transition: {
            duration: 0.9,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2.4,
            delay: delay + 0.8,
          },
        },
      };
    case 4:
      return {
        enter: {
          initial: { opacity: 0, scale: 3.2, rotate: -14 },
          animate: {
            opacity: [0, 1, 1, 1, 1, 1],
            scale: [3.2, 0.92, 1.04, 1, 1, 1],
            rotate: [-14, 0, 0, 0, 0, 0],
            x: [0, 0, -6, 5, -3, 0],
          },
          transition: {
            duration: 0.75,
            times: [0, 0.45, 0.6, 0.72, 0.86, 1],
            ease: "easeOut",
            delay,
          },
        },
      };
    case 5:
      return {
        enter: {
          initial: { opacity: 0, y: "-220%" },
          animate: {
            opacity: [0, 1, 1, 1, 1, 1],
            y: ["-220%", "0%", "-28%", "0%", "-8%", "0%"],
            scaleY: [1, 0.82, 1.06, 0.94, 1.02, 1],
          },
          transition: {
            duration: 1.2,
            times: [0, 0.35, 0.55, 0.72, 0.86, 1],
            ease: "easeOut",
            delay,
          },
        },
      };
    case 6:
      return {
        enter: {
          initial: { opacity: 0, scaleX: 0.2, scaleY: 1.8 },
          animate: {
            opacity: 1,
            scaleX: [0.2, 1.35, 0.85, 1.1, 0.96, 1],
            scaleY: [1.8, 0.7, 1.15, 0.92, 1.03, 1],
          },
          transition: { duration: 1, ease: "easeOut", delay },
        },
      };
    case 7:
      return {
        enter: {
          initial: { opacity: 0, rotate: 70, y: "-40%" },
          animate: {
            opacity: 1,
            y: "0%",
            rotate: [70, -45, 28, -16, 8, -3, 0],
          },
          transition: {
            duration: 1.8,
            ease: "easeInOut",
            delay,
          },
        },
      };
    case 8:
      return {
        enter: {
          initial: { opacity: 0, rotate: -720, scale: 0, x: "-120%" },
          animate: { opacity: 1, rotate: 0, scale: 1, x: "0%" },
          transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1], delay },
        },
      };
    case 9:
      return {
        enter: {
          initial: { opacity: 0, scale: 0.4, rotate: -180 },
          animate: { opacity: 1, scale: 1, rotate: 0 },
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
        },
        idle: {
          animate: { rotate: 360 },
          transition: {
            duration: 9,
            ease: "linear",
            repeat: Infinity,
            delay: delay + 0.9,
          },
        },
      };
    case 10:
      return {
        enter: {
          initial: { opacity: 0, scale: 0.6 },
          animate: { opacity: 1, scale: 1 },
          transition: { type: "spring", stiffness: 300, damping: 16, delay },
        },
        idle: {
          animate: { scale: [1, 1.12, 1, 1.08, 1] },
          transition: {
            duration: 1.1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.7,
            delay: delay + 0.6,
          },
        },
      };
    case 11:
      return {
        enter: {
          initial: { opacity: 0, rotateX: -180, scale: 0.8 },
          animate: { opacity: 1, rotateX: 0, scale: 1 },
          transition: {
            rotateX: { duration: 0.9, ease: BOUNCE, delay },
            scale: { duration: 0.9, ease: BOUNCE, delay },
            opacity: { duration: 0.2, delay },
          },
        },
      };
    case 12:
      return {
        enter: {
          initial: { opacity: 0, scale: 0, filter: "blur(18px)" },
          animate: {
            opacity: 1,
            scale: [0, 1.25, 1],
            filter: ["blur(18px)", "blur(4px)", "blur(0px)"],
          },
          transition: { duration: 0.9, ease: "easeOut", delay },
        },
      };
    case 13:
      return {
        enter: {
          initial: { opacity: 0, scale: 0.08, rotate: 25 },
          animate: {
            opacity: 1,
            scale: [0.08, 0.3, 1.12, 1],
            rotate: [25, 10, -3, 0],
          },
          transition: {
            duration: 0.85,
            times: [0, 0.55, 0.85, 1],
            ease: "easeIn",
            delay,
          },
        },
      };
    case 14:
      return {
        enter: {
          initial: { opacity: 0, y: "35%", filter: "blur(8px)" },
          animate: { opacity: 1, y: "0%", filter: "blur(0px)" },
          transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
        },
        idle: {
          animate: { y: ["0%", "-5%", "0%"], rotate: [0, 2, 0, -2, 0] },
          transition: {
            duration: 3.6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: delay + 1.1,
          },
        },
      };
    case 15:
      return {
        enter: {
          initial: { opacity: 0 },
          animate: {
            opacity: [0, 1, 0.2, 1, 0, 1, 1],
            x: [0, -12, 9, -4, 6, 0, 0],
            skewX: [0, 14, -10, 6, 0, 0, 0],
            filter: [
              "hue-rotate(0deg)",
              "hue-rotate(90deg)",
              "hue-rotate(-60deg)",
              "hue-rotate(40deg)",
              "hue-rotate(0deg)",
              "hue-rotate(0deg)",
              "hue-rotate(0deg)",
            ],
          },
          transition: { duration: 0.7, ease: "linear", delay },
        },
      };
    case 16:
      return {
        enter: {
          initial: { opacity: 0, scale: 0.3 },
          animate: {
            opacity: 1,
            scale: 1,
            skewX: [0, -12, 9, -6, 3, 0],
            skewY: [0, 6, -5, 3, -1, 0],
          },
          transition: {
            scale: { type: "spring", stiffness: 260, damping: 14, delay },
            opacity: { duration: 0.2, delay },
            skewX: { duration: 1, ease: "easeOut", delay: delay + 0.2 },
            skewY: { duration: 1, ease: "easeOut", delay: delay + 0.2 },
          },
        },
      };
    case 17:
      return {
        enter: {
          initial: { opacity: 0, filter: "brightness(0) blur(6px)", scale: 0.9 },
          animate: {
            opacity: 1,
            scale: [0.9, 1.06, 1],
            filter: [
              "brightness(0) blur(6px)",
              "brightness(2.2) blur(0px)",
              "brightness(1) blur(0px)",
            ],
          },
          transition: { duration: 1.2, times: [0, 0.6, 1], ease: "easeOut", delay },
        },
      };
  }
}
