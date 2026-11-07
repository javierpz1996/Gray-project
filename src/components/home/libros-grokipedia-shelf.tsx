"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import type { Libro } from "@/content/libros";
import type { OpenLibroHandler } from "@/lib/libros-open-flight";
import { cn } from "@/lib/utils";

const SPINE_TINTS = [
  "color-mix(in srgb, var(--ds-blue) 35%, transparent)",
  "color-mix(in srgb, var(--ds-coral) 28%, transparent)",
  "color-mix(in srgb, var(--ds-green) 32%, transparent)",
  "color-mix(in srgb, var(--ds-orange) 30%, transparent)",
  "color-mix(in srgb, var(--ds-sky) 40%, transparent)",
  "color-mix(in srgb, var(--ds-yellow) 35%, transparent)",
] as const;

const BOOK_SPRING_SNAPPY = {
  type: "spring" as const,
  stiffness: 520,
  damping: 38,
  mass: 0.72,
};

function spineTitle(titulo: string): string {
  const compact = titulo.replace(/,/g, "");
  if (compact.length <= 22) return compact;
  const words = compact.split(/\s+/).filter(Boolean);
  if (words.length <= 3) return compact.slice(0, 21) + "…";
  return `${words.slice(0, 3).join(" ")}…`;
}

function libroMeta(libro: Libro): string {
  if (libro.precio) {
    return `${libro.precio.ars} · ${libro.paginas} pág.`;
  }
  return `${libro.paginas} pág. · ${libro.formato}`;
}

function readLabel(libro: Libro): string {
  return `${libro.paginas} pág. · PDF`;
}

type LibrosGrokipediaShelfProps = {
  items: readonly Libro[];
  badgeFor: (libro: Libro) => string;
  onOpen: OpenLibroHandler;
  onPreload: (libro: Libro) => void;
  className?: string;
};

/** Estante tipo Grokipedia — lomos, portada con transición 3D, barra inferior. */
export function LibrosGrokipediaShelf({
  items,
  badgeFor: _badgeFor,
  onOpen,
  onPreload,
  className,
}: LibrosGrokipediaShelfProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const viewportRef = useRef<HTMLDivElement>(null);

  const active = items[activeIndex] ?? items[0];
  const expanded = expandedSlug !== null;
  const springSnappy = reduceMotion ? { duration: 0.01 } : BOOK_SPRING_SNAPPY;

  const scrollToIndex = useCallback((index: number) => {
    const node = itemRefs.current[index];
    node?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [reduceMotion]);

  const selectIndex = useCallback(
    (index: number, expand: boolean) => {
      const safe = (index + items.length) % items.length;
      setActiveIndex(safe);
      const libro = items[safe];
      if (!libro) return;
      onPreload(libro);
      if (expand) {
        setExpandedSlug(libro.slug);
      }
      requestAnimationFrame(() => scrollToIndex(safe));
    },
    [items, onPreload, scrollToIndex],
  );

  const move = useCallback(
    (direction: number) => {
      const next = (activeIndex + direction + items.length) % items.length;
      selectIndex(next, expandedSlug !== null);
    },
    [activeIndex, expandedSlug, items.length, selectIndex],
  );

  const putBack = useCallback(() => {
    setExpandedSlug(null);
  }, []);

  useEffect(() => {
    for (const libro of items) {
      onPreload(libro);
    }
  }, [items, onPreload]);

  useEffect(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex, expandedSlug, scrollToIndex]);

  if (!active) return null;

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cn("libros-grokipedia", className)}
        role="region"
        aria-label="Estante de libros. Elegí un lomo para ver la portada."
      >
        <div className="libros-grokipedia__head">
          <div>
            <p className="libros-grokipedia__kicker">Lo más consultado</p>
            <h3 className="libros-grokipedia__title">
              Qué se lee en el catálogo
            </h3>
            <p className="libros-grokipedia__sub">
              Tocá un lomo para sacarlo del estante. Devolverlo cierra la
              portada con la misma transición.
            </p>
          </div>
          <div className="libros-grokipedia__nav">
            <button
              type="button"
              aria-label="Libro anterior"
              onClick={() => move(-1)}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Libro siguiente"
              onClick={() => move(1)}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="libros-grokipedia__viewport"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              move(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              move(1);
            }
            if (event.key === "Escape" && expandedSlug) {
              event.preventDefault();
              putBack();
            }
          }}
        >
          <ul className="libros-grokipedia__track">
            {items.map((libro, index) => {
              const isActive = index === activeIndex;
              const isExpanded = expandedSlug === libro.slug;
              const offset = Math.abs(index - activeIndex);
              const neighbor =
                expandedSlug !== null && !isExpanded && offset <= 2;

              return (
                <motion.li
                  key={libro.slug}
                  id={`libro-${libro.slug}`}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className="libros-grokipedia__item scroll-mt-[var(--site-header-height)]"
                  style={{ zIndex: isExpanded ? 2 : isActive ? 1 : 0 }}
                  layout={!reduceMotion}
                  transition={springSnappy}
                  animate={{
                    marginInline: neighbor ? "0.35rem" : "0.05rem",
                  }}
                >
                  <button
                    type="button"
                    className="libros-grokipedia__book"
                    data-active={isActive ? "true" : undefined}
                    data-expanded={isExpanded ? "true" : undefined}
                    style={
                      {
                        "--libros-grokipedia-spine-tint":
                          SPINE_TINTS[index % SPINE_TINTS.length],
                      } as CSSProperties
                    }
                    aria-label={
                      isExpanded
                        ? `${libro.titulo}, portada en el estante`
                        : `${libro.titulo}. Sacar del estante`
                    }
                    aria-current={isActive ? "true" : undefined}
                    aria-expanded={isExpanded}
                    onClick={() => {
                      if (isExpanded) return;
                      selectIndex(index, true);
                    }}
                    onPointerEnter={() => onPreload(libro)}
                    onFocus={() => onPreload(libro)}
                  >
                    <div className="libros-grokipedia__inner">
                      <span
                        className="libros-grokipedia__spine"
                        aria-hidden="true"
                      >
                        <span className="libros-grokipedia__spine-art">
                          <Image
                            src={libro.imagen}
                            alt=""
                            fill
                            unoptimized
                            sizes="48px"
                            className="object-cover object-left"
                          />
                          <span className="libros-grokipedia__spine-tint" />
                        </span>
                        <span className="libros-grokipedia__spine-title">
                          {spineTitle(libro.titulo)}
                        </span>
                        <span className="libros-grokipedia__spine-mark">
                          G
                        </span>
                      </span>

                      <span
                        className="libros-grokipedia__cover"
                        aria-hidden="true"
                      >
                        <Image
                          src={libro.imagen}
                          alt=""
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 42vw, 16rem"
                          className="object-cover"
                        />
                        <span className="libros-grokipedia__cover-shade" />
                        <span className="libros-grokipedia__cover-brand">
                          Grayby
                        </span>
                        <span className="libros-grokipedia__cover-heading">
                          {libro.titulo}
                        </span>
                        <span className="libros-grokipedia__cover-reads">
                          {readLabel(libro)}
                        </span>
                      </span>

                      <span
                        className="libros-grokipedia__edge"
                        aria-hidden="true"
                      />
                    </div>

                    <span
                      className="libros-grokipedia__shadow"
                      aria-hidden="true"
                    />
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <motion.div
          className="libros-grokipedia__dock"
          aria-live="polite"
          aria-atomic="true"
          layout={!reduceMotion}
          transition={springSnappy}
        >
          <span className="libros-grokipedia__dock-index">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="libros-grokipedia__dock-title">{active.titulo}</span>
          <span className="libros-grokipedia__dock-meta">
            {libroMeta(active)}
          </span>
          <span className="libros-grokipedia__dock-actions">
            <button
              type="button"
              className="libros-grokipedia__dock-read"
              onClick={(event) => onOpen(active, event.currentTarget)}
            >
              Ver detalle →
            </button>
            <button
              type="button"
              className="libros-grokipedia__dock-put"
              disabled={!expanded}
              onClick={putBack}
            >
              Devolver
            </button>
          </span>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
