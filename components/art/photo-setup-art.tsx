/** Top-down diagram of a consistent clinical photography setup. Illustrative. */
export function PhotoSetupArt({ className = "" }: { className?: string }) {
  const label = { fontSize: 13, fill: "#4a3a3d", fontFamily: "var(--font-sans)", letterSpacing: "0.04em" };
  return (
    <svg viewBox="0 0 520 440" className={className} role="img" aria-labelledby="setup-title setup-desc">
      <title id="setup-title">Photography setup diagram</title>
      <desc id="setup-desc">
        The patient sits on a marked spot in front of a neutral backdrop. Two softbox lights stand at equal 45 degree angles and the camera is fixed on a mark 1.5 meters away.
      </desc>
      <rect width="520" height="440" fill="#ebe1d9" />
      {/* Backdrop */}
      <rect x="130" y="40" width="260" height="12" rx="2" fill="#a9b4a1" />
      <text x="260" y="30" textAnchor="middle" style={label}>
        Neutral backdrop
      </text>
      {/* Floor mark + patient */}
      <circle cx="260" cy="130" r="34" fill="none" stroke="#9c5f66" strokeDasharray="3 5" />
      <circle cx="260" cy="130" r="18" fill="#9c5f66" />
      <text x="310" y="134" style={label}>
        Floor mark
      </text>
      {/* Light paths */}
      <g stroke="#9c5f66" strokeOpacity="0.4" strokeDasharray="2 6">
        <line x1="110" y1="250" x2="250" y2="140" />
        <line x1="410" y1="250" x2="270" y2="140" />
        <line x1="260" y1="372" x2="260" y2="152" />
      </g>
      {/* Softboxes */}
      <g transform="rotate(-38 104 262)">
        <rect x="64" y="248" width="80" height="26" rx="3" fill="#f6e0cb" stroke="#6e4a55" />
      </g>
      <g transform="rotate(38 416 262)">
        <rect x="376" y="248" width="80" height="26" rx="3" fill="#f6e0cb" stroke="#6e4a55" />
      </g>
      <text x="64" y="320" style={label}>
        Softbox, 45°
      </text>
      <text x="456" y="320" textAnchor="end" style={label}>
        Softbox, 45°
      </text>
      {/* Camera */}
      <rect x="236" y="372" width="48" height="30" rx="4" fill="#2b1f22" />
      <circle cx="260" cy="387" r="8" fill="#ebe1d9" />
      <text x="296" y="392" style={label}>
        Camera on a fixed mark, 1.5 m
      </text>
    </svg>
  );
}
