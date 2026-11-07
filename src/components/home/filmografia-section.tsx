"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const styles = {
  section: "filmografia-section",
  content: "filmografia-section__content",
  tabs: "filmografia-section__tabs",
  shelf: "filmografia-section__shelf",
  stage: "filmografia-section__stage",
  tape: "filmografia-section__tape",
  activeTape: "filmografia-section__active-tape",
  spine: "filmografia-section__spine",
  cover: "filmografia-section__cover",
  play: "filmografia-section__play",
  arrow: "filmografia-section__arrow",
  next: "filmografia-section__next",
  caption: "filmografia-section__caption",
  romanized: "filmografia-section__romanized",
  year: "filmografia-section__year",
  cursor: "filmografia-section__cursor",
  detail: "filmografia-section__detail",
  close: "filmografia-section__close",
  detailPoster: "filmografia-section__detail-poster",
  detailText: "filmografia-section__detail-text",
  meta: "filmografia-section__meta",
  synopsis: "filmografia-section__synopsis",
  credit: "filmografia-section__credit",
  nextSection: "filmografia-section__next-section",
} as const;

type Film = {
  id: string;
  titulo: string;
  romanizado: string;
  kanji: string;
  año: number;
  genero: string;
  duracion: number;
  sinopsis: string;
  spine: [SheetName, number, number, number, number];
  cover: [SheetName, number, number, number, number];
};

type SheetName = keyof typeof sheets;

const sheets = {
  covers: ["https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010644_837e04ca-2418-45c1-b8e0-0233265c4cd5.png&w=1744&q=85", 1744, 2336],
  spines: ["https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010738_a3e47ead-18f2-4974-9468-06d16a25edc5.png&w=2688&q=85", 2688, 1152],
  fix: ["https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010831_3ebb874b-93dc-433e-87ed-6299aba720f0.png&w=1520&q=85", 1520, 2688],
  fix2: ["https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_092020_f96bc094-db7b-46de-9298-074a24e0a3b8.png&w=1520&q=85", 1520, 2688],
} as const;

const films: Film[] = [
  { id: "valley", titulo: "El valle silencioso", romanizado: "SHIZUKANA TANI", kanji: "静かな谷", año: 1958, genero: "Drama", duracion: 104, sinopsis: "Una maestra vuelve al pueblo de montaña que expulsó a su padre y descubre que el valle conserva cada uno de sus secretos.", spine: ["spines", 266, 31, 189, 1089], cover: ["covers", 497, 72, 344, 659] },
  { id: "bluehour", titulo: "La hora azul", romanizado: "AO NO TOKI", kanji: "青の刻", año: 1962, genero: "Romance", duracion: 97, sinopsis: "Durante una larga tarde en el puerto, una viuda y un desconocido intercambian pequeñas mentiras hasta que se apaga la luz.", spine: ["spines", 492, 31, 189, 1089], cover: ["covers", 914, 72, 342, 659] },
  { id: "river", titulo: "Río de sal", romanizado: "SHIO NO KAWA", kanji: "塩の川", año: 1964, genero: "Drama", duracion: 121, sinopsis: "Dos hermanos arrastran una barcaza de sal río abajo hacia una ciudad que ya no quiere nada de lo que llevan.", spine: ["fix", 197, 54, 324, 2566], cover: ["covers", 1332, 72, 344, 659] },
  { id: "summer", titulo: "El último verano", romanizado: "SAIGO NO NATSU", kanji: "最後の夏", año: 1966, genero: "Drama", duracion: 109, sinopsis: "El verano antes de que la represa inunde su pueblo, tres amigos incendian todo lo que no pueden llevarse.", spine: ["spines", 937, 31, 188, 1089], cover: ["covers", 74, 813, 344, 676] },
  { id: "green", titulo: "El camino verde", romanizado: "MIDORI NO MICHI", kanji: "緑の道", año: 1969, genero: "Misterio", duracion: 101, sinopsis: "Un agrimensor que traza un camino en el bosque encuentra siempre las mismas huellas, un día por delante de él.", spine: ["spines", 1157, 31, 185, 1090], cover: ["covers", 497, 815, 344, 674] },
  { id: "noon", titulo: "Mediodía entre cenizas", romanizado: "HAI NO SHOGO", kanji: "灰の正午", año: 1971, genero: "Oeste", duracion: 112, sinopsis: "Un jinete cruza un desierto blanco para saldar una vieja deuda y descubre demasiado tarde quién lo envió.", spine: ["spines", 44, 32, 184, 1088], cover: ["covers", 74, 72, 347, 659] },
  { id: "observer", titulo: "El observador", romanizado: "KANSATSUSHA", kanji: "観察者", año: 1973, genero: "Suspenso", duracion: 96, sinopsis: "Un sereno nocturno empieza a sospechar que el edificio que vigila también ha comenzado a observarlo.", spine: ["fix2", 371, 15, 349, 2655], cover: ["covers", 915, 815, 342, 675] },
  { id: "birds", titulo: "Los pájaros caídos", romanizado: "OCHITA TORI", kanji: "落ちた鳥", año: 1975, genero: "Drama", duracion: 118, sinopsis: "Cuando los pájaros dejan de cantar sobre un pueblo fronterizo, solo la hija del alcalde sale a buscar la causa.", spine: ["spines", 1573, 31, 183, 1089], cover: ["covers", 1331, 815, 345, 675] },
  { id: "storm", titulo: "Luz en la tormenta", romanizado: "ARASHI NO HI", kanji: "嵐の灯", año: 1978, genero: "Drama", duracion: 127, sinopsis: "Un farero y su hijo esperan que pase una tormenta de tres días junto a un náufrago que no quiere decir su nombre.", spine: ["fix2", 808, 15, 347, 2656], cover: ["covers", 74, 1571, 345, 681] },
  { id: "tide", titulo: "La marea larga", romanizado: "NAGAI SHIO", kanji: "長い潮", año: 1981, genero: "Drama", duracion: 99, sinopsis: "La esposa de un pescador cuenta las mareas en el muro del puerto mientras el barco de su marido no regresa.", spine: ["spines", 2012, 31, 188, 1089], cover: ["covers", 496, 1577, 343, 678] },
  { id: "war", titulo: "Una guerra callada", romanizado: "SHIZUKANA SENSO", kanji: "静かな戦争", año: 1985, genero: "Comedia", duracion: 103, sinopsis: "Dos vecinos libran una guerra silenciosa por una medianera durante treinta años, sin decir cómo empezó.", spine: ["spines", 2236, 31, 189, 1089], cover: ["covers", 913, 1579, 343, 676] },
  { id: "door", titulo: "La puerta roja", romanizado: "AKAI TOBIRA", kanji: "赤い扉", año: 1989, genero: "Suspenso", duracion: 114, sinopsis: "Un proyeccionista sigue una cinta desconocida por los pasillos de un cine durante su última noche.", spine: ["spines", 2462, 31, 188, 1089], cover: ["covers", 1331, 1579, 344, 677] },
];

function cropStyle(crop: Film["cover"] | Film["spine"]): CSSProperties {
  const [sheet, x, y, width, height] = crop;
  const [url, sourceWidth, sourceHeight] = sheets[sheet];
  return {
    backgroundImage: `url("${url}")`,
    backgroundSize: `${(sourceWidth / width) * 100}% ${(sourceHeight / height) * 100}%`,
    backgroundPosition: `${(x / (sourceWidth - width)) * 100}% ${(y / (sourceHeight - height)) * 100}%`,
  };
}

export function FilmografiaSection() {
  const [active, setActive] = useState(8);
  const [stepPx, setStepPx] = useState(100);
  const root = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const openingAnimation = useRef<Animation | null>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const dragStart = useRef<number | null>(null);
  const skipClick = useRef(false);
  const wheelRemainder = useRef(0);
  const film = films[active]!;
  const decade = `${Math.floor(film.año / 10) * 10}s`;
  const visibleOffsets = Array.from({ length: 15 }, (_, index) => index - 7);

  useEffect(() => {
    const panel = dialog.current;
    if (!panel) return;

    const releaseBodyScroll = () => {
      root.current?.removeAttribute("data-detail-open");
      document.body.removeAttribute("data-film-detail-open");
    };

    panel.addEventListener("close", releaseBodyScroll);
    return () => {
      panel.removeEventListener("close", releaseBodyScroll);
      releaseBodyScroll();
      if (panel.open) {
        panel.close();
      }
    };
  }, []);

  useEffect(() => {
    for (const [url] of Object.values(sheets)) {
      const image = new Image();
      image.src = url;
    }
  }, []);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const update = () => {
      const tape = section.querySelector<HTMLElement>(`.${styles.tape}`);
      if (!tape) return;
      const factor = window.matchMedia("(max-width: 767px)").matches ? 0.2 : 0.19;
      setStepPx(parseFloat(getComputedStyle(tape).height) * factor);
    };
    const observer = new ResizeObserver(update);
    observer.observe(section);
    const frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = root.current;
    const ring = cursor.current;
    if (!section || !ring) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-film-id]")
        : null;
      ring.dataset.mode = target
        ? target.dataset.filmId === films[active]!.id ? "open" : "spine"
        : event.target instanceof Element && event.target.closest("button") ? "button" : "default";
      ring.style.setProperty("--x", `${event.clientX}px`);
      ring.style.setProperty("--y", `${event.clientY}px`);
      ring.style.opacity = "1";
    };
    const onLeave = () => { ring.style.opacity = "0"; };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [active]);

  function move(direction: number) {
    setActive((index) => (index + direction + films.length) % films.length);
  }

  function openDetail() {
    const panel = dialog.current;
    if (!panel || panel.open) return;
    openingAnimation.current?.cancel();
    const cover = document.querySelector<HTMLElement>(`[data-film-id="${film.id}"] .${styles.cover}`);
    const rect = cover?.getBoundingClientRect();
    root.current?.setAttribute("data-detail-open", "true");
    document.body.setAttribute("data-film-detail-open", "");
    panel.showModal();
    if (!rect || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const top = (rect.top / window.innerHeight) * 100;
    const right = ((window.innerWidth - rect.right) / window.innerWidth) * 100;
    const bottom = ((window.innerHeight - rect.bottom) / window.innerHeight) * 100;
    const left = (rect.left / window.innerWidth) * 100;
    openingAnimation.current = panel.animate(
      [
        { clipPath: `inset(${top}% ${right}% ${bottom}% ${left}% round 3px)`, transform: "rotate(-4deg)" },
        { clipPath: "inset(0 0 0 0 round 0)", transform: "rotate(0)" },
      ],
      { duration: 700, easing: "cubic-bezier(.76,0,.18,1)", fill: "both" },
    );
  }

  function closeDetail() {
    const panel = dialog.current;
    if (!panel?.open) return;
    openingAnimation.current?.cancel();
    openingAnimation.current = null;
    root.current?.removeAttribute("data-detail-open");
    document.body.removeAttribute("data-film-detail-open");
    panel.close();
  }

  function selectDecade(value: string) {
    const year = value === "Todas" ? 1958 : Number(value.slice(0, 4));
    const target = films.findIndex((item) => item.año >= year);
    if (target >= 0) setActive(target);
  }

  return (
    <section ref={root} className={styles.section} id="filmografia" aria-labelledby="filmografia-title">
      <link rel="preconnect" href="https://images.higgs.ai" />
      <div className={styles.content}>
        <nav className={styles.tabs} aria-label="Filtrar por década">
          {["Todas", "1950s", "1960s", "1970s", "1980s"].map((item) => (
            <button key={item} type="button" aria-pressed={item !== "Todas" && decade === item} onClick={() => selectDecade(item)}>{item}</button>
          ))}
        </nav>
        <div
          className={styles.shelf}
          role="region"
          aria-label="Estante de películas. Usa las flechas izquierda y derecha para recorrerlo."
          onPointerDown={(event) => {
            dragStart.current = event.clientX;
            event.currentTarget.dataset.dragging = "true";
          }}
          onPointerUp={(event) => {
            const start = dragStart.current;
            dragStart.current = null;
            delete event.currentTarget.dataset.dragging;
            if (start === null) return;
            const distance = event.clientX - start;
            if (Math.abs(distance) > 10) {
              skipClick.current = true;
              move(-Math.round(distance / 50) || -Math.sign(distance));
              window.setTimeout(() => { skipClick.current = false; }, 0);
            }
          }}
          onPointerCancel={(event) => {
            dragStart.current = null;
            delete event.currentTarget.dataset.dragging;
          }}
          onWheel={(event) => {
            const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
            if (delta === 0) return;
            event.preventDefault();
            wheelRemainder.current += delta / 90;
            const steps = Math.trunc(wheelRemainder.current);
            if (steps !== 0) {
              move(steps);
              wheelRemainder.current -= steps;
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
            if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
          }}
        >
          <button className={styles.arrow} type="button" aria-label="Película anterior" onClick={() => move(-1)}><ArrowLeft aria-hidden="true" /></button>
          <div className={styles.stage}>
            {visibleOffsets.map((offset) => {
              const virtualIndex = active + offset;
              const index = (virtualIndex + films.length) % films.length;
              const item = films[index]!;
              return (
                <button
                  key={offset}
                  type="button"
                  className={`${styles.tape} ${offset === 0 ? styles.activeTape : ""}`}
                  style={{ "--offset-x": `${offset * stepPx}px`, "--offset-z": `${offset * -9}px` } as CSSProperties}
                  data-film-id={item.id}
                  aria-label={`${item.titulo}, ${item.año}${offset === 0 ? ", película seleccionada. Abrir ficha" : ". Seleccionar película"}`}
                  aria-current={offset === 0 ? "true" : undefined}
                  onClick={() => {
                    if (skipClick.current) { skipClick.current = false; return; }
                    if (offset === 0) openDetail();
                    else setActive(index);
                  }}
                >
                  {offset === 0 ? <><span className={styles.cover} style={cropStyle(item.cover)} aria-hidden="true" /><span className={styles.play} aria-hidden="true" /></> : <span className={styles.spine} style={cropStyle(item.spine)} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
          <button className={`${styles.arrow} ${styles.next}`} type="button" aria-label="Película siguiente" onClick={() => move(1)}><ArrowRight aria-hidden="true" /></button>
        </div>
        <div className={styles.caption} aria-live="polite" aria-atomic="true">
          <div>
            <p className={styles.romanized}>{film.romanizado} <span>/ {film.kanji}</span></p>
            <h3>{film.titulo}</h3>
            <p className={styles.year}>{film.año}</p>
          </div>
          <a className={styles.nextSection} href="#libros">
            Libros — estante interactivo ↓
          </a>
        </div>
      </div>
      <dialog ref={dialog} className={styles.detail} aria-labelledby="film-detail-title" onCancel={(event) => { event.preventDefault(); closeDetail(); }} onClick={(event) => { if (event.target === dialog.current) closeDetail(); }}>
        <button className={styles.close} type="button" aria-label="Cerrar ficha" onClick={closeDetail}><X aria-hidden="true" /></button>
        <div className={styles.detailPoster} style={cropStyle(film.cover)} aria-hidden="true" />
        <div className={styles.detailText}>
          <p className={styles.romanized}>{film.romanizado} / {film.kanji}</p>
          <h3 id="film-detail-title">{film.titulo}</h3>
          <p className={styles.meta}>{film.año} / {film.genero} / {film.duracion} MIN</p>
          <p className={styles.synopsis}>{film.sinopsis}</p>
          <p className={styles.credit}>Escrita y dirigida por León Vasari · 監督作品</p>
        </div>
      </dialog>
      <span ref={cursor} className={styles.cursor} data-mode="default" aria-hidden="true"><i /><b>ABRIR / 開く</b></span>
    </section>
  );
}
