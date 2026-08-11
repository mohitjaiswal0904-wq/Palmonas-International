/**
 * Seeded editorial "art plate" generator.
 *
 * Produces refined, deterministic duotone SVG compositions used as premium
 * placeholder photography for the prototype. Reads as intentional art
 * direction (soft studio light, tonal grounds, jewellery-form silhouettes)
 * rather than broken imagery — and carries zero copyright risk.
 *
 * The Media component swaps to real photography automatically for any src
 * that begins with http(s).
 */

import type { PlateKind } from "@/types";

export type { PlateKind };

type Palette = {
  base: string;
  deep: string;
  light: string;
  accent: string;
};

const PALETTES: Palette[] = [
  { base: "#f4f4f3", deep: "#dcdcda", light: "#ffffff", accent: "#8a7a66" }, // white studio
  { base: "#eeeeec", deep: "#d2d2cf", light: "#fbfbfa", accent: "#7d6a52" }, // soft grey
  { base: "#e8e8e6", deep: "#c6c6c2", light: "#f7f7f6", accent: "#6c5f4f" }, // mid grey
  { base: "#1f1e1c", deep: "#0f0e0d", light: "#3a3835", accent: "#a8926f" }, // charcoal (dark plate)
  { base: "#f7f7f6", deep: "#e0e0dd", light: "#ffffff", accent: "#8f8069" }, // near white
  { base: "#e3e3e0", deep: "#bfbfbb", light: "#f2f2f1", accent: "#736552" }, // pale grey
];

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function shapeFor(kind: PlateKind, p: Palette, h: number): string {
  const stroke = p.accent;
  const soft = p.deep;
  switch (kind) {
    case "ring":
      return `
        <ellipse cx="300" cy="430" rx="120" ry="30" fill="${soft}" opacity="0.35"/>
        <circle cx="300" cy="330" r="118" fill="none" stroke="${stroke}" stroke-width="10" opacity="0.85"/>
        <circle cx="300" cy="330" r="118" fill="none" stroke="${p.light}" stroke-width="2" opacity="0.6"/>
        <circle cx="300" cy="212" r="16" fill="${p.light}" opacity="0.9"/>`;
    case "necklace":
      return `
        <path d="M180 200 Q300 470 420 200" fill="none" stroke="${stroke}" stroke-width="6" opacity="0.8"/>
        <path d="M210 200 Q300 420 390 200" fill="none" stroke="${p.light}" stroke-width="2" opacity="0.5"/>
        <circle cx="300" cy="392" r="20" fill="${p.light}" opacity="0.9"/>
        <circle cx="300" cy="392" r="20" fill="none" stroke="${stroke}" stroke-width="3"/>`;
    case "earring":
      return `
        <circle cx="255" cy="250" r="10" fill="${p.light}"/>
        <path d="M255 258 L255 340" stroke="${stroke}" stroke-width="5" opacity="0.85"/>
        <circle cx="255" cy="360" r="22" fill="none" stroke="${stroke}" stroke-width="6" opacity="0.85"/>
        <circle cx="345" cy="250" r="10" fill="${p.light}"/>
        <path d="M345 258 L345 330" stroke="${stroke}" stroke-width="5" opacity="0.7"/>
        <circle cx="345" cy="350" r="18" fill="none" stroke="${stroke}" stroke-width="6" opacity="0.7"/>`;
    case "bracelet":
      return `
        <ellipse cx="300" cy="330" rx="140" ry="150" fill="none" stroke="${stroke}" stroke-width="12" opacity="0.85"/>
        <ellipse cx="300" cy="330" rx="140" ry="150" fill="none" stroke="${p.light}" stroke-width="2" opacity="0.5"/>
        <ellipse cx="300" cy="330" rx="96" ry="104" fill="${p.base}"/>`;
    case "detail":
      return `
        <circle cx="300" cy="320" r="150" fill="${soft}" opacity="0.4"/>
        <circle cx="300" cy="320" r="60" fill="none" stroke="${stroke}" stroke-width="14" opacity="0.9"/>
        <path d="M240 320 L360 320 M300 260 L300 380" stroke="${p.light}" stroke-width="2" opacity="0.6"/>`;
    default: // editorial
      return `
        <rect x="150" y="150" width="300" height="360" fill="${soft}" opacity="0.28"/>
        <circle cx="${230 + (h % 140)}" cy="300" r="90" fill="none" stroke="${stroke}" stroke-width="4" opacity="0.7"/>`;
  }
}

export function platePalette(seed: string): Palette {
  return PALETTES[hash(seed) % PALETTES.length];
}

export function artPlate(seed: string, kind: PlateKind = "editorial"): string {
  const h = hash(seed);
  const p = PALETTES[h % PALETTES.length];
  const lx = 30 + (h % 40);
  const ly = 20 + ((h >> 3) % 30);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 660" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="light" cx="${lx}%" cy="${ly}%" r="85%">
      <stop offset="0%" stop-color="${p.light}"/>
      <stop offset="55%" stop-color="${p.base}"/>
      <stop offset="100%" stop-color="${p.deep}"/>
    </radialGradient>
    <linearGradient id="vig" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.deep}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${p.deep}" stop-opacity="0.5"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="600" height="660" fill="url(#light)"/>
  ${shapeFor(kind, p, h)}
  <rect width="600" height="660" fill="url(#vig)"/>
  <rect width="600" height="660" filter="url(#grain)" opacity="0.6"/>
</svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
