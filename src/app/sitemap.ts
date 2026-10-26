import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { piezas } from "@/content/piezas";

/**
 * sitemap.xml
 * Sin `new Date()`: cacheComponents prohíbe valores no deterministas en el
 * shell (Next 16). El "última modificación" real lo aporta el contenido.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
      images: piezas.map((pieza) => `${site.url}${pieza.imagen}`),
    },
    {
      url: `${site.url}/documentos`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...piezas.map((pieza) => ({
      url: `${site.url}/portafolio/${pieza.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [`${site.url}${pieza.imagen}`],
    })),
  ];
}
