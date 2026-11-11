import { isHeroPanelSlot } from "@/content/hero-panels";
import { readHeroPanelFile } from "@/lib/hero-panel-store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slot: string }> },
) {
  const { slot } = await context.params;
  if (!isHeroPanelSlot(slot)) {
    return new Response("Casilla desconocida", { status: 404 });
  }

  try {
    const { bytes, contentType } = await readHeroPanelFile(slot);
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Imagen no disponible", { status: 404 });
  }
}
