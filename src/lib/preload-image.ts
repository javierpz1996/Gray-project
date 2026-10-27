const preloaded = new Set<string>();

/** Precarga una imagen en caché del navegador (idempotente). */
export function preloadImageSrc(src: string): void {
  if (typeof window === "undefined" || preloaded.has(src)) {
    return;
  }
  preloaded.add(src);
  const img = new Image();
  img.src = src;
}
