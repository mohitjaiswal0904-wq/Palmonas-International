export type CategorySlug =
  | "rings"
  | "necklaces"
  | "earrings"
  | "bracelets"
  | "bangles"
  | "charms";

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
  currency: string;
  category: CategorySlug;
  categoryLabel: string;
  collection: string; // collection slug
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
  id: string;
  name: string;
  slug: string;
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
