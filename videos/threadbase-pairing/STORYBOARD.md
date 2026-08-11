---
format: 1080x1080
duration: 22.5s
message: "Pairing Threadbase to your own machine takes one command and one scan"
arc: "BAB — before (friction) → bridge (tb pair) → step 1 (scan) → step 2 (handshake) → wow (live hub) → trust → CTA"
audience: "developers already running Claude Code or Codex daily"
mode: collaborative
music: none
---

## Frame 1 — One command

- status: built
- src: compositions/frames/01-one-command.html
- duration: 4s
- transition_in: cut
- scene: "A mono caret types `$ tb pair` on the black plane; a QR block resolves beside it."
- blueprint: prompt-type-submit-generate
- asset_candidates: source-screens/promo-02-03b-tb-pair-command.png
- poster: 3.4
- handoff_out: "QR block — x 640, y 300, 300x300, scale 1, opacity 1, static (no motion at the cut)"

The hook is the command itself — this audience reads `$ tb pair` faster than any headline.
Open on the black plane with nothing but a caret, so the first motion on screen is typing.
The QR resolving beside the finished command is the promise stated without a word of marketing: this is the whole setup.

On-screen text: `$ tb pair` (typed), then the chrome line `ON YOUR COMPUTER`.
No product name yet — the name lands in Frame 2 where the phone does.

## Frame 2 — Pull a thread

- status: built
- src: compositions/frames/02-pull-a-thread.html
- duration: 4.5s
- transition_in: cut
- scene: "The phone enters holding the app welcome screen; store marks and the (BETA) availability line land beneath the headline."
- blueprint: device-surface-showcase
- asset_candidates: source-screens/promo-02-01-welcome.png
- poster: 1.5

The product arrives as a device, not a logo, and this is also where the viewer learns how to get it.
The app's own onboarding copy does the introducing — `// AMBIENT CODING`, "Pull a thread. Watch it weave." — so the video never has to write a tagline.
Keep the phone letterboxed inside the square with the terminal plane still behind it; the two halves of the story are on screen together from here on.

Beneath the rule: the App Store and Google Play marks, then "iOS and Android **(BETA)**" with (BETA) bold in brand orange, then threadbase.sh/betas.
The (BETA) marker is load-bearing, not decoration — the app is not on the App Store yet, and it is what keeps the badges honest. Do not drop it, shrink it, or grey it out.
Badge geometry is constrained: the left column ends at 556 where the phone begins at 596, so both badges and their gap must fit inside 472px.

## Frame 3 — One scan

- status: built
- src: compositions/frames/03-one-scan.html
- duration: 4s
- transition_in: cut
- scene: "The phone screen swaps to the 'Scan to pair.' pane; the QR from Frame 1 sits opposite it."
- blueprint: device-surface-showcase
- handoff_in: "QR block — x 640, y 300, 300x300, scale 1, opacity 1, static; it does not re-enter, it was already there"
- asset_candidates: source-screens/promo-02-03-scan-to-pair.png, source-screens/promo-02-02-connect-chooser.png
- poster: 2.2

The beat the whole video is named after.
The QR established in Frame 1 stays put and the phone turns to face it — the pairing is shown as a physical relationship between two objects rather than a UI flow.

Overlay: "one scan."

> If the physical-iPhone footage arrives, this frame becomes the video's centerpiece:
> the real camera viewfinder framing the terminal QR, replacing the static pane.
> Until then the static pane carries it and the scan reads as implied.

## Frame 4 — Thread is live

- status: built
- src: compositions/frames/04-thread-is-live.html
- duration: 4s
- transition_in: cut
- scene: "The phone carries HANDSHAKE COMPLETE; the overlay says what it means — 'That's the whole setup.'"
- blueprint: titlecard-reveal
- asset_candidates: source-screens/promo-02-05-thread-is-live.png
- poster: 2.4

The payoff, and the one frame where the overlay must NOT repeat the phone.
The screenshot already contains all three things this frame used to overlay — the `HANDSHAKE COMPLETE` eyebrow, the `Thread is live.` headline, and the `paired · localhost · 7071` pill — so the original design said everything twice, with the weaker copy on the left. The phone's version wins: it comes with the green check and the glow.
The overlay now carries what the screenshot cannot: that the friction is over. Eyebrow `// 30 SECONDS LATER`, headline "That's the whole setup.", no pill.
The status dot was also dropped — brand orange beside the app's green success accent put two accent colours on one claim.

Headline is 76px, not 96: "whole setup." is 12 characters and overflows the 472px text column at the larger size. `text-indent: -3px` optically aligns the cap T over the lowercase w (measured 82 vs 83 after correction).

When dressing this frame, crop the screenshot to the middle band. The full shot carries a "Back" arrow at the top and a blue "Enter Threadbase" button at the bottom; neither belongs to this beat.

## Frame 5 — Everything, live

- status: built
- src: compositions/frames/05-everything-live.html
- duration: 3.5s
- transition_in: cut
- scene: "The hub populated — live sessions listed, LIVE · n counting."
- blueprint: device-surface-showcase
- asset_candidates: source-screens/promo-02-06-hub-populated.png
- poster: 1.8

The proof that pairing bought something.
This is the first frame where the viewer sees what the app is actually for: real sessions, real statuses, on the phone.

Overlay: "every session. live. in your pocket."

## Frame 6 — Your own server

- status: built
- src: compositions/frames/06-your-own-server.html
- duration: 2.5s
- transition_in: cut
- scene: "Type-only close on the black plane: the trust line, then the URL."
- blueprint: kinetic-type-beats
- poster: 1.4

The differentiator, stated plainly because this audience is the one that cares:
no cloud account, no telemetry, the streamer is yours.

On-screen text, in two beats: "your own server. no telemetry." → `threadbase.sh/betas`

## Video direction

**Optical alignment of stacked headlines.** Headlines are left-aligned by ink, not by box.
Frame 4 carries `text-indent: -4px` because a cap T over a lowercase i reads inset even when the boxes are flush — measured on the render, "Thread" started 2px left of "is live." yet carried ~15% less ink in the first 40px.
Measured left-edge deltas for the other stacked headlines: Frame 2 (P/W) −2px, Frame 5 (E/I) 0px, Frame 6 (Y/N) −4px; all three self-correct through natural side bearings and need no indent.
Re-measure after any font-size or copy change — the correction is size-dependent and does not survive a rewrite.

**Motion doctrine.** Every frame develops across its full duration rather than front-loading: eyebrow → headline → supporting element → receipt, each 0.2–0.4s apart.
Nothing moves after its beat lands; the frame settles and holds so a muted viewer can read it.

**The margin is 84px** on the left for every frame. The phone occupies 596–1001, so the text column is 84–556 and no element may cross 556.
