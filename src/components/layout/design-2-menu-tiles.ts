/** Geometría de las transiciones del menú del diseño 2. */

export const SWEEP_MS = 540;

type Shape =
  | "triangle"
  | "square"
  | "pixel"
  | "column"
  | "row"
  | "diamond"
  | "hexagon"
  | "circle";

type Order =
  | "random"
  | "diagonal"
  | "left"
  | "top"
  | "center"
  | "spiral"
  | "checker";

/** Cómo aparece cada pieza: de golpe, creciendo o deslizándose. */
export type TileMotion = "flash" | "grow" | "wipe-x" | "wipe-y";

export const MENU_TRANSITIONS = [
  { id: "triangulos", label: "Triángulos", shape: "triangle", order: "random", motion: "flash" },
  { id: "cuadrados", label: "Cuadrados", shape: "square", order: "random", motion: "flash" },
  { id: "diagonal", label: "Diagonal", shape: "square", order: "diagonal", motion: "grow" },
  { id: "pixeles", label: "Píxeles", shape: "pixel", order: "random", motion: "flash" },
  { id: "ajedrez", label: "Ajedrez", shape: "square", order: "checker", motion: "flash" },
  { id: "espiral", label: "Espiral", shape: "square", order: "spiral", motion: "grow" },
  { id: "rombos", label: "Rombos", shape: "diamond", order: "center", motion: "grow" },
  { id: "hexagonos", label: "Hexágonos", shape: "hexagon", order: "random", motion: "grow" },
  { id: "circulos", label: "Círculos", shape: "circle", order: "center", motion: "grow" },
  { id: "columnas", label: "Columnas", shape: "column", order: "left", motion: "wipe-y" },
  { id: "persiana", label: "Persiana", shape: "row", order: "top", motion: "wipe-x" },
  { id: "lluvia", label: "Lluvia", shape: "pixel", order: "top", motion: "flash" },
] as const satisfies readonly {
  id: string;
  label: string;
  shape: Shape;
  order: Order;
  motion: TileMotion;
}[];

export type MenuTransitionId = (typeof MENU_TRANSITIONS)[number]["id"];

export type Tile = { d: string; delay: number };

type Piece = { d: string; cx: number; cy: number; i: number; j: number };

function scatter(a: number, b: number) {
  const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

const round = (n: number) => Math.round(n * 10) / 10;

function polygon(points: [number, number][]) {
  return `M${points.map(([x, y]) => `${round(x)},${round(y)}`).join("L")}Z`;
}

function grid(width: number, height: number, size: number, draw: (x: number, y: number) => string) {
  const pieces: Piece[] = [];
  const cols = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      const x = i * size;
      const y = j * size;
      pieces.push({ d: draw(x, y), cx: x + size / 2, cy: y + size / 2, i, j });
    }
  }
  return pieces;
}

function buildPieces(shape: Shape, width: number, height: number): Piece[] {
  if (shape === "triangle") {
    const w = 250;
    const h = w / 2;
    const pieces: Piece[] = [];
    for (let j = 0; j < Math.ceil(height / h); j += 1) {
      const top = j * h;
      const bottom = top + h;
      for (let i = -1; i < Math.ceil(width / (w / 2)) + 1; i += 1) {
        const left = i * (w / 2);
        const up = (i + j) % 2 === 0;
        const d = up
          ? polygon([[left, bottom], [left + w / 2, top], [left + w, bottom]])
          : polygon([[left, top], [left + w / 2, bottom], [left + w, top]]);
        pieces.push({ d, cx: left + w / 2, cy: top + h / 2, i, j });
      }
    }
    return pieces;
  }

  if (shape === "square" || shape === "pixel") {
    const size = shape === "square" ? 120 : 48;
    return grid(width, height, size, (x, y) =>
      polygon([[x, y], [x + size, y], [x + size, y + size], [x, y + size]]),
    );
  }

  if (shape === "column" || shape === "row") {
    const count = shape === "column" ? 12 : 10;
    const step = (shape === "column" ? width : height) / count;
    return Array.from({ length: count }, (_, k) => {
      const a = k * step;
      const d =
        shape === "column"
          ? polygon([[a, 0], [a + step, 0], [a + step, height], [a, height]])
          : polygon([[0, a], [width, a], [width, a + step], [0, a + step]]);
      return shape === "column"
        ? { d, cx: a + step / 2, cy: height / 2, i: k, j: 0 }
        : { d, cx: width / 2, cy: a + step / 2, i: 0, j: k };
    });
  }

  if (shape === "diamond") {
    const size = 160;
    const pieces: Piece[] = [];
    for (let j = -1; j < Math.ceil(height / (size / 2)) + 1; j += 1) {
      for (let i = -1; i < Math.ceil(width / size) + 1; i += 1) {
        const cx = i * size + (j % 2 === 0 ? 0 : size / 2);
        const cy = j * (size / 2);
        const r = size / 2;
        pieces.push({
          d: polygon([[cx, cy - r], [cx + r, cy], [cx, cy + r], [cx - r, cy]]),
          cx,
          cy,
          i,
          j,
        });
      }
    }
    return pieces;
  }

  if (shape === "hexagon") {
    const r = 80;
    const w = Math.sqrt(3) * r;
    const pieces: Piece[] = [];
    for (let j = -1; j < Math.ceil(height / (1.5 * r)) + 1; j += 1) {
      for (let i = -1; i < Math.ceil(width / w) + 1; i += 1) {
        const cx = i * w + (j % 2 === 0 ? 0 : w / 2);
        const cy = j * 1.5 * r;
        const points = Array.from({ length: 6 }, (_, k): [number, number] => {
          const angle = (Math.PI / 3) * k - Math.PI / 2;
          return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
        });
        pieces.push({ d: polygon(points), cx, cy, i, j });
      }
    }
    return pieces;
  }

  const size = 140;
  const r = size * 0.75;
  return grid(width, height, size, (x, y) => {
    const cx = round(x + size / 2);
    const cy = round(y + size / 2);
    return `M${cx - r},${cy}a${r},${r} 0 1,0 ${r * 2},0a${r},${r} 0 1,0 ${-r * 2},0Z`;
  });
}

function orderOf(order: Order, piece: Piece, width: number, height: number) {
  const { cx, cy, i, j } = piece;
  const random = scatter(j, i);
  const clamp = (n: number) => Math.min(1, Math.max(0, n));
  switch (order) {
    case "random":
      return random;
    case "diagonal":
      return clamp((cx / width + cy / height) / 2);
    case "left":
      return clamp(cx / width);
    case "top":
      return clamp(cy / height + random * 0.12);
    case "center": {
      const max = Math.hypot(width / 2, height / 2);
      return clamp(Math.hypot(cx - width / 2, cy - height / 2) / max);
    }
    case "spiral": {
      const dx = cx - width / 2;
      const dy = cy - height / 2;
      const ring = Math.max(Math.abs(dx) / width, Math.abs(dy) / height) * 2;
      const turn = (Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2);
      return clamp(ring * 0.85 + turn * 0.15);
    }
    case "checker":
      return ((i + j) % 2) * 0.5 + random * 0.45;
  }
}

export function buildTiles(id: MenuTransitionId, width: number, height: number): Tile[] {
  const transition = MENU_TRANSITIONS.find((item) => item.id === id) ?? MENU_TRANSITIONS[0];
  const stepped = transition.motion === "flash";
  return buildPieces(transition.shape, width, height).map((piece) => {
    const at = orderOf(transition.order, piece, width, height);
    const delay = stepped
      ? Math.floor(at * 8.999) * (SWEEP_MS / 9)
      : Math.round(at * SWEEP_MS * 0.7);
    return { d: piece.d, delay };
  });
}

export function motionOf(id: MenuTransitionId): TileMotion {
  return (MENU_TRANSITIONS.find((item) => item.id === id) ?? MENU_TRANSITIONS[0]).motion;
}
