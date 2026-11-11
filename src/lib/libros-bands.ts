import { createSupabaseAdmin } from "@/lib/supabase/client";

export const bandaSpeeds = [28, 16, 8, 4, 2] as const;
export const bandaSizes = [40, 55, 70, 85, 100, 120, 140, 160, 180, 220] as const;
export const bandaTops = [0, 2, 4.5, 7, 9, 11, 14, 18] as const;
export const bandaTilts = [-56, -45, -36, -28, -20, -12, 0, 12, 28] as const;
export const bandaOpacities = [15, 30, 50, 70, 85, 92, 100] as const;
export const bandaBrights = [40, 60, 75, 100, 125, 150, 180] as const;

export type BandaSpeed = (typeof bandaSpeeds)[number];
export type BandaSize = (typeof bandaSizes)[number];
export type BandaTop = (typeof bandaTops)[number];
export type BandaTilt = (typeof bandaTilts)[number];
export type BandaOpacity = (typeof bandaOpacities)[number];
export type BandaBright = (typeof bandaBrights)[number];

export type LibrosBandsConfig = {
  speed1: BandaSpeed;
  size1: BandaSize;
  top1: BandaTop;
  tilt1: BandaTilt;
  opacity1: BandaOpacity;
  bright1: BandaBright;
  speed2: BandaSpeed;
  size2: BandaSize;
  top2: BandaTop;
  tilt2: BandaTilt;
  opacity2: BandaOpacity;
  bright2: BandaBright;
  lead: string;
  stories: LibrosStory[];
  heading: LibrosHeading;
};

export type LibrosStory = {
  title: string;
  text: string;
};

export const librosLeadDefault = "Conseguí la edición completa o elegí los temas que más te interesen.";
export const librosTitleDefault = "Fundamentos del dibujo";
export const librosRhythmDefault = "Aprendé a tu propio ritmo";
export const librosFonts = ["sans", "display", "oswald", "outfit"] as const;
export type LibrosFont = (typeof librosFonts)[number];

export type LibrosLineStyle = {
  font: LibrosFont;
  bold: boolean;
  color: string;
  bg: string;
};

export type LibrosHeading = {
  title: string;
  rhythm: string;
  titleStyle: LibrosLineStyle;
  leadStyle: LibrosLineStyle;
  rhythmStyle: LibrosLineStyle;
  ver: string;
  verMotion: LibrosVerMotion;
  rule: string;
  nameLine: string;
  nameColor: string;
  storyText: string;
  stickerMotion: LibrosStickerMotion;
  stickerBorder: LibrosStickerBorder;
  stickerEdge: string;
  stickerKind: LibrosMediaMode;
  imageMotion: LibrosImageMotion;
  imageBorder: LibrosImageBorder;
  imageEdge: string;
  imageCrop: boolean;
  imageSize: LibrosImageSize;
  videoMotion: LibrosVideoMotion;
  videoBorder: LibrosVideoBorder;
  videoEdge: string;
  stickerHover: LibrosMediaHover;
  imageHover: LibrosMediaHover;
  videoHover: LibrosMediaHover;
  bgMode: LibrosBgMode;
  bgPattern: LibrosBgPattern;
  bgMotion: LibrosBgMotion;
  bgSpeed: LibrosBgSpeed;
  bgTile: LibrosBgTile;
  bgColor: string;
  bgBase: string;
  bgShade: LibrosBgShade;
};

export const librosImageSizes = [70, 85, 100, 120, 150, 180] as const;
export type LibrosImageSize = (typeof librosImageSizes)[number];

export const librosMediaModes = ["sticker", "image", "video"] as const;
export type LibrosMediaMode = (typeof librosMediaModes)[number];
export const librosImageMotions = ["kenburns", "reveal", "focus", "pan", "breath", "orbit", "shutter", "curtain", "wander", "none"] as const;
export const librosImageBorders = ["marco", "polaroid", "grueso", "fino", "punteado", "doble", "ticket", "none"] as const;
export const librosVideoMotions = ["drift", "zoom", "fade", "pulse", "push", "pan", "breath", "orbit", "curtain", "wander", "film", "none"] as const;
export const librosVideoBorders = ["cine", "marco", "linea", "suave", "polaroid", "grueso", "fino", "punteado", "doble", "ticket", "pantalla", "diapositiva", "none"] as const;
export const librosMediaHovers = ["shake", "lift", "zoom", "tilt", "pop", "glow", "flip", "sink", "none"] as const;
export type LibrosMediaHover = (typeof librosMediaHovers)[number];
export const librosBgModes = ["none", "pattern", "image"] as const;
export const librosBgPatterns = ["dots", "stripes", "grid", "lines", "checker", "rings", "custom"] as const;
export const librosBgMotions = ["off", "left", "right", "up", "down", "diagonal", "diagonalAlt"] as const;
export const librosBgSpeeds = [28, 16, 8, 4, 2] as const;
export const librosBgTiles = [24, 48, 80, 120] as const;
export const librosBgShades = [0, 25, 45, 65, 85] as const;
export type LibrosBgShade = (typeof librosBgShades)[number];
export type LibrosBgMode = (typeof librosBgModes)[number];
export type LibrosBgPattern = (typeof librosBgPatterns)[number];
export type LibrosBgMotion = (typeof librosBgMotions)[number];
export type LibrosBgSpeed = (typeof librosBgSpeeds)[number];
export type LibrosBgTile = (typeof librosBgTiles)[number];
export type LibrosImageMotion = (typeof librosImageMotions)[number];
export type LibrosImageBorder = (typeof librosImageBorders)[number];
export type LibrosVideoMotion = (typeof librosVideoMotions)[number];
export type LibrosVideoBorder = (typeof librosVideoBorders)[number];

export const librosStickerMotions = ["cabeceo", "tilt", "pulse", "shake", "pop", "float", "swing", "bounce", "spin", "heartbeat", "wobble", "none"] as const;
export const librosStickerBorders = ["contorno", "grueso", "fino", "suave", "neon", "sombra", "marcado", "triple", "sesgado", "none"] as const;
export type LibrosStickerMotion = (typeof librosStickerMotions)[number];
export type LibrosStickerBorder = (typeof librosStickerBorders)[number];

export const librosVerMotions = ["tilt", "pulse", "shake", "pop", "float", "none"] as const;
export type LibrosVerMotion = (typeof librosVerMotions)[number];

export const librosHeadingDefault = (): LibrosHeading => ({
  title: librosTitleDefault,
  rhythm: librosRhythmDefault,
  titleStyle: { font: "sans", bold: true, color: "255,255,255", bg: "" },
  leadStyle: { font: "sans", bold: false, color: "255,255,255", bg: "" },
  rhythmStyle: { font: "display", bold: false, color: "255,255,255", bg: "" },
  ver: "255,255,255",
  verMotion: "tilt",
  rule: "0,0,0",
  nameLine: "0,0,0",
  nameColor: "0,0,0",
  storyText: "0,0,0",
  stickerMotion: "cabeceo",
  stickerBorder: "contorno",
  stickerEdge: "",
  stickerKind: "sticker",
  imageMotion: "kenburns",
  imageBorder: "marco",
  imageEdge: "",
  imageCrop: false,
  imageSize: 100,
  videoMotion: "drift",
  videoBorder: "cine",
  videoEdge: "",
  stickerHover: "none",
  imageHover: "none",
  videoHover: "none",
  bgMode: "none",
  bgPattern: "dots",
  bgMotion: "off",
  bgSpeed: 16,
  bgTile: 48,
  bgColor: "230,233,233",
  bgBase: "0,0,0",
  bgShade: 0,
});

function librosRgb(value: unknown, fallback: string): string {
  const parts = String(value ?? "").split(",").map((part) => Number(part.trim()));
  if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return fallback;
  }
  return parts.join(",");
}

function librosFont(value: unknown, fallback: LibrosFont): LibrosFont {
  return librosFonts.includes(value as LibrosFont) ? (value as LibrosFont) : fallback;
}

function librosLine(value: unknown, fallback: LibrosLineStyle): LibrosLineStyle {
  const row = value && typeof value === "object" ? (value as Partial<LibrosLineStyle>) : {};
  return {
    font: librosFont(row.font, fallback.font),
    bold: typeof row.bold === "boolean" ? row.bold : fallback.bold,
    color: librosRgb(row.color, fallback.color),
    bg: row.bg ? librosRgb(row.bg, "") : "",
  };
}

export function parseLibrosHeading(value: unknown): LibrosHeading {
  const base = librosHeadingDefault();
  let parsed: unknown = {};
  if (typeof value === "string" && value.trim()) {
    try {
      parsed = JSON.parse(value) as unknown;
    } catch {
      parsed = {};
    }
  }
  const row = parsed && typeof parsed === "object" ? (parsed as Partial<LibrosHeading>) : {};
  return {
    title: clipLibrosText(row.title, 80, base.title),
    rhythm: clipLibrosText(row.rhythm, 80, base.rhythm),
    titleStyle: librosLine(row.titleStyle, base.titleStyle),
    leadStyle: librosLine(row.leadStyle, base.leadStyle),
    rhythmStyle: librosLine(row.rhythmStyle, base.rhythmStyle),
    ver: librosRgb(row.ver, base.ver),
    rule: librosRgb(row.rule, base.rule),
    nameLine: librosRgb(row.nameLine, base.nameLine),
    nameColor: librosRgb(row.nameColor, base.nameColor),
    storyText: librosRgb(row.storyText, base.storyText),
    verMotion: librosVerMotions.includes(row.verMotion as LibrosVerMotion) ? (row.verMotion as LibrosVerMotion) : base.verMotion,
    stickerMotion: librosStickerMotions.includes(row.stickerMotion as LibrosStickerMotion)
      ? (row.stickerMotion as LibrosStickerMotion)
      : base.stickerMotion,
    stickerBorder: librosStickerBorders.includes(row.stickerBorder as LibrosStickerBorder)
      ? (row.stickerBorder as LibrosStickerBorder)
      : base.stickerBorder,
    stickerEdge: row.stickerEdge ? librosRgb(row.stickerEdge, "") : "",
    stickerKind:
      row.stickerKind === "sticker" || row.stickerKind === "video" || (row.stickerKind === "image" && row.imageMotion)
        ? row.stickerKind
        : "sticker",
    imageMotion: librosImageMotions.includes(row.imageMotion as LibrosImageMotion) ? (row.imageMotion as LibrosImageMotion) : base.imageMotion,
    imageBorder: librosImageBorders.includes(row.imageBorder as LibrosImageBorder) ? (row.imageBorder as LibrosImageBorder) : base.imageBorder,
    imageEdge: row.imageEdge ? librosRgb(row.imageEdge, "") : "",
    imageCrop: row.imageCrop === true,
    imageSize: librosImageSizes.includes(Number(row.imageSize) as LibrosImageSize)
      ? (Number(row.imageSize) as LibrosImageSize)
      : base.imageSize,
    videoMotion: librosVideoMotions.includes(row.videoMotion as LibrosVideoMotion) ? (row.videoMotion as LibrosVideoMotion) : base.videoMotion,
    videoBorder: librosVideoBorders.includes(row.videoBorder as LibrosVideoBorder) ? (row.videoBorder as LibrosVideoBorder) : base.videoBorder,
    videoEdge: row.videoEdge ? librosRgb(row.videoEdge, "") : "",
    stickerHover: librosMediaHovers.includes(row.stickerHover as LibrosMediaHover) ? (row.stickerHover as LibrosMediaHover) : base.stickerHover,
    imageHover: librosMediaHovers.includes(row.imageHover as LibrosMediaHover) ? (row.imageHover as LibrosMediaHover) : base.imageHover,
    videoHover: librosMediaHovers.includes(row.videoHover as LibrosMediaHover) ? (row.videoHover as LibrosMediaHover) : base.videoHover,
    bgMode: librosBgModes.includes(row.bgMode as LibrosBgMode) ? (row.bgMode as LibrosBgMode) : base.bgMode,
    bgPattern: librosBgPatterns.includes(row.bgPattern as LibrosBgPattern) ? (row.bgPattern as LibrosBgPattern) : base.bgPattern,
    bgMotion: librosBgMotions.includes(row.bgMotion as LibrosBgMotion) ? (row.bgMotion as LibrosBgMotion) : base.bgMotion,
    bgSpeed: librosBgSpeeds.includes(Number(row.bgSpeed) as LibrosBgSpeed) ? (Number(row.bgSpeed) as LibrosBgSpeed) : base.bgSpeed,
    bgTile: librosBgTiles.includes(Number(row.bgTile) as LibrosBgTile) ? (Number(row.bgTile) as LibrosBgTile) : base.bgTile,
    bgColor: librosRgb(row.bgColor, base.bgColor),
    bgBase: librosRgb(row.bgBase, base.bgBase),
    bgShade: librosBgShades.includes(Number(row.bgShade) as LibrosBgShade) ? (Number(row.bgShade) as LibrosBgShade) : base.bgShade,
  };
}

export const librosStoryDefaults: readonly LibrosStory[] = [
  {
    title: "fundamentos del dibujo",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
  },
  {
    title: "Perspectiva anatómica",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
  },
  {
    title: "Halloween diseño de personajes",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Perspectiva fundamentos iniciales",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Morfología anatomía muscular",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export function clipLibrosText(value: unknown, max: number, fallback: string): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) return fallback;
  return text.slice(0, max);
}

export function parseLibrosStories(value: unknown): LibrosStory[] {
  let parsed: unknown = [];
  if (typeof value === "string" && value.trim()) {
    try {
      parsed = JSON.parse(value) as unknown;
    } catch {
      parsed = [];
    }
  }
  const rows = Array.isArray(parsed) ? parsed : [];
  return librosStoryDefaults.map((item, index) => {
    const row = rows[index];
    const record = row && typeof row === "object" ? (row as { title?: unknown; text?: unknown }) : {};
    return {
      title: clipLibrosText(record.title, 80, item.title),
      text: clipLibrosText(record.text, 420, item.text),
    };
  });
}

export const defaultLibrosBandsConfig = (): LibrosBandsConfig => ({
  speed1: 16,
  size1: 100,
  top1: 4.5,
  tilt1: -28,
  opacity1: 92,
  bright1: 100,
  speed2: 16,
  size2: 100,
  top2: 11,
  tilt2: -28,
  opacity2: 92,
  bright2: 100,
  lead: librosLeadDefault,
  stories: librosStoryDefaults.map((item) => ({ ...item })),
  heading: librosHeadingDefault(),
});

function speed(value: unknown): BandaSpeed {
  return bandaSpeeds.includes(Number(value) as BandaSpeed) ? (Number(value) as BandaSpeed) : 16;
}

function size(value: unknown): BandaSize {
  return bandaSizes.includes(Number(value) as BandaSize) ? (Number(value) as BandaSize) : 100;
}

function top(value: unknown, fallbackTop: BandaTop): BandaTop {
  const raw = Number(value);
  const match = bandaTops.find((item) => item === raw || item * 10 === raw);
  return match ?? fallbackTop;
}

function tilt(value: unknown): BandaTilt {
  return bandaTilts.includes(Number(value) as BandaTilt) ? (Number(value) as BandaTilt) : -28;
}

function opacity(value: unknown): BandaOpacity {
  return bandaOpacities.includes(Number(value) as BandaOpacity) ? (Number(value) as BandaOpacity) : 92;
}

function bright(value: unknown): BandaBright {
  return bandaBrights.includes(Number(value) as BandaBright) ? (Number(value) as BandaBright) : 100;
}

let librosMemory: LibrosBandsConfig | null = null;

export async function readLibrosBands(): Promise<LibrosBandsConfig> {
  if (librosMemory) return librosMemory;
  const config = await loadLibrosBands();
  librosMemory = config;
  return config;
}

async function loadLibrosBands(): Promise<LibrosBandsConfig> {
  if (!process.env.SUPABASE_SECRET_KEY) return defaultLibrosBandsConfig();
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("hero_config")
    .select(
      "banda1_speed, banda1_size, banda1_top, banda1_tilt, banda1_opacity, banda1_bright, banda2_speed, banda2_size, banda2_top, banda2_tilt, banda2_opacity, banda2_bright, libros_lead, libros_stories, libros_heading",
    )
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return defaultLibrosBandsConfig();
  return {
    speed1: speed(data.banda1_speed),
    size1: size(data.banda1_size),
    top1: top(data.banda1_top, 4.5),
    tilt1: tilt(data.banda1_tilt),
    opacity1: opacity(data.banda1_opacity),
    bright1: bright(data.banda1_bright),
    speed2: speed(data.banda2_speed),
    size2: size(data.banda2_size),
    top2: top(data.banda2_top, 11),
    tilt2: tilt(data.banda2_tilt),
    opacity2: opacity(data.banda2_opacity),
    bright2: bright(data.banda2_bright),
    lead: clipLibrosText(data.libros_lead, 160, librosLeadDefault),
    stories: parseLibrosStories(data.libros_stories),
    heading: parseLibrosHeading(data.libros_heading),
  };
}

export async function saveLibrosBands(config: LibrosBandsConfig): Promise<void> {
  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from("hero_config").upsert({
    id: 1,
    banda1_speed: config.speed1,
    banda1_size: config.size1,
    banda1_top: Math.round(config.top1 * 10),
    banda1_tilt: config.tilt1,
    banda1_opacity: config.opacity1,
    banda1_bright: config.bright1,
    banda2_speed: config.speed2,
    banda2_size: config.size2,
    banda2_top: Math.round(config.top2 * 10),
    banda2_tilt: config.tilt2,
    banda2_opacity: config.opacity2,
    banda2_bright: config.bright2,
    libros_heading: JSON.stringify(parseLibrosHeading(JSON.stringify(config.heading))),
    libros_lead: clipLibrosText(config.lead, 160, librosLeadDefault),
    libros_stories: JSON.stringify(
      config.stories.map((item, index) => ({
        title: clipLibrosText(item.title, 80, librosStoryDefaults[index]?.title ?? ""),
        text: clipLibrosText(item.text, 420, librosStoryDefaults[index]?.text ?? ""),
      })),
    ),
  });
  if (error) throw new Error(error.message);
  librosMemory = config;
}
