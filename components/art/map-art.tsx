const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/** Illustrative street map, not a real location. */
export function MapArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      <rect width="640" height="480" fill="#ebe1d9" />
      <g stroke="#d8c8bd" strokeWidth="1.5">
        {range(12).map((i) => (
          <line key={`v${i}`} x1={i * 58 + 10} x2={i * 58 - 30} y1="0" y2="480" />
        ))}
        {range(9).map((i) => (
          <line key={`h${i}`} x1="0" x2="640" y1={i * 58 + 20} y2={i * 58 + 34} />
        ))}
      </g>
      {/* Canal */}
      <path d="M-20 360C120 330 210 250 330 236s250 40 340-30" fill="none" stroke="#a9b4a1" strokeWidth="14" strokeLinecap="round" />
      {/* Main roads */}
      <path d="M352 0 324 480" stroke="#e0d2c7" strokeWidth="10" />
      <path d="M0 150 640 168" stroke="#e0d2c7" strokeWidth="10" />
      {/* Park */}
      <rect x="420" y="300" width="120" height="86" rx="6" fill="#dfe3d8" />
      {/* Pin */}
      <g transform="translate(338 164)">
        <circle r="46" fill="#9c5f66" fillOpacity="0.14" />
        <path d="M-14 16V-2a14 14 0 0 1 28 0v18Z" fill="#84464e" />
        <circle cy="2" r="5" fill="#f3ece6" />
      </g>
    </svg>
  );
}
