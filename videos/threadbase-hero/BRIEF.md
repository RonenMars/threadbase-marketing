---
workflow: product-launch-video
flow: automation
storyboard: yes
message: "Every coding agent, every machine, one phone — and Threadbase can't read a word of it"
destination: homepage-hero (threadbase landing, ~450px square column, muted autoplay, looped)
aspect: 1080x1080
language: en (captions keyed in captions.en.json for later ar / he / ru)
audience: developers hearing about Threadbase for the first time, already running Claude Code, Codex or GitHub Copilot in a terminal
length: 30–40s, seamless loop
angle: what-it-is — the control-plane story (hub → gate → approve → next prompt → fresh session → trust), paced for a first read
---

## Intent

The homepage hero has one job: a first-time visitor understands **what Threadbase is** before they
scroll. Not a sizzle, not a LinkedIn cut. The pairing promo (`../threadbase-pairing`) sells one
objection to people who already know the product; this video explains the product.

Thesis, in the viewer's language: *your agents keep working while you are away from the desk,
and your phone is where they come to ask.* Every scene is one idea, 5–7s, one caption of at most
12 words that reads aloud at a relaxed pace, on screen for at least 3.5s. No transition faster
than 0.6s. Muted autoplay — nothing depends on audio; there is no SCRIPT.md and no TTS.

The hero picks come from `FEATURES.md` (approved): one hub for every agent and machine; a push
when the agent needs you; approve from the phone; send the next prompt / start a fresh session;
one command, one scan, your own machine, end-to-end encrypted. Every claim in the video has a
code citation there. The video must **not** say: "queue prompts", "nothing leaves your machine",
multi-select or free-text answers, Cursor, Copilot approval cards, cost figures, or anything that
implies a hosted relay.

## Format decision — 1:1, kept

The brief asked for 1080x1080 and to flag if 4:5 serves better. **Recommendation: stay 1:1.**

- The story's key image is a *pair* of surfaces — a terminal and a phone side by side (frames
  2, 3, 4 and 6). That pairing is landscape-leaning; a square is the tightest frame that still
  holds both at readable size. 4:5 would squeeze the terminal to a sliver.
- Only the single-phone frames (1 and 5) would gain from 4:5, and in a square they already get a
  phone ~720px tall — bigger than the current hero image renders today (`max-w-70`, ~280px).
- Square is also the only shape that drops into the stated ~450px column without changing the
  hero's vertical rhythm. If the column later becomes portrait, re-cut to 4:5 by letting the
  split frames stack (terminal above phone); the storyboard notes where that stack goes.

## Assets

**No website capture.** This video lives *on* the site; its design system is taken straight from
`tb-landing/DESIGN.md` and `app/globals.css` (hand-written `capture/extracted/tokens.json` →
`frame.md` via the `code-editorial` preset, remixed dark, then hand-corrected — see the note at
the top of `frame.md`).

**Screens are derived from the scenario, not from the existing screenshot library.** Per the
approved `FEATURES.md` shot list A–G, each shot is captured in the exact state the scene needs.
Existing captures (`tb-mobile/artifacts/marketing/threadbase-maestro/`, `../threadbase-pairing/
source-screens/`) are reference only — none is reused as-is. Target files go under
`source-screens/` and are committed, as the pairing project does with its own captures.

| Shot | File(s) | State | Who captures |
| --- | --- | --- | --- |
| A | `A-hub.png` | Hub, "Everything" filter: Claude Code (Work Mac, **Needs you**, orange), Codex (Home Mac, Working), Copilot (Linux Devbox, Working). Dark theme, 9:41, demo data. | me — simulator + `e2e/marketing/demo-streamer.js` (add a Copilot session to `demo-data.js`) |
| B1 | `B-terminal-gate.txt` + `.png` | Real Claude Code run stopped at a permission prompt (`Bash(npm test)` or similar), spinner stopped. Text captured verbatim for re-render in a styled terminal panel; PNG kept as proof. | me — real `tb-streamer serve` + Claude Code |
| B2 | `B-lockscreen-push.png` | iPhone lock screen, Threadbase push with title "Needs you · Work Mac · fix/auth-callback", **Allow / Deny** actions expanded. | **user — physical iPhone** (push does not reach the simulator) |
| C1–C3 | `C-permission-card.png`, `C-tap-allow.png`, `C-resumed.png` | Session screen (Live control, Terminal tab): permission card; Allow pressed state; terminal streaming again. | me — real streamer + Claude Code, simulator |
| D1–D3 | `D-compose.png`, `D-typing.png`, `D-working.png` | Composer focused; "Now add tests for the callback" typed; Working state with the new prompt echoed in the transcript. | me |
| E1–E3 | `E-new-session.png`, `E-pick-folder.png`, `E-pick-agent.png` | "+ New session" → folder list on Home Mac → provider picker (Claude Code / Codex / Copilot) → Codex selected. | me |
| F1 | `F-serve-qr.txt` + `.png` | Terminal: `npx @threadbase-sh/streamer serve` banner with the QR, port 8766, real output. | me |
| F2–F3 | `F-scan.png`, `F-encrypted.png` | Camera over the QR; then the pairing success screen "Encrypted from this device to this computer" with fingerprints. | **user — physical iPhone** for the scan; the success screen also works in the simulator via `pair` LAN URL (`../threadbase-pairing/CAPTURE-IPHONE.md` beats 1–9) |
| G | (composite of B1 + C3) | Trust hold: terminal + phone showing the same resumed stream. | built from B1/C3, no new capture |

Device: iPhone 17 Pro frame, dark theme, 9:41, 100% battery, demo project names (`fix/auth-callback`,
`tests/callback.spec.ts`), three machines Work Mac / Home Mac / Linux Devbox.

Self-hosted runtime assets (Step 3): `assets/vendor/gsap.min.js` (copied from the pinned
hyperframes install), `assets/fonts/InterVariable.woff2`, `assets/fonts/JetBrainsMono-Variable.woff2`
(latin + cyrillic subsets, from the Google Fonts repo). **No CDN URL anywhere in the composition**;
verified in Step 3 by a zero-external-requests check on load.

## Customizations

- **Captions in one file.** `captions.en.json` holds every on-screen string keyed
  `f<NN>.<role>` (`f01.kicker`, `f01.headline`, `f02.headline`, `f06.badge.macos`, …).
  Frame HTML carries `data-i18n="f02.headline"` on the element and the English text as its
  rendered content; `scripts/apply-captions.mjs <locale>` rewrites the text from
  `captions.<locale>.json` and sets `dir`/`lang` on each frame root. The JSON is the source;
  the HTML is output. Caption boxes are fixed-width, `text-align: start`, 2-line max at a size
  where 12 words × 1.4 still fit; `he`/`ar` flip to RTL via `dir="rtl"` on the frame root only.
- **Loop.** Frame 7's last frame is pixel-identical to frame 1's first frame (same `stage-bg`
  component, same phone position, same wordmark). The MP4 therefore loops without a cut.
- **Poster = frame 0.** Frame 1 opens with the hub phone, kicker and atmosphere already present;
  only the headline and the machine badges arrive after t=0, so the very first frame reads as a
  poster on its own. `poster.jpg` is extracted from frame 0 of the render.
- Pace: captions enter ≤0.9s into their scene and hold to the scene's end (≥3.5s everywhere);
  crossfades 0.7s; no whip cuts, no glitch, no sub-0.6s moves on text.
- Typography: Inter 600/700 display, JetBrains Mono kickers (uppercase, 0.26em), per `frame.md`.
- Hard boundary copy: frame 7 carries "Threadbase can't read your sessions." verbatim from the
  landing (`docs/no-hosted-service.md`).

## Notes

- Storyboard format per `hyperframes-core/references/storyboard-format.md`; the per-frame
  `captions:` key lists the `captions.en.json` keys the frame owns.
- Frames are built one sub-agent per frame in Step 5 (`compositions/frames/NN-*.html`), assembled
  into `index.html` with a `data-composition-id="main"` root 1080×1080.
- CLI pinned to `hyperframes@0.7.109` (same as the pairing project). Probe
  `npx hyperframes@latest upgrade --project . --check` before Step 3; upgrade only if the delta
  is lint/render fixes.
- User gates: this brief + storyboard (now), then the final render.
