"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect } from "react";
import { X } from "lucide-react";
import { LibrosOpenHorizontalIndice } from "@/components/home/libros-open-horizontal-indice";
import { getLibroBySlug, libros } from "@/content/libros";

const panelViewportHeight =
  "min-h-[70dvh] md:h-[calc(100dvh-var(--site-header-height))] md:min-h-0";

/** Entrada a detalle: evita restaurar scroll de la home en la primera visita (App Router). */
export function DetailsProductView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("product") ?? "";
  const libro = getLibroBySlug(slug) ?? libros[0];

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = previous;
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.documentElement.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-stopped",
        "lenis-scrolling",
      );
    };
  }, [slug]);

  if (!libro) {
    return (
      <div className="section-paper flex min-h-[50dvh] items-center justify-center px-6">
        <p className="text-body text-fg-muted">No se encontró el producto.</p>
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-[var(--site-header-height)] z-40 border-b border-border bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-site items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center border border-border-strong text-fg transition-colors duration-150 ease-out hover:bg-hover"
            aria-label="Volver al catálogo"
            onClick={() => router.push("/#libros")}
          >
            <X className="size-5" aria-hidden />
          </button>
          <p className="truncate font-display text-body font-bold text-fg">
            {libro.titulo}
          </p>
          <Link
            href="/#libros"
            className="hidden text-micro font-semibold uppercase tracking-widest text-fg-muted underline-offset-4 hover:underline sm:inline"
          >
            Catálogo
          </Link>
        </div>
      </div>

      <LibrosOpenHorizontalIndice key={libro.slug} libro={libro} pinAtDocumentStart />

      <section
        className={`section-paper flex w-full ${panelViewportHeight} items-center justify-center px-8`}
      >
        <div className="max-w-md text-left">
          <p className="eyebrow text-fg-muted">Fin del recorrido</p>
          <h2 className="mt-2 font-display text-h2 font-bold text-fg">
            Scroll vertical otra vez
          </h2>
          <p className="mt-4 text-body text-fg-muted">
            Terminaste el desplazamiento horizontal. Podés seguir bajando o volver
            al catálogo.
          </p>
          <Link
            href="/#libros"
            className="mt-6 inline-block text-body font-semibold text-fg underline-offset-4 hover:underline"
          >
            Volver a libros
          </Link>
        </div>
      </section>
    </>
  );
}
