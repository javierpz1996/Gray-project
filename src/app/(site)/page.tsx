import { Suspense } from "react";
import { HomeDesign } from "@/components/home/home-design";
import { SiteLoadingIntro } from "@/components/layout/site-loading-intro";
import { readHeroCoverConfig } from "@/lib/hero-config";
import { readLibrosBands } from "@/lib/libros-bands";
import { parseHomeDesign1LogoAnimation } from "@/lib/home-design-1-logo-animation";

async function HomePageContent({
  searchParams,
}: {
  searchParams: PageProps<"/">["searchParams"];
}) {
  const params = await searchParams;
  const cover = await readHeroCoverConfig();
  const bands = await readLibrosBands();
  const logoAnimation = params.logo == null ? cover.logoAnimation : parseHomeDesign1LogoAnimation(params.logo);

  return (
    <HomeDesign
      heroAnimation={cover.heroAnimation}
      logoAnimation={logoAnimation}
      cover2Logo={cover.cover2Logo}
      cover2Stack={cover.cover2Stack}
      cover2Menu={cover.cover2Menu}
      cover2Slides={cover.cover2Slides}
      cover2SlideMotion={cover.cover2SlideMotion}
      cover2SlideEvery={cover.cover2SlideEvery}
      coverOption={cover.coverOption}
      dividerWidth={cover.dividerWidth}
      particles={cover.particles}
      veil={cover.veil}
      halftone={cover.halftone}
      banner={{
        banners: ["/api/hero-banner/1", "/api/hero-banner/2", "/api/hero-banner/3"],
        mode: cover.bannerMode,
        pattern: cover.bannerPattern,
        color: cover.bannerColor,
        base: cover.bannerBase,
        shade: cover.bannerShade,
        positions: cover.bannerPositions,
        links: cover.bannerLinks,
        motion: cover.bannerMotion,
        tile: cover.bannerPattern === "custom" ? "/api/hero-banner/tile" : null,
        tileSize: cover.bannerTile,
        tileGap: cover.bannerGap,
        speed: cover.bannerSpeed,
        frame: cover.bannerFrame,
        shadow: cover.bannerShadow,
        frameColor: cover.bannerFrameColor,
        hover: cover.bannerHover,
        background: cover.bannerMode === "image" ? "/api/hero-banner/bg" : null,
      }}
      bands={{
        src1: "/api/hero-banner/banda1",
        src2: "/api/hero-banner/banda2",
        speed1: bands.speed1,
        speed2: bands.speed2,
        size1: bands.size1,
        size2: bands.size2,
        top1: bands.top1,
        top2: bands.top2,
        tilt1: bands.tilt1,
        tilt2: bands.tilt2,
        opacity1: bands.opacity1,
        opacity2: bands.opacity2,
        bright1: bands.bright1,
        bright2: bands.bright2,
        lead: bands.lead,
        stories: bands.stories,
        heading: bands.heading,
      }}
    />
  );
}

function HomePageFallback() {
  return (
    <div
      className="min-h-[50vh] bg-canvas"
      aria-busy="true"
      aria-label="Cargando inicio"
    />
  );
}

export default function Page({ searchParams }: PageProps<"/">) {
  return (
    <>
      <SiteLoadingIntro />
      <Suspense fallback={<HomePageFallback />}>
        <HomePageContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
