"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteSidebar } from "@/components/layout/site-sidebar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { parseHomeDesign } from "@/lib/home-design";

/** Barra lateral en home `?diseno=3`; oculta el header superior en escritorio. */
export function SiteDesignChrome() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const design =
    pathname === "/" ? parseHomeDesign(searchParams.get("diseno") ?? undefined) : null;
  const isDesign3Home = design === 3;
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (isDesign3Home) {
      document.body.dataset.homeDesign = "3";
    } else {
      delete document.body.dataset.homeDesign;
    }
    return () => {
      delete document.body.dataset.homeDesign;
    };
  }, [isDesign3Home]);

  if (!isDesign3Home) {
    return null;
  }

  const closeSheet = () => setSheetOpen(false);

  return (
    <>
      <div
        className="site-sidebar-shell pointer-events-none fixed inset-y-0 left-0 z-50 hidden w-[var(--site-sidebar-width)] lg:block"
        aria-hidden={false}
      >
        <div className="pointer-events-auto flex h-full">
          <SiteSidebar />
        </div>
      </div>

      <div
        className="site-sidebar-mobile-bar fixed inset-x-0 top-0 z-50 flex h-[var(--site-header-height)] items-center border-b border-border bg-canvas px-4 lg:hidden"
      >
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className="cursor-pointer font-sans text-small font-extrabold uppercase tracking-[-0.02em] text-fg"
          >
            Menú
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex w-[min(100%,var(--site-sidebar-width))] flex-col border-r border-border bg-[color-mix(in_srgb,var(--ds-green)_20%,var(--canvas)_80%)] p-0"
          >
            <SheetTitle className="sr-only">Navegación</SheetTitle>
            <SiteSidebar className="h-full w-full border-r-0" onNavigate={closeSheet} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
