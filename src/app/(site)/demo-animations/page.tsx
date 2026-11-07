import Link from "next/link";
import { LibrosOpenTransitionDemo } from "@/components/home/libros-open-transition-demo";

export const metadata = {
  title: "Demo animaciones — Libros",
  description:
    "Comparación de transiciones al abrir un libro (maquetación interna).",
  robots: { index: false, follow: false },
};

export default function DemoAnimationsPage() {
  return (
    <div className="section-paper scroll-mt-[var(--site-header-height)] py-12 md:py-20">
      <div className="mx-auto w-full max-w-site px-6">
        <p className="eyebrow">Maquetación</p>
        <h1 className="mt-3 font-display text-h1 font-bold leading-heading tracking-title text-fg">
          Animaciones al abrir un libro
        </h1>
        <p className="mt-4 max-w-prose text-body text-fg-muted">
          Pantalla dedicada para probar las seis opciones a mayor tamaño. Tocá
          una portada (por ejemplo Tema I) y usá «Repetir» en cada bloque.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-small font-semibold text-fg underline-offset-4 hover:underline"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-10 md:mt-14">
          <LibrosOpenTransitionDemo size="large" />
        </div>
      </div>
    </div>
  );
}
