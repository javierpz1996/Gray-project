import { HomeIntro } from "@/components/home/home-intro";

/**
 * Landing — estructura genérica.
 * Añade bloques con `Section` (o rutas propias) cuando definas el contenido.
 */
export default function Page() {
  return (
    <>
      <HomeIntro />

      <div
        className="mx-auto w-full max-w-site px-6 py-16 md:py-24"
        aria-label="Contenido principal"
      >
        {/* Secciones futuras: portafolio, documentos, bio, contacto… */}
      </div>
    </>
  );
}
