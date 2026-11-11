/** Copia del hero de diseño 1. Los cambios de forma van acá. */
export const DESIGN2_BANNER_WIDTH = 2089;
export const DESIGN2_BANNER_HEIGHT = 753;

/** Grosor de marco y separadores (px en coords del banner). */
export const DESIGN2_HERO_BORDER_PX = 10;

/**
 * Separadores en coords normalizadas 0–1 del banner.
 * L1: cerca del top-left → centro inferior.
 * L2: centro superior → inferior derecho.
 */
export const design2HeroDividers = {
  first: { x1: 0.15, y1: 0, x2: 0.28, y2: 1 },
  second: { x1: 0.5, y1: 0, x2: 0.8, y2: 1 },
} as const;

export function design2HeroDividerLinePx(
  line: (typeof design2HeroDividers)[keyof typeof design2HeroDividers],
) {
  return {
    x1: line.x1 * DESIGN2_BANNER_WIDTH,
    y1: line.y1 * DESIGN2_BANNER_HEIGHT,
    x2: line.x2 * DESIGN2_BANNER_WIDTH,
    y2: line.y2 * DESIGN2_BANNER_HEIGHT,
  };
}

/** Una foto por casilla. El panel admin puede reemplazar el archivo. */
export { heroPanelPhotos as design2HeroPanelPhotos } from "@/content/hero-panels";

/** Caja envolvente (px del banner) de cada casilla, a partir de sus polígonos. */
export function design2HeroPanelBoundsPx() {
  const polygons = design2HeroPanelPolygonsPx();
  const bounds = {} as Record<
    keyof typeof polygons,
    { x: number; y: number; width: number; height: number }
  >;
  for (const key of Object.keys(polygons) as (keyof typeof polygons)[]) {
    const pairs = polygons[key]
      .trim()
      .split(/\s+/)
      .map((pair) => pair.split(",").map(Number));
    const xs = pairs.map(([x]) => x ?? 0);
    const ys = pairs.map(([, y]) => y ?? 0);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    bounds[key] = {
      x: minX,
      y: minY,
      width: Math.max(...xs) - minX,
      height: Math.max(...ys) - minY,
    };
  }
  return bounds;
}

/** Polígonos de las tres casillas (coords px del banner). */
export function design2HeroPanelPolygonsPx() {
  const first = design2HeroDividerLinePx(design2HeroDividers.first);
  const second = design2HeroDividerLinePx(design2HeroDividers.second);
  const W = DESIGN2_BANNER_WIDTH;
  const H = DESIGN2_BANNER_HEIGHT;

  return {
    left: `0,0 ${first.x1},${first.y1} ${first.x2},${first.y2} 0,${H}`,
    center: `${first.x1},${first.y1} ${second.x1},${second.y1} ${second.x2},${second.y2} ${first.x2},${first.y2}`,
    right: `${second.x1},${second.y1} ${W},0 ${W},${H} ${second.x2},${second.y2}`,
  } as const;
}
