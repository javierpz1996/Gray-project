"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Design2HeroEyebrow,
  type Design2HeroEyebrowVariantId,
} from "@/components/home/design-2/design-2-hero-eyebrow";
import { Design2HeroIntroDivider } from "@/components/home/design-2/design-2-hero-intro-divider";
import {
  design2PortalHero,
  design2PortalHeroIntro,
  design2PortalHeroVideos,
} from "@/content/design-2-portal";
import { cn } from "@/lib/utils";

function CarouselArrow({
  direction,
  onClick,
  label,
  className,
}: {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex size-10 items-center justify-center rounded-full border border-primary-foreground bg-primary-foreground text-ink shadow-[0_2px_0_color-mix(in_srgb,var(--ds-ink)_35%,transparent)] transition-opacity duration-150 ease-out hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground motion-reduce:transition-none md:size-11",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5 md:size-[1.35rem]"
        aria-hidden
      >
        {direction === "left" ? (
          <path
            fill="currentColor"
            d="M14.5 5.5 8 12l6.5 6.5 1.4-1.4L10.8 12l5.1-5.1z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M9.5 5.5 16 12l-6.5 6.5-1.4-1.4L13.2 12 8.1 6.9z"
          />
        )}
      </svg>
    </button>
  );
}

type Design2HeroTrailerProps = {
  eyebrowVariant?: Design2HeroEyebrowVariantId;
  /** Panel claro (diseño 3 editorial) vs oscuro (portal). */
  panelTone?: "dark" | "light";
};

export function Design2HeroTrailer({
  eyebrowVariant = "b",
  panelTone = "dark",
}: Design2HeroTrailerProps) {
  const videoCount = design2PortalHeroVideos.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeVideo =
    design2PortalHeroVideos[activeIndex] ?? design2PortalHeroVideos[0];
  const light = panelTone === "light";

  const goTo = useCallback(
    (index: number) => {
      if (videoCount < 1) return;
      const next = (index + videoCount) % videoCount;
      setActiveIndex(next);
    },
    [videoCount],
  );

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const playMuted = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      el.pause();
      return;
    }
    el.muted = true;
    void el.play().catch(() => {});
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function onMotionChange() {
      playMuted();
    }

    function onCanPlay() {
      playMuted();
    }

    el.addEventListener("loadeddata", onCanPlay);
    media.addEventListener("change", onMotionChange);
    playMuted();

    return () => {
      el.removeEventListener("loadeddata", onCanPlay);
      media.removeEventListener("change", onMotionChange);
    };
  }, [activeIndex, playMuted]);

  if (!activeVideo) {
    return null;
  }

  return (
    <div className="w-full">
      <header className="flex w-full flex-col items-center text-center">
        <Design2HeroEyebrow variant={eyebrowVariant} />
        <div className="inline-flex max-w-full flex-col items-stretch">
          <h2
            className={cn(
              "whitespace-nowrap font-display text-[length:clamp(3.25rem,15vw,8.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.02em]",
              light ? "text-ink" : "text-primary-foreground",
            )}
          >
            {design2PortalHero.trailerTitle}
          </h2>
          <span
            className={cn(
              "mt-3 self-end px-2.5 py-1 font-display text-[length:clamp(0.8125rem,2.5vw,1.125rem)] font-bold uppercase leading-none tracking-[0.12em] shadow-[0_2px_0_color-mix(in_srgb,var(--ds-ink)_35%,transparent)]",
              light
                ? "bg-ds-red text-primary-foreground"
                : "bg-ds-yellow text-ink",
            )}
          >
            {design2PortalHero.trailerSubtitle}
          </span>
        </div>
      </header>
      <p
        className={cn(
          "mx-auto mt-5 w-full max-w-md text-left font-sans text-micro leading-relaxed md:text-small",
          light ? "text-ink/85" : "text-primary-foreground/88",
        )}
      >
        {design2PortalHeroIntro.map((segment, index) =>
          "strong" in segment ? (
            <strong
              key={index}
              className={cn(
                "font-bold",
                light ? "text-ink" : "text-primary-foreground",
                "underline" in segment &&
                  cn(
                    "underline underline-offset-[0.2em] decoration-[1.5px]",
                    light
                      ? "decoration-ink"
                      : "decoration-primary-foreground",
                  ),
              )}
            >
              {segment.text}
            </strong>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
      </p>
      <Design2HeroIntroDivider className="mt-6" variant="triple-diamond" />
      <div className="mx-auto mt-6 w-full max-w-sm md:max-w-md">
        <div
          className={cn(
            "relative w-full border-2 bg-ink",
            light ? "border-ink" : "border-primary-foreground",
          )}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <video
              key={activeIndex}
              ref={videoRef}
              src={activeVideo.src}
              className="size-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={activeVideo.caption}
            />
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-[linear-gradient(180deg,transparent_0%,color-mix(in_srgb,var(--ds-ink)_88%,transparent)_100%)] px-3 pb-3 pt-8 md:px-4 md:pb-4"
              aria-hidden
            >
              <span
                className="font-display text-small font-bold uppercase tracking-[0.14em] text-primary-foreground"
              >
                {activeVideo.caption}
              </span>
            </span>
          </div>
          {videoCount > 1 ? (
            <>
              <CarouselArrow
                direction="left"
                onClick={goPrev}
                label="Video anterior"
                className="absolute top-1/2 left-2 z-10 -translate-y-1/2 md:left-3"
              />
              <CarouselArrow
                direction="right"
                onClick={goNext}
                label="Video siguiente"
                className="absolute top-1/2 right-2 z-10 -translate-y-1/2 md:right-3"
              />
            </>
          ) : null}
        </div>
        {videoCount > 1 ? (
          <div
            className="mt-4 flex justify-center gap-2.5"
            role="tablist"
            aria-label="Vídeos del programa"
          >
            {design2PortalHeroVideos.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`${item.caption}-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={item.caption}
                  onClick={() => goTo(index)}
                  className={cn(
                    "size-2.5 rounded-full border transition-colors duration-150 ease-out motion-reduce:transition-none md:size-3",
                    isActive
                      ? light
                        ? "border-ds-red bg-ds-red"
                        : "border-ds-yellow bg-ds-yellow"
                      : light
                        ? "border-[color-mix(in_srgb,var(--ds-ink)_35%,transparent)] bg-[color-mix(in_srgb,var(--ds-ink)_12%,transparent)] hover:border-ds-red hover:bg-[color-mix(in_srgb,var(--ds-red)_25%,transparent)]"
                        : "border-[color-mix(in_srgb,var(--primary-foreground)_45%,transparent)] bg-[color-mix(in_srgb,var(--primary-foreground)_22%,transparent)] hover:border-[color-mix(in_srgb,var(--ds-yellow)_55%,var(--primary-foreground)_45%)] hover:bg-[color-mix(in_srgb,var(--ds-yellow)_28%,transparent)]",
                  )}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
