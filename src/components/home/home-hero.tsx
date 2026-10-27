import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SiteBrand } from "@/components/layout/site-brand";
import { site } from "@/config/site";
import type { HomeDesignId } from "@/lib/home-design";
import { HOME_CHROME_HEIGHT, homeDesignAnchor } from "@/lib/home-design";

export function HomeHero({ diseno = 1 }: { diseno?: HomeDesignId }) {
  return (
    <section
      id="inicio"
      className="relative flex w-full flex-col justify-end overflow-hidden bg-ink"
      style={{ minHeight: `calc(100dvh - ${HOME_CHROME_HEIGHT})` }}
    >
      <Image
        src={site.heroIllustrationSrc}
        alt={site.heroIllustrationAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-90"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/20"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-site px-6 pb-10 pt-24 md:pb-14">
        <div className="flex flex-col items-center text-center">
          <SiteBrand
            asHeading
            priority
            className="justify-center"
            logoSize="lg"
            logoClassName="!size-20 shadow-elevated ring-2 ring-surface/25"
            wordmarkClassName="text-display font-bold leading-display tracking-title text-surface"
          />
          <p className="mt-4 max-w-md text-small text-surface/80">
            Ilustración y libros de autoría
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={homeDesignAnchor(diseno, "libros")}
            className="inline-flex flex-col items-center gap-2 text-small font-medium text-surface/90 transition-colors duration-150 ease-out hover:text-primary"
          >
            <span>Desliza hacia los libros</span>
            <ChevronDown className="size-5 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
