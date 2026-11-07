"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Libro } from "@/content/libros";
import { lockLibroDetalleScroll, type LibrosFlightViewportRect } from "@/lib/libros-open-flight";
import { LibrosOpenHorizontalIndice } from "@/components/home/libros-open-horizontal-indice";

type LibrosOpenPortadaOverlayProps = {
  libro: Libro;
  fromViewport: LibrosFlightViewportRect | null;
  onClose: () => void;
};

/** Legado: overlay in-page; el catálogo navega a `/details-product`. */
export function LibrosOpenPortadaOverlay({
  libro,
  fromViewport: _fromViewport,
  onClose,
}: LibrosOpenPortadaOverlayProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const presentedRef = useRef(false);

  useLayoutEffect(() => {
    presentedRef.current = false;
  }, [libro.slug]);

  useLayoutEffect(() => {
    if (presentedRef.current) return;
    presentedRef.current = true;
    lockLibroDetalleScroll();
  }, [libro.slug]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={scrollerRef}
      role="dialog"
      aria-modal="true"
      aria-label={libro.titulo}
      className="fixed inset-x-0 bottom-0 top-[var(--site-header-height)] z-[45] overflow-y-auto overscroll-y-contain bg-canvas"
      data-libro-detalle-layer=""
    >
      <div data-lenis-content="">
      <div className="section-paper py-16 md:py-24">
        <div className="mx-auto w-full max-w-site px-6">
          <p className="eyebrow">{libro.eyebrow}</p>
          <h1 className="mt-3 font-display text-h1 font-bold leading-heading tracking-title text-fg">
            {libro.titulo}
          </h1>
          <p className="mt-4 max-w-prose text-body text-fg-muted">
            Seguí bajando con el mouse o trackpad. La sección siguiente queda
            fija en viewport mientras el contenido avanza en horizontal.
          </p>
        </div>
      </div>

      <LibrosOpenHorizontalIndice libro={libro} scrollerRef={scrollerRef} />

      <div className="section-paper py-16 md:py-24">
        <div className="mx-auto w-full max-w-site px-6">
          <p className="eyebrow text-fg-muted">Fin del recorrido</p>
          <h2 className="mt-3 font-display text-h2 font-bold text-fg">
            Scroll vertical otra vez
          </h2>
          <p className="mt-4 max-w-prose text-body text-fg-muted">
            Terminaste el desplazamiento horizontal. Podés seguir bajando o
            pulsar Escape para volver al catálogo.
          </p>
        </div>
      </div>
      </div>
    </div>,
    document.body,
  );
}

export { LibrosOpenPortadaOverlay as LibrosOpenFlightOverlay };
