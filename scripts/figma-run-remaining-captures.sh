#!/usr/bin/env bash
# Run remaining screen captures (pages 13–30) and all overlay captures.
set -euo pipefail
cd "$(dirname "$0")/.."
export FIGMA_CAPTURE_BASE="${FIGMA_CAPTURE_BASE:-http://localhost:3000}"

echo "=== Batch 2: screens 13–30 ==="
node scripts/figma-auto-capture-batch.mjs --from 12

echo ""
echo "=== Overlay batch (6 overlays) ==="
node scripts/figma-auto-capture-batch.mjs --batch figma-capture-overlay-batch.json

echo ""
echo "All remaining captures submitted."
