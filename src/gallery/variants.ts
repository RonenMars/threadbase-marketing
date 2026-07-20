// Bookend style variants — four takes on "techy / edgier / sharper", all inside
// the brand's dark-IDE rules (glow is the expressive move, the grid is the only
// repeating pattern, nothing overshoots).
//
// Preview each in Studio: DemoVideo-terminal / -glitch / -precision / -combo.

export type VariantKey = 'terminal' | 'glitch' | 'precision' | 'combo';

export type Variant = {
  /** Corner radius for cards/CTA. Lower = sharper. */
  radius: number;
  /** Wordmark letter-spacing, px. Negative = tight. */
  wordTracking: number;
  /** Mono type-out + blinking cursor on the eyebrow / wordmark. */
  typeOut: boolean;
  /** CRT scanline overlay. */
  scanlines: boolean;
  /** RGB channel-split on the wordmark. */
  glitch: boolean;
  /** Corner brackets, crosshairs and hairline measurement rules. */
  techFrame: boolean;
  /** Monospace metadata ticks (resolution, version) in the frame corners. */
  metaTicks: boolean;
  /** Hard-step reveals instead of soft fades. */
  hardCuts: boolean;
};

export const VARIANTS: Record<VariantKey, Variant> = {
  // Reads like a dev tool booting: typed mono, blinking cursor, scanlines.
  terminal: {
    radius: 4,
    wordTracking: -2,
    typeOut: true,
    scanlines: true,
    glitch: false,
    techFrame: false,
    metaTicks: false,
    hardCuts: true,
  },

  // Loudest: RGB channel-split wordmark + slice jitter. Mirrors the landing
  // page's chromatic-aberration title treatment.
  glitch: {
    radius: 6,
    wordTracking: -3,
    typeOut: false,
    scanlines: false,
    glitch: true,
    techFrame: false,
    metaTicks: false,
    hardCuts: true,
  },

  // Cold and exact: drafting marks, crosshairs, hairline rules, mono metadata.
  precision: {
    radius: 2,
    wordTracking: 2,
    typeOut: false,
    scanlines: false,
    glitch: false,
    techFrame: true,
    metaTicks: true,
    hardCuts: false,
  },

  // Everything, tuned so the motifs land in sequence rather than at once.
  combo: {
    radius: 4,
    wordTracking: -1,
    typeOut: true,
    scanlines: true,
    glitch: true,
    techFrame: true,
    metaTicks: true,
    hardCuts: true,
  },
};
