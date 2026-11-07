"use client";

import { useCallback, useState } from "react";
import { LibrosShowcaseSection } from "@/components/home/libros-showcase/libros-showcase-section";
import {
  librosShowcaseBoldAnimationOptions,
  librosShowcaseDeckAnimationOptions,
  librosShowcaseExpressAnimationOptions,
  type LibrosShowcaseAnimationId,
} from "@/components/home/libros-showcase/libros-showcase-animations";

export function LibrosShowcaseDemoShell() {
  const [animationId, setAnimationId] =
    useState<LibrosShowcaseAnimationId>("cover-flow");

  const onAnimationIdChange = useCallback((id: LibrosShowcaseAnimationId) => {
    setAnimationId(id);
  }, []);

  return (
    <>
      <header className="libros-showcase-demo__intro border-b border-border bg-surface px-[var(--section-x)] py-6">
        <p className="text-micro font-semibold uppercase tracking-widest text-fg-muted">
          Demo
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-title md:text-3xl">
          Variaciones del carrusel Libros
        </h1>
        <p className="mt-2 max-w-2xl text-small text-fg-muted">
          {librosShowcaseBoldAnimationOptions.length} atrevidos ·{" "}
          {librosShowcaseExpressAnimationOptions.length} expresivos ·{" "}
          {librosShowcaseDeckAnimationOptions.length} suaves. Probá las filas
          «Atrevidos» y «Expresivos» debajo del título Libros.
        </p>
      </header>

      <LibrosShowcaseSection
        animationId={animationId}
        onAnimationIdChange={onAnimationIdChange}
        showVariantPicker
        compact
      />
    </>
  );
}
