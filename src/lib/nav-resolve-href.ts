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
