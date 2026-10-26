"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Revelado de sección — DESIGN.md §7 Motion.
 *
 *   opacity 0→1 + translateY 8px→0 · 600ms ease-out · una sola vez.
 *   Nada de parallax, bounce ni movimiento continuo.
 *   prefers-reduced-motion lo anula vía la regla global de globals.css.
 *
 * El shell prerenderiza con data-visible="false" y la transición ya presente,
 * así que no hay salto de layout (CLS) si el observer no llega a correr.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={[
        "transition-[opacity,transform] duration-[600ms] ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
