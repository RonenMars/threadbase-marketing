import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { brand } from './brand';
import { AnimatedWord } from './components/AnimatedWord';
import { BrandBackground } from './components/BrandBackground';
import { ThreadbaseMark } from './components/ThreadbaseMark';

const FONT_SANS =
  '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif';
const FONT_MONO =
  '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace';

/**
 * App-name reveal. Grid + glow-orb canvas fades up, the Threadbase mark builds
 * (spine → blue rows → amber live pulse), the eyebrow types in, the wordmark
 * wipes in letter-by-letter, an accent underline draws with a glow, tagline
 * fades up, and the attribution sits quietly at the bottom.
 */
export const IntroReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const markIn = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const markScale = interpolate(markIn, [0, 1], [0.82, 1]);

  const eyebrowOpacity = interpolate(frame, [10, 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const underline = interpolate(frame, [50, 72], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [58, 78], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const taglineY = interpolate(frame, [58, 78], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const disclaimerOpacity = interpolate(frame, [72, 88], [0, 0.7], {
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
          gap: 44,
          paddingLeft: 100,
          paddingRight: 100,
        }}
      >
        <div style={{ transform: `scale(${markScale})`, opacity: markIn }}>
          <ThreadbaseMark size={230} startFrame={4} />
        </div>

        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: brand.textDim,
            opacity: eyebrowOpacity,
          }}
        >
          {brand.eyebrow}
        </div>

        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: FONT_SANS }}>
            <AnimatedWord text={brand.name} startFrame={20} fontSize={116} color={brand.text} />
          </div>
          <div
            style={{
              height: 6,
              width: `${underline * 72}%`,
              background: `linear-gradient(90deg, ${brand.accent}, ${brand.accentStrong})`,
              borderRadius: 3,
              marginTop: 6,
              boxShadow: `0 0 18px ${brand.blueGlow}`,
              opacity: underline,
            }}
          />
        </div>

        <div
          style={{
            fontSize: 42,
            lineHeight: 1.35,
            color: brand.textDim,
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: 820,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          {brand.tagline}
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
