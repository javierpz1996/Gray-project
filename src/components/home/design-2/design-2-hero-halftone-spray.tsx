import "./design-2-hero-halftone-spray.css";

/** Retícula halftone blanca sobre el verde (debajo de carteles / flow). */
export function Design2HeroHalftoneSpray() {
  return (
    <div className="d2-hero-halftone" aria-hidden>
      <div className="d2-hero-halftone__grid" />
      <div className="d2-hero-halftone__grid d2-hero-halftone__grid--fine" />
    </div>
  );
}
