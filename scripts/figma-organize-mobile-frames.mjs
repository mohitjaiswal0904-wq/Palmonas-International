#!/usr/bin/env node
/**
 * Organize captured mobile frames from Capture Staging into section pages.
 * Usage: node scripts/figma-organize-mobile-frames.mjs
 * Prints use_figma organize instructions / frame mapping for manual MCP run.
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const organize = JSON.parse(readFileSync(join(__dirname, "figma-organize-manifest-mobile.json"), "utf8"));
const screenBatch = JSON.parse(readFileSync(join(__dirname, "figma-capture-batch-mobile.json"), "utf8"));
const overlayBatch = JSON.parse(readFileSync(join(__dirname, "figma-capture-overlay-batch-mobile.json"), "utf8"));

console.log(JSON.stringify({ organize, screenCount: screenBatch.length, overlayCount: overlayBatch.length }, null, 2));
