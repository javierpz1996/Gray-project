import { Reveal } from "@/components/reveal";

/**
 * Bio — retícula 12 columnas: texto en 7, espacio en 5.
 * El texto va en `max-w-prose` (65ch) para respetar la medida de lectura
 * de DESIGN.md §3.
 */
export function Bio() {
  return (
    <Reveal className="col-span-12 md:col-span-7">
      <div className="max-w-prose space-y-6 text-body leading-body text-fg-muted">
        <p className="text-lead text-fg">
          NOMBRE DEL ARTISTA vive y trabaja en CIUDAD. Su obra indaga la
          relación entre materia, luz y duración a través de la pintura y la
          obra gráfica.
        </p>

        <p>
          Formado en ESCUELA, su trabajo se ha desarrollado en torno a ciclos de
          piezas que se leen como conjuntos: cada obra es un tiempo y el
          conjunto es la memoria de ese tiempo. Ha expuesto individualmente y
          colectivamente, y su obra forma parte de colecciones públicas y
          privadas.
        </p>

        <p>
          Trabaja por series largas y edita con rigor: pocas piezas, muchas
          revisiones. El catálogo razonado y el dossier de prensa recogen la
          producción reciente y pueden descargarse desde esta misma página.
        </p>
      </div>
    </Reveal>
  );
}
