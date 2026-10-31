import Link from "next/link";
import type { Design2HeroEyebrowVariantId } from "@/components/home/design-2/design-2-hero-eyebrow";
import { Design2HeroTrailer } from "@/components/home/design-2/design-2-hero-trailer";
import { PortalSplitHeroVisual } from "@/components/home/portal-split-hero-visual";
import {
  design2PortalHero,
  design2PortalNews,
} from "@/content/design-2-portal";
import type { HomeDesignId } from "@/lib/home-design";
import { homeDesignAnchor } from "@/lib/home-design";
import { cn } from "@/lib/utils";

function PortalSplitHeroNews({ design }: { design: HomeDesignId }) {
  const editorial = design === 3;

  return (
    <div
      id="noticias"
      className="mt-8 w-full max-w-lg scroll-mt-[var(--site-header-height)] lg:mt-9"
    >
      <Link
        href={homeDesignAnchor(design, "libros")}
        className={cn(
          "inline-flex w-fit px-2 py-0.5 font-sans text-micro font-extrabold uppercase tracking-[0.1em] shadow-[0_2px_0_color-mix(in_srgb,var(--ds-ink)_35%,transparent)] transition-opacity duration-150 ease-out hover:opacity-90 motion-reduce:transition-none",
          editorial
            ? "bg-ds-red text-primary-foreground"
            : "bg-ds-yellow text-ink",
        )}
      >
        {design2PortalHero.newsIndexLabel}
      </Link>
      <ul className="mt-3 flex list-none flex-col gap-0 p-0">
        {design2PortalNews.map((item) => (
          <li
            key={item.pageRange}
            className={cn(
              "grid grid-cols-[auto_auto_1fr] items-start gap-x-2.5 py-2 first:border-t-0 md:gap-x-3 md:py-2.5",
              editorial
                ? "border-t border-[color-mix(in_srgb,var(--ds-ink)_22%,transparent)]"
                : "border-t border-[color-mix(in_srgb,var(--ds-yellow)_28%,var(--primary-foreground)_72%)]",
            )}
          >
            <span
              className={cn(
                "font-sans text-[0.5625rem] font-bold tracking-[0.18em] [writing-mode:vertical-rl] rotate-180",
                editorial ? "text-ds-red/80" : "text-ds-yellow/70",
              )}
              aria-hidden
            >
              Pags
            </span>
            <span
              className={cn(
                "font-sans text-small font-extrabold leading-none tracking-tight md:text-h3",
                editorial ? "text-ds-red" : "text-ds-yellow",
              )}
            >
              {item.pageRange}
            </span>
            <p
              className={cn(
                "font-sans text-micro leading-snug md:text-small",
                editorial ? "text-ink" : "text-primary-foreground",
              )}
            >
              <span className="font-semibold">{item.heading}:</span>{" "}
              <span
                className={cn(
                  "font-normal",
                  editorial ? "text-ink/75" : "text-primary-foreground/85",
                )}
              >
                {item.description}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

type PortalSplitHeroProps = {
  design: HomeDesignId;
  /** Diseño 3: hero bajo navbar global fijo. Diseño 2: dentro del portal sin header. */
  layout?: "portal" | "under-header";
  heroEyebrowVariant?: Design2HeroEyebrowVariantId;
};

/** Hero en dos columnas (arte + trailer/noticias), referencia portal anime. */
export function PortalSplitHero({
  design,
  layout = "portal",
  heroEyebrowVariant = "b",
}: PortalSplitHeroProps) {
  const underHeader = layout === "under-header";

  const isDesign3 = design === 3;

  return (
    <section
      id="inicio"
      className={cn(
        "portal-split-hero grid w-full bg-ink text-primary-foreground",
        isDesign3 && "portal-split-hero--design-3",
        underHeader && "scroll-mt-[var(--site-header-height)]",
        underHeader
          ? "lg:min-h-[min(calc(100dvh-var(--site-header-height)),56rem)]"
          : "lg:min-h-[min(100dvh,56rem)]",
        isDesign3
          ? "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
          : "lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]",
      )}
    >
      <div
        className={cn(
          "portal-split-hero__visual relative overflow-hidden",
          isDesign3 && "portal-split-hero__visual--diagonal lg:order-2",
          underHeader
            ? "min-h-[min(70vh,26rem)] lg:min-h-0 lg:h-full"
            : "min-h-[min(72vh,28rem)] lg:min-h-0 lg:h-full",
        )}
      >
        <PortalSplitHeroVisual />
      </div>

      <div
        className={cn(
          "relative flex min-h-0 flex-col",
          isDesign3
            ? "design-3-hero-panel lg:order-1"
            : "design-2-hero-panel",
          isDesign3 && "text-ink",
        )}
      >
        <div
          className={
            isDesign3
              ? "design-3-hero-panel__surface"
              : "design-2-hero-panel__surface"
          }
          aria-hidden
        />
        <div
          className="relative z-[1] flex w-full flex-col items-start px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14"
        >
          <Design2HeroTrailer
            eyebrowVariant={heroEyebrowVariant}
            panelTone={isDesign3 ? "light" : "dark"}
          />
          <PortalSplitHeroNews design={design} />
        </div>
      </div>
    </section>
  );
}
