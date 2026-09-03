#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const desktop = JSON.parse(readFileSync(join(__dirname, "figma-handoff-manifest.json"), "utf8"));
const desktopBatch = JSON.parse(readFileSync(join(__dirname, "figma-capture-batch.json"), "utf8"));

const replaceDesktop = (s) =>
  typeof s === "string" ? s.replace(/^Desktop /, "Mobile /") : s;

const mobile = structuredClone(desktop);
mobile.fileKey = "SwWcWtRTA2Mf5khqqFgMuN";
mobile.fileUrl = "https://www.figma.com/design/SwWcWtRTA2Mf5khqqFgMuN/International-Mobile";
mobile.viewport = { width: 400, height: 844, label: "Mobile portrait (400px)" };
mobile.pages = [
  "00 — Cover & Brand",
  "01 — Information Architecture",
  "02 — Foundations",
  "03 — Components",
  "04 — UI Patterns",
  "10 — Mobile Screens",
  "11 — User Journeys",
  "12 — Overlays & States",
];

for (const flow of mobile.flows) {
  flow.steps = flow.steps.map((step) => ({
    ...step,
    frame: replaceDesktop(step.frame),
    ...(flow.id === "overlays" && step.frame?.includes("Mega Menu")
      ? {
          frame: "Mobile / Overlay / Nav Menu",
          code: "src/components/layout/MobileNav.tsx",
          behavior: "ui.overlay=menu. Left drawer nav.",
        }
      : {}),
  }));
}

mobile.screens = mobile.screens.map((s) => ({ ...s, frame: replaceDesktop(s.frame), id: "" }));
mobile.overlays = [
  { name: "Mobile Nav Menu", frame: "Mobile / Overlay / Nav Menu", trigger: "Hamburger or ?figmaOverlay=menu" },
  { name: "Account Drawer", frame: "Mobile / Overlay / Account Drawer", trigger: "Mobile nav Account or ?figmaOverlay=account" },
  { name: "Cart Drawer", frame: "Mobile / Overlay / Cart Drawer", trigger: "Header bag icon", seed: "?figmaSeed=cart&figmaOverlay=cart" },
  { name: "Wishlist Drawer", frame: "Mobile / Overlay / Wishlist Drawer", trigger: "Header heart icon" },
  { name: "Search Overlay", frame: "Mobile / Overlay / Search", trigger: "Header search icon" },
  { name: "PLP Filters", frame: "Mobile / Overlay / PLP Filters", trigger: "Filters button on category PLP" },
];

const mobileBatch = desktopBatch.map((item) => ({
  ...item,
  frame: replaceDesktop(item.frame),
  id: "REPLACE-WITH-FRESH-CAPTURE-ID",
}));

const overlayBatch = mobile.overlays.map((o) => ({
  name: o.name.replace("Mobile Nav Menu", "Mobile Nav Menu").replace("Account Drawer", "Account Drawer"),
  path:
    o.name === "Mobile Nav Menu"
      ? "/?figmaOverlay=menu"
      : o.name === "Account Drawer"
        ? "/?figmaOverlay=account"
        : o.name === "Cart Drawer"
          ? "/?figmaSeed=cart&figmaOverlay=cart"
          : o.name === "Wishlist Drawer"
            ? "/?figmaOverlay=wishlist"
            : o.name === "Search Overlay"
              ? "/?figmaOverlay=search"
              : "/jewellery/rings?figmaOverlay=filters",
  frame: o.frame,
  id: "REPLACE-WITH-FRESH-CAPTURE-ID",
}));

writeFileSync(join(__dirname, "figma-handoff-manifest-mobile.json"), JSON.stringify(mobile, null, 2) + "\n");
writeFileSync(join(__dirname, "figma-capture-batch-mobile.json"), JSON.stringify(mobileBatch, null, 2) + "\n");
writeFileSync(join(__dirname, "figma-capture-overlay-batch-mobile.json"), JSON.stringify(overlayBatch, null, 2) + "\n");
writeFileSync(join(__dirname, "figma-capture-ids-mobile.json"), "{}\n");
writeFileSync(
  join(__dirname, "figma-organize-manifest-mobile.json"),
  JSON.stringify(
    {
      capturePage: "Page 1",
      mobilePage: "10 — Mobile Screens",
      overlaysPage: "12 — Overlays & States",
      sections: {},
      overlayNames: mobile.overlays.map((o) => o.frame),
    },
    null,
    2,
  ) + "\n",
);

console.log(`Wrote mobile manifest (${mobileBatch.length} screens + ${overlayBatch.length} overlays)`);
