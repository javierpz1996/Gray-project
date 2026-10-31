import type { Design2HeroEyebrowVariantId } from "@/components/home/design-2/design-2-hero-eyebrow";
import { Design2HeroEyebrowPreview } from "@/components/home/design-2/design-2-hero-eyebrow-preview";
import { HomeDesign2Portal } from "@/components/home/design-2/home-design-2-portal";
import { HomeDesign1TriPanelHero } from "@/components/home/home-design-1-tri-panel-hero";
import { PortalSplitHero } from "@/components/home/portal-split-hero";
import { LibrosSection } from "@/components/home/libros-section";
import { HomeSobreMi } from "@/components/home/home-sections";
import { HomeDesign10Hero } from "@/components/home/design-10/home-design-10-hero";
import type { HomeDesignId } from "@/lib/home-design";
import type { HomeDesign1HeroAnimationId } from "@/lib/home-design-1-hero-animation";
import type { HomeDesign1LogoAnimationId } from "@/lib/home-design-1-logo-animation";

type HomeDesignProps = {
  design: HomeDesignId;
  heroAnimation?: HomeDesign1HeroAnimationId;
  logoAnimation?: HomeDesign1LogoAnimationId;
  heroEyebrowVariant?: Design2HeroEyebrowVariantId;
  showHeroEyebrowPreview?: boolean;
};

export function HomeDesign({
  design,
  heroAnimation = 3,
  logoAnimation = 0,
  heroEyebrowVariant = "b",
  showHeroEyebrowPreview = false,
}: HomeDesignProps) {
  if (design === 2) {
    return (
      <>
        <HomeDesign2Portal />
      </>
    );
  }

  if (design === 3) {
    return (
      <>
        {showHeroEyebrowPreview ? (
          <Design2HeroEyebrowPreview activeVariant={heroEyebrowVariant} />
        ) : null}
        <PortalSplitHero
          design={3}
          layout="under-header"
          heroEyebrowVariant={heroEyebrowVariant}
        />
        <LibrosSection />
        <HomeSobreMi />
      </>
    );
  }

  if (design === 10) {
    return (
      <div className="home-design-10-shell">
        <HomeDesign10Hero heroAnimation={heroAnimation} />
        <LibrosSection />
        <HomeSobreMi />
      </div>
    );
  }

  return (
    <>
      <HomeDesign1TriPanelHero
        heroAnimation={heroAnimation}
        logoAnimation={logoAnimation}
      />
      <LibrosSection />
      <HomeSobreMi />
    </>
  );
}
