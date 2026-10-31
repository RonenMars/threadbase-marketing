#!/usr/bin/env node
// Usage: node scripts/apply-captions.mjs <locale>   (reads captions.<locale>.json)
// Replaces the text of every data-i18n element in compositions/frames/*.html and sets lang/dir on index.html.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const locale = process.argv[2] ?? "en";
const cap = JSON.parse(readFileSync(`captions.${locale}.json`, "utf8"));
const flat = (o, p = "") => Object.entries(o).flatMap(([k, v]) => (typeof v === "object" ? flat(v, p + k + ".") : [[p + k, v]]));
const text = new Map(flat(cap));
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
let replaced = 0;
for (const f of readdirSync("compositions/frames")) {
  const p = `compositions/frames/${f}`;
  const out = readFileSync(p, "utf8").replace(/(data-i18n="([^"]+)"[^>]*>)([^<]*)(<)/g, (m, open, key, _old, close) => {
    if (!text.has(key)) { console.warn(`no ${locale} text for ${key}`); return m; }
    replaced++;
    return open + esc(text.get(key)) + close;
  });
  writeFileSync(p, out);
}
const idx = "index.html";
writeFileSync(idx, readFileSync(idx, "utf8").replace(/<html[^>]*>/, `<html lang="${cap.locale ?? locale}" dir="${cap.dir ?? "ltr"}">`));
console.log(`applied ${replaced} captions (${locale}, dir=${cap.dir ?? "ltr"})`);
