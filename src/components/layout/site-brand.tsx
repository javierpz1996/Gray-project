import Link from "next/link";
import { SiteLogoMark } from "@/components/layout/site-logo";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

type SiteBrandProps = {
  className?: string;
  logoClassName?: string;
  wordmarkClassName?: string;
  priority?: boolean;
  logoSize?: "sm" | "md" | "lg";
  /** Usar `<h1>` para la marca (p. ej. hero del inicio). */
  asHeading?: boolean;
  /** `navbar`: solo GRAYBY en bloque coral (barra superior). */
  variant?: "navbar" | "inline";
};

const wordmarkBase =
  "font-display font-semibold uppercase leading-heading tracking-title";

function NavbarWordmark({
  className,
  asHeading,
  badged = false,
}: {
  className?: string;
  asHeading?: boolean;
  badged?: boolean;
}) {
  const classes = cn(
    badged
      ? "flex h-full min-w-[13rem] items-center justify-center bg-primary px-6 font-display text-[clamp(2.5rem,6vw,3.75rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-primary-foreground transition-colors duration-150 ease-out hover:bg-coral-hover sm:min-w-[15rem] sm:px-8 md:min-w-[16.5rem] md:px-10"
      : cn(wordmarkBase, "text-h3 font-bold leading-none text-fg"),
    className,
  );

  if (asHeading) {
    return <h1 className={classes}>{site.wordmark}</h1>;
  }

  return <span className={classes}>{site.wordmark}</span>;
}

export function SiteBrand({
  className,
  logoClassName,
  wordmarkClassName,
  priority = false,
  logoSize = "md",
  asHeading = false,
  variant = "inline",
}: SiteBrandProps) {
  if (variant === "navbar") {
    return (
      <NavbarWordmark
        badged
        className={cn("h-full min-w-0", className, wordmarkClassName)}
        asHeading={asHeading}
      />
    );
  }

  const wordmarkClass = cn(
    wordmarkBase,
    asHeading ? "" : "text-h3 text-fg",
    wordmarkClassName,
  );

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <SiteLogoMark
        priority={priority}
        size={logoSize}
        className={logoClassName}
      />
      {asHeading ? (
        <h1 className={wordmarkClass}>{site.wordmark}</h1>
      ) : (
        <span className={wordmarkClass}>{site.wordmark}</span>
      )}
    </span>
  );
}

export function SiteBrandLink({
  className,
  logoClassName,
  wordmarkClassName,
  priority = true,
}: SiteBrandProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.wordmark}, inicio`}
      className={cn(
        "flex h-[5rem] min-w-0 shrink-0 cursor-pointer self-stretch focus-visible:outline-none",
        className,
      )}
    >
      <SiteBrand
        variant="navbar"
        priority={priority}
        className="h-full"
        logoClassName={logoClassName}
        wordmarkClassName={wordmarkClassName}
      />
    </Link>
  );
}
