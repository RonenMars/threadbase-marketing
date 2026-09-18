# threadbase-marketing

Marketing video for the Threadbase app. Two pipelines live here, and which one
you want depends on whether the hero is *footage* or *composed frames*.

| Pipeline | Framework | Use it when | Aspect |
|---|---|---|---|
| **Bookends** (below) | Remotion | A phone screen recording is the video; you want branded chrome around it | 1080×1920 portrait |
| **[Pairing promo](videos/threadbase-pairing/)** | HyperFrames | The video is composed from captured app screens, with overlay copy carrying the argument | 1080×1080 square |
| **[Mobile features](videos/threadbase-mobile-features/)** | HyperFrames | The video demonstrates what developers can do after pairing: terminal, queue, and search | 1080×1080 square |

The full-compositor approach — the whole timeline owned by code, no timeline
editor — was
[designed in July and deferred](docs/specs/full-compositor-design.md). It now
exists, built in HyperFrames rather than Remotion, as the pairing promo. That
spec is kept for its reasoning and trade-offs, but read it as history: the
"deferred" status no longer holds.

**Live demo:** <https://tb-demo-one.vercel.app> — the rendered clip on a static page, deployed to Vercel.

Standalone project — no dependency on the `tb-mobile` app repo. The captured app
screens the pairing promo is built from are committed under
`videos/threadbase-pairing/source-screens/`.

## Bookends pipeline (Remotion)

### Setup

```bash
npm install
```

### Workflow

1. **Record the app on your phone.**
   Run the mock server (in `tb-mobile`: `node e2e/mock-server.js`), connect the
   app to it, and screen-record the flow you want. Trim it to the beats you want
   *before* handing it to Remotion — timeline editors are faster at that than
   code. Cross-platform aspect is portrait 1080×1920.

2. **Drop the recording in `public/`.**
   Rename it to `demo-raw.mov` (the composition looks for exactly that name).
   Recordings are gitignored — they never get committed.

3. **Preview.**
   ```bash
   npm run dev
   ```
   Opens Remotion Studio. The composition auto-sizes to your recording's length
   (measured with `mediabunny`), with the 2.5s intro and 3s outro added and
   crossfaded into the footage.

4. **Render.**
   ```bash
   npm run render          # → out/threadbase-demo.mp4
   ```

### README gif variant

Video-editor gif exports are bloated. Render the MP4, then convert with ffmpeg:

```bash
ffmpeg -i out/threadbase-demo.mp4 \
  -vf "fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  -loop 0 out/threadbase-demo.gif
```

To crop to square for a README/social embed, add `crop=1080:1080:0:420` to the
`-vf` chain (offsets the crop below the intro's centered content).

### What's in the intro / outro

- **Intro** (`src/IntroReveal.tsx`): app icon springs in, "Threadbase" wipes in
  letter-by-letter, an accent-blue underline draws left-to-right, tagline fades
  up. 2.5s.
- **Outro** (`src/OutroCTA.tsx`): wordmark + icon, running/waiting status dots
  (a callback to the hub), and a gently pulsing CTA button. 3s.

Edit copy, colors, and CTA text in `src/brand.ts`.

---

## Pairing promo (HyperFrames)

`videos/threadbase-pairing/` — a 22.5s, 1080×1080 LinkedIn promo answering one
objection: *is this a pain to set up?* Six frames, `tb pair` → QR → "Thread is
live." → the populated hub → CTA. Silent by design; LinkedIn autoplays muted, so
every beat reads from burned-in text alone.

Unlike Bookends, nothing here is hand-timed in an editor. The whole timeline is
HTML with `data-*` timing attributes, and `render` is reproducible.

```bash
cd videos/threadbase-pairing
npx hyperframes preview     # Studio at localhost:3002 — storyboard + timeline
npx hyperframes check       # lint, runtime, layout, motion, WCAG contrast
npx hyperframes render --quality high --output renders/video.mp4
```

Do not pipe `preview` through `head`/`tail` — it closes the stream and kills the
server.

**The plan is the source of truth, in four layers:** `BRIEF.md` (why, and every
confirmed decision) → `STORYBOARD.md` (what, frame by frame, plus the
video-wide direction) → `frame.md` (the design system) → `compositions/frames/`
(the frames themselves). Read them in that order; a decision that lives only in
chat is a decision the next session never sees.

### State

The pairing promo now uses real captured screens for the handshake and live-hub
beats. Frame 3 uses the committed scan-to-pair capture; Frames 4 and 5 use the
handshake and populated-hub captures. Frame 3's real camera view remains a future
replacement if a physical-device scan recording is produced.

To finish: drop the real screens from `source-screens/` into the phone slots,
and replace Frame 3's placeholder with the iPhone footage described in
[`CAPTURE-IPHONE.md`](videos/threadbase-pairing/CAPTURE-IPHONE.md). That capture
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

### Brand palette

`frame.md` carries the same ink/surface/card values as `src/brand.ts`
(`#070b11` / `#0b1320` / `#111c2d`), derived independently by capturing
threadbase.sh. They are **not** wired together: change one and change the other
by hand, same as the note at the top of `src/brand.ts`.

## Mobile features promo (HyperFrames)

`videos/threadbase-mobile-features/` is the companion feature-demo cut adopted
from the separate Threadbase Mobile promo project. It deliberately stays separate
from the pairing ad: pairing answers how to connect, while this cut answers what
you can do after connecting.

```bash
cd videos/threadbase-mobile-features
npm run check
npm run render
```
