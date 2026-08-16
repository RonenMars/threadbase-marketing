# Open marketing-video items

## 1. `CAPTURE-IPHONE.md` is stale — needs a rewrite for the current 6-frame cut

The pairing promo was restructured on 2026-08-16 (stinger open → 3-command terminal → phone
scan+badges → handshake → hub → own-server/CTA). `CAPTURE-IPHONE.md`'s shoot list still narrates
the *old* structure (welcome screen → pairing-card chooser → scan-to-pair → handshake → hub,
mapped to old Frames 2-5) and references a `promo-02-01-welcome.png`-style welcome beat that no
longer exists in the video. Real iPhone footage is still an optional upgrade, not a blocker — but
rewrite the beat list against `STORYBOARD.md` before anyone shoots against it, or it'll capture
footage for frames that don't exist anymore.

## 2. Real screen recording for the Bookends demo video (main branch, root Remotion pipeline)

Root-level `src/DemoVideo.tsx` composition still has no real capture. Drop a screen recording of
the actual app at `public/demo-raw.mov` (gitignored, local only — see root `CLAUDE.md`). Without
it, `calculateMetadata` falls back to a short placeholder clip, which is what's currently live at
the deployed Vercel demo page (intro → placeholder → outro, not a real product demo).
