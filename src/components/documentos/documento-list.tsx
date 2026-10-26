import { documentos } from "@/content/documentos";
import { Grid12 } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { DocumentoCard } from "@/components/documentos/documento-card";

/** Listado de documentos — 1 / 2 / 3 columnas según breakpoint. */
export function DocumentoList() {
  return (
    <Grid12>
      {documentos.map((documento) => (
        <Reveal
          key={documento.archivo}
          className="col-span-12 md:col-span-6 lg:col-span-4"
        >
          <DocumentoCard documento={documento} />
        </Reveal>
      ))}
    </Grid12>
  );
}
