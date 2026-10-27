import { HomeBanner } from "@/components/home/home-banner";
import { HomeLibrosCarousel } from "@/components/home/home-libros-carousel";
import { LibrosSection } from "@/components/home/libros-section";
import { HomeSobreMi } from "@/components/home/home-sections";
import { site } from "@/config/site";
import type { HomeDesignId } from "@/lib/home-design";

export function HomeDesign({ design }: { design: HomeDesignId }) {
  const isDesign2 = design === 2;

  return (
    <>
      <HomeBanner
        layout={isDesign2 ? "portrait" : "fullscreen"}
        imageSrc={isDesign2 ? site.homeBannerDesign2Src : undefined}
        imageAlt={isDesign2 ? site.homeBannerDesign2Alt : undefined}
      />
      {isDesign2 ? <HomeLibrosCarousel /> : null}
      <LibrosSection />
      <HomeSobreMi />
    </>
  );
}
