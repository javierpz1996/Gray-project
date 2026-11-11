import saved from "../../data/site-menu.json";

/** Valor incluido en el build. No leer el disco: cacheComponents prerenderiza las páginas estáticas. */
export const menuApplied = saved.applied !== false;
