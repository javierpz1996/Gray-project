"use client";

import { useState } from "react";
import { Cover2Hero } from "@/components/home/design-2/cover-2-hero";
import {
  cover2SlideMotionLabel,
  cover2SlideMotions,
  cover2SlideSlots,
  type Cover2SlideMotion,
} from "@/lib/cover-2-menu";
import { cover2LogoMarks, type Cover2LogoMark } from "@/lib/cover-2-logo";
import {
  cover2MenuFontLabel,
  cover2MenuFonts,
  cover2MenuScaleMax,
  cover2MenuScaleMin,
  type Cover2MenuItem,
} from "@/lib/cover-2-menu";
import type { HeroCoverConfig } from "@/lib/hero-config";
import { saveCover } from "./actions";
import { PanelNotice } from "./panel-notice";

function rgbToHex(value: string): string {
  const [r = 255, g = 255, b = 255] = value.split(",").map((part) => Number(part));
  return `#${[r, g, b].map((part) => part.toString(16).padStart(2, "0")).join("")}`;
}

function hexToRgb(value: string): string {
  const hex = Number.parseInt(value.slice(1), 16);
  return `${(hex >> 16) & 255},${(hex >> 8) & 255},${hex & 255}`;
}

export function PanelCover2Section({
  revision,
  initial,
}: {
  revision: string;
  initial: HeroCoverConfig;
}) {
  const [mark, setMark] = useState<Cover2LogoMark>(initial.cover2Logo);
  const [play, setPlay] = useState(0);
  const [stack, setStack] = useState(initial.cover2Stack);
  const [menu, setMenu] = useState<Cover2MenuItem[]>(initial.cover2Menu);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [slideMotion, setSlideMotion] = useState<Cover2SlideMotion>(initial.cover2SlideMotion);
  const [slideEvery, setSlideEvery] = useState(initial.cover2SlideEvery);
  const [extras, setExtras] = useState<{ file: File | null; url: string | null }[]>(() =>
    Array.from({ length: Math.max(0, initial.cover2Slides - 1) }, () => ({ file: null, url: null })),
  );
  const [topPreview, setTopPreview] = useState<string | null>(null);
  const [topFile, setTopFile] = useState<File | null>(null);
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; message: string; id: number } | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit(apply: boolean) {
    if (saving) return;
    setSaving(true);
    const data = new FormData();
    data.set("hero", String(initial.heroAnimation));
    data.set("logoAnimation", String(initial.logoAnimation));
    data.set("cover2Logo", mark);
    data.set("cover2Stack", stack ? "1" : "0");
    data.set("cover2Menu", JSON.stringify(menu));
    data.set("cover2Slides", String(1 + extras.length));
    data.set("cover2SlideMotion", slideMotion);
    data.set("cover2SlideEvery", String(slideEvery));
    data.set("coverOption", apply ? "2" : String(initial.coverOption));
    data.set("divider", String(initial.dividerWidth));
    data.set("particles", initial.particles ? "1" : "0");
    data.set("veil", initial.veil ? "1" : "0");
    data.set("halftone", initial.halftone ? "1" : "0");
    data.set("bannerMode", initial.bannerMode);
    data.set("bannerPattern", initial.bannerPattern);
    data.set("bannerColor", initial.bannerColor);
    data.set("bannerBase", initial.bannerBase);
    data.set("bannerShade", String(initial.bannerShade));
    data.set("bannerPositions", initial.bannerPositions.join(","));
    data.set("bannerLinks", JSON.stringify(initial.bannerLinks));
    data.set("bannerMotion", initial.bannerMotion);
    data.set("bannerTile", String(initial.bannerTile));
    data.set("bannerGap", String(initial.bannerGap));
    data.set("bannerSpeed", String(initial.bannerSpeed));
    data.set("bannerFrame", initial.bannerFrame);
    data.set("bannerShadow", initial.bannerShadow);
    data.set("bannerFrameColor", initial.bannerFrameColor);
    data.set("bannerHover", initial.bannerHover);
    if (file) data.set("portada2", file);
    extras.forEach((extra, index) => {
      const slot = cover2SlideSlots[index + 1];
      if (extra.file && slot) data.set(slot, extra.file);
    });
    if (topFile) data.set("logotop", topFile);
    let result: Awaited<ReturnType<typeof saveCover>>;
    try {
      result = await saveCover(data);
    } catch {
      setNotice({
        tone: "error",
        message: "No se pudo guardar. La imagen puede superar el límite. Probá con un archivo más chico.",
        id: Date.now(),
      });
      setSaving(false);
      return;
    }
    setNotice(
      result.ok
        ? { tone: "ok", message: apply ? "Portada 2 aplicada." : "Portada guardada.", id: Date.now() }
        : { tone: "error", message: result.message, id: Date.now() },
    );
    setSaving(false);
  }

  return (
    <>
      {notice ? <PanelNotice key={notice.id} tone={notice.tone} message={notice.message} /> : null}
      <div className="panel-cover2-preview">
        <Cover2Hero
          key={`${mark}-${play}-${stack ? "stack" : "one"}`}
          mark={mark}
          waitForIntro={false}
          topSrc={
            stack
              ? (topPreview ?? `/api/hero-banner/logotop?v=${encodeURIComponent(revision)}`)
              : null
          }
          menu={menu}
          slideMotion={slideMotion}
          slideEvery={slideEvery}
          slides={[
            preview ?? `/api/hero-banner/portada2?v=${encodeURIComponent(revision)}`,
            ...extras.map(
              (extra, index) =>
                extra.url ?? `/api/hero-banner/${cover2SlideSlots[index + 1]}?v=${encodeURIComponent(revision)}`,
            ),
          ]}
        />
      </div>
      <h2 className="mt-8 font-display text-h3 leading-heading">Imágenes del carrusel</h2>
      <p className="mt-2 max-w-prose text-small text-fg-muted">
        La primera es la que se ve al entrar. Agregá más y los triángulos amarillos pasan de una a otra. JPG, PNG o WebP, hasta 8 MB. Máximo 6.
      </p>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="mt-4 cursor-pointer text-nano file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano"
        onChange={(event) => {
          const next = event.target.files?.[0];
          event.target.value = "";
          if (!next) return;
          if (next.size > 8 * 1024 * 1024) {
            setNotice({ tone: "error", message: "La imagen supera 8 MB.", id: Date.now() });
            return;
          }
          const url = URL.createObjectURL(next);
          setPreview((current) => {
            if (current) URL.revokeObjectURL(current);
            return url;
          });
          setFile(next);
        }}
      />
      {extras.map((extra, index) => (
        <div key={cover2SlideSlots[index + 1]} className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-nano text-fg-muted">Imagen {index + 2}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            aria-label={`Imagen ${index + 2}`}
            className="cursor-pointer text-nano file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano"
            onChange={(event) => {
              const next = event.target.files?.[0];
              event.target.value = "";
              if (!next) return;
              if (next.size > 8 * 1024 * 1024) {
                setNotice({ tone: "error", message: "La imagen supera 8 MB.", id: Date.now() });
                return;
              }
              const url = URL.createObjectURL(next);
              setExtras((current) =>
                current.map((entry, i) => {
                  if (i !== index) return entry;
                  if (entry.url) URL.revokeObjectURL(entry.url);
                  return { file: next, url };
                }),
              );
            }}
          />
          <button
            type="button"
            className="panel-anim-chip"
            onClick={() =>
              setExtras((current) => {
                const removed = current[index];
                if (removed?.url) URL.revokeObjectURL(removed.url);
                return current.filter((_, i) => i !== index);
              })
            }
          >
            Quitar
          </button>
        </div>
      ))}
      {extras.length < 5 ? (
        <div className="mt-4">
          <button
            type="button"
            className="cursor-pointer rounded-lg border border-border bg-surface px-4 py-2 text-small text-fg transition-colors duration-150 ease-out hover:bg-hover focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => document.getElementById("cover2-add-slide")?.click()}
          >
            Agregar imagen
          </button>
          <input
            id="cover2-add-slide"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => {
              const next = event.target.files?.[0];
              event.target.value = "";
              if (!next) return;
              if (next.size > 8 * 1024 * 1024) {
                setNotice({ tone: "error", message: "La imagen supera 8 MB.", id: Date.now() });
                return;
              }
              setExtras((current) => [...current, { file: next, url: URL.createObjectURL(next) }]);
            }}
          />
        </div>
      ) : null}
      <div className="panel-anims">
        <p className="panel-anims-title">Animaciones del logo</p>
        <div className="panel-anims-grid">
          {cover2LogoMarks.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className="panel-anim-chip"
              data-active={mark === entry.id ? "true" : "false"}
              aria-pressed={mark === entry.id}
              title={entry.hint}
              onClick={() => {
                setMark(entry.id);
                setPlay((current) => current + 1);
              }}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>
      <div className="panel-anims">
        <p className="panel-anims-title">Animación al cambiar</p>
        <div className="panel-anims-grid">
          {cover2SlideMotions.map((motion) => (
            <button
              key={motion}
              type="button"
              className="panel-anim-chip"
              data-active={slideMotion === motion ? "true" : "false"}
              aria-pressed={slideMotion === motion}
              onClick={() => setSlideMotion(motion)}
            >
              {cover2SlideMotionLabel[motion]}
            </button>
          ))}
        </div>
        <label className="mt-3 flex items-center gap-3 text-nano text-fg-muted">
          {slideEvery === 0 ? "Cambio manual" : `Cambia sola cada ${slideEvery} s`}
          <input
            type="range"
            min={0}
            max={20}
            step={1}
            value={slideEvery}
            aria-label="Segundos entre imágenes"
            className="min-w-0 flex-1"
            onChange={(event) => setSlideEvery(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="panel-anims">
        <p className="panel-anims-title">Logo de arriba</p>
        <div className="panel-anims-grid">
          {(
            [
              { on: false, label: "Solo el wordmark" },
              { on: true, label: "Doble logo" },
            ] as const
          ).map((option) => (
            <button
              key={option.label}
              type="button"
              className="panel-anim-chip"
              data-active={stack === option.on ? "true" : "false"}
              aria-pressed={stack === option.on}
              onClick={() => {
                setStack(option.on);
                setPlay((current) => current + 1);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
        {stack ? (
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="mt-3 cursor-pointer text-nano file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano"
            onChange={(event) => {
              const next = event.target.files?.[0];
              event.target.value = "";
              if (!next) return;
              if (next.size > 8 * 1024 * 1024) {
                setNotice({ tone: "error", message: "La imagen supera 8 MB.", id: Date.now() });
                return;
              }
              const url = URL.createObjectURL(next);
              setTopPreview((current) => {
                if (current) URL.revokeObjectURL(current);
                return url;
              });
              setTopFile(next);
              setPlay((current) => current + 1);
            }}
          />
        ) : null}
      </div>
      <div className="panel-anims">
        <p className="panel-anims-title">Franja de abajo</p>
        <p className="mt-1 max-w-prose text-small text-fg-muted">
          Hasta 8 ítems. Cada uno tiene su texto, tipografía, tamaño y color.
        </p>
        {menu.map((item, index) => (
          <div key={index} className="mt-4 border-t border-border pt-3">
            <div className="flex items-center gap-2">
              <input
                value={item.text}
                maxLength={28}
                aria-label={`Texto del ítem ${index + 1}`}
                className="panel-field"
                onChange={(event) => {
                  const text = event.target.value;
                  setMenu((current) => current.map((entry, i) => (i === index ? { ...entry, text } : entry)));
                }}
              />
              {menu.length > 1 ? (
                <button
                  type="button"
                  className="panel-anim-chip"
                  onClick={() => setMenu((current) => current.filter((_, i) => i !== index))}
                >
                  Quitar
                </button>
              ) : null}
            </div>
            <div className="panel-anims-grid">
              {cover2MenuFonts.map((font) => (
                <button
                  key={font}
                  type="button"
                  className="panel-anim-chip"
                  data-active={item.font === font ? "true" : "false"}
                  aria-pressed={item.font === font}
                  onClick={() => setMenu((current) => current.map((entry, i) => (i === index ? { ...entry, font } : entry)))}
                >
                  {cover2MenuFontLabel[font]}
                </button>
              ))}
            </div>
            <label className="mt-2 flex items-center gap-3 text-nano text-fg-muted">
              Tamaño {item.scale}%
              <input
                type="range"
                min={cover2MenuScaleMin}
                max={cover2MenuScaleMax}
                step={2}
                value={item.scale}
                aria-label={`Tamaño del ítem ${index + 1}`}
                className="min-w-0 flex-1"
                onChange={(event) => {
                  const scale = Number(event.target.value);
                  setMenu((current) => current.map((entry, i) => (i === index ? { ...entry, scale } : entry)));
                }}
              />
            </label>
            <div className="panel-anims-grid">
              <button
                type="button"
                className="panel-anim-chip"
                data-active={item.bold ? "true" : "false"}
                aria-pressed={item.bold}
                onClick={() => setMenu((current) => current.map((entry, i) => (i === index ? { ...entry, bold: !entry.bold } : entry)))}
              >
                Negrita
              </button>
              <button
                type="button"
                className="panel-anim-chip"
                data-active={item.upper ? "true" : "false"}
                aria-pressed={item.upper}
                onClick={() => setMenu((current) => current.map((entry, i) => (i === index ? { ...entry, upper: !entry.upper } : entry)))}
              >
                Mayúsculas
              </button>
            </div>
            <label className="mt-2 flex items-center gap-2 text-nano text-fg-muted">
              Color
              <input
                type="color"
                value={rgbToHex(item.color)}
                aria-label={`Color del ítem ${index + 1}`}
                onChange={(event) => {
                  const color = hexToRgb(event.target.value);
                  setMenu((current) => current.map((entry, i) => (i === index ? { ...entry, color } : entry)));
                }}
              />
            </label>
          </div>
        ))}
        {menu.length < 8 ? (
          <button
            type="button"
            className="panel-anim-chip mt-3"
            onClick={() =>
              setMenu((current) => [
                ...current,
                { text: "Nuevo", font: "display", scale: 100, bold: true, upper: true, color: "255,255,255" },
              ])
            }
          >
            Agregar ítem
          </button>
        ) : null}
      </div>
      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-border bg-surface px-4 py-2 text-small text-fg transition-colors duration-150 ease-out hover:bg-hover focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-70"
          disabled={saving}
          onClick={() => void submit(true)}
        >
          {saving ? "Aplicando…" : "Aplicar"}
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-ink px-4 py-2 text-small text-canvas transition-colors duration-150 ease-out hover:bg-ink-deep focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-70"
          disabled={saving}
          onClick={() => void submit(false)}
        >
          {saving ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </>
  );
}
