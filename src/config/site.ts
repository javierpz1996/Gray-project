/**
 * ÚNICO punto de configuración editable del sitio.
 *
 * Nombre del artista, título, email, redes y año viven aquí.
 * Si hay que cambiar la identidad del sitio, se cambia en este fichero.
 *
 * @see DESIGN.md — los tokens visuales no se tocan aquí, van en globals.css
 */

export const site = {
  /** Nombre del artista / marca. */
  name: "GrayArt",

  /** Título corto para header. */
  shortName: "GrayArt",

  /** Descripción para <title> y meta description. */
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

  /** URL de producción. Usada por metadataBase, sitemap y robots. */
  url: "https://example.com",

  /** Año fijado a mano: no usar new Date() en el shell (cacheComponents). */
  year: 2026,

  /**
   * themeColor del viewport. Debe coincidir con `--canvas` en
   * src/app/globals.css: la API de metadata exige un literal, no admite
   * var(). Es la única duplicación de color admitida en el proyecto.
   */
  themeColor: "#f5f5f7",

  /** Email de contacto. Se usa como mailto: — no es un formulario. */
  email: "hola@example.com",

  /** Enlaces externos. Editar o eliminar los que no apliquen. */
  links: {
    instagram: "https://instagram.com/",
    behance: "",
    linkedin: "",
  },

  /** Rutas de la navegación (anclas sobre la landing). Vacío hasta definir secciones. */
  nav: [] as { readonly href: string; readonly label: string }[],
} as const;

export type Site = typeof site;
