"use client";

import { useCallback, useEffect, type ComponentType } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Reveal } from "@/components/reveal";
import {
  LibrosLayoutClasico,
  LibrosLayoutDestacado,
  LibrosLayoutEditorial,
  LibrosLayoutMitad,
  LibrosLayoutMitadLista,
  LibrosLayoutMitadPoster,
  LibrosLayoutMitadSticky,
  type LibrosLayoutBodyProps,
} from "@/components/home/libros-section-layouts";
import type { LibrosLayoutId } from "@/lib/libros-layout";
import { Button } from "@/components/ui/button";
import { preloadLibroDetalle } from "@/lib/preload-libro-detalle";
import { preloadImageSrc } from "@/lib/preload-image";
import { parseLibrosLayout } from "@/lib/libros-layout";
import { productDetailHref } from "@/lib/product-detail-path";
import type { OpenLibroHandler } from "@/lib/libros-open-flight";
import type { Libro } from "@/content/libros";
import {
  libroEdicionCompleta,
  libros,
  librosTemas,
} from "@/content/libros";

const LIBROS_LAYOUTS: Record<LibrosLayoutId, ComponentType<LibrosLayoutBodyProps>> = {
  1: LibrosLayoutClasico,
  2: LibrosLayoutDestacado,
  4: LibrosLayoutEditorial,
  5: LibrosLayoutMitad,
  6: LibrosLayoutMitadLista,
  7: LibrosLayoutMitadSticky,
  8: LibrosLayoutMitadPoster,
};

export function LibrosSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const layout = parseLibrosLayout(searchParams.get("libros"));

  useEffect(() => {
    for (const item of libros) {
      preloadImageSrc(item.imagen);
    }
  }, []);

  const abrirPortada: OpenLibroHandler = useCallback(
    (libro) => {
      preloadLibroDetalle(libro);
      preloadImageSrc(libro.imagen);
      router.push(productDetailHref(libro.slug));
    },
    [router],
  );

  const precargarLibro = useCallback(
    (libro: Libro) => {
      preloadLibroDetalle(libro);
      router.prefetch(productDetailHref(libro.slug));
    },
    [router],
  );

  const layoutProps = {
    completo: libroEdicionCompleta,
    temas: librosTemas,
    onOpen: abrirPortada,
    onPreload: precargarLibro,
  };

  const LayoutBody = LIBROS_LAYOUTS[layout];

  const scrollAlCatalogo = () => {
    document
      .querySelector(".libros-split__completo-portada")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="libros"
      className="section-paper scroll-mt-[var(--site-header-height)] py-16 md:py-24"
      aria-labelledby="libros-title"
      data-libros-layout={layout}
    >
      <div className="relative z-[1] mx-auto w-full max-w-site px-6">
        <Reveal>
          <div
            id={`libro-${libroEdicionCompleta.slug}`}
            className="max-w-xl scroll-mt-[var(--site-header-height)]"
          >
            <p className="eyebrow">{libroEdicionCompleta.eyebrow}</p>
            <h2
              id="libros-title"
              className="mt-3 font-display text-h1 font-bold leading-heading tracking-title text-fg"
            >
              {libroEdicionCompleta.titulo}
            </h2>
            <p className="mt-4 max-w-prose text-body text-fg-muted">
              {libroEdicionCompleta.descripcion}
            </p>
            {libroEdicionCompleta.precio ? (
              <p className="mt-4 text-body font-semibold text-fg">
                {libroEdicionCompleta.precio.ars} ·{" "}
                {libroEdicionCompleta.precio.usd}
              </p>
            ) : null}
            <Button
              type="button"
              variant="default"
              size="sm"
              className="mt-4 h-11 rounded-none font-semibold text-primary-foreground hover:text-primary-foreground"
              onClick={scrollAlCatalogo}
              onPointerEnter={() => precargarLibro(libroEdicionCompleta)}
              onFocus={() => precargarLibro(libroEdicionCompleta)}
            >
              Ver libros →
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4 ml-0 h-11 rounded-none sm:ml-3"
              onClick={() => {
                document
                  .getElementById("estante-3d")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Estante 3D →
            </Button>
          </div>
        </Reveal>

        <LayoutBody {...layoutProps} />
      </div>
    </section>
  );
}
