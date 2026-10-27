"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { parseHomeDesign } from "@/lib/home-design";

/**
 * Activa estilos de chrome del home según `?diseno=` antes de que termine el stream
 * del contenido (PPR). El div oculto permite `body:has(.design-2-portal)` en CSS.
 */
export function HomeDesignMarker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const diseno = parseHomeDesign(searchParams.get("diseno") ?? undefined);
  const design = pathname === "/" ? diseno : diseno === 3 ? 3 : null;

  useEffect(() => {
    if (design === 2 || design === 3) {
      document.body.dataset.homeDesign = String(design);
    } else if (diseno === 3) {
      document.body.dataset.homeDesign = "3";
    } else {
      delete document.body.dataset.homeDesign;
    }
    return () => {
      delete document.body.dataset.homeDesign;
    };
  }, [design, diseno]);

  if (design === 2) {
    return <div className="design-2-portal" hidden aria-hidden />;
  }

  return null;
}
