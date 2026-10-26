import { piezas } from "@/content/piezas";
import { Grid12 } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { PiezaCard } from "@/components/obra/pieza-card";

/**
 * Grilla del portafolio — retícula de 12 columnas (DESIGN.md §4):
 *   1 col en mobile · 2 en md · 3 en lg (col-span 12 / 6 / 4).
 */
export function PortafolioGrid() {
  return (
    <Grid12>
      {piezas.map((pieza) => (
        <Reveal
          key={pieza.slug}
          className="col-span-12 md:col-span-6 lg:col-span-4"
        >
          <PiezaCard pieza={pieza} />
        </Reveal>
      ))}
    </Grid12>
  );
}
