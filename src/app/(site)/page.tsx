import { HomePageView } from "@/components/home/home-page-view";

export default function Page({ searchParams }: PageProps<"/">) {
  return <HomePageView searchParams={searchParams} />;
}
