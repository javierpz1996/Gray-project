import type { Libro } from "@/content/libros";
import { librosSection } from "@/content/libros";
import { preloadImageSrc } from "@/lib/preload-image";

/** Fondo + portada y galería de un libro (idempotente). */
export function preloadLibroDetalle(libro: Libro): void {
  preloadImageSrc(librosSection.detalleFondoSrc);
  preloadImageSrc(libro.imagen);
  for (const item of libro.galeria) {
    preloadImageSrc(item.src);
  }
}
