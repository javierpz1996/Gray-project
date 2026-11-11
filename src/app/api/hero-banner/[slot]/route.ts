import { isHeroBannerSlot, readHeroBannerFile } from "@/lib/hero-banner-store";

export async function GET(
  request: Request,
  context: { params: Promise<{ slot: string }> },
) {
  const { slot } = await context.params;
  if (!isHeroBannerSlot(slot)) {
    return new Response("Banner desconocido", { status: 404 });
  }

  try {
    const file = await readHeroBannerFile(slot);
    if (!file) return new Response("Sin fondo", { status: 404 });
    const bytes = new Uint8Array(file.bytes);
    const video = file.contentType.startsWith("video/");
    const tag = `"${file.bytes.length.toString(16)}-${file.bytes[0] ?? 0}${file.bytes[file.bytes.length - 1] ?? 0}"`;
    const headers = {
      "Content-Type": file.contentType,
      "Cache-Control": "private, no-cache",
      ETag: tag,
      "Accept-Ranges": "bytes",
    };
    if (request.headers.get("if-none-match") === tag) {
      return new Response(null, { status: 304, headers });
    }
    if (!video) {
      return new Response(bytes, { headers });
    }

    const total = bytes.byteLength;
    const range = request.headers.get("range");
    const match = range?.match(/bytes=(\d*)-(\d*)/);
    if (!match) {
      return new Response(bytes, {
        headers: { ...headers, "Content-Length": String(total) },
      });
    }
    const start = match[1] ? Number(match[1]) : 0;
    const end = match[2] ? Number(match[2]) : total - 1;
    if (start > end || end >= total) {
      return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${total}` } });
    }
    return new Response(bytes.slice(start, end + 1), {
      status: 206,
      headers: {
        ...headers,
        "Content-Length": String(end - start + 1),
        "Content-Range": `bytes ${start}-${end}/${total}`,
      },
    });
  } catch {
    return new Response("Imagen no disponible", { status: 404 });
  }
}
