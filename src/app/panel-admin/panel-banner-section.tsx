"use client";

import { useState } from "react";
import { HomeSnsSection } from "@/components/home/sns/home-sns-section";
import { parseBannerRgb, type BannerFocus, type BannerPattern, type HeroCoverConfig } from "@/lib/hero-config";
import { saveCover } from "./actions";
import { PanelNotice } from "./panel-notice";

export function PanelBannerSection({
  initial,
  revision,
}: {
  initial: HeroCoverConfig;
  revision: string;
}) {
  const [bannerMode, setBannerMode] = useState(initial.bannerMode);
  const [bannerPattern, setBannerPattern] = useState<BannerPattern>(initial.bannerPattern);
  const parsed = parseBannerRgb(initial.bannerColor);
  const [rgb, setRgb] = useState<[number, number, number]>(
    parsed
      ? (parsed.split(",").map(Number) as [number, number, number])
      : [255, 255, 255],
  );
  const saved = (slot: string) => `/api/hero-banner/${slot}?v=${encodeURIComponent(revision)}`;
  const bannerColor = rgb.join(",");
  const parsedBase = parseBannerRgb(initial.bannerBase);
  const [base, setBase] = useState<[number, number, number]>(
    parsedBase
      ? (parsedBase.split(",").map(Number) as [number, number, number])
      : [110, 110, 115],
  );
  const bannerBase = base.join(",");
  const [bannerShade, setBannerShade] = useState(initial.bannerShade);
  const [positions, setPositions] = useState<[BannerFocus, BannerFocus, BannerFocus]>(
    initial.bannerPositions,
  );
  const [links, setLinks] = useState<[string, string, string]>(initial.bannerLinks);
  const [motion, setMotion] = useState(initial.bannerMotion);
  const [tileSize, setTileSize] = useState(initial.bannerTile);
  const [tileGap, setTileGap] = useState(initial.bannerGap);
  const [speed, setSpeed] = useState(initial.bannerSpeed);
  const [frame, setFrame] = useState(initial.bannerFrame);
  const [shadow, setShadow] = useState(initial.bannerShadow);
  const [hover, setHover] = useState(initial.bannerHover);
  const parsedFrame = parseBannerRgb(initial.bannerFrameColor);
  const [frameRgb, setFrameRgb] = useState<[number, number, number]>(
    parsedFrame
      ? (parsedFrame.split(",").map(Number) as [number, number, number])
      : [255, 255, 255],
  );
  const frameColor = frameRgb.join(",");
  const [pending, setPending] = useState<Partial<Record<"1" | "2" | "3" | "bg" | "tile", string>>>({});
  const [files, setFiles] = useState<Partial<Record<"1" | "2" | "3" | "bg" | "tile", File>>>({});
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; message: string; id: number } | null>(null);
  const [saving, setSaving] = useState(false);

  function pick(slot: "1" | "2" | "3" | "bg" | "tile", file: File | undefined) {
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
  }

  return (
    <>
      {notice ? <PanelNotice key={notice.id} tone={notice.tone} message={notice.message} /> : null}
      <p className="panel-crumb">Panel / Banners</p>
      <h1 className="mt-3 font-display text-h2 leading-heading tracking-title">Banners</h1>
      <p className="mt-2 max-w-prose text-small text-fg-muted">
        La franja de debajo del hero. Tres piezas, con patrón o imagen de fondo.
      </p>
      <div className="mt-6">
        <HomeSnsSection
          banners={[
            pending["1"] ?? saved("1"),
            pending["2"] ?? saved("2"),
            pending["3"] ?? saved("3"),
          ]}
          mode={bannerMode}
          pattern={bannerPattern}
          color={bannerColor}
          shade={bannerShade}
          base={bannerBase}
          positions={positions}
          links={links}
          motion={motion}
          tile={bannerPattern === "custom" ? (pending.tile ?? saved("tile")) : null}
          tileSize={tileSize}
          tileGap={tileGap}
          speed={speed}
          frame={frame}
          shadow={shadow}
          hover={hover}
          frameColor={frameColor}
          background={pending.bg ?? (bannerMode === "image" ? saved("bg") : null)}
        />
      </div>
      <div className="panel-anims">
        <p className="panel-anims-title">Piezas</p>
        <div className="panel-queue">
          {(["1", "2", "3"] as const).map((slot) => (
            <div key={slot} className="panel-file">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pending[slot] ?? saved(slot)} alt="" />
              <span className="text-small font-semibold">Banner {slot}</span>
              <span className="text-nano text-fg-muted">Encuadre</span>
              <div className="panel-anims-grid">
                {(
                  [
                    ["top", "Arriba"],
                    ["center", "Medio"],
                    ["bottom", "Abajo"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    className="panel-anim-chip"
                    data-active={positions[Number(slot) - 1] === id ? "true" : "false"}
                    aria-pressed={positions[Number(slot) - 1] === id}
                    onClick={() =>
                      setPositions((current) => {
                        const next: [BannerFocus, BannerFocus, BannerFocus] = [...current];
                        next[Number(slot) - 1] = id;
                        return next;
                      })
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
              <label className="text-nano text-fg-muted">
                Enlace
                <input
                  type="url"
                  inputMode="url"
                  placeholder="https://"
                  value={links[Number(slot) - 1]}
                  className="mt-1 w-full rounded-md border border-border bg-surface px-2 py-1 text-small"
                  onChange={(event) =>
                    setLinks((current) => {
                      const next: [string, string, string] = [...current];
                      next[Number(slot) - 1] = event.target.value;
                      return next;
                    })
                  }
                />
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="cursor-pointer text-nano file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano"
                onChange={(event) => pick(slot, event.target.files?.[0])}
              />
            </div>
          ))}
        </div>
        <p className="panel-anims-title">Color de fondo</p>
        <div className="panel-anims-grid">
          {(["R", "G", "B"] as const).map((channel, index) => (
            <label key={channel} className="text-small">
              {channel}
              <input
                type="number"
                min={0}
                max={255}
                inputMode="numeric"
                value={base[index]}
                className="mt-1 w-full cursor-pointer rounded-md border border-border bg-surface px-2 py-1 text-small"
                onChange={(event) => {
                  const next = Number(event.target.value);
                  if (!Number.isInteger(next) || next < 0 || next > 255) return;
                  setBase((current) => {
                    const copy: [number, number, number] = [...current];
                    copy[index] = next;
                    return copy;
                  });
                }}
              />
            </label>
          ))}
        </div>
        <p className="panel-anims-title">Fondo</p>
        <div className="panel-anims-grid">
          <button type="button" className="panel-anim-chip" data-active={bannerMode === "pattern" ? "true" : "false"} aria-pressed={bannerMode === "pattern"} onClick={() => setBannerMode("pattern")}>Patrón</button>
          <button type="button" className="panel-anim-chip" data-active={bannerMode === "image" ? "true" : "false"} aria-pressed={bannerMode === "image"} onClick={() => setBannerMode("image")}>Imagen</button>
        </div>
        <p className="panel-anims-title">Animación</p>
        <div className="panel-anims-grid">
          {(
            [
              ["off", "Quieto"],
              ["left", "Izquierda"],
              ["right", "Derecha"],
              ["up", "Arriba"],
              ["down", "Abajo"],
              ["diagonal", "Diagonal"],
              ["diagonalAlt", "Diagonal inversa"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className="panel-anim-chip"
              data-active={motion === id ? "true" : "false"}
              aria-pressed={motion === id}
              onClick={() => setMotion(id)}
            >
              {label}
            </button>
          ))}
        </div>
        {motion !== "off" ? (
          <>
            <p className="panel-anims-title">Velocidad</p>
            <div className="panel-anims-grid">
              {(
                [
                  [28, "Lenta"],
                  [16, "Normal"],
                  [8, "Rápida"],
                  [4, "Muy rápida"],
                  [2, "Muy muy rápida"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className="panel-anim-chip"
                  data-active={speed === value ? "true" : "false"}
                  aria-pressed={speed === value}
                  onClick={() => setSpeed(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        ) : null}
        <p className="panel-anims-title">Marco</p>
        <div className="panel-anims-grid">
          {(
            [
              ["classic", "Clásico"],
              ["thin", "Fino"],
              ["thick", "Grueso"],
              ["double", "Doble"],
              ["dashed", "Punteado"],
              ["rounded", "Redondo"],
              ["none", "Ninguno"],
            ] as const
          ).map(([id, label]) => (
            <button key={id} type="button" className="panel-anim-chip" data-active={frame === id ? "true" : "false"} aria-pressed={frame === id} onClick={() => setFrame(id)}>
              {label}
            </button>
          ))}
        </div>
        {frame !== "none" ? (
          <>
            <p className="panel-anims-title">Color del marco</p>
            <div className="panel-anims-grid">
              {(["R", "G", "B"] as const).map((channel, index) => (
                <label key={channel} className="text-small">
                  {channel}
                  <input
                    type="number"
                    min={0}
                    max={255}
                    inputMode="numeric"
                    value={frameRgb[index]}
                    className="mt-1 w-full cursor-pointer rounded-md border border-border bg-surface px-2 py-1 text-small"
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      if (!Number.isInteger(next) || next < 0 || next > 255) return;
                      setFrameRgb((current) => {
                        const copy: [number, number, number] = [...current];
                        copy[index] = next;
                        return copy;
                      });
                    }}
                  />
                </label>
              ))}
            </div>
          </>
        ) : null}
        <p className="panel-anims-title">Sombra</p>
        <div className="panel-anims-grid">
          {(
            [
              ["hard", "Dura"],
              ["long", "Larga"],
              ["soft", "Suave"],
              ["glow", "Halo"],
              ["none", "Ninguna"],
            ] as const
          ).map(([id, label]) => (
            <button key={id} type="button" className="panel-anim-chip" data-active={shadow === id ? "true" : "false"} aria-pressed={shadow === id} onClick={() => setShadow(id)}>
              {label}
            </button>
          ))}
        </div>
        <p className="panel-anims-title">Al pasar el mouse</p>
        <div className="panel-anims-grid">
          {(
            [
              ["shake", "Temblor"],
              ["lift", "Levantar"],
              ["zoom", "Zoom"],
              ["tilt", "Inclinar"],
              ["pop", "Salto"],
              ["none", "Nada"],
            ] as const
          ).map(([id, label]) => (
            <button key={id} type="button" className="panel-anim-chip" data-active={hover === id ? "true" : "false"} aria-pressed={hover === id} onClick={() => setHover(id)}>
              {label}
            </button>
          ))}
        </div>
        {bannerMode === "pattern" ? (
          <>
            <p className="panel-anims-title">Tipo</p>
            <div className="panel-anims-grid">
              {(
                [
                  ["dots", "Puntos"],
                  ["stripes", "Rayas"],
                  ["grid", "Grilla"],
                  ["lines", "Líneas"],
                  ["columns", "Columnas"],
                  ["checker", "Damero"],
                  ["cross", "Cruzado"],
                  ["rings", "Anillos"],
                  ["diamonds", "Rombos"],
                  ["chevrons", "Chevrones"],
                  ["pluses", "Cruces"],
                  ["confetti", "Salpicado"],
                  ["custom", "Propio"],
                ] as const
              ).map(([id, label]) => (
                <button key={id} type="button" className="panel-anim-chip" data-active={bannerPattern === id ? "true" : "false"} aria-pressed={bannerPattern === id} onClick={() => setBannerPattern(id)}>
                  {label}
                </button>
              ))}
            </div>
            {bannerPattern === "custom" ? (
              <>
                <p className="panel-anims-title">Imagen del patrón</p>
                <p className="max-w-prose text-small text-fg-muted">
                  Subila en PNG o WebP sin fondo. Si trae un fondo propio, al repetirse se va a ver el recuadro.
                </p>
                <input
                  type="file"
                  accept="image/png,image/webp,image/jpeg"
                  className="cursor-pointer text-nano file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano"
                  onChange={(event) => pick("tile", event.target.files?.[0])}
                />
                <p className="panel-anims-title">Tamaño del patrón</p>
                <div className="panel-anims-grid">
                  {(
                    [
                      [24, "Chico"],
                      [48, "Medio"],
                      [80, "Grande"],
                      [120, "Enorme"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      className="panel-anim-chip"
                      data-active={tileSize === value ? "true" : "false"}
                      aria-pressed={tileSize === value}
                      onClick={() => setTileSize(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="panel-anims-title">Cantidad</p>
                <p className="max-w-prose text-small text-fg-muted">
                  El tamaño no cambia. Más separados entran menos dibujos.
                </p>
                <div className="panel-anims-grid">
                  {(
                    [
                      [0, "Juntos"],
                      [20, "Cerca"],
                      [48, "Medio"],
                      [96, "Lejos"],
                      [160, "Sueltos"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      className="panel-anim-chip"
                      data-active={tileGap === value ? "true" : "false"}
                      aria-pressed={tileGap === value}
                      onClick={() => setTileGap(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
            <>
            <p className="panel-anims-title">Color del patrón</p>
            <div className="panel-anims-grid">
              {(["R", "G", "B"] as const).map((channel, index) => (
                <label key={channel} className="text-small">
                  {channel}
                  <input
                    type="number"
                    min={0}
                    max={255}
                    inputMode="numeric"
                    value={rgb[index]}
                    className="mt-1 w-full cursor-pointer rounded-md border border-border bg-surface px-2 py-1 text-small"
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      if (!Number.isInteger(next) || next < 0 || next > 255) return;
                      setRgb((current) => {
                        const copy: [number, number, number] = [...current];
                        copy[index] = next;
                        return copy;
                      });
                    }}
                  />
                </label>
              ))}
            </div>
            </>
            )}
          </>
        ) : (
          <>
            <p className="panel-anims-title">Imagen de fondo</p>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="cursor-pointer text-nano file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano"
              onChange={(event) => pick("bg", event.target.files?.[0])}
            />
            <p className="panel-anims-title">Oscurecer</p>
            <div className="panel-anims-grid">
              {(
                [
                  [0, "Nada"],
                  [35, "Medio"],
                  [65, "Fuerte"],
                ] as const
              ).map(([value, label]) => (
                <button key={value} type="button" className="panel-anim-chip" data-active={bannerShade === value ? "true" : "false"} aria-pressed={bannerShade === value} onClick={() => setBannerShade(value)}>
                  {label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-ink px-4 py-2 text-small text-canvas transition-colors duration-150 ease-out hover:bg-ink-deep focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-70"
          disabled={saving}
          aria-busy={saving}
          onClick={async () => {
            if (saving) return;
            setSaving(true);
            setNotice(null);
            const data = new FormData();
            data.set("hero", String(initial.heroAnimation));
            data.set("logoAnimation", String(initial.logoAnimation));
            data.set("cover2Logo", initial.cover2Logo);
            data.set("cover2Stack", initial.cover2Stack ? "1" : "0");
            data.set("cover2Menu", JSON.stringify(initial.cover2Menu));
            data.set("cover2Slides", String(initial.cover2Slides));
            data.set("cover2SlideMotion", initial.cover2SlideMotion);
            data.set("cover2SlideEvery", String(initial.cover2SlideEvery));
            data.set("coverOption", String(initial.coverOption));
            data.set("divider", String(initial.dividerWidth));
            data.set("particles", initial.particles ? "1" : "0");
            data.set("veil", initial.veil ? "1" : "0");
            data.set("halftone", initial.halftone ? "1" : "0");
            data.set("bannerMode", bannerMode);
            data.set("bannerPattern", bannerPattern);
            data.set("bannerColor", bannerColor);
            data.set("bannerBase", bannerBase);
            data.set("bannerShade", String(bannerShade));
            data.set("bannerPositions", positions.join(","));
            data.set("bannerLinks", JSON.stringify(links));
            data.set("bannerMotion", motion);
            data.set("bannerTile", String(tileSize));
            data.set("bannerGap", String(tileGap));
            data.set("bannerSpeed", String(speed));
            data.set("bannerFrame", frame);
            data.set("bannerShadow", shadow);
            data.set("bannerFrameColor", frameColor);
            data.set("bannerHover", hover);
            for (const slot of ["1", "2", "3", "bg", "tile"] as const) {
              const file = files[slot];
              if (file) data.set(`banner-${slot}`, file);
            }
            try {
              const result = await saveCover(data);
              setNotice(
                result.ok
                  ? { tone: "ok", message: "Banners guardados.", id: Date.now() }
                  : { tone: "error", message: result.message, id: Date.now() },
              );
            } catch (error) {
              const text = error instanceof Error ? error.message : "";
              setNotice({
                tone: "error",
                message: /body exceeded|body size|mb limit/i.test(text)
                  ? "La imagen supera el tamaño permitido. Usa un archivo de hasta 8 MB."
                  : "No se pudo guardar el banner.",
                id: Date.now(),
              });
            } finally {
              setSaving(false);
            }
          }}
        >
          {saving ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </>
  );
}
