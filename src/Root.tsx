import React from 'react';
import { Composition, staticFile } from 'remotion';
import { Input, ALL_FORMATS, UrlSource } from 'mediabunny';
import {
  FALLBACK_FOOTAGE_FRAMES,
  FPS,
  HEIGHT,
  INTRO_FRAMES,
  OUTRO_FRAMES,
  CROSSFADE_FRAMES,
  WIDTH,
} from './brand';
import { DemoVideo, defaultDemoProps, type DemoVideoProps } from './DemoVideo';

/**
 * Measures the dropped recording so the composition length tracks whatever file
 * is in public/. If the file is missing (fresh clone, no recording yet), fall
 * back to a placeholder length so Studio still opens.
 */
async function measureFootageFrames(src: string): Promise<number | null> {
  try {
    const input = new Input({
      formats: ALL_FORMATS,
      source: new UrlSource(src, { getRetryDelay: () => null }),
    });
    const durationInSeconds = await input.computeDuration();
    return Math.floor(durationInSeconds * FPS);
  } catch {
    // Missing / unreadable recording (fresh clone, no capture yet).
    return null;
  }
}

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DemoVideo"
      component={DemoVideo}
      durationInFrames={INTRO_FRAMES + FALLBACK_FOOTAGE_FRAMES + OUTRO_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={defaultDemoProps}
      calculateMetadata={async ({ props }) => {
        const measured = await measureFootageFrames(staticFile('demo-raw.mov'));
        const hasFootage = measured !== null;
        const footageFrames = measured ?? FALLBACK_FOOTAGE_FRAMES;
        const total =
          INTRO_FRAMES + footageFrames + OUTRO_FRAMES - CROSSFADE_FRAMES * 2;
        return {
          durationInFrames: total,
          props: { ...props, footageFrames, hasFootage } satisfies DemoVideoProps,
        };
      }}
    />
  );
};
