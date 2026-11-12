import { HomePageView } from "@/components/home/home-page-view";

export const metadata = {
  title: "Diseño 2",
  robots: { index: false, follow: false },
};

export default function Page({ searchParams }: PageProps<"/diseno-2">) {
  return <HomePageView searchParams={searchParams} stockMedia />;
}
