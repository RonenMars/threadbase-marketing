---
workflow: product-launch-video
flow: automation
storyboard: yes
message: "Pairing Threadbase to your own machine takes one scan"
destination: linkedin-feed
aspect: 1080x1080
language: en
audience: developers already running Claude Code or Codex daily
length: 20s
angle: setup-friction
---

## Intent

A short LinkedIn promo for the Threadbase Mobile beta, aimed at developers who already
run Claude Code or Codex every day. The one job: kill the "this is probably a pain to
set up" objection. Run `tb pair` on your machine, scan the QR, and the thread is live —
your own server, your own keys, no cloud account.

Tone follows the app's own onboarding voice, which is already written and already good:
`// AMBIENT CODING`, "Pull a thread. Watch it weave.", "HANDSHAKE COMPLETE",
"Thread is live." Terminal-native, confident, a little wry. Do not rewrite that copy —
feature it.

Silent-first: LinkedIn autoplays muted, so every beat must read from burned-in text
alone. Nothing may depend on audio.

## Assets

Real captured simulator screenshots (1206x2622, iPhone 17, iOS 26.4), from a Maestro
run against the mock server — not mockups. Source directory:
`/Users/ronenmars/dev/ai-tools/tb-mobile/e2e/_artifacts/screenshots/`

- promo-02-01-welcome.png — onboarding step 1; `// AMBIENT CODING`, "Pull a thread. Watch it weave."; the open
- promo-02-02-connect-chooser.png — the two pairing cards, "Scan QR" marked Recommended
- promo-02-03-scan-to-pair.png — "Scan to pair." instructions pane; the QR beat
- promo-02-03b-tb-pair-command.png — the `$ tb pair` copy block; the "run this on your server" shot
- promo-02-04-notifications.png — step 03/NOTIFY, "Wake me only when it counts."
- promo-02-05-thread-is-live.png — HANDSHAKE COMPLETE / "Thread is live." + paired host·port pill; the payoff
- promo-02-06-hub-populated.png — the hub after pairing, live sessions listed; the proof

## Customizations

- Feature the app's own captured screens as the video's assets; do not rebuild the UI in HTML.
- Keep the app's real onboarding copy verbatim as on-screen text where it appears in the shots.
- Close on a single CTA: threadbase.sh/betas.
- Say "your own server, no telemetry" explicitly — it is the differentiator against cloud agent dashboards.
- Name both supported agents on screen — Claude Code and Codex (Frame 5, with provider chips on
  the session rows). Confirmed 2026-08-10.
- Frame 2 carries App Store + Google Play marks above an availability line, with **(BETA)** set bold
  in brand orange as the honesty marker, plus threadbase.sh/betas. Requested 2026-08-10 after being
  told the app is not yet on the App Store (`docs/app-store-submission-status-2026-06-01.md`:
  "Apple submission: NOT yet submitted"); the user reaffirmed and chose (BETA) as the disclosure.
  The marks are the official platform icons resolved through media-use — NOT Apple's "Download on
  the App Store" / Google's "Get it on Google Play" badge lockups, which ship only from their
  brand-resource pages and are not redrawn here. Swap in the real lockups if supplied.

## Notes

- Hook must land in the first 2 seconds, on the friction, never on a logo or app icon.
- No fake repo names on screen; the captures use mock-server fixtures deliberately.
- Screenshots are 1206x2622 (≈1:2.17) going into a 1:1 canvas — they letterbox, which
  leaves deliberate room beside the phone for overlay text. Treat that as the layout,
  not a problem to crop away.
- Storyboard source and the wider flow catalogue:
  `/Users/ronenmars/dev/ai-tools/tb-mobile/docs/marketing/linkedin-video-flows.md`
- Considered and deferred: the storyboard's recommended hero (Flow 1, "the agent asked a
  question. You were at lunch.") has no captured assets and would need mocked frames.
- Registry blocks `vfx-iphone-device` and `app-showcase` could stage the screenshots on a
  real 3D device; decide at the storyboard gate against render cost.
- HeyGen OAuth is expired-but-refreshable on a free plan. Narration is off by design
  (silent-first), so this only affects an optional music bed.
