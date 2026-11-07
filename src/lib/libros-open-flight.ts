import type { Libro } from "@/content/libros";

/** Rectángulo en coordenadas de viewport (px). */
export type LibrosFlightViewportRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

/** Rectángulo local al contenedor del overlay. */
export type LibrosFlightLocalRect = LibrosFlightViewportRect;

export type OpenLibroHandler = (
  libro: Libro,
  source?: HTMLElement | null,
) => void;

export const LIBROS_OPEN_FLIGHT_EASE = [0.22, 1, 0.36, 1] as const;

export const LIBROS_OPEN_FLIGHT_DURATION_S = 0.68;

export const LIBROS_OPEN_FLIGHT_MAX_WIDTH_PX = 400;

/** Ancho máximo del panel de índice (`max-w-2xl`). */
export const LIBROS_OPEN_INDICE_MAX_WIDTH_PX = 672;

export function measureViewportRect(el: HTMLElement): LibrosFlightViewportRect {
  const b = el.getBoundingClientRect();
  return { x: b.left, y: b.top, w: b.width, h: b.height };
}

export function viewportToLocalRect(
  viewport: LibrosFlightViewportRect,
  overlayRoot: HTMLElement,
): LibrosFlightLocalRect {
  const o = overlayRoot.getBoundingClientRect();
  return {
    x: viewport.x - o.left,
    y: viewport.y - o.top,
    w: viewport.w,
    h: viewport.h,
  };
}

export function computeCenterTargetRect(
  overlayRoot: HTMLElement,
  maxWidth = LIBROS_OPEN_FLIGHT_MAX_WIDTH_PX,
): LibrosFlightLocalRect {
  const { width, height } = overlayRoot.getBoundingClientRect();
  const targetW = Math.min(width * 0.55, maxWidth);
  const targetH = targetW * (4 / 3);
  return {
    x: (width - targetW) / 2,
    y: (height - targetH) / 2,
    w: targetW,
    h: targetH,
  };
}

/** Destino del vuelo del panel de contenido (índice). */
export function computeCenterIndiceTargetRect(
  overlayRoot: HTMLElement,
  maxWidth = LIBROS_OPEN_INDICE_MAX_WIDTH_PX,
): LibrosFlightLocalRect {
  const { width, height } = overlayRoot.getBoundingClientRect();
  const padX = 24;
  const targetW = Math.min(width - padX * 2, maxWidth);
  const targetH = Math.min(height * 0.48, height - 80);
  return {
    x: (width - targetW) / 2,
    y: Math.max(16, (height - targetH) / 2),
    w: targetW,
    h: targetH,
  };
}

/** Escala inicial del panel centrado para coincidir con el rect de la portada. */
export function computeFlightScaleFromCard(
  from: LibrosFlightLocalRect,
  panelWidth: number,
  panelHeight: number,
): { scaleX: number; scaleY: number } {
  if (panelWidth <= 0 || panelHeight <= 0) {
    return { scaleX: 1, scaleY: 1 };
  }
  return {
    scaleX: from.w / panelWidth,
    scaleY: from.h / panelHeight,
  };
}

/** Origen del transform en % del panel (centro de la portada en coords locales). */
export function computeFlightTransformOriginPercent(
  from: LibrosFlightLocalRect,
  panelLocalX: number,
  panelLocalY: number,
  panelWidth: number,
  panelHeight: number,
): { x: number; y: number } {
  if (panelWidth <= 0 || panelHeight <= 0) {
    return { x: 50, y: 50 };
  }
  const cardCx = from.x + from.w / 2;
  const cardCy = from.y + from.h / 2;
  const x = ((cardCx - panelLocalX) / panelWidth) * 100;
  const y = ((cardCy - panelLocalY) / panelHeight) * 100;
  return {
    x: Math.min(100, Math.max(0, x)),
    y: Math.min(100, Math.max(0, y)),
  };
}

let libroDetalleScrollY = 0;

export function lockLibroDetalleScroll() {
  libroDetalleScrollY = window.scrollY;
  document.body.dataset.libroDetalle = "open";
  document.body.style.overflow = "hidden";
  window.scrollTo(0, 0);
}

export function unlockLibroDetalleScroll() {
  document.body.removeAttribute("data-libro-detalle");
  document.body.style.overflow = "";
  window.scrollTo(0, libroDetalleScrollY);
}
