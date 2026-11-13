import { Cover2Hero } from "@/components/home/design-2/cover-2-hero";
import { Cover2KillBlueStrip } from "@/components/home/design-2/cover-2-kill-blue-strip";
import { Design2XSeparator } from "@/components/home/design-2/design-2-x-separator";
import { HomeDesign2TriPanelHero } from "@/components/home/design-2/home-design-2-tri-panel-hero";
import { StorySection, type StoryBands } from "@/components/home/design-2/story-section";
import { HomeSobreMi } from "@/components/home/home-sections";
import { HomeSnsSection, type HomeSnsBannerProps } from "@/components/home/sns/home-sns-section";
import type { HomeDesign1HeroAnimationId } from "@/lib/home-design-1-hero-animation";
import type { Cover2LogoMark } from "@/lib/cover-2-logo";
import { cover2SlideSlots, type Cover2MenuItem, type Cover2SlideMotion } from "@/lib/cover-2-menu";
import type { HomeDesign1LogoAnimationId } from "@/lib/home-design-1-logo-animation";
import type { Cover2SlantHalftoneId } from "@/lib/cover-2-slant-halftone";
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
  slantHalftone?: Cover2SlantHalftoneId;
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
  slantHalftone = 3,
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
  const stockKbHero = "/media/diseno2/heroimage-test.png";
  const sns = stockMedia
    ? {
        ...banner,
        banners: [
          "/media/diseno2/bannerexample.jpg",
          "/media/diseno2/bannerexample.jpg",
          "/media/diseno2/banner-test3.png",
          "/media/diseno2/bannerexample.jpg",
        ],
        mode: "pattern" as const,
        frame: "none" as const,
        shadow: "none" as const,
        motion: "off" as const,
        tile: null,
        background: null,
        kicker: "NOVEDADES",
        kbBannerNav: true,
      }
    : banner;
  const storyBands = stockMedia
    ? { ...bands, src1: "/media/decoracion/banda.png", src2: "/media/decoracion/banda.png" }
    : bands;

  const cover2Hero = (
    <Cover2Hero
      mark={cover2Logo}
      topSrc={cover2Stack ? (stockMedia ? "/media/marca/logo-secundario.png" : `/api/hero-banner/logotop?v=${mediaStamp}`) : null}
      menu={cover2Menu}
      slides={
        stockMedia
          ? [stockKbHero]
          : cover2SlideSlots.slice(0, cover2Slides).map((slot) => `/api/hero-banner/${slot}?v=${mediaStamp}`)
      }
      kbHeroSrc={stockMedia ? stockKbHero : undefined}
      kbAside={
        stockMedia
          ? {
              videoSrc: "/media/videos/muestra.mp4",
              itemsSrc: "/media/diseno2/heroitems.jpg",
              videoLabel: "FUNDAMENTOS ANATOMIA",
            }
          : null
      }
      slideMotion={cover2SlideMotion}
      slideEvery={cover2SlideEvery}
      backdrop={null}
      slantRail={stockMedia}
      slantKillBlue={stockMedia}
      embedKillBlueStrip={!(coverOption === 2 && stockMedia)}
      slantHalftone={slantHalftone}
      slantHalftonePicker={false}
    />
  );

  const page = (
    <>
      {coverOption === 2 ? (
        stockMedia ? (
          <div className="cover-2-kb-rail-zone">
            <Cover2KillBlueStrip />
            {cover2Hero}
            <HomeSnsSection {...sns} />
            <div className="cover-2-kb-tear" aria-hidden="true">
              <div className="cover-2-kb-tear__under" />
              <img className="cover-2-kb-tear__lip" src="/media/diseno2/borde-paper-lip.png" alt="" />
            </div>
          </div>
        ) : (
          cover2Hero
        )
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
      {!(coverOption === 2 && stockMedia) ? <HomeSnsSection {...sns} /> : null}
      <Design2XSeparator />
      <StorySection bands={storyBands} stockMedia={stockMedia} />
      <HomeSobreMi />
    </>
  );

  const stockWrap =
    coverOption === 2 && stockMedia ? "design-2-stock design-2-stock--kb-rail" : "design-2-stock";

  return stockMedia ? <div className={stockWrap}>{page}</div> : page;
}
