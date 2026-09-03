#!/usr/bin/env node
/** Apply capture IDs from figma-capture-ids-mobile.json to mobile batch files */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ids = JSON.parse(readFileSync(join(__dirname, "figma-capture-ids-mobile.json"), "utf8"));

for (const file of ["figma-capture-batch-mobile.json", "figma-capture-overlay-batch-mobile.json"]) {
  const batch = JSON.parse(readFileSync(join(__dirname, file), "utf8"));
  let updated = 0;
  for (const item of batch) {
    if (ids[item.name]) {
      item.id = ids[item.name];
      updated++;
    }
  }
  writeFileSync(join(__dirname, file), JSON.stringify(batch, null, 2) + "\n");
  console.log(`${file}: updated ${updated}/${batch.length}`);
}
