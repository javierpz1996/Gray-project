"use client";

import Link from "next/link";
import { DsColorGrid } from "@/components/desing-system/ds-color-grid";
import {
  DsPlayBand,
  DsPlayWash,
  DsStickerButton,
  DsStickerPill,
} from "@/components/desing-system/ui/sticker";
import { DsUiScope } from "@/components/desing-system/ui";
import {
  dsPlayColors,
  dsReferoComponents,
  dsReferoPrinciples,
} from "@/content/desing-system-inspiration";
import { useState } from "react";

export function DsReferoShowcase() {
  const [lang, setLang] = useState("es");

  return (
    <div className="ds-play-scope ds-subsection-group">
      <section className="ds-subsection-stack">
        <header className="ds-subsection-header">
          <h3 className="ds-h3">Tokens de apoyo</h3>
          <p className="max-w-[42rem] text-[var(--ds-text-small)] text-[var(--ds-muted)]">
            Misma paleta que la sección Color: coral, pintura y neutros. Los
            alias <code className="ds-token">--ds-play-*</code> apuntan a esos
            tokens en CSS.
          </p>
        </header>
        <div className="ds-subsection-body">
          <DsColorGrid colors={dsPlayColors} />
        </div>
      </section>

      <section className="ds-subsection-stack">
        <header className="ds-subsection-header">
          <h3 className="ds-h3">Reglas de uso</h3>
        </header>
        <div className="ds-subsection-body">
          <ul className="ds-guidelines-list m-0 max-w-[42rem]">
            {dsReferoPrinciples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ds-subsection-stack">
        <header className="ds-subsection-header">
          <h3 className="ds-h3">Demostración</h3>
        </header>
        <div className="ds-subsection-body ds-play-demo">
          <p className="ds-play-display">Aprende. Crea. Comparte.</p>
          <p className="ds-play-hero-title">Un bloque marketing neutro</p>
          <p className="ds-play-body">
            El cuerpo permanece en gris para que el coral y el azul pintura
            guíen la acción.
          </p>
          <div className="ds-play-demo-actions">
            <DsStickerButton type="button">Empezar</DsStickerButton>
            <DsStickerButton type="button" variant="outline">
              Ya tengo cuenta
            </DsStickerButton>
          </div>
          <div className="ds-play-pill-row">
            {(
              [
                { id: "es", label: "Español" },
                { id: "en", label: "English" },
                { id: "fr", label: "Français" },
              ] as const
            ).map((item) => (
              <DsStickerPill
                key={item.id}
                active={lang === item.id}
                onClick={() => setLang(item.id)}
              >
                {item.label}
              </DsStickerPill>
            ))}
          </div>
          <DsPlayWash>
            <strong>Logro desbloqueado.</strong> Usa el lavado crema para tips,
            feedback positivo o estados de progreso secundarios.
          </DsPlayWash>
          <DsPlayBand>
            <p className="ds-play-band-title">Explorar</p>
            <ul className="ds-play-band-links">
              <li>
                <Link href="/">Obra</Link>
              </li>
              <li>
                <Link href="/documentos">Documentos</Link>
              </li>
              <li>
                <Link href="/#contacto">Contacto</Link>
              </li>
            </ul>
          </DsPlayBand>
        </div>
      </section>

      <section className="ds-subsection-stack">
        <header className="ds-subsection-header">
          <h3 className="ds-h3">Componentes mapeados</h3>
        </header>
        <div className="ds-subsection-body">
          <DsUiScope>
            <ul className="grid gap-4 sm:grid-cols-2">
              {dsReferoComponents.map((c) => (
                <li
                  key={c.id}
                  className="ds-ui-card p-5"
                >
                  <p className="ds-ui-card-title">{c.title}</p>
                  <p className="ds-ui-card-description mt-2">
                    {c.description}
                  </p>
                  <code className="ds-token mt-3 inline-block">
                    DsSticker*
                  </code>
                </li>
              ))}
            </ul>
          </DsUiScope>
        </div>
      </section>
    </div>
  );
}
