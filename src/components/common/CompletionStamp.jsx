/* Rubber-stamp mark on fully completed chapter/deck cards */
export function CompletionStamp({ complete, perfect }) {
  if (!complete) return null;
  return (
    <span className={`vb-stamp ${perfect ? "perfect" : ""}`} aria-hidden="true">
      {perfect ? "★ Perfect!" : "✓ Complete"}
    </span>
  );
}
