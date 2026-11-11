export const heroPanelSlots = ["left", "center", "right"] as const;

export type HeroPanelSlot = (typeof heroPanelSlots)[number];

export const heroPanelLabels: Record<HeroPanelSlot, string> = {
  left: "Izquierda",
  center: "Centro",
  right: "Derecha",
};

/** URL pública de cada foto del hero. El archivo real lo sirve la ruta de API. */
export const heroPanelPhotos: Record<HeroPanelSlot, string> = {
  left: "/api/hero-panel/left",
  center: "/api/hero-panel/center",
  right: "/api/hero-panel/right",
};

const fallbackFiles: Record<HeroPanelSlot, string> = {
  left: "panel-izquierda.png",
  center: "panel-centro.png",
  right: "panel-derecha.png",
};

export function isHeroPanelSlot(value: string): value is HeroPanelSlot {
  return (heroPanelSlots as readonly string[]).includes(value);
}

export function heroPanelFallbackFile(slot: HeroPanelSlot): string {
  return fallbackFiles[slot];
}
