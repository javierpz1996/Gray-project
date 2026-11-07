import {
  homeDesignAnchor,
  homeDesignHref,
  type HomeDesignId,
} from "@/lib/home-design";

export function resolveNavHref(
  href: string,
  pathname: string,
  diseno: HomeDesignId,
): string {
  if (href.startsWith("#") || href.startsWith("/#")) {
    const hash = href.startsWith("#") ? href.slice(1) : href.slice(2);
    return homeDesignAnchor(diseno, hash);
  }

  if (pathname !== "/") {
    return href;
  }
  if (href === "/") {
    return homeDesignHref(diseno);
  }
  return href;
}

/** Enlaces del ítem «Inicio» (home + ancla #inicio). */
export function isInicioNavHref(href: string | null | undefined): boolean {
  if (!href) return false;
  if (href === "#inicio" || href === "/#inicio") return true;
  try {
    const url = new URL(
      href,
      typeof window !== "undefined" ? window.location.origin : "https://example.com",
    );
    return url.pathname === "/" && url.hash === "#inicio";
  } catch {
    return false;
  }
}
