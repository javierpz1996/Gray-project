/** Evento global para reiniciar la animación Motion del hero diseño 1. */
export const HOME_DESIGN1_REPLAY_EVENT = "gray:home-design-1-replay";

/** El intro de carga terminó: los heroes pueden ejecutar la entrada inicial. */
export const HOME_SITE_INTRO_COMPLETE_EVENT = "gray:site-intro-complete";

let siteIntroComplete = false;

/** `true` cuando no hay intro pendiente o ya terminó (misma pestaña). */
export function isSiteIntroComplete(): boolean {
  return siteIntroComplete;
}

/** Marca el intro como listo y avisa a los heroes (idempotente). */
export function notifySiteIntroComplete(): void {
  if (typeof window === "undefined") return;
  if (siteIntroComplete) return;
  siteIntroComplete = true;
  window.dispatchEvent(new CustomEvent(HOME_SITE_INTRO_COMPLETE_EVENT));
}

/** Reinicia la secuencia Motion del hero diseño 1 (si está montado). */
export function replayHomeDesign1HeroAnimation(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(HOME_DESIGN1_REPLAY_EVENT));
}
