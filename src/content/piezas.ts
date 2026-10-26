/**
 * Modelo de dominio — Pieza.
 *
 * Ver GLOSSARY.md:
 *   - Pieza  = trabajo individual del artista
 *   - Obra   = el conjunto total de piezas
 *   - Portafolio = la sección que las presenta
 *
 * Fuente de datos estática y tipada. Sin CMS, sin auth, sin base de datos
 * (ver docs/adr/0002-contenido-estatico-sin-cms.md).
 * Migrar a MDX o CMS más adelante no toca la UI: sólo este módulo.
 */

export type Pieza = {
  /** Título de la pieza. */
  titulo: string;
  /** Año de creación. */
  anio: number;
  /** Técnica empleada (óleo, tinta, litografía…). */
  tecnica: string;
  /** Dimensiones en formato legible, ej. "100 × 80 cm". */
  dimensiones: string;
  /** Identificador para la URL: /portafolio/[slug] */
  slug: string;
  /** Ruta de la imagen en /public. */
  imagen: string;
  /** Texto alternativo obligatorio (accessibilidad, DESIGN.md §9). */
  alt: string;
  /** Descripción opcional para la ficha. */
  descripcion?: string;
  /** Marca la pieza del hero (pantalla completa). */
  destacada: boolean;
};

/** Datos de ejemplo — sustituir por la obra real. */
export const piezas: Pieza[] = [
  {
    titulo: "Sin título (I)",
    anio: 2025,
    tecnica: "Óleo sobre lienzo",
    dimensiones: "120 × 90 cm",
    slug: "sin-titulo-i",
    imagen: "/obra/obra-01.svg",
    alt: "Composición abstracta en tonos neutros, Sin título (I), 2025",
    descripcion:
      "Primera pieza del ciclo. Trabajo sobre la superposición de capas y la luz rasante.",
    destacada: true,
  },
  {
    titulo: "Sin título (II)",
    anio: 2025,
    tecnica: "Óleo sobre lienzo",
    dimensiones: "120 × 90 cm",
    slug: "sin-titulo-ii",
    imagen: "/obra/obra-02.svg",
    alt: "Composición abstracta en tonos neutros, Sin título (II), 2025",
    descripcion: "Segunda pieza del ciclo, en diálogo directo con la anterior.",
    destacada: false,
  },
  {
    titulo: "Umbral",
    anio: 2024,
    tecnica: "Tinta sobre papel",
    dimensiones: "42 × 30 cm",
    slug: "umbral",
    imagen: "/obra/obra-03.svg",
    alt: "Dibujo a tinta sobre papel, Umbral, 2024",
    destacada: false,
  },
  {
    titulo: "Campo",
    anio: 2024,
    tecnica: "Litografía",
    dimensiones: "50 × 65 cm",
    slug: "campo",
    imagen: "/obra/obra-04.svg",
    alt: "Litografía sobre papel, Campo, 2024",
    descripcion: "Edición de 30 ejemplares, firmada y numerada.",
    destacada: false,
  },
  {
    titulo: "Deriva",
    anio: 2023,
    tecnica: "Técnica mixta sobre papel",
    dimensiones: "70 × 50 cm",
    slug: "deriva",
    imagen: "/obra/obra-05.svg",
    alt: "Técnica mixta sobre papel, Deriva, 2023",
    destacada: false,
  },
  {
    titulo: "Respiración",
    anio: 2023,
    tecnica: "Óleo sobre lienzo",
    dimensiones: "150 × 120 cm",
    slug: "respiracion",
    imagen: "/obra/obra-06.svg",
    alt: "Óleo sobre lienzo, Respiración, 2023",
    destacada: false,
  },
];

/** Pieza marcada como destacada para el hero. Fallback a la primera. */
export function piezaDestacada(): Pieza {
  return piezas.find((p) => p.destacada) ?? piezas[0]!;
}

/** Busca una pieza por slug. Devuelve undefined si no existe (la página llama a notFound()). */
export function piezaPorSlug(slug: string): Pieza | undefined {
  return piezas.find((p) => p.slug === slug);
}
