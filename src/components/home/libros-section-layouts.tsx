"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { LibrosCatalogCard, LibrosTemaThumb } from "@/components/home/libros-catalog-card";
import { LibrosTemasCallout } from "@/components/home/libros-temas-callout";
import type { Libro } from "@/content/libros";
import { cn } from "@/lib/utils";

export type LibrosLayoutBodyProps = {
  completo: Libro;
  temas: readonly Libro[];
  onOpen: (libro: Libro) => void;
  onPreload: (libro: Libro) => void;
};

function temaBadge(libro: Libro): string {
  if (libro.temaNumero) {
    return `Tema ${["I", "II", "III", "IV"][libro.temaNumero - 1] ?? libro.temaNumero}`;
  }
  return libro.eyebrow;
}

type LibrosCompletoPanelProps = Pick<
  LibrosLayoutBodyProps,
  "completo" | "onOpen" | "onPreload"
>;

/** Columna izquierda ~50 %: portada grande del libro completo. */
function LibrosCompletoMitad({
  completo,
  onOpen,
  onPreload,
  poster = false,
  soloPortada = false,
}: LibrosCompletoPanelProps & {
  poster?: boolean;
  soloPortada?: boolean;
}) {
  return (
    <article
      className={cn(
        !soloPortada && "scroll-mt-[var(--site-header-height)]",
      )}
      id={soloPortada ? undefined : `libro-${completo.slug}`}
    >
      <button
        type="button"
        onClick={() => onOpen(completo)}
        onPointerEnter={() => onPreload(completo)}
        onFocus={() => onPreload(completo)}
        className="group flex w-full cursor-pointer flex-col text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-sm bg-surface shadow-book",
            poster
              ? "aspect-[3/4] min-h-[18rem] lg:min-h-[28rem]"
              : soloPortada
                ? "libros-split__completo-portada aspect-[3/4]"
                : "mx-auto aspect-[3/4] max-w-[20rem] lg:mx-0 lg:max-w-none",
          )}
        >
          <Image
            src={completo.imagen}
            alt={completo.alt}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute left-3 top-3 rounded-full border border-border bg-surface/95 px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-widest text-fg">
            Edición completa
          </span>
        </div>
        {soloPortada ? null : (
          <div className="mt-6 flex flex-col gap-2">
            <p className="eyebrow">{completo.eyebrow}</p>
            <h3 className="font-display text-h2 font-bold leading-heading tracking-title text-fg">
              {completo.titulo}
            </h3>
            <p className="max-w-prose text-small text-fg-muted">{completo.descripcion}</p>
            {completo.precio ? (
              <p className="text-small font-semibold text-fg">
                {completo.precio.ars} · {completo.precio.usd}
              </p>
            ) : null}
            <span className="mt-1 text-small font-semibold text-primary group-hover:underline">
              Ver detalle →
            </span>
          </div>
        )}
      </button>
    </article>
  );
}

/** Mitad izquierda / mitad derecha en desktop; apilado en móvil. */
function LibrosSplitShell({
  completo,
  onOpen,
  onPreload,
  poster = false,
  sticky = false,
  children,
}: LibrosCompletoPanelProps & {
  poster?: boolean;
  sticky?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "libros-split mt-6 grid gap-10 lg:mt-8 lg:grid-cols-2 lg:items-stretch lg:gap-12",
        poster && "libros-split--poster",
      )}
    >
      <div
        className={cn(
          sticky && "lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)]",
          "lg:self-start",
        )}
      >
        <LibrosCompletoMitad
          completo={completo}
          onOpen={onOpen}
          onPreload={onPreload}
          poster={poster}
          soloPortada
        />
      </div>
      <div className="min-w-0 lg:flex lg:h-full lg:min-h-0 lg:flex-col">{children}</div>
    </div>
  );
}

/** 1 — Completo centrado y cuatro temas en grilla. */
export function LibrosLayoutClasico({
  temas,
  onOpen,
  onPreload,
}: LibrosLayoutBodyProps) {
  return (
    <div className="mt-12 space-y-14 lg:mt-14">
      <div>
        <p className="mb-8 text-center text-micro font-semibold uppercase tracking-widest text-fg-muted">
          Por tema
        </p>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {temas.map((libro, index) => (
            <li
              key={libro.slug}
              id={`libro-${libro.slug}`}
              className="scroll-mt-[var(--site-header-height)]"
            >
              <LibrosCatalogCard
                libro={libro}
                index={index}
                badge={temaBadge(libro)}
                onOpen={onOpen}
                onPreload={onPreload}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** 2 — Completo grande a la izquierda, temas en cuadrícula a la derecha. */
export function LibrosLayoutDestacado({
  completo,
  temas,
  onOpen,
  onPreload,
}: LibrosLayoutBodyProps) {
  return (
    <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
      <div className="scroll-mt-[var(--site-header-height)] lg:col-span-5">
        <LibrosCompletoMitad
          completo={completo}
          onOpen={onOpen}
          onPreload={onPreload}
          soloPortada
        />
      </div>
      <ul className="grid w-fit max-w-full grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-5 lg:col-span-7 lg:gap-y-4">
        {temas.map((libro) => (
          <li
            key={libro.slug}
            id={`libro-${libro.slug}`}
            className="scroll-mt-[var(--site-header-height)] flex justify-center"
          >
            <LibrosTemaThumb
              libro={libro}
              badge={temaBadge(libro)}
              onOpen={onOpen}
              onPreload={onPreload}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 3 — Scroll horizontal: completo ancho + temas en fila. */
export function LibrosLayoutEstante({
  completo,
  temas,
  onOpen,
  onPreload,
}: LibrosLayoutBodyProps) {
  const items = [completo, ...temas];

  return (
    <div className="libros-shelf mt-12 lg:mt-14">
      <ul className="libros-shelf__track flex list-none gap-6 overflow-x-auto pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:thin] snap-x snap-mandatory sm:gap-8">
        {items.map((libro, index) => (
          <li
            key={libro.slug}
            id={`libro-${libro.slug}`}
            className={cn(
              "shrink-0 snap-start scroll-mt-[var(--site-header-height)]",
              libro.kind === "completo" ? "w-[min(85vw,22rem)]" : "w-[min(72vw,15rem)]",
            )}
          >
            <LibrosCatalogCard
              libro={libro}
              index={index}
              inclinar={false}
              size={libro.kind === "completo" ? "lg" : "md"}
              badge={libro.kind === "completo" ? "Completo" : temaBadge(libro)}
              onOpen={onOpen}
              onPreload={onPreload}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 4 — Banda horizontal del completo + fila de temas debajo. */
export function LibrosLayoutEditorial({
  completo,
  temas,
  onOpen,
  onPreload,
}: LibrosLayoutBodyProps) {
  return (
    <div className="mt-12 space-y-12 lg:mt-14">
      <article
        id={`libro-${completo.slug}`}
        className="scroll-mt-[var(--site-header-height)] overflow-hidden rounded-lg border border-border bg-surface shadow-card"
      >
        <button
          type="button"
          onClick={() => onOpen(completo)}
          onPointerEnter={() => onPreload(completo)}
          onFocus={() => onPreload(completo)}
          className="group grid w-full cursor-pointer text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:grid-cols-[minmax(0,14rem)_1fr]"
        >
          <div className="relative aspect-[3/4] max-h-[20rem] w-full md:max-h-none md:min-h-[16rem]">
            <Image
              src={completo.imagen}
              alt={completo.alt}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 14rem"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
            <p className="eyebrow">{completo.eyebrow}</p>
            <h3 className="font-display text-h2 font-bold leading-heading tracking-title text-fg">
              {completo.titulo}
            </h3>
            <p className="max-w-prose text-body text-fg-muted">
              {completo.descripcion}
            </p>
            {completo.precio ? (
              <p className="text-small font-semibold text-fg">
                {completo.precio.ars} · {completo.precio.usd}
              </p>
            ) : null}
            <span className="mt-2 text-small font-semibold text-primary group-hover:underline">
              Ver detalle y comprar →
            </span>
          </div>
        </button>
      </article>
      <div>
        <p className="mb-6 text-micro font-semibold uppercase tracking-widest text-fg-muted">
          Temas por separado
        </p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {temas.map((libro, index) => (
            <li
              key={libro.slug}
              id={`libro-${libro.slug}`}
              className="scroll-mt-[var(--site-header-height)]"
            >
              <LibrosCatalogCard
                libro={libro}
                index={index}
                size="sm"
                badge={temaBadge(libro)}
                onOpen={onOpen}
                onPreload={onPreload}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LibrosTemasMatchGrid({
  temas,
  onOpen,
  onPreload,
}: {
  temas: readonly Libro[];
  onOpen: (libro: Libro) => void;
  onPreload: (libro: Libro) => void;
}) {
  return (
    <div className="libros-split__temas relative w-full min-w-0 lg:h-full lg:min-h-0">
      <div className="pointer-events-none absolute bottom-full left-0 right-0 z-[1] mb-8 hidden -translate-y-3 lg:block">
        <LibrosTemasCallout />
      </div>
      <ul className="libros-temas-match-grid grid h-full w-full grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-5 lg:grid-rows-2 lg:gap-x-5 lg:gap-y-2">
        {temas.map((libro) => (
          <li
            key={libro.slug}
            id={`libro-${libro.slug}`}
            className="scroll-mt-[var(--site-header-height)] flex min-w-0 justify-center lg:min-h-0 lg:justify-stretch"
          >
            <LibrosTemaThumb
              libro={libro}
              badge={temaBadge(libro)}
              onOpen={onOpen}
              onPreload={onPreload}
              fillCell
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 5 — 50 % completo a la izquierda; temas 2×2 a la derecha. */
export function LibrosLayoutMitad({
  completo,
  temas,
  onOpen,
  onPreload,
}: LibrosLayoutBodyProps) {
  return (
    <LibrosSplitShell completo={completo} onOpen={onOpen} onPreload={onPreload}>
      <LibrosTemasMatchGrid
        temas={temas}
        onOpen={onOpen}
        onPreload={onPreload}
      />
    </LibrosSplitShell>
  );
}

/** 6 — 50 % completo; temas en lista horizontal. */
export function LibrosLayoutMitadLista({
  completo,
  temas,
  onOpen,
  onPreload,
}: LibrosLayoutBodyProps) {
  return (
    <LibrosSplitShell completo={completo} onOpen={onOpen} onPreload={onPreload}>
      <p className="mb-5 text-micro font-semibold uppercase tracking-widest text-fg-muted">
        Temas sueltos
      </p>
      <ul className="flex flex-col gap-4">
        {temas.map((libro) => (
          <li
            key={libro.slug}
            id={`libro-${libro.slug}`}
            className="scroll-mt-[var(--site-header-height)]"
          >
            <button
              type="button"
              onClick={() => onOpen(libro)}
              onPointerEnter={() => onPreload(libro)}
              onFocus={() => onPreload(libro)}
              className="group flex w-full cursor-pointer items-center gap-4 rounded-lg border border-border bg-surface p-3 text-left shadow-card transition-colors duration-150 ease-out hover:border-border-strong outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <div className="relative aspect-[3/4] w-[4.5rem] shrink-0 overflow-hidden rounded-sm bg-surface-muted">
                <Image
                  src={libro.imagen}
                  alt=""
                  fill
                  unoptimized
                  sizes="72px"
                  className="object-cover"
                  aria-hidden
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-micro font-semibold uppercase tracking-widest text-fg-muted">
                  {temaBadge(libro)}
                </p>
                <p className="mt-1 font-sans text-small font-bold leading-snug text-fg group-hover:text-primary">
                  {libro.titulo}
                </p>
                {libro.precio ? (
                  <p className="mt-1 text-micro text-fg-subtle">{libro.precio.ars}</p>
                ) : null}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </LibrosSplitShell>
  );
}

/** 7 — Completo sticky en 50 %; temas en una columna. */
export function LibrosLayoutMitadSticky({
  completo,
  temas,
  onOpen,
  onPreload,
}: LibrosLayoutBodyProps) {
  return (
    <LibrosSplitShell
      completo={completo}
      onOpen={onOpen}
      onPreload={onPreload}
      sticky
    >
      <ul className="flex flex-col gap-10">
        {temas.map((libro, index) => (
          <li
            key={libro.slug}
            id={`libro-${libro.slug}`}
            className="scroll-mt-[var(--site-header-height)]"
          >
            <LibrosCatalogCard
              libro={libro}
              index={index}
              inclinar={false}
              badge={temaBadge(libro)}
              onOpen={onOpen}
              onPreload={onPreload}
            />
          </li>
        ))}
      </ul>
    </LibrosSplitShell>
  );
}

/** 8 — Portada a sangre en mitad izquierda; miniaturas 2×2 a la derecha. */
export function LibrosLayoutMitadPoster({
  completo,
  temas,
  onOpen,
  onPreload,
}: LibrosLayoutBodyProps) {
  return (
    <LibrosSplitShell
      completo={completo}
      onOpen={onOpen}
      onPreload={onPreload}
      poster
    >
      <LibrosTemasMatchGrid
        temas={temas}
        onOpen={onOpen}
        onPreload={onPreload}
      />
    </LibrosSplitShell>
  );
}
