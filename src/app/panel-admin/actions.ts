"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isHeroPanelSlot } from "@/content/hero-panels";
import { heroPanelExtension, saveHeroPanelFile } from "@/lib/hero-panel-store";
import {
  bannerPatterns,
  bannerFrames,
  bannerHovers,
  bannerMotions,
  bannerShadows,
  bannerGaps,
  bannerSpeeds,
  bannerTileSizes,
  bannerShades,
  parseBannerLinks,
  parseBannerPositions,
  parseBannerRgb,
  saveHeroCoverConfig,
  type BannerMotion,
  type BannerFrame,
  type BannerHover,
  type BannerGap,
  type BannerSpeed,
  type BannerTileSize,
  type BannerPattern,
  type BannerShade,
  type BannerShadow,
} from "@/lib/hero-config";
import { heroBannerExtension, saveHeroBannerFile } from "@/lib/hero-banner-store";
import {
  bandaSizes,
  bandaSpeeds,
  bandaBrights,
  bandaOpacities,
  bandaTilts,
  bandaTops,
  clipLibrosText,
  librosLeadDefault,
  librosStoryDefaults,
  parseLibrosHeading,
  saveLibrosBands,
  type BandaBright,
  type BandaOpacity,
  type BandaSize,
  type BandaSpeed,
  type BandaTilt,
  type BandaTop,
} from "@/lib/libros-bands";
import { parseHomeDesign1HeroAnimation } from "@/lib/home-design-1-hero-animation";
import { parseCover2LogoMark } from "@/lib/cover-2-logo";
import { parseCover2Menu, parseCover2SlideEvery, parseCover2SlideMotion } from "@/lib/cover-2-menu";
import { parseHomeDesign1LogoAnimation } from "@/lib/home-design-1-logo-animation";
import {
  closePanelAdminSession,
  isPanelAdmin,
  openPanelAdminSession,
  passwordMatches,
} from "@/lib/panel-admin-session";

const MAX_BYTES = 8 * 1024 * 1024;

export async function enterPanelAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!process.env.ADMIN_PASSWORD) {
    redirect("/panel-admin?error=config");
  }
  if (!passwordMatches(password)) {
    redirect("/panel-admin?error=clave");
  }
  await openPanelAdminSession();
  redirect("/panel-admin");
}

export async function leavePanelAdmin() {
  await closePanelAdminSession();
  redirect("/panel-admin");
}

const dividerWidths = new Set([4, 10, 18]);

export async function saveCover(formData: FormData): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!(await isPanelAdmin())) {
    redirect("/panel-admin");
  }

  const dividerWidth = Number(formData.get("divider"));
  try {
    for (const slot of ["left", "center", "right"] as const) {
      const file = formData.get(slot);
      if (!(file instanceof File) || file.size === 0) continue;
      if (file.size > MAX_BYTES) return { ok: false, message: "La imagen supera 8 MB." };
      const extension = heroPanelExtension(file.type);
      if (!extension) return { ok: false, message: "Usa JPG, PNG o WebP." };
      const bytes = Buffer.from(await file.arrayBuffer());
      await saveHeroPanelFile(slot, bytes, extension);
    }

    for (const slot of ["1", "2", "3", "bg", "tile"] as const) {
      const file = formData.get(`banner-${slot}`);
      if (!(file instanceof File) || file.size === 0) continue;
      if (file.size > MAX_BYTES) return { ok: false, message: "La imagen supera 8 MB." };
      const extension = heroBannerExtension(file.type);
      if (!extension) return { ok: false, message: "Usa JPG, PNG o WebP." };
      await saveHeroBannerFile(slot, Buffer.from(await file.arrayBuffer()), extension);
    }

    const pattern = String(formData.get("bannerPattern") ?? "");
    const color = parseBannerRgb(String(formData.get("bannerColor") ?? ""));
    const base = parseBannerRgb(String(formData.get("bannerBase") ?? ""));
    const shade = Number(formData.get("bannerShade"));
    const tile = Number(formData.get("bannerTile"));
    const gap = Number(formData.get("bannerGap"));
    const speed = Number(formData.get("bannerSpeed"));
    const frame = String(formData.get("bannerFrame") ?? "");
    const shadow = String(formData.get("bannerShadow") ?? "");
    const frameColor = parseBannerRgb(String(formData.get("bannerFrameColor") ?? ""));
    const logo = formData.get("logo");
    if (logo instanceof File && logo.size > 0) {
      if (logo.size > MAX_BYTES) return { ok: false, message: "La imagen supera 8 MB." };
      const extension = heroBannerExtension(logo.type);
      if (!extension || extension === "mp4" || extension === "webm") {
        return { ok: false, message: "Usa JPG, PNG o WebP." };
      }
      await saveHeroBannerFile("logo", Buffer.from(await logo.arrayBuffer()), extension);
    }
    const portada2 = formData.get("portada2");
    if (portada2 instanceof File && portada2.size > 0) {
      if (portada2.size > MAX_BYTES) return { ok: false, message: "La imagen supera 8 MB." };
      const extension = heroBannerExtension(portada2.type);
      if (!extension || extension === "mp4" || extension === "webm") {
        return { ok: false, message: "Usa JPG, PNG o WebP." };
      }
      await saveHeroBannerFile("portada2", Buffer.from(await portada2.arrayBuffer()), extension);
    }
    for (const slot of ["portada22", "portada23", "portada24", "portada25", "portada26"] as const) {
      const extra = formData.get(slot);
      if (!(extra instanceof File) || extra.size === 0) continue;
      if (extra.size > MAX_BYTES) return { ok: false, message: "La imagen supera 8 MB." };
      const extension = heroBannerExtension(extra.type);
      if (!extension || extension === "mp4" || extension === "webm") {
        return { ok: false, message: "Usa JPG, PNG o WebP." };
      }
      await saveHeroBannerFile(slot, Buffer.from(await extra.arrayBuffer()), extension);
    }
    const logotop = formData.get("logotop");
    if (logotop instanceof File && logotop.size > 0) {
      if (logotop.size > MAX_BYTES) return { ok: false, message: "La imagen supera 8 MB." };
      const extension = heroBannerExtension(logotop.type);
      if (!extension || extension === "mp4" || extension === "webm") {
        return { ok: false, message: "Usa JPG, PNG o WebP." };
      }
      await saveHeroBannerFile("logotop", Buffer.from(await logotop.arrayBuffer()), extension);
    }

    const hover = String(formData.get("bannerHover") ?? "");
    const positions = parseBannerPositions(String(formData.get("bannerPositions") ?? ""));
    const links = parseBannerLinks(String(formData.get("bannerLinks") ?? ""));
    await saveHeroCoverConfig({
      heroAnimation: parseHomeDesign1HeroAnimation(String(formData.get("hero") ?? "")),
      logoAnimation: parseHomeDesign1LogoAnimation(String(formData.get("logoAnimation") ?? "3")),
      cover2Logo: parseCover2LogoMark(String(formData.get("cover2Logo") ?? "")),
      cover2Stack: formData.get("cover2Stack") === "1",
      cover2Menu: parseCover2Menu(String(formData.get("cover2Menu") ?? "")),
      cover2Slides: Math.min(6, Math.max(1, Number(formData.get("cover2Slides")) || 1)),
      cover2SlideMotion: parseCover2SlideMotion(String(formData.get("cover2SlideMotion") ?? "")),
      cover2SlideEvery: parseCover2SlideEvery(formData.get("cover2SlideEvery")),
      coverOption: formData.get("coverOption") === "2" ? 2 : 1,
      dividerWidth: dividerWidths.has(dividerWidth) ? dividerWidth : 10,
      particles: formData.get("particles") === "1",
      veil: formData.get("veil") === "1",
      halftone: formData.get("halftone") === "1",
      bannerMode: formData.get("bannerMode") === "image" ? "image" : "pattern",
      bannerPattern: bannerPatterns.includes(pattern as BannerPattern)
        ? (pattern as BannerPattern)
        : "dots",
      bannerColor: color ?? "255,255,255",
      bannerBase: base ?? "110,110,115",
      bannerShade: bannerShades.includes(shade as BannerShade) ? (shade as BannerShade) : 0,
      bannerPositions: positions ?? ["center", "center", "center"],
      bannerLinks: links,
      bannerMotion: bannerMotions.includes(String(formData.get("bannerMotion")) as BannerMotion)
        ? (String(formData.get("bannerMotion")) as BannerMotion)
        : "off",
      bannerTile: bannerTileSizes.includes(tile as BannerTileSize) ? (tile as BannerTileSize) : 48,
      bannerGap: bannerGaps.includes(gap as BannerGap) ? (gap as BannerGap) : 0,
      bannerSpeed: bannerSpeeds.includes(speed as BannerSpeed) ? (speed as BannerSpeed) : 16,
      bannerFrame: bannerFrames.includes(frame as BannerFrame) ? (frame as BannerFrame) : "classic",
      bannerShadow: bannerShadows.includes(shadow as BannerShadow) ? (shadow as BannerShadow) : "hard",
      bannerFrameColor: frameColor ?? "255,255,255",
      bannerHover: bannerHovers.includes(hover as BannerHover) ? (hover as BannerHover) : "shake",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (/hero_config|hero_panels|hero_banners|schema cache|PGRST/i.test(message)) {
      return {
        ok: false,
        message: "Falta una tabla. Ejecuta de nuevo supabase/hero_panels.sql en el SQL Editor.",
      };
    }
    return { ok: false, message: "No se pudo guardar. Intenta de nuevo." };
  }

  revalidatePath("/");
  revalidatePath("/panel-admin");
  return { ok: true };
}

export async function saveLibros(formData: FormData): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!(await isPanelAdmin())) {
    redirect("/panel-admin");
  }

  try {
    for (const slot of ["banda1", "banda2", "tema1", "tema2", "tema3", "tema4", "tema5", "profesor", "librosbg", "librostile"] as const) {
      const file = formData.get(slot);
      if (!(file instanceof File) || file.size === 0) continue;
      if (file.size > MAX_BYTES) return { ok: false, message: "El archivo supera 8 MB." };
      const named = file.name.toLowerCase();
      const extension =
        heroBannerExtension(file.type) ??
        (named.endsWith(".mp4") || named.endsWith(".mov") ? "mp4" : named.endsWith(".webm") ? "webm" : null);
      const video = extension === "mp4" || extension === "webm";
      if (!extension || (video && slot !== "profesor")) {
        return { ok: false, message: slot === "profesor" ? "Usa JPG, PNG, WebP, MP4 o WebM." : "Usa JPG, PNG o WebP." };
      }
      await saveHeroBannerFile(slot, Buffer.from(await file.arrayBuffer()), extension);
    }

    const speed1 = Number(formData.get("speed1"));
    const speed2 = Number(formData.get("speed2"));
    const size1 = Number(formData.get("size1"));
    const size2 = Number(formData.get("size2"));
    const top1 = Number(formData.get("top1"));
    const top2 = Number(formData.get("top2"));
    const tilt1 = Number(formData.get("tilt1"));
    const tilt2 = Number(formData.get("tilt2"));
    const opacity1 = Number(formData.get("opacity1"));
    const opacity2 = Number(formData.get("opacity2"));
    const bright1 = Number(formData.get("bright1"));
    const bright2 = Number(formData.get("bright2"));
    await saveLibrosBands({
      speed1: bandaSpeeds.includes(speed1 as BandaSpeed) ? (speed1 as BandaSpeed) : 16,
      speed2: bandaSpeeds.includes(speed2 as BandaSpeed) ? (speed2 as BandaSpeed) : 16,
      size1: bandaSizes.includes(size1 as BandaSize) ? (size1 as BandaSize) : 100,
      size2: bandaSizes.includes(size2 as BandaSize) ? (size2 as BandaSize) : 100,
      top1: bandaTops.includes(top1 as BandaTop) ? (top1 as BandaTop) : 4.5,
      top2: bandaTops.includes(top2 as BandaTop) ? (top2 as BandaTop) : 11,
      tilt1: bandaTilts.includes(tilt1 as BandaTilt) ? (tilt1 as BandaTilt) : -28,
      tilt2: bandaTilts.includes(tilt2 as BandaTilt) ? (tilt2 as BandaTilt) : -28,
      opacity1: bandaOpacities.includes(opacity1 as BandaOpacity) ? (opacity1 as BandaOpacity) : 92,
      opacity2: bandaOpacities.includes(opacity2 as BandaOpacity) ? (opacity2 as BandaOpacity) : 92,
      bright1: bandaBrights.includes(bright1 as BandaBright) ? (bright1 as BandaBright) : 100,
      bright2: bandaBrights.includes(bright2 as BandaBright) ? (bright2 as BandaBright) : 100,
      heading: parseLibrosHeading(formData.get("heading")),
      lead: clipLibrosText(formData.get("lead"), 160, librosLeadDefault),
      stories: librosStoryDefaults.map((item, index) => ({
        title: clipLibrosText(formData.get(`title${index}`), 80, item.title),
        text: clipLibrosText(formData.get(`text${index}`), 420, item.text),
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (/hero_config|hero_banners|schema cache|PGRST/i.test(message)) {
      return {
        ok: false,
        message: "Falta una columna. Ejecuta de nuevo supabase/hero_panels.sql en el SQL Editor.",
      };
    }
    return { ok: false, message: "No se pudo guardar. Intenta de nuevo." };
  }

  revalidatePath("/");
  revalidatePath("/panel-admin");
  return { ok: true };
}

export async function updateHeroPanels(formData: FormData) {
  if (!(await isPanelAdmin())) {
    redirect("/panel-admin");
  }

  const slot = String(formData.get("slot") ?? "");
  const file = formData.get("image");
  if (!isHeroPanelSlot(slot) || !(file instanceof File) || file.size === 0) {
    redirect("/panel-admin?error=archivo");
  }
  if (file.size > MAX_BYTES) {
    redirect("/panel-admin?error=peso");
  }

  const extension = heroPanelExtension(file.type);
  if (!extension) {
    redirect("/panel-admin?error=formato");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  try {
    await saveHeroPanelFile(slot, bytes, extension);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (/hero_panels|schema cache|PGRST/i.test(message)) {
      redirect("/panel-admin?error=tabla");
    }
    redirect("/panel-admin?error=supabase");
  }
  revalidatePath("/");
  revalidatePath("/panel-admin");
  redirect(`/panel-admin?ok=${slot}`);
}
