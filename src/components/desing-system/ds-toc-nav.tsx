"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const toc = [
  { href: "#inicio", label: "Inicio" },
  { href: "#reglas", label: "Reglas" },
  { href: "#color", label: "Paleta" },
  { href: "#tipo", label: "Tipografía" },
  { href: "#espaciado", label: "Espaciado" },
  { href: "#forma", label: "Forma" },
  { href: "#sombras", label: "Sombras" },
  { href: "#bordes", label: "Bordes" },
  { href: "#movimiento", label: "Movimiento" },
  { href: "#animaciones", label: "Animaciones" },
  { href: "#formularios", label: "Formularios" },
  { href: "#feedback", label: "Feedback" },
  { href: "#componentes", label: "Componentes" },
  { href: "#inspiracion", label: "Modo sticker" },
] as const;

function pickActiveSection(sections: HTMLElement[]): HTMLElement {
  const first = sections[0]!;

  const doc = document.documentElement;
  const scrollY = window.scrollY;
  const nearBottom =
    window.innerHeight + scrollY >= doc.scrollHeight - 64;

  if (nearBottom) {
    return sections[sections.length - 1] ?? first;
  }

  const probeY = Math.min(window.innerHeight * 0.22, 160);

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom > probeY) {
      return section;
    }
  }

  let current = first;
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= probeY) {
      current = section;
    }
  }

  return current;
}

export function DsTocNav() {
  const [active, setActive] = useState<string>("#inicio");

  useEffect(() => {
    const sectionIds = toc.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    let raf = 0;

    const updateActive = () => {
      const current = pickActiveSection(sections);
      setActive(`#${current.id}`);
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <nav className="ds-toc" aria-label="Secciones del design system">
      <p className="ds-toc-kicker">Índice</p>
      <ul className="ds-toc-list">
        {toc.map((item) => {
          const isActive = active === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`ds-toc-link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "location" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
