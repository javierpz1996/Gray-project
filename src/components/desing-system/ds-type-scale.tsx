import { site } from "@/config/site";

const specimens = [
  {
    label: "Display / Barlow Condensed 700",
    sample: "Obra y archivo",
    className: "ds-display",
  },
  { label: "H1", sample: "Portafolio", className: "ds-h1" },
  { label: "H2 — sección", sample: "Sistema de diseño", className: "ds-h2" },
  {
    label: "Lead — Inter",
    sample:
      "Texto de entrada con ritmo calmado y jerarquía clara. El cuerpo usa interlineado 1.6 y ancho máximo ~65 caracteres.",
    className: "ds-lead",
  },
  {
    label: "Micro / eyebrow",
    sample: "Óleo sobre lienzo · 2024",
    className: "ds-eyebrow",
  },
] as const;

export function DsTypeScale() {
  return (
    <div className="ds-panel ds-type-scale">
      {specimens.map((row) => (
        <div key={row.label} className="ds-type-row">
          <p className="ds-type-label">{row.label}</p>
          <p className={`${row.className} ds-type-sample`}>{row.sample}</p>
        </div>
      ))}
      <div className="ds-type-row">
        <p className="ds-type-label">Marca — display</p>
        <p className="ds-h1 ds-type-sample uppercase text-[var(--ds-coral)]">
          {site.shortName}
        </p>
      </div>
      <div className="ds-type-composition">
        <p className="ds-type-label">Bloque editorial</p>
        <div className="max-w-[42rem]">
          <h2 className="ds-h2">Serie «Horizonte»</h2>
          <p className="ds-subtitle mt-3">
            Óleo y acrílico · 2023–2025
          </p>
          <p className="ds-body mt-4">
            Cada pieza explora la línea entre cielo y tierra en la costa
            atlántica. El cuerpo usa Inter a 1.06rem con interlineado 1.6 para
            lectura prolongada en fichas y textos de sala.
          </p>
        </div>
      </div>
    </div>
  );
}
