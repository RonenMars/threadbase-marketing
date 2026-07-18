// Threadbase brand tokens.
//
// COPIED from tb-mobile/constants/theme.ts (the "default" dark theme) — this
// file is intentionally NOT imported from the app repo, so this project stays
// standalone. If the app's palette changes, update these by hand.

export const brand = {
  name: 'Threadbase',
  tagline: 'Your Claude Code sessions. In your pocket.',
  // Fill in when the public listing exists:
  cta: 'Join the TestFlight beta',

  bg: '#0d1117',
  surface: '#161b22',
  card: '#21262d',
  border: '#30363d',

  text: '#e6edf3',
  textDim: '#7d8590',
  accent: '#58a6ff',
  success: '#3fb950',
  waiting: '#d29922',
} as const;

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Bookend lengths, in frames.
export const INTRO_FRAMES = 75; // 2.5s
export const OUTRO_FRAMES = 90; // 3.0s
export const CROSSFADE_FRAMES = 15;

// Fallback recording length used until the real file is measured at render
// time by calculateMetadata (see DemoVideo). ~15s placeholder.
export const FALLBACK_FOOTAGE_FRAMES = 450;
