import { HomeDesign2Page } from "@/components/home/design-2/home-design-2-page";
import type { StoryBands } from "@/components/home/design-2/story-section";
import type { HomeSnsBannerProps } from "@/components/home/sns/home-sns-section";
import type { HomeDesign1HeroAnimationId } from "@/lib/home-design-1-hero-animation";
import type { Cover2LogoMark } from "@/lib/cover-2-logo";
import type { Cover2MenuItem, Cover2SlideMotion } from "@/lib/cover-2-menu";
import type { HomeDesign1LogoAnimationId } from "@/lib/home-design-1-logo-animation";

type HomeDesignProps = {
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
  heroPhotos?: Partial<Record<"left" | "center" | "right", string>>;
  heroLogo?: string;
  mediaStamp?: string;
  banner?: HomeSnsBannerProps;
  bands?: StoryBands;
  stockMedia?: boolean;
};

export function HomeDesign({
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
  heroPhotos,
  heroLogo,
  mediaStamp = "0",
  banner,
  bands,
  stockMedia = false,
}: HomeDesignProps) {
  return (
    <HomeDesign2Page
      heroAnimation={heroAnimation}
      logoAnimation={logoAnimation}
      cover2Logo={cover2Logo}
      cover2Stack={cover2Stack}
      cover2Menu={cover2Menu}
      cover2Slides={cover2Slides}
      cover2SlideMotion={cover2SlideMotion}
      cover2SlideEvery={cover2SlideEvery}
      coverOption={coverOption}
      dividerWidth={dividerWidth}
      particles={particles}
      veil={veil}
      halftone={halftone}
      heroPhotos={heroPhotos}
      heroLogo={heroLogo}
      mediaStamp={mediaStamp}
      banner={banner}
      bands={bands}
      stockMedia={stockMedia}
    />
  );
}
