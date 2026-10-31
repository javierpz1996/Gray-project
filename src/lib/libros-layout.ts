export const LIBROS_LAYOUT_IDS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export type LibrosLayoutId = (typeof LIBROS_LAYOUT_IDS)[number];

const layoutIdSet = new Set<number>(LIBROS_LAYOUT_IDS);

export const librosLayoutMeta: Record<
  LibrosLayoutId,
  { label: string; hint: string }
> = {
  1: {
    label: "Clásico",
    hint: "Completo arriba y cuatro temas en grilla",
  },
  2: {
    label: "Destacado",
    hint: "Edición completa grande + temas en bloque",
  },
  3: {
    label: "Estante",
    hint: "Scroll horizontal tipo librería",
  },
  4: {
    label: "Editorial",
    hint: "Banda ancha del completo + fila de temas",
  },
  5: {
    label: "50 / 50",
    hint: "LibroCompleto.jpg ocupa la mitad izquierda; temas 2×2 a la derecha",
  },
  6: {
    label: "50 + lista",
    hint: "Mitad izquierda completo; temas en fila con miniatura",
  },
  7: {
    label: "50 sticky",
    hint: "Completo fijo al scroll; temas en columna derecha",
  },
  8: {
    label: "50 póster",
    hint: "Portada completa a sangre en 50 %; temas compactos",
  },
};

export function parseLibrosLayout(value: string | null | undefined): LibrosLayoutId {
  const parsed = Number(value);
  if (layoutIdSet.has(parsed)) {
    return parsed as LibrosLayoutId;
  }
  return 5;
}

/** Conserva `diseno`, `hero`, `logo`, etc. al cambiar maquetación. */
export function librosLayoutHref(
  layout: LibrosLayoutId,
  searchParams: URLSearchParams,
): string {
  const next = new URLSearchParams(searchParams);
  if (layout === 5) {
    next.delete("libros");
  } else {
    next.set("libros", String(layout));
  }
  const query = next.toString();
  return query ? `/?${query}#libros` : "/#libros";
}
