# threadbase-marketing

Remotion pipeline that wraps a phone screen recording of the Threadbase app in a
branded intro reveal and outro CTA, rendering one shareable MP4.

This is the **Bookends** approach: Remotion generates the chrome (intro/outro);
you record and beat-time the app footage yourself. The larger "full compositor"
approach (Remotion owns the whole timeline) is designed but not built — see
[`docs/specs/full-compositor-design.md`](docs/specs/full-compositor-design.md).

Standalone project — no dependency on the `tb-mobile` app repo.

**Live demo:** <https://tb-demo-one.vercel.app> — the rendered clip on a static page, deployed to Vercel.

## Setup

```bash
npm install
```

## Workflow

1. **Record the app on your phone.**
   Run the demo server (in `tb-mobile`: `node demo/demo-server.js`), connect the
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

## README gif variant

Video-editor gif exports are bloated. Render the MP4, then convert with ffmpeg:

```bash
ffmpeg -i out/threadbase-demo.mp4 \
  -vf "fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  -loop 0 out/threadbase-demo.gif
```

To crop to square for a README/social embed, add `crop=1080:1080:0:420` to the
`-vf` chain (offsets the crop below the intro's centered content).

## What's in the intro / outro

- **Intro** (`src/IntroReveal.tsx`): app icon springs in, "Threadbase" wipes in
  letter-by-letter, an accent-blue underline draws left-to-right, tagline fades
  up. 2.5s.
- **Outro** (`src/OutroCTA.tsx`): wordmark + icon, running/waiting status dots
  (a callback to the hub), and a gently pulsing CTA button. 3s.

Edit copy, colors, and CTA text in `src/brand.ts`.
