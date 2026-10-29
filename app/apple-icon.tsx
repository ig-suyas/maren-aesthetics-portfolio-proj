import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3ece6" }}>
        <svg width="110" height="120" viewBox="0 0 24 26">
          <path d="M2.5 26V11a9.5 9.5 0 0 1 19 0v15" fill="none" stroke="#2b1f22" strokeWidth="1.6" />
          <circle cx="12" cy="19" r="4.6" fill="#9c5f66" />
          <path d="M2.5 21.5h19" stroke="#2b1f22" strokeWidth="1.6" />
        </svg>
      </div>
    ),
    size,
  );
}
