import Link from "next/link";
import { Design2HeroPromoRightTicker } from "@/components/home/design-2/design-2-hero-promo-right-ticker";
import "./design-2-hero-promo-right.css";

/** Cartel tipo ticker / NEWS (referencia anime), borde derecho del hero. */
export function Design2HeroPromoRight() {
  return (
    <aside className="d2-promo-right" aria-label="Novedades">
      <div className="d2-promo-right__shell">
        <p className="d2-promo-right__tag">NOTICIAS</p>
        <div className="d2-promo-right__strip">
          <Design2HeroPromoRightTicker />
          <p className="d2-promo-right__more-wrap">
            <Link className="d2-promo-right__more" href="/portafolio">
              More&nbsp;›
            </Link>
          </p>
        </div>
      </div>
    </aside>
  );
}
