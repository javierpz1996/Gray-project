import type { ScatterAnim } from "@/lib/design-2-hero-scatter-particles-build";

export const design2HeroScatterPresets = [
  {
    id: "mix",
    label: "Mezcla",
    hint: "Los 6 tipos repartidos (como ahora)",
  },
  {
    id: "whip",
    label: "Whip",
    hint: "Latigazo horizontal a steps",
  },
  {
    id: "zigzag",
    label: "Zigzag",
    hint: "Vaivén lateral frenético",
  },
  {
    id: "jitter",
    label: "Jitter",
    hint: "Saltos en X e Y",
  },
  {
    id: "flicker",
    label: "Flicker",
    hint: "Parpadeo y reaparece en otro lugar",
  },
  {
    id: "strobe",
    label: "Strobe",
    hint: "Escala y brillo a golpes",
  },
  {
    id: "spin-tick",
    label: "Spin tick",
    hint: "Giro a saltos",
  },
] as const satisfies ReadonlyArray<{
  id: ScatterAnim | "mix";
  label: string;
  hint: string;
}>;

export type Design2HeroScatterPresetId =
  (typeof design2HeroScatterPresets)[number]["id"];

const presetIds = new Set<string>(
  design2HeroScatterPresets.map((entry) => entry.id),
);

export function parseDesign2HeroScatterPreset(
  value: string | string[] | undefined,
): Design2HeroScatterPresetId {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === undefined || raw === "") return "flicker";
  return presetIds.has(raw) ? (raw as Design2HeroScatterPresetId) : "flicker";
}
