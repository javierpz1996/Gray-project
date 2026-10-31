"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  design10HeroDividers,
  design10HeroPanelClipPaths,
  design10HeroPanels,
  type Design10HeroPanelSlot,
} from "@/components/home/design-10/design-10-hero-geometry";
import { HomeDesign1HeroAnimationLab } from "@/components/home/home-design-1-hero-animation-lab";
import { site } from "@/config/site";
import { homeDesignAnchor } from "@/lib/home-design";
import {
  gateHomeDesign1HeroMotion,
  useHomeDesign1HeroRun,
} from "@/lib/use-home-design-1-hero-run";
import {
  homeDesign1HeroAnimationHint,
  homeDesign1HeroAnimationLabel,
  type HomeDesign1HeroAnimationId,
} from "@/lib/home-design-1-hero-animation";
import {
  getHomeDesign1DividerMotion,
  getHomeDesign1PanelMotion,
  homeDesign1PanelTransformOrigin,
  type HomeDesign1PanelSlot,
} from "@/lib/home-design-1-hero-motion-presets";

/** Mapa de posiciones diagonales de diseño 10 a los slots de presets de diseño 1. */
const PANEL_PRESET_SLOT: Record<Design10HeroPanelSlot, HomeDesign1PanelSlot> = {
  top: "left",
  center: "center",
  bottom: "right",
};

const DIVIDER_IDS = ["first", "second"] as const;

const navLinks = [
  { href: homeDesignAnchor(10, "inicio"), label: "Inicio" },
  { href: homeDesignAnchor(10, "libros"), label: "Comisiones" },
  { href: "/portafolio/sin-titulo-i", label: "Portfolio" },
  { href: homeDesignAnchor(10, "sobre-mi"), label: "Sobre mí" },
] as const;

function Design10Sparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={20}
      height={20}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 0 14.2 9.8 24 12l-9.8 2.2L12 24l-2.2-9.8L0 12l9.8-2.2z"
      />
    </svg>
  );
}

type HomeDesign10HeroProps = {
  heroAnimation?: HomeDesign1HeroAnimationId;
};

/** Hero diseño 10 — split diagonal + tri-panel con las animaciones de diseño 1. */
export function HomeDesign10Hero({ heroAnimation = 3 }: HomeDesign10HeroProps = {}) {
  const hero = site.homeDesign10;
  const reducedMotion = useReducedMotion() ?? false;
  const { introReady, motionKey } = useHomeDesign1HeroRun(heroAnimation);
  const animLabel = homeDesign1HeroAnimationLabel(heroAnimation);
  const animHint = homeDesign1HeroAnimationHint(heroAnimation);

  return (
    <section
      id="inicio"
      className="home-design-10-hero"
      aria-labelledby="home-design-10-title"
      data-d10-hero-anim={heroAnimation}
      data-hero-intro={introReady ? "ready" : "pending"}
      data-d10-hero-hint={`${animLabel}. ${animHint}`}
    >
      <div className="home-design-10-hero__stage">
        <div className="home-design-10-hero__media" aria-hidden>
          {design10HeroPanels.map(({ slot, imageSrc, imagePosition }) => {
            const presetSlot = PANEL_PRESET_SLOT[slot];
            const config = getHomeDesign1PanelMotion(
              heroAnimation,
              presetSlot,
              reducedMotion,
            );
            const panelMotion = gateHomeDesign1HeroMotion(introReady, config);
            return (
              <motion.div
                key={`panel-${slot}-${motionKey}`}
                className="home-design-10-hero__panel"
                style={{
                  clipPath: design10HeroPanelClipPaths[slot],
                  WebkitClipPath: design10HeroPanelClipPaths[slot],
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: imagePosition,
                  transformOrigin: homeDesign1PanelTransformOrigin(
                    heroAnimation,
                    presetSlot,
                  ),
                }}
                initial={panelMotion.initial}
                animate={panelMotion.animate}
                transition={panelMotion.transition}
              />
            );
          })}
          <svg
            className="home-design-10-hero__dividers"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {design10HeroDividers.map(({ from, to }, index) => {
              const dividerId = DIVIDER_IDS[index] ?? "second";
              const config = getHomeDesign1DividerMotion(
                heroAnimation,
                dividerId,
                reducedMotion,
              );
              const dividerMotion = gateHomeDesign1HeroMotion(introReady, config);
              return (
                <motion.line
                  key={`divider-${dividerId}-${motionKey}`}
                  x1={from[0]}
                  y1={from[1]}
                  x2={to[0]}
                  y2={to[1]}
                  className="home-design-10-hero__divider"
                  vectorEffect="non-scaling-stroke"
                  initial={dividerMotion.initial}
                  animate={dividerMotion.animate}
                  transition={dividerMotion.transition}
                  style={{ transformOrigin: "center", transformBox: "fill-box" }}
                />
              );
            })}
          </svg>
        </div>

        <header className="home-design-10-hero__top">
          <div className="home-design-10-hero__top-inner">
            <Link
              href={homeDesignAnchor(10, "inicio")}
              className="home-design-10-hero__wordmark"
            >
              {hero.wordmark}
            </Link>
            <nav className="home-design-10-hero__nav" aria-label="Principal">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="home-design-10-hero__nav-link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link href={hero.contactHref} className="home-design-10-hero__contact">
              {hero.contactLabel}
            </Link>
          </div>
        </header>

        <div className="home-design-10-hero__canvas">
          <div className="home-design-10-hero__copy">
            <Design10Sparkle className="home-design-10-hero__copy-sparkle text-ds-yellow" />
            <h1
              id="home-design-10-title"
              className="home-design-10-hero__title"
            >
              {hero.headline}
            </h1>
            <p className="home-design-10-hero__subline">{hero.subline}</p>
            <Link href={hero.ctaHref} className="home-design-10-hero__cta">
              {hero.ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="home-design-10-hero__scroll" aria-hidden>
            <svg viewBox="0 0 24 24" width={16} height={16}>
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                d="M12 4v14m0 0-5-5m5 5 5-5"
              />
            </svg>
            Scroll
          </div>
        </div>

        <HomeDesign1HeroAnimationLab design={10} />
      </div>
    </section>
  );
}
