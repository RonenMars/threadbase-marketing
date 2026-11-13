---
format: 1080x1080
duration: 19s
message: "One local-first, searchable, provider-neutral history and control layer over every coding agent you use"
arc: Loop — forgotten fix → found → found again → workflow unchanged → every agent → brand (loops to the closed terminal)
audience: developers who already run Claude Code and Codex in their own terminals and don't want to change their workflow
mode: collaborative
music: none
---

Illustrated variant of the hero video: same six beats as `../threadbase-hero/STORYBOARD.md`, with big pairing-style titles and no app screenshots.
Everything is drawn: rows, search field, terminal, approval card.
The drawings are diagrams of what the product does, not copies of the app's screens, so they use plain labels (provider name, machine name, "Needs you", "Working", "Observed") instead of the app's exact layout.
Every depicted behaviour is still bound by `../threadbase-hero/CLAIMS.md`: literal keyword search, Observed sessions are watch-only, approval only on a session Threadbase started.
Session titles and repos are illustrative.

## Frame 1 — Hook

- status: animated
- src: compositions/frames/01-hook.html
- duration: 2.5s
- transition_in: cut
- note: loop seam — t=0 is identical to frame 6's last frame

Closed terminal: `git log -1 --oneline`, `a41c9e2 fix auth0 callback`, `[Process completed]`, blinking cursor.
"Can't find the session?" at the top in the 104px title style, then "// You already solved that task before." below the terminal 0.7s later at 60px. Camera leans into the cursor, where the thread starts.

## Frame 2 — Search

- status: animated
- src: compositions/frames/02-search.html
- duration: 5.0s
- transition_in: cut
- poster: 3.6s

"There it is." with the subtitle "The answer by the words you remember." `callback per environment` (a literal keyword query) types into the field. The thread runs from the caret down the gutter and pulls three rows (Claude and Codex, two repos) out of a field of faint past sessions.
Push in on "Auth0 login fails on localhost", hold 3.3–3.9s (poster 3.6s, global 6.1s). Cut to the exchange at 3.9s: the user's question small and dim, the answer at 60px is the hero, and the highlight sweeps over "callback per environment" by 4.4s, held to the cut.

## Frame 3 — Second query

- status: animated
- src: compositions/frames/03-second-query.html
- duration: 2.5s
- transition_in: cut

"Months later. Any agent." (two lines) with the subtitle "Still findable."; the search bar and row sit 80px lower (380 and 640) to clear it. `provisioning profile time sensitive`. The thread pulls one Codex row in `demo-ios`, dated Sep 14. Camera settles on the repo and date.

## Frame 4 — Keep your terminal

- status: animated
- src: compositions/frames/04-workflow.html
- duration: 2.5s
- transition_in: cut

"Your terminal." with the subtitle "No wrappers. No new habits." Terminal: `cd threadbase-streamer`, `claude`, cursor keeps blinking. The thread drops to a row: `threadbase-streamer`, Claude · Work Mac, Observed.

## Frame 5 — Every agent, every machine

- status: animated
- src: compositions/frames/05-control-plane.html
- duration: 3.5s
- transition_in: cut

"One list." with the subtitle "Every machine. Every agent." Work Mac, Home Mac and Linux Devbox thread into one list. The Work Mac row and its thread turn amber: Needs you. Hold.
Approval card "Claude wants to run npm test", Allow tapped, row flips to Working.

## Frame 6 — End

- status: animated
- src: compositions/frames/06-end.html
- duration: 3.0s
- transition_in: cut
- note: loop seam — ends identical to frame 1 at t=0

"That's it.", held 0.45–1.1s. Then "Your call." with the subtitle "Your agents. Your machines." over the Threadbase wordmark, held 1.8–2.45s, then resolves into the closed terminal, settled by 2.9s.
