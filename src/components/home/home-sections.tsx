import Link from "next/link";
import { HomeSobreMi } from "@/components/home/home-sobre-mi";
import { Section } from "@/components/section";
import { site, whatsappUrl } from "@/config/site";
import { Button } from "@/components/ui/button";

export { HomeSobreMi };

export function HomeRedes() {
  const redes = Object.entries(site.links).filter(([, href]) => href.length > 0);

  return (
    <Section
      id="redes"
      eyebrow="Comunidad"
      title="Redes"
      intro="Sígueme y escríbeme por tus canales favoritos."
    >
      <ul className="col-span-12 flex flex-col gap-3 md:col-span-6">
        {redes.map(([nombre, href]) => (
          <li key={nombre}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body capitalize text-fg underline-offset-4 transition-colors duration-150 ease-out hover:text-primary hover:underline"
            >
              {nombre}
            </a>
          </li>
        ))}
        <li>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-body text-fg underline-offset-4 transition-colors duration-150 ease-out hover:text-primary hover:underline"
          >
            WhatsApp
          </a>
        </li>
      </ul>
    </Section>
  );
}

export function HomeComisiones() {
  return (
    <Section
      id="comisiones"
      eyebrow="Encargos"
      title="Comisiones"
      intro="Ilustración personalizada, portadas y piezas para tu proyecto."
    >
      <div className="col-span-12 max-w-prose space-y-4 text-body text-fg-muted md:col-span-8">
        <p>
          Cuéntame tu idea por WhatsApp o email: formato, plazos y presupuesto
          según el alcance del encargo.
        </p>
        <Button asChild variant="outline">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            Consultar por WhatsApp
          </a>
        </Button>
      </div>
    </Section>
  );
}

export function HomeCursos() {
  return (
    <Section
      id="cursos"
      eyebrow="Formación"
      title="Cursos"
      intro="Talleres y contenido formativo en preparación."
    >
      <p className="col-span-12 max-w-prose text-body text-fg-muted md:col-span-8">
        Próximamente abriré inscripciones. Mientras tanto, escríbeme si quieres
        aviso cuando estén listos.
      </p>
    </Section>
  );
}

export function HomeInfo() {
  return (
    <Section
      id="info"
      eyebrow="Ayuda"
      title="Info"
      intro="Preguntas sobre compras, formatos y entregas."
    >
      <div className="col-span-12 max-w-prose space-y-4 text-body text-fg-muted md:col-span-8">
        <p>
          Las compras del libro completo y de cada tema se procesan en el
          enlace de pago que elijas (actualmente enlaces de ejemplo).
        </p>
        <p>
          Para consultas personalizadas, usa WhatsApp o el correo de contacto.
        </p>
        <Button asChild variant="outline">
          <Link href={`mailto:${site.email}`}>Escribir por email</Link>
        </Button>
      </div>
    </Section>
  );
}
