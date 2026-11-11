"use client";

import { useState } from "react";
import "./menu-button-options.css";

function Bars() {
  return (
    <span className="mo-bars" aria-hidden>
      <span />
      <span />
    </span>
  );
}

function RingText({ id, spin }: { id: string; spin?: boolean }) {
  return (
    <svg className={spin ? "mo-ring is-spin" : "mo-ring"} viewBox="0 0 100 100" aria-hidden>
      <defs>
        <path
          id={id}
          d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0"
        />
      </defs>
      <text>
        <textPath href={`#${id}`} textLength="214" lengthAdjust="spacing">
          {spin ? "MENU · MENU · MENU · MENU · MENU · " : "MENU · MENU"}
        </textPath>
      </text>
    </svg>
  );
}

export function MenuButtonOptions() {
  const [orbit, setOrbit] = useState(false);

  return (
    <div className="mo-grid">
      <figure>
        <button type="button" className="mo-btn" aria-label="Anillo girando">
          <RingText id="mo-ring-1" spin />
          <Bars />
        </button>
        <figcaption>
          <strong>1 · Anillo. </strong>
          MENU gira alrededor del círculo. Las rayas quedan quietas.
        </figcaption>
      </figure>

      <figure>
        <button type="button" className="mo-btn" aria-label="Letras verticales">
          <span className="mo-stack" aria-hidden>
            <span>M</span>
            <span>E</span>
            <span>N</span>
            <span>U</span>
          </span>
        </button>
        <figcaption>
          <strong>2 · Vertical. </strong>
          Las letras apiladas dentro del círculo, sin giro.
        </figcaption>
      </figure>

      <figure>
        <button type="button" className="mo-btn" aria-label="Arco fijo">
          <span className="mo-halo" aria-hidden />
          <RingText id="mo-ring-3" />
          <Bars />
        </button>
        <figcaption>
          <strong>3 · Arco fijo. </strong>
          El texto sigue la curva y no se mueve. Gira solo el aro.
        </figcaption>
      </figure>

      <figure>
        <button type="button" className="mo-btn is-disc" aria-label="Disco girando">
          <span className="mo-still">
            <span className="mo-word">MENU</span>
            <Bars />
          </span>
        </button>
        <figcaption>
          <strong>4 · Disco. </strong>
          Gira el círculo. MENU y las rayas se quedan horizontales.
        </figcaption>
      </figure>

      <figure>
        <div className="mo-side">
          <span className="mo-spine" aria-hidden>
            MENU
          </span>
          <button type="button" className="mo-btn" aria-label="Etiqueta lateral">
            <Bars />
          </button>
        </div>
        <figcaption>
          <strong>5 · Lomo. </strong>
          MENU en vertical, pegado al costado del círculo.
        </figcaption>
      </figure>

      <figure>
        <button
          type="button"
          className={orbit ? "mo-btn mo-toggle is-orbit" : "mo-btn mo-toggle"}
          aria-pressed={orbit}
          onClick={() => setOrbit((value) => !value)}
        >
          <RingText id="mo-ring-6" spin />
          <span className="mo-word">MENU</span>
          <Bars />
        </button>
        <figcaption>
          <strong>6 · Al abrir. </strong>
          Tocá el botón: MENU sale al borde y empieza a girar.
        </figcaption>
      </figure>
    </div>
  );
}
