# Changelog

All notable changes to the Palmonas International storefront are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
