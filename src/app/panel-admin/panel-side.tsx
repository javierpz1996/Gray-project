"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  GalleryHorizontal,
  House,
  Image as ImageIcon,
  Menu,
  Sparkles,
} from "lucide-react";
import { leavePanelAdmin } from "./actions";

const covers = ["Opción #1", "Opción #2"] as const;

const librosParts = [
  ["bandas", "Bandas"],
  ["texto", "Texto principal"],
  ["imagenes", "Imágenes y descripciones"],
  ["sticker", "Sticker/Imagen/Video"],
  ["fondo", "Fondo"],
] as const;

export function PanelSide({
  section,
  cover,
  librosPart,
  onSection,
  onCover,
  onLibros,
}: {
  section: "portada" | "banners" | "libros" | "menu" | "efectos";
  cover: 1 | 2;
  librosPart: "bandas" | "texto" | "imagenes" | "sticker" | "fondo";
  onSection: (section: "portada" | "banners" | "libros" | "menu" | "efectos") => void;
  onCover: (cover: 1 | 2) => void;
  onLibros: (part: "bandas" | "texto" | "imagenes" | "sticker" | "fondo") => void;
}) {
  const [coversOpen, setCoversOpen] = useState(true);
  const [librosOpen, setLibrosOpen] = useState(true);

  return (
    <aside className="panel-side">
      <p className="panel-brand">Panel de configuraciones</p>
      <nav className="panel-nav" aria-label="Secciones del panel">
        <button type="button" className="panel-nav-row">
          <House aria-hidden="true" />
          <span>General</span>
        </button>
        <button
          type="button"
          className="panel-nav-row"
          aria-expanded={coversOpen}
          onClick={() => setCoversOpen((open) => !open)}
        >
          <ImageIcon aria-hidden="true" />
          <span>Portadas</span>
          <ChevronRight className="panel-nav-chevron" data-open={coversOpen ? "true" : "false"} aria-hidden="true" />
        </button>
        <div className="panel-nav-fold" data-open={coversOpen ? "true" : "false"}>
          <ul className="panel-nav-tree">
            {covers.map((label, index) => (
              <li key={label}>
                <button
                  type="button"
                  className="panel-nav-row panel-nav-row--child"
                  data-active={section === "portada" && cover === index + 1 ? "true" : "false"}
                  aria-current={section === "portada" && cover === index + 1 ? "page" : undefined}
                  tabIndex={coversOpen ? 0 : -1}
                  onClick={() => {
                    if (index === 0) onCover(1);
                    if (index === 1) onCover(2);
                  }}
                >
                  <ImageIcon aria-hidden="true" />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="panel-nav-row"
          data-active={section === "banners" ? "true" : "false"}
          aria-current={section === "banners" ? "page" : undefined}
          onClick={() => onSection("banners")}
        >
          <GalleryHorizontal aria-hidden="true" />
          <span>Banners</span>
        </button>
        <button
          type="button"
          className="panel-nav-row"
          aria-expanded={librosOpen}
          onClick={() => setLibrosOpen((open) => !open)}
        >
          <BookOpen aria-hidden="true" />
          <span>Sección libros</span>
          <ChevronRight className="panel-nav-chevron" data-open={librosOpen ? "true" : "false"} aria-hidden="true" />
        </button>
        <div className="panel-nav-fold" data-open={librosOpen ? "true" : "false"}>
          <ul className="panel-nav-tree">
            {librosParts.map(([part, label]) => (
              <li key={part}>
                <button
                  type="button"
                  className="panel-nav-row panel-nav-row--child"
                  data-active={section === "libros" && librosPart === part ? "true" : "false"}
                  aria-current={section === "libros" && librosPart === part ? "page" : undefined}
                  tabIndex={librosOpen ? 0 : -1}
                  onClick={() => onLibros(part)}
                >
                  <BookOpen aria-hidden="true" />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="panel-nav-row"
          data-active={section === "efectos" ? "true" : "false"}
          aria-current={section === "efectos" ? "page" : undefined}
          onClick={() => onSection("efectos")}
        >
          <Sparkles aria-hidden="true" />
          <span>Efectos</span>
        </button>
        <button
          type="button"
          className="panel-nav-row"
          data-active={section === "menu" ? "true" : "false"}
          aria-current={section === "menu" ? "page" : undefined}
          onClick={() => onSection("menu")}
        >
          <Menu aria-hidden="true" />
          <span>Menú</span>
        </button>
      </nav>
      <form action={leavePanelAdmin}>
        <button type="submit" className="panel-nav-row panel-nav-leave">
          Salir
        </button>
      </form>
    </aside>
  );
}
