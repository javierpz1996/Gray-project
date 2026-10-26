import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { piezaDestacada } from "@/content/piezas";
import { Button } from "@/components/ui/button";

/**
 * Hero full-bleed — decisión Q31 (Ronda 4).
 * La pieza `destacada` ocupa la pantalla; el nombre va sobreimpreso en un
 * bloque opaco `bg-canvas` (sin degradado, sin sombra: DESIGN.md §1 y §8.3).
 */
export function Hero() {
  const pieza = piezaDestacada();

  return (
    <section className="relative w-full">
      <div className="relative min-h-[calc(100svh-4rem)] w-full overflow-hidden">
        <Image
          src={pieza.imagen}
          alt={pieza.alt}
          fill
          sizes="100vw"
          className="object-cover"
          loading="eager"
          fetchPriority="high"
        />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto w-full max-w-site px-6 pb-8">
            <div className="max-w-caption rounded-lg border border-border bg-surface p-6 shadow-elevated md:p-8">
              <p className="eyebrow">Obra destacada</p>

              <h1 className="mt-4 font-display text-display font-bold leading-display tracking-title text-fg">
                {site.name}
              </h1>

              <p className="mt-5 text-small text-fg-muted">
                {pieza.titulo} · {pieza.anio} · {pieza.tecnica} ·{" "}
                {pieza.dimensiones}
              </p>

              <Button asChild variant="outline" className="mt-6">
                <Link href={`/portafolio/${pieza.slug}`}>Ver ficha</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
