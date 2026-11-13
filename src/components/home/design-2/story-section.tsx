"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { site } from "@/config/site";
import { MarkedLead } from "./marked-lead";
import "./story-section.css";
import "./story-wash.css";

const BANDA_SRC = "/media/decoracion/banda.png";

export type StoryBands = {
  src1?: string;
  src2?: string;
  speed1?: number;
  speed2?: number;
  size1?: number;
  size2?: number;
  top1?: number;
  top2?: number;
  tilt1?: number;
  tilt2?: number;
  opacity1?: number;
  opacity2?: number;
  bright1?: number;
  bright2?: number;
  lead?: string;
  stories?: readonly { title: string; text: string }[];
  heading?: {
    title: string;
    rhythm: string;
    titleStyle: { font: string; bold: boolean; color: string; bg: string };
    leadStyle: { font: string; bold: boolean; color: string; bg: string };
    rhythmStyle: { font: string; bold: boolean; color: string; bg: string };
    ver: string;
    rule?: string;
    nameLine?: string;
    nameColor?: string;
    storyText?: string;
    verMotion?: string;
    stickerMotion?: string;
    stickerBorder?: string;
    stickerEdge?: string;
    stickerKind?: "sticker" | "image" | "video";
    imageMotion?: string;
    imageBorder?: string;
    imageEdge?: string;
    imageCrop?: boolean;
    imageSize?: number;
    videoMotion?: string;
    videoBorder?: string;
    videoEdge?: string;
    stickerHover?: string;
    imageHover?: string;
    videoHover?: string;
    bgMode?: "none" | "pattern" | "image";
    bgPattern?: string;
    bgMotion?: string;
    bgSpeed?: number;
    bgTile?: number;
    bgColor?: string;
    bgBase?: string;
    bgShade?: number;
  };
};

const STORY_FONTS: Record<string, string> = {
  sans: "var(--font-sans)",
  display: "var(--font-display)",
  oswald: "var(--font-oswald), sans-serif",
  outfit: "var(--font-outfit), sans-serif",
};

function storyLineStyle(style: { font: string; bold: boolean; color: string; bg: string } | undefined, fallbackFont: string): CSSProperties {
  if (!style) return {};
  return {
    fontFamily: STORY_FONTS[style.font] ?? fallbackFont,
    fontWeight: style.bold ? 800 : 500,
    color: `rgb(${style.color})`,
    backgroundColor: style.bg ? `rgb(${style.bg})` : "transparent",
  };
}
const CUBE_SRC = [
  "/api/hero-banner/cubo1",
  "/api/hero-banner/cubo2",
  "/api/hero-banner/cubo3",
  "/api/hero-banner/cubo4",
  "/api/hero-banner/cubo5",
];
const SCOOTER_FRAMES = [1, 2, 3, 4, 5, 6, 7, 8].map(
  (n) => `/media/decoracion/scooter/fotograma-0${n}.png`,
);
const TRAIL_TEXT = "30% OFF solo hasta el 04/11";

export const STORY_SOCIAL = [
  { id: "x", label: "X", href: site.links.x },
  { id: "youtube", label: "YouTube", href: site.links.youtube },
  { id: "facebook", label: "Facebook", href: site.links.facebook },
  { id: "instagram", label: "Instagram", href: site.links.instagram },
  { id: "tiktok", label: "TikTok", href: site.links.tiktok },
] as const;

export function StorySocialIcon({ id }: { id: (typeof STORY_SOCIAL)[number]["id"] }) {
  if (id === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (id === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <rect
          x="2.8"
          y="6.4"
          width="18.4"
          height="11.2"
          rx="3.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <path
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinejoin="round"
          d="M10.6 9.5v5l4.6-2.5-4.6-2.5Z"
        />
      </svg>
    );
  }
  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <circle
          cx="12"
          cy="12"
          r="8.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <path
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.45"
          strokeLinejoin="round"
          d="M13.1 17.4v-4h1.5l.2-1.7h-1.7v-1.1c0-.5.1-.8.8-.8h.9V8.2c-.2 0-.8-.1-1.4-.1-1.5 0-2.4.9-2.4 2.5v1.1H9.6v1.7h1.4v4h2.1Z"
        />
      </svg>
    );
  }
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <rect
          x="5"
          y="5"
          width="14"
          height="14"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <circle
          cx="12"
          cy="12"
          r="3.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <circle cx="16.3" cy="7.8" r="1.05" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="M14.2 5.2v8.4a3.2 3.2 0 1 1-1.7-2.8V7.1c1.4.8 2.5 1 3.8.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type StoryPoint = {
  range: string;
  label: string;
};

type StoryItem = {
  id: string;
  title: string;
  text: string;
  image: string;
  points: readonly StoryPoint[];
};

const STORY_IMAGES = [
  "/api/hero-banner/tema1",
  "/api/hero-banner/tema2",
  "/api/hero-banner/tema3",
  "/api/hero-banner/tema4",
  "/api/hero-banner/tema5",
] as const;

const STOCK_STORY_IMAGES = [
  "/media/libros/tema-1.jpg",
  "/media/libros/tema-2.jpg",
  "/media/libros/tema-3.jpg",
  "/media/libros/tema-4.jpg",
  "/media/libros/completo.jpg",
] as const;

const STORIES: readonly StoryItem[] = [
  {
    id: "001",
    title: "fundamentos del dibujo",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    image: STORY_IMAGES[0] ?? "/api/hero-banner/tema1",
    points: [
      { range: "01–04", label: "Introducción al dibujo y materiales" },
      { range: "05–08", label: "Líneas, trazos y control del lápiz" },
    ],
  },
  {
    id: "002",
    title: "Perspectiva anatómica",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    image: STORY_IMAGES[1] ?? "/api/hero-banner/tema2",
    points: [
      { range: "09–12", label: "Bocetos y dibujo gestual" },
      { range: "13–16", label: "Técnicas de sombreado" },
    ],
  },
  {
    id: "003",
    title: "Halloween diseño de personajes",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: STORY_IMAGES[2] ?? "/api/hero-banner/tema3",
    points: [
      { range: "17–20", label: "Anatomía del cuerpo humano" },
      { range: "21–24", label: "Poses, movimiento y gestualidad" },
    ],
  },
  {
    id: "004",
    title: "Perspectiva fundamentos iniciales",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: STORY_IMAGES[3] ?? "/api/hero-banner/tema4",
    points: [
      { range: "25–28", label: "Anatomía de la cabeza y el cráneo" },
      { range: "29–32", label: "Rostro, facciones y expresiones" },
    ],
  },
  {
    id: "005",
    title: "Morfología anatomía muscular",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: STORY_IMAGES[4] ?? "/api/hero-banner/tema5",
    points: [
      { range: "33–36", label: "Músculos del torso" },
      { range: "37–40", label: "Brazos, piernas y volumen" },
    ],
  },
];

function StoryTitle({
  id,
  title,
  active,
  lineColor,
  titleColor,
}: {
  id: string;
  title: string;
  active: boolean;
  lineColor: string;
  titleColor: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;

    const measure = () => {
      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = range.getClientRects();
      const lines = new Map<number, { left: number; right: number }>();
      for (const rect of rects) {
        const key = Math.round(rect.top);
        const current = lines.get(key);
        if (!current) {
          lines.set(key, { left: rect.left, right: rect.right });
          continue;
        }
        current.left = Math.min(current.left, rect.left);
        current.right = Math.max(current.right, rect.right);
      }
      const origin = node.getBoundingClientRect().left;
      let longest = 0;
      for (const line of lines.values()) {
        longest = Math.max(longest, line.right - origin);
      }
      setLine(longest);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [active, id, title]);

  return (
    <p
      ref={ref}
      className="story-section__name"
      style={
        {
          color: `rgb(${titleColor})`,
          ["--name-line" as string]: `rgb(${lineColor})`,
          ...(active && line > 0 ? { ["--story-line" as string]: `${line}px` } : {}),
        } as CSSProperties
      }
    >
      <span className="story-section__number">{id}</span>
      {" - "}
      {title}
    </p>
  );
}

export function StorySection({
  bands,
  stockMedia = false,
}: {
  bands?: StoryBands;
  /** Archivos de `public/media` en lugar de las imágenes de la base. */
  stockMedia?: boolean;
} = {}) {
  const src1 = bands?.src1 ?? BANDA_SRC;
  const src2 = bands?.src2 ?? BANDA_SRC;
  const speed1 = `${bands?.speed1 ?? 16}s`;
  const speed2 = `${bands?.speed2 ?? 16}s`;
  const size1 = (bands?.size1 ?? 100) / 100;
  const size2 = (bands?.size2 ?? 100) / 100;
  const top1 = bands?.top1 ?? 4.5;
  const top2 = bands?.top2 ?? 11;
  const tilt1 = bands?.tilt1 ?? -28;
  const tilt2 = bands?.tilt2 ?? -28;
  const opacity1 = (bands?.opacity1 ?? 92) / 100;
  const opacity2 = (bands?.opacity2 ?? 92) / 100;
  const bright1 = (bands?.bright1 ?? 100) / 100;
  const bright2 = (bands?.bright2 ?? 100) / 100;
  const lead = bands?.lead?.trim() || "Conseguí la edición completa o elegí los temas que más te interesen.";
  const stories = STORIES.map((story, index) => {
    const custom = bands?.stories?.[index];
    const image = stockMedia ? (STOCK_STORY_IMAGES[index] ?? STOCK_STORY_IMAGES[0]) : story.image;
    return {
      ...story,
      title: custom?.title?.trim() || story.title,
      text: custom?.text?.trim() || story.text,
      image,
    };
  });
  const [active, setActive] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);
  const [slide, setSlide] = useState(0);
  const [cubeTick, setCubeTick] = useState(0);

  const openStory = stories.find((story) => story.id === openId) ?? null;
  const openSlides =
    openStory?.points.map((point) => ({
      kicker: `[ ${point.range} ]`,
      title: point.label,
      text: openStory.text,
      position: "center",
    })) ?? [];
  const currentSlide = openSlides[slide];

  useEffect(() => {
    if (!openStory) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
      if (event.key === "ArrowRight") {
        setSlide((value) => (value + 1) % openSlides.length);
      }
      if (event.key === "ArrowLeft") {
        setSlide((value) => (value - 1 + openSlides.length) % openSlides.length);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openSlides.length, openStory]);

  return (
    <section className="story-section" id="story" aria-labelledby="story-heading">
      {bands?.heading?.bgMode && bands.heading.bgMode !== "none" ? (
        <div
          className="story-wash"
          aria-hidden
          data-mode={bands.heading.bgMode}
          data-pattern={bands.heading.bgPattern ?? "dots"}
          data-motion={bands.heading.bgMotion ?? "off"}
          style={{
            ["--wash-ink" as string]: bands.heading.bgColor ?? "230,233,233",
            ["--wash-base" as string]: bands.heading.bgBase ?? "0,0,0",
            ["--wash-speed" as string]: `${bands.heading.bgSpeed ?? 16}s`,
            ["--wash-tile-size" as string]: `${bands.heading.bgTile ?? 48}px`,
            ["--wash-shade" as string]: (bands.heading.bgShade ?? 0) / 100,
            ["--wash-photo" as string]: stockMedia ? "url(/media/libros/fondo.png)" : "url(/api/hero-banner/librosbg)",
            ["--wash-tile" as string]: stockMedia ? "url(/media/libros/fondo-detalle.png)" : "url(/api/hero-banner/librostile)",
          }}
        />
      ) : null}
      {stockMedia ? null : (
      <div className="story-section__bands" aria-hidden>
        <div
          className="story-section__banda"
          style={{
            ["--banda-speed" as string]: speed1,
            ["--banda-size" as string]: size1,
            ["--banda-top" as string]: top1,
            ["--banda-tilt" as string]: `${tilt1}deg`,
            ["--banda-opacity" as string]: opacity1,
            ["--banda-bright" as string]: bright1,
          }}
        >
          <div className="story-section__banda-track">
            {Array.from({ length: 200 }, (_, index) => (
              <Image
                key={index}
                src={src1}
                alt=""
                width={960}
                height={540}
                unoptimized
                className="story-section__banda-img"
              />
            ))}
          </div>
        </div>
        <div
          className="story-section__banda story-section__banda--top-left"
          style={{
            ["--banda-speed" as string]: speed2,
            ["--banda-size" as string]: size2,
            ["--banda-top" as string]: top2,
            ["--banda-tilt" as string]: `${tilt2}deg`,
            ["--banda-opacity" as string]: opacity2,
            ["--banda-bright" as string]: bright2,
          }}
        >
          <div className="story-section__banda-track">
            {Array.from({ length: 200 }, (_, index) => (
              <Image
                key={index}
                src={src2}
                alt=""
                width={960}
                height={540}
                unoptimized
                className="story-section__banda-img"
              />
            ))}
          </div>
        </div>
      </div>
      )}
      <div className="story-section__rail">
        <nav className="story-section__social" aria-label="Redes">
          {STORY_SOCIAL.map((red) => (
            <a
              key={red.id}
              href={red.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={red.label}
            >
              <StorySocialIcon id={red.id} />
            </a>
          ))}
        </nav>
        <p className="story-section__scroll" aria-hidden>
          <span className="story-section__scroll-label">Scroll</span>
          <span className="story-section__scroll-arrows">
            {Array.from({ length: 4 }, (_, index) => (
              <svg
                key={index}
                viewBox="0 0 16 10"
                className="story-section__scroll-arrow"
              >
                <path
                  d="M1.4 1.4 8 8.2 14.6 1.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
            ))}
          </span>
        </p>
      </div>
      <header className="story-section__heading">
        <div className="story-section__heading-copy">
        <h2
          className="story-section__title"
          id="story-heading"
          style={storyLineStyle(bands?.heading?.titleStyle, "var(--font-sans)")}
        >
          {bands?.heading?.title?.trim() || "Fundamentos del dibujo"}
          <span className="story-section__title-wipe" aria-hidden />
        </h2>
        <p
          className="story-section__lead"
          style={{ ...storyLineStyle(bands?.heading?.leadStyle, "var(--font-sans)"), backgroundColor: "transparent" }}
        >
          <MarkedLead text={lead} background={bands?.heading?.leadStyle.bg ?? ""} />
        </p>
        <p
          className="story-section__rhythm"
          style={{
            ...storyLineStyle(bands?.heading?.rhythmStyle, "var(--font-display)"),
            color: bands?.heading?.rhythmStyle.bg ? `rgb(${bands.heading.rhythmStyle.color})` : "transparent",
            WebkitTextFillColor: bands?.heading?.rhythmStyle.bg ? `rgb(${bands.heading.rhythmStyle.color})` : "transparent",
            WebkitTextStroke: `max(1px, 0.045em) rgb(${bands?.heading?.rhythmStyle.color ?? "252,246,189"})`,
          }}
        >
          {bands?.heading?.rhythm?.trim() || "Aprendé a tu propio ritmo"}
        </p>
        <div className="story-section__paths">
          <button
            type="button"
            className="story-section__path"
            onClick={() => setActive(0)}
          >
            Libro completo
            <svg className="story-section__path-mark" viewBox="0 0 16 24" aria-hidden>
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
          <button
            type="button"
            className="story-section__path"
            onClick={() => setActive(1)}
          >
            Temas
            <svg className="story-section__path-mark" viewBox="0 0 16 24" aria-hidden>
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
        </div>
        </div>
        <div
          className="story-section__lesson"
          data-kind={bands?.heading?.stickerKind ?? "sticker"}
          data-crop={bands?.heading?.stickerKind === "image" && bands.heading.imageCrop ? "true" : "false"}
          style={{ ["--image-size" as string]: (bands?.heading?.imageSize ?? 100) / 100 }}
          data-motion={
            bands?.heading?.stickerKind === "video"
              ? (bands.heading.videoMotion ?? "drift")
              : bands?.heading?.stickerKind === "image"
                ? (bands.heading.imageMotion ?? "kenburns")
                : (bands?.heading?.stickerMotion ?? "cabeceo")
          }
          data-hover={
            bands?.heading?.stickerKind === "video"
              ? (bands.heading.videoHover ?? "none")
              : bands?.heading?.stickerKind === "image"
                ? (bands.heading.imageHover ?? "none")
                : (bands?.heading?.stickerHover ?? "none")
          }
          aria-hidden="true"
        >
          {bands?.heading?.stickerKind === "video" && !stockMedia ? (
            <video
              className="story-section__lesson-image"
              src="/api/hero-banner/profesor?media=video"
              autoPlay
              muted
              loop
              playsInline
              data-border={bands.heading.videoBorder ?? "cine"}
              style={{ ["--sticker-edge" as string]: bands.heading.videoEdge ? `rgb(${bands.heading.videoEdge})` : "var(--ds-surface)" }}
            />
          ) : (
            <Image
              src={stockMedia ? "/media/historia/profesor.png" : "/api/hero-banner/profesor"}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 800px) 11rem, 16rem"
              className="story-section__lesson-image"
              data-border={
                bands?.heading?.stickerKind === "image"
                  ? (bands.heading.imageBorder ?? "marco")
                  : (bands?.heading?.stickerBorder ?? "contorno")
              }
              style={{
                ["--sticker-edge" as string]:
                  bands?.heading?.stickerKind === "image"
                    ? bands.heading.imageEdge
                      ? `rgb(${bands.heading.imageEdge})`
                      : "var(--ds-surface)"
                    : bands?.heading?.stickerEdge
                      ? `rgb(${bands.heading.stickerEdge})`
                      : "var(--ds-surface)",
              }}
            />
          )}
        </div>
      </header>
      <div className="story-section__main">
        <div className="story-section__media">
        <div className="story-section__images">
          {stories.map((story, index) => (
            <button
              key={story.id}
              type="button"
              className={
                index === active
                  ? "story-section__image is-active"
                  : "story-section__image"
              }
              aria-pressed={index === active}
              aria-label={story.title}
              onClick={() => setActive(index)}
            >
              <img
                className="story-section__photo"
                src={story.image}
                alt=""
              />
              <span className="story-section__index">{story.id}</span>
            </button>
          ))}
        </div>
        <div className="story-section__cubes" role="tablist" aria-label="Temas">
          {stories.map((story, index) => {
            const selected = index === active;
            return (
              <button
                key={story.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`${story.id}. ${story.title}`}
                className={
                  selected ? "story-section__cube is-active" : "story-section__cube"
                }
                onClick={() => {
                  if (selected) setCubeTick((tick) => tick + 1);
                  setActive(index);
                }}
              >
                <span
                  key={selected ? cubeTick : "quiet"}
                  className={
                    selected
                      ? "story-section__cube-spin is-pop"
                      : "story-section__cube-spin"
                  }
                >
                  <Image
                    src={stockMedia ? "/media/decoracion/cubo.png" : (CUBE_SRC[index] ?? "/media/decoracion/cubo.png")}
                    alt=""
                    width={80}
                    height={80}
                    unoptimized
                    className="story-section__cube-img"
                  />
                </span>
              </button>
            );
          })}
        </div>
        </div>
        <div className="story-section__aside">
        <ul className="story-section__list">
          {stories.map((story, index) => (
            <li
              key={story.id}
              className={
                index === active
                  ? "story-section__item is-active"
                  : index === active - 1
                    ? "story-section__item is-before"
                    : "story-section__item"
              }
              onClick={() => setActive(index)}
            >
              <div className="story-section__copy">
                <StoryTitle id={story.id} title={story.title} active={index === active} lineColor={bands?.heading?.nameLine ?? "0,0,0"} titleColor={bands?.heading?.nameColor ?? "0,0,0"} />
                {index === active ? (
                  <>
                    <p className="story-section__blurb">
                      <span className="story-section__blurb-text" style={{ color: `rgb(${bands?.heading?.storyText ?? "0,0,0"})` }}>{story.text}</span>
                      <button
                        type="button"
                        className="story-section__more"
                        data-motion={bands?.heading?.verMotion ?? "tilt"}
                        style={{ backgroundColor: `rgb(${bands?.heading?.ver ?? "252,246,189"})` }}
                        onClick={(event) => {
                          event.stopPropagation();
                          setActive(index);
                          setSlide(0);
                          setOpenId(story.id);
                        }}
                      >
                        VER
                      </button>
                    </p>
                    <span className="story-section__rule" aria-hidden="true" style={{ color: `rgb(${bands?.heading?.rule ?? "0,0,0"})` }}>
                      <svg viewBox="0 0 82 48" className="story-section__rule-end">
                        <path
                          d="M0 9 H8 L41 44 L81 6.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.4"
                          strokeLinejoin="miter"
                          strokeLinecap="butt"
                        />
                      </svg>
                    </span>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
        <div className="story-section__riders" aria-hidden>
          <div className="story-section__scooter">
            <span className="story-section__trail">
              <span className="story-section__trail-text">{TRAIL_TEXT}</span>
            </span>
            <span className="story-section__scooter-body">
              {SCOOTER_FRAMES.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={645}
                  height={614}
                  unoptimized
                  className="story-section__scooter-frame"
                />
              ))}
            </span>
          </div>
        </div>
        </div>
      </div>
      {openStory && currentSlide ? (
        <dialog
          className="story-section__modal"
          open
          aria-label={openStory.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpenId(null);
          }}
        >
          <div className="story-section__panel">
            <div className="story-section__slide">
              <img
                className="story-section__slide-photo"
                src={openStory.image}
                alt=""
                style={{ objectPosition: currentSlide.position }}
              />
              <div className="story-section__slide-copy">
                <p className="story-section__kicker">{currentSlide.kicker}</p>
                <p className="story-section__slide-title">{currentSlide.title}</p>
              </div>
              <p className="story-section__caption">{currentSlide.text}</p>
            </div>
            <ol className="story-section__dots">
              {openSlides.map((item, index) => (
                <li key={item.title}>
                  <button
                    type="button"
                    className={
                      index === slide
                        ? "story-section__dot is-active"
                        : "story-section__dot"
                    }
                    aria-label={`Lámina ${index + 1}`}
                    aria-current={index === slide ? "true" : undefined}
                    onClick={() => setSlide(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ol>
            <button
              type="button"
              className="story-section__close"
              aria-label="Cerrar"
              onClick={() => setOpenId(null)}
            >
              ×
            </button>
            <button
              type="button"
              className="story-section__arrow story-section__arrow--prev"
              aria-label="Anterior"
              onClick={() =>
                setSlide((value) => (value - 1 + openSlides.length) % openSlides.length)
              }
            >
              ‹
            </button>
            <button
              type="button"
              className="story-section__arrow story-section__arrow--next"
              aria-label="Siguiente"
              onClick={() => setSlide((value) => (value + 1) % openSlides.length)}
            >
              ›
            </button>
          </div>
        </dialog>
      ) : null}
    </section>
  );
}
