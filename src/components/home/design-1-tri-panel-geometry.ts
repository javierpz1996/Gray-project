/** KV principal (`public/Imagenes/Varias/banner-expansive.png`). */
export const DESIGN1_BANNER_WIDTH = 2089;
export const DESIGN1_BANNER_HEIGHT = 753;
export const DESIGN1_HERO_ASPECT = DESIGN1_BANNER_WIDTH / DESIGN1_BANNER_HEIGHT;

/** Grosor de marco y separadores (px en coords del banner). */
export const DESIGN1_HERO_BORDER_PX = 10;

/**
 * Separadores en coords normalizadas 0–1 del banner.
 * L1: cerca del top-left → centro inferior.
 * L2: centro superior → inferior derecho.
 */
export const design1HeroDividers = {
  first: { x1: 0.15, y1: 0, x2: 0.28, y2: 1 },
  second: { x1: 0.5, y1: 0, x2: 0.8, y2: 1 },
} as const;

export function design1HeroDividerLinePx(
  line: (typeof design1HeroDividers)[keyof typeof design1HeroDividers],
) {
  return {
    x1: line.x1 * DESIGN1_BANNER_WIDTH,
    y1: line.y1 * DESIGN1_BANNER_HEIGHT,
    x2: line.x2 * DESIGN1_BANNER_WIDTH,
    y2: line.y2 * DESIGN1_BANNER_HEIGHT,
  };
}

/** Fotos de `public/Imagenes/heroexample`, una por casilla. */
export const design1HeroPanelPhotos = {
  left: "/Imagenes/heroexample/ejemplo1HD.png",
  center: "/Imagenes/heroexample/ejemplo2HD.png",
  right: "/Imagenes/heroexample/ejemplo3HD.png",
} as const;

/** Caja envolvente (px del banner) de cada casilla, a partir de sus polígonos. */
export function design1HeroPanelBoundsPx() {
  const polygons = design1HeroPanelPolygonsPx();
  const bounds = {} as Record<keyof typeof polygons, { x: number; y: number; width: number; height: number }>;
  for (const key of Object.keys(polygons) as (keyof typeof polygons)[]) {
    const pairs = polygons[key].trim().split(/\s+/).map((pair) => pair.split(",").map(Number));
    const xs = pairs.map(([x]) => x ?? 0);
    const ys = pairs.map(([, y]) => y ?? 0);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    bounds[key] = { x: minX, y: minY, width: Math.max(...xs) - minX, height: Math.max(...ys) - minY };
  }
  return bounds;
}

/** Polígonos de las tres casillas (coords px del banner). */
export function design1HeroPanelPolygonsPx() {
  const first = design1HeroDividerLinePx(design1HeroDividers.first);
  const second = design1HeroDividerLinePx(design1HeroDividers.second);
  const W = DESIGN1_BANNER_WIDTH;
  const H = DESIGN1_BANNER_HEIGHT;

  return {
    left: `0,0 ${first.x1},${first.y1} ${first.x2},${first.y2} 0,${H}`,
    center: `${first.x1},${first.y1} ${second.x1},${second.y1} ${second.x2},${second.y2} ${first.x2},${first.y2}`,
    right: `${second.x1},${second.y1} ${W},0 ${W},${H} ${second.x2},${second.y2}`,
  } as const;
}
