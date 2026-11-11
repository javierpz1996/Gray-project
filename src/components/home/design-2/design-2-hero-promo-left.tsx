"use client";

import { useSearchParams } from "next/navigation";
import { parseDesign2HeroPromoLayout } from "@/lib/design-2-hero-promo-layout";
import { cn } from "@/lib/utils";
import "./design-2-hero-promo-left.css";

const LINES = [
  { id: "date", text: "¡Comienza el 8 de enero de 2027 (viernes)!" },
  { id: "where", text: "En Instagram y TikTok oficial" },
  { id: "when", text: "Todos los viernes a las 23:00" },
] as const;

/** Carteles inclinados tipo póster anime (referencia), borde izquierdo del hero. */
export function Design2HeroPromoLeft() {
  const searchParams = useSearchParams();
  const layout = parseDesign2HeroPromoLayout(searchParams.get("cartel") ?? undefined);
  return (
    <aside
      className={cn(
        "d2-promo-left",
        layout === "derecho" && "d2-promo-left--derecho",
        layout === "panel" && "d2-promo-left--panel",
      )}
      aria-label="Aviso de clases en vivo"
    >
      <ul className="d2-promo-left__list">
        {LINES.map((line, index) => (
          <li
            key={line.id}
            className="d2-promo-left__item"
            style={
              layout === "inclinado"
                ? { ["--d2-promo-shift" as string]: `${index * 0.55}em` }
                : undefined
            }
          >
            <p className="d2-promo-left__bar">
              <span className="d2-promo-left__text">{line.text}</span>
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
