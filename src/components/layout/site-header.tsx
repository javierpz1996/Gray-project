"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Design3Navbar } from "@/components/layout/design-3-navbar";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { parseHomeDesign } from "@/lib/home-design";
import { cn } from "@/lib/utils";

function SiteHeaderDefault() {
  return (
    <Suspense fallback={null}>
      <SiteNavigation />
    </Suspense>
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
        "site-header-top top-0 z-50",
        isDesign3Nav &&
          "w-full border-b border-[color-mix(in_srgb,var(--primary-foreground)_10%,transparent)] bg-ink-nav text-primary-foreground",
        isDesign3Nav && isHome && "fixed",
        isDesign3Nav && !isHome && "sticky",
        !isDesign3Nav &&
          "pointer-events-none sticky h-0 min-h-0 w-full overflow-visible bg-transparent",
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
      className="site-header-top sticky top-0 z-50 h-0 w-full"
      aria-hidden="true"
    />
  );
}
