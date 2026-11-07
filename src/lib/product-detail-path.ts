/** Detalle de producto (scroll horizontal + panel vertical). */
export const PRODUCT_DETAIL_PATH = "/details-product";

export function productDetailHref(productSlug: string): string {
  return `${PRODUCT_DETAIL_PATH}?product=${encodeURIComponent(productSlug)}`;
}
