"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { design2PortalNav } from "@/content/design-2-portal";
import { site } from "@/config/site";
import { homeDesignHref, parseHomeDesign } from "@/lib/home-design";
import { resolveNavHref } from "@/lib/nav-resolve-href";
import { cn } from "@/lib/utils";

const navLink =
  "block py-1.5 font-sans text-small font-extrabold uppercase tracking-[0.14em] text-primary-foreground/90 transition-colors duration-150 ease-out hover:text-primary-foreground";

type Design2SidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

export function Design2Sidebar({ className, onNavigate }: Design2SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const diseno = parseHomeDesign(searchParams.get("diseno") ?? undefined);

  return (
    <aside
      className={cn(
        "flex h-full min-h-0 w-[var(--site-sidebar-width)] shrink-0 flex-col border-r border-[color-mix(in_srgb,var(--primary-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--ds-ink)_88%,var(--ds-red)_12%)]",
        className,
      )}
      aria-label="Menú del portal"
    >
      <Link
        href={homeDesignHref(2)}
        className="flex flex-col items-center gap-3 border-b border-[color-mix(in_srgb,var(--primary-foreground)_12%,transparent)] px-4 py-8"
        onClick={onNavigate}
      >
        <Image
          src={site.logoSrc}
          alt=""
          width={72}
          height={72}
          unoptimized
          className="size-[4.5rem] object-contain"
        />
        <span className="text-center font-display text-h3 font-bold uppercase leading-none tracking-title text-primary-foreground">
          {site.shortName}
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-8">
        {design2PortalNav.map((item) => {
          const href = resolveNavHref(item.href, pathname, diseno);
          return (
            <Link
              key={item.label}
              href={href}
              className={navLink}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          );
        })}
        <div className="my-4 h-px bg-[color-mix(in_srgb,var(--primary-foreground)_18%,transparent)]" />
        <Link
          href="/desing-system"
          className={navLink}
          onClick={onNavigate}
        >
          Sistema de diseño
        </Link>
      </nav>

      <p className="px-5 py-6 text-micro leading-snug text-primary-foreground/55">
        © {site.year} {site.wordmark} · Material de estudio e ilustración
      </p>
    </aside>
  );
}
