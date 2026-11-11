import Link from "next/link";
import { MenuButtonOptions } from "@/components/layout/menu-button-options";

export const metadata = {
  title: "Opciones del botón MENU",
  robots: { index: false, follow: false },
};

export default function MenuOpcionesPage() {
  return (
    <div className="section-paper py-12 md:py-20">
      <div className="mx-auto w-full max-w-site px-6">
        <h1 className="font-display text-h1 font-bold leading-heading tracking-title text-fg">
          Opciones del botón MENU
        </h1>
        <p className="mt-4 max-w-prose text-body text-fg-muted">
          Seis formas de tratar la palabra MENU en el círculo amarillo. La 6 se
          activa con un clic.
        </p>
        <MenuButtonOptions />
        <Link
          href="/"
          className="mt-10 inline-block text-small font-semibold text-fg underline-offset-4 hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
