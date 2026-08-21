# Data layer

Static catalogue for the Palmonas International prototype. There is no CMS or Shopify API yet — product copy, taxonomy, and navigation are authored here; photography URLs are generated.

## Layout

```
src/data/
  index.ts                 ← public API (`import { … } from "@/data"`)
  catalog/
    product-seed.types.ts  ← MetalId, StoneId, ProductSeed, size helpers
    products.seed.ts       ← barrel combining ./seeds/*
    seeds/                 ← one file per live collection
    products.ts            ← builder + enrichment + CATALOG_METALS/STONES
    categories.ts
    collections.ts
    taxonomy.ts
  content/
    navigation.ts
    home.ts
    announcements.ts
    footer.ts
    info/                  ← policies, about, contact, size-guide
    infoPages.ts           ← deprecated re-export shim
  commerce/
    regions.ts
    stores.ts              ← retail boutiques
    orders.ts              ← demo account orders
  generated/imagery.ts     ← AUTO-GENERATED — do not hand-edit
```

## Entity graph

```
Category  ←── Product ──→  Collection
   ↑            │               ↑
   │         images[]      productIds[]
   │            │               │
   └──────── CATEGORY_IMAGERY / BANNERS (generated)
```

- **Seeds** live in `catalog/seeds/*.ts` (thin: name, price, options, copy).
- **Builder** in `catalog/products.ts` derives labels, images, related products, and enriches category/collection fields.
- **Taxonomy** in `catalog/taxonomy.ts` is the single source for category/collection labels and nav aliases.

## What to edit

| Change | File |
|--------|------|
| Add / edit a product | `catalog/seeds/<collection>.ts` |
| Category or collection copy | `catalog/categories.ts` / `collections.ts` |
| Labels / marketing aliases | `catalog/taxonomy.ts` |
| Primary nav | `content/navigation.ts` |
| Footer | `content/footer.ts` |
| Policies / about / contact / size guide | `content/info/*` |
| Announcement bar | `content/announcements.ts` |
| Homepage circles / styles | `content/home.ts` |
| Markets / FX | `commerce/regions.ts` |
| Retail boutiques | `commerce/stores.ts` |
| Demo orders | `commerce/orders.ts` |
| Photography URLs | run `npm run imagery` (do not hand-edit generated) |

## Import rules

```ts
// Preferred in app routes & components
import { products, primaryNav, aboutPage, CATALOG_METALS } from "@/data";
import type { Product, InfoPage } from "@/types";

// OK: generated imagery helpers
import { bannerFor } from "@/lib/banners";
```

Importing `products` (or `@/data`) runs catalogue enrichment so `category.image`, `collection.heroImage`, and `collection.productIds` are populated.

## Live collections

Only collections with products after enrichment appear on `/collections` and in PLP filters. Today that is `ode-to-nature` and `9kt-fine-gold`.
