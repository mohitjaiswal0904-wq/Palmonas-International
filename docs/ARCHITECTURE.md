# Architecture

How the Palmonas International storefront is put together. Read this once, then use the [folder map](#folder-map) as a cheat sheet.

For the latest feature batch, see also [`HANDOVER-2026-08-20.md`](./HANDOVER-2026-08-20.md).

---

## Mental model (30 seconds)

```
Browser
  → app/layout.tsx (fonts)
  → SiteChrome (Header, Footer, drawers — client)
  → page.tsx (RSC: load data from @/data, pass props)
  → components/* (UI)
  → stores/* (Zustand: cart, wishlist, region, ui overlays)
```

There is **no CMS and no checkout API**. The catalogue is a static TypeScript data layer. Cart / wishlist / account are client-only (localStorage).

---

## Folder map

| Path | Responsibility | Who edits |
|------|----------------|-----------|
| `src/app/` | Routes only — fetch/select data, compose sections | Pages / SEO |
| `src/components/` | UI by domain (`product`, `commerce`, `layout`, …) | Frontend |
| `src/data/` | Static catalogue + marketing copy | Content / catalogue |
| `src/types/` | Shared TypeScript domain types (`@/types`) | Anyone adding fields |
| `src/stores/` | **Zustand client state** (not retail boutiques) | Cart / UX |
| `src/hooks/` | Thin React hooks | Shared UX |
| `src/lib/` | Pure helpers (format, search, banners, motion) | Shared |
| `src/styles/` | Design tokens + global CSS | Design system |
| `docs/` | Architecture, handover, release notes | Leads |
| `scripts/` | One-off tooling (`npm run imagery`) | Platform |

### “Stores” means three different things

| Name | Path | Meaning |
|------|------|---------|
| Zustand stores | `src/stores/` | Client state (cart, wishlist, …) |
| Retail boutiques | `src/data/commerce/stores.ts` | Physical shop list |
| Stores page | `src/app/stores/` | `/stores` route |

---

## Catalogue pipeline

```
products.seed.ts          authored: name, price, metals, copy
        ↓
products.ts               builder: slug, images, materials, related[]
        ↓
enrichCatalogRelations()  fills category.image + collection.productIds
        ↓
import { products } from "@/data"   ← side effect runs here
```

**Rule:** Prefer `import { … } from "@/data"` in app code. Deep imports are OK for generated imagery only.

**Prices:** Seeds store USD converted from INR via `inrToUsd(inr)` (`÷ 83.5`). Display currency comes from the region store + `useRegionalMoney`.

**Live collections today:** `ode-to-nature`, `9kt-fine-gold`. Legacy collection shells may exist with `productIds.length === 0` — the collections index filters those out.

---

## App routes

| Group | Paths |
|-------|--------|
| Shop | `/`, `/jewellery`, `/jewellery/[category]`, `/jewellery/[category]/[slug]`, `/collections`, `/collections/[slug]` |
| Info | `/about`, `/contact`, `/stores`, `/blogs`, `/policies`, `/policies/[slug]`, `/size-guide` |
| Account | `/account/*` (demo session) |

Chrome (header/footer/drawers) mounts once in `SiteChrome`.

---

## Client overlays

`src/stores/ui.ts` holds a single `overlay` enum: `search | cart | wishlist | menu | filters | account | null`. Drawers read that flag. Do not open drawers with local-only state unless you also update `ui`.

---

## Imagery

- Hand photography URLs live in `src/data/generated/imagery.ts` (**auto-generated**).
- Regenerate: `npm run imagery` (`scripts/fetch-imagery.mjs`).
- Product cards pick images from `CATEGORY_IMAGERY` by category — not per-SKU CDN URLs yet.

---

## Intentionally stubbed

| Item | Status |
|------|--------|
| Checkout / payment | Not built — bag is a drawer |
| Blogs | Stub page |
| CMS / Shopify sync | Manual seed updates |
| Locale route group | Removed empty scaffold; region FX only |
| REST API | None — static prototype |

---

## Conventions

1. **Types** from `@/types`; **data** from `@/data`.
2. Components stay presentational where possible; pages own data loading.
3. `"use client"` only when needed (drawers, filters, buy panel, chrome).
4. UK spelling in routes: `/jewellery`.
5. Design tokens in `src/styles/globals.css` — avoid one-off hex in components.

---

## Onboarding paths

| I want to… | Start here |
|------------|------------|
| Add a product | `src/data/catalog/seeds/` → rebuild understanding in `products.ts` |
| Add a collection | `taxonomy.ts` → `collections.ts` → seeds → `navigation.ts` |
| Change footer / policies | `src/data/content/footer.ts`, `src/data/content/info/` |
| Change PLP filters | `src/components/product/PlpView.tsx` |
| Change cart UX | `src/components/commerce/CartDrawer.tsx` + `src/stores/cart.ts` |
| Change tokens | `src/styles/globals.css` |
