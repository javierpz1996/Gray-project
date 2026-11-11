import { readFile } from "node:fs/promises";
import path from "node:path";
import { heroPanelFallbackFile, type HeroPanelSlot } from "@/content/hero-panels";
import { createSupabaseAdmin } from "@/lib/supabase/client";

const TABLE = "hero_panels";

const contentTypes: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

type HeroPanelRow = {
  content_type: string;
  image: string;
  updated_at: string;
};

export function heroPanelExtension(type: string): string | null {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return null;
}

function decodeBytea(value: string): Buffer {
  if (value.startsWith("\\x")) return Buffer.from(value.slice(2), "hex");
  return Buffer.from(value, "base64");
}

async function fallbackBytes(slot: HeroPanelSlot): Promise<Buffer> {
  return readFile(
    path.join(process.cwd(), "public", "media", "hero", heroPanelFallbackFile(slot)),
  );
}

const memory = new Map<HeroPanelSlot, { bytes: Buffer; contentType: string }>();

export async function readHeroPanelFile(slot: HeroPanelSlot): Promise<{
  bytes: Buffer;
  contentType: string;
}> {
  const cached = memory.get(slot);
  if (cached) return cached;

  if (!process.env.SUPABASE_SECRET_KEY) {
    const file = { bytes: await fallbackBytes(slot), contentType: "image/png" };
    memory.set(slot, file);
    return file;
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from(TABLE)
    .select("content_type, image, updated_at")
    .eq("slot", slot)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) {
    const file = { bytes: await fallbackBytes(slot), contentType: "image/png" };
    memory.set(slot, file);
    return file;
  }

  const row = data as HeroPanelRow;
  const file = { bytes: decodeBytea(row.image), contentType: row.content_type };
  memory.set(slot, file);
  return file;
}

export async function saveHeroPanelFile(
  slot: HeroPanelSlot,
  bytes: Buffer,
  extension: string,
): Promise<void> {
  const contentType = contentTypes[extension] ?? "application/octet-stream";
  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from(TABLE).upsert({
    slot,
    content_type: contentType,
    image: `\\x${bytes.toString("hex")}`,
  });
  if (error) throw new Error(error.message);
  memory.delete(slot);
  revisionMemory = null;
}

let revisionMemory: string | null = null;

export async function heroPanelRevision(): Promise<string> {
  if (revisionMemory) return revisionMemory;
  if (!process.env.SUPABASE_SECRET_KEY) return "0";
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from(TABLE).select("slot, updated_at");
  if (error || !data) return "0";
  revisionMemory = data.map((row) => `${row.slot}:${row.updated_at}`).join("|");
  return revisionMemory;
}
