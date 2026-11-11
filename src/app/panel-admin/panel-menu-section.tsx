"use client";

import { setSiteMenu } from "./actions";

export function PanelMenuSection({ applied }: { applied: boolean }) {
  return (
    <>
      <p className="panel-crumb">Panel / Menú</p>
      <h1 className="mt-3 font-display text-h2 leading-heading tracking-title">Menú</h1>
      <p className="mt-2 max-w-prose text-small text-fg-muted">
        Este será el Ejemplo 1.
      </p>
      <article className="mt-8 max-w-md rounded-md border border-border p-5">
        <h2 className="font-display text-h3 leading-heading">Opción 1</h2>
        <p className="mt-2 text-small text-fg-muted">
          El anillo amarillo que está en el sitio ahora.
          {applied ? " Aplicada." : " Quitada."}
        </p>
        <form action={setSiteMenu} className="mt-5 flex gap-3">
          <button
            type="submit"
            name="intent"
            value="apply"
            className="rounded-md bg-ink px-4 py-2 text-small text-canvas"
          >
            Aplicar
          </button>
          <button
            type="submit"
            name="intent"
            value="remove"
            className="rounded-md border border-border px-4 py-2 text-small"
          >
            Quitar
          </button>
        </form>
      </article>
    </>
  );
}
