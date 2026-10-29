import { ImageResponse } from "next/og";

export const alt = "Maren Aesthetics: quiet, physician-led aesthetics in Scottsdale. Concept project.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f3ece6", color: "#2b1f22", padding: 72, position: "relative" }}>
        <svg width="360" height="500" viewBox="0 0 400 560" style={{ position: "absolute", right: 110, bottom: 0 }}>
          <defs>
            <linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c48d94" />
              <stop offset="0.5" stopColor="#dea49b" />
              <stop offset="1" stopColor="#f6e0cb" />
            </linearGradient>
            <clipPath id="c">
              <path d="M14 560V200a186 186 0 0 1 372 0v360Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#c)">
            <rect width="400" height="560" fill="url(#s)" />
            <circle cx="200" cy="392" r="88" fill="#fbecdc" />
            <path fill="#c48f92" d="M0 432C30 426 48 410 70 404c18-5 28 4 42 10s28 4 44-12c20-20 40-40 72-46 34-6 60 16 84 36 20 16 48 26 88 28v140H0Z" />
            <path fill="#9c7078" d="M0 462c48-12 92-16 140-10s86 18 130 10 82-18 130-14v112H0Z" />
            <path fill="#6e4a55" d="M0 500c70-12 140-8 200 0s130-4 200-10v70H0Z" />
          </g>
          <path d="M14 560V200a186 186 0 0 1 372 0v360" fill="none" stroke="#9c5f66" strokeWidth="2" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: 600 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontStyle: "italic", letterSpacing: -2, lineHeight: 1 }}>Maren</div>
            <div style={{ fontSize: 18, letterSpacing: 8, marginTop: 8, color: "#6e5b5e" }}>AESTHETICS</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 50, lineHeight: 1.1, letterSpacing: -1 }}>Quiet, physician-led aesthetics for a rested, natural look.</div>
            <div style={{ marginTop: 24, fontSize: 24, color: "#6e5b5e" }}>Old Town Scottsdale, Arizona · Concept project</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
