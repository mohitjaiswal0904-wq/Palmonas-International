#!/usr/bin/env node
/**
 * Batch automated Figma capture — reads scripts/figma-capture-batch.json
 * Run: node scripts/figma-auto-capture-batch.mjs
 */
import { readFileSync } from "fs";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const batchArgIdx = args.indexOf("--batch");
const fromIdx = args.indexOf("--from");
const toIdx = args.indexOf("--to");
const batchFile = batchArgIdx >= 0 ? args[batchArgIdx + 1] : "figma-capture-batch.json";
const from = fromIdx >= 0 ? Number(args[fromIdx + 1]) : 0;
const to = toIdx >= 0 ? Number(args[toIdx + 1]) : Infinity;
const batchPath = join(__dirname, batchFile);
const batch = JSON.parse(readFileSync(batchPath, "utf8")).slice(from, to);

function runCapture(id, path, overlay) {
  const captureArgs = [join(__dirname, "figma-auto-capture.mjs"), id, path];
  if (overlay) captureArgs.push("--overlay", overlay);
  if (process.env.FIGMA_CAPTURE_PROFILE === "mobile") captureArgs.push("--profile", "mobile");
  return new Promise((resolve, reject) => {
    const child = spawn("node", captureArgs, {
      stdio: "inherit",
    });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Capture failed: ${path} (${id})`));
    });
  });
}

console.log(`Capturing ${batch.length} pages from ${batchFile}${from || to < Infinity ? ` [${from}:${to === Infinity ? batch.length + from : to}]` : ""}...\n`);

for (const item of batch) {
  const overlayLabel = item.overlay ? ` + overlay:${item.overlay}` : "";
  console.log(`→ ${item.name}: ${item.path}${overlayLabel}`);
  if (!item.id || item.id.includes("REPLACE")) {
    console.log(`  ⊘ skipped (no capture ID)\n`);
    continue;
  }
  try {
    await runCapture(item.id, item.path, item.overlay);
    console.log(`  ✓ submitted\n`);
    await new Promise((r) => setTimeout(r, 3000));
  } catch (e) {
    console.error(`  ✗ ${e.message}\n`);
  }
}

console.log("Batch complete.");
