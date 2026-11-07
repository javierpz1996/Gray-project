"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { libros, librosSection } from "@/content/libros";
import { productDetailHref } from "@/lib/product-detail-path";
import { preloadImageSrc } from "@/lib/preload-image";
import {
  LIBROS_SHOWCASE_DEFAULT_ANIMATION,
  librosShowcaseAnimationOptions,
  librosShowcaseDeckAnimationOptions,
  librosShowcaseBoldAnimationOptions,
  librosShowcaseExpressAnimationOptions,
  librosShowcaseItemMotion,
  librosShowcaseUsesPerspective,
  type LibrosShowcaseAnimationId,
} from "@/components/home/libros-showcase/libros-showcase-animations";
import { cn } from "@/lib/utils";
import "./libros-showcase.css";

const frascoSrc = "/Imagenes/Varias/cubo.png";
const frascoBlancoSrc = "/Imagenes/Varias/cubo.png";
const bandaSrc = "/Imagenes/Varias/banda-loop.png";
const stickerSrc = "/Imagenes/Varias/sticker3.png";
const scooterFrames = [1, 2, 3, 4, 5, 6, 7, 8].map(
  (n) => `/Imagenes/Varias/scooter/frame-${n}.png?v=3`,
);

const STICKER_EFFECTS = [
  { id: "quieto", label: "Quieto" },
  { id: "flotar", label: "Flotar" },
  { id: "balanceo", label: "Balanceo" },
  { id: "latido", label: "Latido" },
  { id: "gelatina", label: "Gelatina" },
  { id: "pendulo", label: "Péndulo" },
  { id: "rebote", label: "Rebote" },
  { id: "temblor", label: "Temblor" },
  { id: "giro", label: "Giro" },
  { id: "cabeceo", label: "Cabeceo" },
  { id: "sombra", label: "Sombra" },
  { id: "vaiven", label: "Vaivén" },
  { id: "pop", label: "Pop" },
  { id: "respirar", label: "Respirar" },
  { id: "guiño", label: "Guiño" },
] as const;

type StickerEffectId = (typeof STICKER_EFFECTS)[number]["id"];

const STICKER_LOOKS = [
  { id: "color", label: "Color" },
  { id: "bn", label: "Blanco y negro" },
  { id: "sepia", label: "Sepia" },
  { id: "tinta", label: "Tinta" },
  { id: "contraste", label: "Contraste" },
  { id: "umbral", label: "Umbral" },
  { id: "duotono", label: "Duotono" },
  { id: "frio", label: "Frío" },
  { id: "calido", label: "Cálido" },
  { id: "invertido", label: "Invertido" },
  { id: "solar", label: "Solar" },
  { id: "contorno", label: "Contorno" },
] as const;

type StickerLookId = (typeof STICKER_LOOKS)[number]["id"];

const TRAIL_STYLES = [
  { id: "banner", label: "Banner" },
  { id: "rollo", label: "Rollo de papel" },
  { id: "guirnalda", label: "Guirnalda" },
  { id: "maquina", label: "Máquina de escribir" },
  { id: "neon", label: "Neón" },
  { id: "marquesina", label: "Marquesina" },
  { id: "postits", label: "Post-its" },
  { id: "sellos", label: "Sellos" },
  { id: "rodillo", label: "Rodillo" },
  { id: "pelicula", label: "Película" },
  { id: "ticket", label: "Ticket" },
  { id: "tiza", label: "Tiza" },
  { id: "metro", label: "Cinta métrica" },
  { id: "etiqueta", label: "Etiqueta" },
  { id: "comic", label: "Cómic" },
  { id: "humo", label: "Humo" },
  { id: "flechas", label: "Flechas" },
] as const;

const LETTER_TRAILS = new Set<TrailStyleId>([
  "guirnalda",
  "maquina",
  "neon",
  "marquesina",
  "humo",
]);

const WORD_TRAILS = new Set<TrailStyleId>(["postits", "sellos"]);

type TrailStyleId = (typeof TRAIL_STYLES)[number]["id"];

const TRAIL_TEXT = "30% OFF solo hasta el 04/11";

type LibrosShowcaseSectionProps = {
  animationId?: LibrosShowcaseAnimationId;
  onAnimationIdChange?: (id: LibrosShowcaseAnimationId) => void;
  /** Muestra botones para probar presets (demo o ?librosVariantes=1). */
  showVariantPicker?: boolean;
  compact?: boolean;
};

export function LibrosShowcaseSection({
  animationId: controlledAnimationId,
  onAnimationIdChange,
  showVariantPicker = false,
  compact = false,
}: LibrosShowcaseSectionProps = {}) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(() => {
    const preferred = librosSection.defaultShowcaseIndex;
    return Math.min(Math.max(0, preferred), libros.length - 1);
  });
  const [cubeBurst, setCubeBurst] = useState({ index: -1, tick: 0 });
  const [stickerEffect, setStickerEffect] = useState<StickerEffectId>("cabeceo");
  const [stickerLook, setStickerLook] = useState<StickerLookId>("tinta");
  const [trailStyle, setTrailStyle] = useState<TrailStyleId>("rollo");
  const [pickersOpen, setPickersOpen] = useState(true);
  const [internalAnimationId, setInternalAnimationId] =
    useState<LibrosShowcaseAnimationId>(LIBROS_SHOWCASE_DEFAULT_ANIMATION);
  const animationId = controlledAnimationId ?? internalAnimationId;
  const setAnimationId = onAnimationIdChange ?? setInternalAnimationId;

  const activeHint =
    librosShowcaseAnimationOptions.find((opt) => opt.id === animationId)?.hint ??
    "";

  const go = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((prev) => {
        const next = prev + direction;
        if (next < 0) return 0;
        if (next >= libros.length) return libros.length - 1;
        return next;
      });
    },
    [],
  );

  const skipCubeIntro = useRef(true);

  useEffect(() => {
    if (skipCubeIntro.current) {
      skipCubeIntro.current = false;
      return;
    }
    setCubeBurst((prev) => ({ index: activeIndex, tick: prev.tick + 1 }));
  }, [activeIndex]);

  useEffect(() => {
    preloadImageSrc(frascoSrc);
    preloadImageSrc(frascoBlancoSrc);
    for (const libro of libros) {
      preloadImageSrc(libro.imagen);
    }
  }, []);

  return (
    <section
      id="libros"
      className={cn(
        "libros-showcase scroll-mt-[var(--site-header-height)]",
        compact && "libros-showcase--compact",
      )}
      aria-labelledby="libros-heading"
    >
      <div className="libros-showcase__inner">
        {showVariantPicker ? (
          <div
            className="libros-showcase__variant-bar"
            aria-label="Presets de animación"
          >
            <p className="text-micro font-semibold uppercase tracking-widest text-fg-muted">
              Atrevidos — más movimiento
            </p>
            <div
              className="libros-showcase__anim-picker libros-showcase__anim-picker--demo libros-showcase__anim-picker--scroll libros-showcase__anim-picker--bold mt-2"
              role="group"
              aria-label="Presets atrevidos"
            >
              {librosShowcaseBoldAnimationOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={animationId === option.id}
                  onClick={() => setAnimationId(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-micro font-semibold uppercase tracking-widest text-fg-muted">
              Expresivos — cine y gesto
            </p>
            <div
              className="libros-showcase__anim-picker libros-showcase__anim-picker--demo libros-showcase__anim-picker--scroll libros-showcase__anim-picker--express mt-2"
              role="group"
              aria-label="Presets expresivos"
            >
              {librosShowcaseExpressAnimationOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={animationId === option.id}
                  onClick={() => setAnimationId(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-micro font-semibold uppercase tracking-widest text-fg-muted">
              Suaves y referencia
            </p>
            <div
              className="libros-showcase__anim-picker libros-showcase__anim-picker--demo libros-showcase__anim-picker--scroll mt-2"
              role="group"
              aria-label="Presets suaves"
            >
              {librosShowcaseDeckAnimationOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={animationId === option.id}
                  onClick={() => setAnimationId(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="libros-showcase__anim-hint">{activeHint}</p>
            <details className="mt-4 text-small text-fg-muted">
              <summary className="cursor-pointer font-semibold text-fg">
                Presets clásicos
              </summary>
              <div
                className="libros-showcase__anim-picker libros-showcase__anim-picker--demo mt-2"
                role="group"
              >
                {librosShowcaseAnimationOptions
                  .filter((opt) => opt.group === "classic")
                  .map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={animationId === option.id}
                      onClick={() => setAnimationId(option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
              </div>
            </details>
          </div>
        ) : null}

        <div className="libros-showcase__stage-wrap">
          <div
            className={cn(
              "libros-showcase__sticker",
              `libros-showcase__sticker--${stickerEffect}`,
            )}
          >
            <Image
              src={stickerSrc}
              alt=""
              width={1536}
              height={1024}
              unoptimized
              className={cn(
                "libros-showcase__sticker-img",
                `libros-showcase__sticker-look--${stickerLook}`,
              )}
            />
          </div>
          <div className="libros-showcase__sticker-pickers">
            <button
              type="button"
              className="libros-showcase__pickers-toggle"
              aria-expanded={pickersOpen}
              onClick={() => setPickersOpen((open) => !open)}
            >
              {pickersOpen ? "Ocultar opciones" : "Mostrar opciones"}
            </button>
            {pickersOpen ? (
            <>
            <div
              className="libros-showcase__sticker-picker"
              role="group"
              aria-label="Movimiento del sticker"
            >
              {STICKER_EFFECTS.map((effect) => (
                <button
                  key={effect.id}
                  type="button"
                  aria-pressed={stickerEffect === effect.id}
                  onClick={() => setStickerEffect(effect.id)}
                >
                  {effect.label}
                </button>
              ))}
            </div>
            <div
              className="libros-showcase__sticker-picker"
              role="group"
              aria-label="Tratamiento visual del sticker"
            >
              {STICKER_LOOKS.map((look) => (
                <button
                  key={look.id}
                  type="button"
                  aria-pressed={stickerLook === look.id}
                  onClick={() => setStickerLook(look.id)}
                >
                  {look.label}
                </button>
              ))}
            </div>
            <div
              className="libros-showcase__sticker-picker"
              role="group"
              aria-label="Cartel detrás del scooter"
            >
              {TRAIL_STYLES.map((trail) => (
                <button
                  key={trail.id}
                  type="button"
                  aria-pressed={trailStyle === trail.id}
                  onClick={() => setTrailStyle(trail.id)}
                >
                  {trail.label}
                </button>
              ))}
            </div>
            </>
            ) : null}
          </div>
          <p className="libros-showcase__scroll" aria-hidden>
            <span className="libros-showcase__scroll-label">Scroll</span>
            <span className="libros-showcase__scroll-arrows">
              <svg viewBox="0 0 16 10" className="libros-showcase__scroll-arrow">
                <path
                  d="M1.4 1.4 8 8.2 14.6 1.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
              <svg viewBox="0 0 16 10" className="libros-showcase__scroll-arrow">
                <path
                  d="M1.4 1.4 8 8.2 14.6 1.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
              <svg viewBox="0 0 16 10" className="libros-showcase__scroll-arrow">
                <path
                  d="M1.4 1.4 8 8.2 14.6 1.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
            </span>
          </p>
          <div className="libros-showcase__rules" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="libros-showcase__banda" aria-hidden>
            <div className="libros-showcase__banda-track">
              <Image
                src={bandaSrc}
                alt=""
                width={1760}
                height={724}
                unoptimized
                className="libros-showcase__banda-img"
              />
              <Image
                src={bandaSrc}
                alt=""
                width={1760}
                height={724}
                unoptimized
                className="libros-showcase__banda-img"
              />
            </div>
          </div>
          <div
            className="libros-showcase__banda libros-showcase__banda--top-left"
            aria-hidden
          >
            <div className="libros-showcase__banda-track">
              <Image
                src={bandaSrc}
                alt=""
                width={1760}
                height={724}
                unoptimized
                className="libros-showcase__banda-img"
              />
              <Image
                src={bandaSrc}
                alt=""
                width={1760}
                height={724}
                unoptimized
                className="libros-showcase__banda-img"
              />
            </div>
          </div>
          <div
            className="libros-showcase__banda libros-showcase__banda--across"
            aria-hidden
          >
            <div className="libros-showcase__banda-track">
              <Image
                src={bandaSrc}
                alt=""
                width={1760}
                height={724}
                unoptimized
                className="libros-showcase__banda-img"
              />
              <Image
                src={bandaSrc}
                alt=""
                width={1760}
                height={724}
                unoptimized
                className="libros-showcase__banda-img"
              />
            </div>
          </div>
          <header className="libros-showcase__heading">
            <h2
              id="libros-heading"
              className="libros-showcase__heading-title font-display text-h1 font-bold leading-heading tracking-title"
            >
              {librosSection.title}
            </h2>
            <p className="libros-showcase__heading-intro mt-3">
              {librosSection.showcaseIntroParts.map((part, index) => {
                const isOutline = "block" in part && part.block;
                const isHighlight =
                  "highlight" in part && part.highlight === true && !isOutline;
                return (
                  <span
                    key={`intro-${index}`}
                    className={cn(
                      !isOutline && "libros-showcase__heading-intro-copy",
                      isHighlight && "libros-showcase__heading-intro-highlight",
                      isOutline &&
                        "libros-showcase__heading-intro-break libros-showcase__heading-intro-outline",
                    )}
                  >
                    {part.text}
                  </span>
                );
              })}
            </p>
            <nav className="libros-showcase__paths" aria-label="Acceso al contenido">
              {librosSection.showcasePaths.map((path) => (
                <button
                  key={path.id}
                  type="button"
                  className="libros-showcase__path"
                  onClick={() => {
                    const index =
                      path.id === "completo"
                        ? libros.findIndex((libro) => libro.kind === "completo")
                        : libros.findIndex((libro) => libro.kind === "tema");
                    if (index >= 0) setActiveIndex(index);
                  }}
                >
                  {path.label}
                  <svg
                    className="libros-showcase__path-mark"
                    viewBox="0 0 16 24"
                    aria-hidden
                  >
                    <path
                      d="M3.2 3.2 12.8 12 3.2 20.8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    />
                  </svg>
                </button>
              ))}
            </nav>
          </header>

          <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
            <div
              className={cn(
                "libros-showcase__stage",
                librosShowcaseUsesPerspective(animationId) &&
                  "libros-showcase__stage--perspective",
              )}
            >
              {activeIndex > 0 ? (
                <button
                  type="button"
                  className="libros-showcase__nav libros-showcase__nav--prev"
                  aria-label="Libro anterior"
                  onClick={() => go(-1)}
                  style={{
                    left: `calc(50% + ${
                      librosShowcaseItemMotion(
                        animationId,
                        activeIndex - 1,
                        activeIndex,
                        Boolean(reduceMotion),
                      ).x
                    }px - 1.875rem)`,
                  }}
                >
                  <span aria-hidden>‹</span>
                </button>
              ) : null}
              {activeIndex < libros.length - 1 ? (
                <button
                  type="button"
                  className="libros-showcase__nav libros-showcase__nav--next"
                  aria-label="Libro siguiente"
                  onClick={() => go(1)}
                  style={{
                    left: `calc(50% + ${
                      librosShowcaseItemMotion(
                        animationId,
                        activeIndex + 1,
                        activeIndex,
                        Boolean(reduceMotion),
                      ).x
                    }px - 1.875rem)`,
                    right: "auto",
                  }}
                >
                  <span aria-hidden>›</span>
                </button>
              ) : null}
              <div className="libros-showcase__flecha-cluster">
                <svg
                  className="libros-showcase__flecha-decor"
                  viewBox="0 0 240 160"
                  aria-hidden
                >
                  <defs>
                    <marker
                      id="libros-flecha-cerrada"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path d="M0 0l10 5-10 5z" fill="currentColor" />
                    </marker>
                  </defs>
                  <path
                    d="M20 150C36 28 96 12 204 46"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    markerEnd="url(#libros-flecha-cerrada)"
                  />
                </svg>
                <div className="libros-showcase__level-postit-group">
                  <p
                    className="libros-showcase__level-postit libros-showcase__level-postit--level"
                    aria-label={librosSection.showcaseLevelPostitLines.join(" ")}
                  >
                    <span
                      className="libros-showcase__level-postit-tape"
                      aria-hidden
                    />
                    {librosSection.showcaseLevelPostitLines.map((line) => (
                      <span
                        key={line}
                        className="libros-showcase__level-postit-line"
                      >
                        {line}
                      </span>
                    ))}
                  </p>
                  <p
                    className="libros-showcase__level-postit libros-showcase__level-postit--follow"
                    aria-label={librosSection.showcaseFollowPostitLines.join(" ")}
                  >
                    <span
                      className="libros-showcase__level-postit-tape"
                      aria-hidden
                    />
                    {librosSection.showcaseFollowPostitLines.map((line) => (
                      <span
                        key={line}
                        className="libros-showcase__level-postit-line"
                      >
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <ul
                className={cn(
                  "libros-showcase__list",
                  librosShowcaseUsesPerspective(animationId) &&
                    "libros-showcase__list--3d",
                )}
                aria-label="Portadas"
              >
                {libros.map((libro, index) => {
                  const motionState = librosShowcaseItemMotion(
                    animationId,
                    index,
                    activeIndex,
                    Boolean(reduceMotion),
                  );
                  const isInteractive =
                    Math.abs(index - activeIndex) <= 3 ||
                    motionState.opacity > 0.01;
                  return (
                    <motion.li
                      key={libro.slug}
                      className={cn(
                        "libros-showcase__item",
                        librosShowcaseUsesPerspective(animationId) &&
                          "libros-showcase__item--3d",
                      )}
                      animate={{
                        x: motionState.x,
                        y: motionState.y,
                        scale: motionState.scale,
                        opacity: motionState.opacity,
                        rotateY: motionState.rotateY,
                        rotateZ: motionState.rotateZ,
                        rotateX: motionState.rotateX,
                        zIndex: motionState.zIndex,
                        filter: motionState.filter ?? "none",
                      }}
                      transition={motionState.transition}
                      style={{
                        marginLeft: "calc(var(--showcase-book-w) / -2)",
                        pointerEvents: isInteractive ? "auto" : "none",
                      }}
                    >
                      <Link
                        href={productDetailHref(libro.slug)}
                        className="libros-showcase__cover-btn"
                        aria-current={
                          index === activeIndex ? "true" : undefined
                        }
                        onClick={(event) => {
                          if (index === activeIndex) return;
                          event.preventDefault();
                          setActiveIndex(index);
                        }}
                        onFocus={() => setActiveIndex(index)}
                      >
                        <div className="libros-showcase__cover">
                          <Image
                            src={libro.imagen}
                            alt={libro.alt}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 46vw, 304px"
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </MotionConfig>

          <div className="libros-showcase__pencils-row">
          <div
            className="libros-showcase__pencils"
            role="tablist"
            aria-label="Libros en el carrusel"
          >
            {libros.map((libro, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={libro.slug}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={`${String(index + 1).padStart(2, "0")}. ${libro.titulo}`}
                  className={cn(
                    "libros-showcase__pencil",
                    selected && "libros-showcase__pencil--active",
                  )}
                  onClick={() => {
                    if (index === activeIndex) {
                      setCubeBurst((prev) => ({ index, tick: prev.tick + 1 }));
                    }
                    setActiveIndex(index);
                  }}
                >
                  <span
                    key={cubeBurst.index === index ? cubeBurst.tick : "quiet"}
                    className={cn(
                      "libros-showcase__pencil-spin",
                      cubeBurst.index === index &&
                        "libros-showcase__pencil-spin--pop",
                    )}
                  >
                    <Image
                      src={selected ? frascoBlancoSrc : frascoSrc}
                      alt=""
                      width={80}
                      height={80}
                      unoptimized
                      className="libros-showcase__pencil-img"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="libros-showcase__riders" aria-hidden>
            <div className="libros-showcase__drive libros-showcase__drive--scooter">
              <span
                className={cn(
                  "libros-showcase__trail",
                  `libros-showcase__trail--${trailStyle}`,
                )}
              >
                {LETTER_TRAILS.has(trailStyle) ? (
                  [...TRAIL_TEXT].map((char, i) => (
                    <span
                      key={i}
                      className={
                        trailStyle === "guirnalda"
                          ? "libros-showcase__pennant"
                          : "libros-showcase__letter"
                      }
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      {char === " "
                        ? trailStyle === "guirnalda"
                          ? ""
                          : "\u00a0"
                        : char}
                    </span>
                  ))
                ) : WORD_TRAILS.has(trailStyle) ? (
                  TRAIL_TEXT.split(" ").map((word, i) => (
                    <span
                      key={word}
                      className="libros-showcase__trail-word"
                      style={{ animationDelay: `${i * 0.35}s` }}
                    >
                      {word}
                    </span>
                  ))
                ) : trailStyle === "comic" ? (
                  <>
                    <span className="libros-showcase__burst">¡VROOM!</span>
                    <span className="libros-showcase__bubble">{TRAIL_TEXT}</span>
                  </>
                ) : (
                  <span className="libros-showcase__trail-text">{TRAIL_TEXT}</span>
                )}
              </span>
              <span className="libros-showcase__scooter-body">
                {scooterFrames.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={645}
                    height={614}
                    unoptimized
                    className="libros-showcase__drive-frame"
                  />
                ))}
              </span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
