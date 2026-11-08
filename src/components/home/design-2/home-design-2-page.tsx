import { HomeDesign2TriPanelHero } from "@/components/home/design-2/home-design-2-tri-panel-hero";
import { StorySection } from "@/components/home/design-2/story-section";
import { HomeSobreMi } from "@/components/home/home-sections";
import { LibrosShowcaseSection } from "@/components/home/libros-showcase/libros-showcase-section";
import { HomeSnsSection } from "@/components/home/sns/home-sns-section";
import type { HomeDesign1HeroAnimationId } from "@/lib/home-design-1-hero-animation";
import type { HomeDesign1LogoAnimationId } from "@/lib/home-design-1-logo-animation";

type HomeDesign2PageProps = {
  heroAnimation?: HomeDesign1HeroAnimationId;
  logoAnimation?: HomeDesign1LogoAnimationId;
  showLibrosVariantPicker?: boolean;
};

/** Copia de la home de diseño 1. Las variantes de esta versión se editan acá. */
export function HomeDesign2Page({
  heroAnimation = 3,
  logoAnimation = 0,
  showLibrosVariantPicker = false,
}: HomeDesign2PageProps) {
  return (
    <>
      <HomeDesign2TriPanelHero
        heroAnimation={heroAnimation}
        logoAnimation={logoAnimation}
      />
      <HomeSnsSection />
      <LibrosShowcaseSection showVariantPicker={showLibrosVariantPicker} />
      <StorySection />
      <HomeSobreMi />
    </>
  );
}
