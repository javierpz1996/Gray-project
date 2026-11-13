"use client";

import { useCallback, useMemo, useState } from "react";
import type { BannerFocus } from "@/lib/hero-config";

type HomeSnsKbBannerStackProps = {
  banners: readonly string[];
  links?: readonly string[];
  positions?: readonly BannerFocus[];
  kicker: string;
  /** Cuántos banners visibles a la vez (kill-blue: 2). */
  pageSize?: number;
};

function NavArrow({
  direction,
  label,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="home-sns__banner-nav-btn"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {direction === "prev" ? (
          <path
            fill="currentColor"
            d="M14.6 5.4 8 12l6.6 6.6-1.4 1.4L5.2 12l8-8z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M9.4 5.4 16 12l-6.6 6.6 1.4 1.4L18.8 12l-8-8z"
          />
        )}
      </svg>
    </button>
  );
}

function resolveHref(raw: string | undefined): string {
  const trimmed = raw?.trim() ?? "";
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return url.toString();
  } catch {
    return "";
  }
}

export function HomeSnsKbBannerStack({
  banners,
  links = [],
  positions = [],
  kicker,
  pageSize = 2,
}: HomeSnsKbBannerStackProps) {
  const total = banners.length;
  const canSlide = total > pageSize;
  const maxStart = Math.max(0, total - pageSize);

  const [start, setStart] = useState(0);

  const goPrev = useCallback(() => {
    if (!canSlide) return;
    setStart((current) => (current <= 0 ? maxStart : current - 1));
  }, [canSlide, maxStart]);

  const goNext = useCallback(() => {
    if (!canSlide) return;
    setStart((current) => (current >= maxStart ? 0 : current + 1));
  }, [canSlide, maxStart]);

  const visible = useMemo(() => {
    const slice = banners.slice(start, start + pageSize);
    if (slice.length >= pageSize) return slice;
    return [
      ...slice,
      ...banners.slice(0, pageSize - slice.length),
    ] as readonly string[];
  }, [banners, pageSize, start]);

  const visibleIndices = useMemo(() => {
    return Array.from({ length: pageSize }, (_, slot) => (start + slot) % total);
  }, [pageSize, start, total]);

  return (
    <>
      <div className="home-sns__head">
        <p className="home-sns__kicker">
          <span className="home-sns__kicker-ghost" aria-hidden>
            {kicker}
          </span>
          <span className="home-sns__kicker-label">{kicker}</span>
        </p>
        <div className="home-sns__banner-nav" role="group" aria-label="Recorrer novedades">
          <NavArrow direction="prev" label="Novedad anterior" onClick={goPrev} disabled={!canSlide} />
          <NavArrow direction="next" label="Novedad siguiente" onClick={goNext} disabled={!canSlide} />
        </div>
      </div>
      <div className="home-sns__banners">
        {visible.map((src, slot) => {
          const index = visibleIndices[slot] ?? slot;
          const image = (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={slot === 0 ? "Grayby art" : ""}
              className="home-sns__banner"
              style={{
                objectPosition:
                  (positions[index] ?? "center") === "center"
                    ? "center"
                    : `center ${positions[index]}`,
              }}
            />
          );
          const href = resolveHref(links[index]);
          if (!href) {
            return <div key={`${src}-${index}-${slot}`}>{image}</div>;
          }
          return (
            <a
              key={`${src}-${index}-${slot}`}
              className="home-sns__banner-link"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              {image}
            </a>
          );
        })}
      </div>
    </>
  );
}
