# Data layer

Static catalogue for the Palmonas International prototype. There is no CMS or Shopify API yet — product copy, taxonomy, and navigation are authored here; photography URLs are generated.

## Layout

```
src/data/
  index.ts                 ← public API (`import { … } from "@/data"`)
  catalog/                 ← products, categories, collections, taxonomy
  content/                 ← nav, announcements, homepage strips
  commerce/                ← regions, retail stores
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

- **Product** seeds live in `catalog/products.seed.ts` (thin: name, price, options, copy).
- **Builder** in `catalog/products.ts` derives labels, images, related products, and enriches category/collection fields.
- **Taxonomy** in `catalog/taxonomy.ts` is the single source for category/collection labels and nav aliases.

## What to edit

| Change | File |
|--------|------|
| Add / edit a product | `catalog/products.seed.ts` |
| Category or collection copy | `catalog/categories.ts` / `collections.ts` |
| Labels / marketing aliases | `catalog/taxonomy.ts` |
| Primary nav | `content/navigation.ts` |
| Announcement bar | `content/announcements.ts` |
| Homepage circles / styles | `content/home.ts` |
| Markets / FX | `commerce/regions.ts` |
| Boutique list | `commerce/stores.ts` |
| Refresh photography | `node scripts/fetch-imagery.mjs` |

## Imports

```ts
import { products, categories, primaryNav, regionById } from "@/data";
import { CATEGORY_IMAGERY } from "@/data/generated/imagery"; // optional deep import
import { BANNERS, bannerFor } from "@/lib/banners";          // preferred for banners
```

Importing `products` (or `@/data`) runs catalogue enrichment so `category.image`, `collection.heroImage`, and `collection.productIds` are populated.
