"use client";

import { useEffect, useRef } from "react";

const CAROUSEL_MEDIA_SRC = "/Imagenes/Videos/video1.mp4";
const CAROUSEL_MEDIA_LABEL = "Video destacado Grayby art";

const VIDEO_SLOT_COUNT = 4;

function CarouselVideoSlide({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      el.pause();
      return;
    }

    void el.play().catch(() => {
      el.pause();
    });
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      className="size-full object-cover object-center"
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}

/** Cuatro reproducciones del mismo clip visibles a la vez (diseño 2). */
export function HomeLibrosCarousel() {
  const slots = Array.from({ length: VIDEO_SLOT_COUNT }, (_, index) => index);

  return (
    <section
      className="border-t border-border bg-[color-mix(in_srgb,var(--canvas)_38%,var(--ds-muted-light)_22%,var(--surface)_40%)] py-10 sm:py-12 md:py-14"
      aria-label="Videos destacados"
    >
      <ul
        className="relative z-[1] mx-auto grid w-full max-w-none list-none grid-cols-2 gap-4 px-3 sm:gap-5 sm:px-5 md:gap-6 lg:grid-cols-4 lg:px-8"
      >
        {slots.map((index) => (
          <li key={index}>
            <div
              className="relative aspect-[3/2] min-h-[9.5rem] overflow-hidden rounded-sm bg-surface-muted shadow-book sm:min-h-[11rem] md:min-h-[12.5rem] lg:min-h-0"
            >
              <CarouselVideoSlide
                src={CAROUSEL_MEDIA_SRC}
                label={`${CAROUSEL_MEDIA_LABEL} (${index + 1} de ${VIDEO_SLOT_COUNT})`}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
