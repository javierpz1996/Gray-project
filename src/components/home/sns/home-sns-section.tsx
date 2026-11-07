import { site } from "@/config/site";
import "./home-sns.css";

const REDES = [
  { id: "tiktok", label: "TikTok", href: site.links.tiktok },
  { id: "instagram", label: "Instagram", href: site.links.instagram },
  { id: "x", label: "Twitter", href: site.links.x },
  { id: "youtube", label: "YouTube", href: site.links.youtube },
  { id: "deviantart", label: "DeviantArt", href: site.links.deviantart },
] as const;

type RedId = (typeof REDES)[number]["id"];

function SnsMark({ id }: { id: RedId }) {
  if (id === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M14.2 3h2.1a5.2 5.2 0 0 0 3.7 3.4v2.2a7.3 7.3 0 0 1-3.7-1.1v6.8a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.4a3.3 3.3 0 1 0 2.3 3.1V3Z"
        />
      </svg>
    );
  }
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="12"
          r="3.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (id === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M5 4.5h3.2l3.1 4.3L15.2 4.5H19l-5.2 6.6L19.4 19.5h-3.2l-3.5-4.8-4.2 4.8H5l5.6-6.4L5 4.5Z"
        />
      </svg>
    );
  }
  if (id === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path fill="currentColor" d="M11 9.4v5.2l4.6-2.6L11 9.4Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M6.5 3.5h7.2l-2.4 5.2h5.2L8.2 20.5h2.6l2.2-4.6H7.6l2.3-5.2H6.5V3.5Z"
      />
    </svg>
  );
}

export function HomeSnsSection() {
  return (
    <section className="home-sns" aria-label="Redes">
      <ul className="home-sns__list">
        {REDES.map((red) => (
          <li key={red.id}>
            <a href={red.href} target="_blank" rel="noopener noreferrer">
              <span className="home-sns__mark">
                <SnsMark id={red.id} />
              </span>
              <span className="home-sns__name">{red.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
