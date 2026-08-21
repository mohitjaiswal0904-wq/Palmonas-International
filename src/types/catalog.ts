/** Catalogue domain — products, categories, collections, imagery shapes. */

export type CategorySlug =
  | "rings"
  | "necklaces"
  | "earrings"
  | "bracelets"
  | "bangles"
  | "charms";

export type CollectionSlug =
  | "essential"
  | "nocturne"
  | "aurelia"
  | "sculpted"
  | "elan"
  | "signature"
  | "ode-to-nature"
  | "9kt-fine-gold";

export type MetalOption = {
  id: string;
  label: string;
  swatch: string; // hex for the metal chip
};

export type StoneOption = {
  id: string;
  label: string;
  swatch: string;
};

export type ProductBadge = "NEW" | "BESTSELLER" | "LIMITED" | "EXCLUSIVE";

export type PlateKind =
  | "ring"
  | "necklace"
  | "earring"
  | "bracelet"
  | "editorial"
  | "detail";

export type ProductImage = {
  src: string;
  alt: string;
  kind: "primary" | "hover" | "worn" | "detail" | "editorial";
  seed: string;
  plate: PlateKind;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  /** Catalogue list price currency (display converts via region FX). */
  currency: string;
  category: CategorySlug;
  categoryLabel: string;
  collection: CollectionSlug;
  collectionLabel: string;
  description: string;
  story: string;
  materials: string[];
  metals: MetalOption[];
  stones: StoneOption[];
  sizes: string[];
  images: ProductImage[];
  badges: ProductBadge[];
  availability: "in-stock" | "made-to-order" | "low-stock";
  deliveryEstimate: string;
  rating: number;
  reviewCount: number;
  dimensions: string;
  stoneDetails: string;
  care: string;
  relatedProducts: string[]; // product ids
};

export type Collection = {
  id: CollectionSlug;
  name: string;
  slug: CollectionSlug;
  tagline: string;
  description: string;
  story: string;
  heroImage: string;
  editorialImage: string;
  productIds: string[];
};

export type Category = {
  slug: CategorySlug;
  label: string;
  description: string;
  image: string;
};

/** Studio image set assigned to products by category (generated). */
export type ImageSet = {
  primary: string;
  hover: string;
  extra: string[];
};
