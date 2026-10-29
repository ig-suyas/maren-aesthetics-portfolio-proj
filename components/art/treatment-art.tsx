import type { ReactNode } from "react";
import type { Treatment } from "@/lib/treatments";

type Kind = Treatment["art"];

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/** Abstract, non-photographic artwork for each treatment. Drawn on a 300×400 canvas. */
export function TreatmentArt({ kind, className = "" }: { kind: Kind; className?: string }) {
  return (
    <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      {art[kind]}
    </svg>
  );
}

const art: Record<Kind, ReactNode> = {
  // Expression lines easing out, top to bottom
  relax: (
    <>
      <rect width="300" height="400" fill="#ead6d2" />
      <circle cx="226" cy="96" r="40" fill="#f6e0cb" />
      {range(9).map((i) => {
        const y = 150 + i * 26;
        const a = 16 * (1 - i / 8);
        return (
          <path
            key={i}
            d={`M-10 ${y} C 40 ${y - a}, 70 ${y + a}, 120 ${y} S 200 ${y - a}, 250 ${y} S 310 ${y + a}, 320 ${y}`}
            fill="none"
            stroke="#9c5f66"
            strokeOpacity={0.35 + i * 0.07}
            strokeWidth="1.5"
          />
        );
      })}
    </>
  ),
  // Soft, nested volume like a cheek contour
  volume: (
    <>
      <rect width="300" height="400" fill="#f1e2d8" />
      {[
        [190, "#ecccbe"],
        [150, "#e2b2a6"],
        [112, "#d59a95"],
        [74, "#b97f86"],
        [36, "#84464e"],
      ].map(([r, fill], i) => (
        <circle key={i} cx={172 - i * 6} cy={262 - i * 10} r={r as number} fill={fill as string} />
      ))}
    </>
  ),
  // Surface texture refining from coarse to fine
  texture: (
    <>
      <rect width="300" height="400" fill="#dfe3d8" />
      {range(15).flatMap((row) =>
        range(11).map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={18 + col * 26.4 + (row % 2) * 13}
            cy={20 + row * 26}
            r={0.9 + (row / 14) * 3.6}
            fill="#5f6c5a"
            fillOpacity={0.45 + (row / 14) * 0.4}
          />
        )),
      )}
    </>
  ),
  // Layers lifting away to brighter skin beneath
  layers: (
    <>
      <rect width="300" height="400" fill="#f6e0cb" />
      {["#ead6d2", "#e0bfbc", "#d4a3a4", "#b97f86"].map((fill, i) => (
        <rect key={i} x={-40 + i * 34} y={70 + i * 62} width="320" height="300" rx="150" fill={fill} transform={`rotate(${-8 + i * 3} 150 200)`} />
      ))}
    </>
  ),
  // Water on still skin
  ripple: (
    <>
      <rect width="300" height="400" fill="#dfe3d8" />
      {range(7).map((i) => (
        <ellipse key={i} cx="150" cy="268" rx={22 + i * 26} ry={8 + i * 9.5} fill="none" stroke="#5f6c5a" strokeOpacity={0.75 - i * 0.09} strokeWidth="1.2" />
      ))}
      <path d="M150 104c18 28 30 48 30 66a30 30 0 0 1-60 0c0-18 12-38 30-66Z" fill="#a9b4a1" />
    </>
  ),
  // Broad light falling through dusk
  light: (
    <>
      <rect width="300" height="400" fill="#4a333b" />
      {range(6).map((i) => (
        <path key={i} d={`M-20 -20 L ${60 + i * 60} 420 L ${100 + i * 60} 420 Z`} fill="#f6e0cb" fillOpacity={0.05 + i * 0.03} />
      ))}
      <circle cx="0" cy="0" r="74" fill="#f6e0cb" />
      <circle cx="0" cy="0" r="98" fill="none" stroke="#f6e0cb" strokeOpacity="0.4" />
    </>
  ),
  // Fine strands thinning out across sessions
  fine: (
    <>
      <rect width="300" height="400" fill="#ebe1d9" />
      {range(36).map((i) => {
        const x = 14 + i * 7.9;
        const h = 210 * Math.pow(1 - i / 36, 1.4) + 18;
        return <line key={i} x1={x} x2={x + 6} y1={370} y2={370 - h} stroke="#6e4a55" strokeWidth="1.2" strokeLinecap="round" />;
      })}
      <line x1="0" x2="300" y1="371" y2="371" stroke="#6e4a55" strokeOpacity="0.5" />
    </>
  ),
};
