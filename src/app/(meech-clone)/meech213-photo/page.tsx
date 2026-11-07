import type { Metadata } from "next";
import { EditorialGallerySection } from "@/components/home/editorial-gallery/editorial-gallery-section";
import { meech213ReferenceItems } from "@/components/home/editorial-gallery/meech213-reference-items";

export const metadata: Metadata = {
  title: "Photo · clon de referencia",
  robots: { index: false, follow: false },
};

/** Vista a pantalla completa sin chrome del sitio Gray (referencia meech213.com/photo). */
export default function Meech213PhotoClonePage() {
  return <EditorialGallerySection standalone items={meech213ReferenceItems} />;
}
