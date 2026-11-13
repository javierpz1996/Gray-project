/** Variantes del halftone de esquina (panel GRAYBY), solo diseño 2. */

export const COVER2_SLANT_HALFTONE_IDS = [1, 2, 3, 4, 5] as const;

export type Cover2SlantHalftoneId = (typeof COVER2_SLANT_HALFTONE_IDS)[number];

export const COVER2_SLANT_HALFTONE_STORAGE_KEY = "cover2-slant-halftone";

export const COVER2_SLANT_HALFTONE_SHORT: Record<Cover2SlantHalftoneId, string> = {
  1: "Tu referencia",
  2: "Horizontal",
  3: "Lunares · como referencia",
  4: "Diagonal",
  5: "Trama fina",
};

export const COVER2_SLANT_HALFTONE_LABELS: Record<Cover2SlantHalftoneId, string> = {
  1: "Recorte de tu foto de referencia",
  2: "Generado: gradiente horizontal",
  3: "Lunares grandes en cuadrícula (referencia diseño 2)",
  4: "Generado: diagonal (como la curva de la foto)",
  5: "Generado: trama fina y más blanco",
};

export const COVER2_SLANT_HALFTONE_ASSETS: Record<Cover2SlantHalftoneId, string> = {
  1: "/media/diseno2/halftone-opt1-referencia.png",
  2: "/media/diseno2/halftone-opt2-horizontal.png",
  3: "/media/diseno2/halftone-opt3-radial.png",
  4: "/media/diseno2/halftone-opt4-diagonal.png",
  5: "/media/diseno2/halftone-opt5-fino.png",
};

export function parseCover2SlantHalftone(
  value?: string | string[] | undefined,
): Cover2SlantHalftoneId {
  const raw = Array.isArray(value) ? value[0] : value;
  const n = Number(raw);
  if (n >= 1 && n <= 5) {
    return n as Cover2SlantHalftoneId;
  }
  return 3;
}
