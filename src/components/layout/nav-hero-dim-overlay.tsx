import { HOME_CHROME_HEIGHT } from "@/lib/home-design";

/**
 * Oscurece el área bajo el navbar cuando un desplegable del menú está abierto.
 * La visibilidad la controla `body:has(...)` en globals.css (sin estado React).
 */
export function NavHeroDimOverlay() {
  return (
    <div
      className="nav-hero-dim pointer-events-none fixed inset-x-0 bottom-0 z-40 bg-black"
      style={{ top: HOME_CHROME_HEIGHT }}
      aria-hidden="true"
    />
  );
}
