"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { LibroDetailDialog } from "@/components/home/libro-detail-dialog";
import { Button } from "@/components/ui/button";
import { preloadLibroDetalle } from "@/lib/preload-libro-detalle";
import { preloadImageSrc } from "@/lib/preload-image";
import { cn } from "@/lib/utils";
import type { Libro } from "@/content/libros";
import { libros, librosSection } from "@/content/libros";

/** Inclinación alternada por card (grados vía utilidades Tailwind). */
const LIBRO_INCLINACION = [
  "-rotate-[4deg]",
  "rotate-[3deg]",
  "-rotate-[3deg]",
  "rotate-[4deg]",
] as const;

export function LibrosSection() {
  const [libroAbierto, setLibroAbierto] = useState<Libro | null>(null);

  useEffect(() => {
    const precargarSeccion = () => {
      preloadImageSrc(librosSection.detalleFondoSrc);
      for (const item of libros) {
        preloadImageSrc(item.imagen);
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(precargarSeccion);
    } else {
      window.setTimeout(precargarSeccion, 300);
    }
  }, []);

  const abrirLibro = useCallback((libro: Libro) => {
    preloadLibroDetalle(libro);
    document.body.dataset.libroDetalle = "open";
    document.documentElement.style.overflow = "hidden";
    setLibroAbierto(libro);
  }, []);

  const onModalOpenChange = useCallback((nextOpen: boolean) => {
    if (!nextOpen) {
      setLibroAbierto(null);
    }
  }, []);

  return (
    <>
    <section
      id="libros"
      className="section-paper scroll-mt-[var(--site-header-height)] py-16 md:py-24"
      aria-labelledby="libros-title"
    >
      <div className="relative z-[1] mx-auto w-full max-w-site px-6">
        <Reveal>
          <div
            className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12"
          >
            <div className="max-w-xl">
              <p className="eyebrow">{librosSection.eyebrow}</p>
              <h2
                id="libros-title"
                className="mt-3 font-display text-h1 font-bold leading-heading tracking-title text-fg"
              >
                {librosSection.title}
              </h2>
              <p className="mt-4 max-w-prose text-body text-fg-muted">
                {librosSection.intro}
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="h-11 shrink-0 self-start rounded-full border-border-strong bg-surface px-6 font-sans text-small font-semibold hover:bg-surface"
            >
              <Link href={librosSection.verTodosHref}>
                {librosSection.verTodosLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <ul
          className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {libros.map((libro, index) => (
            <li
              key={libro.slug}
              id={`libro-${libro.slug}`}
              className="overflow-visible scroll-mt-[var(--site-header-height)]"
            >
              <article className="flex h-full flex-col">
                <button
                  type="button"
                  onClick={() => abrirLibro(libro)}
                  onPointerEnter={() => preloadLibroDetalle(libro)}
                  onFocus={() => preloadLibroDetalle(libro)}
                  className="group flex w-full cursor-pointer flex-col rounded-md text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <div className="flex justify-center px-2 pb-2 pt-4">
                    <div
                      className={cn(
                        "relative aspect-[3/4] w-full max-w-[15rem] origin-bottom overflow-hidden rounded-sm bg-surface shadow-book",
                        "transition-transform duration-200 ease-out motion-reduce:transition-none",
                        "group-hover:rotate-0 group-focus-visible:rotate-0",
                        LIBRO_INCLINACION[index % LIBRO_INCLINACION.length],
                      )}
                    >
                      <Image
                        src={libro.imagen}
                        alt={libro.alt}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 15rem"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3
                    className="mt-5 font-sans text-small font-bold leading-snug text-fg group-hover:text-primary"
                  >
                    {libro.titulo}
                  </h3>
                  <p className="mt-1.5 text-micro text-fg-muted">{libro.autor}</p>
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <LibroDetailDialog
      libro={libroAbierto}
      open={libroAbierto !== null}
      onOpenChange={onModalOpenChange}
    />
    </>
  );
}
