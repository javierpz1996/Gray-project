"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  meechPhotoCategoryIds,
  meechPhotoCategoryLabels,
  type MeechPhotoCategoryId,
} from "./meech-photo-data";

type MeechPhotoClockMenuProps = {
  category: MeechPhotoCategoryId;
  onCategoryChange: (id: MeechPhotoCategoryId) => void;
};

const menuPages = [
  { href: "/#bio", label: "About", link: "about" },
  { href: "/#libros", label: "Video", link: "video" },
  {
    href: "/#portafolio",
    label: "Photo",
    link: "photo",
    categories: meechPhotoCategoryIds.filter((id) => id !== "all"),
  },
  { href: "/#inicio", label: "Home", link: "home" },
  { href: "/#libros", label: "Book", link: "book" },
] as const;

export function MeechPhotoClockMenu({
  category,
  onCategoryChange,
}: MeechPhotoClockMenuProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <nav
      className={`meech-photo__clock clock-menu clock-menu--enhanced${ready ? " clock-menu--ready" : ""}`}
      aria-labelledby="meech-photo-menu-title"
      data-intro-state="pages"
    >
      <h2 className="sr-only" id="meech-photo-menu-title">
        Menu
      </h2>
      <div className="clock-menu__viewport" data-viewport="">
        <ul className="clock-menu__dial" data-dial="" role="list">
          {menuPages.map((page) => {
            const isPhoto = page.link === "photo";
            return (
              <li
                key={page.link}
                className="clock-menu__item"
                data-active={isPhoto ? "true" : "false"}
                data-visible="true"
              >
                {isPhoto ? (
                  <span className="clock-menu__category-label" aria-hidden>
                    Photo
                  </span>
                ) : null}
                <Link
                  href={page.href}
                  className="clock-menu__primary-link"
                  aria-current={isPhoto ? "page" : undefined}
                >
                  {page.label}
                </Link>
                {isPhoto ? (
                  <ul className="clock-menu__subnav-panel" aria-label="Photo categories">
                    {meechPhotoCategoryIds.map((id) => (
                      <li key={id} className="clock-menu__subnav-item">
                        <button
                          type="button"
                          className="clock-menu__subnav-link"
                          data-active={category === id ? "true" : "false"}
                          aria-pressed={category === id}
                          onClick={() => onCategoryChange(id)}
                        >
                          {meechPhotoCategoryLabels[id]}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
          {menuPages.map((page) => (
            <li
              key={`ghost-${page.link}`}
              className="clock-menu__item clock-menu__item--ghost"
              aria-hidden="true"
            >
              <span className="clock-menu__primary-link">{page.label}</span>
            </li>
          ))}
        </ul>
        <div className="clock-menu__clock" aria-hidden>
          <span className="clock-menu__hand clock-menu__hand--hour" />
          <span className="clock-menu__hand clock-menu__hand--minute" />
          <span className="clock-menu__pin" />
        </div>
      </div>
    </nav>
  );
}
