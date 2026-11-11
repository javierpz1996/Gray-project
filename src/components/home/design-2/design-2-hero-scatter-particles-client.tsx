"use client";

import { useSearchParams } from "next/navigation";
import { Design2HeroScatterParticles } from "@/components/home/design-2/design-2-hero-scatter-particles";
import {
  parseDesign2HeroScatterPreset,
  type Design2HeroScatterPresetId,
} from "@/lib/design-2-hero-scatter-preset";

export function Design2HeroScatterParticlesClient({
  preset,
}: {
  /** `null` apaga las partículas. Sin valor, se lee de la URL. */
  preset?: Design2HeroScatterPresetId | null;
}) {
  const searchParams = useSearchParams();
  if (preset === null) return null;
  const resolved =
    preset ??
    parseDesign2HeroScatterPreset(searchParams.get("particulas") ?? undefined);
  return <Design2HeroScatterParticles preset={resolved} />;
}
