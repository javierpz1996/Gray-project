"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Design2Menu } from "@/components/layout/design-2-menu";
import type { MenuTransitionId } from "@/components/layout/design-2-menu-tiles";
import { SiteFullscreenMenu } from "@/components/layout/site-fullscreen-menu";
import { SiteMenuTriggerArt } from "@/components/layout/site-menu-trigger-art";
import "./site-fullscreen-menu.css";

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const [morphed, setMorphed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);
  const [transition, setTransition] =
    useState<MenuTransitionId>("triangulos");
  const pathname = usePathname();
  const isDesign2 = pathname === "/";

  const trigger = (
    <div className="site-menu-trigger-slot">
      <svg
        className="site-menu-trigger__cloud"
        viewBox="0 0 520 280"
        aria-hidden
      >
        <path
          d="M242 36
             H426
             A62 62 0 0 1 426 160
             H298
             L260 188
             L246 160
             H242
             A32 32 0 0 1 210 128
             V68
             A32 32 0 0 1 242 36
             Z"
          fill="#fff"
        />
      </svg>
      <button
        type="button"
        className="site-menu-trigger"
        aria-expanded={morphed}
        aria-controls="site-menu"
        onClick={() => setMorphed((value) => !value)}
      >
        <SiteMenuTriggerArt />
        <span className="sr-only">{morphed ? "Cerrar menú" : "Abrir menú"}</span>
      </button>
    </div>
  );

  return (
    <>
      {mounted ? createPortal(trigger, document.body) : trigger}
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
