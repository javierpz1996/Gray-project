import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  DsColorGrid,
  DsPaintStrip,
} from "@/components/desing-system/ds-color-grid";
import {
  DsPanel,
  DsSection,
  DsSubsection,
  DsToken,
} from "@/components/desing-system/ds-section";
import { DsFeedbackShowcase } from "@/components/desing-system/ds-feedback-showcase";
import { DsFormShowcase } from "@/components/desing-system/ds-form-showcase";
import { DsTocNav } from "@/components/desing-system/ds-toc-nav";
import { DsTypeScale } from "@/components/desing-system/ds-type-scale";
import { DsPrinciples } from "@/components/desing-system/ds-guidelines";
import { DsAnimationsShowcase } from "@/components/desing-system/ds-animations-showcase";
import { DsComponentLibrary } from "@/components/desing-system/ds-component-library";
import { DsReferoShowcase } from "@/components/desing-system/ds-refero-showcase";
import {
  dsDesignPrinciples,
  dsSectionGuidelines,
} from "@/content/desing-system-guidelines";
import {
  dsColors,
  dsEasing,
  dsMotion,
  dsPaintStrip,
  dsRadii,
  dsShadows,
  dsSpacing,
} from "@/content/desing-system-tokens";

export default function DesingSystemPage() {
  return (
    <>
      <header className="ds-topbar">
        <div className="ds-shell flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="ds-topbar-brand">
            <div
              className="ds-topbar-palette"
              role="img"
              aria-label="Coral, azul y amarillo de la paleta"
            >
              <div className="ds-topbar-swatch ds-topbar-swatch--coral" />
              <div className="ds-topbar-swatch ds-topbar-swatch--blue" />
              <div className="ds-topbar-swatch ds-topbar-swatch--yellow" />
            </div>
            <p className="ds-topbar-title">Desing system - Gray</p>
          </div>
          <nav className="ds-topbar-nav" aria-label="Acciones">
            <Link href="/" className="ds-topbar-back">
              <ArrowLeft aria-hidden="true" className="ds-topbar-back-icon" />
              Volver al sitio
            </Link>
          </nav>
        </div>
      </header>

      <div className="ds-page">
        <aside className="ds-toc-rail">
          <DsTocNav />
        </aside>

        <div className="ds-page-main">
          <div id="inicio" className="ds-shell">
            <header className="ds-section-header">
              <p className="ds-eyebrow">Documentación viva</p>
              <h1 className="ds-h1 max-w-[18ch] tracking-tight">
                Sistema de diseño
              </h1>
              <p className="ds-lead max-w-[42rem]">
                Aquí vive la fuente de verdad del diseño: los{" "}
                <strong>tokens</strong> fijan color, tipografía, espaciado y
                movimiento; las <strong>reglas</strong> dicen cuándo y cómo
                usarlos; los <strong>componentes</strong> son los patrones
                reutilizables que materializan todo eso en pantalla. Cualquier
                pantalla nueva debe apoyarse en esta referencia y seguirla al
                pie de la letra — sin valores sueltos, variantes inventadas ni
                excepciones no documentadas.
              </p>
            </header>
            <div className="ds-section-body">
              <div className="ds-hero-mac relative flex min-h-[16rem] flex-col justify-end p-8 md:min-h-[18rem] md:p-10">
                <div className="max-w-md">
                  <p className="text-[var(--ds-text-small)] text-white/60">
                    Vista previa
                  </p>
                  <h2 className="ds-hero-mac-title mt-2">Tarjeta destacada</h2>
                  <p className="mt-3 text-[var(--ds-text-small)] text-white/75">
                    Superficie oscura, tipografía display y acento coral en
                    controles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section id="reglas">
            <div className="ds-shell">
              <p className="ds-eyebrow">Gobernanza</p>
              <DsPrinciples
                title="Reglas de diseño"
                intro="Cuándo y cómo usar tokens y componentes. Un design system profesional define uso, no solo apariencia."
                items={dsDesignPrinciples}
              />
            </div>
          </section>

          <DsSection
            id="color"
            eyebrow="Fundamentos"
            title="Paleta de color"
            intro="Coral para interacción; cuatro tonos de pintura para identidad artística; neutros para lectura prolongada."
            rules={dsSectionGuidelines.color}
          >
            <div className="ds-stack-loose">
            <DsPanel>
              <p className="ds-eyebrow">Franja de pintura</p>
              <DsPaintStrip tokens={dsPaintStrip} />
            </DsPanel>
            <div className="ds-subsection-group">
              <DsSubsection
                title="Marca y pintura"
                description="CTA, logo y acentos de marca."
              >
                <DsColorGrid colors={dsColors.marca} />
              </DsSubsection>
              <DsSubsection
                title="Neutros"
                description="Fondos, texto y líneas."
              >
                <DsColorGrid colors={dsColors.neutros} />
              </DsSubsection>
              <DsSubsection
                title="Semánticos"
                description="Solo feedback y validación — no decoración."
              >
                <DsColorGrid colors={dsColors.semantico} />
              </DsSubsection>
              <DsSubsection
                title="Fondos de apoyo"
                description="Superficies alternas y bloques editoriales."
              >
                <DsColorGrid colors={dsColors.acentos} />
              </DsSubsection>
            </div>
            </div>
          </DsSection>

          <DsSection
            id="tipo"
            eyebrow="Fundamentos"
            title="Tipografía"
            intro="Barlow Condensed para display y UI en mayúsculas; Inter para párrafos y textos largos."
            rules={dsSectionGuidelines.tipo}
          >
            <DsTypeScale />
          </DsSection>

          <DsSection
            id="espaciado"
            eyebrow="Layout"
            title="Espaciado"
            intro="Escala base 4px. Usar solo estos saltos para padding, gaps y márgenes verticales."
            rules={dsSectionGuidelines.espaciado}
          >
            <DsPanel>
              <ul className="flex flex-col gap-5">
                {dsSpacing.map((s) => (
                  <li
                    key={s.css}
                    className="grid grid-cols-[3.5rem_1fr] items-center gap-4 sm:grid-cols-[4rem_1fr_8rem]"
                  >
                    <span className="font-mono text-[var(--ds-text-small)] font-semibold">
                      {s.label}px
                    </span>
                    <div className="ds-spacing-track">
                      <div
                        className="ds-spacing-bar"
                        style={{ width: `min(100%, var(${s.css}))` }}
                      />
                    </div>
                    <DsToken>{s.css}</DsToken>
                  </li>
                ))}
              </ul>
            </DsPanel>
          </DsSection>

          <DsSection
            id="forma"
            eyebrow="Layout"
            title="Forma"
            intro="Radios progresivos: controles pequeños, tarjetas grandes, chips casi pill."
            rules={dsSectionGuidelines.forma}
          >
            <div className="ds-radius-grid">
              {dsRadii.map((r) => (
                <div
                  key={r.token}
                  className={`ds-radius-sample${
                    r.token === "--ds-radius-pill" ? " ds-radius-sample--pill" : ""
                  }${
                    r.token === "--ds-radius-sticker"
                      ? " ds-radius-sample--sticker"
                      : ""
                  }`}
                  style={{ borderRadius: `var(${r.token})` }}
                >
                  <div className="ds-radius-sample-body">
                    <p className="ds-radius-sample-title">{r.name}</p>
                    <DsToken>{r.token}</DsToken>
                    <p className="ds-radius-sample-value">{r.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </DsSection>

          <DsSection
            id="sombras"
            eyebrow="Elevación"
            title="Sombras"
            intro="Sombras difusas para botones y tarjetas; sombra amplia para elementos flotantes."
            rules={dsSectionGuidelines.sombras}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dsShadows.map((s) => (
                <div
                  key={s.token}
                  className={`ds-shadow-sample ${s.className}`}
                >
                  <div className="text-center">
                    <p className="font-semibold capitalize text-[var(--ds-ink)]">
                      {s.name}
                    </p>
                    <p className="mt-2">
                      <DsToken>{s.token}</DsToken>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DsSection>

          <DsSection
            id="bordes"
            eyebrow="Elevación"
            title="Bordes"
            intro="Hairline para UI ligera; trazo 2px para énfasis puntual."
            rules={dsSectionGuidelines.bordes}
          >
            <DsPanel>
              <div className="flex flex-col gap-4">
                <div
                  className="ds-border-sample"
                  style={{ border: "1px solid var(--ds-line)" }}
                >
                  1px — <DsToken>--ds-line</DsToken>
                </div>
                <div
                  className="ds-border-sample bg-[var(--ds-ink)] text-white"
                  style={{ border: "1px solid var(--ds-surface)" }}
                >
                  1px — contorno en hero (blanco)
                </div>
                <div className="ds-border-sample ds-border-bold">
                  2px — <DsToken>--ds-line-strong</DsToken>
                </div>
              </div>
            </DsPanel>
          </DsSection>

          <DsSection
            id="movimiento"
            eyebrow="Interacción"
            title="Movimiento"
            intro="Duraciones y curva de easing para transiciones CSS. Las animaciones concretas están en la sección siguiente."
            rules={dsSectionGuidelines.movimiento}
          >
            <DsPanel>
              <ul>
                {dsMotion.map((m) => (
                  <li key={m.token} className="ds-motion-row">
                    <p className="font-semibold text-[var(--ds-ink)]">
                      {m.name}
                    </p>
                    <p className="font-mono text-[var(--ds-text-small)]">
                      {m.value}
                    </p>
                    <p className="text-[var(--ds-text-small)] text-[var(--ds-muted)]">
                      {m.use} · <DsToken>{m.token}</DsToken>
                    </p>
                  </li>
                ))}
                <li className="ds-motion-row">
                  <p className="font-semibold text-[var(--ds-ink)]">
                    {dsEasing.name}
                  </p>
                  <p className="font-mono text-[var(--ds-text-small)]">
                    {dsEasing.value}
                  </p>
                  <p className="text-[var(--ds-text-small)] text-[var(--ds-muted)]">
                    {dsEasing.use} · <DsToken>{dsEasing.token}</DsToken>
                  </p>
                </li>
              </ul>
            </DsPanel>
          </DsSection>

          <DsSection
            id="animaciones"
            eyebrow="Interacción"
            title="Animaciones"
            intro="Laboratorio en bucle: texto, imagen y UI. Pausa los demos si necesitas revisarlos con calma."
            rules={dsSectionGuidelines.animaciones}
          >
            <DsAnimationsShowcase />
          </DsSection>

          <DsSection
            id="formularios"
            eyebrow="Patrones"
            title="Formularios"
            intro="Campos de texto, selección, casillas y mensajes de error con foco visible."
            rules={dsSectionGuidelines.formularios}
          >
            <DsPanel>
              <DsFormShowcase />
            </DsPanel>
          </DsSection>

          <DsSection
            id="feedback"
            eyebrow="Patrones"
            title="Feedback"
            intro="Avisos, confirmaciones, errores, toast, carga y estado vacío con copy claro."
            rules={dsSectionGuidelines.feedback}
          >
            <DsFeedbackShowcase />
          </DsSection>

          <DsSection
            id="componentes"
            eyebrow="Patrones"
            title="Componentes"
            intro="Biblioteca propia en components/desing-system/ui, construida sobre Radix y shadcn."
            rules={dsSectionGuidelines.componentes}
          >
            <DsComponentLibrary />
          </DsSection>

          <DsSection
            id="inspiracion"
            eyebrow="Extensión"
            title="Modo sticker"
            intro="Capa opcional con bordes gruesos, pills y bandas de color — para campañas, onboarding o bloques didácticos."
            rules={dsSectionGuidelines.inspiracion}
          >
            <DsReferoShowcase />
          </DsSection>

          <footer
            className="ds-page-footer bg-[var(--ds-ink)] text-[var(--ds-yellow)]"
          >
            <div className="ds-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="font-[family-name:var(--ds-font-display)] text-sm font-bold uppercase tracking-widest">
                Obra · Documentos · Contacto
              </p>
              <p className="text-[var(--ds-text-small)] text-white/70">
                Referencia interna — tokens en{" "}
                <code className="text-white/90">desing-system.css</code>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
