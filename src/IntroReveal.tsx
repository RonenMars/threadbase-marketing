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
import { GlitchText, MetaTicks, Scanlines, TechFrame, TypeOut } from './gallery/TechEffects';
import { VARIANTS, type VariantKey } from './gallery/variants';

const FONT_SANS =
  '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif';
const FONT_MONO =
  '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace';

/**
 * App-name reveal. Grid + glow-orb canvas fades up, the Threadbase mark builds
 * (spine → blue rows → amber live pulse), the eyebrow lands, the wordmark
 * resolves, an accent underline draws with a glow, tagline follows.
 *
 * `variant` selects the treatment — see src/gallery/variants.ts.
 */
export const IntroReveal: React.FC<{ variant?: VariantKey }> = ({ variant = 'terminal' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = VARIANTS[variant];

  const markIn = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const markScale = interpolate(markIn, [0, 1], [0.82, 1]);

  // Hard-cut variants step in; the precision variant keeps a soft ramp.
  const eyebrowOpacity = v.hardCuts
    ? frame >= 10
      ? 1
      : 0
    : interpolate(frame, [10, 26], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  const underline = interpolate(frame, [50, v.hardCuts ? 62 : 72], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [58, 78], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const taglineY = interpolate(frame, [58, 78], [v.hardCuts ? 12 : 24, 0], {
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

      {v.techFrame ? <TechFrame startFrame={6} /> : null}
      {v.metaTicks ? <MetaTicks startFrame={14} /> : null}

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          paddingLeft: 100,
          paddingRight: 100,
        }}
      >
        <div style={{ transform: `scale(${markScale})`, opacity: markIn }}>
          <ThreadbaseMark size={210} startFrame={4} />
        </div>

        {/* Eyebrow — typed for terminal/combo, static mono otherwise. */}
        {v.typeOut ? (
          <TypeOut
            text={brand.eyebrow.toUpperCase()}
            startFrame={12}
            fontSize={24}
            framesPerChar={0.9}
            prefix="›"
          />
        ) : (
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: v.techFrame ? 6 : 4,
              textTransform: 'uppercase',
              color: brand.textDim,
              opacity: eyebrowOpacity,
            }}
          >
            {v.techFrame ? `[ ${brand.eyebrow} ]` : brand.eyebrow}
          </div>
        )}

        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          {v.glitch ? (
            <GlitchText
              text={brand.name}
              fontSize={116}
              startFrame={24}
              tracking={v.wordTracking}
              fontFamily={FONT_SANS}
            />
          ) : (
            <div style={{ fontFamily: FONT_SANS }}>
              <AnimatedWord
                text={brand.name}
                startFrame={22}
                fontSize={116}
                color={brand.text}
                letterStagger={v.hardCuts ? 1 : 2}
              />
            </div>
          )}

          <div
            style={{
              height: v.techFrame ? 3 : 6,
              width: `${underline * 72}%`,
              background: `linear-gradient(90deg, ${brand.accent}, ${brand.accentStrong})`,
              borderRadius: v.radius / 2,
              marginTop: 8,
              boxShadow: `0 0 18px ${brand.blueGlow}`,
              opacity: underline,
            }}
          />
        </div>

        <div
          style={{
            fontSize: 40,
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
          // Lift clear of the corner metadata ticks when the frame is on.
          bottom: v.metaTicks ? 96 : 72,
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

      {v.scanlines ? <Scanlines opacity={0.45} /> : null}
    </AbsoluteFill>
  );
};
