"use client";

import Link from "next/link";
import { useState } from "react";
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
import {
  design2HeroPromoLayouts,
  parseDesign2HeroPromoLayout,
} from "@/lib/design-2-hero-promo-layout";
import {
  design2HeroScatterPresets,
  parseDesign2HeroScatterPreset,
} from "@/lib/design-2-hero-scatter-preset";
import { parseHomeDesign } from "@/lib/home-design";
import { cn } from "@/lib/utils";

type HeroLabDesign = 1 | 2 | 10;

/** Selector visible en el hero para comparar animaciones. */
export function HomeDesign1HeroAnimationLab({
  design = 1,
}: {
  design?: HeroLabDesign;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(true);
  const diseno = parseHomeDesign(searchParams.get("diseno") ?? undefined);
  const activeHero = parseHomeDesign1HeroAnimation(
    searchParams.get("hero") ?? undefined,
  );
  const activeLogo = parseHomeDesign1LogoAnimation(
    searchParams.get("logo") ?? undefined,
  );
  const activeCartel = parseDesign2HeroPromoLayout(
    searchParams.get("cartel") ?? undefined,
  );
  const activeParticulas = parseDesign2HeroScatterPreset(
    searchParams.get("particulas") ?? undefined,
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
      <button
        type="button"
        className="home-design-1-hero-lab__toggle"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "Ocultar animaciones" : "Animaciones hero"}
      </button>
      {open ? (
      <>
      <div className="home-design-1-hero-lab__scroll">
      <p className="home-design-1-hero-lab__title">Animaciones hero</p>
      <div className="home-design-1-hero-lab__grid">
        {homeDesign1HeroAnimations.map((entry) => (
          <Link
            key={entry.id}
            href={homeDesign1Href({
              design,
              hero: entry.id,
              logo: activeLogo,
              cartel: design === 2 ? activeCartel : undefined,
              particulas: design === 2 ? activeParticulas : undefined,
            })}
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
      {design === 1 || design === 2 ? (
        <>
          <p className="home-design-1-hero-lab__title home-design-1-hero-lab__title--section">
            Animaciones logo
          </p>
          <div className="home-design-1-hero-lab__grid">
            {homeDesign1LogoAnimations.map((entry) => (
              <Link
                key={entry.id}
                href={homeDesign1Href({
                  design,
                  hero: activeHero,
                  logo: entry.id,
                  cartel: design === 2 ? activeCartel : undefined,
                  particulas: design === 2 ? activeParticulas : undefined,
                })}
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
      {design === 2 ? (
        <>
          <p className="home-design-1-hero-lab__title home-design-1-hero-lab__title--section">
            Carteles izquierda
          </p>
          <div className="home-design-1-hero-lab__grid">
            {design2HeroPromoLayouts.map((entry) => (
              <Link
                key={entry.id}
                href={homeDesign1Href({
                  design: 2,
                  hero: activeHero,
                  logo: activeLogo,
                  cartel: entry.id,
                  particulas: activeParticulas,
                })}
                scroll={false}
                className={cn(
                  "home-design-1-hero-lab__chip",
                  activeCartel === entry.id &&
                    "home-design-1-hero-lab__chip--active",
                )}
                aria-current={activeCartel === entry.id ? "true" : undefined}
                title={entry.hint}
              >
                {entry.label}
              </Link>
            ))}
          </div>
          <p className="home-design-1-hero-lab__title home-design-1-hero-lab__title--section">
            Partículas (salpicaduras)
          </p>
          <div className="home-design-1-hero-lab__grid">
            {design2HeroScatterPresets.map((entry) => (
              <Link
                key={entry.id}
                href={homeDesign1Href({
                  design: 2,
                  hero: activeHero,
                  logo: activeLogo,
                  cartel: activeCartel,
                  particulas: entry.id,
                })}
                scroll={false}
                className={cn(
                  "home-design-1-hero-lab__chip",
                  activeParticulas === entry.id &&
                    "home-design-1-hero-lab__chip--active",
                )}
                aria-current={
                  activeParticulas === entry.id ? "true" : undefined
                }
                title={entry.hint}
              >
                {entry.label}
              </Link>
            ))}
          </div>
        </>
      ) : null}
      </div>
      </>
      ) : null}
    </div>
  );
}
