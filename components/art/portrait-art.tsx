import type { ReactNode } from "react";

export type Botanical = "ocotillo" | "agave" | "paloverde" | "marigold";

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/** Desert botanical in place of a staff photo. Drawn on a 300×400 canvas. */
export function PortraitArt({ kind, className = "" }: { kind: Botanical; className?: string }) {
  return (
    <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      {plants[kind]}
    </svg>
  );
}

const plants: Record<Botanical, ReactNode> = {
  ocotillo: (
    <>
      <rect width="300" height="400" fill="#ead6d2" />
      <circle cx="210" cy="118" r="54" fill="#f6e0cb" />
      <path d="M0 352c80-10 200-10 300 0v48H0Z" fill="#d4a3a4" />
      {range(7).map((i) => {
        const a = -36 + i * 12;
        const len = 230 - Math.abs(i - 3) * 22;
        const rad = (a * Math.PI) / 180;
        const x2 = 150 + Math.sin(rad) * len;
        const y2 = 356 - Math.cos(rad) * len;
        return (
          <g key={i}>
            <path d={`M150 356Q${150 + Math.sin(rad) * len * 0.4} ${356 - Math.cos(rad) * len * 0.6} ${x2} ${y2}`} fill="none" stroke="#6e4a55" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx={x2} cy={y2 - 4} r="5" fill="#9c5f66" />
          </g>
        );
      })}
    </>
  ),
  agave: (
    <>
      <rect width="300" height="400" fill="#dfe3d8" />
      <path d="M0 330h300v70H0Z" fill="#c9d0bf" />
      {[-62, -40, -18, 0, 18, 40, 62].map((a, i) => (
        <path
          key={i}
          d="M150 340C134 300 140 230 150 150 160 230 166 300 150 340Z"
          transform={`translate(150 340) rotate(${a}) scale(1 ${1 - Math.abs(a) / 140}) translate(-150 -340)`}
          fill={i % 2 ? "#7d8b77" : "#5f6c5a"}
        />
      ))}
    </>
  ),
  paloverde: (
    <>
      <rect width="300" height="400" fill="#f1e2d8" />
      <path d="M150 390V250M150 300 92 210M150 270l64-96M92 210 60 150M92 210l14-70M214 174l-6-70M214 174l44-46" fill="none" stroke="#5f6c5a" strokeWidth="4" strokeLinecap="round" />
      {range(26).map((i) => {
        const x = 50 + ((i * 37) % 220);
        const y = 90 + ((i * 53) % 150);
        return <circle key={i} cx={x} cy={y} r={3 + (i % 3)} fill={i % 4 ? "#e9b9a2" : "#9c5f66"} />;
      })}
    </>
  ),
  marigold: (
    <>
      <rect width="300" height="400" fill="#ebe1d9" />
      <path d="M150 400C146 330 156 280 150 220" fill="none" stroke="#5f6c5a" strokeWidth="3" />
      <path d="M150 320c-30-6-46-24-50-44 26 2 44 18 50 44Z" fill="#7d8b77" />
      <g transform="translate(150 190)">
        {range(14).map((i) => (
          <ellipse key={i} cx="0" cy="-46" rx="12" ry="40" fill="#e9b9a2" transform={`rotate(${i * (360 / 14)})`} />
        ))}
        <circle r="24" fill="#84464e" />
        <circle r="13" fill="#6e4a55" />
      </g>
    </>
  ),
};
