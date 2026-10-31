"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Libro } from "@/content/libros";

const INCLINACION = [
  "-rotate-[4deg]",
  "rotate-[3deg]",
  "-rotate-[3deg]",
  "rotate-[4deg]",
] as const;

type LibrosCatalogCardProps = {
  libro: Libro;
  index?: number;
  inclinar?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  /** Menos texto y márgenes (p. ej. grilla 2×2 junto a la edición completa). */
  compact?: boolean;
  badge?: string;
  onOpen: (libro: Libro) => void;
  onPreload: (libro: Libro) => void;
  className?: string;
};

const sizeClass = {
  xs: "max-w-[11rem]",
  sm: "max-w-[11rem]",
  md: "max-w-[15rem]",
  lg: "max-w-[18rem]",
} as const;

/** Portada pequeña fija (grilla 2×2 junto a edición completa). */
const TEMA_THUMB_WIDTH =
  "w-[6.75rem] sm:w-[7.25rem] lg:w-[7.75rem]";

const TEMA_THUMB_COVER = cn(
  "relative aspect-[3/4] shrink-0 overflow-hidden rounded-sm bg-surface shadow-book",
  TEMA_THUMB_WIDTH,
);

type LibrosTemaThumbProps = {
  libro: Libro;
  badge: string;
  onOpen: (libro: Libro) => void;
  onPreload: (libro: Libro) => void;
  /** Rellena la celda de la grilla 2×2 al lado de la edición completa (desktop). */
  fillCell?: boolean;
  className?: string;
};

export function LibrosTemaThumb({
  libro,
  badge,
  onOpen,
  onPreload,
  fillCell = false,
  className,
}: LibrosTemaThumbProps) {
  if (fillCell) {
    return (
      <button
        type="button"
        aria-label={`${libro.titulo} — ${badge}`}
        onClick={() => onOpen(libro)}
        onPointerEnter={() => onPreload(libro)}
        onFocus={() => onPreload(libro)}
        className={cn(
          "libros-tema-fill-cell group flex w-full cursor-pointer flex-col text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:h-full",
          className,
        )}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-surface shadow-book max-lg:mx-auto max-lg:max-w-[10.875rem] lg:aspect-auto lg:h-full lg:max-w-none">
          <span className="absolute left-2 top-2 z-[1] rounded-full border border-border bg-surface px-1.5 py-0.5 text-[0.5625rem] font-semibold uppercase tracking-widest text-fg">
            {badge}
          </span>
          <Image
            src={libro.imagen}
            alt={libro.alt}
            fill
            unoptimized
            sizes="(max-width: 1024px) 44vw, 22vw"
            className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={`${libro.titulo} — ${badge}`}
      onClick={() => onOpen(libro)}
      onPointerEnter={() => onPreload(libro)}
      onFocus={() => onPreload(libro)}
      className={cn(
        "group mx-auto flex cursor-pointer flex-col items-center text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        TEMA_THUMB_WIDTH,
      )}
    >
      <div className={TEMA_THUMB_COVER}>
        <span className="absolute left-1 top-1 z-[1] rounded-full border border-border bg-surface px-1 py-px text-[0.5rem] font-semibold uppercase tracking-widest text-fg">
          {badge}
        </span>
        <Image
          src={libro.imagen}
          alt={libro.alt}
          fill
          unoptimized
          sizes="124px"
          className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      </div>
    </button>
  );
}

/** Portada clicable con sombra de libro (sección Libros). */
export function LibrosCatalogCard({
  libro,
  index = 0,
  inclinar = true,
  size = "md",
  compact = false,
  badge,
  onOpen,
  onPreload,
  className,
}: LibrosCatalogCardProps) {
  const inclinarActivo = inclinar && size !== "xs";

  return (
    <article className={cn("flex h-full min-h-0 flex-col", className)}>
      <button
        type="button"
        onClick={() => onOpen(libro)}
        onPointerEnter={() => onPreload(libro)}
        onFocus={() => onPreload(libro)}
        className="group flex h-full min-h-0 w-full cursor-pointer flex-col rounded-md text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div
          className={cn(
            "flex justify-center",
            compact ? "shrink-0 px-0 pb-0 pt-0" : "min-h-0 flex-1 px-2 pb-2 pt-4",
            size === "xs" && "w-full",
          )}
        >
          <div
            className={cn(
              "relative aspect-[3/4] w-full origin-bottom overflow-hidden rounded-sm bg-surface shadow-book",
              sizeClass[size],
              inclinarActivo &&
                "transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:rotate-0 group-focus-visible:rotate-0",
              inclinarActivo && INCLINACION[index % INCLINACION.length],
            )}
          >
            {badge ? (
              <span
                className={cn(
                  "absolute left-2 top-2 z-[1] rounded-full border border-border bg-surface px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-widest text-fg",
                  compact && "left-1.5 top-1.5 px-1.5 py-px text-[0.5625rem]",
                )}
              >
                {badge}
              </span>
            ) : null}
            <Image
              src={libro.imagen}
              alt={libro.alt}
              fill
              unoptimized
              sizes={
                size === "xs"
                  ? "(max-width: 1024px) 45vw, 22vw"
                  : "(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 18rem"
              }
              className="object-cover"
            />
          </div>
        </div>
        <h3
          className={cn(
            "font-sans font-bold leading-snug text-fg group-hover:text-primary",
            compact ? "mt-2 line-clamp-2 text-micro" : "mt-5 text-small",
          )}
        >
          {libro.titulo}
        </h3>
        {compact ? null : (
          <p className="mt-1.5 text-micro text-fg-muted">{libro.autor}</p>
        )}
        {libro.precio ? (
          <p
            className={cn(
              "text-micro font-medium text-fg-subtle",
              compact ? "mt-1" : "mt-2",
            )}
          >
            {libro.precio.ars}
          </p>
        ) : null}
      </button>
    </article>
  );
}
