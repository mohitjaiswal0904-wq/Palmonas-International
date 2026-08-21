# Components

UI is grouped by **domain**. Prefer importing from these folders (or their `index.ts` barrels).

| Folder | Owns | Examples |
|--------|------|----------|
| `account/` | Account area UI | `AccountShell`, `AccountDrawer`, `OrderCard` |
| `commerce/` | Bag & wishlist drawers | `CartDrawer`, `WishlistDrawer` |
| `content/` | Long-form info pages | `InfoPageView` |
| `editorial/` | Homepage marketing sections | `Hero`, `ShopByStyle` |
| `layout/` | Site chrome | `Header`, `Footer`, `SiteChrome`, `MegaMenu` |
| `navigation/` | Wayfinding overlays | `Breadcrumbs`, `SearchOverlay` |
| `product/` | PLP / PDP | `PlpView`, `ProductCard`, `ProductBuyPanel` |
| `ui/` | Primitives | `Button`, `Drawer`, `Media`, `Container` |

### Rules of thumb

1. **Pages load data** (`@/data`) and pass props — components stay mostly presentational.
2. Put `"use client"` only on interactive leaves (drawers, filters, buy panel), not entire trees.
3. Shared look-and-feel tokens live in `src/styles/globals.css`, not hard-coded hex in components.
4. Do not import seed files or `generated/imagery` from random components — use `@/data` / `@/lib/banners`.

See also [`docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md).
