"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Globe,
  Notebook,
} from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import type { Libro } from "@/content/libros";
import { librosSection } from "@/content/libros";
import { cn } from "@/lib/utils";

type LibroDetailDialogProps = {
  libro: Libro | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LibroDetailDialog({
  libro,
  open,
  onOpenChange,
}: LibroDetailDialogProps) {
  const [indiceGaleria, setIndiceGaleria] = useState(0);
  const [panelEnDom, setPanelEnDom] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const libroCacheRef = useRef<Libro | null>(null);

  if (libro) {
    libroCacheRef.current = libro;
  }

  const libroActivo = libro ?? libroCacheRef.current;

  useLayoutEffect(() => {
    if (open) {
      setPanelEnDom(true);
    }
  }, [open]);

  useLayoutEffect(() => {
    if (!open) {
      document.body.removeAttribute("data-libro-detalle");
      document.documentElement.style.overflow = "";
      return;
    }

    document.body.dataset.libroDetalle = "open";
    document.documentElement.style.overflow = "hidden";
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setIndiceGaleria(0);
    requestAnimationFrame(() => {
      if (panelRef.current) {
        panelRef.current.scrollTop = 0;
      }
    });
  }, [open, libro?.slug]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const imagenActiva =
    libroActivo?.galeria[indiceGaleria] ?? libroActivo?.galeria[0];
  const totalGaleria = libroActivo?.galeria.length ?? 0;

  const irAnterior = useCallback(() => {
    setIndiceGaleria((i) => Math.max(0, i - 1));
  }, []);

  const irSiguiente = useCallback(() => {
    if (!libroActivo) return;
    setIndiceGaleria((i) => Math.min(libroActivo.galeria.length - 1, i + 1));
  }, [libroActivo]);

  const cerrar = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  if (!panelEnDom || !libroActivo || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal={open ? true : undefined}
      aria-hidden={!open}
      inert={open ? undefined : true}
      aria-labelledby="libro-detalle-titulo"
      aria-describedby="libro-detalle-descripcion"
      className={cn(
        "fixed inset-x-0 bottom-0 top-[var(--site-header-height)] z-[45] min-h-[calc(100dvh-var(--site-header-height))] overflow-y-auto overscroll-contain bg-canvas",
        !open && "invisible pointer-events-none",
      )}
    >
      <div className="relative w-full pb-12">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          <Image
            src={librosSection.detalleFondoSrc}
            alt={librosSection.detalleFondoAlt}
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="relative z-[1] mx-auto w-full max-w-site px-6 py-8 md:py-10">
          <button
            type="button"
            onClick={cerrar}
            className="inline-flex cursor-pointer items-center gap-2 font-sans text-small text-fg-muted transition-colors duration-150 ease-out hover:text-fg"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {librosSection.volverLabel}
          </button>

          <div
            className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16"
          >
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <div
                className="w-full [perspective:1400px] motion-reduce:[perspective:none]"
                aria-hidden={!imagenActiva}
              >
                <div
                  className={cn(
                    "relative mx-auto aspect-[3/4] w-full max-w-[18rem] overflow-hidden rounded-sm bg-surface shadow-book",
                    "motion-safe:[transform:rotateY(-16deg)_rotateX(3deg)] motion-reduce:transform-none",
                  )}
                >
                  {imagenActiva ? (
                    <Image
                      key={imagenActiva.src}
                      src={imagenActiva.src}
                      alt={imagenActiva.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 70vw, 18rem"
                      className="pointer-events-none object-cover"
                      loading="eager"
                    />
                  ) : null}
                </div>
              </div>

              <div className="mt-12 md:mt-16">
                <div className="flex max-w-full items-center gap-2 sm:gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-10 shrink-0 rounded-full border-border-strong bg-surface hover:bg-surface"
                    disabled={indiceGaleria <= 0}
                    onClick={irAnterior}
                    aria-label="Imagen anterior de la galería"
                  >
                    <ChevronLeft aria-hidden="true" />
                  </Button>

                  <ul
                    className="flex min-w-0 flex-1 gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    role="list"
                  >
                    {libroActivo.galeria.map((item, index) => (
                      <li key={`${item.src}-${index}`} className="shrink-0">
                        <button
                          type="button"
                          onClick={() => setIndiceGaleria(index)}
                          className={cn(
                            "relative block size-20 cursor-pointer overflow-hidden rounded-md bg-surface transition-opacity duration-150 ease-out sm:size-24",
                            index === indiceGaleria
                              ? "opacity-100 ring-2 ring-border-strong"
                              : "opacity-55 hover:opacity-85",
                          )}
                          aria-label={item.alt}
                          aria-current={
                            index === indiceGaleria ? "true" : undefined
                          }
                        >
                          <Image
                            src={item.src}
                            alt=""
                            fill
                            unoptimized
                            sizes="6rem"
                            className="pointer-events-none object-cover"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-10 shrink-0 rounded-full border-border-strong bg-surface hover:bg-surface"
                    disabled={indiceGaleria >= totalGaleria - 1}
                    onClick={irSiguiente}
                    aria-label="Imagen siguiente de la galería"
                  >
                    <ChevronRight aria-hidden="true" />
                  </Button>
                </div>

                <div
                  className="mt-4 flex justify-center gap-2"
                  role="tablist"
                  aria-label="Galería del libro"
                >
                  {libroActivo.galeria.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      role="tab"
                      aria-selected={index === indiceGaleria}
                      aria-label={`Imagen ${index + 1} de ${totalGaleria}`}
                      onClick={() => setIndiceGaleria(index)}
                      className={cn(
                        "size-2 cursor-pointer rounded-full transition-colors duration-150 ease-out",
                        index === indiceGaleria ? "bg-fg" : "bg-border-strong",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="eyebrow uppercase">{libroActivo.eyebrow}</p>
              <h2
                id="libro-detalle-titulo"
                className="mt-3 font-display text-h1 font-bold leading-heading tracking-title text-fg"
              >
                {libroActivo.titulo}
              </h2>
              <p className="mt-2 font-sans text-body font-medium text-fg">
                {libroActivo.autor}
              </p>
              {libroActivo.apuntes?.length ? (
                <ul
                  id="libro-detalle-descripcion"
                  className="mt-6 max-w-prose list-disc space-y-2 pl-5 text-body leading-relaxed text-fg-muted marker:text-fg-muted"
                >
                  {libroActivo.apuntes.map((apunte) => (
                    <li key={apunte}>{apunte}</li>
                  ))}
                </ul>
              ) : (
                <p
                  id="libro-detalle-descripcion"
                  className="mt-6 max-w-prose text-body leading-relaxed text-fg-muted"
                >
                  {libroActivo.descripcion}
                </p>
              )}

              {libroActivo.contenido?.length ? (
                <div className="mt-8 max-w-prose">
                  <h3 className="eyebrow text-fg">Contenido</h3>
                  <ul
                    className="mt-4 list-disc space-y-1.5 pl-5 text-body leading-relaxed text-fg-muted marker:text-fg-muted"
                  >
                    {libroActivo.contenido.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {libroActivo.consultaIndice ? (
                libroActivo.consultaIndiceHref ? (
                  <p className="mt-8 max-w-prose">
                    <a
                      href={libroActivo.consultaIndiceHref}
                      className="eyebrow font-bold text-fg underline-offset-4 transition-colors duration-150 ease-out hover:text-primary hover:underline"
                    >
                      {libroActivo.consultaIndice}
                    </a>
                  </p>
                ) : (
                  <p className="eyebrow mt-8 max-w-prose font-bold text-fg">
                    {libroActivo.consultaIndice}
                  </p>
                )
              ) : null}

              {libroActivo.precio ? (
                <p className="mt-6 max-w-prose font-sans text-body font-semibold text-fg">
                  Precio por unidad:{" "}
                  <span className="font-medium text-fg-muted">
                    {libroActivo.precio.ars} · {libroActivo.precio.usd}
                  </span>
                </p>
              ) : null}

              <ul
                className="mt-8 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:flex-wrap sm:gap-x-10"
              >
                <li className="flex items-center gap-3 text-small text-fg-muted">
                  <BookOpen className="size-5 shrink-0 text-fg" aria-hidden="true" />
                  <span>{libroActivo.paginas} páginas</span>
                </li>
                <li className="flex items-center gap-3 text-small text-fg-muted">
                  <Notebook className="size-5 shrink-0 text-fg" aria-hidden="true" />
                  <span>{libroActivo.formato}</span>
                </li>
                <li className="flex items-center gap-3 text-small text-fg-muted">
                  <Globe className="size-5 shrink-0 text-fg" aria-hidden="true" />
                  <span>Idioma: {libroActivo.idioma}</span>
                </li>
              </ul>

              <Button
                asChild
                variant="outline"
                className="mt-10 h-12 rounded-full border-border-strong bg-surface px-8 font-sans text-small font-semibold hover:bg-surface"
              >
                <a href={libroActivo.comprarHref}>
                  {librosSection.comprarLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
