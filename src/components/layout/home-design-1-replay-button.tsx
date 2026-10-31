"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { replayHomeDesign1HeroAnimation } from "@/lib/home-design-1-animation";
import { parseHomeDesign } from "@/lib/home-design";
import { cn } from "@/lib/utils";

const navBarButton =
  "cursor-pointer font-sans text-small font-extrabold uppercase tracking-[-0.02em] text-fg transition-colors duration-150 ease-out hover:text-primary";

type HomeDesign1ReplayButtonProps = {
  className?: string;
  onAfterReplay?: () => void;
};

export function HomeDesign1ReplayButton({
  className,
  onAfterReplay,
}: HomeDesign1ReplayButtonProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const diseno = parseHomeDesign(searchParams.get("diseno") ?? undefined);

  if (pathname !== "/" || diseno !== 1) {
    return null;
  }

  return (
    <button
      type="button"
      className={cn(navBarButton, className)}
      aria-label="Reiniciar animación del hero"
      onClick={() => {
        replayHomeDesign1HeroAnimation();
        onAfterReplay?.();
      }}
    >
      Repetir
    </button>
  );
}
