import { design2PortalHero } from "@/content/design-2-portal";
import { cn } from "@/lib/utils";

const diamondClip = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

export const design2HeroEyebrowVariants = [
  {
    id: "legacy",
    label: "Actual",
    hint: "Sin guiones · Inter · mayúsculas",
  },
  {
    id: "a",
    label: "A",
    hint: "- Programa de clases - · Inter · sentence",
  },
  {
    id: "b",
    label: "B",
    hint: "- PROGRAMA DE CLASES - · Inter · mayúsculas",
  },
  {
    id: "c",
    label: "C",
    hint: "- Programa de clases - · Barlow Condensed",
  },
  {
    id: "d",
    label: "D",
    hint: "- PROGRAMA DE CLASES - · Barlow · tracking amplio",
  },
  {
    id: "e",
    label: "E",
    hint: "— Programa de clases — · Inter · rayas largas",
  },
  {
    id: "f",
    label: "F",
    hint: "· Programa de clases · · Inter",
  },
  {
    id: "g",
    label: "G",
    hint: "Líneas laterales · Inter sentence",
  },
  {
    id: "h",
    label: "H",
    hint: "Guiones amarillos · Inter sentence",
  },
  {
    id: "i",
    label: "I",
    hint: "Pastilla amarilla · como BOOTCAMP",
  },
  {
    id: "j",
    label: "J",
    hint: "Tres rombos + texto · Barlow",
  },
  {
    id: "k",
    label: "K",
    hint: "« Programa de clases » · Barlow",
  },
  {
    id: "l",
    label: "L",
    hint: "Solo texto · Inter · tracking muy abierto",
  },
] as const;

export type Design2HeroEyebrowVariantId =
  (typeof design2HeroEyebrowVariants)[number]["id"];

export function parseDesign2HeroEyebrowVariant(
  value: string | undefined,
): Design2HeroEyebrowVariantId {
  const found = design2HeroEyebrowVariants.find((v) => v.id === value);
  return found?.id ?? "b";
}

type Design2HeroEyebrowProps = {
  variant?: Design2HeroEyebrowVariantId;
  className?: string;
};

function EyebrowFlankLines({ children }: { children: React.ReactNode }) {
  const fadeRight =
    "h-px flex-1 max-w-[4.5rem] bg-gradient-to-r from-transparent to-[color-mix(in_srgb,var(--primary-foreground)_35%,transparent)]";
  const fadeLeft =
    "h-px flex-1 max-w-[4.5rem] bg-gradient-to-l from-transparent to-[color-mix(in_srgb,var(--primary-foreground)_35%,transparent)]";

  return (
    <div className="flex w-full max-w-md items-center justify-center gap-3">
      <span className={fadeRight} aria-hidden />
      <span className="shrink-0">{children}</span>
      <span className={fadeLeft} aria-hidden />
    </div>
  );
}

function EyebrowTripleDiamond() {
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "size-1.5 bg-primary-foreground md:size-2",
            i === 1 && "size-2 bg-ds-yellow md:size-2.5",
          )}
          style={{ clipPath: diamondClip }}
        />
      ))}
    </span>
  );
}

export function Design2HeroEyebrow({
  variant = "legacy",
  className,
}: Design2HeroEyebrowProps) {
  const base = cn("mb-0 text-center", className);

  switch (variant) {
    case "legacy":
      return (
        <p
          className={cn(
            base,
            "font-sans text-micro font-extrabold uppercase tracking-[0.22em] text-primary-foreground/80 md:text-small",
          )}
        >
          {design2PortalHero.trailerEyebrow}
        </p>
      );
    case "a":
      return (
        <p
          className={cn(
            base,
            "font-sans text-small font-medium tracking-[0.14em] text-primary-foreground/88 md:text-body",
          )}
        >
          - Programa de clases -
        </p>
      );
    case "b":
      return (
        <p
          className={cn(
            base,
            "font-sans text-micro font-extrabold uppercase tracking-[0.2em] text-primary-foreground/85 md:text-small",
          )}
        >
          - Programa de clases -
        </p>
      );
    case "c":
      return (
        <p
          className={cn(
            base,
            "font-display text-small font-bold tracking-[0.1em] text-primary-foreground/90 md:text-body",
          )}
        >
          - Programa de clases -
        </p>
      );
    case "d":
      return (
        <p
          className={cn(
            base,
            "font-display text-small font-extrabold uppercase tracking-[0.24em] text-primary-foreground md:text-body",
          )}
        >
          - Programa de clases -
        </p>
      );
    case "e":
      return (
        <p
          className={cn(
            base,
            "font-sans text-small font-medium tracking-[0.12em] text-primary-foreground/85 md:text-body",
          )}
        >
          — Programa de clases —
        </p>
      );
    case "f":
      return (
        <p
          className={cn(
            base,
            "font-sans text-small font-semibold tracking-[0.2em] text-primary-foreground/88 md:text-body",
          )}
        >
          · Programa de clases ·
        </p>
      );
    case "g":
      return (
        <div className={base}>
          <EyebrowFlankLines>
            <span
              className="font-sans text-small font-medium tracking-[0.12em] text-primary-foreground/88 md:text-body"
            >
              Programa de clases
            </span>
          </EyebrowFlankLines>
        </div>
      );
    case "h":
      return (
        <p
          className={cn(
            base,
            "font-sans text-small font-medium tracking-[0.12em] text-primary-foreground/90 md:text-body",
          )}
        >
          <span className="font-bold text-ds-yellow">-</span>
          {" Programa de clases "}
          <span className="font-bold text-ds-yellow">-</span>
        </p>
      );
    case "i":
      return (
        <p className={base}>
          <span
            className="inline-flex bg-ds-yellow px-2.5 py-0.5 font-display text-micro font-bold uppercase tracking-[0.14em] text-ink shadow-[0_2px_0_color-mix(in_srgb,var(--ds-ink)_35%,transparent)] md:text-small"
          >
            Programa de clases
          </span>
        </p>
      );
    case "j":
      return (
        <div className={cn(base, "flex flex-col items-center gap-2")}>
          <EyebrowTripleDiamond />
          <p
            className="font-display text-small font-bold uppercase tracking-[0.18em] text-primary-foreground md:text-body"
          >
            Programa de clases
          </p>
        </div>
      );
    case "k":
      return (
        <p
          className={cn(
            base,
            "font-display text-small font-bold tracking-[0.08em] text-primary-foreground/92 md:text-body",
          )}
        >
          « Programa de clases »
        </p>
      );
    case "l":
      return (
        <p
          className={cn(
            base,
            "font-sans text-micro font-normal uppercase tracking-[0.32em] text-primary-foreground/72 md:text-small",
          )}
        >
          Programa de clases
        </p>
      );
    default:
      return (
        <Design2HeroEyebrow variant="legacy" className={className} />
      );
  }
}
