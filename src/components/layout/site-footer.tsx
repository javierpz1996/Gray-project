import Link from "next/link";
import { site } from "@/config/site";

/**
 * DESIGN.md §6 — Footer.
 *   border-t hairline · py-12 · text-small · fg-muted
 *   Sin `new Date()`: el año vive en src/config/site.ts (cacheComponents
 *   prohíbe valores no deterministas en el shell).
 */
export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto flex w-full max-w-site flex-col gap-6 px-6 py-12 text-small text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-prose">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore.
        </p>

        <nav className="flex flex-wrap items-center gap-6">
          {Object.entries(site.links)
            .filter(([, href]) => href.length > 0)
            .map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="capitalize underline-offset-4 transition-colors duration-150 ease-out hover:text-fg hover:underline"
              >
                {label}
              </a>
            ))}
          <Link
            href="/documentos"
            className="underline-offset-4 transition-colors duration-150 ease-out hover:text-fg hover:underline"
          >
            Documentos
          </Link>
        </nav>
      </div>
    </footer>
  );
}
