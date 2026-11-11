import { Cover2Hero } from "@/components/home/design-2/cover-2-hero";
import { HomeDesign2TriPanelHero } from "@/components/home/design-2/home-design-2-tri-panel-hero";
import { StorySection, type StoryBands } from "@/components/home/design-2/story-section";
import { HomeSobreMi } from "@/components/home/home-sections";
import { HomeSnsSection, type HomeSnsBannerProps } from "@/components/home/sns/home-sns-section";
import type { HomeDesign1HeroAnimationId } from "@/lib/home-design-1-hero-animation";
import type { Cover2LogoMark } from "@/lib/cover-2-logo";
import { cover2SlideSlots, type Cover2MenuItem, type Cover2SlideMotion } from "@/lib/cover-2-menu";
import type { HomeDesign1LogoAnimationId } from "@/lib/home-design-1-logo-animation";

type HomeDesign2PageProps = {
  heroAnimation?: HomeDesign1HeroAnimationId;
  logoAnimation?: HomeDesign1LogoAnimationId;
  cover2Logo?: Cover2LogoMark;
  cover2Stack?: boolean;
  cover2Menu?: Cover2MenuItem[];
  cover2Slides?: number;
  cover2SlideMotion?: Cover2SlideMotion;
  cover2SlideEvery?: number;
  coverOption?: 1 | 2;
  dividerWidth?: number;
  particles?: boolean;
  veil?: boolean;
  halftone?: boolean;
  banner?: HomeSnsBannerProps;
  bands?: StoryBands;
};

/** Copia de la home de diseño 1. Las variantes de esta versión se editan acá. */
export function HomeDesign2Page({
  heroAnimation = 3,
  logoAnimation = 3,
  cover2Logo = "cruce",
  cover2Stack = false,
  cover2Menu,
  cover2Slides = 1,
  cover2SlideMotion = "fundido",
  cover2SlideEvery = 0,
  coverOption = 1,
  dividerWidth,
  particles = true,
  veil = true,
  halftone = true,
  banner,
  bands,
}: HomeDesign2PageProps) {
  return (
    <>
      {coverOption === 2 ? (
        <Cover2Hero
          mark={cover2Logo}
          topSrc={cover2Stack ? "/api/hero-banner/logotop" : null}
          menu={cover2Menu}
          slides={cover2SlideSlots.slice(0, cover2Slides).map((slot) => `/api/hero-banner/${slot}`)}
          slideMotion={cover2SlideMotion}
          slideEvery={cover2SlideEvery}
        />
      ) : (
        <HomeDesign2TriPanelHero
          heroAnimation={heroAnimation}
          logoAnimation={logoAnimation}
          logoSrc="/api/hero-banner/logo"
          dividerWidth={dividerWidth}
          scatterPreset={particles ? "flicker" : null}
          showVeil={veil}
          showHalftone={halftone}
        />
      )}
      <HomeSnsSection {...banner} />
      <StorySection bands={bands} />
      <HomeSobreMi />
    </>
  );
}
