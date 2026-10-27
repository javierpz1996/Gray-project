/**
 * Contenido del portal diseño 2 (layout tipo anime oficial).
 * Textos en español; estructura inspirada en demonslayer-anime.com.
 */

/** Portadas del carrusel vertical del hero (izquierda). */
export const design2PortalHeroGallery = [
  {
    src: "/Imagenes/Libros/LibroCompleto.jpg",
    alt: "Edición completa — Fundamentos del dibujo",
  },
  {
    src: "/Imagenes/Libros/LibroTema1.jpg",
    alt: "Tema I — Las formas en el espacio 3D",
  },
  {
    src: "/Imagenes/Libros/LibroTema2.jpg",
    alt: "Tema II — Anatomía constructiva",
  },
  {
    src: "/Imagenes/Libros/LibroTema3.jpg",
    alt: "Tema III — Apunte de dibujo",
  },
  {
    src: "/Imagenes/Libros/LibroTema4.jpg",
    alt: "Tema IV — Rostro, proporciones y estructura",
  },
] as const;

/** Bloque vertical bajo las miniaturas del hero (referencia portal). */
export const design2PortalHeroSns = {
  label: "Redes oficiales",
} as const;

export const design2PortalHero = {
  trailerEyebrow: "- PROGRAMA DE CLASES -",
  trailerTitle: "GRAYBY",
  trailerSubtitle: "BOOTCAMP",
  newsTitle: "Noticias",
  newsIndexLabel: "Índice",
} as const;

/**
 * Carrusel de vídeos del hero (flechas).
 * Sustituir `src` por video2.mp4 / video3.mp4 en public/Imagenes/Videos/ cuando existan.
 */
export const design2PortalHeroVideos = [
  {
    src: "/Imagenes/Videos/video1.mp4",
    caption: "Video oficial",
  },
  {
    src: "/Imagenes/Videos/video1.mp4",
    caption: "Modelado de formas",
  },
  {
    src: "/Imagenes/Videos/video1.mp4",
    caption: "Bocetos dinámicos",
  },
] as const;

/** Párrafo bajo el wordmark del hero (portal). `strong` marca énfasis editorial. */
export const design2PortalHeroIntro = [
  { strong: true, underline: true, text: "Fundamentos del dibujo" },
  {
    text:
      " es un libro ideal tanto para principiantes como para quienes buscan perfeccionar su técnica. A través del ",
  },
  { strong: true, text: "modelado de formas" },
  { text: ", vas a aprender a comprender mejor la " },
  { strong: true, text: "anatomía" },
  { text: ", crear " },
  { strong: true, text: "poses más naturales" },
  { text: " y conseguir " },
  { strong: true, text: "bocetos más fluidos y dinámicos" },
  { text: "." },
] as const;

export const design2PortalNav = [
  { href: "#inicio", label: "Inicio" },
  { href: "#series", label: "La serie" },
  { href: "#noticias", label: "Noticias" },
  { href: "#videos", label: "Trailer" },
  { href: "#libros", label: "Libros" },
  { href: "/portafolio/sin-titulo-i", label: "Obra" },
] as const;

/** Índice del libro bajo el botón «Índice» en el hero portal. */
export const design2PortalNews = [
  {
    pageRange: "10–29",
    heading: "Formas en el espacio 3D",
    description: "perspectiva, volúmenes y puntos de fuga.",
  },
  {
    pageRange: "32–74",
    heading: "Anatomía y proporciones del cuerpo",
    description: "proporciones, torso, movimiento y musculatura.",
  },
  {
    pageRange: "77–96",
    heading: "Construcción del rostro",
    description: "proporciones, planos del rostro y rasgos.",
  },
] as const;

export const design2PortalSeries = [
  {
    year: "2024",
    items: ["Fundamentos del dibujo — edición completa"],
  },
  {
    year: "2023",
    items: ["Rostro, proporciones y estructura"],
  },
  {
    year: "2022",
    items: ["Anatomía constructiva", "Las formas en el espacio 3D"],
  },
] as const;
