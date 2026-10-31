"use client";

import { useEffect, useRef, useState } from "react";
import { notifySiteIntroComplete } from "@/lib/home-design-1-animation";
import { cn } from "@/lib/utils";

const LOADING_VIDEO_SRC = "/Imagenes/Videos/Loading.mp4";

/** Solo una vez por carga completa: volver al home navegando no repite el video. */
let introAlreadyPlayed = false;

type IntroPhase = "playing" | "leaving" | "done";

/** Pantalla de carga con `Loading.mp4`; al terminar se desvanece y deja ver el home. */
export function SiteLoadingIntro() {
  const [phase, setPhase] = useState<IntroPhase>(() =>
    introAlreadyPlayed ? "done" : "playing",
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    introAlreadyPlayed = true;
  }, []);

  useEffect(() => {
    if (phase === "leaving" || phase === "done") notifySiteIntroComplete();
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    const html = document.documentElement;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(frame);
    }
    // Si el navegador bloquea el autoplay, no dejamos al usuario atrapado.
    video.play().catch(() => setPhase("leaving"));
  }, [phase]);

  if (phase === "done") return null;

  const finish = () => setPhase((current) => (current === "playing" ? "leaving" : current));

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] overflow-hidden bg-ink transition-opacity duration-[600ms] ease-out",
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      role="status"
      aria-label="Cargando"
      onTransitionEnd={() => {
        if (phase === "leaving") setPhase("done");
      }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover object-center [transform:translateZ(0)_scale(1.02)]"
        src={LOADING_VIDEO_SRC}
        muted
        playsInline
        autoPlay
        preload="auto"
        onEnded={finish}
        onError={finish}
        aria-hidden
      />
      <button
        type="button"
        onClick={finish}
        className="absolute bottom-6 right-6 border border-ink bg-canvas px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-ink transition-colors duration-150 ease-out hover:bg-ink hover:text-canvas"
      >
        Saltar
      </button>
    </div>
  );
}
