import { parseHomeDesign1HeroAnimation } from "@/lib/home-design-1-hero-animation";
import type { HomeDesign1HeroAnimationId } from "@/lib/home-design-1-hero-animation";
import {
  parseHomeDesign1LogoAnimation,
  type HomeDesign1LogoAnimationId,
} from "@/lib/home-design-1-logo-animation";
import { parseCover2LogoMark, type Cover2LogoMark } from "@/lib/cover-2-logo";
import {
  defaultCover2Menu,
  parseCover2Menu,
  parseCover2SlideEvery,
  parseCover2SlideMotion,
  type Cover2MenuItem,
  type Cover2SlideMotion,
} from "@/lib/cover-2-menu";
import { createSupabaseAdmin } from "@/lib/supabase/client";

export const bannerPatterns = [
  "dots",
  "stripes",
  "grid",
  "lines",
  "columns",
  "checker",
  "cross",
  "rings",
  "diamonds",
  "chevrons",
  "pluses",
  "confetti",
  "custom",
] as const;
export const bannerTileSizes = [24, 48, 80, 120] as const;
export const bannerGaps = [0, 20, 48, 96, 160] as const;
export const bannerSpeeds = [28, 16, 8, 4, 2] as const;
export const bannerMotions = ["off", "left", "right", "up", "down", "diagonal", "diagonalAlt"] as const;
export const bannerFrames = ["classic", "thin", "thick", "double", "dashed", "rounded", "none"] as const;
export const bannerShadows = ["hard", "long", "soft", "glow", "none"] as const;
export const bannerHovers = ["shake", "lift", "zoom", "tilt", "pop", "none"] as const;
export const bannerColors = ["surface", "ink", "blue", "coral", "yellow"] as const;

export function parseBannerRgb(value: string): string | null {
  const parts = value.split(",").map((part) => Number(part.trim()));
  if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return null;
  }
  return parts.join(",");
}
export const bannerShades = [0, 35, 65] as const;
export const bannerFocuses = ["top", "center", "bottom"] as const;

export type BannerPattern = (typeof bannerPatterns)[number];
export type BannerMotion = (typeof bannerMotions)[number];
export type BannerFrame = (typeof bannerFrames)[number];
export type BannerShadow = (typeof bannerShadows)[number];
export type BannerHover = (typeof bannerHovers)[number];
export type BannerTileSize = (typeof bannerTileSizes)[number];
export type BannerGap = (typeof bannerGaps)[number];
export type BannerSpeed = (typeof bannerSpeeds)[number];
export type BannerColor = (typeof bannerColors)[number];
export type BannerShade = (typeof bannerShades)[number];
export type BannerFocus = (typeof bannerFocuses)[number];

export type HeroCoverConfig = {
  heroAnimation: HomeDesign1HeroAnimationId;
  logoAnimation: HomeDesign1LogoAnimationId;
  cover2Logo: Cover2LogoMark;
  cover2Stack: boolean;
  cover2Menu: Cover2MenuItem[];
  cover2Slides: number;
  cover2SlideMotion: Cover2SlideMotion;
  cover2SlideEvery: number;
  coverOption: 1 | 2;
  dividerWidth: number;
  particles: boolean;
  veil: boolean;
  halftone: boolean;
  bannerMode: "pattern" | "image";
  bannerPattern: BannerPattern;
  bannerColor: BannerColor | string;
  bannerBase: string;
  bannerShade: BannerShade;
  bannerPositions: [BannerFocus, BannerFocus, BannerFocus];
  bannerLinks: [string, string, string];
  bannerMotion: BannerMotion;
  bannerTile: BannerTileSize;
  bannerGap: BannerGap;
  bannerSpeed: BannerSpeed;
  bannerFrame: BannerFrame;
  bannerShadow: BannerShadow;
  bannerFrameColor: string;
  bannerHover: BannerHover;
};

export function parseBannerLinks(value: string): [string, string, string] {
  let parsed: unknown = null;
  try {
    parsed = JSON.parse(value);
  } catch {
    parsed = null;
  }
  const list = Array.isArray(parsed) ? parsed : ["", "", ""];
  return [0, 1, 2].map((index) => {
    const raw = typeof list[index] === "string" ? list[index].trim() : "";
    if (!raw) return "";
    try {
      const url = new URL(raw);
      if (url.protocol !== "http:" && url.protocol !== "https:") return "";
      return url.toString();
    } catch {
      return "";
    }
  }) as [string, string, string];
}

export function parseBannerPositions(value: string): [BannerFocus, BannerFocus, BannerFocus] | null {
  const parts = value.split(",").map((part) => part.trim());
  if (parts.length !== 3) return null;
  if (!parts.every((part) => bannerFocuses.includes(part as BannerFocus))) return null;
  return parts as [BannerFocus, BannerFocus, BannerFocus];
}

const TABLE = "hero_config";

export const defaultHeroCoverConfig = (): HeroCoverConfig => ({
  heroAnimation: 3,
  logoAnimation: 3,
  cover2Logo: "cruce",
  cover2Stack: false,
  cover2Menu: defaultCover2Menu(),
  cover2Slides: 1,
  cover2SlideMotion: "fundido",
  cover2SlideEvery: 0,
  coverOption: 1,
  dividerWidth: 10,
  particles: true,
  veil: true,
  halftone: true,
  bannerMode: "pattern",
  bannerPattern: "dots",
  bannerColor: "surface",
  bannerBase: "110,110,115",
  bannerShade: 0,
  bannerPositions: ["center", "center", "center"],
  bannerLinks: ["", "", ""],
  bannerMotion: "off",
  bannerTile: 48,
  bannerGap: 0,
  bannerSpeed: 16,
  bannerFrame: "classic",
  bannerShadow: "hard",
  bannerFrameColor: "255,255,255",
  bannerHover: "shake",
});

const dividerWidths = new Set([4, 10, 18]);

function clampSlides(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(6, Math.max(1, Math.round(value)));
}

export async function readHeroCoverConfig(): Promise<HeroCoverConfig> {
  if (coverMemory) return coverMemory;
  const config = await loadHeroCoverConfig();
  coverMemory = config;
  return config;
}

let coverMemory: HeroCoverConfig | null = null;

async function loadHeroCoverConfig(): Promise<HeroCoverConfig> {
  const fallback = defaultHeroCoverConfig();
  if (!process.env.SUPABASE_SECRET_KEY) return fallback;

  const supabase = createSupabaseAdmin();
  const columns =
    "hero_animation, logo_animation, cover_option, divider_width, particles, veil, halftone, banner_mode, banner_pattern, banner_color, banner_base, banner_shade, banner_positions, banner_links, banner_motion, banner_direction, banner_tile, banner_gap, banner_speed, banner_frame, banner_shadow, banner_frame_color, banner_hover";
  let { data, error } = await supabase
    .from(TABLE)
    .select(`${columns}, cover2_logo, cover2_stack, cover2_menu, cover2_slides, cover2_slide_motion, cover2_slide_every`)
    .eq("id", 1)
    .maybeSingle();
  if (error && /cover2_slide_every|cover2_slide_motion/i.test(error.message)) {
    ({ data, error } = await supabase
      .from(TABLE)
      .select(`${columns}, cover2_logo, cover2_stack, cover2_menu, cover2_slides`)
      .eq("id", 1)
      .maybeSingle());
  }
  if (error && /cover2_slides/i.test(error.message)) {
    ({ data, error } = await supabase.from(TABLE).select(`${columns}, cover2_logo, cover2_stack, cover2_menu`).eq("id", 1).maybeSingle());
  }
  if (error && /cover2_menu/i.test(error.message)) {
    ({ data, error } = await supabase.from(TABLE).select(`${columns}, cover2_logo, cover2_stack`).eq("id", 1).maybeSingle());
  }
  if (error && /cover2_stack/i.test(error.message)) {
    ({ data, error } = await supabase.from(TABLE).select(`${columns}, cover2_logo`).eq("id", 1).maybeSingle());
  }
  if (error && /cover2_logo/i.test(error.message)) {
    ({ data, error } = await supabase.from(TABLE).select(columns).eq("id", 1).maybeSingle());
  }

  if (error || !data) return fallback;

  const width = Number(data.divider_width);
  const pattern = String(data.banner_pattern);
  const color = String(data.banner_color ?? "");
  const base = String(data.banner_base ?? "");
  const shade = Number(data.banner_shade);
  return {
    heroAnimation: parseHomeDesign1HeroAnimation(String(data.hero_animation)),
    logoAnimation: data.logo_animation == null ? fallback.logoAnimation : parseHomeDesign1LogoAnimation(String(data.logo_animation)),
    cover2Logo: parseCover2LogoMark("cover2_logo" in data ? String(data.cover2_logo ?? "") : null),
    cover2Stack: "cover2_stack" in data ? Boolean(data.cover2_stack) : false,
    cover2Menu: parseCover2Menu("cover2_menu" in data ? data.cover2_menu : null),
    cover2Slides: clampSlides("cover2_slides" in data ? Number(data.cover2_slides) : 1),
    cover2SlideMotion: parseCover2SlideMotion("cover2_slide_motion" in data ? String(data.cover2_slide_motion ?? "") : null),
    cover2SlideEvery: parseCover2SlideEvery("cover2_slide_every" in data ? data.cover2_slide_every : 0),
    coverOption: Number(data.cover_option) === 2 ? 2 : 1,
    dividerWidth: dividerWidths.has(width) ? width : fallback.dividerWidth,
    particles: Boolean(data.particles),
    veil: Boolean(data.veil),
    halftone: Boolean(data.halftone),
    bannerMode: data.banner_mode === "image" ? "image" : "pattern",
    bannerPattern: bannerPatterns.includes(pattern as BannerPattern)
      ? (pattern as BannerPattern)
      : fallback.bannerPattern,
    bannerColor: bannerColors.includes(color as BannerColor)
      ? (color as BannerColor)
      : (parseBannerRgb(color) ?? fallback.bannerColor),
    bannerBase: parseBannerRgb(base) ?? fallback.bannerBase,
    bannerShade: bannerShades.includes(shade as BannerShade)
      ? (shade as BannerShade)
      : fallback.bannerShade,
    bannerPositions: parseBannerPositions(String(data.banner_positions ?? "")) ?? fallback.bannerPositions,
    bannerLinks: parseBannerLinks(String(data.banner_links ?? "")),
    bannerMotion: bannerMotions.includes(String(data.banner_direction) as BannerMotion)
      ? (String(data.banner_direction) as BannerMotion)
      : data.banner_motion
        ? "left"
        : fallback.bannerMotion,
    bannerTile: bannerTileSizes.includes(Number(data.banner_tile) as BannerTileSize)
      ? (Number(data.banner_tile) as BannerTileSize)
      : fallback.bannerTile,
    bannerGap: bannerGaps.includes(Number(data.banner_gap) as BannerGap)
      ? (Number(data.banner_gap) as BannerGap)
      : fallback.bannerGap,
    bannerSpeed: bannerSpeeds.includes(Number(data.banner_speed) as BannerSpeed)
      ? (Number(data.banner_speed) as BannerSpeed)
      : fallback.bannerSpeed,
    bannerFrame: bannerFrames.includes(String(data.banner_frame) as BannerFrame)
      ? (String(data.banner_frame) as BannerFrame)
      : fallback.bannerFrame,
    bannerShadow: bannerShadows.includes(String(data.banner_shadow) as BannerShadow)
      ? (String(data.banner_shadow) as BannerShadow)
      : fallback.bannerShadow,
    bannerFrameColor: parseBannerRgb(String(data.banner_frame_color ?? "")) ?? fallback.bannerFrameColor,
    bannerHover: bannerHovers.includes(String(data.banner_hover) as BannerHover)
      ? (String(data.banner_hover) as BannerHover)
      : fallback.bannerHover,
  };
}

export async function saveHeroCoverConfig(config: HeroCoverConfig): Promise<void> {
  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from(TABLE).upsert({
    id: 1,
    hero_animation: config.heroAnimation,
    logo_animation: config.logoAnimation,
    cover2_logo: config.cover2Logo,
    cover2_stack: config.cover2Stack,
    cover2_menu: JSON.stringify(config.cover2Menu),
    cover2_slides: config.cover2Slides,
    cover2_slide_motion: config.cover2SlideMotion,
    cover2_slide_every: config.cover2SlideEvery,
    cover_option: config.coverOption,
    divider_width: config.dividerWidth,
    particles: config.particles,
    veil: config.veil,
    halftone: config.halftone,
    banner_mode: config.bannerMode,
    banner_pattern: config.bannerPattern,
    banner_color: config.bannerColor,
    banner_base: config.bannerBase,
    banner_shade: config.bannerShade,
    banner_positions: config.bannerPositions.join(","),
    banner_links: JSON.stringify(config.bannerLinks),
    banner_motion: config.bannerMotion !== "off",
    banner_direction: config.bannerMotion,
    banner_tile: config.bannerTile,
    banner_gap: config.bannerGap,
    banner_speed: config.bannerSpeed,
    banner_frame: config.bannerFrame,
    banner_shadow: config.bannerShadow,
    banner_frame_color: config.bannerFrameColor,
    banner_hover: config.bannerHover,
  });
  if (error) throw new Error(error.message);
  coverMemory = config;
}
