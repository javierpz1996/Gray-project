"use client";

import { useEffect, useState } from "react";
import {
  HOME_DESIGN1_REPLAY_EVENT,
  HOME_SITE_INTRO_COMPLETE_EVENT,
  isSiteIntroComplete,
} from "@/lib/home-design-1-animation";
import type { HomeDesign1HeroAnimationId } from "@/lib/home-design-1-hero-animation";

/** Espera al intro de carga y expone `runId` / `motionKey` compartidos por diseño 1 y 10. */
export function useHomeDesign1HeroRun(heroAnimation: HomeDesign1HeroAnimationId) {
  const [introReady, setIntroReady] = useState(() => isSiteIntroComplete());
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const onIntroComplete = () => {
      setIntroReady(true);
      setRunId((value) => value + 1);
    };
    const onReplay = () => setRunId((value) => value + 1);

    window.addEventListener(HOME_SITE_INTRO_COMPLETE_EVENT, onIntroComplete);
    window.addEventListener(HOME_DESIGN1_REPLAY_EVENT, onReplay);
    return () => {
      window.removeEventListener(HOME_SITE_INTRO_COMPLETE_EVENT, onIntroComplete);
      window.removeEventListener(HOME_DESIGN1_REPLAY_EVENT, onReplay);
    };
  }, []);

  useEffect(() => {
    setRunId((value) => value + 1);
  }, [heroAnimation]);

  const motionKey = `${heroAnimation}-${runId}`;

  return { introReady, motionKey };
}

/** Motion congelado en `initial` hasta que termine el intro de carga. */
export function gateHomeDesign1HeroMotion<T extends { initial: unknown; animate: unknown; transition: unknown }>(
  introReady: boolean,
  config: T,
): Pick<T, "initial" | "animate" | "transition"> {
  if (introReady) {
    return {
      initial: config.initial,
      animate: config.animate,
      transition: config.transition,
    };
  }
  return {
    initial: config.initial,
    animate: config.initial,
    transition: { duration: 0 },
  };
}
