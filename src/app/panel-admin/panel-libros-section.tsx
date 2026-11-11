"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowDown, ArrowUp, FileText, Play, Square, Type } from "lucide-react";
import type { LibrosBandsConfig, LibrosLineStyle } from "@/lib/libros-bands";
import { MarkedLead } from "@/components/home/design-2/marked-lead";
import "@/components/home/design-2/story-wash.css";
import { saveLibros } from "./actions";
import { PanelNotice } from "./panel-notice";

const speeds = [
  [28, "Lenta"],
  [16, "Normal"],
  [8, "Rápida"],
  [4, "Muy rápida"],
  [2, "Muy muy rápida"],
] as const;

const sizes = [
  [40, "Mínima"],
  [55, "Muy chica"],
  [70, "Chica"],
  [85, "Mediana"],
  [100, "Normal"],
  [120, "Media"],
  [140, "Grande"],
  [160, "Muy grande"],
  [180, "Enorme"],
  [220, "Máxima"],
] as const;

const tops = [
  [0, "Arriba"],
  [2, "Alta"],
  [4.5, "Media alta"],
  [7, "Media"],
  [9, "Baja"],
  [11, "Más baja"],
  [14, "Fondo"],
  [18, "Muy abajo"],
] as const;

const tilts = [
  [-56, "56°"],
  [-45, "45°"],
  [-36, "36°"],
  [-28, "28°"],
  [-20, "20°"],
  [-12, "12°"],
  [0, "Recta"],
  [12, "12° inversa"],
  [28, "28° inversa"],
] as const;

const opacities = [
  [15, "Muy transparente"],
  [30, "Transparente"],
  [50, "Suave"],
  [70, "Media"],
  [85, "Casi sólida"],
  [92, "Actual"],
  [100, "Sólida"],
] as const;

const brights = [
  [40, "Muy oscura"],
  [60, "Oscura"],
  [75, "Sombría"],
  [100, "Normal"],
  [125, "Brillante"],
  [150, "Muy brillante"],
  [180, "Intensa"],
] as const;

const previewFonts: Record<string, string> = {
  sans: "var(--font-sans)",
  display: "var(--font-display)",
  oswald: "var(--font-oswald), sans-serif",
  outfit: "var(--font-outfit), sans-serif",
};

function previewStyle(style: LibrosLineStyle): CSSProperties {
  return {
    fontFamily: previewFonts[style.font] ?? "var(--font-sans)",
    fontWeight: style.bold ? 800 : 500,
    color: `rgb(${style.color})`,
    backgroundColor: style.bg ? `rgb(${style.bg})` : "transparent",
  };
}

const fontChoices = [
  ["sans", "Inter"],
  ["display", "Barlow"],
  ["oswald", "Oswald"],
  ["outfit", "Outfit"],
] as const;

function StoryCard({
  icon,
  title,
  extra,
  children,
}: {
  icon: ReactNode;
  title: string;
  extra?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="panel-story-card">
      <div className="panel-story-card-head">
        <span className="panel-story-card-icon">{icon}</span>
        <span>{title}</span>
        {extra}
      </div>
      {children}
    </section>
  );
}

function RgbFields({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  const parts = value.split(",").map((part) => Number(part));
  const rgb = [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0];
  return (
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
            className="panel-field"
            onChange={(event) => {
              const next = Number(event.target.value);
              if (!Number.isInteger(next) || next < 0 || next > 255) return;
              const copy = [...rgb];
              copy[index] = next;
              onChange(copy.join(","));
            }}
          />
        </label>
      ))}
    </div>
  );
}

function LineStyleEditor({
  style,
  onStyle,
}: {
  style: LibrosLineStyle;
  onStyle: (next: LibrosLineStyle) => void;
}) {
  return (
    <>
      <p className="panel-anims-title">Tipografía</p>
      <div className="panel-anims-grid">
        {fontChoices.map(([value, name]) => (
          <button
            key={value}
            type="button"
            className="panel-anim-chip"
            data-active={style.font === value ? "true" : "false"}
            aria-pressed={style.font === value}
            onClick={() => onStyle({ ...style, font: value })}
          >
            {name}
          </button>
        ))}
        <button
          type="button"
          className="panel-anim-chip"
          data-active={style.bold ? "true" : "false"}
          aria-pressed={style.bold}
          onClick={() => onStyle({ ...style, bold: !style.bold })}
        >
          Negrita
        </button>
      </div>
      <p className="panel-anims-title">Color del texto</p>
      <RgbFields value={style.color} onChange={(color) => onStyle({ ...style, color })} />
      <p className="panel-anims-title">Fondo de las letras</p>
      <div className="panel-anims-grid">
        <button
          type="button"
          className="panel-anim-chip"
          data-active={style.bg ? "true" : "false"}
          aria-pressed={Boolean(style.bg)}
          onClick={() => onStyle({ ...style, bg: style.bg ? "" : "0,0,0" })}
        >
          {style.bg ? "Con fondo" : "Sin fondo"}
        </button>
      </div>
      {style.bg ? <RgbFields value={style.bg} onChange={(bg) => onStyle({ ...style, bg })} /> : null}
    </>
  );
}

const partCopy = {
  bandas: ["Bandas", "Las dos bandas. La imagen se recorta dentro del marco."],
  texto: ["Texto principal", "Título, subtítulo, ritmo y el color del botón VER."],
  imagenes: ["Imágenes y descripciones", "Arriba ves el tema como queda. Abajo cambiás la foto, el título y la descripción de cada uno."],
  sticker: ["Sticker/Imagen/Video", "Elegí sticker, imagen o video. Cada uno tiene su movimiento y su borde."],
  fondo: ["Fondo", "Imagen o patrón detrás de la sección, con el mismo movimiento que los banners."],
} as const;

export function PanelLibrosSection({
  initial,
  part,
  revision,
}: {
  initial: LibrosBandsConfig;
  part: "bandas" | "texto" | "imagenes" | "sticker" | "fondo";
  revision: string;
}) {
  const [speed1, setSpeed1] = useState(initial.speed1);
  const [speed2, setSpeed2] = useState(initial.speed2);
  const [size1, setSize1] = useState(initial.size1);
  const [size2, setSize2] = useState(initial.size2);
  const [top1, setTop1] = useState(initial.top1);
  const [top2, setTop2] = useState(initial.top2);
  const [tilt1, setTilt1] = useState(initial.tilt1);
  const [tilt2, setTilt2] = useState(initial.tilt2);
  const [opacity1, setOpacity1] = useState(initial.opacity1);
  const [opacity2, setOpacity2] = useState(initial.opacity2);
  const saved = (slot: string) => `/api/hero-banner/${slot}?v=${encodeURIComponent(revision)}`;
  const [bright1, setBright1] = useState(initial.bright1);
  const [bright2, setBright2] = useState(initial.bright2);
  const [lead, setLead] = useState(initial.lead);
  const [textFocus, setTextFocus] = useState<"title" | "lead" | "rhythm" | "ver">("title");
  const leadRef = useRef<HTMLTextAreaElement>(null);
  const [heading, setHeading] = useState(initial.heading);
  const [stories, setStories] = useState(initial.stories);
  const [temaFiles, setTemaFiles] = useState<Partial<Record<string, File>>>({});
  const [temaPreview, setTemaPreview] = useState<Partial<Record<string, string>>>({});
  const [cuboFiles, setCuboFiles] = useState<Partial<Record<string, File>>>({});
  const [cuboPreview, setCuboPreview] = useState<Partial<Record<string, string>>>({});
  const [mediaPreview, setMediaPreview] = useState<Partial<Record<"sticker" | "image" | "video", string>>>({});
  const [mediaFiles, setMediaFiles] = useState<Partial<Record<"sticker" | "image" | "video", File>>>({});
  const [pending, setPending] = useState<Partial<Record<"banda1" | "banda2", string>>>({});
  const [files, setFiles] = useState<Partial<Record<"banda1" | "banda2" | "profesor" | "librosbg" | "librostile", File>>>({});
  const [bgPreview, setBgPreview] = useState<{ photo?: string; tile?: string }>({});
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; message: string; id: number } | null>(null);
  const [saving, setSaving] = useState(false);

  function pick(slot: "banda1" | "banda2", file: File | undefined) {
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

  const bands = [
    ["banda1", "Banda 1", speed1, setSpeed1, size1, setSize1, top1, setTop1, tilt1, setTilt1, opacity1, setOpacity1, bright1, setBright1],
    ["banda2", "Banda 2", speed2, setSpeed2, size2, setSize2, top2, setTop2, tilt2, setTilt2, opacity2, setOpacity2, bright2, setBright2],
  ] as const;

  return (
    <>
      {notice ? <PanelNotice key={notice.id} tone={notice.tone} message={notice.message} /> : null}
      <p className="panel-crumb">Panel / Sección libros / {partCopy[part][0]}</p>
      <h1 className="mt-3 font-display text-h2 leading-heading tracking-title">{partCopy[part][0]}</h1>
      <p className="mt-2 max-w-prose text-small text-fg-muted">{partCopy[part][1]}</p>
      {part === "bandas" ? (
      <>
      <div className="panel-libros-stage" aria-hidden="true">
        {(
          [
            ["back", pending.banda1 ?? saved("banda1"), speed1, size1, top1, tilt1, opacity1, bright1],
            ["front", pending.banda2 ?? saved("banda2"), speed2, size2, top2, tilt2, opacity2, bright2],
          ] as const
        ).map(([place, src, speed, size, top, tilt, opacity, bright]) => (
          <div
            key={place}
            className={`panel-libros-banda panel-libros-banda--${place}`}
            style={{
              ["--banda-speed" as string]: `${speed}s`,
              ["--banda-size" as string]: size / 100,
              ["--banda-top" as string]: top,
              ["--banda-tilt" as string]: `${tilt}deg`,
              ["--banda-opacity" as string]: opacity / 100,
              ["--banda-bright" as string]: bright / 100,
            }}
          >
            <div className="panel-libros-track">
              {Array.from({ length: 200 }, (_, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={index} src={src} alt="" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="panel-anims">
        {bands.map(([slot, label, speed, setSpeed, size, setSize, top, setTop, tilt, setTilt, opacity, setOpacity, bright, setBright]) => (
          <div key={slot}>
            <p className="panel-anims-title">{label}</p>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="mt-3 cursor-pointer text-nano file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano"
              onChange={(event) => pick(slot, event.target.files?.[0])}
            />
            <p className="panel-anims-title">Velocidad</p>
            <div className="panel-anims-grid">
              {speeds.map(([value, name]) => (
                <button
                  key={value}
                  type="button"
                  className="panel-anim-chip"
                  data-active={speed === value ? "true" : "false"}
                  aria-pressed={speed === value}
                  onClick={() => setSpeed(value)}
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="panel-anims-title">Altura</p>
            <div className="panel-anims-grid">
              {tops.map(([value, name]) => (
                <button
                  key={value}
                  type="button"
                  className="panel-anim-chip"
                  data-active={top === value ? "true" : "false"}
                  aria-pressed={top === value}
                  onClick={() => setTop(value)}
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="panel-anims-title">Inclinación</p>
            <div className="panel-anims-grid">
              {tilts.map(([value, name]) => (
                <button
                  key={value}
                  type="button"
                  className="panel-anim-chip"
                  data-active={tilt === value ? "true" : "false"}
                  aria-pressed={tilt === value}
                  onClick={() => setTilt(value)}
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="panel-anims-title">Transparencia</p>
            <div className="panel-anims-grid">
              {opacities.map(([value, name]) => (
                <button
                  key={value}
                  type="button"
                  className="panel-anim-chip"
                  data-active={opacity === value ? "true" : "false"}
                  aria-pressed={opacity === value}
                  onClick={() => setOpacity(value)}
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="panel-anims-title">Brillo</p>
            <div className="panel-anims-grid">
              {brights.map(([value, name]) => (
                <button
                  key={value}
                  type="button"
                  className="panel-anim-chip"
                  data-active={bright === value ? "true" : "false"}
                  aria-pressed={bright === value}
                  onClick={() => setBright(value)}
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="panel-anims-title">Tamaño</p>
            <div className="panel-anims-grid">
              {sizes.map(([value, name]) => (
                <button
                  key={value}
                  type="button"
                  className="panel-anim-chip"
                  data-active={size === value ? "true" : "false"}
                  aria-pressed={size === value}
                  onClick={() => setSize(value)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      </>
      ) : null}
      {part === "texto" ? (
      <div className="panel-texto">
        <div className="panel-texto-preview">
          <button
            type="button"
            className="panel-texto-hit"
            data-active={textFocus === "title" ? "true" : "false"}
            onClick={() => setTextFocus("title")}
          >
            <span className="panel-texto-kicker">Título</span>
            <span className="panel-texto-title" style={previewStyle(heading.titleStyle)}>
              {heading.title || "Escribí el título"}
            </span>
          </button>
          <button
            type="button"
            className="panel-texto-hit"
            data-active={textFocus === "lead" ? "true" : "false"}
            onClick={() => setTextFocus("lead")}
          >
            <span className="panel-texto-kicker">Subtítulo</span>
            <span className="panel-texto-lead" style={{ ...previewStyle(heading.leadStyle), backgroundColor: "transparent" }}>
              <MarkedLead text={lead || "Escribí el subtítulo"} background={heading.leadStyle.bg} />
            </span>
          </button>
          <button
            type="button"
            className="panel-texto-hit"
            data-active={textFocus === "rhythm" ? "true" : "false"}
            onClick={() => setTextFocus("rhythm")}
          >
            <span className="panel-texto-kicker">Ritmo</span>
            <span
              className="panel-texto-rhythm"
              style={{
                ...previewStyle(heading.rhythmStyle),
                color: heading.rhythmStyle.bg ? `rgb(${heading.rhythmStyle.color})` : "transparent",
                WebkitTextFillColor: heading.rhythmStyle.bg ? `rgb(${heading.rhythmStyle.color})` : "transparent",
                WebkitTextStroke: `max(1px, 0.045em) rgb(${heading.rhythmStyle.color})`,
              }}
            >
              {heading.rhythm || "Escribí el ritmo"}
            </span>
          </button>
          <button
            type="button"
            className="panel-texto-hit"
            data-active={textFocus === "ver" ? "true" : "false"}
            onClick={() => setTextFocus("ver")}
          >
            <span className="panel-texto-kicker">Botón</span>
            <span className="panel-texto-ver" style={{ backgroundColor: `rgb(${heading.ver})` }}>
              VER
            </span>
          </button>
        </div>
        <div className="panel-texto-editor">
          {textFocus === "title" ? (
            <>
              <p className="panel-anims-title">Título</p>
              <input
                className="panel-field"
                value={heading.title}
                maxLength={80}
                onChange={(event) => setHeading((current) => ({ ...current, title: event.target.value }))}
              />
              <LineStyleEditor
                style={heading.titleStyle}
                onStyle={(titleStyle) => setHeading((current) => ({ ...current, titleStyle }))}
              />
            </>
          ) : null}
          {textFocus === "lead" ? (
            <>
              <p className="panel-anims-title">Subtítulo</p>
              <textarea
                ref={leadRef}
                className="panel-field"
                rows={4}
                value={lead}
                maxLength={160}
                onChange={(event) => setLead(event.target.value)}
              />
              <button
                type="button"
                className="panel-anim-chip mt-3"
                onClick={() => {
                  const node = leadRef.current;
                  if (!node) return;
                  const start = node.selectionStart;
                  const end = node.selectionEnd;
                  if (start === end) return;
                  const next = `${lead.slice(0, start)}[[${lead.slice(start, end)}]]${lead.slice(end)}`;
                  setLead(next.slice(0, 160));
                  if (!heading.leadStyle.bg) {
                    setHeading((current) => ({ ...current, leadStyle: { ...current.leadStyle, bg: "0,0,0" } }));
                  }
                }}
              >
                Pintar lo seleccionado
              </button>
              <p className="mt-2 text-nano text-fg-muted">
                Seleccioná las palabras en el cuadro y tocá Pintar. Solo esas palabras llevan el fondo.
              </p>
              <LineStyleEditor
                style={heading.leadStyle}
                onStyle={(leadStyle) => setHeading((current) => ({ ...current, leadStyle }))}
              />
            </>
          ) : null}
          {textFocus === "rhythm" ? (
            <>
              <p className="panel-anims-title">Ritmo</p>
              <input
                className="panel-field"
                value={heading.rhythm}
                maxLength={80}
                onChange={(event) => setHeading((current) => ({ ...current, rhythm: event.target.value }))}
              />
              <LineStyleEditor
                style={heading.rhythmStyle}
                onStyle={(rhythmStyle) => setHeading((current) => ({ ...current, rhythmStyle }))}
              />
            </>
          ) : null}
          {textFocus === "ver" ? (
            <>
              <p className="panel-anims-title">Color del botón VER</p>
              <RgbFields value={heading.ver} onChange={(ver) => setHeading((current) => ({ ...current, ver }))} />
            </>
          ) : null}
        </div>
      </div>
      ) : null}
      {part === "sticker" ? (
      <div className="panel-texto">
        <div className="panel-sticker-stage">
          <div
            key={heading.stickerKind}
            className="panel-sticker"
            data-kind={heading.stickerKind}
            data-crop={heading.stickerKind === "image" && heading.imageCrop ? "true" : "false"}
            style={{ ["--image-size" as string]: heading.imageSize / 100 }}
            data-motion={
              heading.stickerKind === "video"
                ? heading.videoMotion
                : heading.stickerKind === "image"
                  ? heading.imageMotion
                  : heading.stickerMotion
            }
            data-hover={
              heading.stickerKind === "video"
                ? heading.videoHover
                : heading.stickerKind === "image"
                  ? heading.imageHover
                  : heading.stickerHover
            }
          >
            {(() => {
              const kind = heading.stickerKind;
              const local = mediaPreview[kind];
              const savedMedia = initial.heading.stickerKind === kind ? `${saved("profesor")}&media=${kind}` : "";
              const src = local || savedMedia;
              const edge = kind === "video" ? heading.videoEdge : kind === "image" ? heading.imageEdge : heading.stickerEdge;
              const border = kind === "video" ? heading.videoBorder : kind === "image" ? heading.imageBorder : heading.stickerBorder;
              if (!src) {
                return <p className="panel-texto-kicker">Subí {kind === "video" ? "un video" : "una imagen"}</p>;
              }
              return kind === "video" ? (
                <video
                  key={src}
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  data-border={border}
                  style={{ ["--sticker-edge" as string]: edge ? `rgb(${edge})` : "var(--ds-surface)" }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt=""
                  data-border={border}
                  style={{ ["--sticker-edge" as string]: edge ? `rgb(${edge})` : "var(--ds-surface)" }}
                />
              );
            })()}
          </div>
        </div>
        <div className="panel-texto-editor">
          <p className="panel-anims-title">Qué mostrar</p>
          <div className="panel-anims-grid">
            {(
              [
                ["sticker", "Sticker"],
                ["image", "Imagen"],
                ["video", "Video"],
              ] as const
            ).map(([value, name]) => (
              <button
                key={value}
                type="button"
                className="panel-anim-chip"
                data-active={heading.stickerKind === value ? "true" : "false"}
                aria-pressed={heading.stickerKind === value}
                onClick={() => setHeading((current) => ({ ...current, stickerKind: value }))}
              >
                {name}
              </button>
            ))}
          </div>
          <p className="panel-anims-title">{heading.stickerKind === "video" ? "Video" : "Imagen"}</p>
          <input
            type="file"
            accept={heading.stickerKind === "video" ? "video/mp4,video/webm" : "image/jpeg,image/png,image/webp"}
            className="mt-3 cursor-pointer text-nano file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano"
            key={heading.stickerKind}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (!file) return;
              const kind = heading.stickerKind;
              const named = file.name.toLowerCase();
              const video = file.type.startsWith("video/mp4") || file.type.startsWith("video/webm") || file.type === "video/quicktime" || named.endsWith(".mp4") || named.endsWith(".mov") || named.endsWith(".webm");
              const image = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp";
              if (kind === "video" ? !video : !image) {
                setNotice({
                  tone: "error",
                  message: kind === "video" ? "Para video usá MP4 o WebM." : "Para sticker o imagen usá JPG, PNG o WebP.",
                  id: Date.now(),
                });
                return;
              }
              if (file.size > 8 * 1024 * 1024) {
                setNotice({ tone: "error", message: "El archivo supera 8 MB.", id: Date.now() });
                return;
              }
              const url = URL.createObjectURL(file);
              setMediaPreview((current) => {
                const previous = current[kind];
                if (previous) URL.revokeObjectURL(previous);
                return { ...current, [kind]: url };
              });
              setMediaFiles((current) => ({ ...current, [kind]: file }));
            }}
          />
          {heading.stickerKind === "image" ? (
            <>
              <p className="panel-anims-title">Bordes negros</p>
              <div className="panel-anims-grid">
                <button
                  type="button"
                  className="panel-anim-chip"
                  data-active={heading.imageCrop ? "true" : "false"}
                  aria-pressed={heading.imageCrop}
                  onClick={() => setHeading((current) => ({ ...current, imageCrop: !current.imageCrop }))}
                >
                  {heading.imageCrop ? "Recortados" : "Quitar bordes negros"}
                </button>
              </div>
              <p className="panel-anims-title">Tamaño</p>
              <div className="panel-anims-grid">
                {(
                  [
                    [70, "Chica"],
                    [85, "Mediana"],
                    [100, "Normal"],
                    [120, "Grande"],
                    [150, "Muy grande"],
                    [180, "Máxima"],
                  ] as const
                ).map(([value, name]) => (
                  <button
                    key={value}
                    type="button"
                    className="panel-anim-chip"
                    data-active={heading.imageSize === value ? "true" : "false"}
                    aria-pressed={heading.imageSize === value}
                    onClick={() => setHeading((current) => ({ ...current, imageSize: value }))}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </>
          ) : null}
          <p className="panel-anims-title">Movimiento</p>
          <div className="panel-anims-grid">
            {(heading.stickerKind === "video"
              ? ([
                  ["drift", "Deriva"],
                  ["zoom", "Zoom"],
                  ["fade", "Fundido"],
                  ["pulse", "Pulso"],
                  ["push", "Empuje"],
                  ["pan", "Paneo"],
                  ["breath", "Aliento"],
                  ["orbit", "Órbita"],
                  ["curtain", "Cortina"],
                  ["wander", "Paseo"],
                  ["film", "Celuloide"],
                  ["none", "Quieto"],
                ] as const)
              : heading.stickerKind === "image"
                ? ([
                    ["kenburns", "Recorrido"],
                    ["reveal", "Revelado"],
                    ["focus", "Foco"],
                    ["pan", "Paneo"],
                    ["breath", "Aliento"],
                    ["orbit", "Órbita"],
                    ["shutter", "Obturador"],
                    ["curtain", "Cortina"],
                    ["wander", "Paseo"],
                    ["none", "Quieto"],
                  ] as const)
                : ([
                    ["cabeceo", "Cabeceo"],
                    ["tilt", "Vaivén"],
                    ["pulse", "Pulso"],
                    ["shake", "Sacudida"],
                    ["pop", "Salto"],
                    ["float", "Flote"],
                    ["swing", "Péndulo"],
                    ["bounce", "Rebote"],
                    ["spin", "Giro"],
                    ["heartbeat", "Latido"],
                    ["wobble", "Bamboleo"],
                    ["none", "Quieto"],
                  ] as const)
            ).map(([value, name]) => (
              <button
                key={value}
                type="button"
                className="panel-anim-chip"
                data-active={
                  (heading.stickerKind === "video"
                    ? heading.videoMotion
                    : heading.stickerKind === "image"
                      ? heading.imageMotion
                      : heading.stickerMotion) === value
                    ? "true"
                    : "false"
                }
                aria-pressed={
                  (heading.stickerKind === "video"
                    ? heading.videoMotion
                    : heading.stickerKind === "image"
                      ? heading.imageMotion
                      : heading.stickerMotion) === value
                }
                onClick={() =>
                  setHeading((current) =>
                    current.stickerKind === "video"
                      ? { ...current, videoMotion: value as typeof current.videoMotion }
                      : current.stickerKind === "image"
                        ? { ...current, imageMotion: value as typeof current.imageMotion }
                        : { ...current, stickerMotion: value as typeof current.stickerMotion },
                  )
                }
              >
                {name}
              </button>
            ))}
          </div>
          <p className="panel-anims-title">Borde</p>
          <div className="panel-anims-grid">
            {(heading.stickerKind === "video"
              ? ([
                  ["cine", "Cine"],
                  ["marco", "Marco"],
                  ["linea", "Línea"],
                  ["suave", "Suave"],
                  ["polaroid", "Polaroid"],
                  ["grueso", "Grueso"],
                  ["fino", "Fino"],
                  ["punteado", "Punteado"],
                  ["doble", "Doble"],
                  ["ticket", "Ticket"],
                  ["pantalla", "Pantalla"],
                  ["diapositiva", "Diapositiva"],
                  ["none", "Sin borde"],
                ] as const)
              : heading.stickerKind === "image"
                ? ([
                    ["marco", "Marco"],
                    ["polaroid", "Polaroid"],
                    ["grueso", "Grueso"],
                    ["fino", "Fino"],
                    ["punteado", "Punteado"],
                    ["doble", "Doble"],
                    ["ticket", "Ticket"],
                    ["none", "Sin borde"],
                  ] as const)
                : ([
                    ["contorno", "Contorno"],
                    ["grueso", "Grueso"],
                    ["fino", "Fino"],
                    ["suave", "Suave"],
                    ["neon", "Neón"],
                    ["sombra", "Sombra"],
                    ["marcado", "Marcado"],
                    ["triple", "Triple"],
                    ["sesgado", "Sesgado"],
                    ["none", "Sin borde"],
                  ] as const)
            ).map(([value, name]) => (
              <button
                key={value}
                type="button"
                className="panel-anim-chip"
                data-active={
                  (heading.stickerKind === "video"
                    ? heading.videoBorder
                    : heading.stickerKind === "image"
                      ? heading.imageBorder
                      : heading.stickerBorder) === value
                    ? "true"
                    : "false"
                }
                aria-pressed={
                  (heading.stickerKind === "video"
                    ? heading.videoBorder
                    : heading.stickerKind === "image"
                      ? heading.imageBorder
                      : heading.stickerBorder) === value
                }
                onClick={() =>
                  setHeading((current) =>
                    current.stickerKind === "video"
                      ? { ...current, videoBorder: value as typeof current.videoBorder }
                      : current.stickerKind === "image"
                        ? { ...current, imageBorder: value as typeof current.imageBorder }
                        : { ...current, stickerBorder: value as typeof current.stickerBorder },
                  )
                }
              >
                {name}
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
                ["glow", "Brillo"],
                ["flip", "Voltear"],
                ["sink", "Hundir"],
                ["none", "Nada"],
              ] as const
            ).map(([value, name]) => (
              <button
                key={value}
                type="button"
                className="panel-anim-chip"
                data-active={
                  (heading.stickerKind === "video"
                    ? heading.videoHover
                    : heading.stickerKind === "image"
                      ? heading.imageHover
                      : heading.stickerHover) === value
                    ? "true"
                    : "false"
                }
                aria-pressed={
                  (heading.stickerKind === "video"
                    ? heading.videoHover
                    : heading.stickerKind === "image"
                      ? heading.imageHover
                      : heading.stickerHover) === value
                }
                onClick={() =>
                  setHeading((current) =>
                    current.stickerKind === "video"
                      ? { ...current, videoHover: value }
                      : current.stickerKind === "image"
                        ? { ...current, imageHover: value }
                        : { ...current, stickerHover: value },
                  )
                }
              >
                {name}
              </button>
            ))}
          </div>
          {(heading.stickerKind === "video"
            ? heading.videoBorder
            : heading.stickerKind === "image"
              ? heading.imageBorder
              : heading.stickerBorder) !== "none" ? (
            <>
              <p className="panel-anims-title">Color del borde</p>
              <RgbFields
                value={
                  (heading.stickerKind === "video"
                    ? heading.videoEdge
                    : heading.stickerKind === "image"
                      ? heading.imageEdge
                      : heading.stickerEdge) || "255,255,255"
                }
                onChange={(edge) =>
                  setHeading((current) =>
                    current.stickerKind === "video"
                      ? { ...current, videoEdge: edge }
                      : current.stickerKind === "image"
                        ? { ...current, imageEdge: edge }
                        : { ...current, stickerEdge: edge },
                  )
                }
              />
            </>
          ) : null}
        </div>
      </div>
      ) : null}
      {part === "fondo" ? (
        <div className="panel-texto">
          <div
            className="story-wash panel-wash"
            data-mode={heading.bgMode === "none" ? "pattern" : heading.bgMode}
            data-pattern={heading.bgPattern}
            data-motion={heading.bgMode === "none" ? "off" : heading.bgMotion}
            style={{
              ["--wash-ink" as string]: heading.bgColor,
              ["--wash-base" as string]: heading.bgBase,
              ["--wash-speed" as string]: `${heading.bgSpeed}s`,
              ["--wash-tile-size" as string]: `${heading.bgTile}px`,
              ["--wash-shade" as string]: heading.bgShade / 100,
              ["--wash-photo" as string]: `url(${bgPreview.photo ?? saved("librosbg")})`,
              ["--wash-tile" as string]: `url(${bgPreview.tile ?? saved("librostile")})`,
            }}
          />
          <div className="panel-texto-editor">
            <p className="panel-anims-title">Tipo</p>
            <div className="panel-anims-grid">
              {(
                [
                  ["none", "Sin fondo"],
                  ["pattern", "Patrón"],
                  ["image", "Imagen"],
                ] as const
              ).map(([value, name]) => (
                <button key={value} type="button" className="panel-anim-chip" data-active={heading.bgMode === value ? "true" : "false"} aria-pressed={heading.bgMode === value} onClick={() => setHeading((current) => ({ ...current, bgMode: value }))}>
                  {name}
                </button>
              ))}
            </div>
            {heading.bgMode === "pattern" ? (
              <>
                <p className="panel-anims-title">Patrón</p>
                <div className="panel-anims-grid">
                  {(
                    [
                      ["dots", "Puntos"],
                      ["stripes", "Rayas"],
                      ["grid", "Grilla"],
                      ["lines", "Líneas"],
                      ["checker", "Damero"],
                      ["rings", "Anillos"],
                      ["custom", "Imagen repetida"],
                    ] as const
                  ).map(([value, name]) => (
                    <button key={value} type="button" className="panel-anim-chip" data-active={heading.bgPattern === value ? "true" : "false"} aria-pressed={heading.bgPattern === value} onClick={() => setHeading((current) => ({ ...current, bgPattern: value }))}>
                      {name}
                    </button>
                  ))}
                </div>
                {heading.bgPattern === "custom" ? (
                  <>
                    <p className="panel-anims-title">Pieza que se repite</p>
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="mt-3 cursor-pointer text-nano file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano" onChange={(event) => {
                      const file = event.target.files?.[0];
                      event.target.value = "";
                      if (!file) return;
                      const url = URL.createObjectURL(file);
                      setBgPreview((current) => ({ ...current, tile: url }));
                      setFiles((current) => ({ ...current, librostile: file }));
                    }} />
                    <p className="panel-anims-title">Tamaño</p>
                    <div className="panel-anims-grid">
                      {([24, 48, 80, 120] as const).map((value) => (
                        <button key={value} type="button" className="panel-anim-chip" data-active={heading.bgTile === value ? "true" : "false"} aria-pressed={heading.bgTile === value} onClick={() => setHeading((current) => ({ ...current, bgTile: value }))}>
                          {value}
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}
              </>
            ) : null}
            {heading.bgMode === "image" ? (
              <>
                <p className="panel-anims-title">Imagen de fondo</p>
                <input type="file" accept="image/jpeg,image/png,image/webp" className="mt-3 cursor-pointer text-nano file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano" onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  setBgPreview((current) => ({ ...current, photo: url }));
                  setFiles((current) => ({ ...current, librosbg: file }));
                }} />
              </>
            ) : null}
            {heading.bgMode !== "none" ? (
              <>
                <p className="panel-anims-title">Movimiento</p>
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
                  ).map(([value, name]) => (
                    <button key={value} type="button" className="panel-anim-chip" data-active={heading.bgMotion === value ? "true" : "false"} aria-pressed={heading.bgMotion === value} onClick={() => setHeading((current) => ({ ...current, bgMotion: value }))}>
                      {name}
                    </button>
                  ))}
                </div>
                <p className="panel-anims-title">Velocidad</p>
                <div className="panel-anims-grid">
                  {speeds.map(([value, name]) => (
                    <button key={value} type="button" className="panel-anim-chip" data-active={heading.bgSpeed === value ? "true" : "false"} aria-pressed={heading.bgSpeed === value} onClick={() => setHeading((current) => ({ ...current, bgSpeed: value }))}>
                      {name}
                    </button>
                  ))}
                </div>
                <p className="panel-anims-title">Oscurecer</p>
                <div className="panel-anims-grid">
                  {(
                    [
                      [0, "Nada"],
                      [25, "Suave"],
                      [45, "Medio"],
                      [65, "Fuerte"],
                      [85, "Muy fuerte"],
                    ] as const
                  ).map(([value, name]) => (
                    <button key={value} type="button" className="panel-anim-chip" data-active={heading.bgShade === value ? "true" : "false"} aria-pressed={heading.bgShade === value} onClick={() => setHeading((current) => ({ ...current, bgShade: value }))}>
                      {name}
                    </button>
                  ))}
                </div>
                <p className="panel-anims-title">Color de fondo</p>
                <RgbFields value={heading.bgBase} onChange={(bgBase) => setHeading((current) => ({ ...current, bgBase }))} />
                {heading.bgMode === "pattern" && heading.bgPattern !== "custom" ? (
                  <>
                    <p className="panel-anims-title">Color del patrón</p>
                    <RgbFields value={heading.bgColor} onChange={(bgColor) => setHeading((current) => ({ ...current, bgColor }))} />
                  </>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      ) : null}
      {part === "imagenes" ? (
      <div className="panel-temas">
        <div className="panel-story-cards">
          <StoryCard icon={<Type aria-hidden />} title="Título">
            <RgbFields value={heading.nameColor} onChange={(nameColor) => setHeading((current) => ({ ...current, nameColor }))} />
          </StoryCard>
          <StoryCard icon={<ArrowUp aria-hidden />} title="Línea de arriba">
            <RgbFields value={heading.nameLine} onChange={(nameLine) => setHeading((current) => ({ ...current, nameLine }))} />
          </StoryCard>
          <StoryCard icon={<FileText aria-hidden />} title="Texto de la descripción">
            <RgbFields value={heading.storyText} onChange={(storyText) => setHeading((current) => ({ ...current, storyText }))} />
          </StoryCard>
          <StoryCard icon={<ArrowDown aria-hidden />} title="Línea de abajo">
            <RgbFields value={heading.rule} onChange={(rule) => setHeading((current) => ({ ...current, rule }))} />
          </StoryCard>
          <StoryCard
            icon={<Square aria-hidden />}
            title="Botón VER"
            extra={<span className="panel-texto-ver panel-texto-ver--demo" data-motion={heading.verMotion} style={{ backgroundColor: `rgb(${heading.ver})` }}>VER</span>}
          >
            <RgbFields value={heading.ver} onChange={(ver) => setHeading((current) => ({ ...current, ver }))} />
          </StoryCard>
          <StoryCard icon={<Play aria-hidden />} title="Movimiento del botón">
          <div className="panel-anims-grid">
            {(
              [
                ["tilt", "Vaivén"],
                ["pulse", "Pulso"],
                ["shake", "Sacudida"],
                ["pop", "Salto"],
                ["float", "Flote"],
                ["none", "Quieto"],
              ] as const
            ).map(([value, name]) => (
              <button
                key={value}
                type="button"
                className="panel-anim-chip"
                data-active={heading.verMotion === value ? "true" : "false"}
                aria-pressed={heading.verMotion === value}
                onClick={() => setHeading((current) => ({ ...current, verMotion: value }))}
              >
                {name}
              </button>
            ))}
          </div>
          </StoryCard>
        </div>
        {stories.map((story, index) => {
          const slot = `tema${index + 1}`;
          const id = String(index + 1).padStart(3, "0");
          return (
            <div key={slot} className="panel-tema">
              <div className="panel-tema-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={temaPreview[slot] ?? saved(slot)} alt="" />
                <span>{id}</span>
              </div>
              <div className="panel-tema-fields">
                <label>
                  Imagen
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="cursor-pointer text-nano file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    if (file.size > 8 * 1024 * 1024) {
                      setNotice({ tone: "error", message: "La imagen supera 8 MB.", id: Date.now() });
                      return;
                    }
                    const url = URL.createObjectURL(file);
                    setTemaPreview((current) => {
                      const previous = current[slot];
                      if (previous) URL.revokeObjectURL(previous);
                      return { ...current, [slot]: url };
                    });
                    setTemaFiles((current) => ({ ...current, [slot]: file }));
                  }}
                />
                </label>
                <label>
                  Cubo
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="cursor-pointer text-nano file:cursor-pointer file:rounded-md file:border-0 file:bg-hover file:px-2 file:py-1 file:text-nano"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      if (file.size > 8 * 1024 * 1024) {
                        setNotice({ tone: "error", message: "La imagen supera 8 MB.", id: Date.now() });
                        return;
                      }
                      const cube = `cubo${index + 1}`;
                      const url = URL.createObjectURL(file);
                      setCuboPreview((current) => {
                        const previous = current[cube];
                        if (previous) URL.revokeObjectURL(previous);
                        return { ...current, [cube]: url };
                      });
                      setCuboFiles((current) => ({ ...current, [cube]: file }));
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cuboPreview[`cubo${index + 1}`] ?? saved(`cubo${index + 1}`)}
                    alt=""
                    className="mt-2 h-16 w-16 object-contain"
                  />
                </label>
                <label>
                  Título
                  <input
                  className="panel-field"
                  value={story.title}
                  maxLength={80}
                  aria-label={`Título ${id}`}
                  onChange={(event) =>
                    setStories((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, title: event.target.value } : item,
                      ),
                    )
                  }
                />
                </label>
                <label>
                  Descripción
                  <textarea
                  className="panel-field"
                  rows={4}
                  value={story.text}
                  maxLength={420}
                  aria-label={`Descripción ${id}`}
                  onChange={(event) =>
                    setStories((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, text: event.target.value } : item,
                      ),
                    )
                  }
                />
                </label>
              </div>
            </div>
          );
        })}
      </div>
      ) : null}
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
            data.set("speed1", String(speed1));
            data.set("speed2", String(speed2));
            data.set("size1", String(size1));
            data.set("size2", String(size2));
            data.set("top1", String(top1));
            data.set("top2", String(top2));
            data.set("tilt1", String(tilt1));
            data.set("tilt2", String(tilt2));
            data.set("opacity1", String(opacity1));
            data.set("opacity2", String(opacity2));
            data.set("bright1", String(bright1));
            data.set("bright2", String(bright2));
            data.set("lead", lead);
            data.set("heading", JSON.stringify(heading));
            stories.forEach((story, index) => {
              data.set(`title${index}`, story.title);
              data.set(`text${index}`, story.text);
            });
            for (const [slot, file] of Object.entries({ ...temaFiles, ...cuboFiles })) {
              if (file) data.set(slot, file);
            }
            const media = mediaFiles[heading.stickerKind];
            if (media) data.set("profesor", media);
            if (files.banda1) data.set("banda1", files.banda1);
            if (files.banda2) data.set("banda2", files.banda2);
            if (files.librosbg) data.set("librosbg", files.librosbg);
            if (files.librostile) data.set("librostile", files.librostile);
            try {
              const result = await saveLibros(data);
              setNotice(
                result.ok
                  ? { tone: "ok", message: "Libros guardados.", id: Date.now() }
                  : { tone: "error", message: result.message, id: Date.now() },
              );
            } catch (error) {
              const text = error instanceof Error ? error.message : "";
              setNotice({
                tone: "error",
                message: /body exceeded|body size|mb limit/i.test(text)
                  ? "La imagen supera el tamaño permitido. Usa un archivo de hasta 8 MB."
                  : "No se pudo guardar.",
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
