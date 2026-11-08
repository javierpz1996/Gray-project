/**
 * ÚNICO punto de configuración editable del sitio.
 *
 * Nombre del artista, título, email, redes y año viven aquí.
 * Si hay que cambiar la identidad del sitio, se cambia en este fichero.
 *
 * @see DESIGN.md — los tokens visuales no se tocan aquí, van en globals.css
 */

import {
  homeDesign1HeroAnimations,
  homeDesign1HeroHref,
} from "@/lib/home-design-1-hero-animation";
import { productDetailHref } from "@/lib/product-detail-path";

export type SiteNavLink = {
  readonly kind: "link";
  readonly href: string;
  readonly label: string;
};

export type SiteNavExternal = {
  readonly kind: "external";
  readonly href: string;
  readonly label: string;
};

export type SiteNavSoon = {
  readonly kind: "soon";
  readonly label: string;
};

export type SiteNavDropdownItem = {
  readonly href: string;
  readonly label: string;
};

export type SiteNavDropdown = {
  readonly kind: "dropdown";
  readonly label: string;
  readonly items: readonly SiteNavDropdownItem[];
};

export type SiteNavItem =
  | SiteNavLink
  | SiteNavExternal
  | SiteNavSoon
  | SiteNavDropdown;

const whatsappPhone = "5491112345678";

const siteEmail = "hola@example.com";

export const site = {
  /** Nombre del artista / marca. */
  name: "GrayArt",

  /** Marca junto al logo en header y heroes. */
  wordmark: "GRAYBY",

  /** Título corto (metadata y compat). */
  shortName: "GrayArt",

  /** Descripción para <title> y meta description. */
  description:
    "Libros e ilustración de autoría. Edición completa o por temas.",

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
  email: siteEmail,

  /**
   * WhatsApp (solo dígitos, con código de país). Ej.: 5491112345678
   * Genera enlace wa.me en el header.
   */
  whatsappPhone,

  /** Logo oficial: `public/Imagenes/Varias/logoPrincipal.png`. */
  logoSrc: "/Imagenes/Varias/logoPrincipal.png",

  /** Logo navbar diseño 3: `public/Imagenes/Varias/logoSecundario.png`. */
  logoSecondarySrc: "/Imagenes/Varias/logoSecundario.png",

  /** Banner principal bajo el navbar (`banner-expansive.png`, 2089×753). */
  homeBannerSrc: "/Imagenes/Varias/banner-expansive.png",
  homeBannerAlt: "Grayby art — ilustración y libros de autoría",

  /** Hero del diseño 2 (`hero2.png`). */
  homeBannerDesign2Src: "/Imagenes/Varias/hero2.png",
  homeBannerDesign2Alt:
    "Collage de ilustración Grayby — personajes y estilos de autoría",

  /** Hero diseño 10 — split diagonal (referencia comisiones / SATO). */
  homeDesign10: {
    wordmark: "SATO",
    headline: "Ilustraciones que cuentan tu historia",
    subline: "Comisiones abiertas de arte anime y personajes originales.",
    ctaLabel: "Ver comisiones",
    ctaHref: "/?diseno=10#libros",
    contactLabel: "Contacto",
    contactHref: `mailto:${siteEmail}`,
    imageSrc: "/Imagenes/Varias/hero-diseno-10-illustration.png",
    imageAlt: "Ilustración anime — composición en tres paneles de color",
  },

  /** Rótulo vertical del hero diseño 2 (una línea, rotada). */
  homeBannerDesign2SideLabel: "GRAYBYART - GRAYBYART",

  /** Ilustración de fondo en heroes alternativos (placeholder). */
  heroIllustrationSrc: "/home/hero-illustracion.svg",
  heroIllustrationAlt:
    "Ilustración de autoría — fondo de la pantalla inicial",

  /** Enlaces externos. Editar o eliminar los que no apliquen. */
  links: {
    instagram: "https://instagram.com/",
    x: "https://x.com/",
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/",
    youtube: "https://www.youtube.com/",
    deviantart: "https://www.deviantart.com/",
    behance: "",
    linkedin: "",
  },

  /** Navegación principal del sitio. */
  nav: [
    { kind: "link", href: "/#inicio", label: "Inicio" },
    {
      kind: "dropdown",
      label: "Libros",
      items: [
        { href: "/#libros", label: "Libros" },
        {
          href: productDetailHref("fundamentos-dibujo"),
          label: "Edición completa",
        },
        {
          href: productDetailHref("formas-espacio-3d"),
          label: "Tema I",
        },
        {
          href: productDetailHref("anatomia-constructiva"),
          label: "Tema II",
        },
        {
          href: productDetailHref("apunte-dibujo"),
          label: "Tema III",
        },
        {
          href: productDetailHref("rostro-proporciones"),
          label: "Tema IV",
        },
      ],
    },
    { kind: "link", href: "/#portafolio", label: "Obra" },
    {
      kind: "dropdown",
      label: "Diseños",
      items: [
        { href: "/?diseno=1", label: "1 · Pop (principal)" },
        ...homeDesign1HeroAnimations.filter((entry) => entry.id !== 3).map(
          (entry) => ({
            href: homeDesign1HeroHref(entry.id),
            label: entry.navLabel,
          }),
        ),
        { href: "/?diseno=2", label: "2 · Portal" },
        { href: "/?diseno=3", label: "3 · Editorial" },
        { href: "/?diseno=10", label: "10 · Diagonal (SATO)" },
      ],
    },
    {
      kind: "link",
      href: "/desing-system",
      label: "Sistema de diseño",
    },
  ] as SiteNavItem[],
} as const;

export type Site = typeof site;

/** Enlace wa.me a partir de `site.whatsappPhone`. */
export function whatsappUrl(phone: string = site.whatsappPhone): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}
