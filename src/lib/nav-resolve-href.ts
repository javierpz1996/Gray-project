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
  if (pathname !== "/") {
    return href;
  }
  if (href === "/") {
    return homeDesignHref(diseno);
  }
  if (href.startsWith("/#")) {
    return homeDesignAnchor(diseno, href.slice(2));
  }
  return href;
}
