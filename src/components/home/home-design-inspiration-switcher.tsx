"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  HOME_DESIGN_IDS,
  homeDesignHref,
  parseHomeDesign,
  type HomeDesignId,
} from "@/lib/home-design";
import { cn } from "@/lib/utils";

const designMeta: Record<
  HomeDesignId,
  { title: string; tagline: string; swatchClass: string }
> = {
  1: {
    title: "Geometría",
    tagline: "Tres paneles + logo",
    swatchClass: "home-inspo-switcher__swatch--d1",
  },
  2: {
    title: "Portal",
    tagline: "Sidebar + galería anime",
    swatchClass: "home-inspo-switcher__swatch--d2",
  },
  3: {
    title: "Editorial",
    tagline: "Amarillo + corte diagonal",
    swatchClass: "home-inspo-switcher__swatch--d3",
  },
  10: {
    title: "Diagonal",
    tagline: "Split + comisiones (SATO)",
    swatchClass: "home-inspo-switcher__swatch--d10",
  },
};

/** Barra fija en home para saltar entre diseños 1–3 sin depender del menú. */
export function HomeDesignInspirationSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = parseHomeDesign(searchParams.get("diseno") ?? undefined);

  if (pathname !== "/") {
    return null;
  }

  return (
    <aside
      className="home-inspo-switcher pointer-events-auto"
      aria-label="Inspiración: otros diseños de inicio"
    >
      <p className="home-inspo-switcher__heading">Inspiración</p>
      <div className="home-inspo-switcher__cards">
        {HOME_DESIGN_IDS.map((id) => {
          const meta = designMeta[id];
          const isActive = active === id;
          return (
            <Link
              key={id}
              href={homeDesignHref(id)}
              scroll={false}
              className={cn(
                "home-inspo-switcher__card",
                isActive && "home-inspo-switcher__card--active",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={cn("home-inspo-switcher__swatch", meta.swatchClass)}
                aria-hidden
              />
              <span className="home-inspo-switcher__card-text">
                <span className="home-inspo-switcher__card-id">Diseño {id}</span>
                <span className="home-inspo-switcher__card-title">
                  {meta.title}
                </span>
                <span className="home-inspo-switcher__card-tag">
                  {meta.tagline}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
