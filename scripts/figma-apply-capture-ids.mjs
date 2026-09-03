#!/usr/bin/env node
/** Apply capture IDs to figma-capture-batch.json by screen name */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const batchPath = join(__dirname, "figma-capture-batch.json");
const batch = JSON.parse(readFileSync(batchPath, "utf8"));

const idsByName = JSON.parse(process.argv[2] || "{}");
let updated = 0;
for (const item of batch) {
  if (idsByName[item.name]) {
    item.id = idsByName[item.name];
    updated++;
  }
}
writeFileSync(batchPath, JSON.stringify(batch, null, 2) + "\n");
console.log(`Updated ${updated} capture IDs in ${batchPath}`);
