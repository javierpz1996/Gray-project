"use client";

import { useState, type ReactNode } from "react";
import { DsToken } from "@/components/desing-system/ds-section";

function AnimCategory({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="ds-anim-category" aria-labelledby={id}>
      <header className="ds-anim-category-header">
        <h3 className="ds-anim-category-title" id={id}>
          {title}
        </h3>
        <p className="ds-anim-category-desc">{description}</p>
      </header>
      {children}
    </section>
  );
}

function AnimPanel({
  title,
  meta,
  children,
  wide,
}: {
  title: string;
  meta: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <article
      className={`ds-anim-panel${wide ? " ds-anim-panel--wide" : ""}`}
    >
      <h4 className="ds-anim-panel-title">{title}</h4>
      <p className="ds-anim-meta">{meta}</p>
      <div className="ds-anim-panel-body ds-anim-lab">{children}</div>
    </article>
  );
}

export function DsAnimationsShowcase() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="ds-anim-showcase"
      data-paused={paused ? "" : undefined}
    >
      <div className="ds-anim-toolbar">
        <p className="ds-anim-toolbar-copy">
          Las demos se reproducen en <strong>bucle</strong> para que puedas
          verlas sin hacer scroll. Con{" "}
          <code className="ds-token">prefers-reduced-motion</code> el movimiento
          se desactiva.
        </p>
        <button
          type="button"
          className="ds-btn ds-btn-secondary"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
        >
          {paused ? "Reanudar bucles" : "Pausar bucles"}
        </button>
      </div>

      <AnimCategory
        id="anim-cat-texto"
        title="Texto"
        description="Entradas editoriales y micro-interacciones — en producción suelen dispararse una sola vez."
      >
        <div className="ds-anim-grid ds-anim-grid--editorial">
          <AnimPanel
            wide
            title="Entrada escalonada"
            meta={
              <>
                Bucle 5s · delays 0–240ms ·{" "}
                <DsToken>--ds-duration-slow</DsToken>
              </>
            }
          >
            <div className="ds-anim-text-stagger">
              <p className="ds-eyebrow">Serie en curso</p>
              <p className="ds-h2 ds-anim-text-stagger-title">
                Horizonte atlántico
              </p>
              <p className="ds-subtitle">Óleo sobre lienzo · 2024</p>
              <p className="ds-body">
                Cada bloque entra en cascada para guiar la lectura.
              </p>
            </div>
          </AnimPanel>

          <AnimPanel
            title="Título con máscara"
            meta={
              <>
                <DsToken>clip-path</DsToken> · bucle 3.2s
              </>
            }
          >
            <p className="ds-anim-text-mask ds-h3">Luz de tarde</p>
          </AnimPanel>

          <AnimPanel
            title="Párrafo revelado"
            meta={
              <>
                Bucle 4s · <DsToken>translateY(8px)</DsToken>
              </>
            }
          >
            <p className="ds-anim-reveal ds-anim-reveal-copy">
              Opacidad y desplazamiento suave. En el sitio principal el patrón{" "}
              <code className="ds-token">Reveal</code> solo corre una vez.
            </p>
          </AnimPanel>

          <AnimPanel
            title="Enlace con subrayado"
            meta={
              <>
                Bucle 2.4s · <DsToken>--ds-duration-fast</DsToken>
              </>
            }
          >
            <span className="ds-anim-link-demo">Ver ficha de la pieza</span>
          </AnimPanel>

          <AnimPanel
            title="Lista con stagger"
            meta="Bucle 4.5s · 80ms entre líneas"
          >
            <ul className="ds-anim-list-stagger">
              <li>Obra</li>
              <li>Documentos</li>
              <li>Bio</li>
              <li>Contacto</li>
            </ul>
          </AnimPanel>

          <AnimPanel
            title="Resaltado en línea"
            meta="Barrido de fondo crema · bucle 3s"
          >
            <p className="ds-anim-text-highlight">
              Pieza destacada en{" "}
              <span className="ds-anim-text-highlight-mark">colección</span>
            </p>
          </AnimPanel>

          <AnimPanel
            title="Display · tracking"
            meta="Letter-spacing en mayúsculas · bucle 2.8s"
          >
            <p className="ds-anim-text-tracking">EXPOSICIÓN 2025</p>
          </AnimPanel>

          <AnimPanel
            title="Aviso de error"
            meta="Micro shake horizontal · bucle 4s"
          >
            <p className="ds-anim-text-shake" role="alert">
              Revisa el correo electrónico
            </p>
          </AnimPanel>

          <AnimPanel
            title="Cifra de impacto"
            meta="Escala + fade · metadata de sala"
          >
            <p className="ds-anim-stat">
              <span className="ds-anim-stat-value">24</span>
              <span className="ds-anim-stat-label">piezas en sala</span>
            </p>
          </AnimPanel>
        </div>
      </AnimCategory>

      <AnimCategory
        id="anim-cat-imagen"
        title="Imagen"
        description="Comportamiento de la retícula: opacidad, zoom, carga y crossfade — demos con bloques de color."
      >
        <div className="ds-anim-grid ds-anim-grid--media">
          <AnimPanel
            title="Opacidad"
            meta={
              <>
                Retícula del sitio · <DsToken>--ds-duration-base</DsToken> ·
                bucle
              </>
            }
          >
            <div className="ds-anim-img-frame">
              <div
                className="ds-anim-img-swatch ds-anim-img-swatch--loop-opacity"
                aria-hidden="true"
              />
            </div>
            <p className="ds-anim-img-caption">1 → 0.85 → 1</p>
          </AnimPanel>

          <AnimPanel
            title="Zoom contenido"
            meta={
              <>
                <DsToken>scale(1.04)</DsToken> · bucle 3s
              </>
            }
          >
            <div className="ds-anim-img-frame ds-anim-img-frame--clip">
              <div
                className="ds-anim-img-swatch ds-anim-img-swatch--blue ds-anim-img-swatch--loop-zoom"
                aria-hidden="true"
              />
            </div>
            <p className="ds-anim-img-caption">Escala dentro del marco</p>
          </AnimPanel>

          <AnimPanel
            title="Carga blur → nítido"
            meta={
              <>
                Bucle 4s · <DsToken>--ds-duration-slow</DsToken>
              </>
            }
          >
            <div className="ds-anim-img-frame">
              <div
                className="ds-anim-img-swatch ds-anim-img-swatch--orange ds-anim-img-swatch--loop-blur"
                aria-hidden="true"
              />
            </div>
            <p className="ds-anim-img-caption">Simula decode de imagen</p>
          </AnimPanel>

          <AnimPanel
            title="Crossfade"
            meta="Alternancia A/B · 200ms por paso · bucle 5s"
          >
            <div className="ds-anim-img-frame">
              <div
                className="ds-anim-img-swatch ds-anim-img-swatch--loop-cross-a"
                aria-hidden="true"
              />
              <div
                className="ds-anim-img-swatch ds-anim-img-swatch--yellow ds-anim-img-swatch--loop-cross-b"
                aria-hidden="true"
              />
            </div>
            <p className="ds-anim-img-caption">Dos capas superpuestas</p>
          </AnimPanel>

          <AnimPanel
            wide
            title="Panorama"
            meta="Desplazamiento horizontal · bucle 6s · solo referencia"
          >
            <div className="ds-anim-img-pan" aria-hidden="true">
              <div className="ds-anim-img-pan-track ds-anim-img-pan-track--loop">
                <span className="ds-anim-img-pan-swatch" />
                <span className="ds-anim-img-pan-swatch ds-anim-img-pan-swatch--blue" />
                <span className="ds-anim-img-pan-swatch ds-anim-img-pan-swatch--orange" />
                <span className="ds-anim-img-pan-swatch ds-anim-img-pan-swatch--yellow" />
                <span className="ds-anim-img-pan-swatch ds-anim-img-pan-swatch--blue" />
              </div>
            </div>
          </AnimPanel>

          <AnimPanel
            title="Entrada lateral"
            meta="translateX · bucle 3.5s"
          >
            <div className="ds-anim-img-frame ds-anim-img-frame--clip">
              <div
                className="ds-anim-img-swatch ds-anim-img-swatch--green ds-anim-img-swatch--loop-slide"
                aria-hidden="true"
              />
            </div>
          </AnimPanel>

          <AnimPanel
            title="Ken Burns suave"
            meta="scale + desplazamiento · bucle 5s"
          >
            <div className="ds-anim-img-frame ds-anim-img-frame--clip">
              <div
                className="ds-anim-img-swatch ds-anim-img-swatch--sky ds-anim-img-swatch--loop-ken"
                aria-hidden="true"
              />
            </div>
          </AnimPanel>

          <AnimPanel
            title="Wipe vertical"
            meta="clip-path desde abajo · bucle 4s"
          >
            <div className="ds-anim-img-frame">
              <div
                className="ds-anim-img-swatch ds-anim-img-swatch--red ds-anim-img-swatch--loop-wipe"
                aria-hidden="true"
              />
            </div>
          </AnimPanel>

          <AnimPanel
            title="Marco pulsante"
            meta="box-shadow · bucle 2.5s"
          >
            <div className="ds-anim-img-frame ds-anim-img-frame--loop-ring">
              <div
                className="ds-anim-img-swatch ds-anim-img-swatch--cream"
                aria-hidden="true"
              />
            </div>
          </AnimPanel>
        </div>
      </AnimCategory>

      <AnimCategory
        id="anim-cat-ui"
        title="UI y carga"
        description="Feedback, placeholders y transiciones de controles."
      >
        <div className="ds-anim-grid">
          <AnimPanel
            title="Skeleton shimmer"
            meta={
              <>
                1.4s loop · <DsToken>ds-skeleton-shimmer</DsToken>
              </>
            }
          >
            <div className="ds-skeleton-card">
              <div className="ds-skeleton ds-skeleton-title" aria-hidden="true" />
              <div className="ds-skeleton ds-skeleton-line" aria-hidden="true" />
              <div
                className="ds-skeleton ds-skeleton-line ds-skeleton-line-short"
                aria-hidden="true"
              />
            </div>
          </AnimPanel>

          <AnimPanel
            title="Barra indeterminada"
            meta={<DsToken>--ds-duration-slow</DsToken>}
          >
            <div className="ds-anim-slide-demo" aria-hidden="true">
              <span />
            </div>
          </AnimPanel>

          <AnimPanel
            title="Toast de entrada"
            meta="Bucle 3.5s · slide + fade"
          >
            <div className="ds-anim-toast ds-anim-toast--loop" role="status">
              <p className="ds-anim-toast-title">Guardado</p>
              <p className="ds-anim-toast-body">
                Los cambios en la ficha se aplicaron correctamente.
              </p>
            </div>
          </AnimPanel>

          <AnimPanel
            title="Botón · pulso suave"
            meta={<DsToken>--ds-duration-fast</DsToken>}
          >
            <span className="ds-anim-hover-fast ds-anim-hover-fast--loop">
              Estado activo
            </span>
          </AnimPanel>

          <AnimPanel
            title="Superficie · respiración"
            meta={<DsToken>--ds-duration-base</DsToken>}
          >
            <div
              className="ds-anim-fade-block ds-anim-fade-block--loop"
              aria-hidden="true"
            >
              <span className="ds-anim-fade-block-label">Capa de color</span>
            </div>
          </AnimPanel>

          <AnimPanel
            title="Progreso determinado"
            meta="Relleno 0→100% · bucle 4s"
          >
            <div className="ds-anim-progress" aria-hidden="true">
              <div className="ds-anim-progress-bar" />
            </div>
          </AnimPanel>

          <AnimPanel
            title="Spinner"
            meta="Rotación continua · 900ms"
          >
            <div className="ds-anim-spinner" aria-hidden="true" />
          </AnimPanel>

          <AnimPanel
            title="Indicador en vivo"
            meta="Pulso de opacidad · bucle 1.8s"
          >
            <p className="ds-anim-live">
              <span className="ds-anim-live-dot" aria-hidden="true" />
              Publicando obra nueva
            </p>
          </AnimPanel>

          <AnimPanel
            title="Acordeón"
            meta="max-height · bucle 4.5s"
          >
            <div className="ds-anim-accordion">
              <p className="ds-anim-accordion-label">Detalle técnico</p>
              <div className="ds-anim-accordion-panel">
                <p>
                  Óleo sobre lienzo · 120×90 cm · Bastidor de madera.
                </p>
              </div>
            </div>
          </AnimPanel>

          <AnimPanel
            title="Foco en campo"
            meta="Anillo coral · bucle 3s"
          >
            <div className="ds-anim-focus-field" aria-hidden="true">
              <span className="ds-anim-focus-field-inner">Email</span>
            </div>
          </AnimPanel>
        </div>
      </AnimCategory>
    </div>
  );
}
