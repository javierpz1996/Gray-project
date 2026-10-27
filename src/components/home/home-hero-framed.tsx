import Image from "next/image";
import Link from "next/link";
import { SiteBrand } from "@/components/layout/site-brand";
import { site } from "@/config/site";
import type { HomeDesignId } from "@/lib/home-design";
import { HOME_CHROME_HEIGHT, homeDesignAnchor } from "@/lib/home-design";

/** Diseño 3 — marco editorial sobre fondo claro. */
export function HomeHeroFramed({ diseno = 3 }: { diseno?: HomeDesignId }) {
  return (
    <section
      id="inicio"
      className="bg-canvas px-6 py-10 md:py-14"
      style={{ minHeight: `calc(100dvh - ${HOME_CHROME_HEIGHT})` }}
    >
      <div className="mx-auto flex h-full w-full max-w-site flex-col justify-center">
        <div className="relative overflow-hidden rounded-xl border-2 border-border-strong bg-surface shadow-elevated">
          <div className="relative aspect-[16/10] w-full md:aspect-[21/9]">
            <Image
              src={site.heroIllustrationSrc}
              alt={site.heroIllustrationAlt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 80rem"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-4 border-t border-border p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex flex-col gap-2">
              <SiteBrand
                asHeading
                priority
                logoSize="lg"
                logoClassName="!size-14"
                wordmarkClassName="text-h2 text-fg"
              />
              <p className="text-small text-fg-muted">Ilustración y libros</p>
            </div>
            <Link
              href={homeDesignAnchor(diseno, "libros")}
              className="text-small font-medium text-primary underline-offset-4 hover:underline"
            >
              Ir a libros →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
