"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { SiteBrandLink } from "@/components/layout/site-brand";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { cn } from "@/lib/utils";

const homeHeaderGlass =
  "border-b border-border/30 bg-canvas/55 shadow-none backdrop-blur-md supports-[backdrop-filter]:bg-canvas/45";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "site-header-top top-0 z-50 w-full",
        isHome ? "fixed" : "sticky border-b border-border bg-canvas",
        isHome && homeHeaderGlass,
      )}
    >
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
    </header>
  );
}
