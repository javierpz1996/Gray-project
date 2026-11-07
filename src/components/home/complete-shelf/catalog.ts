import { libros, type Libro } from "@/content/libros";
import { productDetailHref } from "@/lib/product-detail-path";

export type BookMotif =
  | "lattice"
  | "corrosion"
  | "efficiency"
  | "network"
  | "boom"
  | "organization"
  | "schematic"
  | "flight"
  | "circuit"
  | "orbit"
  | "branches"
  | "wave"
  | "runner"
  | "gather"
  | "maze"
  | "fracture"
  | "continuum"
  | "windows"
  | "steps";

export type CatalogBook = {
  id: string;
  title: string;
  shortTitle: string;
  author: string;
  description: string;
  quote: string;
  quoteBy: string;
  format: string;
  availability: string;
  url: string;
  cover: string;
  accent: string;
  ink: string;
  motif: BookMotif;
  height: number;
  thickness: number;
  coverImage?: string;
  linkLabel?: string;
  living?: boolean;
};

/** Colores base para lomos procedurales (valores alineados a gray-tokens). */
const spinePalette: readonly {
  cover: string;
  accent: string;
  ink: string;
}[] = [
  { cover: "#5799c6", accent: "#f7e335", ink: "#f5f2eb" },
  { cover: "#bb0702", accent: "#ff7800", ink: "#f5f2eb" },
  { cover: "#3ecf8e", accent: "#8ecae6", ink: "#1d1d1f" },
  { cover: "#ff5a4e", accent: "#5799c6", ink: "#f5f2eb" },
  { cover: "#1d1d1f", accent: "#ff5a4e", ink: "#f5f2eb" },
];

const motifs: BookMotif[] = [
  "schematic",
  "wave",
  "branches",
  "orbit",
  "lattice",
];

function shortTitle(titulo: string): string {
  return titulo.length > 42 ? `${titulo.slice(0, 39)}…` : titulo;
}

function quoteFromLibro(libro: Libro): { quote: string; quoteBy: string } {
  const apunte = libro.apuntes?.[0];
  if (apunte) {
    return { quote: apunte.replace(/^Apunte\.\s*/i, ""), quoteBy: libro.autor };
  }
  return { quote: libro.descripcion, quoteBy: libro.autor };
}

function libroToCatalogBook(libro: Libro, index: number): CatalogBook {
  const palette = spinePalette[index % spinePalette.length]!;
  const { quote, quoteBy } = quoteFromLibro(libro);
  const availability = libro.precio
    ? `${libro.precio.ars} · ${libro.precio.usd}`
    : "Consulta por correo";

  return {
    id: libro.slug,
    title: libro.titulo,
    shortTitle: shortTitle(libro.titulo),
    author: libro.autor,
    description: libro.descripcion,
    quote,
    quoteBy,
    format: `${libro.formato} · ${libro.paginas} páginas · ${libro.idioma}`,
    availability,
    url: productDetailHref(libro.slug),
    cover: palette.cover,
    accent: palette.accent,
    ink: palette.ink,
    motif: motifs[index % motifs.length]!,
    height: libro.kind === "completo" ? 2.22 : 2.02 + (index % 3) * 0.04,
    thickness: libro.kind === "completo" ? 0.28 : 0.2 + (index % 2) * 0.03,
    coverImage: libro.imagen,
    linkLabel: "Ver ficha del libro",
  };
}

export const completeShelfCatalog: CatalogBook[] = libros.map(libroToCatalogBook);
