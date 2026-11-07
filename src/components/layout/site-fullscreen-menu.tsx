"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/config/site";
import { productDetailHref } from "@/lib/product-detail-path";
import "./site-fullscreen-menu.css";

const ANIMATIONS = [
  { id: "fundido", label: "Fundido" },
  { id: "cortina", label: "Cortina" },
  { id: "columnas", label: "Columnas" },
  { id: "estallido", label: "Estallido" },
  { id: "iris", label: "Iris" },
  { id: "foco", label: "Foco" },
  { id: "iman", label: "Imán" },
  { id: "tinta", label: "Tinta" },
  { id: "persiana", label: "Persiana" },
  { id: "sello", label: "Sello" },
  { id: "abanico", label: "Abanico" },
  { id: "domino", label: "Dominó" },
  { id: "glitch", label: "Glitch" },
  { id: "pendulo", label: "Péndulo" },
  { id: "carta", label: "Carta" },
  { id: "onda", label: "Onda" },
  { id: "espiral", label: "Espiral" },
  { id: "rebote", label: "Rebote" },
  { id: "gelatina", label: "Gelatina" },
  { id: "relampago", label: "Relámpago" },
  { id: "maquina", label: "Máquina" },
  { id: "vineta", label: "Viñeta" },
  { id: "orbita", label: "Órbita" },
  { id: "pliegue", label: "Pliegue" },
  { id: "latigo", label: "Látigo" },
  { id: "cascada", label: "Cascada" },
  { id: "apertura", label: "Apertura" },
  { id: "sesgo", label: "Sesgo" },
] as const;

type AnimationId = (typeof ANIMATIONS)[number]["id"];

type MenuLink = {
  href: string;
  label: string;
  sub: string;
  external?: boolean;
};

const EDGE_LINE = `${site.wordmark}    ·    `.repeat(8);

const COLUMNS: { items: MenuLink[] }[] = [
  {
    items: [
      { href: "/", label: "Diseño 1", sub: "Principal" },
      { href: "/?diseno=2", label: "Diseño 2", sub: "Versión" },
      { href: "/#inicio", label: "Inicio", sub: "Portada" },
      { href: "/#portafolio", label: "Obra", sub: "Piezas" },
      { href: "/desing-system", label: "Sistema", sub: "Guía visual" },
      { href: `mailto:${site.email}`, label: "Contacto", sub: "Escribir" },
    ],
  },
  {
    items: [
      { href: "/#libros", label: "Libros", sub: "Catálogo" },
      {
        href: productDetailHref("fundamentos-dibujo"),
        label: "Edición",
        sub: "Libro completo",
      },
      {
        href: productDetailHref("formas-espacio-3d"),
        label: "Tema I",
        sub: "Formas en el espacio",
      },
      {
        href: productDetailHref("anatomia-constructiva"),
        label: "Tema II",
        sub: "Anatomía",
      },
      {
        href: productDetailHref("apunte-dibujo"),
        label: "Tema III",
        sub: "Apunte",
      },
      {
        href: productDetailHref("rostro-proporciones"),
        label: "Tema IV",
        sub: "Rostro",
      },
    ],
  },
  {
    items: [
      {
        href: site.links.instagram,
        label: "Instagram",
        sub: "Piezas y bocetos",
        external: true,
      },
      {
        href: site.links.x,
        label: "Twitter",
        sub: "Avisos cortos",
        external: true,
      },
      {
        href: site.links.tiktok,
        label: "TikTok",
        sub: "Clips del proceso",
        external: true,
      },
      {
        href: site.links.youtube,
        label: "YouTube",
        sub: "Clases y demos",
        external: true,
      },
      {
        href: site.links.deviantart,
        label: "DeviantArt",
        sub: "Galería",
        external: true,
      },
    ],
  },
];

export function SiteFullscreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [animation, setAnimation] = useState<AnimationId>("fundido");
  const [optionsOpen, setOptionsOpen] = useState(true);
  const [play, setPlay] = useState(0);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const pointRef = useRef({ x: 0, y: 0 });
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu || reduceMotionRef.current) return;

    const paint = () => {
      frameRef.current = 0;
      const bounds = menu.getBoundingClientRect();
      const { x: clientX, y: clientY } = pointRef.current;
      const x = (clientX - bounds.left) / bounds.width;
      const y = (clientY - bounds.top) / bounds.height;
      menu.style.setProperty("--spot-x", `${x * 100}%`);
      menu.style.setProperty("--spot-y", `${y * 100}%`);
      menu.style.setProperty("--px", ((x - 0.5) * 2).toFixed(3));
      menu.style.setProperty("--py", ((y - 0.5) * 2).toFixed(3));

      const links = menu.querySelectorAll<HTMLElement>(".site-menu__link");
      const measured = Array.from(links, (link) => {
        const box = link.getBoundingClientRect();
        return {
          link,
          cx: box.left + box.width / 2,
          cy: box.top + box.height / 2,
        };
      });
      for (const { link, cx, cy } of measured) {
        const dx = clientX - cx;
        const dy = clientY - cy;
        const dist = Math.hypot(dx, dy);
        const near = Math.max(0, 1 - dist / 340);
        link.style.setProperty("--near", near.toFixed(3));
        link.style.setProperty("--dx", `${(dx * near * 0.22).toFixed(1)}px`);
        link.style.setProperty("--dy", `${(dy * near * 0.22).toFixed(1)}px`);
      }
    };

    const onMove = (event: PointerEvent) => {
      pointRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      menu.querySelectorAll<HTMLElement>(".site-menu__link").forEach((link) => {
        link.style.removeProperty("--near");
        link.style.removeProperty("--dx");
        link.style.removeProperty("--dy");
      });
    };

    menu.addEventListener("pointermove", onMove);
    menu.addEventListener("pointerleave", onLeave);
    return () => {
      menu.removeEventListener("pointermove", onMove);
      menu.removeEventListener("pointerleave", onLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [mounted, open, animation, play]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  let itemIndex = 0;

  return createPortal(
    <div
      key={`${animation}-${play}`}
      ref={menuRef}
      id="site-menu"
      className={`site-menu site-menu--${animation}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <div className="site-menu__edge site-menu__edge--left" aria-hidden>
        <p className="site-menu__edge-run">
          {EDGE_LINE}
          {EDGE_LINE}
        </p>
      </div>
      <div className="site-menu__edge site-menu__edge--right" aria-hidden>
        <p className="site-menu__edge-run">
          {EDGE_LINE}
          {EDGE_LINE}
        </p>
      </div>

      <div className="site-menu__top">
        <div className="site-menu__picker-wrap">
          <button
            type="button"
            className="site-menu__options-toggle"
            aria-expanded={optionsOpen}
            onClick={() => setOptionsOpen((current) => !current)}
          >
            {optionsOpen ? "Ocultar animaciones" : "Mostrar animaciones"}
          </button>
          {optionsOpen ? (
            <div className="site-menu__picker" role="group" aria-label="Animación del menú">
              {ANIMATIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={animation === item.id}
                  onClick={() => {
                    setAnimation(item.id);
                    setPlay((current) => current + 1);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <button type="button" className="site-menu__close" onClick={onClose}>
          Cerrar
          <span aria-hidden>×</span>
        </button>
      </div>

      <div className="site-menu__columns">
        {COLUMNS.map((column) => (
          <ul key={column.items[0]?.label} className="site-menu__col">
            {column.items.map((item) => {
              const index = itemIndex;
              itemIndex += 1;
              return (
                <li
                  key={item.label}
                  className="site-menu__item"
                  style={{ ["--i" as string]: index }}
                >
                  <Link
                    href={item.href}
                    className="site-menu__link"
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={onClose}
                  >
                    <span className="site-menu__label">{item.label}</span>
                    <span className="site-menu__sub">{item.sub}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>,
    document.body,
  );
}
