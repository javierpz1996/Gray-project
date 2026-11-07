"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Evita bloqueos de scroll/Lenis heredados al volver al home u otras rutas. */
export function SiteScrollHygiene() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.body.removeAttribute("data-libro-detalle");
    document.body.removeAttribute("data-film-detail-open");

    document.documentElement.classList.remove(
      "lenis",
      "lenis-smooth",
      "lenis-stopped",
      "lenis-scrolling",
    );

    const filmSection = document.querySelector(".filmografia-section");
    filmSection?.removeAttribute("data-detail-open");

    document
      .querySelectorAll("dialog.filmografia-section__detail[open]")
      .forEach((node) => {
        if (node instanceof HTMLDialogElement) {
          node.close();
        }
      });

    if (window.location.hash === "#filmografia") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
