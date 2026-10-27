import Image from "next/image";
import { site } from "@/config/site";

/** Marco visible del KV diseño 2 (referencia DevTools: 659×857 px). */
const DESIGN2_KV_WIDTH_PX = 659;
const DESIGN2_KV_HEIGHT_PX = 857;

export type HomeBannerLayout = "fullscreen" | "portrait";

type HomeBannerProps = {
  imageSrc?: string;
  imageAlt?: string;
  layout?: HomeBannerLayout;
};

/** Hero de inicio: pantalla completa (1/3) o retrato acotado (diseño 2). */
export function HomeBanner({
  imageSrc,
  imageAlt,
  layout = "fullscreen",
}: HomeBannerProps = {}) {
  const src = imageSrc ?? site.homeBannerSrc;
  const alt = imageAlt ?? site.homeBannerAlt;

  if (layout === "portrait") {
    return (
      <section
        id="inicio"
        className="scroll-mt-[var(--site-header-height)] overflow-visible bg-canvas px-4 pt-[calc(var(--site-header-height)+0.75rem)] pb-16 sm:px-6 sm:pb-20 md:pb-24"
      >
        <div
          className="mx-auto flex max-w-[calc(100vw-2rem)] items-stretch justify-center overflow-visible sm:max-w-[calc(100vw-3rem)]"
        >
          <div
            className="relative aspect-[659/857] w-[min(659px,calc(100vw-5.5rem))] shrink-0 overflow-visible"
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={src}
                alt={alt}
                width={DESIGN2_KV_WIDTH_PX}
                height={DESIGN2_KV_HEIGHT_PX}
                priority
                unoptimized
                sizes={`(max-width: 720px) calc(100vw - 5.5rem), ${DESIGN2_KV_WIDTH_PX}px`}
                className="size-full object-cover object-center"
              />
            </div>
          </div>
          <div
            className="relative w-[3.75rem] shrink-0 self-stretch sm:w-16 md:w-[4.25rem]"
            aria-hidden
          >
            <p
              className="absolute top-[51.5%] left-1/2 w-max max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap font-display text-[clamp(2.55rem,4.85vw,4rem)] font-extrabold uppercase leading-none tracking-[0.22em] text-coral"
            >
              {site.homeBannerDesign2SideLabel}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="inicio"
      className="relative w-full scroll-mt-[var(--site-header-height)] overflow-hidden bg-canvas"
      style={{ minHeight: "100dvh" }}
    >
      <Image
        src={src}
        alt={alt}
        priority
        unoptimized
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
    </section>
  );
}
