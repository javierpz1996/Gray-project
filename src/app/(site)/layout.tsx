import { Suspense } from "react";
import { SiteDesignChrome } from "@/components/layout/site-design-chrome";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NavHeroDimOverlay } from "@/components/layout/nav-hero-dim-overlay";

/** Chrome del portafolio: header y footer solo en rutas del sitio público. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={null}>
        <SiteDesignChrome />
      </Suspense>
      <NavHeroDimOverlay />
      <main className="site-main flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
