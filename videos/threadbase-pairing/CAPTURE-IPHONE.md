# iPhone capture — the real pairing take

One screen recording of a real pairing on a physical iPhone 17 Pro, to replace the static
stills in Frames 2–4 of `STORYBOARD.md`.

**Why it matters:** the simulator physically cannot feed a camera frame to `expo-camera`, so the
Maestro flow stops at the "Scan to pair." instructions pane and pairs through the manual path
off-screen. The one moment the product is named after — a phone locking onto a QR and the
handshake completing — is the one moment we currently cannot show. This take fixes that.

**Use the TestFlight build, not a dev build.** TestFlight is the real shipping binary; a dev build
adds the Expo dev-launcher and debug chrome that would have to be cropped out of every frame.

---

## Before you record

**1. Make the streamer reachable from the phone.**

```bash
tb-streamer pair
```

Read the URL it prints. **If it says `localhost` or `127.0.0.1`, the phone cannot reach it** — the
QR will scan and the handshake will fail. Use the LAN address (`192.168.x.x:8766`), a Tailscale IP,
or a tunnel (`docs/remote-dev-tunnel.md`, `docs/install-cloudflared.md`). The phone must be on the
same Wi-Fi, the same VPN, or pointed at the public tunnel URL.

The pair token is valid for **3 minutes**. If a take runs long, just run `tb-streamer pair` again.

**2. Make the QR big and crisp.** Zoom the terminal font up (⌘+ several times) until the QR fills a
good part of the window. A small QR forces the phone closer and makes the shot fidgety. Use a dark
terminal theme — it matches the video's ground.

**3. Reset the app so onboarding runs.**

Delete Threadbase from the phone, then reinstall from TestFlight. On iOS the paired credentials live
in SecureStore/Keychain, which **sometimes survives deletion** — if the app relaunches straight to
the hub instead of the welcome screen, open Settings, remove the server, and force-quit. Either way
you want the app sitting on `// AMBIENT CODING` / "Pull a thread. Watch it weave." before you press
record.

**4. Clean the phone for camera.** Focus / Do Not Disturb on (a banner mid-take kills it), brightness
up, portrait orientation locked, and nothing personal in the status bar.

**5. Set up the recording.** Connect by cable, open **QuickTime Player → File → New Movie
Recording**, and in the dropdown next to the record button choose the **iPhone** as both camera and
microphone source. The device screen mirrors into the window at native resolution — the same
1206×2622 as our stills, so it cuts together cleanly. QuickTime over USB adds **no** red recording
indicator; the iOS built-in screen recorder does, which is why we're not using it.

---

## The take

Arrange the Mac terminal (QR visible) so you can point the phone at it without moving the cable.
Press record, then walk it at a human pace — this is a promo, not a speed run.

| Beat | What you do | Hold for | Why |
|---|---|---|---|
| 1 | Rest on the **welcome** screen — "Pull a thread. Watch it weave." | ~2s | Becomes Frame 2 |
| 2 | Tap **Get started** | — | |
| 3 | Rest on the **two pairing cards**, "Scan QR" marked Recommended | ~1.5s | Shows the choice |
| 4 | Tap **Scan QR** | — | |
| 5 | Rest on the **"Scan to pair."** instructions pane | ~2s | Frame 3's setup |
| 6 | Tap **Open camera**, allow the permission prompt if it appears | — | |
| 7 | **Point at the QR and hold — do not rush this** | ~3s | **The money shot** |
| 8 | Let it lock and dismiss on its own | — | Don't tap through it |
| 9 | Rest on **HANDSHAKE COMPLETE / "Thread is live."** + the paired pill | ~3s | Becomes Frame 4 |
| 10 | Tap through **Notifications** (skip is fine) → **Enter Threadbase** | — | |
| 11 | Rest on the **hub** with live sessions listed | ~3s | Becomes Frame 5 |

Then stop recording. Total ~20–25 seconds of real time.

**The one thing to get right is beat 7.** Approach the QR slowly and hold steady once it's framed.
A fast snap-and-done reads as a glitch at 30fps; three seconds of a phone deliberately reading a QR
is what sells "one scan."

**Two takes is cheap.** Do it once to find the framing, once for real. Keep both.

---

## Deliver

Save as `.mov` and drop it here:

```
/Users/ronenmars/dev/ai-tools/tb-mobile-promo/videos/threadbase-pairing/source-footage/
```

Any filename. Tell me it's there and I'll cut Frames 2–5 from the footage, keeping the stills as
fallback for any beat the take doesn't cover.

---

## If it goes wrong

- **QR scans but the handshake fails** → the URL wasn't reachable. Re-run `tb-streamer pair`, check
  it isn't `localhost`, confirm the phone is on the same network.
- **Token expired** → run `tb-streamer pair` again; three-minute window.
- **App won't show onboarding after reinstall** → Keychain survived. Remove the server in Settings.
- **Camera permission dialog lands mid-take** → fine, tap Allow and keep going; I can cut around it.
  Or grant it once in a throwaway take first so the real take is clean.
- **Nothing works in 15 minutes** → stop. The storyboard is built to stand on the stills; this is an
  upgrade, not a dependency.
