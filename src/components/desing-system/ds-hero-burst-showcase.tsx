import Link from "next/link";
import { Design2HeroBurstEffects } from "@/components/home/design-2/design-2-hero-burst-effects";
import type { Design2HeroBurstPresetId } from "@/lib/design-2-hero-burst-preset";
import "@/components/home/design-2/design-2-hero-burst-effects.css";
import "./ds-hero-burst-showcase.css";

const SPRITES = [
  { id: 1, label: "Burst 1", steps: "5 fotogramas" },
  { id: 2, label: "Burst 2", steps: "5 fotogramas" },
  { id: 3, label: "Burst 3", steps: "10 fotogramas" },
  { id: 4, label: "Burst 4", steps: "10 fotogramas" },
  { id: 5, label: "Burst 5", steps: "10 fotogramas" },
  { id: 6, label: "Burst 6", steps: "5 fotogramas (chico)" },
] as const;

const COMPOSES: ReadonlyArray<{
  id: Design2HeroBurstPresetId;
  title: string;
  caption: string;
  href: string;
}> = [
  {
    id: "lite",
    title: "Hero lite",
    caption: "Capas 2 · 5 · 6",
    href: "/?diseno=2&burst=lite",
  },
  {
    id: "corner",
    title: "Solo esquinas",
    caption: "Capas 1 · 4 · 6 · 7",
    href: "/?diseno=2&burst=corner",
  },
  {
    id: "soft",
    title: "Suave",
    caption: "Todas · escala 0.42",
    href: "/?diseno=2&burst=soft",
  },
  {
    id: "dense",
    title: "Dense",
    caption: "Todas · escala 0.48",
    href: "/?diseno=2&burst=dense",
  },
];

export function DsHeroBurstShowcase() {
  return (
    <div className="ds-burst-showcase">
      <p className="ds-anim-category-desc">
        Sprites del hero (referencia{" "}
        <a
          href="https://kinioto-anime.com/"
          className="ds-link"
          rel="noreferrer"
          target="_blank"
        >
          kinioto-anime.com
        </a>
        ). Cada uno es una tira horizontal que avanza con{" "}
        <code className="ds-token">steps()</code>. Sustituí los PNG en{" "}
        <code className="ds-token">public/hero/kinioto-effects/</code> antes de
        publicar.
      </p>

      <div className="ds-burst-grid" aria-label="Sprites individuales">
        {SPRITES.map(({ id, label, steps }) => (
          <figure key={id} className="ds-burst-swatch">
            <figcaption className="ds-burst-swatch__label">
              {label} · {steps}
            </figcaption>
            <div className="ds-burst-swatch__stage" aria-hidden>
              <div
                className={`ds-burst-swatch__sprite ds-burst-swatch__sprite--${id}`}
              />
            </div>
          </figure>
        ))}
      </div>

      <h4 className="ds-anim-panel-title" style={{ marginTop: "1.75rem" }}>
        Composiciones en el hero
      </h4>
      <p className="ds-anim-meta">
        Probá en vivo con{" "}
        <code className="ds-token">?diseno=2&amp;burst=…</code>
      </p>

      <div className="ds-burst-presets">
        {COMPOSES.map(({ id, title, caption, href }) => (
          <figure
            key={id}
            className={`ds-burst-compose ds-burst-compose--${id}`}
          >
            <Design2HeroBurstEffects preset={id} />
            <figcaption className="ds-burst-compose__caption">
              {title} — {caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="ds-anim-meta" style={{ marginTop: "1rem" }}>
        <Link href="/?diseno=2&burst=full" className="ds-link">
          Hero con preset «full» (todas las capas, escala actual)
        </Link>
        {" · "}
        <Link href="/?diseno=2&burst=dense" className="ds-link">
          dense (más chicas aún)
        </Link>
      </p>
    </div>
  );
}
