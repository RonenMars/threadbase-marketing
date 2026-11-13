#!/usr/bin/env node
// Usage: node scripts/to-subcomposition.mjs <video>   (from the repo root, e.g. threadbase-hero-drawn)
// Turns compositions/<video>/index.html into a <template> sub-composition mounted by ./index.html,
// and points every asset and frame path in the video at compositions/<video>/... (paths resolve from ./).
// Idempotent: an index.html that is already a <template> and paths already prefixed are left alone.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const video = process.argv[2];
if (!video || !existsSync(join("compositions", video, "index.html"))) {
  console.error("usage: node scripts/to-subcomposition.mjs <video>  (run from the repo root)");
  process.exit(1);
}
const dir = join("compositions", video);
const base = `compositions/${video}/`;

// assets/…, source-screens/… and compositions/… become compositions/<video>/…, once.
// (data-composition-src=" ends in src=", so frame mounts are covered too.)
const prefix = (s) =>
  s.replace(new RegExp(`(src="|url\\(["']?)(?!${base})(assets/|source-screens/|compositions/)`, "g"), `$1${base}$2`);

const gsapTag = /\s*<script src="[^"]*gsap[^"]*"[^>]*><\/script>/g;

// 1. The video's root composition.
const indexPath = join(dir, "index.html");
let html = readFileSync(indexPath, "utf8");
if (!html.trimStart().startsWith("<template")) {
  const htmlTag = html.match(/<html([^>]*)>/)?.[1] ?? "";
  const lang = htmlTag.match(/lang="([^"]*)"/)?.[1];
  const dirAttr = htmlTag.match(/dir="([^"]*)"/)?.[1];
  const styles = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)]
    .map((m) => m[1])
    .join("\n")
    // The page reset lives once in ./index.html.
    .replace(/\n\s*\*\s*\{[^}]*\}/g, "")
    .replace(/\n\s*html,\s*body\s*\{[^}]*\}/g, "")
    .replace(/#root\b/g, `#${video}-root`);
  let body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1]
    .replace(gsapTag, "")
    .replace(/id="root"/, `id="${video}-root"${lang ? ` lang="${lang}"` : ""}${dirAttr ? ` dir="${dirAttr}"` : ""}`)
    .replace(/data-composition-id="main"/, `data-composition-id="${video}"`)
    .replace(/__timelines\["main"\]/g, `__timelines["${video}"]`);
  html = `<template id="${video}-template">\n  <style>${styles}\n  </style>\n${body.replace(/^\n+|\s+$/g, "")}\n</template>\n`;
}
writeFileSync(indexPath, prefix(html));

// 2. Every frame and component the video mounts.
let files = 1;
for (const sub of ["compositions/frames", "compositions/components"]) {
  const d = join(dir, sub);
  if (!existsSync(d)) continue;
  for (const f of readdirSync(d).filter((f) => f.endsWith(".html"))) {
    const p = join(d, f);
    writeFileSync(p, prefix(readFileSync(p, "utf8")));
    files++;
  }
}
console.log(`${video}: ${files} files point at ${base}`);
