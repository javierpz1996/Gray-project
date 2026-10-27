import { whatsappUrl } from "@/config/site";

/** Navegación diseño 3 (barra superior tipo portal, dos filas). */

export type Design3NavLinkItem = {
  kind: "link";
  href: string;
  label: string;
  suffix?: string;
};

export type Design3NavExternalItem = {
  kind: "external";
  href: string;
  label: string;
};

export type Design3NavSoonItem = {
  kind: "soon";
  label: string;
  soonNote: string;
};

export type Design3NavItem =
  | Design3NavLinkItem
  | Design3NavExternalItem
  | Design3NavSoonItem;

export const design3NavPrimary: readonly Design3NavItem[] = [];

export const design3NavSecondary: readonly Design3NavItem[] = [
  { kind: "external", href: whatsappUrl(), label: "WhatsApp" },
  { kind: "link", href: "#redes", label: "Redes" },
  { kind: "link", href: "#sobre-mi", label: "Sobre mí" },
  { kind: "soon", label: "Suscripción", soonNote: "próximamente" },
  { kind: "soon", label: "Cursos", soonNote: "próximamente" },
  { kind: "link", href: "#info", label: "Info" },
];
