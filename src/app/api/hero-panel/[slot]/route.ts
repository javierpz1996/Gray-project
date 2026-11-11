import { isHeroPanelSlot } from "@/content/hero-panels";
import { readHeroPanelFile } from "@/lib/hero-panel-store";

export async function GET(
  request: Request,
  context: { params: Promise<{ slot: string }> },
) {
  const { slot } = await context.params;
  if (!isHeroPanelSlot(slot)) {
    return new Response("Casilla desconocida", { status: 404 });
  }

  try {
    const { bytes, contentType } = await readHeroPanelFile(slot);
    const tag = `"${bytes.length.toString(16)}-${bytes[0] ?? 0}${bytes[bytes.length - 1] ?? 0}"`;
    const headers = {
      "Content-Type": contentType,
        "Cache-Control": "no-store",
      ETag: tag,
    };
    if (request.headers.get("if-none-match") === tag) {
      return new Response(null, { status: 304, headers });
    }
    return new Response(new Uint8Array(bytes), { headers });
  } catch {
    return new Response("Imagen no disponible", { status: 404 });
  }
}
