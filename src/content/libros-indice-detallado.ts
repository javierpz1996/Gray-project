export type LibroCapituloIndice = {
  readonly numero: string;
  readonly titulo: string;
  readonly temas: readonly string[];
};

export type LibroIndiceDetallado = {
  readonly tituloSeccion: string;
  readonly subtitulo: string;
  readonly headline: string;
  readonly capitulos: readonly LibroCapituloIndice[];
};

/** Índice del PDF Nº4 — Rostro, proporciones y estructura. */
export const indiceRostroProporciones: LibroIndiceDetallado = {
  tituloSeccion: "Contenido",
  subtitulo: "10 capítulos",
  headline: "Proporciones y estructura del rostro humano",
  capitulos: [
    {
      numero: "01",
      titulo: "Fundamentos del rostro",
      temas: [
        "Introducción a la estructura facial",
        "Proporciones generales",
        "Ejes y líneas de referencia",
        "Formas geométricas básicas",
      ],
    },
    {
      numero: "02",
      titulo: "Construcción de la cabeza",
      temas: [
        "Volumen y estructura craneal",
        "División de planos",
        "Estructura frontal y lateral",
        "Construcción tridimensional",
      ],
    },
    {
      numero: "03",
      titulo: "Proporciones faciales",
      temas: [
        "Relación entre frente, nariz y mentón",
        "Distancia entre los ojos",
        "Ubicación de orejas y boca",
        "Variaciones de proporciones",
      ],
    },
    {
      numero: "04",
      titulo: "Planos del rostro",
      temas: [
        "Planos principales de la cabeza",
        "Frente y pómulos",
        "Mandíbula y mentón",
        "Luces y sombras estructurales",
      ],
    },
    {
      numero: "05",
      titulo: "Estudio de los ojos",
      temas: [
        "Estructura del ojo",
        "Párpados y cejas",
        "Perspectiva y profundidad",
        "Expresividad",
      ],
    },
    {
      numero: "06",
      titulo: "Nariz y boca",
      temas: [
        "Construcción de la nariz",
        "Planos y volúmenes nasales",
        "Estructura de los labios",
        "Relación entre nariz y boca",
      ],
    },
    {
      numero: "07",
      titulo: "Orejas y mandíbula",
      temas: [
        "Anatomía simplificada de la oreja",
        "Estructura mandibular",
        "Relación con el cráneo",
        "Variaciones anatómicas",
      ],
    },
    {
      numero: "08",
      titulo: "Perspectiva del rostro",
      temas: [
        "Vista frontal",
        "Vista de perfil",
        "Vista de tres cuartos",
        "Inclinaciones y rotaciones",
      ],
    },
    {
      numero: "09",
      titulo: "Estilización y aplicación",
      temas: [
        "Simplificación de formas",
        "Variación de estructuras",
        "Diseño de personajes",
        "Errores frecuentes",
      ],
    },
    {
      numero: "10",
      titulo: "Ejercicios prácticos",
      temas: [
        "Construcción paso a paso",
        "Estudios de proporciones",
        "Práctica de diferentes ángulos",
        "Ejercicios de observación",
      ],
    },
  ],
};
