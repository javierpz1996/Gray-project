import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type LenisGsapBridgeOptions = {
  /** Contenedor con overflow; si no hay, scroll del documento. */
  scrollerEl?: HTMLElement | null;
  /** Igual que Gachiakuta World Takeover (lerp 0.1). */
  lerp?: number;
};

export type LenisGsapBridge = {
  lenis: Lenis;
  destroy: () => void;
};

/**
 * Inercia tipo Lenis + sincronía con ScrollTrigger (patrón GSAP/Lenis).
 * @see https://world-takeover.gachiakuta-anime.com/
 */
export function createLenisGsapBridge(
  options: LenisGsapBridgeOptions = {},
): LenisGsapBridge | null {
  if (typeof window === "undefined") return null;

  const { scrollerEl, lerp = 0.1 } = options;

  const contentEl =
    scrollerEl?.querySelector<HTMLElement>("[data-lenis-content]") ?? null;

  if (scrollerEl && !contentEl) {
    return null;
  }

  const lenis = scrollerEl
    ? new Lenis({
        wrapper: scrollerEl,
        content: contentEl as HTMLElement,
        lerp,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      })
    : new Lenis({
        lerp,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      });

  const scrollTarget = scrollerEl ?? document.documentElement;

  ScrollTrigger.scrollerProxy(scrollTarget, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value as number, { immediate: true });
      }
      return lenis.animatedScroll;
    },
    getBoundingClientRect() {
      if (scrollerEl) {
        return {
          top: 0,
          left: 0,
          width: scrollerEl.clientWidth,
          height: scrollerEl.clientHeight,
        };
      }
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  const onLenisScroll = () => {
    ScrollTrigger.update();
  };
  lenis.on("scroll", onLenisScroll);

  const onRefresh = () => {
    lenis.resize();
  };
  ScrollTrigger.addEventListener("refresh", onRefresh);

  const onTick = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  if (!scrollerEl) {
    document.documentElement.classList.add("lenis", "lenis-smooth");
  } else {
    scrollerEl.classList.add("lenis", "lenis-smooth");
  }

  return {
    lenis,
    destroy() {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(scrollTarget);
      if (!scrollerEl) {
        document.documentElement.classList.remove("lenis", "lenis-smooth");
      } else {
        scrollerEl.classList.remove("lenis", "lenis-smooth");
      }
    },
  };
}
