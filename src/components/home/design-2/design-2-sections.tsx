import Image from "next/image";
import Link from "next/link";
import { PortalSplitHero } from "@/components/home/portal-split-hero";
import { design2PortalSeries } from "@/content/design-2-portal";
import { libros } from "@/content/libros";
import { homeDesignAnchor } from "@/lib/home-design";

export function Design2Hero() {
  return <PortalSplitHero design={2} layout="portal" />;
}

export function Design2Series() {
  return (
    <section
      id="series"
      className="scroll-mt-[var(--site-header-height)] bg-[color-mix(in_srgb,var(--ds-ink)_92%,var(--ds-red)_8%)] px-6 py-14 md:px-10 md:py-16 lg:scroll-mt-6"
    >
      <h2 className="font-display text-h1 font-bold uppercase tracking-title text-primary-foreground">
        La serie
      </h2>
      <div className="mt-10 flex flex-col gap-10">
        {design2PortalSeries.map((block) => (
          <div key={block.year}>
            <p className="font-sans text-h3 font-extrabold text-coral">{block.year}</p>
            <ul className="mt-3 flex list-none flex-col gap-2 p-0">
              {block.items.map((label) => (
                <li key={label}>
                  <span className="font-sans text-body text-primary-foreground/90">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        id="libros"
        className="mt-14 scroll-mt-[var(--site-header-height)] border-t border-[color-mix(in_srgb,var(--primary-foreground)_12%,transparent)] pt-12 lg:scroll-mt-6"
      >
        <h3 className="font-display text-h2 font-bold uppercase tracking-title text-primary-foreground">
          Libros
        </h3>
        <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {libros.map((libro) => (
            <li key={libro.slug}>
              <Link
                href={homeDesignAnchor(2, `libro-${libro.slug}`)}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-surface-muted shadow-book">
                  <Image
                    src={libro.imagen}
                    alt={libro.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                </div>
                <p className="mt-3 font-sans text-small font-bold text-primary-foreground group-hover:text-coral">
                  {libro.titulo}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
