const preloaded = new Set<string>();
const loaded = new Set<string>();

/** Precarga una imagen en caché del navegador (idempotente). */
export function preloadImageSrc(src: string): void {
  if (typeof window === "undefined" || preloaded.has(src)) {
    return;
  }
  preloaded.add(src);
  const img = new Image();
  img.decoding = "async";
  img.onload = () => {
    loaded.add(src);
  };
  img.onerror = () => {
    loaded.add(src);
  };
  img.src = src;
  if (img.complete) {
    loaded.add(src);
  }
}

/** Resuelve cuando la imagen está en caché y decodificada (o falló). */
export function ensureImagePreloaded(src: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (loaded.has(src)) {
    return Promise.resolve();
  }

  preloadImageSrc(src);

  if (loaded.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    const done = () => {
      loaded.add(src);
      resolve();
    };
    img.onload = done;
    img.onerror = done;
    img.src = src;
    if (img.complete) {
      done();
    }
  });
}

export function isImagePreloaded(src: string): boolean {
  return loaded.has(src);
}
