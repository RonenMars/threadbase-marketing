# threadbase-marketing

Marketing videos for the Threadbase app: one HyperFrames workspace, three
videos, all 1080×1080 and silent.

| Video | `data-composition-id` | Length | What it sells |
|---|---|---|---|
| [`compositions/threadbase-hero-drawn/`](compositions/threadbase-hero-drawn/) | `threadbase-hero-drawn` | 19s | The threadbase.sh homepage hero: search-first, illustrated |
| [`compositions/threadbase-hero/`](compositions/threadbase-hero/) | `threadbase-hero` | 35.3s | The screenshot hero, every claim in `CLAIMS.md` |
| [`compositions/threadbase-pairing/`](compositions/threadbase-pairing/) | `threadbase-pairing` | 26.7s | LinkedIn promo: pairing is one command and one scan |

`index.html` at the root is the master reel (`main`, 81s): it mounts the
three back to back. Each video's own `index.html` is a `<template>`
sub-composition, and every path inside it resolves from the repo root
(`compositions/<video>/assets/...`).

Standalone project — no dependency on the `tb-mobile` app repo. The captured
app screens the videos are built from are committed next to each video.

## Workflow

```bash
npm run dev       # Studio — preview / scrub (long-running; never pipe it through head/tail)
npm run lint      # HyperFrames lint
npm run check     # lint, runtime, layout, motion, WCAG contrast
npm run render -- --quality high --output renders/reel.mp4
```

`render` renders the master reel; cut one video out of it by its start and
length (drawn 0s/19s, hero 19s/35.3s, pairing 54.3s/26.7s):

```bash
ffmpeg -ss 19 -t 35.3 -i renders/reel.mp4 -c:v libx264 -crf 18 renders/threadbase-hero.mp4
```

Renders are gitignored.

A video rebuilt from its storyboard (`compositions/<video>/scripts/assemble.sh`)
comes out as a standalone page and is turned back into a template by
`scripts/to-subcomposition.mjs <video>`, which `assemble.sh` runs last.

## Pairing promo

`compositions/threadbase-pairing/` — a 22.5s, 1080×1080 LinkedIn promo answering one
objection: *is this a pain to set up?* Six frames, `tb pair` → QR → "Thread is
live." → the populated hub → CTA. Silent by design; LinkedIn autoplays muted, so
every beat reads from burned-in text alone.

Nothing here is hand-timed in an editor. The whole timeline is
HTML with `data-*` timing attributes, and `render` is reproducible.

**The plan is the source of truth, in four layers:** `BRIEF.md` (why, and every
confirmed decision) → `STORYBOARD.md` (what, frame by frame, plus the
video-wide direction) → `frame.md` (the design system) → `compositions/frames/`
(the frames themselves), all inside the video's folder. Read them in that order; a decision that lives only in
chat is a decision the next session never sees.

### State

The six frames are **wireframes**. Each phone is a labelled placeholder block,
not yet the real screen — the current render is for judging pacing and reading
order, not for publishing.

To finish: drop the real screens from `source-screens/` into the phone slots,
and replace Frame 3's placeholder with the iPhone footage described in
[`CAPTURE-IPHONE.md`](compositions/threadbase-pairing/CAPTURE-IPHONE.md). That capture
is the one shot the simulator cannot produce — `expo-camera` gets no frame in a
simulator, so a real QR scan has to be filmed on a device.

### Where the screens come from

`source-screens/` holds seven real captures from an iPhone 17 / iOS 26.4
simulator, produced deterministically by Maestro against a mock server rather
than filmed by hand. They regenerate in `tb-mobile` with:

```bash
npm run test:e2e:promo:pairing        # and :multi-machine
```

Those flows also record the simulator to MP4. They landed in
[tb-mobile#635](https://github.com/RonenMars/threadbase-mobile/pull/635) and go
past this repo's original non-goal — the full-compositor spec assumed a human
would always drive and record the app.
