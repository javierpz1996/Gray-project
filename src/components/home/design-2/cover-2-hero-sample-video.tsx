"use client";

import { useCallback, useRef, useState } from "react";

const SAMPLE_SRC = "/media/videos/muestra.mp4";

function SamplePlayIcon() {
  return (
    <svg viewBox="0 0 56 64" className="cover-2-hero__sample-play-icon" aria-hidden>
      <path
        d="M10 6 50 32 10 58Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinejoin="round"
      />
      <path
        d="M32 14 50 32 32 50Z"
        fill="currentColor"
        stroke="none"
        opacity="0.92"
      />
    </svg>
  );
}

export function Cover2HeroSampleVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const onPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.loop = true;
    void el.play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }, []);

  return (
    <aside
      className="cover-2-hero__sample"
      data-playing={playing ? "true" : "false"}
      aria-label="Video muestra"
    >
      <div className="cover-2-hero__sample-frame">
        <p className="cover-2-hero__sample-bar">VIDEO · MUESTRA</p>
        <div className="cover-2-hero__sample-media">
          <video
            ref={videoRef}
            className="cover-2-hero__sample-video"
            src={SAMPLE_SRC}
            playsInline
            preload="metadata"
          />
          {!playing ? (
            <button
              type="button"
              className="cover-2-hero__sample-play"
              aria-label="Reproducir video de muestra"
              onClick={onPlay}
            >
              <SamplePlayIcon />
            </button>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
