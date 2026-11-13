"use client";

import { useEffect, useRef, useState } from "react";
import { Design2XSeparator } from "@/components/home/design-2/design-2-x-separator";
import { site } from "@/config/site";
import { COVER2_KILL_BLUE_MENU } from "@/content/cover-2-kill-blue-menu";
import "./cover-2-kill-blue-strip.css";

const SNS = [
  { href: "https://x.com/KILLBLUE_PR", label: "X", icon: "fa-brands fa-x-twitter" },
  { href: site.links.instagram, label: "Instagram", icon: "fa-brands fa-instagram" },
  { href: "https://www.tiktok.com/@killblue_official", label: "TikTok", icon: "fa-brands fa-tiktok" },
] as const;

function useKillBlueFonts() {
  useEffect(() => {
    const add = (id: string, src: string) => {
      if (document.getElementById(id)) return;
      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    };
    add("kb-typekit-hero", "https://use.typekit.net/rke0ypg.js");
    add("kb-fontawesome-hero", "https://kit.fontawesome.com/672520b56f.js");
    try {
      const w = window as Window & { Typekit?: { load: (o?: object) => void } };
      if (w.Typekit) w.Typekit.load();
    } catch {
      /* fuentes opcionales */
    }
  }, []);
}

export function Cover2KillBlueStrip() {
  const [appr, setAppr] = useState(false);
  const stripRef = useRef<HTMLElement>(null);
  const fondoRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  useKillBlueFonts();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAppr(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    const img = fondoRef.current;
    if (!strip || !img) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sizeFondo = () => {
      const viewW = strip.clientWidth;
      const viewH = strip.clientHeight;
      if (viewW > 0 && viewH > 0 && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const scaledH = (img.naturalHeight * viewW) / img.naturalWidth;
        img.style.minHeight = `${Math.max(viewH, scaledH)}px`;
      } else if (viewH > 0) {
        img.style.minHeight = `${viewH}px`;
      }
    };

    const applyParallax = () => {
      if (!img.isConnected) return;
      sizeFondo();
      if (reduceMotion) {
        img.style.transform = "none";
        return;
      }
      const viewH = strip.clientHeight;
      const maxShift = Math.max(0, img.offsetHeight - viewH);
      const zoneEl = strip.closest(".cover-2-kb-rail-zone");
      const scrollInZone = zoneEl
        ? Math.max(0, window.scrollY - (zoneEl as HTMLElement).offsetTop)
        : window.scrollY;
      const y = Math.min(scrollInZone, maxShift);
      img.style.transform = `translate3d(0, ${-y}px, 0)`;
    };

    applyParallax();
    img.addEventListener("load", applyParallax);

    const zone = strip.closest(".cover-2-kb-rail-zone");
    const ro = new ResizeObserver(() => applyParallax());
    if (zone) ro.observe(zone);
    ro.observe(strip);

    window.addEventListener("scroll", applyParallax, { passive: true });
    window.addEventListener("resize", applyParallax);
    return () => {
      img.removeEventListener("load", applyParallax);
      window.removeEventListener("scroll", applyParallax);
      window.removeEventListener("resize", applyParallax);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    const wrap = wrapRef.current;
    const zone = strip?.closest(".cover-2-kb-rail-zone");
    if (!strip || !wrap || !zone || !strip.closest(".design-2-stock--kb-rail")) return;

    const zoneEl = zone as HTMLElement;
    let raf = 0;

    const tearReservePx = () => {
      const tear = zoneEl.querySelector<HTMLElement>(".cover-2-kb-tear");
      return tear ? Math.round(tear.getBoundingClientRect().height) : 64;
    };

    const resetWrap = () => {
      wrap.style.position = "";
      wrap.style.top = "";
      wrap.style.left = "";
      wrap.style.width = "";
      wrap.style.bottom = "";
      delete wrap.dataset.kbStick;
    };

    const syncMenuStick = () => {
      const zoneRect = zoneEl.getBoundingClientRect();
      const stripW = strip.offsetWidth;
      const wrapH = wrap.offsetHeight;
      const tearH = tearReservePx();
      const viewportStick = Math.max(wrapH + tearH, window.innerHeight * 0.01);
      const railEndInView = zoneRect.bottom <= window.innerHeight;

      if (zoneRect.top > 0) {
        wrap.style.position = "absolute";
        wrap.style.top = "0";
        wrap.style.left = "0";
        wrap.style.width = "100%";
        wrap.style.bottom = "";
        wrap.dataset.kbStick = "top";
        return;
      }

      if (railEndInView || zoneRect.bottom <= viewportStick) {
        wrap.style.position = "absolute";
        wrap.style.top = "auto";
        wrap.style.bottom = `${tearH}px`;
        wrap.style.left = "0";
        wrap.style.width = "100%";
        wrap.dataset.kbStick = "bottom";
        return;
      }

      wrap.style.position = "fixed";
      wrap.style.top = "0";
      wrap.style.left = `${zoneRect.left}px`;
      wrap.style.width = `${stripW}px`;
      wrap.style.bottom = "";
      wrap.dataset.kbStick = "fixed";
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncMenuStick);
    };

    syncMenuStick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(zoneEl);
    ro.observe(wrap);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
      resetWrap();
    };
  }, []);

  return (
    <section
      ref={stripRef}
      className={`cover-2-kb-strip top-CNT${appr ? " appr" : ""}`}
      aria-label="Secciones"
    >
      <div className="cover-2-kb-bg-line" aria-hidden />
      <div className="cover-2-kb-strip__base" aria-hidden />
      <div className="cover-2-kb-strip__decor" aria-hidden>
        <img
          ref={fondoRef}
          src="/media/diseno2/kill-blue-menu-fondo.png"
          alt=""
          className="cover-2-kb-strip__fondo-img"
          decoding="async"
          fetchPriority="low"
        />
      </div>
      <div ref={wrapRef} className="top-CNT-wrap">
        <div className="dc-line_sp" aria-hidden />

        <div className="tp-lang">
          <div>
            <span>
              <p>JAPANESE</p>
            </span>
          </div>
          <div>
            <a href="https://kill-blue.us/" target="_blank" rel="noopener noreferrer">
              <span>
                <p>ENGLISH</p>
              </span>
            </a>
          </div>
        </div>

        <p className="cover-2-kb-strip__grayby">GRAYBY</p>

        <div className="cover-2-kb-strip__x-gap">
          <Design2XSeparator count={24} />
        </div>

        <nav className="tp-menu" aria-label="Contenidos">
          {COVER2_KILL_BLUE_MENU.map((item) => (
            <div key={item.label}>
              <a href={item.href}>
                <span>
                  <p>{item.label}</p>
                </span>
              </a>
            </div>
          ))}
        </nav>

        <div className="tp-sns">
          <p>OFFICIAL SNS</p>
          <section>
            {SNS.map((item) => (
              <div key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
                  <span>
                    <i className={item.icon} aria-hidden />
                  </span>
                </a>
              </div>
            ))}
          </section>
        </div>
      </div>
    </section>
  );
}
