import type { RefObject } from "react";
import type { Libro } from "@/content/libros";
import type { LibroIndiceDetallado } from "@/content/libros-indice-detallado";
import {
  HorizontalPanel,
  HorizontalScroll,
} from "@/components/horizontal-scroll/horizontal-scroll";

function indiceFromLibro(libro: Libro): LibroIndiceDetallado | null {
  if (libro.indiceDetallado) {
    return libro.indiceDetallado;
  }
  if (!libro.contenido?.length) {
    return null;
  }
  return {
    tituloSeccion: "Contenido",
    subtitulo: `${libro.contenido.length} temas`,
    headline: libro.titulo,
    capitulos: libro.contenido.map((titulo, index) => ({
      numero: String(index + 1).padStart(2, "0"),
      titulo,
      temas: [],
    })),
  };
}

const panelFullWidth =
  "w-[var(--hs-panel-w,100vw)] min-w-[var(--hs-panel-w,100vw)] max-w-[var(--hs-panel-w,100vw)]";

const panelViewportHeight =
  "min-h-[70dvh] md:h-[calc(100dvh-var(--site-header-height))] md:min-h-0";

const panelBase = `flex h-full ${panelViewportHeight} items-center justify-center px-8`;

/** Mismo patrón que `HorizontalScrollDemo` (pin GSAP + scrub). */
export function LibrosOpenHorizontalIndice({
  libro,
  scrollerRef,
  pinAtDocumentStart = false,
}: {
  libro: Libro;
  scrollerRef?: RefObject<HTMLElement | null>;
  pinAtDocumentStart?: boolean;
}) {
  const indice = indiceFromLibro(libro);
  if (!indice) {
    return null;
  }

  const capitulos = indice.capitulos;
  const panelCount = 1 + capitulos.length;

  return (
    <HorizontalScroll
      scrollerRef={scrollerRef}
      panelCount={panelCount}
      smoothScroll
      pinAtDocumentStart={pinAtDocumentStart}
      pinClassName="md:!h-[calc(100dvh-var(--site-header-height))]"
    >
      <HorizontalPanel
        className={`${panelFullWidth} ${panelBase} border-e border-border bg-canvas`}
      >
        <div className="max-w-md text-left">
          <p className="eyebrow text-fg-muted">{indice.tituloSeccion}</p>
          <h2 className="mt-2 font-display text-h2 font-bold text-fg">
            {libro.titulo}
          </h2>
          {libro.descripcion ? (
            <p className="mt-4 text-body text-fg-muted">{libro.descripcion}</p>
          ) : null}
          {libro.apuntes?.length ? (
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-body text-fg-muted">
              {libro.apuntes.map((apunte) => (
                <li key={apunte}>{apunte}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </HorizontalPanel>

      {capitulos.map((capitulo, index) => {
        const bgClass = index % 2 === 0 ? "bg-surface" : "bg-canvas";
        const borderClass =
          index < capitulos.length - 1 ? "border-e border-border" : "";

        return (
          <HorizontalPanel
            key={capitulo.numero}
            className={`${panelFullWidth} ${panelBase} ${bgClass} ${borderClass}`}
          >
            <div className="max-w-md text-left">
              <p className="eyebrow text-fg-muted">
                Capítulo {capitulo.numero}
              </p>
              <h2 className="mt-2 font-display text-h2 font-bold text-fg">
                {capitulo.titulo}
              </h2>
              {capitulo.temas.length > 0 ? (
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-body text-fg-muted">
                  {capitulo.temas.map((tema) => (
                    <li key={tema}>{tema}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-body text-fg-muted">
                  {indice.subtitulo}
                </p>
              )}
            </div>
          </HorizontalPanel>
        );
      })}
    </HorizontalScroll>
  );
}
