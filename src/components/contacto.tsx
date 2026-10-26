import { site } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const redes = Object.entries(site.links).filter(([, href]) => href.length > 0);

/**
 * Contacto — decisión Q23 (Ronda 3): `mailto:` + redes, SIN formulario.
 * No hay backend, ni endpoint, ni servicio de email.
 */
export function Contacto() {
  return (
    <>
      <Reveal className="col-span-12 md:col-span-7">
        <a
          href={`mailto:${site.email}`}
          className="block font-display text-h2 font-bold leading-heading tracking-title text-fg underline-offset-8 transition-colors duration-150 ease-out hover:text-primary hover:underline"
        >
          {site.email}
        </a>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href={`mailto:${site.email}`}>Escribir un email</a>
          </Button>
        </div>
      </Reveal>

      <Reveal className="col-span-12 md:col-span-5">
        <p className="eyebrow">Redes</p>

        <ul className="mt-4 space-y-3">
          {redes.map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body capitalize text-fg-muted underline-offset-4 transition-colors duration-150 ease-out hover:text-fg hover:underline"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-small text-fg-subtle">
          Disponible para exposiciones, encargos y colaboraciones.
        </p>
      </Reveal>
    </>
  );
}
