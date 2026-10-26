export function DsGuidelines({
  title = "Reglas de uso",
  items,
}: {
  title?: string;
  items: readonly string[];
}) {
  return (
    <aside className="ds-guidelines" aria-label={title}>
      <h3 className="ds-guidelines-title">{title}</h3>
      <ul className="ds-guidelines-list">
        {items.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </aside>
  );
}

export function DsPrinciples({
  title,
  intro,
  items,
}: {
  title: string;
  intro?: string;
  items: readonly string[];
}) {
  return (
    <div className="ds-principles">
      <header className="ds-principles-header">
        <h2 className="ds-h2">{title}</h2>
        {intro ? <p className="ds-lead max-w-[42rem]">{intro}</p> : null}
      </header>
      <ul className="ds-principles-list">
        {items.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </div>
  );
}
