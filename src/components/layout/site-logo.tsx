import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** Dimensiones reales de `public/Imagenes/Varias/logoPrincipal.png`. */
const LOGO_WIDTH = 2097;
const LOGO_HEIGHT = 2097;

const markSizes = {
  sm: "size-9",
  md: "size-11",
  lg: "size-16",
} as const;

/** Emblema: `logoPrincipal.png` (círculo sobre fondo negro). */
export function SiteLogoMark({
  className,
  priority = false,
  size = "md",
}: {
  className?: string;
  priority?: boolean;
  size?: keyof typeof markSizes;
}) {
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-full bg-ink",
        markSizes[size],
        className,
      )}
    >
      <Image
        src={site.logoSrc}
        alt=""
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        unoptimized
        sizes="(max-width: 768px) 2.25rem, 4rem"
        className="size-full object-contain object-center"
        aria-hidden="true"
      />
    </span>
  );
}

/** @deprecated Usar `SiteLogoMark`. */
export function SiteLogo({
  className,
  priority = false,
  size = "md",
}: {
  className?: string;
  priority?: boolean;
  size?: keyof typeof markSizes;
}) {
  return (
    <SiteLogoMark className={className} priority={priority} size={size} />
  );
}
