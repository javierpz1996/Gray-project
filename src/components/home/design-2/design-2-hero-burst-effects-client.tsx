"use client";

import { useSearchParams } from "next/navigation";
import { Design2HeroBurstEffects } from "@/components/home/design-2/design-2-hero-burst-effects";
import { parseDesign2HeroBurstPreset } from "@/lib/design-2-hero-burst-preset";

export function Design2HeroBurstEffectsClient() {
  const searchParams = useSearchParams();
  const preset = parseDesign2HeroBurstPreset(searchParams.get("burst") ?? undefined);
  return <Design2HeroBurstEffects preset={preset} />;
}
