import { Suspense } from "react";
import { DetailsProductView } from "@/components/horizontal-scroll/details-product-view";

export const metadata = {
  title: "Detalle de producto",
  description:
    "Recorrido con scroll vertical convertido en desplazamiento horizontal.",
  robots: { index: false, follow: false },
};

function DetailsProductFallback() {
  return (
    <div
      className="min-h-[50dvh] bg-canvas"
      aria-hidden="true"
    />
  );
}

export default function DetailsProductPage() {
  return (
    <Suspense fallback={<DetailsProductFallback />}>
      <DetailsProductView />
    </Suspense>
  );
}
