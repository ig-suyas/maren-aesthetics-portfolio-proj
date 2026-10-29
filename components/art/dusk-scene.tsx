import type { CSSProperties } from "react";

type DuskSceneProps = {
  /** Unique id prefix for gradients and clip paths */
  id: string;
  /** Adds the sunrise intro classes (home hero only) */
  intro?: boolean;
  className?: string;
};

const ARCH = "M14 560V200a186 186 0 0 1 372 0v360";
const ECHO = "M-4 572V200a204 204 0 0 1 408 0v372";

/** Sonoran dawn seen through an arch: night sky lifting, sun rising behind Camelback. */
export function DuskScene({ id, intro = false, className = "" }: DuskSceneProps) {
  const c = (name: string) => (intro ? name : undefined);
  const d = (ms: number, from = 18) => ({ ["--d" as string]: `${ms}ms`, ["--from" as string]: `${from}px` }) as CSSProperties;

  return (
    <svg viewBox="-12 -12 424 584" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={`${ARCH}Z`} />
        </clipPath>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c48d94" />
          <stop offset="0.42" stopColor="#dea49b" />
          <stop offset="0.72" stopColor="#efc8b2" />
          <stop offset="1" stopColor="#f6e0cb" />
        </linearGradient>
        <linearGradient id={`${id}-night`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f2b33" />
          <stop offset="0.55" stopColor="#6e4a55" />
          <stop offset="1" stopColor="#a8797f" />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#fdf3e8" />
          <stop offset="1" stopColor="#f4d3bb" />
        </radialGradient>
      </defs>

      <g clipPath={`url(#${id}-clip)`}>
        <g className={c("intro-scene")}>
          <rect x="0" y="0" width="400" height="560" fill={`url(#${id}-sky)`} />
          <rect x="0" y="0" width="400" height="560" fill={`url(#${id}-night)`} className={c("intro-night")} opacity={intro ? undefined : 0} />

          <g className={c("intro-sun")}>
            <circle cx="200" cy="392" r="136" fill="none" stroke="#fdf3e8" strokeOpacity="0.28" />
            <circle cx="200" cy="392" r="112" fill="none" stroke="#fdf3e8" strokeOpacity="0.4" />
            <circle cx="200" cy="392" r="88" fill={`url(#${id}-sun)`} />
          </g>

          {/* Camelback, far ridge */}
          <path
            className={c("intro-ridge")}
            style={d(1150, 28)}
            fill="#c48f92"
            d="M0 432C30 426 48 410 70 404c18-5 28 4 42 10s28 4 44-12c20-20 40-40 72-46 34-6 60 16 84 36 20 16 48 26 88 28v140H0Z"
          />
          <path
            className={c("intro-ridge")}
            style={d(1320, 20)}
            fill="#9c7078"
            d="M0 462c48-12 92-16 140-10s86 18 130 10 82-18 130-14v112H0Z"
          />
          <g className={c("intro-ridge")} style={d(1480, 12)} fill="#6e4a55">
            <path d="M0 500c70-12 140-8 200 0s130-4 200-10v70H0Z" />
            <path d="M297 506v-48a4 4 0 0 1 8 0v48Zm0-24h-8a4 4 0 0 1-4-4v-10a3 3 0 0 1 6 0v8h6Zm8-8h7v-12a3 3 0 0 1 6 0v14a4 4 0 0 1-4 4h-9Z" />
          </g>
        </g>
      </g>

      <path d={ARCH} pathLength={1} fill="none" stroke="#9c5f66" strokeWidth="1.5" className={c("intro-line")} />
      <path d={ECHO} pathLength={1} fill="none" stroke="#9c5f66" strokeOpacity="0.45" strokeWidth="1" className={c("intro-echo")} />
    </svg>
  );
}
