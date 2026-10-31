import { Suspense } from "react";
import { parseDesign2HeroEyebrowVariant } from "@/components/home/design-2/design-2-hero-eyebrow";
import { HomeDesign } from "@/components/home/home-design";
import { SiteLoadingIntro } from "@/components/layout/site-loading-intro";
import { parseHomeDesign } from "@/lib/home-design";
import { parseHomeDesign1HeroAnimation } from "@/lib/home-design-1-hero-animation";
import { parseHomeDesign1LogoAnimation } from "@/lib/home-design-1-logo-animation";

function firstParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

async function HomePageContent({
  searchParams,
}: {
  searchParams: PageProps<"/">["searchParams"];
}) {
  const params = await searchParams;
  const design = parseHomeDesign(params.diseno);
  const heroAnimation = parseHomeDesign1HeroAnimation(params.hero);
  const logoAnimation = parseHomeDesign1LogoAnimation(params.logo);
  const heroEyebrowVariant = parseDesign2HeroEyebrowVariant(
    firstParam(params.eyebrow),
  );
  const showHeroEyebrowPreview =
    design === 3 && firstParam(params.eyebrowPreview) === "1";

  return (
    <HomeDesign
      design={design}
      heroAnimation={design === 1 || design === 10 ? heroAnimation : 3}
      logoAnimation={design === 1 ? logoAnimation : 0}
      heroEyebrowVariant={heroEyebrowVariant}
      showHeroEyebrowPreview={showHeroEyebrowPreview}
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
