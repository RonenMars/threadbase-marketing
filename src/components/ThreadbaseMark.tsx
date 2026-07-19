import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * The Threadbase brand mark, rendered natively so it animates: the thread spine
 * draws top→bottom, the three blue "past message" capsules stagger in along it,
 * then the amber "live" row lands and its glow pulses — the brand's signature
 * running/now indicator.
 *
 * Geometry ported verbatim from assets/threadbase-icon.svg in the Threadbase
 * Design System (viewBox 0 0 512 512). `startFrame` offsets the whole build.
 */
export const ThreadbaseMark: React.FC<{
  size?: number;
  startFrame?: number;
  /** When true, the amber live row keeps pulsing after it lands. */
  pulse?: boolean;
}> = ({ size = 220, startFrame = 0, pulse = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - startFrame;

  // Spine draws in first.
  const spineDraw = interpolate(t, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Each blue capsule springs in along the spine, staggered.
  const capsule = (delay: number) =>
    spring({ frame: t - delay, fps, config: { damping: 16, stiffness: 110 }, durationInFrames: 22 });
  const c1 = capsule(10);
  const c2 = capsule(16);
  const c3 = capsule(22);

  // Amber live row lands last, then pulses its glow.
  const live = spring({ frame: t - 30, fps, config: { damping: 15, stiffness: 100 }, durationInFrames: 24 });
  const pulseT = Math.max(0, t - 54);
  const livePulse = pulse
    ? 0.7 + 0.3 * (0.5 + 0.5 * Math.sin((pulseT / fps) * Math.PI * 1.25))
    : live;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Threadbase"
    >
      <defs>
        <radialGradient id="tbmBgGlow" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#0f1e35" />
          <stop offset="100%" stopColor="#070b11" />
        </radialGradient>
        <filter id="tbmBlueGlow" x="-30%" y="-80%" width="160%" height="360%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="tbmOrangeGlow" x="-60%" y="-160%" width="220%" height="520%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="tbmGrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1a2d47" strokeWidth="0.5" opacity="0.4" />
        </pattern>
        <linearGradient id="tbmThread1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#63b3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#63b3ff" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="tbmThread2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#63b3ff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#63b3ff" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="tbmThread3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#63b3ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#63b3ff" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="tbmBase" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f08a24" stopOpacity="1" />
          <stop offset="60%" stopColor="#f08a24" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f08a24" stopOpacity="0" />
        </linearGradient>
        <clipPath id="tbmRounded">
          <rect width="512" height="512" rx="96" ry="96" />
        </clipPath>
      </defs>

      {/* Ground + glow + grid + top hairline. */}
      <rect width="512" height="512" rx="96" fill="#070b11" />
      <rect width="512" height="512" rx="96" fill="url(#tbmBgGlow)" />
      <rect width="512" height="512" rx="96" fill="url(#tbmGrid)" clipPath="url(#tbmRounded)" />
      <rect x="80" y="0" width="352" height="2" rx="1" fill="#63b3ff" opacity="0.12" />

      {/* Thread spine — draws in top→bottom via clipped height. */}
      <rect
        x="137"
        y="152"
        width="3"
        height={228 * spineDraw}
        rx="1.5"
        fill="#2a4060"
        opacity="0.9"
      />

      {/* Blue capsule rows (past messages) + trailing dashes. */}
      <g opacity={c1} transform={`translate(${(1 - c1) * -16},0)`}>
        <rect x="138" y="152" width="234" height="22" rx="11" fill="url(#tbmThread1)" filter="url(#tbmBlueGlow)" />
        <rect x="370" y="157" width="28" height="3" rx="1.5" fill="#63b3ff" opacity="0.35" />
        <rect x="404" y="157" width="12" height="3" rx="1.5" fill="#63b3ff" opacity="0.15" />
      </g>
      <g opacity={c2} transform={`translate(${(1 - c2) * -16},0)`}>
        <rect x="138" y="200" width="178" height="22" rx="11" fill="url(#tbmThread2)" />
        <rect x="314" y="205" width="22" height="3" rx="1.5" fill="#63b3ff" opacity="0.25" />
      </g>
      <g opacity={c3} transform={`translate(${(1 - c3) * -16},0)`}>
        <rect x="138" y="248" width="206" height="22" rx="11" fill="url(#tbmThread3)" />
      </g>

      {/* Amber live row — lands last, glow pulses. */}
      <g opacity={live}>
        <rect
          x="138"
          y="316"
          width="240"
          height="16"
          rx="8"
          fill="url(#tbmBase)"
          filter="url(#tbmOrangeGlow)"
          opacity={livePulse}
        />
        <rect x="138" y="341" width="180" height="3" rx="1.5" fill="#f08a24" opacity="0.18" />
        <rect x="138" y="352" width="120" height="3" rx="1.5" fill="#f08a24" opacity="0.09" />
      </g>

      {/* Spine dots — one per row, matching capsule reveal. */}
      <g opacity={c1}>
        <circle cx="138" cy="163" r="10" fill="#070b11" />
        <circle cx="138" cy="163" r="10" fill="#63b3ff" opacity="0.15" />
        <circle cx="138" cy="163" r="5.5" fill="#63b3ff" filter="url(#tbmBlueGlow)" />
        <circle cx="138" cy="163" r="9" fill="none" stroke="#63b3ff" strokeWidth="1.5" opacity="0.6" />
      </g>
      <g opacity={c2}>
        <circle cx="138" cy="211" r="10" fill="#070b11" />
        <circle cx="138" cy="211" r="5.5" fill="#63b3ff" opacity="0.7" />
        <circle cx="138" cy="211" r="9" fill="none" stroke="#63b3ff" strokeWidth="1.5" opacity="0.35" />
      </g>
      <g opacity={c3}>
        <circle cx="138" cy="259" r="10" fill="#070b11" />
        <circle cx="138" cy="259" r="5.5" fill="#63b3ff" opacity="0.4" />
        <circle cx="138" cy="259" r="9" fill="none" stroke="#63b3ff" strokeWidth="1.5" opacity="0.2" />
      </g>
      <g opacity={live}>
        <circle cx="138" cy="324" r="12" fill="#070b11" />
        <circle cx="138" cy="324" r="12" fill="#f08a24" opacity="0.12" />
        <circle cx="138" cy="324" r="6.5" fill="#f08a24" filter="url(#tbmOrangeGlow)" opacity={livePulse} />
        <circle cx="138" cy="324" r="11" fill="none" stroke="#f08a24" strokeWidth="1.5" opacity="0.7" />
      </g>

      {/* Decorative trailing dots. */}
      <g opacity={c1}>
        <circle cx="390" cy="130" r="3" fill="#63b3ff" opacity="0.4" />
        <circle cx="406" cy="130" r="2" fill="#63b3ff" opacity="0.2" />
        <circle cx="418" cy="130" r="1.5" fill="#63b3ff" opacity="0.15" />
      </g>
      <g opacity={live}>
        <circle cx="385" cy="340" r="4" fill="#f08a24" opacity="0.5" />
        <circle cx="398" cy="340" r="2.5" fill="#f08a24" opacity="0.25" />
      </g>

      {/* Superellipse hairline border. */}
      <rect x="1" y="1" width="510" height="510" rx="95" fill="none" stroke="#7497c7" strokeWidth="1.5" opacity="0.12" />
    </svg>
  );
};
