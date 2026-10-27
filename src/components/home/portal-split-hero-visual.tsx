"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  design2PortalHeroGallery,
  design2PortalHeroSns,
} from "@/content/design-2-portal";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const heroSnsLinks = [
  { id: "x", href: site.links.x, label: "X" },
  { id: "tiktok", href: site.links.tiktok, label: "TikTok" },
  { id: "instagram", href: site.links.instagram, label: "Instagram" },
] as const;

const HERO_GALLERY_CYCLE_MS = 1500;
const HERO_GALLERY_FADE_MS = 600;
const HERO_GALLERY_INTERVAL_MS = HERO_GALLERY_CYCLE_MS - HERO_GALLERY_FADE_MS;

function usePreloadHeroGallery() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void Promise.all(
      design2PortalHeroGallery.map(
        (item) =>
          new Promise<void>((resolve, reject) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(item.src));
            img.src = item.src;
          }),
      ),
    )
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}

function IconX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

function IconTikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.1 4.1 0 0 1-1-.48z"
      />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
      />
    </svg>
  );
}

function PortalHeroSns() {
  const links = heroSnsLinks.filter((item) => item.href.length > 0);
  if (links.length === 0) return null;

  return (
    <div
      className="mt-auto flex w-full flex-col items-center gap-5 pt-4 md:pt-5"
    >
      <p
        className="font-display text-[0.625rem] font-bold uppercase leading-none tracking-[0.22em] text-ink [writing-mode:vertical-rl] rotate-180 md:text-micro"
      >
        {design2PortalHeroSns.label}
      </p>
      <ul className="m-0 flex list-none flex-col items-center gap-4 p-0">
        {links.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center text-ink transition-opacity duration-150 ease-out hover:opacity-70"
              aria-label={item.label}
            >
              {item.id === "x" ? (
                <IconX className="size-5" />
              ) : item.id === "tiktok" ? (
                <IconTikTok className="size-6" />
              ) : (
                <IconInstagram className="size-6" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PortalSplitHeroVisual() {
  const galleryLength = design2PortalHeroGallery.length;
  const imagesReady = usePreloadHeroGallery();
  const [baseIndex, setBaseIndex] = useState(0);
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [loadedHeroIndices, setLoadedHeroIndices] = useState<ReadonlySet<number>>(
    () => new Set([0]),
  );
  const completeTimeoutRef = useRef<number | null>(null);
  const finishingRef = useRef(false);

  const isTransitioning = overlayIndex !== null;
  const thumbActiveIndex = overlayIndex ?? baseIndex;

  const markHeroLoaded = useCallback((index: number) => {
    setLoadedHeroIndices((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  const finishTransition = useCallback(() => {
    if (finishingRef.current) return;
    finishingRef.current = true;

    setOverlayIndex((currentOverlay) => {
      if (currentOverlay === null) return null;
      setBaseIndex(currentOverlay);
      return null;
    });
    setOverlayVisible(false);
    if (completeTimeoutRef.current !== null) {
      window.clearTimeout(completeTimeoutRef.current);
      completeTimeoutRef.current = null;
    }

    window.requestAnimationFrame(() => {
      finishingRef.current = false;
    });
  }, []);

  const startTransition = useCallback(
    (nextIndex: number) => {
      if (nextIndex === baseIndex && overlayIndex === null) return;
      if (overlayIndex !== null) {
        setBaseIndex(overlayIndex);
      }
      setOverlayIndex(nextIndex);
      setOverlayVisible(false);
    },
    [baseIndex, overlayIndex],
  );

  const overlayAssetReady =
    overlayIndex !== null &&
    (imagesReady || loadedHeroIndices.has(overlayIndex));

  useLayoutEffect(() => {
    if (overlayIndex === null) {
      setOverlayVisible(false);
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setBaseIndex(overlayIndex);
      setOverlayIndex(null);
      setOverlayVisible(false);
      return;
    }

    if (!overlayAssetReady) {
      setOverlayVisible(false);
      return;
    }

    const raf = window.requestAnimationFrame(() => setOverlayVisible(true));
    return () => window.cancelAnimationFrame(raf);
  }, [overlayIndex, overlayAssetReady]);

  useEffect(() => {
    if (!overlayVisible || overlayIndex === null) return;

    if (completeTimeoutRef.current !== null) {
      window.clearTimeout(completeTimeoutRef.current);
    }
    completeTimeoutRef.current = window.setTimeout(() => {
      finishTransition();
    }, HERO_GALLERY_FADE_MS + 80);

    return () => {
      if (completeTimeoutRef.current !== null) {
        window.clearTimeout(completeTimeoutRef.current);
        completeTimeoutRef.current = null;
      }
    };
  }, [overlayVisible, overlayIndex, finishTransition]);

  useEffect(() => {
    if (galleryLength < 2 || !imagesReady) return;
    if (isTransitioning) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      const next = (baseIndex + 1) % galleryLength;
      startTransition(next);
    }, HERO_GALLERY_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [galleryLength, imagesReady, isTransitioning, baseIndex, startTransition]);

  const selectIndex = (index: number) => {
    if (index === thumbActiveIndex) return;
    startTransition(index);
  };

  return (
    <div className="relative flex h-full min-h-[inherit] w-full">
      <div
        className="relative z-[2] flex h-full min-h-[inherit] shrink-0 flex-col items-center bg-primary-foreground px-2.5 pt-3 pb-6 md:px-3.5 md:pt-4 md:pb-8"
      >
        <div
          className="flex flex-col items-center"
          role="tablist"
          aria-label="Portadas de libros"
        >
          {design2PortalHeroGallery.map((item, index) => {
            const isActive = index === thumbActiveIndex;
            return (
              <Fragment key={item.src}>
                {index > 0 ? (
                  <span
                    className="my-0 h-3 w-px shrink-0 bg-[color-mix(in_srgb,var(--ds-ink)_18%,transparent)] md:h-3.5"
                    aria-hidden
                  />
                ) : null}
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={item.alt}
                  onClick={() => selectIndex(index)}
                  className="group relative flex items-center"
                >
                  <span
                    className={cn(
                      "relative block aspect-[5/8] w-9 overflow-hidden border-2 bg-surface-muted transition-[border-color,box-shadow] ease-out motion-reduce:transition-none md:w-10",
                      isActive
                        ? "border-coral shadow-[0_0_0_1px_color-mix(in_srgb,var(--ds-coral)_40%,transparent)] duration-0"
                        : "border-[color-mix(in_srgb,var(--ds-ink)_12%,transparent)] duration-200 hover:border-[color-mix(in_srgb,var(--ds-ink)_22%,transparent)]",
                    )}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      unoptimized
                      sizes="2.5rem"
                      className={cn(
                        "object-cover object-center transition-[filter,opacity] ease-out motion-reduce:transition-none",
                        isActive
                          ? "opacity-100 saturate-100 duration-0"
                          : "opacity-55 saturate-0 duration-200 group-hover:opacity-75",
                      )}
                    />
                    {isActive ? (
                      <span
                        className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--ds-coral)_32%,transparent)]"
                        aria-hidden
                      />
                    ) : null}
                  </span>
                </button>
              </Fragment>
            );
          })}
        </div>
        <PortalHeroSns />
      </div>

      <div
        className="relative min-h-0 min-w-0 flex-1 bg-primary-foreground px-2 pb-2 pt-1 sm:px-3 sm:pb-3 md:px-4 md:pb-4"
        aria-live="polite"
      >
        {design2PortalHeroGallery.map((item, index) => {
          const isBase = index === baseIndex;
          const isOverlay = overlayIndex === index;

          let opacity = 0;
          let zIndex = 0;
          if (isOverlay) {
            opacity = overlayVisible ? 1 : 0;
            zIndex = 2;
          } else if (isBase) {
            opacity = 1;
            zIndex = 1;
          }

          return (
            <Image
              key={item.src}
              src={item.src}
              alt={index === thumbActiveIndex ? item.alt : ""}
              fill
              priority={index === 0}
              loading="eager"
              fetchPriority={index === 0 ? "high" : "auto"}
              unoptimized
              sizes="(max-width: 1024px) 85vw, 52vw"
              aria-hidden={index !== thumbActiveIndex}
              onLoad={() => markHeroLoaded(index)}
              className={cn(
                "absolute inset-0 object-contain object-top transition-opacity ease-in-out motion-reduce:transition-none motion-reduce:duration-0",
                opacity === 0 && "pointer-events-none",
              )}
              style={{
                opacity,
                zIndex,
                transitionDuration: isOverlay
                  ? `${HERO_GALLERY_FADE_MS}ms`
                  : "0ms",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
