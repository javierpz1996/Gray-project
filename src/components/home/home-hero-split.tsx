import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SiteBrand } from "@/components/layout/site-brand";
import { site } from "@/config/site";
import type { HomeDesignId } from "@/lib/home-design";
import { HOME_CHROME_HEIGHT, homeDesignAnchor } from "@/lib/home-design";

/** Diseño 2 — ilustración y marca en dos columnas. */
export function HomeHeroSplit({ diseno = 2 }: { diseno?: HomeDesignId }) {
  return (
    <section
      id="inicio"
      className="grid min-h-[var(--home-min-h)] grid-cols-1 bg-canvas md:grid-cols-2"
      style={
        {
          "--home-min-h": `calc(100dvh - ${HOME_CHROME_HEIGHT})`,
        } as CSSProperties
      }
    >
      <div className="relative min-h-[50vh] md:min-h-0">
        <Image
          src={site.heroIllustrationSrc}
          alt={site.heroIllustrationAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center px-6 py-12 md:px-10 md:py-16">
        <SiteBrand
          asHeading
          priority
          logoSize="lg"
          logoClassName="!size-[4.5rem]"
          wordmarkClassName="text-h1 text-fg md:text-display md:leading-display"
        />
        <p className="mt-4 max-w-prose text-lead text-fg-muted">
          Ilustración y libros de autoría. Edición completa o por temas.
        </p>
        <Link
          href={homeDesignAnchor(diseno, "libros")}
          className="mt-10 inline-flex items-center gap-2 text-small font-medium text-primary underline-offset-4 hover:underline"
        >
          Ver libros
          <ChevronDown className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
