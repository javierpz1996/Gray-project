/**
 * Modelo de dominio — Documento.
 *
 * Ver GLOSSARY.md: un Documento es un PDF que el artista publica en el sitio
 * (catálogo, dossier, CV, texto crítico).
 *
 * Los PDFs viven en /public/documentos/ y se sirven tal cual.
 * Vista previa (modal) + descarga directa: ambas acciones, siempre.
 */

export type Documento = {
  /** Título del documento. */
  titulo: string;
  /** Tipo de documento, para la etiqueta visual. */
  tipo: "Catálogo" | "Dossier" | "CV" | "Texto";
  /** Año de publicación. */
  anio: number;
  /** Número de páginas, para la metadata del listado. */
  paginas: number;
  /** Ruta del PDF en /public/documentos/. */
  archivo: string;
  /** Portada del documento (imagen en /public). */
  portada: string;
  /** Texto alternativo de la portada. */
  alt: string;
  /** Descripción breve. */
  resumen: string;
};

/** Datos de ejemplo — sustituir por los PDFs reales del artista. */
export const documentos: Documento[] = [
  {
    titulo: "Catálogo razonado 2023–2025",
    tipo: "Catálogo",
    anio: 2025,
    paginas: 48,
    archivo: "/documentos/catalogo-2023-2025.pdf",
    portada: "/documentos/portada-catalogo.svg",
    alt: "Portada del catálogo razonado 2023–2025",
    resumen: "Selección de obra con fichas técnicas, dimensiones y procedencia.",
  },
  {
    titulo: "Dossier de prensa",
    tipo: "Dossier",
    anio: 2025,
    paginas: 12,
    archivo: "/documentos/dossier-prensa.pdf",
    portada: "/documentos/portada-dossier.svg",
    alt: "Portada del dossier de prensa",
    resumen: "Biografía, texto crítico y selección de imágenes en alta resolución.",
  },
  {
    titulo: "Currículum vitæ",
    tipo: "CV",
    anio: 2026,
    paginas: 4,
    archivo: "/documentos/cv.pdf",
    portada: "/documentos/portada-cv.svg",
    alt: "Portada del currículum vitæ",
    resumen: "Exposiciones, premios, colecciones y formación.",
  },
];

/** Busca un documento por archivo (identificador único natural). */
export function documentoPorArchivo(archivo: string): Documento | undefined {
  return documentos.find((d) => d.archivo === archivo);
}
