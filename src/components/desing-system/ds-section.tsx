import type { ReactNode } from "react";
import { DsGuidelines } from "@/components/desing-system/ds-guidelines";

export function DsSection({
  id,
  eyebrow,
  title,
  intro,
  rules,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  rules?: { title?: string; items: readonly string[] };
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <div className="ds-shell">
        <header className="ds-section-header">
          <p className="ds-eyebrow">{eyebrow}</p>
          <h2 className="ds-h2">{title}</h2>
          {intro ? <p className="ds-lead max-w-[42rem]">{intro}</p> : null}
        </header>
        <div className="ds-section-body">
          {rules ? (
            <DsGuidelines title={rules.title} items={rules.items} />
          ) : null}
          <div className={rules ? "ds-section-demo" : undefined}>{children}</div>
        </div>
      </div>
    </section>
  );
}

export function DsSubsection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="ds-subsection-stack">
      <header className="ds-subsection-header">
        <h3 className="ds-h3">{title}</h3>
        {description ? (
          <p className="max-w-[42rem] text-[var(--ds-text-small)] text-[var(--ds-muted)]">
            {description}
          </p>
        ) : null}
      </header>
      <div className="ds-subsection-body">{children}</div>
    </div>
  );
}

export function DsPanel({ children }: { children: ReactNode }) {
  return <div className="ds-panel">{children}</div>;
}

export function DsToken({ children }: { children: string }) {
  return <code className="ds-token">{children}</code>;
}
