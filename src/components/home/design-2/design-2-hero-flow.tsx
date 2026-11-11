import type { CSSProperties } from "react";
import { site } from "@/config/site";
import "./design-2-hero-flow.css";

const FILL = "/media/hero/textura-manga.png";
const HANDLE = `@${site.wordmark.toLowerCase()}`;

const OFFICIALS = [
  { id: "instagram", label: "instagram", href: site.links.instagram },
  { id: "tiktok", label: "tik tok", href: site.links.tiktok },
] as const;

/** Wordmark tipo Thunder 3: el manga se ve recortado dentro de las letras. */
export function Design2HeroFlow() {
  return (
    <div
      className="d2-flow"
      style={
        {
          ["--d2-flow-fill" as string]: `url("${FILL}")`,
        } as CSSProperties
      }
    >
      <p className="d2-flow__word">{site.wordmark}</p>
      <Design2HeroDate />
      <p className="d2-onair">
        <span className="d2-onair__main">
          Todo gran artista empezó con un primer trazo.
        </span>
        <span className="d2-onair__note">
          No necesitás experiencia para comenzar, solo ganas de aprender y dejar
          volar tu creatividad.
        </span>
      </p>
      <ul className="d2-official">
        {OFFICIALS.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="d2-official__link"
            >
              <span className="d2-official__label">
                [ {item.label}{" "}
                {item.id === "instagram" ? (
                  <OfficialInstagramMark />
                ) : (
                  <OfficialTikTokMark />
                )}{" "}
                ]
              </span>
              <span className="d2-official__handle">{HANDLE}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Lockup de fecha bajo el wordmark, mismo gesto que la referencia. */
export function Design2HeroDate() {
  return (
    <div className="d2-date">
      <p className="d2-date__lockup">
        <span className="d2-date__num">
          <span className="d2-date__label">[ EXPERIENCIA ]</span>
          +10 AÑOS DIBUJANDO
        </span>
      </p>
    </div>
  );
}

function OfficialInstagramMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="d2-official__icon">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
    </svg>
  );
}

function OfficialTikTokMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="d2-official__icon">
      <path
        fill="currentColor"
        d="M14.2 3h2.1a5.2 5.2 0 0 0 3.7 3.4v2.2a7.3 7.3 0 0 1-3.7-1.1v6.8a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.4a3.3 3.3 0 1 0 2.3 3.1V3Z"
      />
    </svg>
  );
}
