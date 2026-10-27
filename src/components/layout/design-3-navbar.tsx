"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import {
  design3NavPrimary,
  design3NavSecondary,
  type Design3NavItem,
} from "@/content/design-3-nav";
import { site } from "@/config/site";
import { homeDesignHref, parseHomeDesign } from "@/lib/home-design";
import { resolveNavHref } from "@/lib/nav-resolve-href";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navPrimaryLink =
  "font-display text-[0.8125rem] font-bold uppercase leading-none tracking-[0.24em] text-primary-foreground transition-colors duration-150 ease-out hover:text-[color-mix(in_srgb,var(--primary-foreground)_82%,var(--ds-yellow)_18%)] md:text-small";

const navSecondaryLink =
  "font-display text-small font-bold uppercase tracking-[0.18em] text-primary-foreground/90 transition-colors duration-150 ease-out hover:text-primary-foreground md:text-body";

const navSoonLabel =
  "font-display text-small font-bold uppercase tracking-[0.22em] text-primary-foreground/50 md:text-body md:tracking-[0.2em]";

const navSoonBadge =
  "relative z-[2] shrink-0 bg-ds-yellow px-1.5 py-0.5 font-display text-[0.625rem] font-bold uppercase leading-none tracking-[0.14em] text-ink -rotate-[2.5deg] motion-reduce:rotate-0 md:px-2 md:text-[0.6875rem]";

function NavDiamond({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 10"
      className={cn("size-2 shrink-0 text-ds-yellow md:size-2.5", className)}
      aria-hidden
    >
      <path d="M5 0 10 5 5 10 0 5z" fill="currentColor" />
    </svg>
  );
}

function NavPipe() {
  return (
    <span
      className="select-none font-display text-small font-bold text-primary-foreground/35 md:text-body"
      aria-hidden
    >
      |
    </span>
  );
}

function Design3PrimaryItem({
  item,
  pathname,
  diseno,
  onNavigate,
  compactPrimary,
}: {
  item: Design3NavItem;
  pathname: string;
  diseno: ReturnType<typeof parseHomeDesign>;
  onNavigate?: () => void;
  compactPrimary?: boolean;
}) {
  if (item.kind !== "link") {
    return null;
  }

  const href = resolveNavHref(item.href, pathname, diseno);

  return (
    <li className="flex items-center gap-2 md:gap-2.5">
      <NavDiamond className={compactPrimary ? "size-1.5" : undefined} />
      <Link
        href={href}
        className={cn(
          navPrimaryLink,
          compactPrimary && "text-nano tracking-[0.18em]",
        )}
        onClick={onNavigate}
      >
        {item.label}
        {item.suffix ? (
          <span className="text-primary-foreground/70">{item.suffix}</span>
        ) : null}
      </Link>
    </li>
  );
}

function Design3SecondaryItem({
  item,
  pathname,
  diseno,
  onNavigate,
}: {
  item: Design3NavItem;
  pathname: string;
  diseno: ReturnType<typeof parseHomeDesign>;
  onNavigate?: () => void;
}) {
  if (item.kind === "soon") {
    return (
      <span
        className="relative inline-block"
        aria-label={`${item.label}, ${item.soonNote}`}
      >
        <span className={cn(navSoonBadge, "absolute bottom-full left-0 mb-1")}>
          {item.soonNote}
        </span>
        <span className={navSoonLabel}>{item.label}</span>
      </span>
    );
  }

  if (item.kind === "external") {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={navSecondaryLink}
        onClick={onNavigate}
      >
        {item.label}
      </a>
    );
  }

  const href = resolveNavHref(item.href, pathname, diseno);

  return (
    <Link href={href} className={navSecondaryLink} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

function Design3NavLinks({
  onNavigate,
  showSecondary = true,
  compactPrimary = false,
}: {
  onNavigate?: () => void;
  showSecondary?: boolean;
  compactPrimary?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const diseno = parseHomeDesign(searchParams.get("diseno") ?? undefined);

  const hasPrimary = design3NavPrimary.length > 0;

  return (
    <div className="flex w-full flex-col items-center gap-2 md:gap-2.5">
      {hasPrimary ? (
        <nav aria-label="Principal">
          <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-5 gap-y-2 p-0 md:gap-x-8 lg:gap-x-10">
            {design3NavPrimary.map((item) => (
              <Design3PrimaryItem
                key={item.label}
                item={item}
                pathname={pathname}
                diseno={diseno}
                onNavigate={onNavigate}
                compactPrimary={compactPrimary}
              />
            ))}
          </ul>
        </nav>
      ) : null}

      {showSecondary ? (
        <nav aria-label="Secciones">
          <ul
            className="m-0 flex list-none flex-wrap items-end justify-center gap-x-3 gap-y-2 overflow-visible p-0 pt-2 md:gap-x-4 md:pt-2.5"
          >
            {design3NavSecondary.map((item, index) => (
              <Fragment key={item.label}>
                {index > 0 ? (
                  <li>
                    <NavPipe />
                  </li>
                ) : null}
                <li>
                  <Design3SecondaryItem
                    item={item}
                    pathname={pathname}
                    diseno={diseno}
                    onNavigate={onNavigate}
                  />
                </li>
              </Fragment>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

/** Barra superior diseño 3 (referencia demonslayer-anime.com). */
export function Design3Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const homeHref = homeDesignHref(3);

  return (
    <div
      className="relative mx-auto flex min-h-[var(--site-header-height)] w-full max-w-[100rem] items-center justify-center overflow-visible px-4 py-3 sm:px-6 lg:px-8"
    >
      <Link
        href={homeHref}
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 sm:left-6 lg:left-8"
        aria-label={`${site.wordmark}, inicio`}
      >
        <Image
          src={site.logoSecondarySrc}
          alt=""
          width={320}
          height={120}
          priority
          unoptimized
          sizes="(max-width: 640px) 3rem, 4rem"
          className="h-12 w-auto object-contain object-left sm:h-14 md:h-16"
          aria-hidden
        />
      </Link>

      <div className="hidden w-full max-w-4xl px-14 sm:max-w-5xl sm:px-20 md:flex md:justify-center lg:max-w-6xl lg:px-24">
        <Design3NavLinks />
      </div>

      <div className="flex w-full justify-center px-12 sm:px-16 md:hidden">
        <Design3NavLinks />
      </div>

      <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2 sm:right-6 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="cursor-pointer font-display text-nano font-bold uppercase tracking-[0.18em] text-primary-foreground"
          >
            Menú
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-[min(100%,20rem)] flex-col border-l border-border bg-ink-nav p-0 text-primary-foreground"
          >
            <SheetTitle className="sr-only">Navegación</SheetTitle>
            <div className="flex flex-col items-center gap-6 border-b border-[color-mix(in_srgb,var(--primary-foreground)_12%,transparent)] px-6 py-8">
              <Image
                src={site.logoSecondarySrc}
                alt=""
                width={240}
                height={96}
                unoptimized
                className="h-16 w-auto max-w-[12rem] object-contain"
              />
              <Design3NavLinks onNavigate={close} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
