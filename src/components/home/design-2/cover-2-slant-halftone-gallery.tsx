"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  COVER2_SLANT_HALFTONE_ASSETS,
  COVER2_SLANT_HALFTONE_IDS,
  COVER2_SLANT_HALFTONE_LABELS,
  COVER2_SLANT_HALFTONE_STORAGE_KEY,
  parseCover2SlantHalftone,
  type Cover2SlantHalftoneId,
} from "@/lib/cover-2-slant-halftone";
import "./cover-2-slant-halftone-gallery.css";

function readStoredHalftone(): Cover2SlantHalftoneId {
  if (typeof window === "undefined") return 1;
  return parseCover2SlantHalftone(localStorage.getItem(COVER2_SLANT_HALFTONE_STORAGE_KEY) ?? undefined);
}

function subscribeHalftone(onStoreChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === COVER2_SLANT_HALFTONE_STORAGE_KEY || e.key === null) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("cover2-slant-halftone-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("cover2-slant-halftone-change", onStoreChange);
  };
}

function persistHalftone(id: Cover2SlantHalftoneId) {
  localStorage.setItem(COVER2_SLANT_HALFTONE_STORAGE_KEY, String(id));
  window.dispatchEvent(new Event("cover2-slant-halftone-change"));
}

export function Cover2SlantHalftoneGallery() {
  const active = useSyncExternalStore(subscribeHalftone, readStoredHalftone, () => 1 as Cover2SlantHalftoneId);

  return (
    <div className="cover-2-halftone-gallery">
      <div className="cover-2-halftone-gallery__inner">
        <Link className="cover-2-halftone-gallery__back" href="/diseno-2">
          Volver al hero
        </Link>
        <h1>Cinco halftones para la esquina GRAYBY</h1>
        <p className="cover-2-halftone-gallery__lead">
          Cada tarjeta es la textura completa. «Usar en el hero» la aplica al panel izquierdo y te lleva a
          diseño 2. La opción guardada ahora mismo es la {active}.
        </p>
        <div className="cover-2-halftone-gallery__grid">
          {COVER2_SLANT_HALFTONE_IDS.map((id) => (
            <article
              key={id}
              className="cover-2-halftone-gallery__card"
              aria-current={active === id ? "true" : undefined}
            >
              <div className="cover-2-halftone-gallery__preview">
                <Image
                  src={COVER2_SLANT_HALFTONE_ASSETS[id]}
                  alt={`Vista previa halftone ${id}`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 20rem"
                />
              </div>
              <p className="cover-2-halftone-gallery__label">
                {id}. {COVER2_SLANT_HALFTONE_LABELS[id]}
              </p>
              <p className="cover-2-halftone-gallery__desc">
                {active === id ? "Esta es la que está activa en el hero." : "Podés probarla en el panel del hero."}
              </p>
              <div className="cover-2-halftone-gallery__actions">
                <Link
                  className="cover-2-halftone-gallery__btn"
                  href={`/diseno-2?halftone=${id}`}
                  onClick={() => persistHalftone(id)}
                >
                  Usar en el hero
                </Link>
                <Link
                  className="cover-2-halftone-gallery__btn"
                  data-variant="ghost"
                  href={`/diseno-2?halftone=${id}`}
                >
                  Solo previsualizar
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
