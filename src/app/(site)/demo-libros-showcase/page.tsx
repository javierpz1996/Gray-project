import { LibrosShowcaseDemoShell } from "@/components/home/libros-showcase/libros-showcase-demo-shell";

export const metadata = {
  title: "Demo — Variaciones carrusel Libros",
  description:
    "Presets de animación Motion sobre el mismo carrusel de portadas.",
  robots: { index: false, follow: false },
};

export default function DemoLibrosShowcasePage() {
  return (
    <div className="bg-canvas">
      <LibrosShowcaseDemoShell />
    </div>
  );
}
