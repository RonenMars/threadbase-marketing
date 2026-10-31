# Capture notes — hero source screens

Captured 2026-10-31 from the tb-mobile worktree `tb-mobile-hero-captures` (branch `chore/hero-marketing-captures`, app code at main `42adfb61`; only `e2e/` files differ from main).

## Environment

- Simulator: `tb-e2e-chatflow-probe`, iPhone 17 Pro, iOS 26.5, UDID `FAB67BE5-3F94-4310-9A7F-36B0D280A9FB`.
- Maestro 2.8.0, driver timeout raised with `MAESTRO_DRIVER_STARTUP_TIMEOUT=180000`.
- Release build reused from DerivedData with `E2E_ALLOW_STALE_BUILD=1` (the worktree had uncommitted `e2e/` changes, which are not part of the app binary).
- Status bar: 9:41, full signal, charged, as set by `e2e/check-sim.js`.
- Data: `DEMO_PROFILE=hero node e2e/marketing/demo-streamer.js` (Work Mac 7071 / claude-code, Home Mac 7072 / codex-cli, Linux Devbox 7073 / copilot).
- All PNGs are 1206x2622 (`sips -g pixelWidth -g pixelHeight`).

## Rerun

```
cd /Users/ronenmars/dev/ai-tools/tb-mobile-hero-captures && \
PATH="$HOME/.maestro/bin:$PATH" MAESTRO_DRIVER_STARTUP_TIMEOUT=180000 E2E_ALLOW_STALE_BUILD=1 \
MARKETING_FLOWS=e2e/marketing/hero.yaml DEMO_PROFILE=hero \
MARKETING_SCREENSHOT_DIR=/Users/ronenmars/dev/ai-tools/tb-marketing-hero-video/videos/threadbase-hero/source-screens \
npm run test:e2e:marketing
```

The flow writes to `source-screens/hero/<name>.png`; move them up one level afterwards.

## Shots and deviations

- A-hub, C-permission-card, C-resumed, D-compose, D-typing, D-working, E-new-session, E-pick-folder, E-pick-agent, F-encrypted: Maestro `takeScreenshot` from `e2e/marketing/hero.yaml` (no Dynamic Island cutout, no app status pill, no toasts).
- F-encrypted: the encrypted pairing is captured first, from a pair link that carries the streamer's Noise public key, then cancelled and the machine is paired again through the plain link (the demo streamer does not speak the sealed transport after pairing). The line on screen is the app's own string: "Encrypted from this device to this computer."
- D-compose: the Work Mac session status is reset to `waiting_input` ("42 tests pass. What next?") before the compose shots so the turn is finished when the next prompt goes in.
- E-pick-folder: "Recent directories (1) acme-web" comes from Home Mac's existing demo session.
- B-push-banner: best effort, captured with `xcrun simctl io screenshot`, so it includes the Dynamic Island cutout (Maestro cannot see SpringBoard banners). Notification permission was granted in-app (Settings > Permissions > Notifications > Allow; Maestro's `permissions: notifications: allow` did not apply on iOS 26.5), then the payload was delivered with `xcrun simctl push` while the hub was in front. The banner title is truncated by iOS ("Needs you · Work Mac · fix/auth-cal...").

## Run history

Runs 1-3 failed before any shot was taken because another session was driving the same simulator and ports 7071-7072 (Maestro driver startup timeouts and "port 7071 is in use"); run 4 produced all ten Maestro shots in one pass.
