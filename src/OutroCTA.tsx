import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { brand } from './brand';

const StatusDot: React.FC<{ color: string; delay: number }> = ({ color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12 } });
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: color,
        transform: `scale(${s})`,
        opacity: s,
      }}
    />
  );
};

/**
 * End card: wordmark, CTA button (gently pulsing), and the running/waiting
 * status dots as a brand callback to the hub the viewer just watched.
 */
export const OutroCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14 } });
  // Slow pulse on the CTA button after it has entered.
  const pulse = 1 + Math.sin((frame / fps) * Math.PI * 1.5) * 0.03;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.bg,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 48,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, opacity: enter }}>
        <Img src={staticFile('icon.png')} style={{ width: 96, height: 96, borderRadius: 22 }} />
        <span style={{ fontSize: 72, fontWeight: 700, color: brand.text, letterSpacing: -1 }}>
          {brand.name}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 16, opacity: enter }}>
        <StatusDot color={brand.success} delay={10} />
        <StatusDot color={brand.waiting} delay={16} />
      </div>

      <div
        style={{
          marginTop: 16,
          paddingLeft: 56,
          paddingRight: 56,
          paddingTop: 28,
          paddingBottom: 28,
          borderRadius: 20,
          backgroundColor: brand.accent,
          color: brand.bg,
          fontSize: 42,
          fontWeight: 700,
          transform: `scale(${enter * pulse})`,
        }}
      >
        {brand.cta}
      </div>
    </AbsoluteFill>
  );
};
