"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useState, type ReactNode } from "react";
import { SiteBrand } from "@/components/layout/site-brand";
import type { SiteNavDropdown, SiteNavItem } from "@/config/site";
import { site } from "@/config/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { parseHomeDesign } from "@/lib/home-design";
import { resolveNavHref } from "@/lib/nav-resolve-href";
import { cn } from "@/lib/utils";

/** Estilo barra VIZ: sans extrabold, mayúsculas, tracking cerrado. */
const navBarText =
  "cursor-pointer font-sans text-small font-extrabold uppercase tracking-[-0.02em] text-fg transition-colors duration-150 ease-out hover:text-primary data-[state=open]:text-primary";

/** Ítems del panel desplegable (mayúsculas, ancho generoso). */
const navDropdownItem =
  "cursor-pointer rounded-none px-5 py-3.5 font-sans text-small font-extrabold uppercase tracking-[-0.02em] text-fg focus:bg-muted/40 focus:text-fg data-highlighted:bg-muted/40";

const navDropdownPanel =
  "min-w-[13rem] rounded-none border border-border bg-canvas p-0 shadow-md ring-0";

function NavBarSeparator() {
  return (
    <li
      className="font-sans text-small font-extrabold text-fg-subtle select-none"
      aria-hidden="true"
    >
      |
    </li>
  );
}

/** Caret sólido tipo VIZ: ancho, tope a media altura de las mayúsculas. */
function NavDropdownCaret({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 9"
      className={cn(
        "mt-[0.32em] h-[0.72em] w-[0.85em] shrink-0 transition-transform duration-150 ease-out group-data-[state=open]:rotate-180",
        className,
      )}
      aria-hidden="true"
    >
      <path d="M0 0h10L5 9z" fill="currentColor" />
    </svg>
  );
}

function NavLink({
  item,
  className,
  onNavigate,
}: {
  item: Extract<SiteNavItem, { kind: "link" } | { kind: "external" }>;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const diseno = parseHomeDesign(searchParams.get("diseno") ?? undefined);

  const href = resolveNavHref(item.href, pathname, diseno);
  const external = item.kind === "external";

  return (
    <Link
      href={href}
      className={cn(navBarText, className)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}

function NavBarDropdown({
  item,
  onNavigate,
  centered,
}: {
  item: SiteNavDropdown;
  onNavigate?: () => void;
  centered?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const diseno = parseHomeDesign(searchParams.get("diseno") ?? undefined);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          navBarText,
          "group inline-flex items-baseline gap-2 rounded-none border-0 bg-transparent shadow-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 data-[state=open]:ring-0",
        )}
      >
        {item.label}
        <NavDropdownCaret />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={centered ? "center" : "start"}
        sideOffset={0}
        className={navDropdownPanel}
      >
        {item.items.map((entry) => {
          const href = resolveNavHref(entry.href, pathname, diseno);
          return (
            <DropdownMenuItem key={entry.label} asChild className={navDropdownItem}>
              <Link href={href} onClick={onNavigate}>
                {entry.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SheetNavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const diseno = parseHomeDesign(searchParams.get("diseno") ?? undefined);
  const resolved = resolveNavHref(href, pathname, diseno);

  return (
    <Link
      href={resolved}
      onClick={onNavigate}
      className="cursor-pointer font-sans text-small font-extrabold uppercase tracking-[-0.02em] text-fg"
    >
      {label}
    </Link>
  );
}

function renderNavItem(
  item: SiteNavItem,
  onNavigate?: () => void,
  centered?: boolean,
): ReactNode {
  if (item.kind === "dropdown") {
    return (
      <NavBarDropdown item={item} onNavigate={onNavigate} centered={centered} />
    );
  }
  if (item.kind === "link" || item.kind === "external") {
    return <NavLink item={item} onNavigate={onNavigate} />;
  }
  return null;
}

export function SiteNavigation({ centered = false }: { centered?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const barItems = site.nav.filter(
    (item) => item.kind === "link" || item.kind === "external" || item.kind === "dropdown",
  );

  return (
    <>
      <nav
        className={cn(
          "hidden min-w-0 items-center xl:flex",
          centered ? "w-full flex-1 justify-center" : "flex-1 justify-start",
        )}
        aria-label="Principal"
      >
        <ul
          className={cn(
            "m-0 flex list-none flex-wrap items-center gap-x-4 p-0 sm:gap-x-5",
            centered ? "justify-center" : "justify-start",
          )}
        >
          {barItems.map((item, index) => (
            <Fragment key={item.label}>
              {index > 0 ? <NavBarSeparator /> : null}
              <li>{renderNavItem(item, undefined, centered)}</li>
            </Fragment>
          ))}
        </ul>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className="cursor-pointer shrink-0 px-2 py-2 font-sans text-small font-extrabold uppercase tracking-[-0.02em] text-fg transition-colors duration-150 ease-out hover:text-primary xl:hidden"
        >
          Menú
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-[min(100%,20rem)] flex-col border-l border-border bg-canvas p-0"
        >
          <SheetTitle className="sr-only">Navegación</SheetTitle>
          <div className="border-b border-border px-6 py-6">
            <SiteBrand variant="navbar" />
          </div>
          <nav
            className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-6"
            aria-label="Principal"
          >
            <div className="flex flex-col gap-4">
              <p className="eyebrow">Sitio</p>
              {barItems.map((item) => {
                if (item.kind === "dropdown") {
                  return (
                    <div key={item.label} className="flex flex-col gap-2">
                      <p className="font-sans text-small font-extrabold uppercase tracking-[-0.02em] text-fg-muted">
                        {item.label}
                      </p>
                      {item.items.map((entry) => (
                        <SheetNavLink
                          key={entry.label}
                          href={entry.href}
                          label={entry.label}
                          onNavigate={close}
                        />
                      ))}
                    </div>
                  );
                }
                if (item.kind === "link" || item.kind === "external") {
                  return (
                    <SheetNavLink
                      key={item.label}
                      href={item.href}
                      label={item.label}
                      onNavigate={close}
                    />
                  );
                }
                return null;
              })}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
