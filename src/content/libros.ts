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
  readonly kind: "completo" | "tema";
  readonly temaNumero?: number;
  readonly apuntes?: readonly string[];
  readonly contenido?: readonly string[];
  readonly consultaIndice?: string;
  readonly consultaIndiceHref?: string;
  readonly precio?: LibroPrecio;
  readonly galeria: readonly LibroGaleriaImagen[];
  readonly comprarHref: string;
};

export const librosSection = {
  eyebrow: "01. Material de estudio",
  title: "Libros",
  intro:
    "Fundamentos del dibujo: comprá la edición completa en un solo PDF o elegí cada tema por separado.",
  temasCalloutLines: [
    "También podés",
    "comprar cada tema",
    "por separado",
  ] as const,
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

const PRECIO_COMPLETO: LibroPrecio = {
  ars: "$24.000 ARS",
  usd: "$65 USD",
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
  | "kind"
  | "temaNumero"
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
    kind: "tema" as const,
    temaNumero: numero,
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

export const libroEdicionCompleta: Libro = {
  slug: "fundamentos-dibujo",
  titulo: "Fundamentos del dibujo",
  autor: "Grayby art",
  imagen: "/Imagenes/Libros/LibroCompleto.jpg",
  alt: "Portada — Edición completa Fundamentos del dibujo",
  descripcion:
    "Compilación en PDF A4 con forma, anatomía, rostro y ejercicios guiados en un solo material.",
  idioma: "Español",
  kind: "completo",
  eyebrow: "Edición completa",
  paginas: 64,
  formato: "PDF A4 · full color",
  apuntes: apuntesPdf(64),
  contenido: [
    "Forma y volumen en el espacio",
    "Anatomía constructiva",
    "Apunte de dibujo",
    "Rostro: proporciones y estructura",
    "Ruta de estudio sugerida",
  ],
  consultaIndice: CONSULTA_INDICE,
  consultaIndiceHref: comprarMailto(
    "Edición completa — Índice de contenido: Fundamentos del dibujo",
  ),
  precio: PRECIO_COMPLETO,
  comprarHref: comprarMailto("Edición completa — Fundamentos del dibujo"),
  galeria: galeriaDesdePortada(
    "/Imagenes/Libros/LibroCompleto.jpg",
    "Portada — Fundamentos del dibujo",
  ),
};

export const librosTemas: readonly Libro[] = [
  {
    slug: "formas-espacio-3d",
    titulo: "Las formas en el espacio 3D",
    autor: "Grayby art",
    imagen: "/Imagenes/Libros/LibroTema1.jpg",
    alt: "Portada — Tema I Las formas en el espacio 3D",
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
      "/Imagenes/Libros/LibroTema1.jpg",
      "Portada — Las formas en el espacio 3D",
    ),
  },
  {
    slug: "anatomia-constructiva",
    titulo: "Anatomía constructiva",
    autor: "Grayby art",
    imagen: "/Imagenes/Libros/LibroTema2.jpg",
    alt: "Portada — Tema II Anatomía constructiva",
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
      "/Imagenes/Libros/LibroTema2.jpg",
      "Portada — Anatomía constructiva",
    ),
  },
  {
    slug: "apunte-dibujo",
    titulo: "Apunte de dibujo",
    autor: "Grayby art",
    imagen: "/Imagenes/Libros/LibroTema3.jpg",
    alt: "Portada — Tema III Apunte de dibujo",
    descripcion:
      "Apunte en PDF A4 con ejercicios de observación, línea y ritmo para afianzar el trazo.",
    idioma: "Español",
    ...fichaApuntePdf(3, "Apunte de dibujo", 16, [
      "Línea y peso del trazo",
      "Observación y simplificación",
      "Boceto rápido y repaso",
      "Referencia y memoria visual",
      "Ejercicios diarios sugeridos",
    ]),
    galeria: galeriaDesdePortada(
      "/Imagenes/Libros/LibroTema3.jpg",
      "Portada — Apunte de dibujo",
    ),
  },
  {
    slug: "rostro-proporciones",
    titulo: "Rostro, Proporciones, Estructura",
    autor: "Grayby art",
    imagen: "/Imagenes/Libros/LibroTema4.jpg",
    alt: "Portada — Tema IV Rostro, proporciones y estructura",
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
      "/Imagenes/Libros/LibroTema4.jpg",
      "Portada — Rostro, proporciones y estructura",
    ),
  },
];

export const libros: readonly Libro[] = [libroEdicionCompleta, ...librosTemas];

/** @deprecated Usar `libros`. */
export const librosPortadas = libros;

export type LibroPortada = Libro;

export function getLibroBySlug(slug: string): Libro | undefined {
  return libros.find((libro) => libro.slug === slug);
}
