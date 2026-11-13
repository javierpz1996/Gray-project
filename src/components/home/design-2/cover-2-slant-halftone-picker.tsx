"use client";

import Image from "next/image";
import Link from "next/link";
import {
  COVER2_SLANT_HALFTONE_ASSETS,
  COVER2_SLANT_HALFTONE_IDS,
  COVER2_SLANT_HALFTONE_SHORT,
  type Cover2SlantHalftoneId,
} from "@/lib/cover-2-slant-halftone";
import "./cover-2-slant-halftone-picker.css";

export function Cover2SlantHalftonePicker({
  value,
  onChange,
}: {
  value: Cover2SlantHalftoneId;
  onChange: (id: Cover2SlantHalftoneId) => void;
}) {
  return (
    <div className="cover-2-halftone-lab" role="region" aria-label="Elegir halftone del panel GRAYBY">
      <div className="cover-2-halftone-lab__head">
        <p className="cover-2-halftone-lab__title">Halftone (esquina GRAYBY) — activa: {value}</p>
        <Link className="cover-2-halftone-lab__link" href="/diseno-2/halftone">
          Ver las 5 en grande
        </Link>
      </div>
      <div className="cover-2-halftone-lab__grid" role="listbox" aria-label="Variantes de halftone">
        {COVER2_SLANT_HALFTONE_IDS.map((id) => (
          <button
            key={id}
            type="button"
            role="option"
            aria-selected={value === id}
            className="cover-2-halftone-lab__option"
            data-active={value === id ? "true" : "false"}
            onClick={() => onChange(id)}
          >
            <span className="cover-2-halftone-lab__thumb">
              <Image
                src={COVER2_SLANT_HALFTONE_ASSETS[id]}
                alt=""
                fill
                unoptimized
                sizes="80px"
              />
            </span>
            <span className="cover-2-halftone-lab__meta">
              <span className="cover-2-halftone-lab__num">{id}</span>
              <span className="cover-2-halftone-lab__short">{COVER2_SLANT_HALFTONE_SHORT[id]}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
