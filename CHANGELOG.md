# Changelog

All notable changes to the Palmonas International storefront are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
