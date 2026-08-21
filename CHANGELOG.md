# Changelog

All notable changes to the Palmonas International storefront are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Homepage featured collection links to live **9KT Fine Gold** (empty Signature route no longer 404s).
- Cart checkout CTA disabled and labelled “Checkout coming soon”; PDP “Buy now” relabelled to honest bag actions (no payment route yet).
- Removed empty **Bangles** from mega menu; empty category PLPs return 404 and are omitted from static params / sitemap.
- Sitemap emits only live collections/categories plus info/policy routes.
- Unlinked stub **Blogs** from nav/footer/sitemap; contact page clarified as Support-led; NPS footer → Palmonas Support.
- Hid store-wide Loox ratings (4.6 / 66098) on PDP until SKU-level reviews exist; bestsellers sort uses badges.
- Balanced thin categories: Essential silver seeds, Ode Garden Reverie necklace, additional 9KT mangalsutras/pendants; mangalsutra/mens home links use search queries.

### Changed
- Reorganized catalogue seeds by collection (`src/data/catalog/seeds/`), split info page copy into `src/data/content/info/`, and centralized `InfoPage` / footer types under `@/types`.
- Added architecture docs (`docs/ARCHITECTURE.md`), domain READMEs, and component barrels for clearer onboarding.
- Nav and collections index only surface live collections; broken `/support` / `/careers` links retargeted.
- Moved `AccountDrawer` under `components/account/`; removed unused `Badge` and empty `(country)` / `api` scaffolds.
- Package version aligned to `0.4.0`.

## [0.4.0] - 2026-08-20

### Added
- Live **Ode To Nature** catalogue (29 products) synced from [palmonas.com/collections/ode-to-nature](https://palmonas.com/collections/ode-to-nature) — titles, INR→USD prices, descriptions, styling tips, product details, Loox rating badge values.
- Live **9KT Fine Gold** sample set (16 products) from [palmonas.com/pages/gold-jewellery](https://palmonas.com/pages/gold-jewellery) — bestsellers, new arrivals, and trending mix.
- Collection routes and taxonomy for `ode-to-nature` and `9kt-fine-gold`.
- Metals / stones: `silver`, `gold9k`, `cz`, `lab-diamond` (plus white/rose personalisation on gold).
- Info pages: policies (`/policies`, `/policies/[slug]`), about, contact, stores, blogs stub, and **size guide** (`/size-guide`).
- Shared `InfoPageView` + authored content in `src/data/content/infoPages.ts` and footer data in `src/data/content/footer.ts`.
- Cart remove confirmation (move to wishlist / remove / keep in bag).
- Wishlist metal family filters (All / Gold / Silver / Demifine).
- PLP sticky filter/sort bar and custom sort dropdown.
- Developer handover notes: [`docs/HANDOVER-2026-08-20.md`](docs/HANDOVER-2026-08-20.md).
- GitHub PR / release notes body: [`docs/GITHUB-RELEASE-0.4.0.md`](docs/GITHUB-RELEASE-0.4.0.md).

### Changed
- Footer rebuilt to match Figma structure (no app-download promo strip).
- Product card wishlist control: corner placement on image, no circular chip, white heart fill.
- PDP: breadcrumbs removed; mobile title/price only in sticky CTA; description removed from buy panel; Story section full-bleed on mobile with outline collection CTA; Craft & Material blocks removed.
- Size guide control on PDP links to `/size-guide`.
- Home “Shop by style” and primary nav updated for Fine Silver / 9KT Fine Gold / Ode To Nature.
- Demo orders remapped to new product ids.
- Filter chips and jewellery query labels updated for new metals and stones.

### Fixed
- Filter drawer width aligned with wishlist drawer on mobile.
- Nested interactive wishlist button no longer wrapped inside the product card link.

## [0.3.0] - 2026-08-13

### Added
- Account flow with sign-in / create-account drawer and persisted demo session.
- Account pages: overview, orders list, order detail, addresses, and profile.
- Demo account data (`ava@palmonas.com` / `palmonas`) with 10 sample orders and saved addresses.
- Search submit (Enter) routing to results, collections, or product pages.
- Shared search helpers in `src/lib/search.ts`.

### Changed
- Search results page is focused: no breadcrumbs, category tabs, filters, or sort.
- Smaller search-results title; mobile nav link font size reduced slightly.
- Bag and wishlist drawers leave a left-edge gap instead of covering the full viewport.
- Account layout is more fluid on narrow screens (overflow containment, responsive nav).

### Fixed
- Horizontal overflow on account pages on mobile viewports.

## [0.2.0] - 2026-08-11

### Fixed
- Stabilized sticky mobile PDP CTA button widths so `Add` / `Added` / `Buy now` no longer shift layout when the add-to-cart label toggles.

### Changed
- Improved mobile UX across header, product, and collection pages (compact header, safe-area support, sticky PDP CTAs).
- Made product details full-width and simplified the collection hero layout.

### Security
- Upgraded Next.js to `15.5.23` to address CVE-2025-66478.

## [0.1.0] - 2026-08-10

### Added
- Initial Palmonas International storefront (Next.js App Router, catalogue, PLP/PDP, cart & wishlist drawers, region switcher).
- Catalogue data layer with authored vs generated data split, shared types, and category/collection relations.
- Project README and data-layer documentation for easier navigation.
