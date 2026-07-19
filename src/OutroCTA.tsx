import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { brand } from './brand';
import { BrandBackground } from './components/BrandBackground';
import { ThreadbaseMark } from './components/ThreadbaseMark';

const FONT_SANS =
  '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif';
const FONT_MONO =
  '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace';

/**
 * End card: mark + wordmark lockup, a pulsing LIVE status pill (the brand's
 * running/now signature), the CTA button (blue navigate fill), and the
 * standing attribution. Sits on the same grid + glow-orb canvas as the intro.
 */
export const OutroCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });

  const pillIn = spring({ frame: frame - 12, fps, config: { damping: 15 } });
  // Amber glow pulse on the LIVE pill — matches the brand's live indicator.
  const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin((frame / fps) * Math.PI * 1.4));

  const ctaIn = spring({ frame: frame - 22, fps, config: { damping: 16, stiffness: 100 } });
  const ctaY = interpolate(ctaIn, [0, 1], [26, 0]);

  const disclaimerOpacity = interpolate(frame, [40, 58], [0, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_SANS }}>
      <BrandBackground />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 52,
          paddingLeft: 100,
          paddingRight: 100,
        }}
      >
        {/* Mark + wordmark lockup. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, opacity: enter }}>
          <ThreadbaseMark size={128} startFrame={0} />
          <span
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: brand.text,
              letterSpacing: -2,
            }}
          >
            {brand.name}
          </span>
        </div>

        {/* LIVE status pill — amber, pulsing glow. */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            paddingLeft: 22,
            paddingRight: 26,
            paddingTop: 12,
            paddingBottom: 12,
            borderRadius: 999,
            backgroundColor: 'rgba(240,138,36,0.14)',
            border: `1px solid rgba(240,138,36,${0.3 + pulse * 0.3})`,
            boxShadow: `0 0 ${18 * pulse}px ${brand.amberGlow}`,
            opacity: pillIn,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: brand.live,
              boxShadow: `0 0 ${12 * pulse}px ${brand.live}`,
            }}
          />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 3,
              color: brand.liveHover,
            }}
          >
            LIVE
          </span>
        </div>

        {/* CTA — blue navigate fill (brand rule: blue = go/open, amber = live). */}
        <div
          style={{
            marginTop: 8,
            paddingLeft: 64,
            paddingRight: 64,
            paddingTop: 30,
            paddingBottom: 30,
            borderRadius: 16,
            background: `linear-gradient(180deg, ${brand.accentHover}, ${brand.accent})`,
            color: brand.bgDeep,
            fontSize: 46,
            fontWeight: 700,
            letterSpacing: -0.5,
            boxShadow: `0 0 34px ${brand.blueGlow}, 0 14px 40px rgba(0,0,0,0.5)`,
            opacity: ctaIn,
            transform: `translateY(${ctaY}px)`,
          }}
        >
          {brand.cta}
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          bottom: 72,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: FONT_MONO,
          fontSize: 22,
          color: brand.textMuted,
          opacity: disclaimerOpacity,
        }}
      >
        {brand.disclaimer}
      </div>
    </AbsoluteFill>
  );
};
