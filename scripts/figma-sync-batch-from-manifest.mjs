#!/usr/bin/env node
/**
 * Export capture-ready batch JSON from figma-handoff-manifest.json
 * Usage: node scripts/figma-sync-batch-from-manifest.mjs > scripts/figma-capture-batch.json
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  readFileSync(join(__dirname, "figma-handoff-manifest.json"), "utf8"),
);

const batch = manifest.screens.map(({ name, path, section, frame, id }) => ({
  name,
  path,
  section,
  frame,
  id: id || "REPLACE-WITH-FRESH-CAPTURE-ID",
}));

const out = join(__dirname, "figma-capture-batch.json");
writeFileSync(out, JSON.stringify(batch, null, 2) + "\n");
console.log(`Wrote ${batch.length} screens → ${out}`);
console.log("Generate fresh capture IDs via Figma MCP, then fill empty id fields.");
