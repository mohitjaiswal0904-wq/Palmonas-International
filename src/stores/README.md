# Client state (Zustand)

This folder is **not** retail boutiques. Boutique data lives in `src/data/commerce/stores.ts`. The `/stores` page is `src/app/stores/`.

| File | Persist key | Purpose |
|------|-------------|---------|
| `ui.ts` | — | Which overlay is open (`cart`, `wishlist`, `search`, …) |
| `cart.ts` | `palmonas-cart` | Line items + gift wrap |
| `wishlist.ts` | `palmonas-wishlist` | Saved product ids |
| `region.ts` | `palmonas-region` | Market → FX display currency |
| `account.ts` | demo session | Sign-in + demo profile |

### Pattern

```ts
const open = useUi((s) => s.overlay === "cart");
const openCart = useUi((s) => s.open);
openCart("cart");
```

Always drive drawers through `ui` so only one overlay is active.
