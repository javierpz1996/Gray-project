import type { Design2HeroBurstPresetId } from "@/lib/design-2-hero-burst-preset";
import "./design-2-hero-burst-effects.css";

const LAYERS = [
  { id: 1, variant: "e1" as const },
  { id: 2, variant: "e2" as const },
  { id: 3, variant: "e3" as const },
  { id: 4, variant: "e4" as const },
  { id: 5, variant: "e5" as const },
  { id: 6, variant: "e6" as const },
  { id: 7, variant: "e6" as const },
] as const;

/**
 * Partículas / burst del hero (sprites + steps), misma lógica que kinioto-anime.com `.c-effect`.
 * Assets en `public/hero/kinioto-effects/` — sustituir por piezas propias antes de publicar.
 */
type Design2HeroBurstEffectsProps = {
  preset?: Design2HeroBurstPresetId;
};

export function Design2HeroBurstEffects({
  preset = "full",
}: Design2HeroBurstEffectsProps = {}) {
  return (
    <div className="d2-hero-burst" data-burst-preset={preset} aria-hidden>
      {LAYERS.map(({ id, variant }) => (
        <div
          key={id}
          className={`d2-hero-burst__cont d2-hero-burst__cont--${id} d2-hero-burst__cont--${variant}`}
        />
      ))}
    </div>
  );
}
