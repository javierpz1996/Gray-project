/**
 * Sección Libros — portadas en `public/Imagenes/Libros/`.
 */

import { site } from "@/config/site";

export type LibroGaleriaImagen = {
  readonly src: string;
  readonly alt: string;
};

export type LibroPrecio = {
  readonly ars: string;
  readonly usd: string;
};

export type Libro = {
  readonly slug: string;
  readonly titulo: string;
  readonly autor: string;
  readonly imagen: string;
  readonly alt: string;
  readonly eyebrow: string;
  /** Resumen en grilla o fallback si no hay `apuntes`. */
  readonly descripcion: string;
  readonly paginas: number;
  readonly formato: string;
  readonly idioma: string;
  readonly apuntes?: readonly string[];
  readonly contenido?: readonly string[];
  readonly consultaIndice?: string;
  readonly consultaIndiceHref?: string;
  readonly precio?: LibroPrecio;
  readonly galeria: readonly LibroGaleriaImagen[];
  readonly comprarHref: string;
};

export const librosSection = {
  eyebrow: "01. Clásico y limpio",
  title: "Libros",
  intro:
    "Material de estudio y referencia para mejorar en el dibujo, la anatomía y la construcción de personajes.",
  verTodosHref: "/documentos",
  verTodosLabel: "Ver todos",
  volverLabel: "Volver a libros",
  comprarLabel: "Comprar libro",
  detalleFondoSrc: "/Imagenes/Varias/detalleLibroFondo.png",
  detalleFondoAlt: "",
} as const;

function comprarMailto(titulo: string): string {
  const subject = encodeURIComponent(`Consulta: ${titulo}`);
  return `mailto:${site.email}?subject=${subject}`;
}

const PRECIO_APUNTE: LibroPrecio = {
  ars: "$6.500 ARS",
  usd: "$17,55 USD",
};

const CONSULTA_INDICE =
  "Consultá por el índice de contenido completo." as const;

function apuntesPdf(paginas: number): readonly [string, string] {
  return [
    `Apunte. Formato PDF A4. ${paginas} páginas full color.`,
    "Técnicas y explicaciones con ilustraciones paso a paso.",
  ];
}

function fichaApuntePdf(
  numero: number,
  titulo: string,
  paginas: number,
  contenido: readonly string[],
  precio: LibroPrecio = PRECIO_APUNTE,
): Pick<
  Libro,
  | "eyebrow"
  | "paginas"
  | "formato"
  | "apuntes"
  | "contenido"
  | "consultaIndice"
  | "consultaIndiceHref"
  | "precio"
  | "comprarHref"
> {
  const etiqueta = `PDF Nº${numero} — ${titulo}`;
  return {
    eyebrow: `PDF Nº${numero}`,
    paginas,
    formato: "PDF A4 · full color",
    apuntes: apuntesPdf(paginas),
    contenido,
    consultaIndice: CONSULTA_INDICE,
    consultaIndiceHref: comprarMailto(`PDF Nº${numero} — Índice de contenido: ${titulo}`),
    precio,
    comprarHref: comprarMailto(etiqueta),
  };
}

/** Galería provisional: sustituir `src` por interiores en `public/Imagenes/Libros/`. */
function galeriaDesdePortada(
  imagen: string,
  altPortada: string,
): readonly LibroGaleriaImagen[] {
  return [
    { src: imagen, alt: altPortada },
    { src: imagen, alt: `${altPortada} — muestra interior 1` },
    { src: imagen, alt: `${altPortada} — muestra interior 2` },
    { src: imagen, alt: `${altPortada} — muestra interior 3` },
  ];
}

export const libros: readonly Libro[] = [
  {
    slug: "formas-espacio-3d",
    titulo: "Las formas en el espacio 3D",
    autor: "Grayby art",
    imagen: "/Imagenes/Libros/portada 1.jpg",
    alt: "Portada — PDF Nº1 Las formas en el espacio 3D",
    descripcion:
      "Apunte en PDF A4 con volúmenes, perspectiva y luz aplicada al dibujo de personajes y escenarios.",
    idioma: "Español",
    ...fichaApuntePdf(1, "Las formas en el espacio 3D", 16, [
      "Volúmenes básicos en el espacio",
      "Perspectiva y ejes de construcción",
      "Esfera, cubo y cilindro",
      "Luz sobre formas simples",
      "Del boceto geométrico a la ilustración",
    ]),
    galeria: galeriaDesdePortada(
      "/Imagenes/Libros/portada 1.jpg",
      "Portada — Las formas en el espacio 3D",
    ),
  },
  {
    slug: "anatomia-constructiva",
    titulo: "Anatomía constructiva",
    autor: "Grayby art",
    imagen: "/Imagenes/Libros/portada 3.jpg",
    alt: "Portada — PDF Nº2 Anatomía constructiva",
    descripcion:
      "Apunte en PDF A4 para construir el cuerpo con bloques, ejes y proporciones antes del detalle anatómico.",
    idioma: "Español",
    ...fichaApuntePdf(2, "Anatomía constructiva", 16, [
      "Maniquí y bloques principales",
      "Ejes, balance y contrapposto",
      "Tórax y caja pélvica",
      "Extremidades simplificadas",
      "Figura en movimiento",
    ]),
    galeria: galeriaDesdePortada(
      "/Imagenes/Libros/portada 3.jpg",
      "Portada — Anatomía constructiva",
    ),
  },
  {
    slug: "rostro-proporciones",
    titulo: "Rostro, Proporciones, Estructura",
    autor: "Grayby art",
    imagen: "/Imagenes/Libros/portada 4.jpg",
    alt: "Portada — PDF Nº4 Rostro, proporciones y estructura",
    descripcion:
      "Apunte en PDF A4, 16 páginas full color, con técnicas e ilustraciones paso a paso.",
    idioma: "Español",
    ...fichaApuntePdf(4, "Rostro, Proporciones, Estructura", 16, [
      "Proporciones",
      "3/4, perfil, frente",
      "Construcción frente, perfil, 3/4",
      "Los planos del rostro",
      "Volumetría, esquemas constructivos",
    ]),
    galeria: galeriaDesdePortada(
      "/Imagenes/Libros/portada 4.jpg",
      "Portada — Rostro, proporciones y estructura",
    ),
  },
  {
    slug: "fundamentos-dibujo",
    titulo: "Fundamentos del dibujo",
    autor: "Grayby art",
    imagen: "/Imagenes/Libros/portada libro completo.jpg",
    alt: "Portada — Edición completa Fundamentos del dibujo",
    descripcion:
      "Compilación en PDF A4 con forma, anatomía, rostro y ejercicios guiados en un solo material.",
    idioma: "Español",
    eyebrow: "Edición completa",
    paginas: 64,
    formato: "PDF A4 · full color",
    apuntes: apuntesPdf(64),
    contenido: [
      "Forma y volumen en el espacio",
      "Anatomía constructiva",
      "Rostro: proporciones y estructura",
      "Ejercicios guiados por tema",
      "Ruta de estudio sugerida",
    ],
    consultaIndice: CONSULTA_INDICE,
    consultaIndiceHref: comprarMailto(
      "Edición completa — Índice de contenido: Fundamentos del dibujo",
    ),
    precio: PRECIO_APUNTE,
    comprarHref: comprarMailto("Edición completa — Fundamentos del dibujo"),
    galeria: galeriaDesdePortada(
      "/Imagenes/Libros/portada libro completo.jpg",
      "Portada — Fundamentos del dibujo",
    ),
  },
];

/** @deprecated Usar `libros`. */
export const librosPortadas = libros;

export type LibroPortada = Libro;

export function getLibroBySlug(slug: string): Libro | undefined {
  return libros.find((libro) => libro.slug === slug);
}
