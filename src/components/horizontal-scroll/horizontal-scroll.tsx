"use client";

import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { createLenisGsapBridge, type LenisGsapBridge } from "@/lib/lenis-gsap-bridge";

gsap.registerPlugin(ScrollTrigger);

export type HorizontalScrollHandle = {
  scrollToIndex: (index: number) => void;
};

export type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
  pinClassName?: string;
  trackClassName?: string;
  desktopMinWidth?: number;
  /** Activa pin + scrub (p. ej. tras terminar otra animación). */
  enabled?: boolean;
  /** Contenedor con overflow vertical (overlay o página). Por defecto, viewport. */
  scrollerRef?: RefObject<HTMLElement | null>;
  /** Total de paneles para progreso y scrollToIndex. */
  panelCount?: number;
  onActiveIndexChange?: (index: number) => void;
  /** Pin desde scrollY = offsetTop (sin tramo vertical previo al carril). */
  pinAtDocumentStart?: boolean;
  /**
   * Suavizado del scrub: `true` pegado al scroll; número = segundos de interpolación.
   * Con Lenis activo se fuerza `true` (la inercia la aporta Lenis).
   */
  scrub?: number | boolean;
  /** Inercia tipo Lenis + ScrollTrigger (referencia Gachiakuta). Desktop. @default true */
  smoothScroll?: boolean;
};

/**
 * Scroll vertical → desplazamiento horizontal (pin + scrub).
 * Cada hijo debe ser un `HorizontalPanel`.
 */
export const HorizontalScroll = forwardRef<
  HorizontalScrollHandle,
  HorizontalScrollProps
>(function HorizontalScroll(
  {
    children,
    className,
    pinClassName,
    trackClassName,
    desktopMinWidth = 768,
    enabled = true,
    scrollerRef,
    panelCount = 1,
    onActiveIndexChange,
    pinAtDocumentStart = false,
    scrub = 0.35,
    smoothScroll = true,
  },
  ref,
) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const lenisBridgeRef = useRef<LenisGsapBridge | null>(null);
  const panelCountRef = useRef(panelCount);
  const onActiveIndexChangeRef = useRef(onActiveIndexChange);

  panelCountRef.current = panelCount;
  onActiveIndexChangeRef.current = onActiveIndexChange;

  useImperativeHandle(ref, () => ({
    scrollToIndex(index: number) {
      const tween = tweenRef.current;
      const st = tween?.scrollTrigger;
      if (!st) return;

      const total = panelCountRef.current;
      if (total <= 1) return;

      const clamped = Math.min(total - 1, Math.max(0, index));
      const progress = clamped / (total - 1);
      const scrollerEl = scrollerRef?.current;
      const range = st.end - st.start;
      const target = st.start + progress * range;

      const lenis = lenisBridgeRef.current?.lenis;
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.1, easing: (t) => 1 - (1 - t) ** 4 });
        return;
      }

      if (scrollerEl) {
        scrollerEl.scrollTo({ top: target, behavior: "smooth" });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    },
  }));

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!root || !pin || !track || !enabled) return;

    let cancelled = false;
    let ctx: gsap.Context | null = null;

    const run = () => {
      if (cancelled) return;

      const scrollerEl = scrollerRef?.current ?? undefined;
      if (scrollerRef && !scrollerEl) {
        requestAnimationFrame(run);
        return;
      }

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(
          {
            isDesktop: `(min-width: ${desktopMinWidth}px)`,
            isMobile: `(max-width: ${desktopMinWidth - 1}px)`,
          },
          (context) => {
            const { isDesktop } = context.conditions ?? {};

            if (!isDesktop) {
              gsap.set(track, { clearProps: "transform" });
              return () => {};
            }

            const syncPinWidthVar = () => {
              const w = pin.clientWidth;
              if (w > 0) {
                pin.style.setProperty("--hs-panel-w", `${w}px`);
              }
            };

            const measureDistance = () => {
              const pinWidth = pin.clientWidth;
              if (pinWidth <= 0) return 0;

              syncPinWidthVar();

              const panels =
                track.querySelectorAll<HTMLElement>("[data-horizontal-panel]");
              const lastPanel = panels[panels.length - 1];
              if (lastPanel && panels.length > 1) {
                // Fin del carril: último panel alineado a la izquierda del pin (1 pantalla por panel).
                return Math.max(0, lastPanel.offsetLeft);
              }

              return Math.max(0, track.scrollWidth - pinWidth);
            };

            let tween: gsap.core.Tween | null = null;
            let onScrollerScroll: (() => void) | null = null;
            let mountAttempts = 0;
            let initialScrollSynced = false;
            let previousHtmlScrollBehavior = "";
            let lenisBridge: LenisGsapBridge | null = null;

            const useLenis = smoothScroll;
            if (!scrollerEl && pinAtDocumentStart) {
              ScrollTrigger.clearScrollMemory();
              window.scrollTo(0, 0);
            }

            if (useLenis) {
              lenisBridge = createLenisGsapBridge({ scrollerEl: scrollerEl ?? null });
              lenisBridgeRef.current = lenisBridge;
              if (lenisBridge && pinAtDocumentStart && !scrollerEl) {
                lenisBridge.lenis.scrollTo(0, { immediate: true });
              }
            }

            const effectiveScrub = useLenis && lenisBridge ? true : scrub;

            if (!scrollerEl && !useLenis) {
              previousHtmlScrollBehavior =
                document.documentElement.style.scrollBehavior;
              document.documentElement.style.scrollBehavior = "auto";
            }

            if (scrollerEl && !useLenis) {
              ScrollTrigger.scrollerProxy(scrollerEl, {
                scrollTop(value) {
                  if (arguments.length) {
                    scrollerEl.scrollTop = value as number;
                  }
                  return scrollerEl.scrollTop;
                },
                getBoundingClientRect() {
                  return {
                    top: 0,
                    left: 0,
                    width: scrollerEl.clientWidth,
                    height: scrollerEl.clientHeight,
                  };
                },
              });
              onScrollerScroll = () => {
                ScrollTrigger.update();
              };
              scrollerEl.addEventListener("scroll", onScrollerScroll, {
                passive: true,
              });
            }

            const mount = () => {
              tween?.scrollTrigger?.kill();
              tween?.kill();
              tweenRef.current = null;
              gsap.set(track, { x: 0 });

              const distance = measureDistance();
              if (distance <= 0) {
                return false;
              }

              tween = gsap.to(track, {
                x: () => -measureDistance(),
                ease: "none",
                force3D: true,
                scrollTrigger: {
                  trigger: root,
                  pin: pin,
                  scrub: effectiveScrub,
                  pinType: "transform",
                  start: "top top",
                  end: () => `+=${measureDistance()}`,
                  invalidateOnRefresh: true,
                  anticipatePin: scrollerEl ? 0 : 1,
                  fastScrollEnd: true,
                  ...(scrollerEl ? { scroller: scrollerEl } : {}),
                  onUpdate: (self) => {
                    const total = panelCountRef.current;
                    if (total <= 1) {
                      onActiveIndexChangeRef.current?.(0);
                      return;
                    }
                    const idx = Math.min(
                      total - 1,
                      Math.round(self.progress * (total - 1)),
                    );
                    onActiveIndexChangeRef.current?.(idx);
                  },
                },
              });
              tweenRef.current = tween;
              return true;
            };

            const mountWithRetry = () => {
              if (mount()) {
                mountAttempts = 0;
                return;
              }
              mountAttempts += 1;
              if (mountAttempts < 20) {
                requestAnimationFrame(mountWithRetry);
              }
            };

            mountWithRetry();

            const syncScrollAndRefresh = (resetScroll: boolean) => {
              if (cancelled) return;
              if (resetScroll) {
                if (pinAtDocumentStart && !scrollerEl) {
                  window.scrollTo(0, 0);
                }
                lenisBridge?.lenis.scrollTo(0, { immediate: true });
              }
              ScrollTrigger.refresh();
              mountWithRetry();
              lenisBridge?.lenis.resize();
            };

            const onResize = () => {
              syncScrollAndRefresh(false);
            };

            window.addEventListener("resize", onResize);
            const ro = new ResizeObserver(onResize);
            ro.observe(track);
            ro.observe(pin);
            if (scrollerEl) {
              ro.observe(scrollerEl);
            }

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (!initialScrollSynced) {
                  initialScrollSynced = true;
                  syncScrollAndRefresh(true);
                } else {
                  syncScrollAndRefresh(false);
                }
              });
            });

            void document.fonts.ready.then(() => {
              syncScrollAndRefresh(false);
            });

            const onWindowLoad = () => {
              syncScrollAndRefresh(false);
            };
            if (document.readyState === "complete") {
              syncScrollAndRefresh(false);
            } else {
              window.addEventListener("load", onWindowLoad, { once: true });
            }

            return () => {
              window.removeEventListener("load", onWindowLoad);
              window.removeEventListener("resize", onResize);
              ro.disconnect();
              tween?.scrollTrigger?.kill();
              tween?.kill();
              tweenRef.current = null;
              gsap.set(track, { clearProps: "transform" });
              lenisBridge?.destroy();
              lenisBridgeRef.current = null;
              if (!scrollerEl && !useLenis) {
                document.documentElement.style.scrollBehavior =
                  previousHtmlScrollBehavior;
              }
              if (scrollerEl && !useLenis) {
                if (onScrollerScroll) {
                  scrollerEl.removeEventListener("scroll", onScrollerScroll);
                }
                ScrollTrigger.scrollerProxy(scrollerEl);
              }
            };
          },
        );
      }, root);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    run();

    return () => {
      cancelled = true;
      ctx?.revert();
      ctx = null;
      tweenRef.current = null;
    };
  }, [
    desktopMinWidth,
    enabled,
    scrollerRef,
    pinAtDocumentStart,
    scrub,
    smoothScroll,
  ]);

  return (
    <section
      ref={rootRef}
      className={cn("horizontal-scroll relative", className)}
      data-horizontal-scroll=""
    >
      <div
        ref={pinRef}
        className={cn(
          "horizontal-scroll__pin h-[100dvh] w-full overflow-hidden",
          "max-md:h-auto max-md:min-h-[70dvh] max-md:overflow-x-auto max-md:overflow-y-hidden max-md:overscroll-x-contain",
          "[-ms-overflow-style:none] max-md:[scrollbar-width:thin]",
          pinClassName,
        )}
      >
        <div
          ref={trackRef}
          className={cn(
            "horizontal-scroll__track flex h-full w-max flex-row items-stretch",
            "will-change-transform [backface-visibility:hidden]",
            trackClassName,
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
});

export type HorizontalPanelProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function HorizontalPanel({
  children,
  className,
  style,
}: HorizontalPanelProps) {
  return (
    <div
      className={cn(
        "horizontal-scroll__panel flex shrink-0 flex-col",
        className,
      )}
      style={style}
      data-horizontal-panel=""
    >
      {children}
    </div>
  );
}
