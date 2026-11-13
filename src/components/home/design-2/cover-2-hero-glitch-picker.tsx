"use client";

import {
  COVER2_HERO_GLITCH_IDS,
  COVER2_HERO_GLITCH_SHORT,
  type Cover2HeroGlitchAmp,
  type Cover2HeroGlitchId,
} from "@/lib/cover-2-hero-glitch";
import "./cover-2-hero-glitch-picker.css";

const CLASSICS = COVER2_HERO_GLITCH_IDS.slice(0, 5);
const EXTRAS = COVER2_HERO_GLITCH_IDS.slice(5, 10);
const GHOSTS_A = COVER2_HERO_GLITCH_IDS.slice(10, 15);
const GHOSTS_B = COVER2_HERO_GLITCH_IDS.slice(15);

export function Cover2HeroGlitchPicker({
  value,
  amp,
  onChange,
  onAmp,
  onOff,
  enabled,
  embedded = false,
}: {
  value: Cover2HeroGlitchId;
  amp: Cover2HeroGlitchAmp;
  onChange: (id: Cover2HeroGlitchId) => void;
  onAmp: (amp: Cover2HeroGlitchAmp) => void;
  onOff: () => void;
  enabled: boolean;
  embedded?: boolean;
}) {
  const label = enabled
    ? `activa: ${value} · ${COVER2_HERO_GLITCH_SHORT[value]} · ${amp === "soft" ? "tranquila" : "fuerte"}`
    : "apagado";

  return (
    <div
      className={embedded ? "cover-2-glitch-lab cover-2-glitch-lab--panel" : "cover-2-glitch-lab"}
      role="region"
      aria-label="Elegir glitch del hero"
    >
      <p className="cover-2-glitch-lab__title">Glitch del hero — {label}</p>
      <div className="cover-2-glitch-lab__amp" role="group" aria-label="Intensidad">
        <button
          type="button"
          className="cover-2-glitch-lab__option cover-2-glitch-lab__option--amp"
          data-active={enabled && amp === "hard" ? "true" : "false"}
          aria-pressed={enabled && amp === "hard"}
          onClick={() => onAmp("hard")}
        >
          Fuerte
        </button>
        <button
          type="button"
          className="cover-2-glitch-lab__option cover-2-glitch-lab__option--amp"
          data-active={enabled && amp === "soft" ? "true" : "false"}
          aria-pressed={enabled && amp === "soft"}
          onClick={() => onAmp("soft")}
        >
          Tranquila
        </button>
        <button
          type="button"
          className="cover-2-glitch-lab__option cover-2-glitch-lab__option--off"
          data-active={enabled ? "false" : "true"}
          aria-pressed={!enabled}
          onClick={onOff}
        >
          Off
        </button>
      </div>
      <div className="cover-2-glitch-lab__row" role="listbox" aria-label="Clásicos">
        {CLASSICS.map((id) => (
          <GlitchOption key={id} id={id} active={enabled && value === id} onChange={onChange} />
        ))}
      </div>
      <div className="cover-2-glitch-lab__row" role="listbox" aria-label="Cyber">
        {EXTRAS.map((id) => (
          <GlitchOption key={id} id={id} active={enabled && value === id} onChange={onChange} />
        ))}
      </div>
      <div className="cover-2-glitch-lab__row" role="listbox" aria-label="Ghost a ráfagas">
        {GHOSTS_A.map((id) => (
          <GlitchOption key={id} id={id} active={enabled && value === id} onChange={onChange} />
        ))}
      </div>
      <div className="cover-2-glitch-lab__row" role="listbox" aria-label="Más Ghost a ráfagas">
        {GHOSTS_B.map((id) => (
          <GlitchOption key={id} id={id} active={enabled && value === id} onChange={onChange} />
        ))}
      </div>
    </div>
  );
}

function GlitchOption({
  id,
  active,
  onChange,
}: {
  id: Cover2HeroGlitchId;
  active: boolean;
  onChange: (id: Cover2HeroGlitchId) => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      className="cover-2-glitch-lab__option"
      data-active={active ? "true" : "false"}
      onClick={() => onChange(id)}
    >
      <span className="cover-2-glitch-lab__num">{id}</span>
      <span className="cover-2-glitch-lab__short">{COVER2_HERO_GLITCH_SHORT[id]}</span>
    </button>
  );
}
