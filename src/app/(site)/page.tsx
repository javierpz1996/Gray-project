import { HomeDesign } from "@/components/home/home-design";
import { parseHomeDesign } from "@/lib/home-design";

export default async function Page({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const design = parseHomeDesign(params.diseno);

  return <HomeDesign design={design} />;
}
