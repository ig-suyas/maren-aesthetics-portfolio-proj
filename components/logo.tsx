type LogoProps = { tone?: "ink" | "stone"; className?: string };

/** Arch mark with a rising sun, plus wordmark. */
export function ArchMark({ className, tone = "ink" }: { className?: string; tone?: "ink" | "stone" }) {
  const stroke = tone === "ink" ? "#2b1f22" : "#f3ece6";
  return (
    <svg viewBox="0 0 24 30" className={className} aria-hidden="true">
      <path d="M2.5 29V12a9.5 9.5 0 0 1 19 0v17" fill="none" stroke={stroke} strokeWidth="1.6" />
      <circle cx="12" cy="21" r="4.6" fill={tone === "ink" ? "#9c5f66" : "#dcaab0"} />
      <path d="M2.5 23.5h19" stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

export function Logo({ tone = "ink", className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-end gap-2.5 ${className}`}>
      <ArchMark tone={tone} className="h-7 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.65rem] leading-[0.8] tracking-[0.01em] italic">Maren</span>
        <span className={`mt-1 text-[0.5625rem] font-semibold tracking-[0.32em] uppercase ${tone === "ink" ? "text-muted" : "text-stone/70"}`}>
          Aesthetics
        </span>
      </span>
    </span>
  );
}
