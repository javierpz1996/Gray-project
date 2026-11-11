"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  buildScatterParticles,
  type ScatterParticle,
} from "@/lib/design-2-hero-scatter-particles-build";
import type { Design2HeroScatterPresetId } from "@/lib/design-2-hero-scatter-preset";
import "./design-2-hero-scatter-particles.css";

type Design2HeroScatterParticlesProps = {
  preset?: Design2HeroScatterPresetId;
};

function renderGrain(p: ScatterParticle) {
  return (
    <span
      key={p.id}
      className={`d2-hero-scatter__splash d2-hero-scatter__splash--${p.kind} d2-hero-scatter__splash--motion-${p.anim}`}
      style={{
        left: `${p.left}%`,
        top: `${p.top}%`,
        width: `${p.width}px`,
        height: `${p.height}px`,
        ["--d2-scatter-base-rot" as string]: `${p.rotate}deg`,
        ["--d2-scatter-base-opacity" as string]: String(p.opacity),
        clipPath: p.clipPath,
        WebkitClipPath: p.clipPath,
        ["--d2-scatter-dur" as string]: `${p.durS}s`,
        ["--d2-scatter-amp" as string]: `${p.ampPx}px`,
        ["--d2-scatter-delay" as string]: `${p.delayS}s`,
        ["--d2-scatter-parallax" as string]: String(p.parallaxK),
        ["--d2-scatter-hop-1-x" as string]: `${p.flickerHop1X}px`,
        ["--d2-scatter-hop-1-y" as string]: `${p.flickerHop1Y}px`,
        ["--d2-scatter-hop-2-x" as string]: `${p.flickerHop2X}px`,
        ["--d2-scatter-hop-2-y" as string]: `${p.flickerHop2Y}px`,
        ["--d2-scatter-hop-3-x" as string]: `${p.flickerHop3X}px`,
        ["--d2-scatter-hop-3-y" as string]: `${p.flickerHop3Y}px`,
      }}
    />
  );
}

/** Salpicaduras blancas en el hero (debajo de carteles y flow). */
export function Design2HeroScatterParticles({
  preset = "flicker",
}: Design2HeroScatterParticlesProps) {
  const particles = useMemo(() => buildScatterParticles(preset), [preset]);
  const layerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !finePointer) return;

    const hero = layer.closest<HTMLElement>(".home-design-2-tri-hero");

    const tick = () => {
      const o = offsetRef.current;
      const t = targetRef.current;
      o.x += (t.x - o.x) * 0.12;
      o.y += (t.y - o.y) * 0.12;
      layer.style.setProperty("--d2-scatter-mx", `${o.x.toFixed(2)}px`);
      layer.style.setProperty("--d2-scatter-my", `${o.y.toFixed(2)}px`);
      frameRef.current = requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      targetRef.current = {
        x: (event.clientX / w - 0.5) * 34,
        y: (event.clientY / h - 0.5) * 14,
      };
    };

    frameRef.current = requestAnimationFrame(tick);
    hero?.addEventListener("mousemove", onMove);
    return () => {
      hero?.removeEventListener("mousemove", onMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="d2-hero-scatter"
      data-scatter-preset={preset}
      aria-hidden
    >
      {particles.map(renderGrain)}
    </div>
  );
}
