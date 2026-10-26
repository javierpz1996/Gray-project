import type { Metadata } from "next";
import { site } from "@/config/site";
import { DocumentoList } from "@/components/documentos/documento-list";

/** Ruta propia de documentos (ADR 0003): indexable y compartible. */
export const metadata: Metadata = {
  title: "Documentos",
  description:
    "Catálogo, dossier de prensa y currículum en PDF. Vista previa y descarga directa.",
  alternates: { canonical: "/documentos" },
};

export default function Page() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-site px-6">
        <p className="eyebrow">Documentos</p>

        <h1 className="mt-4 font-display text-h1 font-bold leading-heading tracking-title text-fg">
          Publicaciones y descargas
        </h1>

        <p className="mt-6 max-w-prose text-lead text-fg-muted">
          Catálogo, dossier de prensa y currículum de {site.name}. Cada
          documento se puede ver en el navegador o descargar en PDF.
        </p>

        <div className="mt-12">
          <DocumentoList />
        </div>
      </div>
    </div>
  );
}
