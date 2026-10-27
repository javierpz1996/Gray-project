import { Suspense } from "react";
import { HomeDesignMarker } from "@/components/layout/home-design-marker";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NavHeroDimOverlay } from "@/components/layout/nav-hero-dim-overlay";

function SiteHeaderFallback() {
  return (
    <div
      className="site-header-top h-[var(--site-header-height)] w-full shrink-0 border-b border-border bg-canvas"
      aria-hidden="true"
    />
  );
}

/** Chrome del portafolio: header y footer solo en rutas del sitio público. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Suspense fallback={<SiteHeaderFallback />}>
        <SiteHeader />
      </Suspense>
      <Suspense fallback={null}>
        <HomeDesignMarker />
      </Suspense>
      <NavHeroDimOverlay />
      <main className="site-main flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
