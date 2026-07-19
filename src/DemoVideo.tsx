import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { brand, CROSSFADE_FRAMES, INTRO_FRAMES, OUTRO_FRAMES } from './brand';
import { IntroReveal } from './IntroReveal';
import { OutroCTA } from './OutroCTA';

export type DemoVideoProps = {
  footageSrc: string;
  footageFrames: number;
  hasFootage: boolean;
};

/** Fades in over the first CROSSFADE_FRAMES and out over the last ones. */
const Crossfade: React.FC<{ durationInFrames: number; children: React.ReactNode }> = ({
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, CROSSFADE_FRAMES, durationInFrames - CROSSFADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

/** Shown in place of the recording when public/demo-raw.mov is absent. */
const MissingFootage: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: brand.bg,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 80,
      textAlign: 'center',
    }}
  >
    <span style={{ fontSize: 44, fontWeight: 700, color: brand.text }}>
      Drop your recording at
    </span>
    <span
      style={{
        fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace',
        fontSize: 38,
        color: brand.accent,
        marginTop: 16,
      }}
    >
      public/demo-raw.mov
    </span>
    <span style={{ fontSize: 30, color: brand.textDim, marginTop: 32 }}>
      then re-run to composite it here
    </span>
  </AbsoluteFill>
);

export const DemoVideo: React.FC<DemoVideoProps> = ({
  footageSrc,
  footageFrames,
  hasFootage,
}) => {
  // Bookends overlap the footage by CROSSFADE_FRAMES so intro dissolves into
  // the recording and the recording dissolves into the outro.
  const footageStart = INTRO_FRAMES - CROSSFADE_FRAMES;
  const outroStart = footageStart + footageFrames - CROSSFADE_FRAMES;

  return (
    <AbsoluteFill style={{ backgroundColor: brand.bg }}>
      <Sequence durationInFrames={INTRO_FRAMES} name="Intro">
        <IntroReveal />
      </Sequence>

      {hasFootage ? (
        // Real recording overlaps the bookends so it dissolves in and out.
        <Sequence from={footageStart} durationInFrames={footageFrames} name="Recording">
          <Crossfade durationInFrames={footageFrames}>
            <OffthreadVideo src={footageSrc} />
          </Crossfade>
        </Sequence>
      ) : (
        // Placeholder (no capture yet) sits between the bookends without the
        // overlap, so it never bleeds through the intro/outro cards.
        <Sequence
          from={INTRO_FRAMES}
          durationInFrames={footageFrames - CROSSFADE_FRAMES * 2}
          name="Recording (placeholder)"
        >
          <MissingFootage />
        </Sequence>
      )}

      <Sequence from={outroStart} durationInFrames={OUTRO_FRAMES} name="Outro">
        <OutroCTA />
      </Sequence>
    </AbsoluteFill>
  );
};

export const defaultDemoProps: DemoVideoProps = {
  footageSrc: staticFile('demo-raw.mov'),
  // footageFrames + hasFootage are replaced by calculateMetadata; see Root.tsx
  footageFrames: 0,
  hasFootage: false,
};
