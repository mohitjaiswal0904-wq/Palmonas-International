# Palmonas International

Modern demi-fine jewellery storefront prototype — Next.js App Router, TypeScript, Tailwind, Zustand.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build    # production build
npm run lint     # eslint
npm run imagery  # regenerate photography URLs → src/data/generated/imagery.ts
```

## Architecture

```
src/
  app/           Routes (RSC pages) — resolve data, pass props
  components/    UI by domain (layout, commerce, editorial, product, navigation, ui)
  data/          Static catalogue — see src/data/README.md
  types/         Domain glossary (`@/types`)
  stores/        Zustand: cart, wishlist, region, ui overlays
  hooks/         useRegionalMoney, useHydrated, useScrolled
  lib/           Utilities (format, banners, art plates, motion, site)
  styles/        Design tokens + global CSS
```

**Chrome:** `app/layout.tsx` → `SiteChrome` mounts Header, Footer, Search, Cart, Wishlist, MobileNav.

**Alias:** `@/*` → `./src/*`

```mermaid
flowchart LR
  layout[app/layout] --> chrome[SiteChrome]
  chrome --> page[app pages]
  page --> data["@/data"]
  page --> components[components]
  components --> stores[Zustand stores]
  data --> generated[generated/imagery]
```

## Routes

| Path | Purpose |
|------|---------|
| `/` | Homepage |
| `/jewellery` | All products PLP |
| `/jewellery/[category]` | Category PLP |
| `/jewellery/[category]/[slug]` | Product detail |
| `/collections` | Collections index |
| `/collections/[slug]` | Collection detail |

## Where to edit

| Task | Location |
|------|----------|
| Catalogue (products, categories, collections) | [`src/data/`](src/data/README.md) |
| Types / domain model | [`src/types/`](src/types/index.ts) |
| Header / mega menu / footer | `src/components/layout/` |
| Cart / wishlist drawers | `src/components/commerce/` |
| PLP / PDP UI | `src/components/product/` |
| Homepage marketing sections | `src/components/editorial/` + `src/app/page.tsx` |
| Design tokens | `src/styles/globals.css` |

## Client state (Zustand)

| Store | Persist key | Role |
|-------|-------------|------|
| `ui` | — | Active overlay: search / cart / wishlist / menu / filters |
| `cart` | `palmonas-cart` | Line items + gift wrap |
| `wishlist` | `palmonas-wishlist` | Product ids |
| `region` | `palmonas-region` | Market → currency display |

## Data model (short)

- Catalogue is **static** (prototype). Prices are USD; `useRegionalMoney` converts via region FX.
- Product seeds → builder assigns images from `CATEGORY_IMAGERY` and wires related products.
- Loading `@/data` enriches `category.image` and collection `productIds` / hero images.
- Prefer `import { … } from "@/data"` and `import { BANNERS, bannerFor } from "@/lib/banners"`.

Full data map: [`src/data/README.md`](src/data/README.md).
