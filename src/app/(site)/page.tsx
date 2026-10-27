import { Suspense } from "react";
import { parseDesign2HeroEyebrowVariant } from "@/components/home/design-2/design-2-hero-eyebrow";
import { HomeDesign } from "@/components/home/home-design";
import { parseHomeDesign } from "@/lib/home-design";

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
  const heroEyebrowVariant = parseDesign2HeroEyebrowVariant(
    firstParam(params.eyebrow),
  );
  const showHeroEyebrowPreview =
    design === 3 && firstParam(params.eyebrowPreview) === "1";

  return (
    <HomeDesign
      design={design}
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
    <Suspense fallback={<HomePageFallback />}>
      <HomePageContent searchParams={searchParams} />
    </Suspense>
  );
}
