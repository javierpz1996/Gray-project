"use client";

import { useCallback, useEffect, useState, type ComponentType } from "react";
import { useSearchParams } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { LibroDetailDialog } from "@/components/home/libro-detail-dialog";
import {
  LibrosLayoutClasico,
  LibrosLayoutDestacado,
  LibrosLayoutEditorial,
  LibrosLayoutEstante,
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
import type { Libro } from "@/content/libros";
import {
  libroEdicionCompleta,
  libros,
  librosSection,
  librosTemas,
} from "@/content/libros";

const LIBROS_LAYOUTS: Record<LibrosLayoutId, ComponentType<LibrosLayoutBodyProps>> = {
  1: LibrosLayoutClasico,
  2: LibrosLayoutDestacado,
  3: LibrosLayoutEstante,
  4: LibrosLayoutEditorial,
  5: LibrosLayoutMitad,
  6: LibrosLayoutMitadLista,
  7: LibrosLayoutMitadSticky,
  8: LibrosLayoutMitadPoster,
};

export function LibrosSection() {
  const searchParams = useSearchParams();
  const layout = parseLibrosLayout(searchParams.get("libros"));
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

  const precargarLibro = useCallback((libro: Libro) => {
    preloadLibroDetalle(libro);
  }, []);

  const onModalOpenChange = useCallback((nextOpen: boolean) => {
    if (!nextOpen) {
      setLibroAbierto(null);
    }
  }, []);

  const layoutProps = {
    completo: libroEdicionCompleta,
    temas: librosTemas,
    onOpen: abrirLibro,
    onPreload: precargarLibro,
  };

  const LayoutBody = LIBROS_LAYOUTS[layout];

  return (
    <>
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
                onClick={() => abrirLibro(libroEdicionCompleta)}
                onPointerEnter={() => precargarLibro(libroEdicionCompleta)}
                onFocus={() => precargarLibro(libroEdicionCompleta)}
              >
                Ver detalle →
              </Button>
            </div>
          </Reveal>

          <LayoutBody {...layoutProps} />
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
