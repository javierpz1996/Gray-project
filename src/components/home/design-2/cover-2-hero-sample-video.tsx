"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_SAMPLE_SRC = "/media/videos/muestra.mp4";

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
    </svg>
  );
}

function SamplePauseIcon() {
  return (
    <svg viewBox="0 0 56 64" className="cover-2-hero__sample-play-icon" aria-hidden>
      <path
        d="M18 10v44M38 10v44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SampleCloseIcon() {
  return (
    <svg viewBox="0 0 26 26" className="cover-2-hero__sample-modal-close-icon" aria-hidden>
      <path
        d="M4 4l18 18M22 4 4 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Cover2HeroSampleVideoProps = {
  src?: string;
  barText?: string;
};

export function Cover2HeroSampleVideo({
  src = DEFAULT_SAMPLE_SRC,
  barText = "VIDEO · MUESTRA",
}: Cover2HeroSampleVideoProps = {}) {
  const previewRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(false);

  useEffect(() => {
    document.body.toggleAttribute("data-cover-2-video-modal", modalOpen);
    return () => document.body.removeAttribute("data-cover-2-video-modal");
  }, [modalOpen]);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    const showFirstFrame = () => {
      try {
        el.currentTime = 0;
      } catch {
        /* vacío */
      }
      el.pause();
    };

    el.addEventListener("loadeddata", showFirstFrame, { once: true });
    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      showFirstFrame();
    }

    return () => {
      el.removeEventListener("loadeddata", showFirstFrame);
    };
  }, [src]);

  useEffect(() => {
    const video = modalVideoRef.current;
    if (!video) return;
    const sync = () => setModalPlaying(!video.paused);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    video.addEventListener("ended", sync);
    return () => {
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
      video.removeEventListener("ended", sync);
    };
  }, []);

  const closeModal = useCallback(() => {
    const dialog = modalRef.current;
    const modalVideo = modalVideoRef.current;
    modalVideo?.pause();
    if (dialog?.open) {
      dialog.close();
    }
    setModalOpen(false);
    setModalPlaying(false);
  }, []);

  const toggleModalPlayback = useCallback(() => {
    const video = modalVideoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const openModal = useCallback(() => {
    const dialog = modalRef.current;
    if (!dialog) return;
    if (!dialog.open) {
      dialog.showModal();
    }
    setModalOpen(true);
    const modalVideo = modalVideoRef.current;
    if (!modalVideo) return;
    modalVideo.currentTime = 0;
    void modalVideo.play().catch(() => {});
  }, []);

  return (
    <>
      <div className="cover-2-hero__sample" data-playing="false" role="group" aria-label="Video muestra">
        <div className="cover-2-hero__sample-frame">
          <p className="cover-2-hero__sample-bar">{barText}</p>
          <div className="cover-2-hero__sample-media">
            <video
              ref={previewRef}
              className="cover-2-hero__sample-video"
              src={src}
              playsInline
              preload="auto"
              muted
              tabIndex={-1}
              aria-hidden
            />
            {!modalOpen ? (
              <button
                type="button"
                className="cover-2-hero__sample-play"
                aria-label="Abrir video de muestra"
                onClick={openModal}
              >
                <SamplePlayIcon />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <dialog
        ref={modalRef}
        className="cover-2-hero__sample-modal"
        aria-label={barText}
        onClose={() => {
          setModalOpen(false);
          setModalPlaying(false);
          modalVideoRef.current?.pause();
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeModal();
        }}
      >
        <button
          type="button"
          className="cover-2-hero__sample-modal-close"
          aria-label="Cerrar video"
          onClick={closeModal}
        >
          <SampleCloseIcon />
        </button>
        <div className="cover-2-hero__sample-modal-panel">
          <div className="cover-2-hero__sample-modal-media">
            <video
              ref={modalVideoRef}
              className="cover-2-hero__sample-modal-video"
              src={src}
              playsInline
              preload="auto"
            />
            <button
              type="button"
              className="cover-2-hero__sample-modal-toggle"
              aria-label={modalPlaying ? "Pausar video" : "Reproducir video"}
              onClick={toggleModalPlayback}
            >
              {modalPlaying ? <SamplePauseIcon /> : <SamplePlayIcon />}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
