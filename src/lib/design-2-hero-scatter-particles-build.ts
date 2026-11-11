import { mulberry32 } from "@/lib/seeded-random";
import type { Design2HeroScatterPresetId } from "@/lib/design-2-hero-scatter-preset";

const PARTICLE_COUNT = 320;
const STIPPLE_COUNT = 440;
const SEED = 0x9e2f4a17;
const STIPPLE_SEED = 0x6b3c91e4;

export const SCATTER_ANIMS = [
  "whip",
  "flicker",
  "jitter",
  "strobe",
  "zigzag",
  "spin-tick",
] as const;

export type ScatterAnim = (typeof SCATTER_ANIMS)[number];

type SplashKind = "speck" | "splash" | "splash-outlined" | "stipple" | "shard";

export type ScatterParticle = {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  opacity: number;
  clipPath: string;
  kind: SplashKind;
  anim: ScatterAnim;
  durS: number;
  ampPx: number;
  delayS: number;
  parallaxK: number;
  /** Saltos de posición al reaparecer (solo anim flicker). */
  flickerHop1X: number;
  flickerHop1Y: number;
  flickerHop2X: number;
  flickerHop2Y: number;
  flickerHop3X: number;
  flickerHop3Y: number;
};

const CLUSTER_CENTERS = [
  { x: 78, y: 12 },
  { x: 22, y: 88 },
  { x: 52, y: 48 },
  { x: 90, y: 72 },
] as const;

function shardClip(rand: () => number): string {
  const tipX = 42 + rand() * 16;
  const tipY = 4 + rand() * 18;
  const wing = 28 + rand() * 22;
  return `polygon(${tipX.toFixed(1)}% ${tipY.toFixed(1)}%, ${(tipX + wing).toFixed(1)}% ${(48 + rand() * 22).toFixed(1)}%, ${(tipX - wing * 0.35).toFixed(1)}% ${(62 + rand() * 18).toFixed(1)}%)`;
}

function jaggedSplashClip(rand: () => number): string {
  const spikes = 5 + Math.floor(rand() * 5);
  const points: string[] = [];
  for (let i = 0; i < spikes; i += 1) {
    const t = (i / spikes) * Math.PI * 2;
    const jag = 0.45 + rand() * 0.55;
    const r = 28 + rand() * 22;
    const x = 50 + Math.cos(t) * r * jag;
    const y = 50 + Math.sin(t) * r * jag;
    const pinch = rand() > 0.55;
    const px = pinch ? 50 + (x - 50) * 1.15 : x;
    const py = pinch ? 50 + (y - 50) * 0.85 : y;
    points.push(`${px.toFixed(1)}% ${py.toFixed(1)}%`);
  }
  return `polygon(${points.join(", ")})`;
}

function pickPosition(rand: () => number): { left: number; top: number } {
  const useCluster = rand() < 0.38;
  if (!useCluster) {
    return { left: rand() * 100, top: rand() * 100 };
  }
  const cluster =
    CLUSTER_CENTERS[Math.floor(rand() * CLUSTER_CENTERS.length)] ??
    CLUSTER_CENTERS[0];
  const spread = 4 + rand() * 14;
  return {
    left: cluster.x + (rand() - 0.5) * spread,
    top: cluster.y + (rand() - 0.5) * spread,
  };
}

function pickStipplePosition(rand: () => number): { left: number; top: number } {
  const left = 34 + rand() * 48 + (rand() - 0.5) * 6;
  const top = 22 + rand() * 56 + (rand() - 0.5) * 5;
  return { left, top };
}

function pickAnim(
  rand: () => number,
  kind: SplashKind,
  preset: Design2HeroScatterPresetId,
): ScatterAnim {
  if (kind === "stipple" || kind === "shard") {
    return preset === "mix" ? "flicker" : preset;
  }
  if (preset !== "mix") return preset;
  if (kind === "speck") {
    const speckPool: ScatterAnim[] = ["flicker", "zigzag", "jitter"];
    return speckPool[Math.floor(rand() * speckPool.length)] ?? "flicker";
  }
  if (kind === "splash-outlined") {
    const bigPool: ScatterAnim[] = ["whip", "jitter", "strobe", "spin-tick"];
    return bigPool[Math.floor(rand() * bigPool.length)] ?? "whip";
  }
  return SCATTER_ANIMS[Math.floor(rand() * SCATTER_ANIMS.length)] ?? "whip";
}

function buildFlickerHops(
  rand: () => number,
  ampPx: number,
  anim: ScatterAnim,
): Pick<
  ScatterParticle,
  | "flickerHop1X"
  | "flickerHop1Y"
  | "flickerHop2X"
  | "flickerHop2Y"
  | "flickerHop3X"
  | "flickerHop3Y"
> {
  const isFlicker = anim === "flicker";
  const spread = isFlicker
    ? ampPx * (7.5 + rand() * 6.5)
    : ampPx * (1.35 + rand() * 1.1);

  const oneHop = (): { x: number; y: number } => {
    const angle = rand() * Math.PI * 2;
    const radiusT = isFlicker ? 0.62 + rand() * 0.38 : rand();
    const r = spread * radiusT;
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
  };

  const h1 = oneHop();
  const h2 = oneHop();
  const h3 = oneHop();

  return {
    flickerHop1X: h1.x,
    flickerHop1Y: h1.y,
    flickerHop2X: h2.x,
    flickerHop2Y: h2.y,
    flickerHop3X: h3.x,
    flickerHop3Y: h3.y,
  };
}

function durationForAnim(rand: () => number, anim: ScatterAnim): number {
  if (anim === "flicker") return 4.5 + rand() * 3.8;
  if (anim === "zigzag") return 0.16 + rand() * 0.2;
  return 0.22 + rand() * 0.45;
}

function appendStippleAndShards(
  preset: Design2HeroScatterPresetId,
  out: ScatterParticle[],
  baseId: number,
): void {
  const rand = mulberry32(STIPPLE_SEED);

  for (let i = 0; i < STIPPLE_COUNT; i += 1) {
    const id = baseId + i;
    const isShard = i % 19 === 0;
    const kind: SplashKind = isShard ? "shard" : "stipple";
    const { left, top } = pickStipplePosition(rand);

    let width: number;
    let height: number;
    let opacity: number;
    let parallaxK: number;
    let ampPx: number;
    let clipPath: string;

    if (isShard) {
      width = 5 + rand() * 9;
      height = 7 + rand() * 11;
      opacity = 0.48 + rand() * 0.34;
      parallaxK = 0.18 + rand() * 0.12;
      ampPx = 8 + rand() * 14;
      clipPath = shardClip(rand);
    } else {
      const dot = 1.15 + rand() * 1.55;
      width = dot;
      height = dot * (0.85 + rand() * 0.3);
      opacity = 0.3 + rand() * 0.46;
      parallaxK = 0.08 + rand() * 0.08;
      ampPx = 2 + rand() * 5;
      clipPath = `ellipse(${46 + rand() * 18}% ${44 + rand() * 20}% at 50% 50%)`;
    }

    const anim = pickAnim(rand, kind, preset);
    const durS = durationForAnim(rand, anim);
    const hops = buildFlickerHops(rand, ampPx, anim);

    out.push({
      id,
      left,
      top,
      width,
      height,
      rotate: rand() * 360,
      opacity,
      clipPath,
      kind,
      anim,
      durS,
      ampPx,
      delayS: rand() * 2.4,
      parallaxK,
      ...hops,
    });
  }
}

export function buildScatterParticles(
  preset: Design2HeroScatterPresetId,
): ScatterParticle[] {
  const rand = mulberry32(SEED);
  const out: ScatterParticle[] = [];

  for (let id = 0; id < PARTICLE_COUNT; id += 1) {
    const roll = rand();
    let kind: SplashKind = "speck";
    if (roll > 0.9) kind = "splash-outlined";
    else if (roll > 0.48) kind = "splash";

    let width: number;
    let height: number;
    let opacity: number;
    let parallaxK: number;
    let ampPx: number;

    if (kind === "splash-outlined") {
      width = 11 + rand() * 14;
      height = 9 + rand() * 11;
      opacity = 0.62 + rand() * 0.28;
      parallaxK = 0.35 + rand() * 0.25;
      ampPx = 10 + rand() * 16;
    } else if (kind === "splash") {
      width = 3.5 + rand() * 7.5;
      height = 3 + rand() * 6.5;
      opacity = 0.36 + rand() * 0.38;
      parallaxK = 0.22 + rand() * 0.2;
      ampPx = 6 + rand() * 12;
    } else {
      width = 1 + rand() * 2;
      height = 0.85 + rand() * 1.65;
      opacity = 0.22 + rand() * 0.36;
      parallaxK = 0.12 + rand() * 0.12;
      ampPx = 3 + rand() * 6;
    }

    const anim = pickAnim(rand, kind, preset);
    const durS = durationForAnim(rand, anim);

    const { left, top } = pickPosition(rand);
    const clipPath =
      kind === "speck"
        ? `ellipse(${42 + rand() * 20}% ${38 + rand() * 24}% at 50% 50%)`
        : jaggedSplashClip(rand);

    const hops = buildFlickerHops(rand, ampPx, anim);

    out.push({
      id,
      left,
      top,
      width,
      height,
      rotate: rand() * 360,
      opacity,
      clipPath,
      kind,
      anim,
      durS,
      ampPx,
      delayS: rand() * 0.65,
      parallaxK,
      ...hops,
    });
  }

  appendStippleAndShards(preset, out, PARTICLE_COUNT);

  return out;
}
