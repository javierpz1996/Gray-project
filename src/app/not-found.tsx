import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NotFoundPage } from "@/components/not-found-page";

/** 404 global (rutas fuera del grupo `(site)`). */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <NotFoundPage />
      </main>
      <SiteFooter />
    </>
  );
}
