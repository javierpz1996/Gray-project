"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import "./story-section.css";

const BANDA_SRC = "/Imagenes/Varias/banda-loop.png";
const CUBE_SRC = "/Imagenes/Varias/cubo.png";
const SCOOTER_FRAMES = [1, 2, 3, 4, 5, 6, 7, 8].map(
  (n) => `/Imagenes/Varias/scooter/frame-${n}.png?v=3`,
);
const TRAIL_TEXT = "30% OFF solo hasta el 04/11";

const STORY_SOCIAL = [
  { id: "x", label: "X", href: site.links.x },
  { id: "youtube", label: "YouTube", href: site.links.youtube },
  { id: "facebook", label: "Facebook", href: site.links.facebook },
  { id: "instagram", label: "Instagram", href: site.links.instagram },
  { id: "tiktok", label: "TikTok", href: site.links.tiktok },
] as const;

function StorySocialIcon({ id }: { id: (typeof STORY_SOCIAL)[number]["id"] }) {
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

const STORIES: readonly StoryItem[] = [
  {
    id: "001",
    title: "Fundamentos del dibujo",
    text: "Aprendé las bases del dibujo, desde las primeras líneas hasta la construcción de formas y volúmenes.",
    image: "/Imagenes/heroexample/ejemplo1HD.png",
    points: [
      { range: "01–04", label: "Introducción al dibujo y materiales" },
      { range: "05–08", label: "Líneas, trazos y control del lápiz" },
    ],
  },
  {
    id: "002",
    title: "Técnicas y ejercicios",
    text: "Explorá técnicas y ejercicios para mejorar tu trazo y desarrollar tu estilo.",
    image: "/Imagenes/heroexample/ejemplo2HD.png",
    points: [
      { range: "09–12", label: "Bocetos y dibujo gestual" },
      { range: "13–16", label: "Técnicas de sombreado" },
    ],
  },
  {
    id: "003",
    title: "Personajes e ilustración",
    text: "Descubrí cómo crear personajes, construir poses y dar vida a tus ilustraciones.",
    image: "/Imagenes/heroexample/ejemplo3HD.png",
    points: [
      { range: "17–20", label: "Anatomía del cuerpo humano" },
      { range: "21–24", label: "Poses, movimiento y gestualidad" },
    ],
  },
  {
    id: "004",
    title: "Anatomía y proporciones",
    text: "Estudiá las estructuras del cuerpo y los detalles que permiten construir personajes expresivos.",
    image: "/Imagenes/Varias/hero2.png",
    points: [
      { range: "25–28", label: "Anatomía de la cabeza y el cráneo" },
      { range: "29–32", label: "Rostro, facciones y expresiones" },
    ],
  },
];

export function StorySection() {
  const [active, setActive] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const [slide, setSlide] = useState(0);
  const [cubeTick, setCubeTick] = useState(0);

  const openStory = STORIES.find((story) => story.id === openId) ?? null;
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
      <div className="story-section__bands" aria-hidden>
        <div className="story-section__banda">
          <div className="story-section__banda-track">
            <Image
              src={BANDA_SRC}
              alt=""
              width={1760}
              height={724}
              unoptimized
              className="story-section__banda-img"
            />
            <Image
              src={BANDA_SRC}
              alt=""
              width={1760}
              height={724}
              unoptimized
              className="story-section__banda-img"
            />
          </div>
        </div>
        <div className="story-section__banda story-section__banda--top-left">
          <div className="story-section__banda-track">
            <Image
              src={BANDA_SRC}
              alt=""
              width={1760}
              height={724}
              unoptimized
              className="story-section__banda-img"
            />
            <Image
              src={BANDA_SRC}
              alt=""
              width={1760}
              height={724}
              unoptimized
              className="story-section__banda-img"
            />
          </div>
        </div>
      </div>
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
        <h2 className="story-section__title" id="story-heading">
          Fundamentos del dibujo
          <span className="story-section__title-wipe" aria-hidden />
        </h2>
        <p className="story-section__lead">
          Conseguí la edición completa o elegí los temas que más te interesen.
        </p>
        <p className="story-section__rhythm">Aprendé a tu propio ritmo</p>
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
        <div className="story-section__lesson" aria-hidden="true">
          <Image
            src="/Imagenes/Varias/profesor.png"
            alt=""
            fill
            sizes="(max-width: 800px) 11rem, 16rem"
            className="story-section__lesson-image"
          />
        </div>
      </header>
      <div className="story-section__main">
        <div className="story-section__media">
        <div className="story-section__images">
          {STORIES.map((story, index) => (
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
          {STORIES.map((story, index) => {
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
                    src={CUBE_SRC}
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
          {STORIES.map((story, index) => (
            <li
              key={story.id}
              className={
                index === active
                  ? "story-section__item is-active"
                  : "story-section__item"
              }
              onClick={() => setActive(index)}
            >
              <div className="story-section__copy">
                <p className="story-section__name">
                  <span className="story-section__number">{story.id}</span>
                  {" — "}
                  {story.title}
                </p>
                <p className="story-section__blurb">
                  <span className="story-section__blurb-text">{story.text}</span>
                  <button
                    type="button"
                    className="story-section__more"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActive(index);
                      setSlide(0);
                      setOpenId(story.id);
                    }}
                  >
                    MORE+
                  </button>
                </p>
                <ul className="story-section__points">
                  {story.points.map((point) => (
                    <li key={point.range} className="story-section__point">
                      {point.range} {point.label}
                    </li>
                  ))}
                </ul>
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
