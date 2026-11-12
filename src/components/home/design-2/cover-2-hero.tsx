"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { STORY_SOCIAL, StorySocialIcon } from "@/components/home/design-2/story-section";
import type { Cover2LogoMark } from "@/lib/cover-2-logo";
import {
  cover2MenuFontFamily,
  defaultCover2Menu,
  type Cover2MenuItem,
  type Cover2SlideMotion,
} from "@/lib/cover-2-menu";
import { HOME_SITE_INTRO_COMPLETE_EVENT, isSiteIntroComplete } from "@/lib/home-design-1-animation";
import { Cover2OmsKv } from "@/components/home/design-2/cover-2-oms-kv";
import "./cover-2-hero.css";

const SOCIAL = [...STORY_SOCIAL].reverse();

const SLANT_LINKS = [
  { href: "#libros", label: "Libros", external: false },
  { href: "/#portafolio", label: "Obra", external: false },
  { href: "/documentos", label: "Documentos", external: false },
  { href: `mailto:${site.email}`, label: "Contacto", external: false },
  { href: site.links.x, label: "X", external: true },
  { href: site.links.instagram, label: "Instagram", external: true },
] as const;

function PagerTriangle() {
  return (
    <svg viewBox="0 0 64 56" aria-hidden>
      <polygon points="8,6 56,28 8,50" />
    </svg>
  );
}

export function Cover2Hero({
  src = "/api/hero-banner/portada2",
  slides,
  slideMotion = "fundido",
  slideEvery = 0,
  mark = "cruce",
  waitForIntro = true,
  topSrc = null,
  menu,
  backdrop = null,
  slantRail = false,
}: {
  src?: string;
  slides?: string[];
  slideMotion?: Cover2SlideMotion;
  /** Segundos del pase automático. 0 lo deja manual. */
  slideEvery?: number;
  mark?: Cover2LogoMark;
  /** En el panel no hay video de carga: la animación arranca al momento. */
  waitForIntro?: boolean;
  /** Logo circular arriba del wordmark. Sin valor, se muestra solo el wordmark. */
  topSrc?: string | null;
  menu?: Cover2MenuItem[];
  /** Color de fondo en lugar de la foto. Ruta de `public/media/colors`. */
  backdrop?: string | null;
  /** Panel izquierdo en diagonal, solo Diseño 2. */
  slantRail?: boolean;
}) {
  const items = menu && menu.length > 0 ? menu : defaultCover2Menu();
  const frames = slides && slides.length > 0 ? slides : [src];
  const [frame, setFrame] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [ready, setReady] = useState(() => !waitForIntro || isSiteIntroComplete());
  const current = frames[frame] ?? frames[0] ?? src;

  useEffect(() => {
    if (!waitForIntro || isSiteIntroComplete()) {
      setReady(true);
      return;
    }
    const start = () => setReady(true);
    window.addEventListener(HOME_SITE_INTRO_COMPLETE_EVENT, start);
    return () => window.removeEventListener(HOME_SITE_INTRO_COMPLETE_EVENT, start);
  }, [waitForIntro]);

  useEffect(() => {
    setFrame((index) => (index >= frames.length ? 0 : index));
  }, [frames.length]);

  useEffect(() => {
    if (!ready || slideEvery < 1 || frames.length < 2) return;
    const timer = window.setInterval(() => {
      setDir("next");
      setFrame((index) => (index + 1) % frames.length);
    }, slideEvery * 1000);
    return () => window.clearInterval(timer);
  }, [ready, slideEvery, frames.length]);

  return (
    <section
      id="inicio"
      className="cover-2-hero"
      data-mark={mark}
      data-ready={ready ? "true" : "false"}
      data-slide={slideMotion}
      data-dir={dir}
      data-slant={slantRail ? "true" : "false"}
      style={
        backdrop && !slantRail
          ? { background: `url(${backdrop}) center / cover no-repeat` }
          : undefined
      }
      aria-label="Portada"
    >
      {slantRail ? (
        <aside className="cover-2-hero__slant" aria-label="Secciones">
          <div className="cover-2-hero__slant-lockup">
            <p className="cover-2-hero__slant-title">GRAYBY</p>
            <p className="cover-2-hero__slant-subtitle">ART</p>
          </div>
          <nav className="cover-2-hero__slant-nav">
            {SLANT_LINKS.map((item) =>
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  <span className="cover-2-hero__slant-nav-link">{item.label}</span>
                </a>
              ) : (
                <Link key={item.label} href={item.href}>
                  <span className="cover-2-hero__slant-nav-link">{item.label}</span>
                </Link>
              ),
            )}
          </nav>
        </aside>
      ) : null}
      {slantRail ? (
        <Cover2OmsKv slides={frames} slideEvery={slideEvery} />
      ) : backdrop ? null : (
        <Image
          key={current}
          src={current}
          alt=""
          fill
          unoptimized
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="cover-2-hero__image"
        />
      )}
      {!slantRail && !backdrop && frames.length > 1 ? (
        <div className="cover-2-hero__pager">
          <button
            type="button"
            className="cover-2-hero__pager-btn cover-2-hero__pager-btn--prev"
            aria-label="Imagen anterior"
            onClick={() => {
              setDir("prev");
              setFrame((index) => (index - 1 + frames.length) % frames.length);
            }}
          >
            <PagerTriangle />
          </button>
          <button
            type="button"
            className="cover-2-hero__pager-btn"
            aria-label="Imagen siguiente"
            onClick={() => {
              setDir("next");
              setFrame((index) => (index + 1) % frames.length);
            }}
          >
            <PagerTriangle />
          </button>
        </div>
      ) : null}
      <div className="cover-2-hero__mark">
        <div className="cover-2-hero__center">
        <div key={ready ? "play" : "hold"} className="cover-2-hero__lockup" aria-hidden>
          {topSrc ? (
            <Image
              src={topSrc}
              alt=""
              width={640}
              height={640}
              unoptimized
              className="cover-2-hero__mark-top"
            />
          ) : null}
          <div className="cover-2-hero__word">
            <Image
              src="/media/logo-alternative/logo-gray.png"
              alt=""
              width={1600}
              height={520}
              unoptimized
              className="cover-2-hero__mark-gray"
            />
            <Image
              src="/media/logo-alternative/logo-yellow.png"
              alt=""
              width={1600}
              height={520}
              unoptimized
              className="cover-2-hero__mark-yellow"
            />
          </div>
        </div>
        <nav className="cover-2-hero__menu" aria-label="Secciones">
          {items.map((item, index) => (
            <span key={`${item.text}-${index}`} className="cover-2-hero__menu-slot">
              {index > 0 ? <span className="cover-2-hero__menu-sep" aria-hidden>-</span> : null}
              <span
                className="cover-2-hero__menu-item"
                style={{
                  fontFamily: cover2MenuFontFamily[item.font],
                  fontWeight: item.bold ? 800 : 500,
                  fontSize: `calc(${item.scale} / 100 * clamp(0.86rem, 1.7vw, 1.2rem))`,
                  textTransform: item.upper ? "uppercase" : "none",
                  color: `rgb(${item.color})`,
                }}
              >
                {item.text}
              </span>
            </span>
          ))}
        </nav>
        </div>
      </div>
      <div className="cover-2-hero__rail">
        <nav className="cover-2-hero__social" aria-label="Redes">
          {SOCIAL.map((red) => (
            <a key={red.id} href={red.href} target="_blank" rel="noopener noreferrer" aria-label={red.label}>
              <StorySocialIcon id={red.id} />
            </a>
          ))}
        </nav>
        <p className="cover-2-hero__scroll" aria-hidden>
          <span className="cover-2-hero__scroll-label">Scroll</span>
          <span className="cover-2-hero__scroll-arrows">
            {Array.from({ length: 4 }, (_, index) => (
              <svg key={index} viewBox="0 0 16 10" className="cover-2-hero__scroll-arrow">
                <path d="M1.4 1.4 8 8.2 14.6 1.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              </svg>
            ))}
          </span>
        </p>
      </div>
    </section>
  );
}
