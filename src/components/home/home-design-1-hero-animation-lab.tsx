"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  homeDesign1HeroAnimations,
  parseHomeDesign1HeroAnimation,
} from "@/lib/home-design-1-hero-animation";
import {
  homeDesign1Href,
  homeDesign1LogoAnimations,
  parseHomeDesign1LogoAnimation,
} from "@/lib/home-design-1-logo-animation";
import { homeDesignHref, parseHomeDesign } from "@/lib/home-design";
import { cn } from "@/lib/utils";

type HeroLabDesign = 1 | 10;

const OTHER_DESIGNS: Record<HeroLabDesign, readonly (1 | 2 | 3 | 10)[]> = {
  1: [2, 3, 10],
  10: [1, 2, 3],
};

/** Selector visible en el hero (diseños 1 y 10) para comparar animaciones. */
export function HomeDesign1HeroAnimationLab({
  design = 1,
}: {
  design?: HeroLabDesign;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const diseno = parseHomeDesign(searchParams.get("diseno") ?? undefined);
  const activeHero = parseHomeDesign1HeroAnimation(
    searchParams.get("hero") ?? undefined,
  );
  const activeLogo = parseHomeDesign1LogoAnimation(
    searchParams.get("logo") ?? undefined,
  );

  if (pathname !== "/" || diseno !== design) {
    return null;
  }

  return (
    <div
      className={cn(
        "home-design-1-hero-lab pointer-events-auto",
        design === 10 && "home-design-10-hero-lab",
      )}
      aria-label="Laboratorio de animaciones del hero"
    >
      <p className="home-design-1-hero-lab__title">Animaciones hero</p>
      <div className="home-design-1-hero-lab__grid">
        {homeDesign1HeroAnimations.map((entry) => (
          <Link
            key={entry.id}
            href={homeDesign1Href({ design, hero: entry.id, logo: activeLogo })}
            scroll={false}
            className={cn(
              "home-design-1-hero-lab__chip",
              activeHero === entry.id && "home-design-1-hero-lab__chip--active",
            )}
            aria-current={activeHero === entry.id ? "true" : undefined}
            title={entry.hint}
          >
            {entry.label}
          </Link>
        ))}
      </div>
      {design === 1 ? (
        <>
          <p className="home-design-1-hero-lab__title home-design-1-hero-lab__title--section">
            Animaciones logo
          </p>
          <div className="home-design-1-hero-lab__grid">
            {homeDesign1LogoAnimations.map((entry) => (
              <Link
                key={entry.id}
                href={homeDesign1Href({ design, hero: activeHero, logo: entry.id })}
                scroll={false}
                className={cn(
                  "home-design-1-hero-lab__chip",
                  activeLogo === entry.id && "home-design-1-hero-lab__chip--active",
                )}
                aria-current={activeLogo === entry.id ? "true" : undefined}
                title={entry.hint}
              >
                {entry.label}
              </Link>
            ))}
          </div>
        </>
      ) : null}
      <div className="home-design-1-hero-lab__designs">
        <span className="home-design-1-hero-lab__designs-label">Otros diseños</span>
        {OTHER_DESIGNS[design].map((id) => (
          <Link
            key={id}
            href={homeDesignHref(id)}
            className="home-design-1-hero-lab__design-link"
          >
            {id}
          </Link>
        ))}
      </div>
    </div>
  );
}
