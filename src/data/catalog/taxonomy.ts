import type { CategorySlug, CollectionSlug } from "@/types";

/** Canonical category labels — single source for product.categoryLabel. */
export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  rings: "Rings",
  necklaces: "Necklaces",
  earrings: "Earrings",
  bracelets: "Bracelets",
  bangles: "Bangles",
  charms: "Charms",
};

/** Canonical collection names — single source for product.collectionLabel. */
export const COLLECTION_LABELS: Record<CollectionSlug, string> = {
  essential: "The Essential Collection",
  nocturne: "Nocturne",
  aurelia: "Aurelia",
  sculpted: "Sculpted",
  elan: "Élan",
  signature: "The Signature Collection",
  "ode-to-nature": "Ode To Nature",
  "9kt-fine-gold": "9KT Fine Gold",
};

/**
 * Marketing nav labels → collection slugs.
 * Nav may say “Emily In Paris”; the catalogue slug remains `elan`.
 */
export const COLLECTION_NAV_ALIASES: Record<string, CollectionSlug> = {
  "emily-in-paris": "elan",
  "shraddhas-favourite": "signature",
  "tanya-ghavri": "aurelia",
  "ode-to-nature": "ode-to-nature",
  "9kt-fine-gold": "9kt-fine-gold",
  "gold-jewellery": "9kt-fine-gold",
};

export function categoryLabel(slug: CategorySlug): string {
  return CATEGORY_LABELS[slug];
}

export function collectionLabel(slug: CollectionSlug): string {
  return COLLECTION_LABELS[slug];
}
