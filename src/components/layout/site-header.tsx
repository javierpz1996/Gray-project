"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Design3Navbar } from "@/components/layout/design-3-navbar";
import { SiteBrandLink } from "@/components/layout/site-brand";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { parseHomeDesign } from "@/lib/home-design";
import { cn } from "@/lib/utils";

const homeHeaderGlass =
  "border-b border-border/30 bg-canvas/55 shadow-none backdrop-blur-md supports-[backdrop-filter]:bg-canvas/45";

function SiteHeaderDefault() {
  return (
    <div className="flex h-[var(--site-header-height)] w-full items-stretch">
      <div
        className="flex min-w-0 flex-1 items-center justify-end px-4 sm:px-6 lg:px-8 xl:justify-start"
      >
        <Suspense fallback={<span className="hidden h-9 w-24 xl:block" />}>
          <SiteNavigation />
        </Suspense>
      </div>
      <SiteBrandLink className="shrink-0" />
    </div>
  );
}

function SiteHeaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHome = pathname === "/";
  const isDesign3Nav = parseHomeDesign(searchParams.get("diseno") ?? undefined) === 3;

  return (
    <header
      className={cn(
        "site-header-top top-0 z-50 w-full",
        isDesign3Nav &&
          "border-b border-[color-mix(in_srgb,var(--primary-foreground)_10%,transparent)] bg-ink-nav text-primary-foreground",
        !isDesign3Nav && isHome && "fixed",
        !isDesign3Nav && !isHome && "sticky border-b border-border bg-canvas",
        !isDesign3Nav && isHome && homeHeaderGlass,
        isDesign3Nav && isHome && "fixed",
        isDesign3Nav && !isHome && "sticky",
      )}
    >
      {isDesign3Nav ? <Design3Navbar /> : <SiteHeaderDefault />}
    </header>
  );
}

export function SiteHeader() {
  return (
    <Suspense fallback={<SiteHeaderFallback />}>
      <SiteHeaderInner />
    </Suspense>
  );
}

function SiteHeaderFallback() {
  return (
    <header
      className="site-header-top fixed top-0 z-50 h-[var(--site-header-height)] w-full border-b border-border bg-canvas"
      aria-hidden="true"
    />
  );
}
