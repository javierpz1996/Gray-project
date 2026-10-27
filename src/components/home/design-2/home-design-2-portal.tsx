import { Design2PortalChrome } from "@/components/home/design-2/design-2-portal-chrome";
import { HomeLibrosCarousel } from "@/components/home/home-libros-carousel";
import { HomeSobreMi } from "@/components/home/home-sections";
import {
  Design2Hero,
  Design2Series,
} from "@/components/home/design-2/design-2-sections";

/** Home diseño 2 — layout portal (referencia demonslayer-anime.com). */
export function HomeDesign2Portal() {
  return (
    <>
      <Design2PortalChrome />
      <div
        className="design-2-portal min-h-[100dvh] bg-[color-mix(in_srgb,var(--ds-ink)_94%,var(--ds-red)_6%)] pt-[var(--site-header-height)] text-primary-foreground lg:pt-0 lg:pl-[var(--site-sidebar-width)]"
      >
      <Design2Hero />
      <Design2Series />
      <div
        id="videos"
        className="scroll-mt-[var(--site-header-height)] lg:scroll-mt-6"
      >
        <p
          className="bg-[color-mix(in_srgb,var(--ds-ink)_88%,var(--ds-ink-soft)_12%)] px-6 py-3 font-sans text-micro font-extrabold uppercase tracking-[0.2em] text-primary-foreground md:px-10"
        >
          Trailer
        </p>
        <HomeLibrosCarousel />
      </div>
      <HomeSobreMi />
      </div>
    </>
  );
}
