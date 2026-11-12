import { useCallback, useEffect, useRef } from "react";
import type { Swiper as SwiperInstance } from "swiper";

type KvDimAnim = {
  start: number;
  duration: number;
  startDims: Map<HTMLElement, number>;
};

function kvDimEase(t: number) {
  return 1 - (1 - t) ** 3;
}

function getKvSlideDimTarget(slide: HTMLElement) {
  return slide.classList.contains("swiper-slide-active") ? 0 : 1;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useOmsKvDim() {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const rafRef = useRef(0);
  const animRef = useRef<KvDimAnim | null>(null);

  const setDimDirect = useCallback((isDirect: boolean) => {
    swiperRef.current?.el.classList.toggle("is-kv-dim-direct", isDirect);
  }, []);

  const updateKvSlideDim = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed) return;

    const reduced = prefersReducedMotion();
    const animT =
      animRef.current && swiper.animating
        ? kvDimEase(Math.min(1, (performance.now() - animRef.current.start) / animRef.current.duration))
        : null;

    for (const slide of swiper.slides) {
      const el = slide as HTMLElement;
      let dim: number;
      if (reduced) {
        dim = getKvSlideDimTarget(el);
      } else if (animT !== null && animRef.current) {
        const from = animRef.current.startDims.get(el) ?? 1;
        const to = getKvSlideDimTarget(el);
        dim = from + (to - from) * animT;
      } else {
        const progress = typeof slide.progress === "number" ? slide.progress : 0;
        dim = Math.min(1, Math.abs(progress));
      }
      el.style.setProperty("--oms-kv-dim", String(Math.round(dim * 100) / 100));
    }
  }, []);

  const tickKvSlideDim = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed) {
      rafRef.current = 0;
      return;
    }
    swiper.updateProgress();
    updateKvSlideDim();
    rafRef.current = requestAnimationFrame(tickKvSlideDim);
  }, [updateKvSlideDim]);

  const startKvDimLoop = useCallback(() => {
    setDimDirect(true);
    if (!rafRef.current) {
      tickKvSlideDim();
    }
  }, [setDimDirect, tickKvSlideDim]);

  const stopKvDimLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    setDimDirect(false);
  }, [setDimDirect]);

  const beginKvDimTransition = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const startDims = new Map<HTMLElement, number>();
    for (const slide of swiper.slides) {
      const el = slide as HTMLElement;
      const current = parseFloat(el.style.getPropertyValue("--oms-kv-dim"));
      startDims.set(el, Number.isNaN(current) ? 1 : current);
    }
    animRef.current = {
      start: performance.now(),
      duration: swiper.params.speed ?? 800,
      startDims,
    };
    startKvDimLoop();
  }, [startKvDimLoop]);

  const endKvDimTransition = useCallback(() => {
    animRef.current = null;
    stopKvDimLoop();
    updateKvSlideDim();
  }, [stopKvDimLoop, updateKvSlideDim]);

  const bindKvSwiper = useCallback(
    (swiper: SwiperInstance) => {
      swiperRef.current = swiper;
      updateKvSlideDim();
    },
    [updateKvSlideDim],
  );

  const onKvTouchEnd = useCallback(() => {
    startKvDimLoop();
    window.setTimeout(() => {
      const swiper = swiperRef.current;
      if (swiper && !swiper.animating && rafRef.current) {
        stopKvDimLoop();
        updateKvSlideDim();
      }
    }, 50);
  }, [startKvDimLoop, stopKvDimLoop, updateKvSlideDim]);

  useEffect(
    () => () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    },
    [],
  );

  return {
    bindKvSwiper,
    beginKvDimTransition,
    endKvDimTransition,
    startKvDimLoop,
    onKvTouchEnd,
  };
}
