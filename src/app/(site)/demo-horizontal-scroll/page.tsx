import { redirect } from "next/navigation";
import { PRODUCT_DETAIL_PATH } from "@/lib/product-detail-path";

/** Ruta de demo renombrada → `/details-product`. */
export default function DemoHorizontalScrollRedirectPage() {
  redirect(PRODUCT_DETAIL_PATH);
}
