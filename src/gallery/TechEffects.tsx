import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { brand } from '../brand';

const FONT_MONO =
  '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace';

/**
 * Deterministic pseudo-random in [0,1) from an integer seed. Used for glitch
 * jitter — Math.random() would break render reproducibility.
 */
const rand = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** CRT scanline overlay — fine horizontal lines with a slow vertical drift. */
export const Scanlines: React.FC<{ opacity?: number }> = ({ opacity = 0.5 }) => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.5) % 4;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        opacity,
        backgroundImage:
          'repeating-linear-gradient(to bottom, rgba(0,0,0,0.32) 0px, rgba(0,0,0,0.32) 1px, transparent 1px, transparent 4px)',
        backgroundPosition: `0 ${drift}px`,
      }}
    />
  );
};

/**
 * Wordmark with an RGB channel split. The offset kicks hard on entry, then
 * settles to a faint residual — a hit, not a constant shimmer.
 */
export const GlitchText: React.FC<{
  text: string;
  fontSize: number;
  startFrame?: number;
  tracking?: number;
  fontFamily?: string;
}> = ({ text, fontSize, startFrame = 0, tracking = -2, fontFamily }) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;

  // Hard entry kick that decays into a small residual split.
  const decay = interpolate(t, [0, 14], [1, 0.14], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Occasional re-glitch beats so it stays alive without shimmering.
  const beat = t > 26 && t < 30 ? 1 : t > 48 && t < 51 ? 0.8 : 0;
  const amount = Math.max(decay, beat);

  const jitter = (rand(Math.floor(t / 2) + 1) - 0.5) * 2;
  const dx = 7 * amount * (1 + jitter * 0.4);

  const base: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize,
    fontWeight: 700,
    letterSpacing: tracking,
    fontFamily,
    whiteSpace: 'pre',
  };

  const visible = t >= 0 ? 1 : 0;

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        opacity: visible,
        // Reserve layout space; the channels are absolutely positioned on top.
        color: 'transparent',
        fontSize,
        fontWeight: 700,
        letterSpacing: tracking,
        fontFamily,
        whiteSpace: 'pre',
      }}
    >
      {text}
      <span style={{ ...base, color: '#ff3b3b', transform: `translateX(${-dx}px)`, opacity: 0.85, mixBlendMode: 'screen' }}>
        {text}
      </span>
      <span style={{ ...base, color: brand.accent, transform: `translateX(${dx}px)`, opacity: 0.85, mixBlendMode: 'screen' }}>
        {text}
      </span>
      <span style={{ ...base, color: brand.text }}>{text}</span>
    </div>
  );
};

/**
 * Monospace text typed out character-by-character with a blinking block cursor.
 * Hard-steps (no per-letter fade) so it reads like a real terminal.
 */
export const TypeOut: React.FC<{
  text: string;
  startFrame?: number;
  framesPerChar?: number;
  fontSize: number;
  color?: string;
  tracking?: number;
  showCursor?: boolean;
  prefix?: string;
}> = ({
  text,
  startFrame = 0,
  framesPerChar = 1.5,
  fontSize,
  color = brand.textDim,
  tracking = 3,
  showCursor = true,
  prefix,
}) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;
  const shown = Math.max(0, Math.min(text.length, Math.floor(t / framesPerChar)));
  const done = shown >= text.length;
  // 1s hard-step blink, per the design system's cursor rule.
  const blinkOn = Math.floor(frame / 15) % 2 === 0;

  if (t < 0) return null;

  return (
    <div
      style={{
        fontFamily: FONT_MONO,
        fontSize,
        fontWeight: 600,
        letterSpacing: tracking,
        color,
        whiteSpace: 'pre',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {prefix ? <span style={{ color: brand.accent, marginRight: 10 }}>{prefix}</span> : null}
      {text.slice(0, shown)}
      {showCursor && (!done || blinkOn) ? (
        <span
          style={{
            display: 'inline-block',
            width: fontSize * 0.55,
            height: fontSize * 1.05,
            backgroundColor: brand.accent,
            marginLeft: 4,
            opacity: done ? (blinkOn ? 1 : 0) : 1,
          }}
        />
      ) : null}
    </div>
  );
};

/**
 * Technical drafting frame: corner brackets, centre crosshair ticks and
 * hairline rules. Draws in from the corners.
 */
export const TechFrame: React.FC<{ startFrame?: number; inset?: number }> = ({
  startFrame = 0,
  inset = 56,
}) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;
  const draw = interpolate(t, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const len = 96 * draw;
  const line = `1px solid ${brand.borderStrong}`;
  const corner = (pos: React.CSSProperties, h: boolean) => (
    <div style={{ position: 'absolute', ...pos, ...(h ? { width: len, height: 1 } : { width: 1, height: len }), backgroundColor: brand.accent, opacity: 0.55 }} />
  );

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* Four corner brackets. */}
      {corner({ left: inset, top: inset }, true)}
      {corner({ left: inset, top: inset }, false)}
      {corner({ right: inset, top: inset }, true)}
      {corner({ right: inset, top: inset }, false)}
      {corner({ left: inset, bottom: inset }, true)}
      {corner({ left: inset, bottom: inset }, false)}
      {corner({ right: inset, bottom: inset }, true)}
      {corner({ right: inset, bottom: inset }, false)}

      {/* Centre crosshair ticks on each edge. */}
      <div style={{ position: 'absolute', left: '50%', top: inset, width: 1, height: 22 * draw, backgroundColor: brand.accent, opacity: 0.35 }} />
      <div style={{ position: 'absolute', left: '50%', bottom: inset, width: 1, height: 22 * draw, backgroundColor: brand.accent, opacity: 0.35 }} />
      <div style={{ position: 'absolute', top: '50%', left: inset, height: 1, width: 22 * draw, backgroundColor: brand.accent, opacity: 0.35 }} />
      <div style={{ position: 'absolute', top: '50%', right: inset, height: 1, width: 22 * draw, backgroundColor: brand.accent, opacity: 0.35 }} />

      {/* Hairline rules just inside the brackets. */}
      <div style={{ position: 'absolute', left: inset, right: inset, top: inset + 40, height: 1, background: brand.border, opacity: draw * 0.7, border: 0, borderTop: line, borderColor: 'transparent' }} />
    </AbsoluteFill>
  );
};

/** Monospace metadata ticks in the frame corners (resolution, fps, version). */
export const MetaTicks: React.FC<{ startFrame?: number; inset?: number; items?: string[] }> = ({
  startFrame = 0,
  inset = 56,
  items = ['1080×1920', '30 FPS', 'THREADBASE', 'REC ●'],
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - startFrame, [0, 14], [0, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const s: React.CSSProperties = {
    position: 'absolute',
    fontFamily: FONT_MONO,
    fontSize: 18,
    letterSpacing: 2,
    color: brand.textMuted,
    opacity,
  };
  // Bottom ticks sit below the disclaimer line (which lives at bottom: 72).
  const bottom = 26;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div style={{ ...s, left: inset, top: inset - 30 }}>{items[0]}</div>
      <div style={{ ...s, right: inset, top: inset - 30 }}>{items[1]}</div>
      <div style={{ ...s, left: inset, bottom }}>{items[2]}</div>
      <div style={{ ...s, right: inset, bottom, color: brand.live }}>{items[3]}</div>
    </AbsoluteFill>
  );
};
