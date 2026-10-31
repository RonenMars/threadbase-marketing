---
format: 1080x1080
duration: 35s
message: "Every coding agent, every machine, one phone — and Threadbase can't read a word of it"
arc: Demo Loop — hub → gate → approve → next prompt → fresh session → trust → brand (loops to hub)
audience: developers hearing about Threadbase for the first time, already running Claude Code / Codex / Copilot in a terminal
mode: collaborative
---

Seven frames, 39.0s of content, six 0.7s crossfades → **34.8s** on the timeline. Muted. Every
caption ≤12 words, on screen ≥3.5s, enters ≤0.9s into its frame. Frame 7's last frame == frame 1's
first frame, so the MP4 loops without a seam. Poster = t=0.

Stage grammar (all frames): `stage-bg` component = `--bg-primary #070B11` + 48px hairline grid +
blue orb top-left, orange orb top-right (landing hero atmosphere). Phone = iPhone 17 Pro frame,
screen 1206×2622 captures scaled to ~720px tall in the single-phone frames, ~560px in the split
frames. Terminal panel = `navy` surface, 1px `border`, radius 16px, JetBrains Mono 26–28px,
three traffic dots muted. Caption band: bottom 22% of the frame, Inter 600 at 56px (two-line
max), `text-align: start`, kicker above it in JetBrains Mono uppercase 0.26em. Captions are keyed
in `captions.en.json`; each frame lists the keys it owns.

Shot letters (A–G) refer to the approved capture list in `FEATURES.md` / `BRIEF.md`.

## Frame 1 — Hub: every agent, every machine

- status: outline
- src: compositions/frames/01-hub.html
- duration: 6s
- transition_in: cut (loop seam — identical to frame 7's last frame)
- scene: Hub phone with Claude Code / Codex / Copilot sessions across three machines; headline builds beside it
- poster: 0s
- blueprint: device-surface-showcase (static tour) + kinetic-type-beats (hook)
- asset_candidates: A-hub.png
- captions: f01.kicker, f01.headline, f01.badge.claude, f01.badge.codex, f01.badge.copilot
- role: hook

**t=0 (poster):** phone on the right third, already showing shot A (hub, "Everything" filter: NEEDS
YOU card from Claude Code on Work Mac in orange; WORKING cards from Codex on Home Mac and Copilot
on Linux Devbox). Kicker `THREADBASE` top-left. Atmosphere on. This frame alone must read as a
poster: product name, a real app screen, dark brand.

**0.4–1.6s:** headline fades-up in three cues, 0.35s apart, left column: *Every coding agent.* /
*Every machine.* / *One phone.* (Inter 700, 72px). **1.8–2.6s:** three agent badges fade-up under
the headline (Claude Code · Codex · GitHub Copilot) — the only place the agent names appear as a
list, mirroring the three cards on the screen. **2.6–6.0s:** hold. A slow 3% scale drift on the
phone keeps the frame alive without reading as motion.

Caption on screen: 0.4s → 6.0s (5.6s). Why this opens: the hub is the one screen that shows
*what Threadbase is* without explanation — three agents, three machines, one list. It is also the
loop point, so the viewer who watches twice lands back on the product.

## Frame 2 — The gate: the agent needs you

- status: outline
- src: compositions/frames/02-gate.html
- duration: 6s
- transition_in: crossfade 0.7s
- scene: Split stage — terminal (left) stops at a permission prompt; phone (right) lights up with the push, Allow / Deny
- poster: 3.2s
- blueprint: comparison-split (static variant, no 3D tilt — two surfaces of equal weight, badge pop on the phone)
- asset_candidates: B-terminal-gate.txt, B-terminal-gate.png, B-lockscreen-push.png
- captions: f02.headline
- role: pain_point → feature_showcase

**0–0.7s:** crossfade in; terminal panel occupies the left 56%, the phone (lock screen, dark) the
right. **0.7–2.2s:** the terminal's last lines type in from the real capture B1, ending on the
permission prompt (`Bash(npm test)` — `Allow? (y/n)` or Claude Code's exact wording from the
capture), caret blinking, spinner stopped. **2.4s:** the phone's lock screen brightens; the push
card slides down from the top of the screen (0.6s, base ease) — "Needs you · Work Mac ·
fix/auth-callback", then **3.2s:** the Allow / Deny actions expand (shot B2). **3.2–6.0s:** hold;
the terminal caret keeps blinking — the agent is waiting, the phone is where the question went.

Caption: *Your agent hits a question. Your phone knows first.* (9 words) on screen 0.9 → 6.0s
(5.1s). One idea: the handoff from desk to pocket. Nothing moves faster than 0.6s.

Evidence boundary: the push is a real Expo push (`services/push.ts` Allow/Deny category); the
title carries project and branch in plaintext, which is exactly what the lock screen shows.

## Frame 3 — Approve from the phone

- status: outline
- src: compositions/frames/03-approve.html
- duration: 6s
- transition_in: crossfade 0.7s (same split layout — the stage holds, the screens change)
- scene: Phone opens to the session's permission card; Allow is tapped; the terminal on the left resumes streaming
- poster: 3.6s
- blueprint: agent-progress-theater (in-device approval → the receipt is the terminal moving again)
- asset_candidates: C-permission-card.png, C-tap-allow.png, C-resumed.png, B-terminal-gate.txt (continues)
- captions: f03.headline
- role: feature_showcase

**0–0.7s:** crossfade; terminal and phone keep their frame-2 positions. The phone now shows the
session screen (Live control · Terminal) with the permission card (C1). **1.4s:** a soft tap ring
on **Allow**, button goes to its pressed state (C2) over 0.3s, card collapses 0.5s. **2.2s:** the
terminal on the left resumes: the real continuation lines from B1/C3 type in at reading pace
(~2 lines/s), a `Working` pill appears on the phone (C3). **2.2–6.0s:** hold while the terminal
keeps scrolling slowly — the agent is working again, and the viewer never saw a laptop.

Caption: *Approve it from anywhere. The agent keeps working.* (8 words) on screen 0.8 → 6.0s (5.2s).

Boundary: a single-select permission card with Allow / Deny (the app's `QuestionCard` supports
single-select only); no free-text answer, no multi-select.

## Frame 4 — Send the next prompt

- status: outline
- src: compositions/frames/04-next-prompt.html
- duration: 5.5s
- transition_in: crossfade 0.7s (phone pushes to center-right and grows; terminal recedes to a dimmed card behind it)
- scene: The composer types "Now add tests for the callback"; send; the transcript shows Working
- poster: 3.4s
- blueprint: prompt-type-submit-generate (type → submit → status theater; the answer is the Working state, not a result)
- asset_candidates: D-compose.png, D-typing.png, D-working.png
- captions: f04.headline
- role: feature_showcase

**0–0.7s:** crossfade; the phone becomes the hero (~680px tall), the terminal dims to 40% behind
it, out of focus (`filter: blur` is on the allowlist; otherwise an overlay). **0.6–2.6s:** the
composer focuses and the prompt types in at human pace (~14 chars/s): `Now add tests for the
callback`. **2.8s:** the send button presses; the message lifts into the transcript (0.5s).
**3.3s:** Working pill + the first tool line (`Read tests/callback.spec.ts`) appears (D3).
**3.3–5.5s:** hold.

Caption: *Send the next prompt before you're back.* (7 words) on screen 0.8 → 5.5s (4.7s).

Boundary: this is "send a message to a running session" (`useSessionActions.sendInput`), never a
queue — the word "queue" does not appear anywhere in the video.

## Frame 5 — Start a fresh session

- status: outline
- src: compositions/frames/05-new-session.html
- duration: 5s
- transition_in: crossfade 0.7s
- scene: "+ New session" → folder on Home Mac → agent picker → Codex selected → Start
- poster: 3.0s
- blueprint: device-surface-showcase (stepwise-flow-completion: three screen states inside the held phone, capped by a confirming press)
- asset_candidates: E-new-session.png, E-pick-folder.png, E-pick-agent.png
- captions: f05.headline
- role: feature_showcase

**0–0.7s:** crossfade; phone stays hero, now centered. **0.8s:** tap ring on `+ New session`
(E1). **1.4s:** screen slides to the folder list on Home Mac, a folder row highlights (E2).
**2.4s:** screen slides to the provider picker; **2.9s:** Codex row selects (E3). **3.5s:** the
Start button presses; a Working pill appears. Slides are 0.6s each, base ease. **3.5–5.0s:** hold.

Caption: *Start a fresh session on any machine.* (7 words) on screen 0.8 → 5.0s (4.2s).

Why here: frames 3–5 are the three verbs — approve, send, start — on one surface, in the order a
real evening away from the desk would use them.

## Frame 6 — One command, one scan, encrypted

- status: outline
- src: compositions/frames/06-pair.html
- duration: 6s
- transition_in: crossfade 0.7s (back to the split stage: terminal left, phone right)
- scene: Terminal prints the `serve` banner with its QR; the phone scans it; "Encrypted from this device to this computer"; macOS / Linux / Windows badges
- poster: 4.0s
- blueprint: comparison-split (terminal | phone) + titlecard badge row
- asset_candidates: F-serve-qr.txt, F-serve-qr.png, F-scan.png, F-encrypted.png
- captions: f06.headline, f06.command, f06.badge.macos, f06.badge.linux, f06.badge.windows
- role: trust (feature_showcase + benefit_highlight)

**0–0.7s:** crossfade to the split. **0.7–1.6s:** the command types into the terminal:
`npx @threadbase-sh/streamer serve` (f06.command — mono, not translated). **1.6–2.4s:** the real
banner from F1 prints: port 8766, then the QR block draws in row by row (0.8s). **2.6s:** the phone
shows the camera over the QR (F2); **3.4s:** cut inside the phone screen (0.6s crossfade) to the
success screen "Encrypted from this device to this computer" with the key fingerprints (F3).
**4.0–4.8s:** three badges fade-up under the terminal: macOS · Linux · Windows. **4.8–6.0s:** hold.

Caption: *One command. One scan. Encrypted end to end.* (8 words) on screen 0.9 → 6.0s (5.1s).

Boundary: the streamer runs on the user's machine (release targets darwin/linux/win32); E2EE is
on by default (Noise IK, keys in Keychain/Keystore). No relay, no cloud account on screen.

## Frame 7 — Brand: Threadbase can't read your sessions

- status: outline
- src: compositions/frames/07-brand.html
- duration: 4.5s
- transition_in: crossfade 0.7s
- scene: Wordmark + the boundary line + threadbase.sh; then the hub phone returns to its frame-1 position so the loop closes
- poster: 2.0s
- blueprint: titlecard-reveal → logo-assemble-lockup (settle), hand-off into frame 1
- asset_candidates: A-hub.png (loop return)
- captions: f07.kicker, f07.line, f07.url
- role: branding → cta → loop seam

**0–0.7s:** crossfade; the terminal and phone fade out, the atmosphere stays. **0.5s:** wordmark
`Threadbase` (Inter 700, 96px) fades-up centered; **1.1s:** the line *Threadbase can't read your
sessions.* (6 words, verbatim from the landing) fades-up below it; **1.6s:** `threadbase.sh` in
mono, muted. **1.1–4.1s:** hold (3.0s on the line — the brand line is the only caption under 3.5s;
it is 6 words and reads in ~1.8s; **flag for approval**, or extend the frame to 5s to make it 3.5s).
**3.3–4.5s (the seam):** wordmark and line fade out (0.6s) while the hub phone slides in from the
right to its frame-1 position and the `THREADBASE` kicker lands top-left — at t=4.5s the
composition is pixel-identical to frame 1 at t=0.

Why no "Join the Beta" button: a hero video sits next to the real CTA button on the page; a
painted button inside a muted video invites a click that does nothing. The URL is enough.

---

## Caption inventory (→ `captions.en.json`)

| key | text | words | on screen |
| --- | --- | --- | --- |
| f01.kicker | THREADBASE | 1 | 6.0s |
| f01.headline | Every coding agent. Every machine. One phone. | 7 | 5.6s |
| f01.badge.claude / codex / copilot | Claude Code / Codex / GitHub Copilot | — | 4.2s |
| f02.headline | Your agent hits a question. Your phone knows first. | 9 | 5.1s |
| f03.headline | Approve it from anywhere. The agent keeps working. | 8 | 5.2s |
| f04.headline | Send the next prompt before you're back. | 7 | 4.7s |
| f05.headline | Start a fresh session on any machine. | 7 | 4.2s |
| f06.headline | One command. One scan. Encrypted end to end. | 8 | 5.1s |
| f06.command | npx @threadbase-sh/streamer serve | mono, untranslated | 5.3s |
| f06.badge.macos / linux / windows | macOS / Linux / Windows | — | 2.0s (badges, not a caption) |
| f07.kicker | THREADBASE | 1 | 4.5s |
| f07.line | Threadbase can't read your sessions. | 6 | 3.0s ⚠ see frame 7 |
| f07.url | threadbase.sh | — | 2.5s |

RTL / length check: every headline sits in a 2-line box 860px wide at 56px; the longest English
line (f02, 51 chars) uses ~1.3 lines, leaving room for +40%. Badges and the command are
`direction: ltr` islands inside an RTL frame.

## Open points for the review

1. **Frame 7 line hold is 3.0s**, under the 3.5s rule. Options: extend frame 7 to 5.0s (total
   35.3s) — recommended — or start the seam later.
2. **Two captures need a physical iPhone** (B2 lock-screen push, F2 camera scan). Everything else
   I can capture myself from the simulator and a real streamer. If B2 is not available, frame 2
   falls back to the in-app banner on the session list — weaker, says so on screen.
3. **Shot A needs a Copilot session in the demo data** (`e2e/marketing/demo-data.js` has Claude
   Code and Codex today). Small addition in tb-mobile, not in this repo — or drop to two agents
   on screen and keep three names in the badges (the names are the claim, the screen is proof).
