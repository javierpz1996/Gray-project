import { deflateSync } from "node:zlib";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createSupabaseAdmin } from "@/lib/supabase/client";

export const heroBannerSlots = ["1", "2", "3", "bg", "tile", "banda1", "banda2", "tema1", "tema2", "tema3", "tema4", "tema5", "profesor", "librosbg", "librostile", "logo", "portada2", "portada22", "portada23", "portada24", "portada25", "portada26", "logotop"] as const;
export type HeroBannerSlot = (typeof heroBannerSlots)[number];

const TABLE = "hero_banners";

/** Color plano de cada lugar vacío. Se reemplaza en cuanto hay una imagen subida. */
const flatColors: Partial<Record<HeroBannerSlot, readonly [number, number, number]>> = {
  "1": [186, 186, 186],
  "2": [158, 158, 158],
  "3": [128, 128, 128],
  portada2: [0, 0, 0],
  banda1: [0, 0, 0],
  banda2: [0, 0, 0],
  tema1: [176, 176, 176],
  tema2: [255, 255, 255],
  tema3: [245, 236, 214],
  tema4: [78, 138, 90],
  tema5: [176, 176, 176],
  profesor: [186, 186, 186],
};

const contentTypes: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  mp4: "video/mp4",
  webm: "video/webm",
};

export function isHeroBannerSlot(value: string): value is HeroBannerSlot {
  return (heroBannerSlots as readonly string[]).includes(value);
}

export function heroBannerExtension(type: string): string | null {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type.startsWith("video/mp4") || type === "video/quicktime") return "mp4";
  if (type.startsWith("video/webm")) return "webm";
  return null;
}

function crc32(buffer: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type: string, data: Buffer): Buffer {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function solidPng(r: number, g: number, b: number): Buffer {
  const raw = Buffer.from([0, r, g, b, 0, r, g, b]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(2, 0);
  ihdr.writeUInt32BE(2, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(raw)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

async function fallbackFile(slot: HeroBannerSlot): Promise<{ bytes: Buffer; contentType: string } | null> {
  if (slot === "bg" || slot === "tile" || slot === "librosbg" || slot === "librostile") return null;
  if (slot === "portada22" || slot === "portada23" || slot === "portada24" || slot === "portada25" || slot === "portada26") {
    return null;
  }
  if (slot === "logo" || slot === "logotop") {
    return { bytes: await readFile(path.join(process.cwd(), "public", "media", "marca", "logo.png")), contentType: "image/png" };
  }
  const color = flatColors[slot] ?? [214, 214, 218];
  return { bytes: solidPng(color[0], color[1], color[2]), contentType: "image/png" };
}

function decodeBytea(value: unknown): Buffer {
  if (Buffer.isBuffer(value)) return value;
  if (value instanceof Uint8Array) return Buffer.from(value);
  if (value instanceof ArrayBuffer) return Buffer.from(value);
  const text = String(value);
  if (text.startsWith("\\x")) return Buffer.from(text.slice(2), "hex");
  return Buffer.from(text, "base64");
}

function sniffContentType(bytes: Buffer, stored: string): string {
  if (bytes.length >= 12 && bytes.toString("ascii", 4, 8) === "ftyp") return "video/mp4";
  if (bytes.length >= 4 && bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) return "video/webm";
  if (bytes.length >= 8 && bytes.toString("hex", 0, 4) === "89504e47") return "image/png";
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.length >= 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  return stored;
}

export async function readHeroBannerFile(slot: HeroBannerSlot): Promise<{
  bytes: Buffer;
  contentType: string;
} | null> {
  if (!process.env.SUPABASE_SECRET_KEY) return fallbackFile(slot);

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from(TABLE)
    .select("content_type, image")
    .eq("slot", slot)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return fallbackFile(slot);

  const bytes = decodeBytea(data.image);
  return {
    bytes,
    contentType: sniffContentType(bytes, String(data.content_type)),
  };
}

export async function saveHeroBannerFile(
  slot: HeroBannerSlot,
  bytes: Buffer,
  extension: string,
): Promise<void> {
  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from(TABLE).upsert({
    slot,
    content_type: contentTypes[extension] ?? "application/octet-stream",
    image: `\\x${bytes.toString("hex")}`,
  });
  if (error) throw new Error(error.message);
}
