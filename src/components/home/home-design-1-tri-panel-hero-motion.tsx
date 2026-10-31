"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import {
  homeDesign1HeroAnimationHint,
  homeDesign1HeroAnimationLabel,
  type HomeDesign1HeroAnimationId,
} from "@/lib/home-design-1-hero-animation";
import {
  getHomeDesign1LogoAnimation,
  type HomeDesign1LogoAnimationId,
} from "@/lib/home-design-1-logo-animation";
import {
  gateHomeDesign1HeroMotion,
  useHomeDesign1HeroRun,
} from "@/lib/use-home-design-1-hero-run";
import {
  getHomeDesign1DividerMotion,
  getHomeDesign1PanelMotion,
  homeDesign1PanelTransformOrigin,
  type HomeDesign1PanelSlot,
} from "@/lib/home-design-1-hero-motion-presets";
import { HomeDesign1HeroAnimationLab } from "@/components/home/home-design-1-hero-animation-lab";
import {
  DESIGN1_BANNER_HEIGHT,
  DESIGN1_BANNER_WIDTH,
  DESIGN1_HERO_BORDER_PX,
  design1HeroDividerLinePx,
  design1HeroDividers,
  design1HeroPanelBoundsPx,
  design1HeroPanelPhotos,
  design1HeroPanelPolygonsPx,
} from "@/components/home/design-1-tri-panel-geometry";

const dividerFirst = design1HeroDividerLinePx(design1HeroDividers.first);
const dividerSecond = design1HeroDividerLinePx(design1HeroDividers.second);
const panelPolygons = design1HeroPanelPolygonsPx();
const panelBounds = design1HeroPanelBoundsPx();

/** Caja (en % del banner) y recorte diagonal de cada foto, igual que los paneles HTML del diseño 10. */
const panelPhotoBoxes = Object.fromEntries(
  (["left", "center", "right"] as const).map((id) => {
    const box = panelBounds[id];
    const points = panelPolygons[id]
      .trim()
      .split(/\s+/)
      .map((pair) => {
        const [x = 0, y = 0] = pair.split(",").map(Number);
        return `${((x - box.x) / box.width) * 100}% ${((y - box.y) / box.height) * 100}%`;
      })
      .join(", ");
    const clipPath = `polygon(${points})`;
    return [
      id,
      {
        left: `${(box.x / DESIGN1_BANNER_WIDTH) * 100}%`,
        top: `${(box.y / DESIGN1_BANNER_HEIGHT) * 100}%`,
        width: `${(box.width / DESIGN1_BANNER_WIDTH) * 100}%`,
        height: `${(box.height / DESIGN1_BANNER_HEIGHT) * 100}%`,
        clipPath,
        WebkitClipPath: clipPath,
      } satisfies CSSProperties,
    ];
  }),
) as Record<HomeDesign1PanelSlot, CSSProperties>;

const panelOrder: readonly HomeDesign1PanelSlot[] = ["left", "center", "right"];

const LOGO_PANEL_INDEX = 3;
const LOGO_WIDTH = 2097;
const LOGO_HEIGHT = 2097;

type HomeDesign1TriPanelHeroProps = {
  imageSrc?: string;
  imageAlt?: string;
  panelColors?: boolean;
  heroAnimation?: HomeDesign1HeroAnimationId;
  logoAnimation?: HomeDesign1LogoAnimationId;
};

export function HomeDesign1TriPanelHero({
  imageSrc = site.homeBannerSrc,
  imageAlt = site.homeBannerAlt,
  panelColors = true,
  heroAnimation = 3,
  logoAnimation = 0,
}: HomeDesign1TriPanelHeroProps = {}) {
  const viewBox = `0 0 ${DESIGN1_BANNER_WIDTH} ${DESIGN1_BANNER_HEIGHT}`;
  const animLabel = homeDesign1HeroAnimationLabel(heroAnimation);
  const animHint = homeDesign1HeroAnimationHint(heroAnimation);
  const reducedMotion = useReducedMotion() ?? false;
  const { introReady, motionKey } = useHomeDesign1HeroRun(heroAnimation);
  const logoMotion = getHomeDesign1LogoAnimation(
    logoAnimation,
    heroAnimation,
    reducedMotion,
  );
  const logoMotionKey = `${motionKey}-${logoAnimation}`;
  const logoEnter = gateHomeDesign1HeroMotion(introReady, logoMotion.enter);

  return (
    <section
      id="inicio"
      className="home-design-1-tri-hero scroll-mt-[var(--site-header-height)]"
      data-d1-hero-anim={heroAnimation}
      data-hero-intro={introReady ? "ready" : "pending"}
      aria-label={
        panelColors
          ? `Composición del hero en tres paneles — animación ${animLabel}. ${animHint}`
          : imageAlt
      }
    >
      <div className="home-design-1-tri-hero__frame">
        {!panelColors ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="home-design-1-tri-hero__image"
          />
        ) : null}
        {panelColors ? (
          <>
            <div
              key={`panels-${motionKey}`}
              className="home-design-1-tri-hero__photos"
              aria-hidden
            >
              {panelOrder.map((id, index) => {
                const motionConfig = getHomeDesign1PanelMotion(
                  heroAnimation,
                  id,
                  reducedMotion,
                );
                const panelMotion = gateHomeDesign1HeroMotion(
                  introReady,
                  motionConfig,
                );
                return (
                  <motion.div
                    key={id}
                    className="home-design-1-tri-hero__panel home-design-1-tri-hero__photo"
                    initial={panelMotion.initial}
                    animate={panelMotion.animate}
                    transition={panelMotion.transition}
                    style={{
                      ...panelPhotoBoxes[id],
                      backgroundImage: `url(${design1HeroPanelPhotos[id]})`,
                      transformOrigin: homeDesign1PanelTransformOrigin(
                        heroAnimation,
                        id,
                      ),
                      animationDelay: `${index * 0.9}s`,
                    }}
                  />
                );
              })}
            </div>
            <motion.div
              key={`logo-${logoMotionKey}`}
              className="home-design-1-tri-hero__panel home-design-1-tri-hero__panel--logo"
              aria-hidden
              initial={logoEnter.initial}
              animate={logoEnter.animate}
              transition={logoEnter.transition}
              style={
                {
                  ["--d1-panel-index"]: LOGO_PANEL_INDEX,
                  transformPerspective: 900,
                } as CSSProperties
              }
            >
              <motion.span
                className="home-design-1-tri-hero__logo-disc"
                animate={introReady ? logoMotion.idle?.animate : undefined}
                transition={introReady ? logoMotion.idle?.transition : undefined}
              >
                <Image
                  src={site.logoSrc}
                  alt=""
                  width={LOGO_WIDTH}
                  height={LOGO_HEIGHT}
                  priority
                  unoptimized
                  sizes="14vmin"
                  className="home-design-1-tri-hero__logo-image"
                />
              </motion.span>
            </motion.div>
            <svg
              key={`lines-${motionKey}`}
              className="home-design-1-tri-hero__overlay home-design-1-tri-hero__overlay--lines"
              viewBox={viewBox}
              preserveAspectRatio="none"
              aria-hidden
            >
              {(
                [
                  {
                    id: "first" as const,
                    line: dividerFirst,
                    className: "home-design-1-tri-hero__divider--first",
                  },
                  {
                    id: "second" as const,
                    line: dividerSecond,
                    className: "home-design-1-tri-hero__divider--second",
                  },
                ] as const
              ).map(({ id, line, className }) => {
                const motionConfig = getHomeDesign1DividerMotion(
                  heroAnimation,
                  id,
                  reducedMotion,
                );
                const dividerMotion = gateHomeDesign1HeroMotion(
                  introReady,
                  motionConfig,
                );
                return (
                  <motion.line
                    key={id}
                    className={`home-design-1-tri-hero__divider ${className}`}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="var(--ds-ink)"
                    strokeWidth={DESIGN1_HERO_BORDER_PX}
                    vectorEffect="non-scaling-stroke"
                    initial={dividerMotion.initial}
                    animate={dividerMotion.animate}
                    transition={dividerMotion.transition}
                    style={{
                      transformOrigin: "center",
                      transformBox: "fill-box",
                    }}
                  />
                );
              })}
            </svg>
            <HomeDesign1HeroAnimationLab />
          </>
        ) : null}
      </div>
    </section>
  );
}
