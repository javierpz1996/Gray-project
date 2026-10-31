/**
 * Geometría del hero diseño 10, medida sobre la referencia SATO (1024×682).
 * Coordenadas en % del escenario completo (viewport del hero).
 */
type Point = readonly [x: number, y: number];

const splitTop: Point = [59.6, 0];
const splitBottom: Point = [32.6, 100];
const cutRedGreenLeft: Point = [49.3, 38];
const cutRedGreenRight: Point = [100, 13.2];
const cutGreenBlueLeft: Point = [43.9, 58.3];
const cutGreenBlueRight: Point = [100, 85.7];

export type Design10HeroPanelSlot = "top" | "center" | "bottom";

function polygon(points: readonly Point[]) {
  return `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(", ")})`;
}

export const design10HeroPanelClipPaths: Record<Design10HeroPanelSlot, string> = {
  top: polygon([splitTop, [100, 0], cutRedGreenRight, cutRedGreenLeft]),
  center: polygon([
    cutRedGreenLeft,
    cutRedGreenRight,
    cutGreenBlueRight,
    cutGreenBlueLeft,
  ]),
  bottom: polygon([cutGreenBlueLeft, cutGreenBlueRight, [100, 100], splitBottom]),
};

export const design10HeroDividers = [
  { from: cutRedGreenLeft, to: cutRedGreenRight },
  { from: cutGreenBlueLeft, to: cutGreenBlueRight },
] as const;

/** Fotos de `public/Imagenes/heroexample`, una por panel, con el encuadre de cada recorte. */
export const design10HeroPanels: readonly {
  slot: Design10HeroPanelSlot;
  imageSrc: string;
  imagePosition: string;
}[] = [
  { slot: "top", imageSrc: "/Imagenes/heroexample/ejemplo1HD.png", imagePosition: "50% 30%" },
  { slot: "center", imageSrc: "/Imagenes/heroexample/ejemplo2HD.png", imagePosition: "50% 40%" },
  { slot: "bottom", imageSrc: "/Imagenes/heroexample/ejemplo3HD.png", imagePosition: "50% 70%" },
];
