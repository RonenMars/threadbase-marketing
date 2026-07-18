import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { brand } from '../brand';

/**
 * Renders a word letter-by-letter, each letter springing up from below with a
 * staggered delay. Deterministic (driven by useCurrentFrame) so it renders
 * identically every time.
 */
export const AnimatedWord: React.FC<{
  text: string;
  startFrame: number;
  fontSize: number;
  color?: string;
  letterStagger?: number;
}> = ({ text, startFrame, fontSize, color = brand.text, letterStagger = 2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: 'flex', overflow: 'hidden', paddingBottom: fontSize * 0.15 }}>
      {text.split('').map((char, i) => {
        const s = spring({
          frame: frame - startFrame - i * letterStagger,
          fps,
          config: { damping: 14, stiffness: 120 },
        });
        return (
          <span
            key={`${char}-${i}`}
            style={{
              display: 'inline-block',
              fontSize,
              fontWeight: 700,
              color,
              letterSpacing: -1,
              transform: `translateY(${(1 - s) * fontSize * 0.9}px)`,
              opacity: s,
              whiteSpace: 'pre',
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
