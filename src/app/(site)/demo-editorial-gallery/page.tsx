import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo · Portafolio editorial",
  robots: { index: false, follow: false },
};

/** Redirige al clon fullscreen sin chrome del sitio. */
export default function DemoEditorialGalleryPage() {
  redirect("/meech213-photo");
}
