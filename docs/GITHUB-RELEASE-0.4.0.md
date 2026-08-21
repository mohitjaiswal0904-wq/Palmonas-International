# GitHub — v0.4.0

Use this file as the **PR body** or **GitHub Release notes**.

```bash
gh pr create --title "v0.4.0 — Live catalogue, info pages, commerce UX" --body-file docs/GITHUB-RELEASE-0.4.0.md

gh release create v0.4.0 --title "v0.4.0" --notes-file docs/GITHUB-RELEASE-0.4.0.md
```

---

## Summary

- Synced **Ode To Nature** (29) and **9KT Fine Gold** (16) products from palmonas.com into the static catalogue.
- Added policy / about / contact / stores / size-guide pages and rebuilt the footer.
- PLP, cart, wishlist, and PDP UX polish (especially mobile).

## Highlights

### Catalogue
- Collections: `/collections/ode-to-nature`, `/collections/9kt-fine-gold`
- New metal/stone options: 925 silver, 9KT solid gold, CZ, laboratory grown diamond
- Prices: INR list ÷ 83.5 → USD seed

### Commerce & listing
- Sticky PLP filter/sort + custom sort menu
- Cart remove confirmation
- Wishlist All / Gold / Silver / Demifine filters
- Product-card wishlist icon cleanup (placement + white fill)

### PDP
- No breadcrumbs; mobile title/price in sticky bar only
- Size guide → `/size-guide`
- Story section mobile full-bleed + CTA button
- Craft & Material sections removed

### Content
- `/policies`, `/about`, `/contact`, `/stores`, `/blogs`, `/size-guide`
- Handover: `docs/HANDOVER-2026-08-20.md`

## Test plan

- [ ] `/collections/ode-to-nature` and `/collections/9kt-fine-gold` load products
- [ ] PLP filters/sort work on mobile + desktop
- [ ] Cart remove confirm + wishlist metal chips
- [ ] PDP sticky CTA on mobile; size guide link
- [ ] Footer policy links resolve
- [ ] `npm run build`

## Docs

- Changelog: `CHANGELOG.md` → `[0.4.0]`
- Handover: `docs/HANDOVER-2026-08-20.md`
- README routes updated

## Notes for reviewers

- Product images are still generated category placeholders (not live CDN photos).
- Legacy collections (`essential`, `nocturne`, …) may be empty.
- Loox ratings on seeds are store-wide aggregates as shown on site PDPs.
