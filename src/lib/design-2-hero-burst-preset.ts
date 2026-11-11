export const design2HeroBurstPresets = [
  {
    id: "full",
    label: "Full",
    hint: "Las 7 capas · escala por defecto",
  },
  {
    id: "lite",
    label: "Lite",
    hint: "Solo burst 2, 5 y 6",
  },
  {
    id: "corner",
    label: "Esquinas",
    hint: "Burst 1, 4, 6 y 7",
  },
  {
    id: "soft",
    label: "Suave",
    hint: "Todas las capas · más chicas",
  },
  {
    id: "dense",
    label: "Dense",
    hint: "Todas las capas · aún más chicas",
  },
] as const;

export type Design2HeroBurstPresetId =
  (typeof design2HeroBurstPresets)[number]["id"];

const presetIdSet = new Set<string>(
  design2HeroBurstPresets.map((entry) => entry.id),
);

export function parseDesign2HeroBurstPreset(
  value: string | string[] | undefined,
): Design2HeroBurstPresetId {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !presetIdSet.has(raw)) return "full";
  return raw as Design2HeroBurstPresetId;
}
