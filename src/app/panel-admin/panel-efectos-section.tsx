"use client";

import { useState } from "react";
import { Cover2Hero } from "@/components/home/design-2/cover-2-hero";
import { Cover2HeroGlitchPicker } from "@/components/home/design-2/cover-2-hero-glitch-picker";
import {
  COVER2_HERO_GLITCH_AMP_LIVE,
  COVER2_HERO_GLITCH_LIVE,
  COVER2_HERO_GLITCH_SHORT,
  type Cover2HeroGlitchAmp,
  type Cover2HeroGlitchId,
} from "@/lib/cover-2-hero-glitch";
import "@/components/home/design-2/design-2-stock.css";

export function PanelEfectosSection() {
  const [glitch, setGlitch] = useState<Cover2HeroGlitchId | 0>(COVER2_HERO_GLITCH_LIVE);
  const [amp, setAmp] = useState<Cover2HeroGlitchAmp>(COVER2_HERO_GLITCH_AMP_LIVE);

  return (
    <>
      <p className="panel-crumb">Panel / Efectos</p>
      <h1 className="mt-3 font-display text-h2 leading-heading tracking-title">Efectos</h1>
      <p className="mt-2 max-w-prose text-small text-fg-muted">
        Catálogo del glitch del hero. El sitio usa {COVER2_HERO_GLITCH_SHORT[COVER2_HERO_GLITCH_LIVE]} ·{" "}
        {COVER2_HERO_GLITCH_AMP_LIVE === "soft" ? "tranquila" : "fuerte"}. Acá se prueban las demás.
      </p>
      <div className="panel-cover2-preview panel-efectos-preview">
        <div className="design-2-stock design-2-stock--kb-rail">
          <Cover2Hero
            waitForIntro={false}
            slantRail
            slantKillBlue
            kbHeroSrc="/media/diseno2/heroimage-test.png"
            glitch={glitch}
            glitchAmp={amp}
          />
        </div>
      </div>
      <div className="panel-anims">
        <p className="panel-anims-title">Glitch del hero</p>
        <Cover2HeroGlitchPicker
          embedded
          value={glitch === 0 ? COVER2_HERO_GLITCH_LIVE : glitch}
          amp={amp}
          enabled={glitch !== 0}
          onChange={setGlitch}
          onAmp={(next) => {
            setAmp(next);
            if (glitch === 0) setGlitch(COVER2_HERO_GLITCH_LIVE);
          }}
          onOff={() => setGlitch(0)}
        />
      </div>
    </>
  );
}
