"use client";

import { useEffect, useRef, useState } from "react";
import { HomeDesign2TriPanelHero } from "@/components/home/design-2/home-design-2-tri-panel-hero";
import {
  notifySiteIntroComplete,
  replayHomeDesign1HeroAnimation,
} from "@/lib/home-design-1-animation";
import type { HomeDesign1HeroAnimationId } from "@/lib/home-design-1-hero-animation";
import type { HomeDesign1LogoAnimationId } from "@/lib/home-design-1-logo-animation";

const STAGE_WIDTH = 1280;
const STAGE_HEIGHT = 720;

export function HeroPreview({
  revision,
  heroAnimation,
  logoAnimation = 3,
  logoSrc,
  particles,
  dividerWidth,
  veil,
  halftone,
  photos,
}: {
  revision: string;
  heroAnimation: HomeDesign1HeroAnimationId;
  logoAnimation?: HomeDesign1LogoAnimationId;
  logoSrc?: string;
  particles: boolean;
  dividerWidth: number;
  veil: boolean;
  halftone: boolean;
  photos?: Partial<Record<"left" | "center" | "right", string>>;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    notifySiteIntroComplete();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const loop = window.setInterval(replayHomeDesign1HeroAnimation, 5600);
    return () => window.clearInterval(loop);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => setScale(frame.clientWidth / STAGE_WIDTH);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="panel-hero-preview"
      style={{ height: STAGE_HEIGHT * scale }}
      aria-label="Vista previa del hero"
    >
      <div
        className="panel-hero-preview-stage"
        style={{
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        <HomeDesign2TriPanelHero
          key={`${revision}-${heroAnimation}-${logoAnimation}-${logoSrc ?? ""}-${particles ? "on" : "off"}-${dividerWidth}-${veil ? "v" : ""}-${halftone ? "h" : ""}`}
          heroAnimation={heroAnimation}
          logoAnimation={logoAnimation}
          logoSrc={logoSrc}
          scatterPreset={particles ? "flicker" : null}
          dividerWidth={dividerWidth}
          showVeil={veil}
          showHalftone={halftone}
          photos={photos}
        />
      </div>
    </div>
  );
}
