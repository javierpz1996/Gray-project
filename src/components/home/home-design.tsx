import type { Design2HeroEyebrowVariantId } from "@/components/home/design-2/design-2-hero-eyebrow";
import { Design2HeroEyebrowPreview } from "@/components/home/design-2/design-2-hero-eyebrow-preview";
import { HomeDesign2Portal } from "@/components/home/design-2/home-design-2-portal";
import { HomeBanner } from "@/components/home/home-banner";
import { PortalSplitHero } from "@/components/home/portal-split-hero";
import { LibrosSection } from "@/components/home/libros-section";
import { HomeSobreMi } from "@/components/home/home-sections";
import type { HomeDesignId } from "@/lib/home-design";

type HomeDesignProps = {
  design: HomeDesignId;
  heroEyebrowVariant?: Design2HeroEyebrowVariantId;
  showHeroEyebrowPreview?: boolean;
};

export function HomeDesign({
  design,
  heroEyebrowVariant = "b",
  showHeroEyebrowPreview = false,
}: HomeDesignProps) {
  if (design === 2) {
    return <HomeDesign2Portal />;
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

  return (
    <>
      <HomeBanner layout="fullscreen" />
      <LibrosSection />
      <HomeSobreMi />
    </>
  );
}
