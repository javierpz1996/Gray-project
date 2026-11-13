import "./design-2-x-separator.css";

/** Separador del diseño 2: equis grandes, juntas, con un temblor suave. */
export function Design2XSeparator({ count = 120 }: { count?: number }) {
  const marks = Array.from({ length: count }, () => "X");

  return (
    <div className="design-2-x-separator" aria-hidden="true">
      <div className="design-2-x-separator__track">
        {marks.map((mark, index) => (
          <span key={index} style={{ ["--i" as string]: index }}>
            {mark}
          </span>
        ))}
      </div>
    </div>
  );
}
