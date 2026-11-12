import { Cover2Hero } from "@/components/home/design-2/cover-2-hero";
import { HomeDesign2TriPanelHero } from "@/components/home/design-2/home-design-2-tri-panel-hero";
import { StorySection, type StoryBands } from "@/components/home/design-2/story-section";
import { HomeSobreMi } from "@/components/home/home-sections";
import { HomeSnsSection, type HomeSnsBannerProps } from "@/components/home/sns/home-sns-section";
import type { HomeDesign1HeroAnimationId } from "@/lib/home-design-1-hero-animation";
import type { Cover2LogoMark } from "@/lib/cover-2-logo";
import { cover2SlideSlots, type Cover2MenuItem, type Cover2SlideMotion } from "@/lib/cover-2-menu";
import type { HomeDesign1LogoAnimationId } from "@/lib/home-design-1-logo-animation";
import "./design-2-stock.css";

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
  heroPhotos?: Partial<Record<"left" | "center" | "right", string>>;
  heroLogo?: string;
  mediaStamp?: string;
  banner?: HomeSnsBannerProps;
  bands?: StoryBands;
  /** Sin las imágenes subidas a la base: usa los archivos de `public/media`. */
  stockMedia?: boolean;
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
  heroPhotos,
  heroLogo = "/api/hero-banner/logo",
  mediaStamp = "0",
  banner,
  bands,
  stockMedia = false,
}: HomeDesign2PageProps) {
  const stockPhotos = {
    left: "/media/hero/panel-izquierda.png",
    center: "/media/hero/panel-centro.png",
    right: "/media/hero/panel-derecha.png",
  };
  const stockSlides = [
    "/media/hero/banner.png",
    "/media/hero/collage.png",
    "/media/hero/ilustracion-paneles.png",
    "/media/redes/banner.jpg",
    "/media/libros/completo.jpg",
    "/media/libros/fondo.png",
  ];
  const stockOmsSlides = [
    "/media/colors/verde_salvia_C7D2C0.png",
    "/media/colors/durazno_F2D2BD.png",
  ];
  const sns = stockMedia
    ? {
        ...banner,
        banners: [
          "/media/colors/verde_salvia_C7D2C0.png",
          "/media/colors/durazno_F2D2BD.png",
          "/media/colors/azul_cielo_C8DCE8.png",
        ] as [string, string, string],
        mode: "pattern" as const,
        frame: "none" as const,
        shadow: "none" as const,
        motion: "off" as const,
        tile: null,
        background: null,
      }
    : banner;
  const storyBands = stockMedia
    ? { ...bands, src1: "/media/decoracion/banda.png", src2: "/media/decoracion/banda.png" }
    : bands;

  const page = (
    <>
      {coverOption === 2 ? (
        <Cover2Hero
          mark={cover2Logo}
          topSrc={cover2Stack ? (stockMedia ? "/media/marca/logo-secundario.png" : `/api/hero-banner/logotop?v=${mediaStamp}`) : null}
          menu={cover2Menu}
          slides={
            stockMedia
              ? stockOmsSlides
              : cover2SlideSlots.slice(0, cover2Slides).map((slot) => `/api/hero-banner/${slot}?v=${mediaStamp}`)
          }
          slideMotion={cover2SlideMotion}
          slideEvery={stockMedia ? 5 : cover2SlideEvery}
          backdrop={null}
          slantRail={stockMedia}
        />
      ) : (
        <HomeDesign2TriPanelHero
          heroAnimation={heroAnimation}
          logoAnimation={logoAnimation}
          logoSrc={stockMedia ? "/media/marca/logo.png" : heroLogo}
          dividerWidth={dividerWidth}
          scatterPreset={particles ? "flicker" : null}
          showVeil={veil}
          showHalftone={halftone}
          photos={stockMedia ? stockPhotos : heroPhotos}
        />
      )}
      <HomeSnsSection {...sns} />
      <StorySection bands={storyBands} stockMedia={stockMedia} />
      <HomeSobreMi />
    </>
  );

  return stockMedia ? <div className="design-2-stock">{page}</div> : page;
}
