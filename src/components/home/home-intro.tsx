/** Cabecera de la landing sin contenido de dominio (obra, documentos, etc.). */
export function HomeIntro() {
  return (
    <section className="bg-canvas">
      <div className="mx-auto w-full max-w-site px-6 py-20 md:py-28">
        <p className="eyebrow">Lorem ipsum</p>
        <h1 className="mt-4 max-w-[20ch] font-display text-display font-bold leading-display tracking-title text-fg">
          Comienzo
        </h1>
        <p className="mt-6 max-w-prose text-lead text-fg-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </section>
  );
}
