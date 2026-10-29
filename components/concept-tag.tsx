/** Small label that marks artwork as illustrative, never as real patient or staff imagery. */
export function ConceptTag({
  children = "Concept illustration",
  tone = "light",
  className = "",
}: {
  children?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const colors = tone === "light" ? "bg-stone/90 text-ink-2" : "bg-stone/10 text-stone";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase ${colors} ${className}`}>
      <span className={`size-1.5 rounded-pill ${tone === "light" ? "bg-rose" : "bg-rose-light"}`} aria-hidden="true" />
      {children}
    </span>
  );
}
