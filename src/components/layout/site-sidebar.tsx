"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { SiteNavItem } from "@/config/site";
import { site } from "@/config/site";
import {
  homeDesignHref,
  parseHomeDesign,
} from "@/lib/home-design";
import { resolveNavHref } from "@/lib/nav-resolve-href";
import { cn } from "@/lib/utils";

const sidebarLink =
  "block py-2 font-sans text-small font-extrabold uppercase tracking-[-0.02em] text-fg transition-colors duration-150 ease-out hover:text-primary";

const sidebarSectionBar =
  "bg-ink px-4 py-2.5 font-sans text-micro font-extrabold uppercase tracking-[0.12em] text-primary-foreground";

function SidebarNavItems({
  items,
  diseno,
  pathname,
  onNavigate,
}: {
  items: readonly SiteNavItem[];
  diseno: ReturnType<typeof parseHomeDesign>;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((item) => {
        if (item.kind === "link" || item.kind === "external") {
          const href = resolveNavHref(item.href, pathname, diseno);
          const external = item.kind === "external";
          return (
            <Link
              key={item.label}
              href={href}
              className={sidebarLink}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          );
        }

        if (item.kind === "dropdown") {
          return (
            <div key={item.label} className="flex flex-col gap-2">
              <div className={sidebarSectionBar}>{item.label}</div>
              <ul className="m-0 flex list-none flex-col gap-0.5 p-0 px-1">
                {item.items.map((entry) => {
                  const href = resolveNavHref(entry.href, pathname, diseno);
                  return (
                    <li key={entry.label}>
                      <Link
                        href={href}
                        className={cn(sidebarLink, "pl-3")}
                        onClick={onNavigate}
                      >
                        {entry.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

type SiteSidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

/** Navegación vertical (referencia diseño 3). */
export function SiteSidebar({ className, onNavigate }: SiteSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const diseno = parseHomeDesign(searchParams.get("diseno") ?? undefined);
  const homeHref = homeDesignHref(diseno);

  return (
    <aside
      className={cn(
        "site-sidebar flex h-full min-h-0 w-[var(--site-sidebar-width)] shrink-0 flex-col border-r border-border bg-[color-mix(in_srgb,var(--ds-green)_20%,var(--canvas)_80%)]",
        className,
      )}
      aria-label="Principal"
    >
      <Link
        href={homeHref}
        aria-label={`${site.wordmark}, inicio`}
        className="flex min-h-[var(--site-header-height)] shrink-0 items-center justify-center bg-primary px-4 font-display text-[clamp(2rem,4vw,2.75rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-primary-foreground transition-colors duration-150 ease-out hover:bg-coral-hover"
        onClick={onNavigate}
      >
        {site.wordmark}
      </Link>

      <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-8">
        <div className={sidebarSectionBar}>Menú</div>
        <div className="mt-4">
          <SidebarNavItems
            items={site.nav}
            diseno={diseno}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        </div>
      </nav>
    </aside>
  );
}
