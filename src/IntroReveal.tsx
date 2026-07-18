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
import { AnimatedWord } from './components/AnimatedWord';

/**
 * App-name reveal. Icon springs in, wordmark wipes in letter-by-letter, the
 * accent underline draws left-to-right, tagline fades up.
 */
export const IntroReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconSpring = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const iconScale = interpolate(iconSpring, [0, 1], [0.6, 1]);

  const underline = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const taglineY = interpolate(frame, [40, 60], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.bg,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
      }}
    >
      <Img
        src={staticFile('icon.png')}
        style={{
          width: 220,
          height: 220,
          borderRadius: 48,
          transform: `scale(${iconScale})`,
          opacity: iconSpring,
        }}
      />

      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <AnimatedWord text={brand.name} startFrame={15} fontSize={104} />
        <div
          style={{
            height: 6,
            width: `${underline * 100}%`,
            backgroundColor: brand.accent,
            borderRadius: 3,
            marginTop: 8,
          }}
        />
      </div>

      <div
        style={{
          fontSize: 40,
          color: brand.textDim,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontWeight: 500,
        }}
      >
        {brand.tagline}
      </div>
    </AbsoluteFill>
  );
};
