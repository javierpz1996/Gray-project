"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * DESIGN.md §6 — Header.
 *   sticky top-0 · h-64px · bg-canvas · border-b hairline
 *   Wordmark serif a la izquierda · anclas a la derecha (text-small)
 *   Activa → text-fg + subrayado 1px · resto → fg-muted
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-[20px] backdrop-saturate-[180%]">
      <div className="mx-auto flex h-16 w-full max-w-site items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-h3 font-semibold uppercase leading-heading tracking-title text-fg"
        >
          {site.shortName}
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-small text-fg-muted underline-offset-4 transition-colors duration-150 ease-out hover:text-primary hover:underline"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href="/desing-system">Desing system</Link>
          </Button>
        </nav>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="text-small text-fg md:hidden">
            Menú
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-72 border-l border-border bg-canvas p-0"
          >
            <SheetTitle className="sr-only">Navegación</SheetTitle>
            <nav className="flex flex-col gap-6 px-6 pt-10">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-h3 font-semibold uppercase leading-heading tracking-title text-fg"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="w-fit">
                <Link href="/desing-system" onClick={() => setOpen(false)}>
                  Desing system
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
