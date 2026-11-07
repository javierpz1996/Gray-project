import { useEffect, type RefObject } from "react";

/** Trackpad suave: acumular hasta este umbral. */
const WHEEL_ACCUM_THRESHOLD = 28;
/** Rueda / gesto claro en píxeles → un libro al instante. */
const WHEEL_NOTCH_PX = 18;
const WHEEL_MIN_STEP_MS = 165;
const WHEEL_MIN_STEP_REDUCED_MS = 60;

const COVER_HIT_SELECTOR =
  ".libros-showcase__cover-btn, .libros-showcase__cover";

type UseLibrosShowcaseWheelOptions = {
  stageRef: RefObject<HTMLElement | null>;
  onStep: (direction: -1 | 1) => void;
  reduceMotion: boolean;
};

function hitBookCover(stage: HTMLElement, x: number, y: number): boolean {
  if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
    return false;
  }
  const target = document.elementFromPoint(x, y);
  if (!target) return false;
  const cover = target.closest(COVER_HIT_SELECTOR);
  return cover !== null && stage.contains(cover);
}

function resolveWheelDirection(
  event: WheelEvent,
  delta: number,
  deltaAccum: number,
): { direction: -1 | 1; resetAccum: boolean } | null {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    if (delta === 0) return null;
    return { direction: delta > 0 ? 1 : -1, resetAccum: true };
  }

  const absDelta = Math.abs(delta);
  if (absDelta >= WHEEL_NOTCH_PX) {
    return { direction: delta > 0 ? 1 : -1, resetAccum: true };
  }

  const nextAccum = deltaAccum + delta;
  if (Math.abs(nextAccum) < WHEEL_ACCUM_THRESHOLD) {
    return null;
  }
  return {
    direction: nextAccum > 0 ? 1 : -1,
    resetAccum: true,
  };
}

export function useLibrosShowcaseWheel({
  stageRef,
  onStep,
  reduceMotion,
}: UseLibrosShowcaseWheelOptions) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let wheelIntent = false;
    let deltaAccum = 0;
    let lastStepAt = 0;
    const minStepMs = reduceMotion
      ? WHEEL_MIN_STEP_REDUCED_MS
      : WHEEL_MIN_STEP_MS;

    const clearIntent = () => {
      wheelIntent = false;
      deltaAccum = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (event.movementX === 0 && event.movementY === 0) return;

      wheelIntent = hitBookCover(stage, event.clientX, event.clientY);
      if (!wheelIntent) deltaAccum = 0;
    };

    const onScroll = () => {
      clearIntent();
    };

    const onWheel = (event: WheelEvent) => {
      if (!wheelIntent) return;

      if (!hitBookCover(stage, event.clientX, event.clientY)) {
        clearIntent();
        return;
      }

      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;
      if (delta === 0) return;

      event.preventDefault();
      event.stopPropagation();

      const now = performance.now();
      if (now - lastStepAt < minStepMs) return;

      const resolved = resolveWheelDirection(event, delta, deltaAccum);
      if (!resolved) {
        deltaAccum += delta;
        return;
      }

      deltaAccum = resolved.resetAccum ? 0 : deltaAccum;
      lastStepAt = now;
      onStep(resolved.direction);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("wheel", onWheel);
    };
  }, [onStep, reduceMotion, stageRef]);
}
