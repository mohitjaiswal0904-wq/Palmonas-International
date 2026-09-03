#!/usr/bin/env node
/**
 * After screen batch completes, organize Capture Staging frames into Mobile Screens sections.
 * Run: node scripts/figma-run-mobile-screen-organize.mjs
 * Then paste the printed mapping into use_figma or run organize via MCP.
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const organize = JSON.parse(readFileSync(join(__dirname, "figma-organize-manifest-mobile.json"), "utf8"));
const batch = JSON.parse(readFileSync(join(__dirname, "figma-capture-batch-mobile.json"), "utf8"));

const bySection = {};
for (const item of batch) {
  if (!bySection[item.section]) bySection[item.section] = [];
  bySection[item.section].push(item.frame);
}

console.log("Section mapping for organize:");
console.log(JSON.stringify({ sections: organize.sections, framesBySection: bySection }, null, 2));
console.log("\nExpected: 30 top-level frames on Capture Staging, sorted by x, matched to batch order.");
