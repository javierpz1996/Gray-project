"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { parseHomeDesign } from "@/lib/home-design";

/**
 * Activa estilos de chrome del home según `?diseno=` antes de que termine el stream
 * del contenido (PPR).
 */
export function HomeDesignMarker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const diseno = parseHomeDesign(searchParams.get("diseno") ?? undefined);

  useEffect(() => {
    if (pathname !== "/") {
      delete document.body.dataset.homeDesign;
      return;
    }
    document.body.dataset.homeDesign = String(diseno);
    return () => {
      delete document.body.dataset.homeDesign;
    };
  }, [diseno, pathname]);

  if (pathname === "/" && diseno === 10) {
    return <div className="home-design-10-chrome" hidden aria-hidden />;
  }

  return null;
}
