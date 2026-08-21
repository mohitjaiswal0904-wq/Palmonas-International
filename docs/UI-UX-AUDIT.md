# UI / UX Audit Report — Palmonas International

**Date:** 21 Aug 2026  
**Method:** UI/UX Suite 12-dimension scan (61 files) + contrast checks + expert calibration + Nielsen heuristics  
**App:** Next.js 15 · Tailwind v4 · Framer Motion · Lucide

---

## Headline ratings (out of 10)

| Score | Rating |
|-------|--------|
| **Overall UX** | **7.9 / 10** |
| Visual design | **8.4 / 10** |
| Usability (Nielsen) | **7.5 / 10** |
| Suite automated (raw) | **8.1 / 10** — Strong |

**Verdict:** Strong luxury design system and browse UX. Gaps that hold the score down: incomplete purchase flow, some a11y labeling, placeholder product photography.

---

## 1. Twelve UI/UX dimensions

| Dimension | Suite | Calibrated | Notes |
|-----------|------:|-----------:|-------|
| Color | 9 | 8.5 | Tokenized palette; `ink-faint` & accent fail small-text WCAG |
| Typography | 7 | 8.5 | Bodoni / Cormorant / Manrope; suite misread rem as px |
| Layout | 7 | 8.5 | Container + `sm`/`md`/`lg` exist (suite false negative) |
| Components | 9.5 | 9 | Drawers, PLP, PDP sticky CTA |
| Accessibility | 6 | 7 | Labels OK on `Input`; checkboxes / range / footer gaps |
| Visual hierarchy | 10 | 9 | Editorial strength |
| Interaction | 10 | 7.5 | Motion strong; checkout disabled |
| Responsive | 10 | 9 | Mobile PDP bar solid |
| Polish | 8.1 | 7 | Category placeholder imagery |
| Performance UX | 7 | 8 | `next/font` already used |
| Flows / IA | 5 | 6.5 | Browse clear; purchase incomplete |
| Platform | 7.5 | 8 | Light luxury intentional (no dark mode) |

---

## 2. Usability — Nielsen’s 10 heuristics

| # | Heuristic | Score |
|---|-----------|------:|
| 1 | Visibility of system status | 8 |
| 2 | Match between system and real world | 8 |
| 3 | User control and freedom | 7 |
| 4 | Consistency and standards | 9 |
| 5 | Error prevention | 6.5 |
| 6 | Recognition rather than recall | 8 |
| 7 | Flexibility and efficiency of use | 7 |
| 8 | Aesthetic and minimalist design | 9 |
| 9 | Help users recognize, diagnose, recover from errors | 6 |
| 10 | Help and documentation | 7.5 |
| | **Average** | **7.5** |

---

## 3. Contrast (sample)

| Pair | Ratio | WCAG |
|------|------:|------|
| Ink `#1a1816` on white | 17.7:1 | AAA |
| Muted `#6b6b68` on white | 5.35:1 | AA |
| Faint `#9a9a96` on white | 2.82:1 | **FAIL** |
| Accent `#8a7a66` on white | 4.15:1 | **FAIL** (normal text) |
| White on ink | 17.7:1 | AAA |

---

## 4. Priority fixes

1. **High — Flows:** Checkout path (or keep CTAs clearly non-purchase).  
2. **High — Polish:** Per-SKU product photography.  
3. **Med — A11y:** Explicit labels on filter checkboxes, price range, gift wrap, newsletter.  
4. **Med — Contrast:** Darken `ink-faint` / accent for small text, or restrict usage.  
5. **Med — IA:** Home Nocturne copy vs Ode CTA; thin charms.  
6. **Low — Selection:** `::selection` contrast on accent (4.15:1).

---

## 5. Suite false positives (discounted)

- Body text “0.7px” — rem utilities misparsed  
- “No breakpoints” — Tailwind responsive classes present  
- “No next/font” — fonts load in `layout.tsx`  
- Many `Input` “no label” hits — component renders `<label htmlFor>` when `label` prop is set  
- “No dark mode” — acceptable for this brand direction  

---

## Interactive report

Open beside chat: Cursor canvas `ui-ux-audit-report.canvas.tsx`.
