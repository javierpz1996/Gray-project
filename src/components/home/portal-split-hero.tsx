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
  return (
    <div
      id="noticias"
      className="mt-8 w-full max-w-lg scroll-mt-[var(--site-header-height)] lg:mt-9"
    >
      <Link
        href={homeDesignAnchor(design, "libros")}
        className="inline-flex w-fit bg-ds-yellow px-2 py-0.5 font-sans text-micro font-extrabold uppercase tracking-[0.1em] text-ink shadow-[0_2px_0_color-mix(in_srgb,var(--ds-ink)_35%,transparent)] transition-opacity duration-150 ease-out hover:opacity-90 motion-reduce:transition-none"
      >
        {design2PortalHero.newsIndexLabel}
      </Link>
      <ul className="mt-3 flex list-none flex-col gap-0 p-0">
        {design2PortalNews.map((item) => (
          <li
            key={item.pageRange}
            className="grid grid-cols-[auto_auto_1fr] items-start gap-x-2.5 border-t border-[color-mix(in_srgb,var(--ds-yellow)_28%,var(--primary-foreground)_72%)] py-2 first:border-t-0 md:gap-x-3 md:py-2.5"
          >
            <span
              className="font-sans text-[0.5625rem] font-bold tracking-[0.18em] text-ds-yellow/70 [writing-mode:vertical-rl] rotate-180"
              aria-hidden
            >
              Pags
            </span>
            <span
              className="font-sans text-small font-extrabold leading-none tracking-tight text-ds-yellow md:text-h3"
            >
              {item.pageRange}
            </span>
            <p className="font-sans text-micro leading-snug text-primary-foreground md:text-small">
              <span className="font-semibold">{item.heading}:</span>{" "}
              <span className="font-normal text-primary-foreground/85">
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

  return (
    <section
      id="inicio"
      className={cn(
        "grid w-full bg-ink text-primary-foreground",
        underHeader && "scroll-mt-[var(--site-header-height)]",
        underHeader
          ? "lg:min-h-[min(calc(100dvh-var(--site-header-height)),56rem)]"
          : "lg:min-h-[min(100dvh,56rem)]",
        "lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          underHeader
            ? "min-h-[min(70vh,26rem)] lg:min-h-0 lg:h-full"
            : "min-h-[min(72vh,28rem)] lg:min-h-0 lg:h-full",
        )}
      >
        <PortalSplitHeroVisual />
      </div>

      <div className="design-2-hero-panel relative flex min-h-0 flex-col">
        <div className="design-2-hero-panel__surface" aria-hidden />
        <div
          className="relative z-[1] flex w-full flex-col items-start px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14"
        >
          <Design2HeroTrailer eyebrowVariant={heroEyebrowVariant} />
          <PortalSplitHeroNews design={design} />
        </div>
      </div>
    </section>
  );
}
