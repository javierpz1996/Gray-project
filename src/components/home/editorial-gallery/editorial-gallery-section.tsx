"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { site, whatsappUrl } from "@/config/site";
import { MeechPhotoClockMenu } from "@/components/home/editorial-gallery/meech-photo-clock-menu";
import { MeechPhotoEngine } from "@/components/home/editorial-gallery/meech-photo-engine";
import {
  meechPhotoItems,
  type MeechPhotoCategoryId,
  type MeechPhotoItem,
} from "@/components/home/editorial-gallery/meech-photo-data";
import {
  meech213ChromeLinks,
  meech213GhostNavLabels,
} from "@/components/home/editorial-gallery/meech213-chrome";
import { Meech213Logo } from "@/components/home/editorial-gallery/meech213-logo";
import "./editorial-gallery.css";

type EditorialGallerySectionProps = {
  /** Pantalla completa sin offset del header Gray (ruta /meech213-photo). */
  standalone?: boolean;
  /** Tira de tarjetas; por defecto piezas del sitio repetidas. */
  items?: MeechPhotoItem[];
};

export function EditorialGallerySection({
  standalone = false,
  items = meechPhotoItems,
}: EditorialGallerySectionProps) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<MeechPhotoEngine | null>(null);
  const [category, setCategory] = useState<MeechPhotoCategoryId>("all");
  const [ready, setReady] = useState(false);

  const filteredItems = useMemo(() => {
    if (category === "all") return items;
    return items.filter((item) => item.category === category);
  }, [category, items]);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      await document.fonts.ready;
      if (cancelled || !canvasRef.current) return;

      engineRef.current?.dispose();
      engineRef.current = new MeechPhotoEngine(canvasRef.current, filteredItems, {
        onReady: () => setReady(true),
        onItemClick: (item) => router.push(item.href),
      });
    }

    void start();
    return () => {
      cancelled = true;
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, [filteredItems, router]);

  const mailHref = standalone
    ? meech213ChromeLinks.email
    : `mailto:${site.email}`;

  const sectionClass = [
    "meech-photo",
    standalone ? "meech-photo--standalone" : "scroll-mt-[var(--site-header-height)]",
    ready ? "meech-photo--ready" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={standalone ? undefined : "portafolio"} className={sectionClass} aria-label="Photo">
      <div className="meech-photo__canvas-wrap">
        <canvas
          ref={canvasRef}
          className="meech-photo__canvas"
          aria-label="Galería editorial. Arrastrá o usá scroll horizontal para recorrer."
          role="application"
          tabIndex={0}
        />
      </div>

      {standalone ? (
        <div className="meech-photo__ghost-nav" aria-hidden>
          {meech213GhostNavLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      ) : null}

      <header className="meech-photo__header header-grid">
        <div className="meech-photo__header-start">
          {standalone ? (
            <button
              type="button"
              className="meech-photo__back"
              onClick={() => router.back()}
            >
              Back
            </button>
          ) : (
            <p className="meech-photo__tagline">It&apos;s {site.name}&apos;s time</p>
          )}
        </div>
        <Link
          href={standalone ? "https://www.meech213.com/" : "/#inicio"}
          className="meech-photo__logo"
          aria-label={standalone ? "Meech213" : site.name}
          {...(standalone ? { rel: "noopener noreferrer", target: "_blank" } : {})}
        >
          {standalone ? (
            <Meech213Logo className="meech-photo__logo-svg" />
          ) : (
            <span className="meech-photo__logo-mark" aria-hidden>
              {site.name.slice(0, 1)}
            </span>
          )}
        </Link>
        <ul className="meech-photo__social">
          <li>
            <a href={mailHref}>Email</a>
          </li>
          {standalone ? (
            <>
              <li>
                <a href={meech213ChromeLinks.twitter} rel="noopener noreferrer" target="_blank">
                  Twitter
                </a>
              </li>
              <li>
                <a href={meech213ChromeLinks.facebook} rel="noopener noreferrer" target="_blank">
                  Facebook
                </a>
              </li>
              <li>
                <a href={meech213ChromeLinks.instagram} rel="noopener noreferrer" target="_blank">
                  Instagram
                </a>
              </li>
            </>
          ) : (
            <>
              {site.links.x ? (
                <li>
                  <a href={site.links.x} rel="noopener noreferrer" target="_blank">
                    Twitter
                  </a>
                </li>
              ) : null}
              {site.links.instagram ? (
                <li>
                  <a href={site.links.instagram} rel="noopener noreferrer" target="_blank">
                    Instagram
                  </a>
                </li>
              ) : null}
              <li>
                <a href={whatsappUrl()} rel="noopener noreferrer" target="_blank">
                  WhatsApp
                </a>
              </li>
            </>
          )}
        </ul>
      </header>

      <footer className="meech-photo__footer footer">
        <div className="container">
          <div className="footer-grid">
            <p className="footer-text">© All rights reserved. {site.year}</p>
            <MeechPhotoClockMenu category={category} onCategoryChange={setCategory} />
            <p className="footer-text footer-text--credit">
              {standalone ? (
                <a href={meech213ChromeLinks.credit} rel="noopener noreferrer" target="_blank">
                  Site by {meech213ChromeLinks.creditLabel}
                </a>
              ) : (
                "Gray"
              )}
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
