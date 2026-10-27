"use client";

import { useState } from "react";
import { Design2Sidebar } from "@/components/home/design-2/design-2-sidebar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/** Barra lateral del portal diseño 2 (va con el contenido del home, no en el layout). */
export function Design2PortalChrome() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = () => setSheetOpen(false);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-y-0 left-0 z-50 hidden w-[var(--site-sidebar-width)] lg:block"
        aria-hidden={false}
      >
        <div className="pointer-events-auto flex h-full">
          <Design2Sidebar />
        </div>
      </div>

      <div
        className="design-2-portal-mobile-bar fixed inset-x-0 top-0 z-50 flex h-[var(--site-header-height)] items-center border-b border-[color-mix(in_srgb,var(--primary-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--ds-ink)_88%,var(--ds-red)_12%)] px-4 lg:hidden"
      >
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className="cursor-pointer font-sans text-small font-extrabold uppercase tracking-[0.14em] text-primary-foreground"
          >
            Menú
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex w-[min(100%,var(--site-sidebar-width))] flex-col border-r border-[color-mix(in_srgb,var(--primary-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--ds-ink)_88%,var(--ds-red)_12%)] p-0"
          >
            <SheetTitle className="sr-only">Navegación del portal</SheetTitle>
            <Design2Sidebar
              className="h-full w-full border-r-0"
              onNavigate={closeSheet}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
