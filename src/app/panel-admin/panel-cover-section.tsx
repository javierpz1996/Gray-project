"use client";

import { useEffect, useRef, useState } from "react";
import {
  heroPanelLabels,
  heroPanelPhotos,
  heroPanelSlots,
  type HeroPanelSlot,
} from "@/content/hero-panels";
import type { HeroCoverConfig } from "@/lib/hero-config";
import {
  homeDesign1HeroAnimations,
  type HomeDesign1HeroAnimationId,
} from "@/lib/home-design-1-hero-animation";
import {
  homeDesign1LogoAnimations,
  type HomeDesign1LogoAnimationId,
} from "@/lib/home-design-1-logo-animation";
import { saveCover } from "./actions";
import { HeroPreview } from "./hero-preview";
import { PanelNotice } from "./panel-notice";

function YesNo({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="panel-anims-grid">
      <button
        type="button"
        className="panel-anim-chip"
        data-active={value ? "true" : "false"}
        aria-pressed={value}
        onClick={() => onChange(true)}
      >
        Sí
      </button>
      <button
        type="button"
        className="panel-anim-chip"
        data-active={value ? "false" : "true"}
        aria-pressed={!value}
        onClick={() => onChange(false)}
      >
        No
      </button>
    </div>
  );
}

export function PanelCoverSection({
  revision,
  initial,
}: {
  revision: string;
  initial: HeroCoverConfig;
}) {
  const [heroAnimation, setHeroAnimation] = useState<HomeDesign1HeroAnimationId>(
    initial.heroAnimation,
  );
  const [logoAnimation, setLogoAnimation] = useState<HomeDesign1LogoAnimationId>(initial.logoAnimation);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [particles, setParticles] = useState(initial.particles);
  const [dividerWidth, setDividerWidth] = useState(initial.dividerWidth);
  const [veil, setVeil] = useState(initial.veil);
  const [halftone, setHalftone] = useState(initial.halftone);
  const [pending, setPending] = useState<Partial<Record<HeroPanelSlot, string>>>({});
  const [files, setFiles] = useState<Partial<Record<HeroPanelSlot, File>>>({});
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; message: string; id: number } | null>(null);
  const [saving, setSaving] = useState(false);

  const pendingRef = useRef(pending);
  pendingRef.current = pending;

  async function submit(apply: boolean) {
    if (saving) return;
    setSaving(true);
    setNotice(null);
    const data = new FormData();
    data.set("hero", String(heroAnimation));
    data.set("logoAnimation", String(logoAnimation));
    data.set("cover2Logo", initial.cover2Logo);
    data.set("cover2Stack", initial.cover2Stack ? "1" : "0");
    data.set("cover2Menu", JSON.stringify(initial.cover2Menu));
    data.set("cover2Slides", String(initial.cover2Slides));
    data.set("cover2SlideMotion", initial.cover2SlideMotion);
    data.set("cover2SlideEvery", String(initial.cover2SlideEvery));
    data.set("coverOption", apply ? "1" : String(initial.coverOption));
    if (logoFile) data.set("logo", logoFile);
    data.set("divider", String(dividerWidth));
    data.set("particles", particles ? "1" : "0");
    data.set("veil", veil ? "1" : "0");
    data.set("halftone", halftone ? "1" : "0");
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
    for (const slot of heroPanelSlots) {
      const file = files[slot];
      if (file) data.set(slot, file);
    }
    try {
      const result = await saveCover(data);
      setNotice(
        result.ok
          ? { tone: "ok", message: apply ? "Portada 1 aplicada." : "Portada guardada.", id: Date.now() }
          : { tone: "error", message: result.message, id: Date.now() },
      );
    } catch (error) {
      const text = error instanceof Error ? error.message : "";
      setNotice({
        tone: "error",
        message: /body exceeded|body size|mb limit/i.test(text)
          ? "La imagen supera el tamaño permitido. Usa un archivo de hasta 8 MB."
          : "No se pudo guardar la portada.",
        id: Date.now(),
      });
    } finally {
      setSaving(false);
    }
  }


  useEffect(() => {
    return () => {
      for (const url of Object.values(pendingRef.current)) {
        if (url) URL.revokeObjectURL(url);
      }
    };
  }, []);

  return (
    <>
      {notice ? <PanelNotice key={notice.id} tone={notice.tone} message={notice.message} /> : null}
      <HeroPreview
        revision={revision}
        heroAnimation={heroAnimation}
        logoAnimation={logoAnimation}
        logoSrc={logoPreview ?? `/api/hero-banner/logo?v=${encodeURIComponent(revision)}`}
        particles={particles}
        dividerWidth={dividerWidth}
        veil={veil}
        halftone={halftone}
        photos={pending}
      />
      <h2 className="mt-8 font-display text-h3 leading-heading">Imágenes</h2>
      <p className="mt-2 max-w-prose text-small text-fg-muted">
        JPG, PNG o WebP, hasta 8 MB. Cada fila reemplaza una casilla. Se aplican al guardar.
      </p>
      <div className="panel-queue">
        {heroPanelSlots.map((slot) => (
          <div key={slot} className="panel-file">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pending[slot] ?? `${heroPanelPhotos[slot]}?v=${encodeURIComponent(revision)}`}
              alt=""
            />
            <div>
              <h3 className="text-small font-semibold">{heroPanelLabels[slot]}</h3>
              <div className="panel-file-actions">
                <label className="text-nano text-fg-muted" htmlFor={`image-${slot}`}>
                  Nueva imagen
                </label>
                <input
                  id={`image-${slot}`}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="cursor-pointer text-nano file:mr-2 file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano file:text-fg"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    if (file.size > 8 * 1024 * 1024) {
                      setNotice({ tone: "error", message: "La imagen supera 8 MB.", id: Date.now() });
                      return;
                    }
                    const url = URL.createObjectURL(file);
                    setPending((current) => {
                      const previous = current[slot];
                      if (previous) URL.revokeObjectURL(previous);
                      return { ...current, [slot]: url };
                    });
                    setFiles((current) => ({ ...current, [slot]: file }));
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="panel-anims">
        <p className="panel-anims-title">Logo</p>
        <div className="panel-file">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoPreview ?? `/api/hero-banner/logo?v=${encodeURIComponent(revision)}`} alt="" />
          <div>
            <h3 className="text-small font-semibold">Logo del centro</h3>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="cursor-pointer text-nano file:mr-2 file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano file:text-fg"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (!file) return;
                if (file.size > 8 * 1024 * 1024) {
                  setNotice({ tone: "error", message: "La imagen supera 8 MB.", id: Date.now() });
                  return;
                }
                const url = URL.createObjectURL(file);
                setLogoPreview((current) => {
                  if (current) URL.revokeObjectURL(current);
                  return url;
                });
                setLogoFile(file);
              }}
            />
          </div>
        </div>
        <p className="panel-anims-title">Animaciones del logo</p>
        <div className="panel-anims-grid">
          {homeDesign1LogoAnimations.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className="panel-anim-chip"
              data-active={logoAnimation === entry.id ? "true" : "false"}
              aria-pressed={logoAnimation === entry.id}
              title={entry.hint}
              onClick={() => setLogoAnimation(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <p className="panel-anims-title">Animaciones del hero</p>
        <div className="panel-anims-grid">
          {homeDesign1HeroAnimations.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className="panel-anim-chip"
              data-active={heroAnimation === entry.id ? "true" : "false"}
              aria-pressed={heroAnimation === entry.id}
              title={entry.hint}
              onClick={() => setHeroAnimation(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <p className="panel-anims-title">Líneas</p>
        <div className="panel-anims-grid">
          {(
            [
              { width: 4, label: "Finas" },
              { width: 10, label: "Normal" },
              { width: 18, label: "Anchas" },
            ] as const
          ).map((option) => (
            <button
              key={option.width}
              type="button"
              className="panel-anim-chip"
              data-active={dividerWidth === option.width ? "true" : "false"}
              aria-pressed={dividerWidth === option.width}
              onClick={() => setDividerWidth(option.width)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="panel-anims-title">Velo</p>
        <YesNo value={veil} onChange={setVeil} />
        <p className="panel-anims-title">Trama</p>
        <YesNo value={halftone} onChange={setHalftone} />
        <p className="panel-anims-title">Partículas</p>
        <YesNo value={particles} onChange={setParticles} />
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
        aria-busy={saving}
        onClick={() => void submit(false)}
      >
        {saving ? "Guardando…" : "Guardar"}
      </button>
      </div>
    </>
  );
}
