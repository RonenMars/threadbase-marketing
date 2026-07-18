# threadbase-marketing — Claude Instructions

Remotion (React → MP4) pipeline for Threadbase marketing/demo videos. Standalone
Node project — **not** part of the `tb-mobile` Expo app.

## Hard boundaries

- **Never import from `tb-mobile`** (or any app repo). This project stands alone.
  Brand tokens live in `src/brand.ts`, **copied** from
  `tb-mobile/constants/theme.ts` — if the app palette changes, update `brand.ts`
  by hand. Do not add a path/workspace link to the app.
- **Recordings are never committed.** `public/*.mov` / `*.mp4` are gitignored.
  The phone capture goes in `public/demo-raw.mov` locally only.
- **No Expo / Metro / React Native deps.** This is a plain React + Remotion
  project. Keep `package.json` free of RN packages.

## Layout

- `src/index.ts` — Remotion entry (`registerRoot`).
- `src/Root.tsx` — registers the `DemoVideo` composition; `calculateMetadata`
  measures `public/demo-raw.mov` via `mediabunny` so duration tracks the file.
- `src/DemoVideo.tsx` — Sequence: Intro → recording (crossfaded) → Outro.
- `src/IntroReveal.tsx`, `src/OutroCTA.tsx` — the bookends.
- `src/brand.ts` — palette, name, timing constants.
- `docs/specs/full-compositor-design.md` — deferred "full compositor" spec.

## Workflow

```bash
npm install
npm run dev        # Remotion Studio — preview / scrub
npm run render     # → out/threadbase-demo.mp4
npm run typecheck  # tsc --noEmit
```

Drop `demo-raw.mov` in `public/` before rendering. Missing file → the
composition falls back to a placeholder length so Studio still opens.

## Animation conventions

- Everything is driven by `useCurrentFrame()` + `spring()` / `interpolate()` —
  deterministic, no wall-clock or randomness (renders must be reproducible).
- Reuse the `spring()` damping/stiffness vocabulary already in the bookends for
  visual consistency.
