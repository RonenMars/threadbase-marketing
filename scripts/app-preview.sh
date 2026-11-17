#!/usr/bin/env bash
# App Store preview pipeline for compositions/threadbase-app-preview.
#   scripts/app-preview.sh prep    iPhone .mov recordings -> constant-30fps .mp4 the composition plays
#   scripts/app-preview.sh render  composition -> renders/threadbase-app-preview/app-preview-iphone-en.mp4
# SRC overrides where the .mov clips are read from; CROP_TOP is the share of the
# recording's height cut off the top (the status bar and its recording indicator).
set -euo pipefail
cd "$(dirname "$0")/.."
D=compositions/threadbase-app-preview/source-footage
SRC=${SRC:-$D}
CROP_TOP=${CROP_TOP:-0.07}

case "${1:-}" in
  prep)
    for c in C1-now C2-answer C3-projects C4-search; do
      ffmpeg -y -loglevel error -i "$SRC/$c.mov" -an \
        -vf "crop=trunc(iw/2)*2:trunc(ih*(1-$CROP_TOP)/2)*2:0:trunc(ih*$CROP_TOP/2)*2,fps=30,format=yuv420p" \
        -fps_mode cfr -c:v libx264 -preset slow -crf 12 -g 15 "$D/$c.mp4"
      echo "$D/$c.mp4"
    done
    ;;
  render)
    OUT=renders/threadbase-app-preview/app-preview-iphone-en.mp4
    TMP=$(mktemp -d)/master.mp4
    mkdir -p "$(dirname "$OUT")"
    npx --yes hyperframes@0.7.109 render --quiet -q high -f 30 --crf 10 \
      --video-frame-format png -c compositions/threadbase-app-preview/index.html -o "$TMP" .
    # Apple: H.264 High L4.0 ~10 Mbps, 30 fps, stereo AAC 256k (a silent track).
    ffmpeg -y -loglevel error -i "$TMP" -f lavfi -i anullsrc=r=48000:cl=stereo \
      -map 0:v -map 1:a -c:v libx264 -preset slow -profile:v high -level 4.0 \
      -b:v 10M -maxrate 12M -bufsize 20M -pix_fmt yuv420p -r 30 \
      -c:a aac -b:a 256k -shortest -movflags +faststart "$OUT"
    echo "$OUT"
    ;;
  *) echo "usage: $0 prep|render" >&2; exit 2 ;;
esac
