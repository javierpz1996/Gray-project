"use client";

import { useState } from "react";
import { updateHeroPanels } from "./actions";
import { PanelNotice } from "./panel-notice";

function isNextRedirect(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    String(error.digest).startsWith("NEXT_REDIRECT")
  );
}

export function HeroImageForm({
  slot,
  label,
  imageSrc,
}: {
  slot: string;
  label: string;
  imageSrc: string;
}) {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <form
      className="panel-file"
      action={async (formData) => {
        try {
          await updateHeroPanels(formData);
        } catch (error) {
          if (isNextRedirect(error)) throw error;
          const text = error instanceof Error ? error.message : "";
          setNotice(
            /body exceeded|body size|1 mb|mb limit/i.test(text)
              ? "La imagen supera el tamaño permitido. Usa un archivo de hasta 8 MB."
              : "No se pudo guardar la imagen.",
          );
        }
      }}
    >
      {notice ? <PanelNotice tone="error" message={notice} /> : null}
      <input type="hidden" name="slot" value={slot} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt="" />
      <div>
        <h2 className="text-small font-semibold">{label}</h2>
        <div className="panel-file-actions">
          <label className="text-nano text-fg-muted" htmlFor={`image-${slot}`}>
            Nueva imagen
          </label>
          <input
            id={`image-${slot}`}
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            className="text-nano file:mr-2 file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano file:text-fg"
          />
          <button
            type="submit"
            className="rounded-lg bg-ink px-3 py-1.5 text-nano text-canvas transition-colors duration-150 ease-out hover:bg-ink-deep focus-visible:ring-2 focus-visible:ring-ring"
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}
