"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

const TICKER_ITEMS = [
  "Sesión en vivo: Lunes, Miércoles, Viernes",
  "¡Comienza el 8 de enero de 2027 (viernes)!",
  "En Instagram y TikTok oficial",
] as const;

/** Marquesina tipo news de kinioto-anime.com (GSAP, misma secuencia de tiempos). */
export function Design2HeroPromoRightTicker() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const indexRef = useRef(0);
  const viewportWidthRef = useRef(0);
  const pausedRef = useRef(false);

  const setItemActive = (element: HTMLElement, active: boolean) => {
    gsap.set(element, { autoAlpha: active ? 1 : 0 });
    element.setAttribute("aria-hidden", String(!active));
  };

  const showCurrent = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    animationRef.current?.kill();

    const viewportWidth = list.clientWidth;
    if (!viewportWidth) return;

    const items = list.children;
    if (!items.length) return;

    const activeIndex = indexRef.current % items.length;
    const element = items[activeIndex] as HTMLElement;
    const contentWidth = element.getBoundingClientRect().width;
    const overflow = Math.max(0, contentWidth - viewportWidth);

    gsap.set(element, { x: viewportWidth, xPercent: 0, y: 0, yPercent: 0 });
    setItemActive(element, true);

    const timeline = gsap.timeline({
      onComplete: () => {
        setItemActive(element, false);
        indexRef.current = (indexRef.current + 1) % items.length;
        showCurrent();
      },
    });

    animationRef.current = timeline;

    timeline.to(element, { x: 0, duration: 1, ease: "sine.inOut" });

    if (overflow > 0) {
      timeline.to(element, {
        x: -overflow,
        duration: overflow / 50,
        delay: 1,
        ease: "none",
      });
    }

    timeline.to(element, {
      x: -contentWidth,
      duration: 1,
      delay: overflow > 0 ? 1.5 : 4,
      ease: "sine.inOut",
    });

    if (pausedRef.current) timeline.pause();
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const wrap = wrapRef.current;
    if (!list || !wrap) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    Array.from(list.children).forEach((child) =>
      setItemActive(child as HTMLElement, false),
    );

    if (reducedMotion) {
      const first = list.children[0] as HTMLElement | undefined;
      if (first) {
        gsap.set(first, { x: 0, autoAlpha: 1 });
        first.setAttribute("aria-hidden", "false");
      }
      return;
    }

    const pauseTicker = () => {
      pausedRef.current = true;
      animationRef.current?.pause();
    };

    const resumeTicker = () => {
      pausedRef.current = false;
      animationRef.current?.resume();
    };

    const onFocusIn = () => pauseTicker();

    const onFocusOut = (event: FocusEvent) => {
      if (
        event.relatedTarget instanceof Node &&
        wrap.contains(event.relatedTarget)
      ) {
        return;
      }
      resumeTicker();
    };

    wrap.addEventListener("focusin", onFocusIn);
    wrap.addEventListener("focusout", onFocusOut);

    const observer = new ResizeObserver(() => {
      const nextWidth = list.clientWidth;
      if (nextWidth !== viewportWidthRef.current) {
        viewportWidthRef.current = nextWidth;
        showCurrent();
      }
    });
    observer.observe(list);
    showCurrent();

    return () => {
      observer.disconnect();
      animationRef.current?.kill();
      wrap.removeEventListener("focusin", onFocusIn);
      wrap.removeEventListener("focusout", onFocusOut);
    };
  }, [showCurrent]);

  return (
    <div ref={wrapRef} className="d2-promo-right__ticker">
      <div className="d2-promo-right__headline">
        <ul ref={listRef} className="d2-promo-right__list">
          {TICKER_ITEMS.map((text, index) => (
            <li key={index} className="d2-promo-right__list-item">
              <span className="d2-promo-right__list-text">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
