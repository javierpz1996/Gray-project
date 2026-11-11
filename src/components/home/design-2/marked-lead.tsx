export function MarkedLead({ text, background }: { text: string; background: string }) {
  const chunks = text.split(/(\[\[[\s\S]*?\]\])/g);
  return chunks.map((chunk, index) => {
    const marked = chunk.startsWith("[[") && chunk.endsWith("]]");
    if (!marked) return <span key={index}>{chunk}</span>;
    return (
      <span
        key={index}
        className="story-lead-mark"
        style={{ backgroundColor: background ? `rgb(${background})` : "transparent" }}
      >
        {chunk.slice(2, -2)}
      </span>
    );
  });
}
