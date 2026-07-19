# Demo page (`site/`)

Static one-page player for the rendered demo video, deployed to Vercel
(`tb-demo`, aliased at `tb-demo-one.vercel.app`).

Only `index.html` and this README are source-controlled. `threadbase-demo.mp4`
and `icon.png` are copied in from a render and are gitignored — regenerate them
before deploying.

## Deploy

```bash
# 1. Render the video (bookends-only until a public/demo-raw.mov exists).
npm run render                       # → out/threadbase-demo.mp4

# 2. Refresh the page's assets.
cp out/threadbase-demo.mp4 site/threadbase-demo.mp4
cp public/icon.png site/icon.png

# 3. Deploy the static dir.
cd site && vercel deploy --prod --scope ronen-mars-projects
```

The middle of the clip is a placeholder (~15s) until a phone capture is dropped
in at `public/demo-raw.mov`; its length is `FALLBACK_FOOTAGE_FRAMES` in
`src/brand.ts`.
