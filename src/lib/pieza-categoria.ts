import type { Pieza } from "@/content/piezas";

export const piezaCategoriaIds = [
  "all",
  "pintura",
  "dibujo",
  "grabado",
  "mixta",
] as const;

export type PiezaCategoriaId = (typeof piezaCategoriaIds)[number];

export type PiezaCategoriaFilter = Exclude<PiezaCategoriaId, "all">;

export const piezaCategoriaLabels: Record<PiezaCategoriaId, string> = {
  all: "Todas",
  pintura: "Pintura",
  dibujo: "Dibujo",
  grabado: "Grabado",
  mixta: "Mixta",
};

export function piezaCategoria(pieza: Pieza): PiezaCategoriaFilter {
  const tecnica = pieza.tecnica.toLowerCase();
  if (tecnica.includes("óleo") || tecnica.includes("oleo")) return "pintura";
  if (tecnica.includes("tinta") || tecnica.includes("dibujo")) return "dibujo";
  if (tecnica.includes("litograf")) return "grabado";
  if (tecnica.includes("mixta")) return "mixta";
  return "pintura";
}

export function piezaShortLabel(titulo: string): string {
  const words = titulo.trim().split(/\s+/);
  if (words.length <= 2) return titulo;
  return words.slice(0, 2).join(" ");
}
