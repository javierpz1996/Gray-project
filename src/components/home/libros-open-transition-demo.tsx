"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { libroEdicionCompleta, librosTemas } from "@/content/libros";
import { cn } from "@/lib/utils";
import {
  LIBROS_OPEN_FLIGHT_DURATION_S,
  LIBROS_OPEN_FLIGHT_EASE,
} from "@/lib/libros-open-flight";

const GRID_EXIT = { duration: 0.28, ease: LIBROS_OPEN_FLIGHT_EASE } as const;

const FLIGHT_TWEEN = {
  duration: LIBROS_OPEN_FLIGHT_DURATION_S,
  ease: LIBROS_OPEN_FLIGHT_EASE,
} as const;

const OPTIONS = [
  {
    id: 1,
    title: "Morph de portada",
    hint: "Fondo papel; grilla se disuelve y la portada vuela al centro.",
    focusBg: "bg-paper",
  },
  {
    id: 2,
    title: "Zoom al centro",
    hint: "Fondo coral; easing suave con leve desaceleración al centro.",
    focusBg: "bg-accent",
  },
  {
    id: 3,
    title: "Cortina / recorte",
    hint: "El color crece mientras la portada viaja.",
    focusBg: "bg-canvas",
  },
  {
    id: 4,
    title: "Profundidad",
    hint: "La grilla se desenfoca; la portada queda al frente.",
    focusBg: "bg-secondary",
  },
  {
    id: 5,
    title: "Colapso de grilla",
    hint: "Todo se apaga; el libro queda centrado.",
    focusBg: "bg-surface-muted",
  },
  {
    id: 6,
    title: "Rápido Gray",
    hint: "Misma coreografía, duración más corta.",
    focusBg: "bg-canvas",
  },
] as const;

type OptionId = (typeof OPTIONS)[number]["id"];
type CardId = "completo" | "tema-1" | "tema-2";

type Rect = { x: number; y: number; w: number; h: number };

type Flight = {
  cardId: CardId;
  from: Rect;
  to: Rect;
};

const CARDS: {
  id: CardId;
  label: string;
  src: string;
  alt: string;
  gridClass?: string;
}[] = [
  {
    id: "completo",
    label: "Edición completa",
    src: libroEdicionCompleta.imagen,
    alt: libroEdicionCompleta.alt,
    gridClass: "row-span-2",
  },
  {
    id: "tema-1",
    label: "Tema I",
    src: librosTemas[0]?.imagen ?? "/media/libros/tema-1.jpg",
    alt: librosTemas[0]?.alt ?? "Portada — Tema I",
  },
  {
    id: "tema-2",
    label: "Tema II",
    src: librosTemas[1]?.imagen ?? "/media/libros/tema-2.jpg",
    alt: librosTemas[1]?.alt ?? "Portada — Tema II",
  },
];

type DemoSize = "compact" | "large";

const PREVIEW_HEIGHT: Record<DemoSize, string> = {
  compact: "h-56 md:h-60",
  large:
    "min-h-[18rem] h-[42vw] max-h-[28rem] md:min-h-[22rem] md:h-[32rem] md:max-h-none",
};

const IMAGE_SIZES: Record<DemoSize, string> = {
  compact: "(max-width: 768px) 28vw, 10rem",
  large: "(max-width: 768px) 40vw, 20rem",
};

const FOCUS_MAX_WIDTH: Record<DemoSize, number> = {
  compact: 152,
  large: 288,
};

function flightTransition(optionId: OptionId, instant: boolean) {
  if (instant) return { duration: 0 };
  if (optionId === 6) {
    return { duration: 0.38, ease: LIBROS_OPEN_FLIGHT_EASE };
  }
  return FLIGHT_TWEEN;
}

function computeFocusRect(container: HTMLElement, size: DemoSize): Rect {
  const { width, height } = container.getBoundingClientRect();
  const targetW = Math.min(width * 0.52, FOCUS_MAX_WIDTH[size]);
  const targetH = targetW * (4 / 3);
  return {
    x: (width - targetW) / 2,
    y: (height - targetH) / 2,
    w: targetW,
    h: targetH,
  };
}

function measureFromButton(container: HTMLElement, button: HTMLElement): Rect {
  const c = container.getBoundingClientRect();
  const b = button.getBoundingClientRect();
  return {
    x: b.left - c.left,
    y: b.top - c.top,
    w: b.width,
    h: b.height,
  };
}

function CoverFrame({
  src,
  alt,
  label,
  imageSizes,
  showLabel = true,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  label: string;
  imageSizes: string;
  showLabel?: boolean;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden rounded-sm border border-border bg-surface shadow-book",
        className,
      )}
    >
      {showLabel ? (
        <span className="absolute left-1.5 top-1.5 z-[1] rounded-full border border-border bg-surface/95 px-1.5 py-px text-[0.5rem] font-semibold uppercase tracking-widest text-fg">
          {label}
        </span>
      ) : null}
      <div className="relative min-h-0 flex-1">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes={imageSizes}
          loading={eager ? "eager" : undefined}
          fetchPriority={eager ? "high" : undefined}
          className="object-cover"
        />
      </div>
    </div>
  );
}

function FocusLayer({
  flight,
  card,
  optionId,
  focusBg,
  size,
  instant,
}: {
  flight: Flight;
  card: (typeof CARDS)[number];
  optionId: OptionId;
  focusBg: string;
  size: DemoSize;
  instant: boolean;
}) {
  const { from, to } = flight;
  const move = flightTransition(optionId, instant);
  const scaleX0 = from.w / to.w;
  const scaleY0 = from.h / to.h;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {optionId === 3 ? (
        <motion.div
          className={cn("absolute inset-0", focusBg)}
          initial={{
            clipPath: instant
              ? "inset(0% 0% 0% 0%)"
              : "inset(42% 42% 42% 42%)",
          }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: instant ? 0 : 0.45, ease: LIBROS_OPEN_FLIGHT_EASE }}
        />
      ) : (
        <motion.div
          className={cn("absolute inset-0", focusBg)}
          initial={{ opacity: instant ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: instant ? 0 : 0.35, ease: LIBROS_OPEN_FLIGHT_EASE }}
        />
      )}

      <motion.div
        className="absolute left-0 top-0 z-10 origin-top-left will-change-transform"
        style={{ width: to.w, height: to.h }}
        initial={
          instant
            ? { x: to.x, y: to.y, scaleX: 1, scaleY: 1 }
            : { x: from.x, y: from.y, scaleX: scaleX0, scaleY: scaleY0 }
        }
        animate={{ x: to.x, y: to.y, scaleX: 1, scaleY: 1 }}
        transition={move}
      >
        <CoverFrame
          src={card.src}
          alt={card.alt}
          label={card.label}
          imageSizes={IMAGE_SIZES[size]}
          showLabel={false}
          eager
          className="h-full w-full"
        />
      </motion.div>

      <motion.p
        className="absolute bottom-3 left-0 right-0 z-10 text-center text-[0.625rem] text-fg-muted"
        initial={{ opacity: instant ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: instant ? 0 : 0.4,
          duration: 0.22,
          ease: LIBROS_OPEN_FLIGHT_EASE,
        }}
      >
        Vista detalle (simulada)
      </motion.p>
    </div>
  );
}

function TransitionPreview({
  optionId,
  focusBg,
  size,
}: {
  optionId: OptionId;
  focusBg: string;
  size: DemoSize;
}) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [flight, setFlight] = useState<Flight | null>(null);

  const instant = Boolean(reduceMotion);

  const reset = useCallback(() => setFlight(null), []);

  const open = useCallback(
    (id: CardId, button: HTMLButtonElement) => {
      if (flight) return;
      const stage = stageRef.current;
      if (!stage) return;

      const from = measureFromButton(stage, button);
      const to = computeFocusRect(stage, size);
      flushSync(() => {
        setFlight({ cardId: id, from, to });
      });
    },
    [flight, size],
  );

  const activeCard = flight
    ? CARDS.find((c) => c.id === flight.cardId)
    : undefined;

  const gridBlur = optionId === 4 && flight ? "blur(8px)" : "blur(0px)";

  return (
    <div className="flex flex-col gap-3">
      <MotionConfig reducedMotion="user">
        <div
          ref={stageRef}
          className={cn(
            "relative overflow-hidden rounded-md border border-border-strong bg-canvas",
            PREVIEW_HEIGHT[size],
          )}
        >
          <div
            className={cn(
              "absolute inset-0",
              size === "large" ? "p-4 md:p-6" : "p-2",
            )}
          >
            <motion.div
              className={cn(
                "relative grid h-full grid-cols-2 grid-rows-2",
                size === "large" ? "gap-4 md:gap-5" : "gap-2",
              )}
              animate={{
                opacity: flight ? 0 : 1,
                scale: flight ? 0.97 : 1,
                filter: gridBlur,
              }}
              transition={GRID_EXIT}
              style={{ pointerEvents: flight ? "none" : "auto" }}
              aria-hidden={Boolean(flight)}
            >
              {CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  disabled={flight !== null}
                  onClick={(e) => open(card.id, e.currentTarget)}
                  className={cn(
                    "min-h-0 min-w-0 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    card.gridClass,
                  )}
                >
                  <CoverFrame
                    src={card.src}
                    alt={card.alt}
                    label={card.label}
                    imageSizes={IMAGE_SIZES[size]}
                    eager
                    className="h-full w-full"
                  />
                </button>
              ))}
            </motion.div>
          </div>

          {flight && activeCard ? (
            <FocusLayer
              flight={flight}
              card={activeCard}
              optionId={optionId}
              focusBg={focusBg}
              size={size}
              instant={instant}
            />
          ) : null}
        </div>
      </MotionConfig>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="self-start"
        onClick={reset}
        disabled={!flight}
      >
        Repetir
      </Button>
    </div>
  );
}

type LibrosOpenTransitionDemoProps = {
  size?: DemoSize;
};

/** Comparación de animaciones — pantalla completa en /demo-animations */
export function LibrosOpenTransitionDemo({
  size = "compact",
}: LibrosOpenTransitionDemoProps) {
  const isLarge = size === "large";

  return (
    <div
      className={cn(
        "rounded-md border border-border-strong bg-surface/80",
        isLarge ? "p-6 md:p-10 lg:p-12" : "mb-12 p-6 md:p-8",
      )}
      role="region"
      aria-label="Comparación de animaciones al abrir un libro"
    >
      <p
        className={cn(
          "font-sans font-semibold text-fg",
          isLarge ? "text-h3" : "text-small",
        )}
      >
        Elegí animación al abrir un libro
      </p>
      <p
        className={cn(
          "mt-2 max-w-prose text-fg-muted",
          isLarge ? "text-body" : "mt-1 text-micro",
        )}
      >
        Portadas reales (Tema I ={" "}
        <span className="font-medium text-fg">LibroTema1.jpg</span>). Al tocar,
        la grilla se apaga y la portada viaja al centro al instante. Decinos el
        número (1–6).
      </p>
      <ul
        className={cn(
          "mt-10 grid gap-12",
          isLarge ? "gap-16 md:gap-20" : "lg:grid-cols-2 lg:gap-10",
        )}
      >
        {OPTIONS.map((option) => (
          <li key={option.id}>
            <p
              className={cn(
                "font-semibold uppercase tracking-widest text-fg-muted",
                isLarge ? "text-small" : "text-micro",
              )}
            >
              Opción {option.id} · {option.title}
            </p>
            <p
              className={cn(
                "mt-1 text-fg-muted",
                isLarge ? "text-small" : "text-micro",
              )}
            >
              {option.hint}
            </p>
            <div className={cn("mt-4", isLarge && "mt-6")}>
              <TransitionPreview
                optionId={option.id}
                focusBg={option.focusBg}
                size={size}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
