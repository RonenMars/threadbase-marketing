import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { brand, GRID_LINE, GRID_SIZE } from '../brand';

/**
 * The Threadbase marketing canvas: near-black ground, two radial "orb" glows
 * (blue top-left, amber top-right) and the signature 48px terminal grid.
 *
 * Matches tb-landing's app-shell base. Shared by both bookends so the intro and
 * outro sit in the same world. Everything fades up over the first `fadeFrames`.
 */
export const BrandBackground: React.FC<{ fadeFrames?: number }> = ({ fadeFrames = 20 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fadeFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: brand.bgDeep }}>
      {/* Base vertical gradient — deep at top, settling into the canvas. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${brand.bgDeep} 0%, ${brand.bg} 30%, ${brand.bg} 100%)`,
        }}
      />

      {/* Radial orbs — the brand's floating glow. Blue past / amber live. */}
      <AbsoluteFill
        style={{
          opacity,
          background: [
            'radial-gradient(circle at 18% 20%, rgba(99,179,255,0.20), transparent 34%)',
            'radial-gradient(circle at 84% 14%, rgba(240,138,36,0.14), transparent 26%)',
          ].join(','),
        }}
      />

      {/* Signature 48px terminal grid. */}
      <AbsoluteFill
        style={{
          opacity: opacity * 0.9,
          backgroundImage: [
            `linear-gradient(to right, ${GRID_LINE} 1px, transparent 1px)`,
            `linear-gradient(to bottom, ${GRID_LINE} 1px, transparent 1px)`,
          ].join(','),
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
      />
    </AbsoluteFill>
  );
};
