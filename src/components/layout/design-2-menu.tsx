"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  MENU_TRANSITIONS,
  SWEEP_MS,
  buildTiles,
  motionOf,
  type MenuTransitionId,
} from "@/components/layout/design-2-menu-tiles";
import { COLUMNS } from "@/components/layout/site-fullscreen-menu";
import "./design-2-menu.css";

const CLOSE_MS = SWEEP_MS + 120;

const [PAGES, BOOKS, SOCIAL] = COLUMNS;
const PAGE_LINKS = PAGES?.items ?? [];
const BOOK_LINKS = BOOKS?.items ?? [];
const LINK_COLUMNS = [
  { start: 0, items: PAGE_LINKS },
  { start: PAGE_LINKS.length, items: BOOK_LINKS },
];
const SOCIAL_START = PAGE_LINKS.length + BOOK_LINKS.length;
const SOCIAL_LINKS = SOCIAL?.items ?? [];

/** Se monta solo mientras el menú está abierto (o cerrándose). */
export function Design2Menu({
  onClose,
  transition,
  onTransitionChange,
}: {
  onClose: () => void;
  transition: MenuTransitionId;
  onTransitionChange: (id: MenuTransitionId) => void;
}) {
  const [closing, setClosing] = useState(false);
  const [run, setRun] = useState(0);
  const [viewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
  const tiles = useMemo(
    () => buildTiles(transition, viewport.width, viewport.height),
    [transition, viewport],
  );
  const pick = (id: MenuTransitionId) => {
    onTransitionChange(id);
    setRun((value) => value + 1);
  };
  const closeTimer = useRef(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const requestClose = useCallback(() => {
    if (closeTimer.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onClose();
      return;
    }
    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = 0;
      onClose();
    }, CLOSE_MS);
  }, [onClose]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [requestClose]);

  useEffect(
    () => () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  return createPortal(
    <div
      id="site-menu"
      className={`d2-menu d2-menu--${motionOf(transition)}${closing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <svg
        key={`tiles-${run}`}
        className="d2-menu__tiles"
        viewBox={`0 0 ${viewport.width} ${viewport.height}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        {tiles.map((tile) => (
          <path
            key={tile.d}
            d={tile.d}
            className="d2-menu__tile"
            style={{ ["--d" as string]: tile.delay }}
          />
        ))}
      </svg>
      <div key={`bg-${run}`} className="d2-menu__bg" aria-hidden />
      <div className="d2-menu__noise" aria-hidden>
        <svg className="d2-menu__noise-run" preserveAspectRatio="none">
          <filter id="d2-menu-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0015 0.35"
              numOctaves="2"
              seed="7"
            />
            <feColorMatrix
              values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 9 -5.2"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#d2-menu-noise)" />
        </svg>
      </div>

      <button
        ref={closeRef}
        type="button"
        className="d2-menu__close"
        aria-label="Cerrar menú"
        onClick={requestClose}
      >
        <span className="d2-menu__close-line" />
        <span className="d2-menu__close-line" />
      </button>

      <div
        className="d2-menu__picker"
        role="group"
        aria-label="Animación del menú"
      >
        <span className="d2-menu__picker-title">Animación</span>
        <div className="d2-menu__picker-options">
          {MENU_TRANSITIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className="d2-menu__picker-option"
              aria-pressed={option.id === transition}
              onClick={() => pick(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <nav key={`body-${run}`} className="d2-menu__body" aria-label="Secciones">
        <div className="d2-menu__columns">
          {LINK_COLUMNS.map(({ start, items }) => (
            <ul key={start} className="d2-menu__list">
              {items.map((item, index) => (
                <li
                  key={item.label}
                  className="d2-menu__item"
                  style={{ ["--i" as string]: start + index }}
                >
                  <Link
                    href={item.href}
                    className="d2-menu__link"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <ul className="d2-menu__social">
          {SOCIAL_LINKS.map((item, index) => (
            <li
              key={item.label}
              className="d2-menu__item"
              style={{ ["--i" as string]: SOCIAL_START + index }}
            >
              <a
                href={item.href}
                className="d2-menu__social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>,
    document.body,
  );
}
