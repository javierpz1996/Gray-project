import { cn } from "@/lib/utils";

const fadeLineRight =
  "h-px flex-1 bg-gradient-to-r from-transparent to-[color-mix(in_srgb,var(--primary-foreground)_28%,transparent)]";
const fadeLineLeft =
  "h-px flex-1 bg-gradient-to-l from-transparent to-[color-mix(in_srgb,var(--primary-foreground)_28%,transparent)]";

const diamondClip = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

export const design2HeroIntroDividerVariants = [
  { id: "1", key: "diamond", label: "Rombo coral" },
  { id: "2", key: "coral-bar", label: "Barra coral" },
  { id: "3", key: "double-rule", label: "Doble regla" },
  { id: "4", key: "dotted", label: "Punteado" },
  { id: "5", key: "triple-diamond", label: "Tres rombos" },
  { id: "6", key: "fade", label: "Degradado puro" },
] as const;

export type Design2HeroIntroDividerVariant =
  (typeof design2HeroIntroDividerVariants)[number]["key"];

type Design2HeroIntroDividerProps = {
  className?: string;
  variant?: Design2HeroIntroDividerVariant;
};

function DividerDiamond() {
  return (
    <>
      <span className={fadeLineRight} />
      <span
        className="relative flex size-3 shrink-0 items-center justify-center md:size-3.5"
        aria-hidden
      >
        <span
          className="absolute inset-0 bg-coral"
          style={{ clipPath: diamondClip }}
        />
        <span
          className="size-1 bg-primary-foreground md:size-1.5"
          style={{ clipPath: diamondClip }}
        />
      </span>
      <span className={fadeLineLeft} />
    </>
  );
}

function DividerCoralBar() {
  return (
    <span
      className="mx-auto h-1 w-16 bg-coral md:w-20"
      style={{ clipPath: "polygon(2% 0%, 98% 0%, 100% 50%, 98% 100%, 2% 100%, 0% 50%)" }}
      aria-hidden
    />
  );
}

function DividerDoubleRule() {
  return (
    <div className="flex w-full flex-col gap-1.5" aria-hidden>
      <span
        className="h-px w-full bg-[color-mix(in_srgb,var(--primary-foreground)_32%,transparent)]"
      />
      <span
        className="h-px w-full bg-[color-mix(in_srgb,var(--primary-foreground)_18%,transparent)]"
      />
    </div>
  );
}

function DividerDotted() {
  return (
    <span
      className="block w-full border-0 border-t border-dotted border-[color-mix(in_srgb,var(--primary-foreground)_40%,transparent)]"
      aria-hidden
    />
  );
}

function DividerTripleDiamond() {
  return (
    <div className="flex w-full items-center gap-3 md:gap-4" aria-hidden>
      <span className={fadeLineRight} />
      <span className="flex shrink-0 items-center gap-1.5 md:gap-2">
        <span
          className="size-1.5 bg-primary-foreground/75 md:size-2"
          style={{ clipPath: diamondClip }}
        />
        <span
          className="size-2.5 bg-primary-foreground md:size-3"
          style={{ clipPath: diamondClip }}
        />
        <span
          className="size-1.5 bg-primary-foreground/75 md:size-2"
          style={{ clipPath: diamondClip }}
        />
      </span>
      <span className={fadeLineLeft} />
    </div>
  );
}

function DividerFade() {
  return (
    <span
      className="block h-px w-full bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--primary-foreground)_35%,transparent)] to-transparent"
      aria-hidden
    />
  );
}

/** Separador ornamental bajo el intro del hero portal (diseño 2/3). */
export function Design2HeroIntroDivider({
  className,
  variant = "diamond",
}: Design2HeroIntroDividerProps) {
  const isRow =
    variant === "diamond" ||
    variant === "triple-diamond" ||
    variant === "coral-bar";

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-md",
        isRow && variant !== "coral-bar" && "flex items-center gap-3 md:gap-4",
        variant === "coral-bar" && "flex justify-center",
        className,
      )}
      role="separator"
      aria-hidden
    >
      {variant === "diamond" ? <DividerDiamond /> : null}
      {variant === "coral-bar" ? <DividerCoralBar /> : null}
      {variant === "double-rule" ? <DividerDoubleRule /> : null}
      {variant === "dotted" ? <DividerDotted /> : null}
      {variant === "triple-diamond" ? <DividerTripleDiamond /> : null}
      {variant === "fade" ? <DividerFade /> : null}
    </div>
  );
}
