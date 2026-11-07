"use client";

import dynamic from "next/dynamic";

const CompleteShelfExperience = dynamic(
  () =>
    import("./complete-shelf-experience").then(
      (mod) => mod.CompleteShelfExperience,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex min-h-[28rem] w-full items-center justify-center border-y border-border bg-muted/30"
        aria-busy="true"
      >
        <p className="font-sans text-sm text-muted">Cargando estante 3D…</p>
      </div>
    ),
  },
);

export function CompleteShelfSection() {
  return (
    <section
      id="libros"
      className="scroll-mt-[var(--site-header-height)] w-full py-10 md:py-14"
      aria-label="Libros"
    >
      <CompleteShelfExperience />
    </section>
  );
}
