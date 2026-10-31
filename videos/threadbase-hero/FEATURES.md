# Threadbase hero video — feature facts

Sources read on 2026-10-31: `tb-streamer` (main, v1.124.0), `tb-mobile` (main, 42adfb61), `tb-landing` (`docs/no-hosted-service.md`, `locales/en.json`).
Paths below are relative to each repo root and prefixed with the repo name.
Every row cites code, tests or a design doc that describes shipped behaviour. Landing copy is quoted only to show what the site already claims.

## Product boundary (what the video may say)

- By default the app talks only to streamers the user runs. "Nothing routes through a Threadbase-operated server" (`tb-landing/docs/no-hosted-service.md:3`).
- The relay is a shipped-behind-a-flag connector, **off by default** on streamer `main`: `relay: { default: false }`, "Off by default while the relay is in development" (`tb-streamer/src/feature-flags.ts:121-129`). The relay server itself is not in the repo; relay pairing is unshipped (mobile PR #1269 open). **The video does not mention the relay.**
- Say "by default" or "Threadbase can't read your sessions", never "nothing leaves your machine" (`no-hosted-service.md:15,18,20`).
- Push notifications go streamer → Expo push service → APNs/FCM. No Threadbase server, but the notification title carries project name and branch in plaintext (`tb-streamer/src/services/push/expoPushSender.ts:21`, `notificationCopy.ts:243-249`). So the claim is "can't read your **sessions**", not "everything".

## Scenario first: what the hero has to show

A first-time visitor needs, in order: (1) what this is, (2) why they would want it, (3) how it gets onto their machine, (4) why they can trust it.
The shots that story needs, before looking at any existing capture:

| # | Beat | Shot that proves it |
|---|---|---|
| A | What it is | Phone hub listing live sessions from Claude Code, Codex and Copilot, across more than one machine, one marked "Needs you" |
| B | Why: you can leave | Mac terminal where an agent stops at a permission gate, and the phone lock screen receives the push with Allow / Deny |
| C | Why: you stay in control | Session screen with the permission card; thumb taps Allow; the terminal on the Mac continues |
| D | Why: continuity | Typing the next prompt in the phone composer; the agent picks it up ("Working") |
| E | Why: start fresh | Browse a project folder on the phone, pick a provider, start a new session |
| F | How: setup | `tb-streamer serve` printing the pairing QR; phone scanning it; "Encrypted from this device to this computer" and matching fingerprints |
| G | Trust | Terminal still on the Mac; phone shows it; one line: your machine, end-to-end encrypted by default |

Every shot is listed under "Capture list" with the exact app/terminal state to record. Existing captures are reference only.

## Feature table

| Feature | One-line user benefit | Evidence | Visual | Priority |
|---|---|---|---|---|
| Supported agents: Claude Code, Codex, GitHub Copilot | Keep the agents you already use; nothing changes in the terminal | `tb-streamer/src/providers.ts:8-13` (`claude-code`, `codex-cli`, `cursor`, `copilot`); runners `src/pty-manager.ts`, `src/codex-pty-runner.ts`, `src/copilot-pty-runner.ts`; `tb-mobile/constants/providers.ts:1-13`; provider marks `components/sessions/shared/ProviderMark.tsx:12-19` | Shot A: hub with provider marks on three sessions. **Needs capture** (demo streamer, three machines). Cursor exists in code but neither README lists it: not shown | hero (inside A) |
| Live session streaming to the phone | Watch the agent work from anywhere, chat or terminal view | WebSocket `/ws`, 30 s ping (`tb-streamer/src/ws-hub.ts:32`); event types `src/types.ts:293-345`; transcript tail with chokidar (`docs/how-it-works.md:17`); chat/terminal toggle `tb-mobile/app/session/[id].tsx:1236-1252`; tool cards `components/conversation/ToolCard.tsx:28-37`; working scanner `ThinkingBubble.tsx:233` | Shots C, D: session screen with a streaming reply. **Needs capture** | hero |
| Notifications when the agent needs input | Leave the desk; the phone tells you when the agent stops | Triggers: turn finished, permission gate, AskUserQuestion, failed (`tb-streamer/src/services/push/waitingInputNotifier.ts:25-41`, wired `src/server.ts:1233-1235`); Expo push token registered per streamer (`tb-mobile/services/push.ts:150,172`); Android "needs-you" channel (`push.ts:57-67`) | Shot B: iPhone lock screen with the Threadbase push. **Needs capture** (physical phone, real streamer, Claude Code gate) | hero |
| Approve / answer prompts from the phone | Tap Allow instead of walking back to the terminal | Routes `/:id/permission/answer`, `/:id/answer`, `/:id/prompt/answer` (`tb-streamer/src/api/routes/sessions.routes.ts:76-91`); keystrokes written to the PTY (`src/pty-manager.ts:584`, `docs/architecture/provider-question-parsing.md:212-218`); card `tb-mobile/components/terminal/QuestionCard.tsx:33`; `hooks/useSessionActions.ts:61,89,130`; Allow/Deny on the notification itself (`services/push.ts:71-82`); e2e `e2e/promo_screenshots_approval.yaml:98-123` | Shot C: permission card, thumb on Allow. **Needs capture**. Single-select only (`QuestionCard.tsx:127-128` unsupported-shape notice): never show a multi-select form | hero |
| Send the next prompt from the phone | Keep the agent moving without the laptop | `POST /api/sessions/:id/input` (`tb-streamer/src/api/routes/sessions.routes.ts:68`); composer `tb-mobile/components/conversation/ChatComposer.tsx:338,378`; `useSessionActions.ts:30-38`; e2e `e2e/marketing/03-control-plane.yaml:41-56` | Shot D. **Needs capture** | hero |
| ~~Queue the next prompt~~ | — | **Removed**: `tb-mobile` commit 4e482a2a "remove the unreachable prompt-queue sheet (#1142)", on `main`. Streamer only buffers input while the agent boots (`tb-streamer/src/pty-manager.ts:594-616`). Landing `home.hero.subheadline` and `features.items[2]` ("Queue the next three prompts") and `tb-mobile/README.md:33` are stale | none | **do not claim** |
| Start a fresh session from the phone | Kick off work from the couch, in any project folder | `POST /api/sessions/start` (`tb-streamer/docs/api-reference.md:9`, handler `sessions.handlers.ts:186`); folder + provider picker `tb-mobile/app/browse.tsx:60,548-551`; `hooks/useBrowse.ts:37`; e2e `e2e/leave_session_nav.yaml:81-90` (real streamer) | Shot E. **Needs capture** | hero (short beat) or later |
| Take over a session started in the terminal | Sessions you started at the desk show up as "Observed"; adopt and drive them | `pgrep`/`lsof` discovery (`tb-streamer/docs/how-it-works.md:13`); adopt (`docs/api-reference.md:13-14`); `useSessionActions.ts:190`; e2e `e2e/marketing/01-start-anywhere.yaml` | Reference: `tb-mobile/artifacts/marketing/threadbase-maestro/01-start-anywhere-continue-anywhere/01-session-discovered.png` | later |
| Pairing: one command + QR | Setup is `tb-streamer serve` and one scan; no account | `serve` creates the key (`tb-streamer/cli/index.ts:225`, `src/auth.ts:36-46`) and prints the QR (`cli/index.ts:393-398`); `pair` command (`cli/index.ts:643`); payload `threadbase://pair?url&token&exp&spk&v=1` (`cli/pair-banner.ts:197-200`); 180 s single-use token (`src/pair-store.ts:26`); scanner `tb-mobile/components/pair/PairScannerModal.tsx:185-189`; parser `services/pair-exchange.ts:192-232`; fingerprint confirm `components/pair/PairConfirmGate.tsx:66` | Shot F. **Needs capture** (terminal + physical phone, per `videos/threadbase-pairing/CAPTURE-IPHONE.md`). Reference: `videos/threadbase-pairing/source-screens/promo-02-03b-tb-pair-command.png`, `promo-02-05-thread-is-live.png` | hero |
| End-to-end encryption, on by default | Threadbase can't read your sessions | `e2ee: { default: true }` (`tb-streamer/src/feature-flags.ts:100-108`); Noise IKpsk1 / IK, X25519, ChaCha20-Poly1305 (`src/e2ee/noise.ts:48,63`, `src/e2ee/record.ts:820`); client `tb-mobile/services/e2ee/noise.ts:27,37`, every WS frame and REST body sealed (`services/e2ee/record.ts`, `services/authed-fetch.ts`); keys in Keychain/Keystore (`stores/servers.ts:297-299`); in-app copy "Encrypted from this device to this computer." (`locales/en/pair.json:47`) | Shot F/G: the pairing confirm screen with fingerprint, plus a caption. No separate shot | hero (inside F/G) |
| Runs on your own machines: macOS, Linux, Windows | No hosted service; the streamer is a binary you run | Release targets darwin-arm64/x64, linux-x64, win32-x64 (`tb-streamer/.github/workflows/release.yml:74-84`); required macOS + Windows CI checks (`.github/workflows/ci.yml:181-183,224-230`); `docs/guides/windows-setup.md`; install `npm install -g @threadbase-sh/streamer` / `brew install tb-streamer` (`README.md:10,20-21`) | Shot F terminal + caption. No separate shot | hero (inside F) |
| Multiple machines, one hub | Pair every box you run; one list, grouped by machine | Servers keyed by id (`tb-mobile/stores/servers.ts:85`); hub grouped by server (`components/sessions/tree/ServerHeaderRow`, `MachineBadge`); three-machine demo (`e2e/marketing/setup.yaml:1-33`); per-device records + revoke on the streamer (`tb-streamer/cli/index.ts:526-580`) | Shot A. Reference: `tb-mobile/artifacts/marketing/threadbase-maestro/03-control-plane/01-all-machines-all-agents.png` | hero (inside A) |
| Search across every session and machine | Find the conversation where the agent explained the migration | `/api/search` (`tb-streamer/src/api/routes/scanner.routes.ts:11`); hub search `tb-mobile/app/index.tsx:457`; in-conversation search `app/conversation/[id].tsx:958`; e2e `e2e/06_search_anchor.yaml` | Reference: `…/02-agent-memory/07-hero.png` | later |
| Remote keys, model/effort switch, attachments, diff review, voice dictation | Power features once you are in | `useSessionActions.ts:56,154,172`; `app/session/[id].tsx:1255,1501`; `e2e/voice_dictation.yaml`; attachments `tb-streamer/src/api/routes/sessions.routes.ts:93` | none | later |
| Biometric lock, themes, Markdown export, favourites | Day-to-day polish | `hooks/useBiometricLock.ts:25`; `constants/theme.ts:270-279`; `app/manage-favorites.tsx:15` | none | later |
| Localised: en, he, ar, ru with RTL | Why captions live in one JSON | `tb-mobile/lib/i18n.ts:63-68`; `lib/rtl.ts:9-17`; `e2e/language_direction.yaml` | none | later |
| Open source, MIT | Free; self-host | `tb-streamer/LICENSE`, `tb-mobile/LICENSE` (MIT) | caption on the CTA | hero (CTA line) |

## Hero picks (5) and why

1. **One hub for every agent and machine** (shot A). The only frame that says "what it is" in one glance: three provider marks, two machine badges, a "Needs you" card. Also the poster frame and the loop point.
2. **Notification when the agent needs you** (shot B). The reason to want it: the landing headline is "Leave the desk. Keep the agent working." and this shot is that sentence.
3. **Approve from the phone** (shot C). The payoff of B and the single most concrete action. Single-select card, Allow, terminal continues.
4. **Send the next prompt / start fresh** (shots D, E). Continuity: the agent does not stall when you leave. Queue is gone, so this is phrased as "send", never "queue".
5. **One command, one scan, your machine, encrypted** (shots F, G). Setup and trust in one beat: `tb-streamer serve` → QR → "Encrypted from this device to this computer." The macOS/Linux/Windows and "can't read your sessions" lines ride on this scene.

Cut from hero: search and take-over (strong, but a visitor who has never seen the product has no sessions to search yet) and the relay (unshipped by default).

## Claims the video must not make

- "Queue prompts" (removed, see table).
- "Nothing leaves your machine" or "no server anywhere" (push goes through Expo; relay exists as an opt-in).
- Multi-select or free-text answers from the phone (single-select cards only; typed text is refused while a card is open, `useSessionActions.ts:32`).
- Cursor as a supported agent (code only, undocumented).
- Copilot question cards or model controls (`tb-mobile/README.md:157`): show Copilot only as a provider mark in the hub.
- Cost or spend display (none exists).

## Capture list

All captures: dark theme, iPhone 17 Pro (physical for B and F, simulator OK for the rest), clock 9:41, demo data only (`e2e/marketing/demo-streamer.js` three-machine topology or a real streamer with throwaway repos). Terminal: dark theme, large font, Claude Code on a Mac.

| Shot | App / terminal state to record | Source |
|---|---|---|
| A | Hub, "Now" tab, "Everything" filter, one Needs-you card (Claude, Work Mac), one Working (Codex, Linux Devbox), one Working (Copilot, Home Mac). Copilot mark must be visible; demo data must include a `copilot` session | `e2e/marketing/demo-streamer.js` + `demo-data.js` (add a Copilot session), `npm run test:e2e:marketing` style run, screenshot |
| B | Mac terminal: Claude Code stops at a Bash permission gate. iPhone lock screen: Threadbase push "Needs you" with Allow / Deny. Record the phone over USB with QuickTime, the Mac screen with the built-in recorder, same wall clock | Real streamer + real Claude Code in a throwaway repo; `tb-mobile/e2e/scripts/trigger-gate-build.js` shows how a gate is triggered |
| C | Session screen, chat view, permission card open, thumb taps Allow, card resolves, reply streams. Then the Mac terminal continuing | Same run as B, screen recording |
| D | Session screen, composer focused, type one short prompt, send, status flips to Working, first tool card appears | Same run or demo streamer (`03-control-plane.yaml:41-56`) |
| E | Hub → New session → browse folder → provider picker (Claude selected) → Start | Real streamer (`e2e/leave_session_nav.yaml:81-90`); demo streamer stops at browse |
| F | Terminal: `tb-streamer serve` output with the QR banner and Identity code. Phone: Welcome → Connect → Scan QR → camera locks on the QR → fingerprint confirm → "Thread is live." | `videos/threadbase-pairing/CAPTURE-IPHONE.md` beats 1–9 (note: use `serve`, not `pair`; both print the QR) |
| G | Split: terminal on the left with the agent running, phone on the right showing the same session Working. Static hold | Frame from the C run |
