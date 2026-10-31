import { librosSection } from "@/content/libros";
import { cn } from "@/lib/utils";

function LibrosTemasSketchArrow({ variant }: { variant: "left" | "right" }) {
  const path =
    variant === "left"
      ? "M 118 4 C 92 8, 72 26, 80 48"
      : "M 42 4 C 68 8, 88 26, 80 48";
  const head =
    variant === "left"
      ? "M 80 48 L 73 44 M 80 48 L 84 40"
      : "M 80 48 L 87 44 M 80 48 L 76 40";

  return (
    <svg
      className="h-10 w-full max-w-[10rem] justify-self-center text-fg lg:max-w-none"
      viewBox="0 0 160 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d={head}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Flechas tipo boceto sobre la grilla 2×2 de temas (layout mitad). */
export function LibrosTemasCallout() {
  return (
    <div className="libros-temas-callout grid w-full grid-cols-2 gap-x-4 sm:gap-x-5 lg:gap-x-5">
      <p className="col-span-2 mx-auto max-w-[8.75rem] text-center font-sans text-micro italic leading-snug text-fg sm:max-w-[9.25rem] lg:mb-0.5 lg:text-small">
        {librosSection.temasCalloutLines.map((line) => (
          <span
            key={line}
            className={cn(
              "block",
              line === "por separado" &&
                "mx-auto mt-2 w-fit -rotate-1 bg-ds-yellow px-2.5 py-1 text-small font-semibold not-italic",
            )}
          >
            {line}
          </span>
        ))}
      </p>
      <LibrosTemasSketchArrow variant="left" />
      <LibrosTemasSketchArrow variant="right" />
    </div>
  );
}
