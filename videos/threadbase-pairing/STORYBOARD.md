---
format: 1080x1080
duration: 26.7s
message: "Pairing Threadbase to your own machine takes one command and one scan"
arc: "hook (skip the readme) → bridge (install/serve/pair) → step 1 (scan) → step 2 (handshake) → wow (live hub) → trust → CTA"
audience: "developers already running Claude Code or Codex daily"
mode: collaborative
music: none
---

## Revision — 2026-08-16

Restructured from the original 6-frame cut after Frame 1 ("one command.") and Frame 3
("one scan.") were found to say and show nearly the same thing — same claim, same QR,
twice. The pairing QR now carries through Frames 2 and 3 as one continuous action, and a new cold-open stinger replaces the old
abstract hook, and the "Pull a thread. Watch it weave." welcome-screen beat was cut entirely
(not folded in elsewhere) to keep the frame count flat. Frame count unchanged at 6; total
runtime 22.5s → 26.7s after the requested timing pass.

## Frame 1 — Skip the README

- status: built
- src: compositions/frames/01-skip-the-readme.html
- duration: 3s
- transition_in: cut
- scene: "Type-only flash on the black plane: '// skip the readme.md'."
- blueprint: kinetic-type-beats
- poster: 0.4

Pure stinger — no product, no terminal, nothing to read but the line. Its job is only to
catch the eye and set up Frame 2 as the payoff: the promise is "no setup doc," the very
next frame proves it in three lines.

On-screen text: `// skip the readme.md`, in the video's own code-comment register (the `//`
prefix already established by every later eyebrow).

## Frame 2 — Install, serve, pair

- status: built
- src: compositions/frames/02-one-command.html
- duration: 7.5s
- transition_in: cut
- scene: "Three commands type in sequence on the black plane; the pair QR resolves beside them after the last one."
- blueprint: prompt-type-submit-generate
- asset_candidates: source-screens/promo-02-03b-tb-pair-command.png
- poster: 3.1
- handoff_out: "QR block — x 640, y 176, 300x300, scale 1, opacity 1, static (no motion at the cut)"

The real flow is three commands, not one — install, start the streamer, then pair prints
the QR. Typed small-to-large (install muted and quick, `serve` mid-weight, `pair` the
brightest/boldest — it's the one that matters) so the hierarchy reads even at a glance.
The QR is the promise stated without a word of marketing: this is the whole computer side.

No product name yet — the phone doesn't appear until Frame 3.

## Frame 3 — Scan to connect

- status: built
- src: compositions/frames/03-one-scan.html
- duration: 4.2s
- transition_in: cut
- scene: "The QR rises in, the phone follows, then a reticle locks and scans the code once. A small server illustration appears beneath the QR; App Store / Google Play badges land after the scan."
- blueprint: device-surface-showcase
- handoff_in: "the Frame 2 QR reappears in the same position, then the phone enters and scans it"
- asset_candidates: source-screens/promo-02-03-scan-to-pair.png, source-screens/promo-02-02-connect-chooser.png
- poster: 1.9

The phone-side half of Frame 2's pairing, and where "get the app" lives now that the old
welcome-screen frame is gone. The same code returns as a deliberate handoff: QR first,
phone second, then a reticle lock and one scan-line sweep make the scan causal. A compact
server illustration appears below the QR as the destination of the handoff. The store
badges answer "how do I get this" only after that interaction lands.

Overlay: `// on your phone` → "scan to connect." App Store + Google Play marks, then
"iOS and Android **(BETA)**". No URL here — Frame 6 owns the CTA link; repeating it doubles
a line for no reason.

> If physical-iPhone footage arrives (see `CAPTURE-IPHONE.md` — currently stale, needs a
> rewrite against this frame list), it replaces the static pane and reticle with a real
> camera viewfinder reading the QR. Until then the static pane + reticle carry it.

## Frame 4 — Thread is live

- status: built
- src: compositions/frames/04-thread-is-live.html
- duration: 3s
- transition_in: cut
- scene: "The phone carries HANDSHAKE COMPLETE, cropped to the middle band; the overlay says 'That's it.'"
- blueprint: titlecard-reveal
- asset_candidates: source-screens/promo-02-05-thread-is-live.png
- poster: 2.4

The payoff. Headline shortened from "That's the whole setup." to "That's it." — the
screenshot already carries `HANDSHAKE COMPLETE`, `Thread is live.`, and the green check;
the overlay only needs the closing beat, not a restatement.

Crop the screenshot to the middle band — the full shot carries a "Back" arrow at the top
and a blue "Enter Threadbase" button at the bottom that don't belong to this beat.

## Frame 5 — Everything, live

- status: built
- src: compositions/frames/05-everything-live.html
- duration: 4s
- transition_in: cut
- scene: "The hub populated — live sessions listed, LIVE · n counting."
- blueprint: device-surface-showcase
- asset_candidates: source-screens/promo-02-06-hub-populated.png
- poster: 1.8

Unchanged from the original cut. The proof that pairing bought something — real sessions,
real statuses, on the phone.

Overlay: "every session. live. in your pocket."

## Frame 6 — Your own server

- status: built
- src: compositions/frames/06-your-own-server.html
- duration: 5s
- transition_in: cut
- scene: "Type-only close on the black plane: the trust line, the URL, then a CTA QR floats up from the bottom beside a vertical App Store / Google Play stack."
- blueprint: kinetic-type-beats
- poster: 1.8

The differentiator, stated plainly, plus a new close: a QR under the URL that resolves to
the same `threadbase.sh/betas` link and floats up from below — a later scan-to-visit CTA,
not another pairing beat.

On-screen text, in beats: "your own server. no telemetry." → `threadbase.sh/betas` → CTA QR → stacked App Store / Google Play badges. The existing
"iOS and Android **(BETA)**" subtitle remains in place above the CTA elements.

## Video direction

**Motion doctrine.** Every frame develops across its full duration rather than front-loading: eyebrow → headline → supporting element → receipt, each 0.2–0.4s apart.
Nothing moves after its beat lands; the frame settles and holds so a muted viewer can read it.

**The margin is 84px** on the left for every frame. Where the phone sits on the right (596–1001), the text column is 84–556 and no element may cross 556; Frame 3 mirrors this with the phone on the left (78–483) and text at 640–1012.

**One pairing action, one CTA action.** Frames 2 and 3 hand the same pairing code from computer to phone so the scan reads as one continuous interaction. Frame 6's QR is a distinct, later CTA (the marketing URL, not a pairing handshake) and floats up as a separate object.
