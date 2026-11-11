"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/config/site";
import { productDetailHref } from "@/lib/product-detail-path";
import "./kill-blue-menu.css";

const LINKS = [
  { href: "/#inicio", label: "INICIO", sub: "Portada" },
  { href: "/#portafolio", label: "OBRA", sub: "Piezas" },
  { href: "/#libros", label: "LIBROS", sub: "Catálogo" },
  {
    href: productDetailHref("fundamentos-dibujo"),
    label: "EDICIÓN",
    sub: "Libro completo",
  },
  { href: "/desing-system", label: "SISTEMA", sub: "Guía visual" },
  { href: `mailto:${site.email}`, label: "CONTACTO", sub: "Escribir" },
] as const;

const SOCIAL = [
  { href: site.links.x, label: "X", icon: "fa-brands fa-x-twitter" },
  { href: site.links.tiktok, label: "TikTok", icon: "fa-brands fa-tiktok" },
  { href: site.links.instagram, label: "Instagram", icon: "fa-brands fa-instagram" },
  { href: site.links.youtube, label: "YouTube", icon: "fa-brands fa-youtube" },
] as const;

function useMenuAssets() {
  useEffect(() => {
    const add = (id: string, src: string) => {
      if (document.getElementById(id)) return;
      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    };
    add("kb-typekit", "https://use.typekit.net/rke0ypg.js");
    add("kb-fontawesome", "https://kit.fontawesome.com/672520b56f.js");
  }, []);
}

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);
  useMenuAssets();

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close]);

  const ui = (
    <>
      <button
        type="button"
        className="kb-nav"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <svg className="kb-ring" viewBox="0 0 100 100" aria-hidden>
          <defs>
            <path
              id="kb-ring-path"
              d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
            />
          </defs>
          <text>
            <textPath href="#kb-ring-path" textLength="226" lengthAdjust="spacing">
              MENU · MENU · MENU · MENU · MENU ·
            </textPath>
          </text>
        </svg>
        <span className="sr-only">Menú</span>
        <span className="kb-bars" aria-hidden>
          <span />
          <span />
        </span>
      </button>
      {open ? (
        <div id="site-menu" className="kb-menu is-open" role="dialog" aria-label="Menú">
          <div className="kb-wrap">
            <div className="kb-dc-line" aria-hidden />
            <section>
              <figure className="kb-logo">
                <Image
                  src="/media/logo-alternative/logo-gray.png"
                  alt={site.wordmark}
                  width={744}
                  height={271}
                  unoptimized
                />
              </figure>
              <div className="kb-links">
                {LINKS.map((item) => (
                  <div key={item.label}>
                    <Link href={item.href} onClick={close}>
                      <span>
                        <p>{item.label}</p>
                        <b>{item.sub}</b>
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="kb-sub">
                <p>REDES</p>
                {SOCIAL.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                  >
                    <i className={item.icon} aria-hidden />
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );

  return mounted ? createPortal(ui, document.body) : ui;
}
