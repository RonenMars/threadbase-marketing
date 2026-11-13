---
format: 1080x1080
duration: 19s
message: "One local-first, searchable, provider-neutral history and control layer over every coding agent you use"
arc: Loop — forgotten fix → found → found again → workflow unchanged → every agent → brand (loops to the closed terminal)
audience: developers who already run Claude Code and Codex in their own terminals and don't want to change their workflow
mode: collaborative
music: none
---

Status: awaiting review. No frames are built. Evidence for every claim is in `CLAIMS.md`.

## Visual direction

This extends the site's world and invents no new one.

- **Ground:** `#070B11`, the hairline grid and the two orbs, as `scripts/assemble.sh` already sets. The grid is the first thing cut if the MP4 goes over 4 MB.
- **Type:** Inter 600 for overlays, JetBrains Mono for terminal text and queries, both already self-hosted.
- **Colour:** neutrals plus two signals. Data is `#63B3FF` with a `#A3C9FF` core. "Needs you" is `#F5A14A`. Amber appears only in beat 5.
- **The thread:** a single SVG path, 3px core with a soft halo, drawn with `stroke-dashoffset`. It starts at the query's caret and pulls real row crops out of the field. It behaves like a physical line under tension, so no neon bloom and no particles.
- **The field:** about 40 demo session titles at roughly 7% opacity, below legibility on purpose. It suggests depth and states no count.
- **Camera:** one world, real push-ins with parallax between field and rows. Scene changes are hard cuts on camera motion, not slides.
- **Refused:** a full phone at small size, a device frame, glass, gradient text, more than one focal point per beat.

## Legibility

- **Overlay band:** fixed at y 64–264, Inter 600, 72px minimum, two lines at most.
- **Focal area:** y 300–1016. Crops are scaled so text meant to be read lands at 44px or more. Everything else is dimmed below reading contrast.
- **Display maths:** 72px renders at 37px on a 550px display and 30px on the real 448px column. 44px renders at 22px and 18px. Review happens at both widths.
- **Timing:** at most two elements animate at once, and each key frame holds 0.6s.
- **Beat 4 is stacked, not side by side.** `$ cd threadbase-streamer` is 24 characters, about 630px at 44px mono, which cannot fit half of a 1080 frame. The 1920x1080 variant goes back to side by side.

## Copy

| Beat | Overlay | Words |
| --- | --- | --- |
| 1 | Git remembers what changed. Not why. | 6 |
| 2 | Search everything your coding agents have learned. | 7 |
| 3 | Different repo. Different month. Found. | 5 |
| 4 | Keep your workflow. Add Threadbase. | 5 |
| 5 | Every agent. Every machine. One control plane. | 7 |
| 6 | Coding history is more than Git history. | 7 |
| 6 | iOS TestFlight beta · Android closed testing | 6 |

The brief's tagline, "Your coding history is more than Git history.", is 8 words, so "Your" is trimmed to meet the 7-word limit.
The site's streamer platforms line is dropped from the end card for the same reason.

## Timing changes from the brief

- Beat 4 is 2.5s (was 3s) and beat 5 is 3.5s (was 3s), because the approve tap moved to beat 5.
- Total stays 19s.

## Screens

| Id | Screen | Source | State |
| --- | --- | --- | --- |
| S1 | Results for `callback per environment` | New capture | Needs fixture 1 |
| S2 | Auth0 conversation, anchored and highlighted | New capture | Needs a new run |
| S3 | Results for `provisioning profile time sensitive` | New capture | Needs fixture 2 |
| S4 | Observed row | `01-start-anywhere-continue-anywhere/01-session-discovered.png` | Exists, re-shoot with the others |
| S5 | Hub with Needs you and Working | `source-screens/A-hub.png` | Exists, 10-31 |
| S6 | Permission card | `source-screens/C-permission-card.png` | Exists, 10-31 |
| S7 | Session resumed | `source-screens/C-resumed.png` | Exists, 10-31 |

Fixtures go in `tb-mobile/e2e/marketing/demo-data.js`, with no app code change:

- **Fixture 1:** a Claude session on Home Mac, in a different repo, with `callback per environment` literal in a message. The list becomes 2 Claude to 1 Codex, so the app's real mark appears on the Codex row.
- **Fixture 2:** a Codex session on Home Mac, new iOS repo, dated about seven weeks back, containing all four query words.

## Frame 1 — Hook

- status: outline
- src: compositions/frames/01-hook.html
- duration: 2.5s
- transition_in: cut

A terminal panel, centred, session over. It shows `$ git log -1 --oneline`, one commit line, then `[Process completed]`.
"Git remembers what changed." lands first, and "Not why." lands 0.6s later.
The cursor is the only other thing that moves. It becomes the start of the thread.
The first frame is pixel-identical to the last frame of beat 6.

## Frame 2 — Search

- status: outline
- src: compositions/frames/02-search.html
- duration: 5.5s
- transition_in: cut
- poster: 3.6s

Screens S1, then S2.

- **0.0–1.6s:** push in on the search field. `callback per environment` is revealed by a mask over the real capture, so the app's own pixels do the typing.
- **1.6–2.5s:** the thread runs from the caret into the field of faint sessions and pulls three real rows up into place. The Codex mark and the machine chips are legible.
- **2.5–3.9s:** camera pushes in on "Auth0 login fails on localhost" and holds 0.6s. The poster comes from this hold.
- **3.9–5.5s:** cut on the push to S2, on the highlighted line, and hold.

## Frame 3 — Second query

- status: outline
- src: compositions/frames/03-second-query.html
- duration: 2.5s
- transition_in: cut

Screen S3.
The query is revealed the same way, quicker. The thread pulls one row.
Camera settles on the row's repo and its date, which is the proof for "Different month".

## Frame 4 — Keep your workflow

- status: outline
- src: compositions/frames/04-workflow.html
- duration: 2.5s
- transition_in: cut

Stacked split: a plain terminal on top, the phone's row below. Screen S4.
The terminal shows `$ cd threadbase-streamer` and `$ claude`, and nothing else.
The thread drops from the terminal to the row, which arrives carrying its real "Observed" badge.
The terminal stays alive and untouched to the end of the beat. That is the point of it.

## Frame 5 — Every agent, every machine

- status: outline
- src: compositions/frames/05-control-plane.html
- duration: 3.5s
- transition_in: cut

Screens S5, S6, S7.

- **0.0–2.0s:** three threads run from Work Mac, Home Mac and Linux Devbox into the list. The Claude Code row on Work Mac glows amber under the app's real NEEDS YOU label and holds 0.6s.
- **2.0–3.5s:** the amber row opens to the permission card, Allow is tapped, and the session resumes. This is the one approve beat, 1.5s, never a headline.

## Frame 6 — End

- status: outline
- src: compositions/frames/06-end.html
- duration: 2.5s
- transition_in: cut

Wordmark, tagline, beta line, all on the stage ground. Everything holds until 1.9s.
Then the text dissolves, the thread contracts to a point, and the terminal from frame 1 resolves around it.
The last frame must match frame 1's first frame. This gets checked by diffing the two rendered frames.
