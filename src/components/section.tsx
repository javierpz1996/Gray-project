import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/**
 * Patrón de sección — DESIGN.md §6.
 *
 * Todas las secciones de la landing son idénticas salvo contenido:
 * eyebrow → título (serif) → entradilla opcional → retícula de 12 columnas.
 * Ritmo vertical fijo: 96px desktop / 64px mobile (DESIGN.md §4).
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-site px-6">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4 font-display text-h2 font-bold leading-heading tracking-title text-fg">
            {title}
          </h2>
          {intro ? (
            <p className="mt-6 max-w-prose text-lead text-fg-muted">{intro}</p>
          ) : null}
        </Reveal>

        <Grid12>{children}</Grid12>
      </div>
    </section>
  );
}

/**
 * Retícula de 12 columnas — DESIGN.md §4.
 * gap 24px. Los hijos declaran su span con `col-span-*` (o `md:col-span-*`).
 */
export function Grid12({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-12 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
