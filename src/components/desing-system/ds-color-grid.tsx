"use client";

import { useCallback, useState } from "react";

type Swatch = {
  name: string;
  token: string;
  hex: string;
  role: string;
};

export function DsColorGrid({ colors }: { colors: readonly Swatch[] }) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyHex = useCallback(async (hex: string, token: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedToken(token);
      window.setTimeout(() => setCopiedToken(null), 1600);
    } catch {
      /* clipboard no disponible */
    }
  }, []);

  return (
    <ul className="ds-color-grid">
      {colors.map((c) => {
        const copied = copiedToken === c.token;
        return (
          <li key={c.token}>
            <button
              type="button"
              className="ds-swatch ds-swatch-interactive"
              onClick={() => copyHex(c.hex, c.token)}
              aria-label={`Copiar ${c.hex} de ${c.name}`}
            >
              <div
                className="ds-swatch-color"
                style={{ backgroundColor: `var(${c.token})` }}
              />
              <div className="ds-swatch-meta">
                <div className="ds-swatch-meta-header">
                  <p className="font-semibold text-[var(--ds-ink)]">{c.name}</p>
                  <span className="ds-swatch-hint" aria-live="polite">
                    {copied ? "Copiado" : "Copiar"}
                  </span>
                </div>
                <div className="ds-swatch-meta-detail">
                  <p className="ds-muted font-mono text-[0.8125rem]">{c.hex}</p>
                  <p className="ds-muted text-[0.8125rem]">{c.role}</p>
                </div>
                <code className="ds-token">{c.token}</code>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function DsPaintStrip({ tokens }: { tokens: readonly string[] }) {
  return (
    <div className="ds-paint-strip" aria-hidden="true">
      {tokens.map((token) => (
        <span
          key={token}
          className="ds-paint-strip-segment"
          style={{ backgroundColor: `var(${token})` }}
        />
      ))}
    </div>
  );
}
