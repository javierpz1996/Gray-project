import type { BannerColor, BannerFocus, BannerFrame, BannerHover, BannerMotion, BannerPattern, BannerShadow } from "@/lib/hero-config";
import { HomeSnsKbBannerStack } from "@/components/home/sns/home-sns-kb-banner-stack";
import "./home-sns.css";

const DEFAULT_BANNER = "/media/redes/banner.jpg";

const patternColors: Record<BannerColor, string> = {
  surface: "var(--ds-surface)",
  ink: "var(--ds-ink)",
  blue: "var(--ds-blue)",
  coral: "var(--ds-coral)",
  yellow: "var(--ds-yellow)",
};

export type HomeSnsBannerProps = {
  banners?: readonly string[];
  mode?: "pattern" | "image";
  pattern?: BannerPattern;
  color?: BannerColor | string;
  base?: string;
  shade?: number;
  background?: string | null;
  positions?: readonly BannerFocus[];
  links?: readonly string[];
  motion?: BannerMotion;
  tile?: string | null;
  tileSize?: number;
  tileGap?: number;
  speed?: number;
  frame?: BannerFrame;
  shadow?: BannerShadow;
  frameColor?: string;
  hover?: BannerHover;
  /** Etiqueta opcional arriba del bloque de banners (p. ej. Diseño 2 kill-blue). */
  kicker?: string;
  /** Cabecera kill-blue: kicker + flechas y carrusel por pares. */
  kbBannerNav?: boolean;
};

export function HomeSnsSection({
  banners = [DEFAULT_BANNER, DEFAULT_BANNER, DEFAULT_BANNER],
  mode = "pattern",
  pattern = "dots",
  color = "surface",
  base,
  shade = 0,
  background = null,
  positions = ["center", "center", "center"],
  links = ["", "", ""],
  motion = "off",
  tile = null,
  tileSize = 48,
  tileGap = 0,
  speed = 16,
  frame = "classic",
  shadow = "hard",
  frameColor = "255,255,255",
  hover = "shake",
  kicker,
  kbBannerNav = false,
}: HomeSnsBannerProps) {
  const usePhoto = mode === "image" && Boolean(background);

  return (
    <section
      className="home-sns"
      data-mode={usePhoto ? "image" : "pattern"}
      data-motion={motion}
      data-pattern={pattern}
      data-frame={frame}
      data-shadow={shadow}
      data-hover={hover}
      style={{
        ["--banner-dot" as string]:
          color in patternColors ? patternColors[color as BannerColor] : `rgb(${color})`,
        ["--banner-base" as string]: base ? `rgb(${base})` : "var(--ds-muted)",
        ["--banner-photo" as string]: usePhoto ? `url("${background}")` : "none",
        ["--banner-tile" as string]: tile ? `url("${tile}")` : "none",
        ["--banner-tile-size" as string]: `${tileSize}px`,
        ["--banner-tile-gap" as string]: `${tileGap}px`,
        ["--banner-speed" as string]: `${speed}s`,
        ["--banner-frame" as string]: `rgb(${frameColor})`,
      }}
      aria-label="Redes"
    >
      {pattern === "custom" && tile ? (
        <div className="home-sns__tiles" aria-hidden="true">
          {tileGap > 0
            ? Array.from(
                {
                  length:
                    (Math.ceil(3600 / (tileSize + tileGap)) + 1) *
                    (Math.ceil(720 / (tileSize + tileGap)) + 1),
                },
                (_, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={index} src={tile} alt="" />
                ),
              )
            : null}
        </div>
      ) : null}
      {usePhoto ? (
        <div className="home-sns__shade" style={{ opacity: shade / 100 }} aria-hidden="true" />
      ) : null}
      {kicker && kbBannerNav ? (
        <HomeSnsKbBannerStack
          banners={banners}
          links={links}
          positions={positions}
          kicker={kicker}
        />
      ) : (
        <>
          {kicker ? (
            <p className="home-sns__kicker">
              <span className="home-sns__kicker-ghost" aria-hidden>
                {kicker}
              </span>
              <span className="home-sns__kicker-label">{kicker}</span>
            </p>
          ) : null}
          <div className="home-sns__banners">
            {banners.map((src, index) => {
              const image = (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={index === 0 ? "Grayby art" : ""}
                  className="home-sns__banner"
                  style={{
                    objectPosition:
                      (positions[index] ?? "center") === "center"
                        ? "center"
                        : `center ${positions[index]}`,
                  }}
                />
              );
              const href = (() => {
                const raw = links[index]?.trim() ?? "";
                if (!raw) return "";
                try {
                  const url = new URL(raw);
                  if (url.protocol !== "http:" && url.protocol !== "https:") return "";
                  return url.toString();
                } catch {
                  return "";
                }
              })();
              if (!href) return <div key={`${src}-${index}`}>{image}</div>;
              return (
                <a
                  key={`${src}-${index}`}
                  className="home-sns__banner-link"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {image}
                </a>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
