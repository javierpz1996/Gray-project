import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { piezaPorSlug, piezas } from "@/content/piezas";
import { Button } from "@/components/ui/button";

/**
 * Ficha de pieza — estructura híbrida (ADR 0003).
 * `params` es una Promise en Next 16: acceso solo asíncrono.
 * `generateStaticParams` debe devolver al menos un parámetro (cacheComponents).
 */
export function generateStaticParams() {
  return piezas.map((pieza) => ({ slug: pieza.slug }));
}

type Props = PageProps<"/portafolio/[slug]">;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const pieza = piezaPorSlug(slug);

  if (!pieza) {
    return { title: "Pieza no encontrada" };
  }

  return {
    title: pieza.titulo,
    description: `${pieza.titulo} (${pieza.anio}). ${pieza.tecnica}, ${pieza.dimensiones}.`,
    openGraph: {
      title: pieza.titulo,
      description: `${pieza.tecnica}, ${pieza.dimensiones}, ${pieza.anio}.`,
      images: [pieza.imagen],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const pieza = piezaPorSlug(slug);

  if (!pieza) notFound();

  const indice = piezas.findIndex((p) => p.slug === slug);
  const anterior = indice > 0 ? piezas[indice - 1] : undefined;
  const siguiente =
    indice >= 0 && indice < piezas.length - 1 ? piezas[indice + 1] : undefined;

  return (
    <article className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-site px-6">
        <Link
          href="/#portafolio"
          className="text-small text-fg-muted underline-offset-4 transition-colors duration-150 ease-out hover:text-primary hover:underline"
        >
          ← Volver al portafolio
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="col-span-12 md:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-surface shadow-card">
              <Image
                src={pieza.imagen}
                alt={pieza.alt}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="col-span-12 md:col-span-5">
            <p className="eyebrow">Ficha</p>

            <h1 className="mt-4 font-display text-h1 font-bold leading-heading tracking-title text-fg">
              {pieza.titulo}
            </h1>

            <dl className="mt-8 border-t border-border">
              <Fila label="Año" valor={String(pieza.anio)} />
              <Fila label="Técnica" valor={pieza.tecnica} />
              <Fila label="Dimensiones" valor={pieza.dimensiones} />
            </dl>

            {pieza.descripcion ? (
              <p className="mt-8 max-w-prose text-body leading-body text-fg-muted">
                {pieza.descripcion}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              {anterior ? (
                <Button variant="outline" asChild>
                  <Link href={`/portafolio/${anterior.slug}`}>
                    ← Anterior
                  </Link>
                </Button>
              ) : null}
              {siguiente ? (
                <Button variant="outline" asChild>
                  <Link href={`/portafolio/${siguiente.slug}`}>
                    Siguiente →
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Fila({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border py-3">
      <dt className="text-small text-fg-subtle">{label}</dt>
      <dd className="text-right text-small text-fg">{valor}</dd>
    </div>
  );
}
