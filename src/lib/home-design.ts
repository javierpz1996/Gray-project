export const HOME_DESIGN_IDS = [1, 2, 3, 10] as const;

export type HomeDesignId = (typeof HOME_DESIGN_IDS)[number];

/** Altura del navbar sticky (5rem). */
export const HOME_CHROME_HEIGHT = "5rem";

/** Ancho de la barra lateral en diseño 3 (home). */
export const HOME_DESIGN_3_SIDEBAR_WIDTH = "17.5rem";

/** La home es el diseño 2. El query `diseno` ya no cambia de versión. */
export function parseHomeDesign(
  _value?: string | string[] | undefined,
): HomeDesignId {
  return 2;
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
