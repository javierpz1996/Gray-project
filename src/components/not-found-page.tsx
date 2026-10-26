import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex w-full max-w-site flex-col justify-center px-6 py-24 md:py-32">
      <p className="eyebrow">Error 404</p>

      <h1 className="mt-4 font-display text-h1 font-bold leading-heading tracking-title text-fg">
        Esta página no existe
      </h1>

      <p className="mt-6 max-w-prose text-lead text-fg-muted">
        La pieza puede haberse retirado o la dirección está mal escrita.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/#portafolio">Ver portafolio</Link>
        </Button>
      </div>

      <p className="mt-10 text-small text-fg-subtle">{site.name}</p>
    </div>
  );
}
