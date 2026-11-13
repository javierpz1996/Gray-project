"use client";

import { useState } from "react";
import type { HeroCoverConfig } from "@/lib/hero-config";
import type { LibrosBandsConfig } from "@/lib/libros-bands";
import { PanelBannerSection } from "./panel-banner-section";
import { PanelCoverSection } from "./panel-cover-section";
import { PanelCover2Section } from "./panel-cover-2-section";
import { PanelLibrosSection } from "./panel-libros-section";
import { PanelEfectosSection } from "./panel-efectos-section";
import { PanelMenuSection } from "./panel-menu-section";
import { PanelSide } from "./panel-side";

export function PanelWorkspace({
  revision,
  initial,
  libros,
  menuApplied,
}: {
  revision: string;
  initial: HeroCoverConfig;
  libros: LibrosBandsConfig;
  menuApplied: boolean;
}) {
  const [section, setSection] = useState<"portada" | "banners" | "libros" | "menu" | "efectos">("portada");
  const [cover, setCover] = useState<1 | 2>(1);
  const [librosPart, setLibrosPart] = useState<"bandas" | "texto" | "imagenes" | "sticker" | "fondo">("bandas");

  return (
    <div className="panel-shell">
      <PanelSide
        section={section}
        cover={cover}
        librosPart={librosPart}
        onSection={setSection}
        onCover={(next) => {
          setCover(next);
          setSection("portada");
        }}
        onLibros={(part) => {
          setLibrosPart(part);
          setSection("libros");
        }}
      />
      <section className="panel-main">
        {section === "menu" ? (
          <PanelMenuSection applied={menuApplied} />
        ) : section === "efectos" ? (
          <PanelEfectosSection />
        ) : section === "banners" ? (
          <PanelBannerSection key={`banners-${revision}`} revision={revision} initial={initial} />
        ) : section === "libros" ? (
          <PanelLibrosSection key={`libros-${revision}`} revision={revision} initial={libros} part={librosPart} />
        ) : (
          <>
            <p className="panel-crumb">Panel / Hero</p>
            <h1 className="mt-3 font-display text-h2 leading-heading tracking-title">
              Configuración de portada #{cover}
            </h1>
            <p className="mt-2 max-w-prose text-small text-fg-muted">
              La primera pantalla del sitio.
            </p>
            {cover === 2 ? (
            <PanelCover2Section key={`cover2-${revision}`} revision={revision} initial={initial} />
          ) : (
            <PanelCoverSection key={revision} revision={revision} initial={initial} />
          )}
          </>
        )}
      </section>
    </div>
  );
}
