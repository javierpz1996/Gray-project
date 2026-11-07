"use client";

import { HorizontalPanel, HorizontalScroll } from "./horizontal-scroll";

/** Ancho de panel = viewport del pin (actualizado por GSAP en desktop). */
const panelFullWidth =
  "w-[var(--hs-panel-w,100vw)] min-w-[var(--hs-panel-w,100vw)] max-w-[var(--hs-panel-w,100vw)]";

const panelViewportHeight =
  "min-h-[70dvh] md:h-[calc(100dvh-var(--site-header-height))] md:min-h-0";

/** Panel 01 y 02 en carril horizontal; panel 03 en scroll vertical. */
export function HorizontalScrollDemo() {
  return (
    <>
      <HorizontalScroll
        panelCount={2}
        pinAtDocumentStart
        smoothScroll
        pinClassName="md:!h-[calc(100dvh-var(--site-header-height))]"
      >
        <HorizontalPanel
          className={`${panelFullWidth} flex h-full ${panelViewportHeight} items-center justify-center border-e border-border bg-canvas px-8`}
        >
          <div className="max-w-md text-left">
            <p className="eyebrow text-fg-muted">Panel 01</p>
            <h2 className="mt-2 font-display text-h2 font-bold text-fg">
              Scroll vertical → movimiento horizontal
            </h2>
            <p className="mt-4 text-body text-fg-muted">
              Seguí bajando con el mouse o trackpad. Esta sección permanece fija
              mientras el carril se desplaza hacia la izquierda.
            </p>
          </div>
        </HorizontalPanel>

        <HorizontalPanel
          className={`${panelFullWidth} flex h-full ${panelViewportHeight} items-center justify-center bg-surface px-8`}
        >
          <div className="max-w-md text-left">
            <p className="eyebrow text-fg-muted">Panel 02</p>
            <h2 className="mt-2 font-display text-h2 font-bold text-fg">
              Paneles independientes
            </h2>
            <p className="mt-4 text-body text-fg-muted">
              Cada bloque es un elemento HTML con ancho propio. Aquí podés mezclar
              texto, imágenes, video o capas superpuestas.
            </p>
          </div>
        </HorizontalPanel>
      </HorizontalScroll>

      <section
        className={`section-paper flex w-full ${panelViewportHeight} items-center justify-center px-8`}
      >
        <div className="max-w-md text-left">
          <p className="eyebrow text-fg-muted">Panel 03</p>
          <h2 className="mt-2 font-display text-h2 font-bold text-fg">
            Scroll vertical otra vez
          </h2>
          <p className="mt-4 text-body text-fg-muted">
            Terminaste el desplazamiento horizontal. A partir de aquí la página
            vuelve a desplazarse hacia abajo con naturalidad.
          </p>
        </div>
      </section>
    </>
  );
}
