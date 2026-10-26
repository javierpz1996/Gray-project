import Image from "next/image";
import Link from "next/link";
import type { Pieza } from "@/content/piezas";

/**
 * Tarjeta de pieza — DESIGN.md §6.
 *   imagen aspect-[4/5] · sin radio, sin sombra, sin borde
 *   título serif (--text-h3) + año · técnica (text-small, fg-muted)
 *   hover: la imagen baja a opacity-85 en 200ms; el título no se mueve.
 */
export function PiezaCard({ pieza }: { pieza: Pieza }) {
  return (
    <Link
      href={`/portafolio/${pieza.slug}`}
      className="group block outline-none"
      aria-label={`${pieza.titulo}, ${pieza.anio}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-surface shadow-card">
        <Image
          src={pieza.imagen}
          alt={pieza.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-opacity duration-200 ease-out group-hover:opacity-85"
        />
      </div>

      <h3 className="mt-4 font-display text-h3 font-semibold leading-heading tracking-title text-fg">
        {pieza.titulo}
      </h3>
      <p className="mt-1 text-small text-fg-muted">
        {pieza.anio} · {pieza.tecnica}
      </p>
    </Link>
  );
}
