import type { Metadata } from "next";
import { Suspense } from "react";
import { heroPanelLabels } from "@/content/hero-panels";
import { defaultHeroCoverConfig, readHeroCoverConfig } from "@/lib/hero-config";
import { defaultLibrosBandsConfig, readLibrosBands } from "@/lib/libros-bands";
import { heroPanelRevision } from "@/lib/hero-panel-store";
import { isPanelAdmin } from "@/lib/panel-admin-session";
import { enterPanelAdmin } from "./actions";
import { PanelWorkspace } from "./panel-workspace";
import { PanelNotice } from "./panel-notice";
import "./panel-admin.css";

export const metadata: Metadata = {
  title: "Panel de configuraciones",
  robots: { index: false, follow: false },
};

const errors: Record<string, string> = {
  clave: "La contraseña no coincide.",
  config: "Falta ADMIN_PASSWORD en el entorno.",
  archivo: "Elige una imagen antes de guardar.",
  peso: "La imagen supera 8 MB.",
  formato: "Usa JPG, PNG o WebP.",
  supabase: "Supabase no guardó la imagen.",
  tabla:
    "Falta una tabla. Ejecuta de nuevo supabase/hero_panels.sql en el SQL Editor, incluye hero_config.",
};

function PanelFallback() {
  return (
    <main className="panel-admin grid min-h-dvh place-items-center bg-canvas px-6 text-fg-muted">
      Cargando el panel
    </main>
  );
}

async function PanelScreen({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const params = await searchParams;
  const signedIn = await isPanelAdmin();
  const revision = signedIn ? await heroPanelRevision() : 0;
  const cover = signedIn ? await readHeroCoverConfig() : null;
  const libros = signedIn ? await readLibrosBands() : null;
  const error = params.error ? errors[params.error] : undefined;
  const saved =
    params.ok === "portada" || (params.ok && params.ok in heroPanelLabels)
      ? params.ok
      : undefined;
  const notice = error ? (
    <PanelNotice tone="error" message={error} />
  ) : saved ? (
    <PanelNotice
      tone="ok"
      message={
        saved === "portada"
          ? "Portada guardada."
          : `Imagen ${heroPanelLabels[saved as keyof typeof heroPanelLabels].toLowerCase()} actualizada.`
      }
    />
  ) : null;

  if (!signedIn) {
    return (
      <main className="panel-admin grid min-h-dvh place-items-center bg-canvas p-4 text-fg md:p-6">
        <form action={enterPanelAdmin} className="w-full max-w-sm">
          <h1 className="font-display text-h2 leading-heading tracking-title">
            Panel de configuraciones
          </h1>
          <p className="mt-3 text-body text-fg-muted">
            Entra para cambiar las tres imágenes del hero.
          </p>
          <label className="mt-8 block text-small" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-body outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {notice}
          <button
            type="submit"
            className="mt-6 rounded-md bg-ink px-4 py-2 text-small text-canvas transition-colors duration-150 ease-out hover:bg-ink-deep focus-visible:ring-2 focus-visible:ring-ring"
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="panel-admin min-h-dvh bg-canvas p-4 text-fg md:p-6">
      {notice}
      <PanelWorkspace
        revision={String(revision)}
        initial={cover ?? defaultHeroCoverConfig()}
        libros={libros ?? defaultLibrosBandsConfig()}
      />
    </main>
  );
}

export default function PanelAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  return (
    <Suspense fallback={<PanelFallback />}>
      <PanelScreen searchParams={searchParams} />
    </Suspense>
  );
}
