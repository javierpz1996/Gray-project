export const DESIGN2_HERO_PROMO_LAYOUT_IDS = [
  "inclinado",
  "derecho",
  "panel",
] as const;

export type Design2HeroPromoLayoutId =
  (typeof DESIGN2_HERO_PROMO_LAYOUT_IDS)[number];

export const design2HeroPromoLayouts: ReadonlyArray<{
  id: Design2HeroPromoLayoutId;
  label: string;
  hint: string;
}> = [
  {
    id: "inclinado",
    label: "Inclinado",
    hint: "Carteles izquierdos con inclinación tipo póster",
  },
  {
    id: "derecho",
    label: "Derecho",
    hint: "Carteles alineados sin inclinación",
  },
  {
    id: "panel",
    label: "Panel izquierdo",
    hint: "Franjas a todo el ancho del panel izquierdo del hero",
  },
] as const;

const layoutIdSet = new Set<string>(DESIGN2_HERO_PROMO_LAYOUT_IDS);

export function parseDesign2HeroPromoLayout(
  value: string | string[] | undefined,
): Design2HeroPromoLayoutId {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === undefined || raw === "") return "inclinado";
  return layoutIdSet.has(raw) ? (raw as Design2HeroPromoLayoutId) : "inclinado";
}
