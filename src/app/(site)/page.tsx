import { Suspense } from "react";
import { HomeDesign } from "@/components/home/home-design";
import { parseHomeDesign } from "@/lib/home-design";

async function HomePageContent({
  searchParams,
}: {
  searchParams: PageProps<"/">["searchParams"];
}) {
  const params = await searchParams;
  const design = parseHomeDesign(params.diseno);

  return <HomeDesign design={design} />;
}

export default function Page({ searchParams }: PageProps<"/">) {
  return (
    <Suspense fallback={<HomeDesign design={1} />}>
      <HomePageContent searchParams={searchParams} />
    </Suspense>
  );
}
