"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { completeShelfCatalog } from "./catalog";
import { ShelfEngine, type ShelfMode } from "./ShelfEngine";
import { siteConfig } from "./site-config";
import "./complete-shelf.css";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <span aria-hidden="true" className={`arrow-icon arrow-icon--${direction}`}>
      <span />
    </span>
  );
}

export function CompleteShelfExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ShelfEngine | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<ShelfMode>("browse");
  const [ready, setReady] = useState(false);

  const catalog = completeShelfCatalog;
  const hasSelection = activeIndex >= 0;
  const activeBook = hasSelection ? catalog[activeIndex]! : null;
  const selectedBook = useMemo(
    () => (selectedIndex === null ? null : catalog[selectedIndex]),
    [catalog, selectedIndex],
  );
  const isFocused = mode !== "browse";

  useEffect(() => {
    let cancelled = false;
    let engine: ShelfEngine | null = null;

    async function start() {
      if (!canvasRef.current) return;
      await document.fonts.ready;
      if (cancelled || !canvasRef.current) return;

      engine = new ShelfEngine(canvasRef.current, completeShelfCatalog, {
        onActiveIndex: setActiveIndex,
        onMode: (nextMode, index) => {
          setMode(nextMode);
          setSelectedIndex(index);
        },
        onStatus: () => {},
        onReady: () => setReady(true),
      });
      engineRef.current = engine;
    }

    void start();
    return () => {
      cancelled = true;
      engine?.dispose();
      engineRef.current = null;
    };
  }, []);

  return (
    <div className="complete-shelf-root">
      <div
        className={`press-experience ${ready ? "is-ready" : ""} ${
          isFocused ? "is-focused" : "is-browsing"
        } ${hasSelection ? "has-selection" : "is-idle-shelf"}`}
      >
      <canvas
        ref={canvasRef}
        className="shelf-canvas"
        role="application"
        tabIndex={0}
        aria-label={`Estante tridimensional con ${catalog.length} libros. Desplazá con scroll o arrastrá para recorrer; después podés inspeccionar un volumen.`}
      />

      <header className="site-header">
        <div
          className="wordmark"
          aria-label={`${siteConfig.wordmark}, ${siteConfig.collectionName}`}
        >
          <span>{siteConfig.wordmark}</span>
          <span className="wordmark__divider" />
          <span>{siteConfig.collectionName}</span>
        </div>
      </header>

      <section
        className="browse-caption"
        aria-hidden={isFocused || !hasSelection || !activeBook}
      >
        {activeBook ? (
          <>
        <p className="eyebrow">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="eyebrow__line" />
          <span>{String(catalog.length).padStart(2, "0")}</span>
        </p>
        <h1>{activeBook.shortTitle}</h1>
        <p className="browse-caption__author">{activeBook.author}</p>
        <button
          type="button"
          className="inspect-button"
          disabled={isFocused}
          onClick={() => engineRef.current?.focusBook(activeIndex)}
          aria-label={`Inspeccionar ${activeBook.title}`}
        >
          <span>Inspeccionar volumen</span>
          <span aria-hidden="true">↗</span>
        </button>
          </>
        ) : null}
      </section>

      <button
        type="button"
        className="shelf-arrow shelf-arrow--left"
        aria-label="Libro anterior"
        disabled={isFocused || !hasSelection || activeIndex === 0}
        onClick={() => engineRef.current?.browseBy(-1)}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        className="shelf-arrow shelf-arrow--right"
        aria-label="Libro siguiente"
        disabled={isFocused || !hasSelection || activeIndex === catalog.length - 1}
        onClick={() => engineRef.current?.browseBy(1)}
      >
        <ArrowIcon direction="right" />
      </button>

      <nav className="shelf-index" aria-label="Posición en el catálogo">
        <div className="shelf-index__ticks">
          {catalog.map((book, index) => (
            <button
              key={book.id}
              type="button"
              className={
                hasSelection && index === activeIndex ? "is-active" : ""
              }
              aria-label={`Ir a ${book.title}`}
              aria-current={
                hasSelection && index === activeIndex ? "true" : undefined
              }
              disabled={isFocused}
              onClick={() => engineRef.current?.browseTo(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="input-hint" aria-hidden="true">
          <span>ARRASTRAR</span>
          <i />
          <span>SCROLL</span>
          <i />
          <span>FLECHAS</span>
        </div>
      </nav>

      <aside
        className="book-details"
        aria-hidden={!isFocused}
        aria-label={
          selectedBook ? `Detalle de ${selectedBook.title}` : "Detalle del libro"
        }
      >
        {selectedBook ? (
          <div className="book-details__inner">
            <button
              type="button"
              className="back-button"
              onClick={() => engineRef.current?.returnToShelf()}
            >
              <ArrowIcon direction="left" />
              <span>Volver al estante</span>
            </button>

            <div className="book-details__position">
              <span>{String(selectedIndex! + 1).padStart(2, "0")}</span>
              <span>{String(catalog.length).padStart(2, "0")}</span>
            </div>

            <div className="book-details__copy">
              <p className="eyebrow">{siteConfig.editionEyebrow}</p>
              <h2>{selectedBook.title}</h2>
              <p className="book-details__author">{selectedBook.author}</p>
              <p className="book-details__description">
                {selectedBook.description}
              </p>

              <blockquote>
                <p>“{selectedBook.quote}”</p>
                <cite>{selectedBook.quoteBy}</cite>
              </blockquote>

              <dl>
                <div>
                  <dt>Formato</dt>
                  <dd>{selectedBook.format}</dd>
                </div>
                <div>
                  <dt>Disponibilidad</dt>
                  <dd>{selectedBook.availability}</dd>
                </div>
              </dl>

              <Link
                className="official-link"
                href={selectedBook.url}
                prefetch
              >
                <span>
                  {selectedBook.linkLabel ?? siteConfig.bookLinkLabel}
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="focus-controls" aria-label="Controles de inspección">
              <span>Arrastrá para orbitar</span>
              <span>Pellizcá o scroll para zoom</span>
              <button
                type="button"
                onClick={() => engineRef.current?.resetFocusView()}
              >
                Restablecer vista
              </button>
            </div>
          </div>
        ) : null}
      </aside>

      <div className="loading-screen" aria-hidden={ready}>
        <div className="loading-screen__mark">
          <span />
          <span />
          <span />
        </div>
        <p>Montando {catalog.length} volúmenes</p>
      </div>

      <p className="independent-note">{siteConfig.independentNote}</p>

      <div className="sr-only" aria-live="polite">
        {isFocused && selectedBook
          ? `Inspeccionando ${selectedBook.title}, de ${selectedBook.author}.`
          : activeBook
            ? `Seleccionado: ${activeBook.title}, de ${activeBook.author}.`
            : "Ningún volumen seleccionado. Desplazá el estante para explorar."}
      </div>
      </div>
    </div>
  );
}
