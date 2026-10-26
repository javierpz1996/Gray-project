"use client";

import Image from "next/image";
import type { Documento } from "@/content/documentos";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Documento — DESIGN.md §6.
 * Portada aspect-[3/4] con borde hairline; debajo, metadata y dos acciones:
 *   Ver        → visor modal (<iframe>) con "Descargar" dentro
 *   Descargar  → descarga directa desde la tarjeta
 * Siempre ambas (decisión Q14, Ronda 2).
 */
export function DocumentoCard({ documento }: { documento: Documento }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-border bg-surface shadow-card">
        <Image
          src={documento.portada}
          alt={documento.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <p className="eyebrow mt-5">
        {documento.tipo} · {documento.anio} · {documento.paginas} pág.
      </p>

      <h3 className="mt-2 font-display text-h3 font-semibold leading-heading tracking-title text-fg">
        {documento.titulo}
      </h3>

      <p className="mt-2 text-small text-fg-muted">{documento.resumen}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Ver</Button>
          </DialogTrigger>

          <DialogContent
            showCloseButton={false}
            className="gap-0 overflow-hidden border border-border bg-surface p-0 sm:max-w-viewer"
          >
            <DialogTitle className="sr-only">
              {documento.titulo}
            </DialogTitle>

            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
              <div className="min-w-0">
                <p className="truncate font-display text-h3 font-semibold leading-heading tracking-title text-fg">
                  {documento.titulo}
                </p>
                <p className="mt-1 text-small text-fg-muted">
                  {documento.tipo} · {documento.anio} · {documento.paginas}{" "}
                  páginas
                </p>
              </div>

              <DialogClose asChild>
                <Button variant="ghost" className="shrink-0">
                  Cerrar
                </Button>
              </DialogClose>
            </div>

            <iframe
              src={documento.archivo}
              title={`Vista previa de ${documento.titulo}`}
              className="h-[65vh] w-full bg-surface"
            />

            <div className="flex justify-end border-t border-border px-6 py-4">
              <Button asChild>
                <a href={documento.archivo} download>
                  Descargar PDF
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" asChild>
          <a href={documento.archivo} download>
            Descargar
          </a>
        </Button>
      </div>
    </article>
  );
}
