#!/usr/bin/env bash
# Rebuild index.html from STORYBOARD.md: assemble → self-hosted GSAP + stage ground → crossfades → verify.
set -euo pipefail
cd "$(dirname "$0")/.."
S="$HOME/.agents/skills/product-launch-video/scripts"
node "$S/assemble-index.mjs" --storyboard ./STORYBOARD.md --hyperframes .
node - <<'JS'
const fs = require("fs");
let h = fs.readFileSync("index.html", "utf8");
// No third-party loads: the assembler writes a CDN GSAP tag; point it at the vendored copy.
h = h.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"[^>]*><\/script>/, '<script src="assets/vendor/gsap.min.js"></script>');
// Stage ground (bg + 48px grid + two orbs) lives on the root so crossfades never dip to black.
h = h.replace(/(#root \{[^}]*?)(\n\s*\})/, `$1
        background-color: #070B11;
        background-image:
          radial-gradient(520px 520px at 12% 8%, rgba(99, 179, 255, 0.16), transparent 70%),
          radial-gradient(460px 460px at 92% 6%, rgba(240, 138, 36, 0.12), transparent 70%),
          linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
        background-size: auto, auto, 48px 48px, 48px 48px;$2`);
if (/https?:\/\//.test(h.replace(/<!--[\s\S]*?-->/g, ""))) { console.error("index.html still references an external URL"); process.exit(1); }
fs.writeFileSync("index.html", h);
JS
node "$S/transitions.mjs" inject --storyboard ./STORYBOARD.md --hyperframes .
node -e 'const fs=require("fs");fs.writeFileSync("index.html",fs.readFileSync("index.html","utf8").replace(/data-(start|duration)="(\d+\.\d{4,})"/g,(m,k,v)=>`data-${k}="${Math.round(v*1000)/1000}"`))'
node "$S/transitions.mjs" verify --storyboard ./STORYBOARD.md --index ./index.html
