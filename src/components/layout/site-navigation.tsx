"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Design2Menu } from "@/components/layout/design-2-menu";
import type { MenuTransitionId } from "@/components/layout/design-2-menu-tiles";
import { SiteFullscreenMenu } from "@/components/layout/site-fullscreen-menu";
import { parseHomeDesign } from "@/lib/home-design";
import "./site-fullscreen-menu.css";

const MENU_FRAMES = [1, 2, 3, 4, 5, 6] as const;

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const [transition, setTransition] =
    useState<MenuTransitionId>("triangulos");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDesign2 =
    pathname === "/" &&
    parseHomeDesign(searchParams.get("diseno") ?? undefined) === 2;

  return (
    <>
      <button
        type="button"
        className="site-menu-trigger"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(true)}
      >
        <span className="site-menu-trigger__frames" aria-hidden>
          {MENU_FRAMES.map((frame) => (
            <img
              key={frame}
              src={`/Imagenes/Varias/menu/frame-${frame}.png`}
              alt=""
              width={520}
              height={498}
              className={`site-menu-trigger__img site-menu-trigger__frame site-menu-trigger__frame--${frame}`}
            />
          ))}
        </span>
        <span className="sr-only">Abrir menú</span>
      </button>
      {isDesign2 ? (
        open ? (
          <Design2Menu
            onClose={close}
            transition={transition}
            onTransitionChange={setTransition}
          />
        ) : null
      ) : (
        <SiteFullscreenMenu open={open} onClose={close} />
      )}
    </>
  );
}
