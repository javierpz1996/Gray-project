import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { sobreMiSection } from "@/content/sobre-mi";

const roleColorClass = [
  "text-coral",
  "text-ds-sky",
  "text-fg",
] as const;

export function HomeSobreMi() {
  return (
    <section
      id="sobre-mi"
      className="scroll-mt-[var(--site-header-height)] bg-surface py-16 md:py-24"
      aria-labelledby="sobre-mi-title"
    >
      <div className="relative mx-auto w-full max-w-site px-6">
        <Reveal>
          <p className="eyebrow">{sobreMiSection.eyebrow}</p>

          <div
            className="mt-8 grid gap-10 lg:mt-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-12 xl:gap-16"
          >
            <div className="min-w-0">
              <h2
                id="sobre-mi-title"
                className="font-display text-h1 font-bold leading-heading tracking-title text-fg"
              >
                {sobreMiSection.titleLead}{" "}
                <span className="text-coral">{sobreMiSection.titleAccent}</span>
              </h2>

              <div className="mt-8 max-w-prose space-y-6 text-body leading-relaxed text-fg-muted">
                {sobreMiSection.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="relative w-full lg:-mt-14 lg:justify-self-end xl:-mt-16">
              <div className="relative mx-auto w-full max-w-[min(100%,32rem)] lg:mx-0 lg:max-w-[38rem]">
                <div className="sobre-mi-figure relative aspect-square w-full">
                  <span className="sobre-mi-figure__corner" aria-hidden />
                  <span className="sobre-mi-figure__rule" aria-hidden />
                  <span className="sobre-mi-figure__tick" aria-hidden />
                  <Image
                    src={sobreMiSection.imageSrc}
                    alt={sobreMiSection.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 92vw, 38rem"
                    className="relative z-[1] object-contain object-top"
                  />
                </div>

                <ul
                  className="absolute top-4 -right-2 z-[1] hidden flex-col gap-4 font-sans text-nano font-extrabold uppercase tracking-[0.2em] text-fg xl:-right-4 lg:flex"
                  aria-label="Roles"
                >
                  {sobreMiSection.roles.map((role, index) => (
                    <li
                      key={role}
                      className={roleColorClass[index % roleColorClass.length]}
                    >
                      {role}
                    </li>
                  ))}
                </ul>
              </div>

              <ul
                className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-sans text-nano font-extrabold uppercase tracking-[0.18em] lg:hidden"
                aria-label="Roles"
              >
                {sobreMiSection.roles.map((role, index) => (
                  <li
                    key={role}
                    className={roleColorClass[index % roleColorClass.length]}
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
