export const HOME_DESIGN_IDS = [1, 2, 3, 10] as const;

export type HomeDesignId = (typeof HOME_DESIGN_IDS)[number];

/** Altura del navbar sticky (5rem). */
export const HOME_CHROME_HEIGHT = "5rem";

/** Ancho de la barra lateral en diseño 3 (home). */
export const HOME_DESIGN_3_SIDEBAR_WIDTH = "17.5rem";

const homeDesignIdSet = new Set<number>(HOME_DESIGN_IDS);

export function parseHomeDesign(
  value: string | string[] | undefined,
): HomeDesignId {
  const raw = Array.isArray(value) ? value[0] : value;
  const n = Number.parseInt(raw ?? "1", 10);
  if (homeDesignIdSet.has(n)) {
    return n as HomeDesignId;
  }
  return 1;
}

export function homeDesignHref(id: HomeDesignId): string {
  return `/?diseno=${id}`;
}

export function homeDesignAnchor(
  id: HomeDesignId,
  hash: string,
): string {
  const fragment = hash.startsWith("#") ? hash : `#${hash}`;
  return `/?diseno=${id}${fragment}`;
}
