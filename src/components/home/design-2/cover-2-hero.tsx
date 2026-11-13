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
import { Cover2HeroSampleVideo } from "@/components/home/design-2/cover-2-hero-sample-video";
import { Cover2OmsKv } from "@/components/home/design-2/cover-2-oms-kv";
import { Cover2KillBlueStrip } from "@/components/home/design-2/cover-2-kill-blue-strip";
import { Cover2SlantHalftonePicker } from "@/components/home/design-2/cover-2-slant-halftone-picker";
import {
  COVER2_HERO_GLITCH_AMP_LIVE,
  COVER2_HERO_GLITCH_LIVE,
  type Cover2HeroGlitchAmp,
  type Cover2HeroGlitchId,
} from "@/lib/cover-2-hero-glitch";
import {
  COVER2_SLANT_HALFTONE_STORAGE_KEY,
  parseCover2SlantHalftone,
  type Cover2SlantHalftoneId,
} from "@/lib/cover-2-slant-halftone";
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

type Cover2KbHeroAsideProps = {
  videoSrc: string;
  itemsSrc: string;
  videoLabel?: string;
};

function Cover2KbHeroAside({ videoSrc, itemsSrc, videoLabel = "Video destacado" }: Cover2KbHeroAsideProps) {
  return (
    <aside className="cover-2-hero__kb-aside" aria-label="Destacados">
      <Cover2HeroSampleVideo src={videoSrc} barText={videoLabel} />
      <div className="cover-2-hero__kb-aside-items">
        <figure className="cover-2-hero__kb-aside-item">
          <Image
            src={itemsSrc}
            alt=""
            fill
            unoptimized
            sizes="6vw"
            className="cover-2-hero__kb-aside-img cover-2-hero__kb-aside-img--a"
          />
        </figure>
        <figure className="cover-2-hero__kb-aside-item">
          <Image
            src={itemsSrc}
            alt=""
            fill
            unoptimized
            sizes="6vw"
            className="cover-2-hero__kb-aside-img cover-2-hero__kb-aside-img--b"
          />
        </figure>
      </div>
    </aside>
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
  slantHalftone = 3,
  slantHalftonePicker = false,
  /** Columna izquierda idéntica a kill-blue.jp (`top-CNT`). */
  slantKillBlue = false,
  /** Si false, el strip va en `cover-2-kb-rail-zone` (hero + banners). */
  embedKillBlueStrip = true,
  /** Imagen fija en hero kill-blue (sin carrusel OMS). */
  kbHeroSrc = "/media/diseno2/heroimage-test.png",
  /** Columna derecha: video + dos imágenes (espacio libre del KV). */
  kbAside = null,
  glitch = COVER2_HERO_GLITCH_LIVE,
  glitchAmp = COVER2_HERO_GLITCH_AMP_LIVE,
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
  /** Halftone de esquina (1–5). Ver `/diseno-2?halftone=n`. */
  slantHalftone?: Cover2SlantHalftoneId;
  /** Barra para elegir entre las 5 variantes (diseño 2 / stock). */
  slantHalftonePicker?: boolean;
  slantKillBlue?: boolean;
  embedKillBlueStrip?: boolean;
  kbHeroSrc?: string;
  kbAside?: { videoSrc: string; itemsSrc: string; videoLabel?: string } | null;
  glitch?: Cover2HeroGlitchId | 0;
  glitchAmp?: Cover2HeroGlitchAmp;
}) {
  const killBlueStrip = slantRail && slantKillBlue;
  const showKillBlueStrip = killBlueStrip && embedKillBlueStrip;
  const items = menu && menu.length > 0 ? menu : defaultCover2Menu();
  const frames = slides && slides.length > 0 ? slides : [src];
  const [frame, setFrame] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [ready, setReady] = useState(() => !waitForIntro || isSiteIntroComplete());
  const [halftone, setHalftone] = useState(slantHalftone);
  const current = frames[frame] ?? frames[0] ?? src;

  useEffect(() => {
    setHalftone(slantHalftone);
    if (!slantHalftonePicker) return;
    const fromQuery = parseCover2SlantHalftone(
      new URLSearchParams(window.location.search).get("halftone") ?? undefined,
    );
    const fromStorage = parseCover2SlantHalftone(
      localStorage.getItem(COVER2_SLANT_HALFTONE_STORAGE_KEY) ?? undefined,
    );
    const fromUrl = new URLSearchParams(window.location.search).has("halftone")
      ? fromQuery
      : fromStorage;
    setHalftone(fromUrl);
  }, [slantHalftone, slantHalftonePicker]);

  const pickHalftone = (id: Cover2SlantHalftoneId) => {
    setHalftone(id);
    localStorage.setItem(COVER2_SLANT_HALFTONE_STORAGE_KEY, String(id));
    window.dispatchEvent(new Event("cover2-slant-halftone-change"));
    const url = new URL(window.location.href);
    url.searchParams.set("halftone", String(id));
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

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
      data-kb-strip={killBlueStrip ? "true" : "false"}
      style={
        backdrop && !slantRail
          ? { background: `url(${backdrop}) center / cover no-repeat` }
          : undefined
      }
      aria-label="Portada"
    >
      {showKillBlueStrip ? <Cover2KillBlueStrip /> : null}
      {killBlueStrip ? (
        <div className="cover-2-hero__kb-below-kv" aria-hidden />
      ) : null}
      {slantRail && !slantKillBlue ? (
        <aside
          className="cover-2-hero__slant"
          data-halftone={String(halftone)}
          aria-label="Secciones"
        >
          {halftone === 3 ? <div className="cover-2-hero__slant-pattern" aria-hidden /> : null}
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
      {slantRail && killBlueStrip ? (
        <figure
          className="cover-2-hero__kb-kv"
          data-glitch={glitch ? String(glitch) : "0"}
          data-glitch-amp={glitchAmp}
          style={{ ["--kb-kv-src" as string]: `url("${kbHeroSrc}")` }}
        >
          <Image
            src={kbHeroSrc}
            alt=""
            fill
            unoptimized
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 850px) 72vw, min(52vw, 28rem)"
            className="cover-2-hero__kb-kv-image"
          />
        </figure>
      ) : null}
      {slantRail && killBlueStrip && kbAside ? <Cover2KbHeroAside {...kbAside} /> : null}
      {slantRail && !killBlueStrip ? (
        <Cover2OmsKv slides={frames} slideEvery={slideEvery} />
      ) : slantRail && killBlueStrip ? null : backdrop ? null : (
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
      {slantRail && slantHalftonePicker && !slantKillBlue ? (
        <Cover2SlantHalftonePicker value={halftone} onChange={pickHalftone} />
      ) : null}
    </section>
  );
}
