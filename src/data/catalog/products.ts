import type {
  Product,
  MetalOption,
  StoneOption,
  CategorySlug,
  CollectionSlug,
  ProductImage,
  PlateKind,
} from "@/types";
import { slugify } from "@/lib/format";
import { bannerFor } from "@/lib/banners";
import { CATEGORY_IMAGERY } from "@/data/generated/imagery";
import { categoryLabel, collectionLabel } from "./taxonomy";
import { categories } from "./categories";
import { collections } from "./collections";
import {
  productSeeds,
  type MetalId,
  type StoneId,
  type ProductSeed,
} from "./products.seed";

const METALS: Record<MetalId, MetalOption> = {
  yellow: { id: "yellow", label: "18K Yellow Gold", swatch: "#c9a95f" },
  white: { id: "white", label: "18K White Gold", swatch: "#dcdcdc" },
  rose: { id: "rose", label: "18K Rose Gold", swatch: "#d8a48a" },
  platinum: { id: "platinum", label: "Platinum", swatch: "#c7c9cc" },
};

const STONES: Record<StoneId, StoneOption> = {
  diamond: { id: "diamond", label: "Diamond", swatch: "#eef1f4" },
  sapphire: { id: "sapphire", label: "Sapphire", swatch: "#2a4a7a" },
  emerald: { id: "emerald", label: "Emerald", swatch: "#2f5d4a" },
  ruby: { id: "ruby", label: "Ruby", swatch: "#7a2233" },
  none: { id: "none", label: "No Stone", swatch: "#e7e2da" },
};

const CARE =
  "Store separately in the provided pouch. Avoid contact with perfume and cosmetics. Wipe gently with a soft, dry cloth. Suitable for daily wear.";

const plateKindFor = (c: CategorySlug): PlateKind => {
  if (c === "rings") return "ring";
  if (c === "necklaces" || c === "charms") return "necklace";
  if (c === "earrings") return "earring";
  return "bracelet";
};

/**
 * Assigns real first-party photography to each product, distributed
 * deterministically across the available sets for its category.
 */
function buildImages(
  name: string,
  category: CategorySlug,
  indexInCategory: number,
): ProductImage[] {
  const kind = plateKindFor(category);
  const base = slugify(name);
  const sets = CATEGORY_IMAGERY[category] ?? [];
  const set = sets.length ? sets[indexInCategory % sets.length] : undefined;

  const gallery = set
    ? [set.primary, set.hover, ...set.extra].filter(Boolean)
    : [];

  const defs: Array<{ alt: string; k: ProductImage["kind"]; plate: PlateKind }> = [
    { alt: `${name} — studio view`, k: "primary", plate: kind },
    { alt: `${name} — alternate angle`, k: "hover", plate: kind },
    { alt: `${name} — worn`, k: "worn", plate: "editorial" },
    { alt: `${name} — close detail`, k: "detail", plate: "detail" },
    { alt: `${name} — editorial`, k: "editorial", plate: "editorial" },
  ];

  const count = gallery.length > 0 ? Math.max(2, gallery.length) : defs.length;

  return defs.slice(0, count).map((d, i) => ({
    src: gallery[i] ?? gallery[gallery.length - 1] ?? "",
    alt: d.alt,
    kind: d.k,
    seed: `${base}-${i}`,
    plate: d.plate,
  }));
}

function buildProduct(s: ProductSeed, indexInCategory: number): Product {
  const slug = slugify(s.name);
  return {
    id: slug,
    name: s.name,
    slug,
    price: s.price,
    currency: "USD",
    category: s.category,
    categoryLabel: categoryLabel(s.category),
    collection: s.collection,
    collectionLabel: collectionLabel(s.collection),
    description: s.description,
    story: s.story,
    materials: [
      "18k thick gold plating over 925 sterling silver",
      "Tarnish-resistant, water-safe finish",
      "Nickel-free · hypoallergenic",
    ],
    metals: s.metals.map((m) => METALS[m]),
    stones: s.stones.map((st) => STONES[st]),
    sizes: s.sizes,
    images: buildImages(s.name, s.category, indexInCategory),
    badges: s.badges,
    availability: s.availability ?? "in-stock",
    deliveryEstimate:
      (s.availability ?? "in-stock") === "made-to-order"
        ? "Made to order · ships in 3–4 weeks"
        : "Complimentary express delivery in 2–4 days",
    rating: s.rating,
    reviewCount: s.reviewCount,
    dimensions: s.dimensions,
    stoneDetails: s.stoneDetails,
    care: CARE,
    relatedProducts: [],
  };
}

const categoryCounters = new Map<CategorySlug, number>();
export const products: Product[] = productSeeds.map((s) => {
  const n = categoryCounters.get(s.category) ?? 0;
  categoryCounters.set(s.category, n + 1);
  return buildProduct(s, n);
});

// Wire related products: same collection first, then same category.
for (const p of products) {
  const sameCollection = products
    .filter((o) => o.id !== p.id && o.collection === p.collection)
    .map((o) => o.id);
  const sameCategory = products
    .filter(
      (o) =>
        o.id !== p.id &&
        o.category === p.category &&
        !sameCollection.includes(o.id),
    )
    .map((o) => o.id);
  p.relatedProducts = [...sameCollection, ...sameCategory].slice(0, 4);
}

/** Fill category images + collection productIds / hero art from live catalogue. */
function enrichCatalogRelations() {
  for (const c of categories) {
    c.image = CATEGORY_IMAGERY[c.slug]?.[0]?.primary ?? "";
  }
  for (const col of collections) {
    col.productIds = products
      .filter((p) => p.collection === col.slug)
      .map((p) => p.id);
    col.heroImage = bannerFor(`hero-${col.slug}`);
    col.editorialImage = bannerFor(`editorial-${col.slug}`);
  }
}

enrichCatalogRelations();

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productsByCategory = (category: CategorySlug) =>
  products.filter((p) => p.category === category);

export const productsByCollection = (collection: CollectionSlug | string) =>
  products.filter((p) => p.collection === collection);

export const productById = (id: string) => products.find((p) => p.id === id);

export const newArrivals = () =>
  products.filter((p) => p.badges.includes("NEW"));

export const bestSellers = () =>
  products.filter((p) => p.badges.includes("BESTSELLER"));
