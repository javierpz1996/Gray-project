import { Suspense } from "react";
import { HomeDesignMarker } from "@/components/layout/home-design-marker";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NavHeroDimOverlay } from "@/components/layout/nav-hero-dim-overlay";
import { SiteScrollHygiene } from "@/components/layout/site-scroll-hygiene";
import { readMenuApplied } from "@/lib/site-menu";

function SiteHeaderFallback() {
  return (
    <div
      className="site-header-top sticky top-0 z-50 h-0 w-full"
      aria-hidden="true"
    />
  );
}

/** Chrome del portafolio: header y footer solo en rutas del sitio público. */
export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const menuApplied = await readMenuApplied();
  return (
    <>
      <Suspense fallback={<SiteHeaderFallback />}>
        <SiteHeader menuApplied={menuApplied} />
      </Suspense>
      <Suspense fallback={null}>
        <HomeDesignMarker />
      </Suspense>
      <Suspense fallback={null}>
        <SiteScrollHygiene />
      </Suspense>
      <NavHeroDimOverlay />
      <main className="site-main flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
