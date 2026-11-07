"use client";

import { useCallback, useState } from "react";
import { SiteFullscreenMenu } from "@/components/layout/site-fullscreen-menu";
import "./site-fullscreen-menu.css";

const MENU_FRAMES = [1, 2, 3, 4, 5, 6] as const;

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

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
      <SiteFullscreenMenu open={open} onClose={close} />
    </>
  );
}
