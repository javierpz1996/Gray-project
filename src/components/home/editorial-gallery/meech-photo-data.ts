import { piezas } from "@/content/piezas";

/** Categorías del submenú Photo (referencia meech213.com/photo). */
export const meechPhotoCategoryIds = [
  "all",
  "beauty",
  "brands",
  "artiste",
  "fashion",
  "magazines",
] as const;

export type MeechPhotoCategoryId = (typeof meechPhotoCategoryIds)[number];

export type MeechPhotoCategoryFilter = Exclude<MeechPhotoCategoryId, "all">;

export const meechPhotoCategoryLabels: Record<MeechPhotoCategoryId, string> = {
  all: "ALL",
  beauty: "Beauty",
  brands: "Brands",
  artiste: "Artiste",
  fashion: "Fashion",
  magazines: "Magazines",
};

export type MeechPhotoItem = {
  id: string;
  label: string;
  color: string;
  category: MeechPhotoCategoryFilter;
  href: string;
};

/** Tokens Gray como relleno de color (sin imágenes). */
const swatches = [
  "var(--ds-ink)",
  "var(--ds-coral)",
  "var(--ds-blue)",
  "var(--ds-sky)",
  "var(--ds-green)",
  "var(--ds-orange)",
  "var(--ds-red)",
  "var(--ds-yellow)",
  "color-mix(in srgb, var(--ds-ink) 72%, var(--ds-cream) 28%)",
  "color-mix(in srgb, var(--ds-coral) 55%, var(--ds-ink) 45%)",
  "color-mix(in srgb, var(--ds-blue) 48%, var(--ds-ink) 52%)",
  "color-mix(in srgb, var(--ds-green) 42%, var(--ds-ink) 58%)",
] as const;

const categoryCycle: MeechPhotoCategoryFilter[] = [
  "beauty",
  "brands",
  "artiste",
  "fashion",
  "magazines",
  "beauty",
  "brands",
  "artiste",
];

const editorialLabels = [
  "Elle Q",
  "Sophia S",
  "Ariarne L",
  "May K",
  "Josie R",
  "Noah T",
  "Vera M",
  "Iris P",
  "Luna F",
  "Cleo N",
  "Mira D",
  "Zoe H",
];

function shortTitle(titulo: string): string {
  const parts = titulo.replace(/[()]/g, "").trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0]!.slice(0, 1)}${parts[1]!.slice(0, 1)}`;
  return titulo.slice(0, 8);
}

/** Genera una tira larga (como la referencia) a partir de las piezas del sitio. */
export function buildMeechPhotoItems(): MeechPhotoItem[] {
  const items: MeechPhotoItem[] = [];
  let labelIndex = 0;

  for (let repeat = 0; repeat < 4; repeat += 1) {
    for (const [index, pieza] of piezas.entries()) {
      const swatch = swatches[(index + repeat) % swatches.length]!;
      const category = categoryCycle[(index + repeat) % categoryCycle.length]!;
      const label =
        editorialLabels[labelIndex % editorialLabels.length] ??
        shortTitle(pieza.titulo);
      labelIndex += 1;

      items.push({
        id: `${pieza.slug}-${repeat}`,
        label,
        color: swatch,
        category,
        href: `/portafolio/${pieza.slug}`,
      });
    }
  }

  return items;
}

export const meechPhotoItems = buildMeechPhotoItems();
