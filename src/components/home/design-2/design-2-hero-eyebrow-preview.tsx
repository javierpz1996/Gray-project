import Link from "next/link";
import {
  Design2HeroEyebrow,
  design2HeroEyebrowVariants,
  type Design2HeroEyebrowVariantId,
} from "@/components/home/design-2/design-2-hero-eyebrow";
import { cn } from "@/lib/utils";

type Design2HeroEyebrowPreviewProps = {
  activeVariant: Design2HeroEyebrowVariantId;
};

export function Design2HeroEyebrowPreview({
  activeVariant,
}: Design2HeroEyebrowPreviewProps) {
  return (
    <section
      className="border-b border-[color-mix(in_srgb,var(--ds-yellow)_35%,var(--ds-ink))] bg-ink px-4 pt-[calc(var(--site-header-height)+1.5rem)] pb-8 text-primary-foreground md:px-8"
      aria-labelledby="eyebrow-preview-title"
    >
      <h2
        id="eyebrow-preview-title"
        className="font-display text-body font-bold uppercase tracking-[0.12em] text-ds-yellow md:text-h3"
      >
        Elegir eyebrow · Programa de clases
      </h2>
      <p className="mt-2 max-w-2xl font-sans text-micro leading-relaxed text-primary-foreground/75 md:text-small">
        El hero de abajo usa la variante activa (
        <strong className="text-primary-foreground">{activeVariant}</strong>
        ). Haz clic en una tarjeta para verla en contexto. Para ocultar esta
        rejilla:{" "}
        <Link
          href="/?diseno=3&eyebrowPreview=0"
          className="underline underline-offset-2 hover:text-primary-foreground"
        >
          cerrar selector
        </Link>
        .
      </p>
      <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {design2HeroEyebrowVariants.map((item) => {
          const isActive = item.id === activeVariant;
          return (
            <li key={item.id}>
              <Link
                href={`/?diseno=3&eyebrow=${item.id}`}
                scroll={false}
                className={cn(
                  "flex min-h-[7.5rem] flex-col justify-between rounded-md border px-4 py-4 transition-colors duration-150 ease-out motion-reduce:transition-none",
                  isActive
                    ? "border-ds-yellow bg-[color-mix(in_srgb,var(--ds-yellow)_12%,var(--ds-ink))]"
                    : "border-[color-mix(in_srgb,var(--primary-foreground)_22%,transparent)] bg-[color-mix(in_srgb,var(--primary-foreground)_6%,transparent)] hover:border-[color-mix(in_srgb,var(--ds-yellow)_45%,transparent)]",
                )}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className="font-display text-small font-extrabold text-ds-yellow"
                  >
                    {item.label}
                    <span className="text-primary-foreground/50">
                      {" "}
                      ({item.id})
                    </span>
                  </span>
                  {isActive ? (
                    <span
                      className="font-sans text-micro font-bold uppercase tracking-wider text-primary-foreground"
                    >
                      Activa
                    </span>
                  ) : null}
                </div>
                <div className="mt-4 flex min-h-[3.5rem] flex-col items-center justify-center py-2">
                  <Design2HeroEyebrow variant={item.id} />
                  <span
                    className="mt-3 font-sans text-[0.625rem] leading-snug text-primary-foreground/55"
                  >
                    {item.hint}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
