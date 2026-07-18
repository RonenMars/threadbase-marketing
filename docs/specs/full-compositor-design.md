# Spec — Full Compositor (deferred)

Status: designed, not implemented.
Date: 2026-07-19.

This documents the "full compositor" approach to the Threadbase demo video.
The repo currently ships the **Bookends** approach (see `README.md`): Remotion
generates only the intro and outro, and a phone screen recording plays between
them, cut and beat-timed in a timeline editor (CapCut / Photos).

The full compositor is a larger build that eliminates the timeline editor
entirely. It is deferred until the demo format is stable enough to justify the
cost — the trade-offs section explains why.

## Goal

Remotion owns the entire timeline. The raw phone recording is the only manual
artifact; everything else — captions, overlays, speed-ramps, transitions, the
device frame — is code, rendered with a single `npm run render`. The output is
fully reproducible and re-renderable when copy, timing, or branding changes.

## Non-goals

- Replacing the phone as the recording device. We still screen-record the real
  app against `demo-server.js`; Remotion never drives or records the app.
- Generating synthetic app footage. The recording is real UI.
- A general video editor. This composites *one* known demo with known beats.

## Architecture

```
DemoVideoFull
├── PhoneFrame (AbsoluteFill)
│   └── OffthreadVideo  ← recording, segmented for speed-ramps
├── CaptionTrack        ← reads beats.ts, renders lower-thirds per range
├── OverlayTrack        ← highlight rings / arrows keyed to beats
└── Bookends            ← reuse IntroReveal + OutroCTA from the Bookends build
```

The bookend components (`IntroReveal`, `OutroCTA`, `AnimatedWord`, `brand.ts`)
are reused as-is. The new surface area is the middle.

### Beat manifest (`beats.ts`)

The single source of truth for timing. Captions and overlays are **data**, not
dragged clips — this is the whole point of the approach. Each beat maps a
footage frame range to what should be on screen. Frame ranges are expressed in
*footage frames* (relative to the recording), then offset by the intro length
at composition time.

```ts
type Beat = {
  fromSec: number;         // seconds into the recording
  toSec: number;
  caption?: string;        // lower-third text
  highlight?: Rect;        // optional region to ring/arrow
  speed?: number;          // playbackRate for this segment (1 = realtime)
};

// Derived from demo/README.md's scripted beats:
// thinking → Edit → Bash tests 20x → "20 passed" → green → waiting.
export const beats: Beat[] = [ /* ... */ ];
```

Because the demo server script is deterministic (fixed delays in
`runLiveScript`), the beat timings are known in advance and only need
calibration once against a real recording.

### Speed-ramps

Dead time (manual URL entry in the onboarding cut, the multi-second test run)
is compressed by splitting the recording into consecutive `<OffthreadVideo>`
segments with `trimBefore` / `trimAfter` and adjusting playback so each segment
occupies fewer composition frames than source frames. The beat manifest owns
the segment boundaries so captions stay aligned after ramping.

### Phone frame & lower-thirds

- A device bezel (`AbsoluteFill` with an SVG/PNG frame) wraps the footage so it
  reads as "on a phone" even in landscape contexts (LinkedIn, X).
- Lower-thirds animate in/out with the same `spring()` vocabulary as the
  bookends, positioned to avoid the app's own bottom input bar.

### Dynamic metadata

Same `calculateMetadata` + `mediabunny` measurement as the Bookends build, but
total duration is computed from the *ramped* segment lengths in `beats.ts`, not
the raw recording length.

## Data flow

1. Record phone → `public/demo-raw.mov`.
2. `calculateMetadata` measures it; `beats.ts` defines segments + captions.
3. `DemoVideoFull` lays out phone frame + footage segments + caption/overlay
   tracks + bookends.
4. `npm run render` → `out/threadbase-demo.mp4`.

## Testing / verification

- Studio preview (`npm run dev`) with the timeline as the primary check — scrub
  each beat boundary and confirm captions land on the right frame.
- A calibration checklist: record once, note actual beat timestamps, update
  `beats.ts`, re-render. Repeat until captions are frame-accurate.
- No unit tests — this is presentational; correctness is "does it look right",
  judged in preview.

## Trade-offs — why this is deferred

- **Caption timing in code is slow to iterate.** Nudging a caption by 4 frames
  means editing `beats.ts` and re-checking in preview, versus dragging a clip on
  a timeline. For a format still in flux, the timeline wins.
- **Speed-ramp math is fiddly.** Keeping captions aligned across ramped
  segments is the error-prone part; a timeline editor shows misalignment
  visually and immediately.
- **Payoff scales with reuse.** The full compositor pays off when the same demo
  is re-rendered many times (locale variants, copy A/B tests, rebrands). Until
  then, the Bookends build plus a timeline editor is less total effort.

Adopt this once the demo script and copy are locked and we expect to re-render
the same video repeatedly.
