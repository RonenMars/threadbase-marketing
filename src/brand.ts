// Threadbase brand tokens.
//
// Palette + copy for the MARKETING surface. Sourced from the Threadbase Design
// System (claude.ai/design project b841e42d) and reconciled against the live
// tb-landing site (app/globals.css) — the two share the same DNA: near-black
// blue canvas, cyan-blue "thread" accent, warm-amber "live/now" signal.
//
// This is intentionally NOT imported from any app repo, so this project stays
// standalone. If the landing palette changes, update these by hand.
//
// Note: the in-app dark theme (tb-mobile) uses the flatter GitHub-dark palette
// (#0d1117 / #58a6ff). The recording shows that; the bookends deliberately use
// the glossier landing palette below, which is the canonical marketing look.

export const brand = {
  name: 'Threadbase',
  eyebrow: 'Claude Code + Codex CLI, untethered',
  tagline: "Built for developers who don't want to be chained to their desks.",
  headline: 'Your terminal. Live. In your pocket.',
  cta: 'Join the Beta',
  disclaimer: 'Not affiliated with Anthropic. Claude Code is a product of Anthropic.',

  // Ink / surface scale — near-black with a blue undertone.
  bg: '#070b11',
  bgDeep: '#04070d',
  surface: '#0b1320',
  card: '#111c2d',
  border: 'rgba(116,151,199,0.18)',
  borderStrong: 'rgba(120,188,255,0.28)',

  // Foreground.
  text: '#f4f8ff',
  textDim: '#9fb0c9',
  textMuted: '#607089',

  // Two-color signal system. Blue = thread / data / navigate. Amber = live / now / running.
  accent: '#63b3ff',
  accentStrong: '#b5e3ff',
  accentHover: '#8ed1ff',
  live: '#f08a24',
  liveHover: '#ffab52',

  // Semantic status.
  success: '#3fb950',
  waiting: '#d29922',
  danger: '#f85149',

  // Glow (the brand's primary expressive move — Gaussian halos on stateful bits).
  blueGlow: 'rgba(99,179,255,0.45)',
  amberGlow: 'rgba(240,138,36,0.5)',
} as const;

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Bookend lengths, in frames.
export const INTRO_FRAMES = 90; // 3.0s — a touch longer so the mark can build.
export const OUTRO_FRAMES = 105; // 3.5s
export const CROSSFADE_FRAMES = 15;

// Fallback recording length used until the real file is measured at render
// time by calculateMetadata (see DemoVideo). Only applies when no demo-raw.mov
// is present — real captures measure their own length. Kept short (4s) so the
// bookends-only clip deployed to the demo page stays tight.
export const FALLBACK_FOOTAGE_FRAMES = 120;

// Motion — restrained/cinematic, borrowed from the landing site.
// Standard easing for almost everything appearing on screen.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const; // cubic-bezier, "out"
export const EASE_STANDARD = [0.2, 0.7, 0.2, 1] as const;

// The signature 48px terminal grid line color.
export const GRID_LINE = 'rgba(255,255,255,0.04)';
export const GRID_SIZE = 48;
