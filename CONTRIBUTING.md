# Contributing

## Before you start

1. Read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
2. Run `npm install && npm run dev`.
3. Prefer small, focused PRs.

## Where code goes

| Change | Location |
|--------|----------|
| Product / collection data | `src/data/catalog/` |
| Policy / about copy | `src/data/content/info/` |
| Nav / footer | `src/data/content/navigation.ts`, `footer.ts` |
| UI | `src/components/<domain>/` |
| Types | `src/types/` then export from `@/types` |
| Client state | `src/stores/` |

## Import style

```ts
import { products, primaryNav } from "@/data";
import type { Product } from "@/types";
```

Avoid deep imports into `src/data/content/infoPages` (shim only) or seed files from app code.

## Checklist before opening a PR

- [ ] `npm run build` succeeds
- [ ] Touched routes smoke-tested on mobile + desktop
- [ ] No new empty collections linked in nav
- [ ] Changelog updated under `[Unreleased]` if user-facing
- [ ] PR body can reuse `docs/GITHUB-RELEASE-*.md` patterns

## Do not

- Hand-edit `src/data/generated/imagery.ts` — run `npm run imagery`
- Commit secrets or `.env` with credentials
- Add checkout / payment without an explicit product decision (prototype is drawer-only)
