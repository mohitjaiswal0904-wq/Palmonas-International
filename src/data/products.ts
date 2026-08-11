import type {
  Product,
  MetalOption,
  StoneOption,
  CategorySlug,
  ProductBadge,
  ProductImage,
  PlateKind,
} from "@/types";
import { slugify } from "@/lib/format";
import { CATEGORY_IMAGERY } from "@/data/imagery";

const METALS: Record<string, MetalOption> = {
  yellow: { id: "yellow", label: "18K Yellow Gold", swatch: "#c9a95f" },
  white: { id: "white", label: "18K White Gold", swatch: "#dcdcdc" },
  rose: { id: "rose", label: "18K Rose Gold", swatch: "#d8a48a" },
  platinum: { id: "platinum", label: "Platinum", swatch: "#c7c9cc" },
};

const STONES: Record<string, StoneOption> = {
  diamond: { id: "diamond", label: "Diamond", swatch: "#eef1f4" },
  sapphire: { id: "sapphire", label: "Sapphire", swatch: "#2a4a7a" },
  emerald: { id: "emerald", label: "Emerald", swatch: "#2f5d4a" },
  ruby: { id: "ruby", label: "Ruby", swatch: "#7a2233" },
  none: { id: "none", label: "No Stone", swatch: "#e7e2da" },
};

const CATEGORY_LABEL: Record<CategorySlug, string> = {
  rings: "Rings",
  necklaces: "Necklaces",
  earrings: "Earrings",
  bracelets: "Bracelets",
  bangles: "Bangles",
  charms: "Charms",
};

const COLLECTION_LABEL: Record<string, string> = {
  essential: "The Essential Collection",
  nocturne: "Nocturne",
  aurelia: "Aurelia",
  sculpted: "Sculpted",
  elan: "Élan",
  signature: "The Signature Collection",
};

const plateKindFor = (c: CategorySlug): PlateKind => {
  if (c === "rings") return "ring";
  if (c === "necklaces" || c === "charms") return "necklace";
  if (c === "earrings") return "earring";
  return "bracelet";
};

/**
 * Assigns real first-party photography to each product, distributed
 * deterministically across the available sets for its category so no two
 * products in a category share the same shot. Falls back to generated art
 * plates if a category has no imagery.
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

  // Only expose as many views as we have distinct photography for.
  const count = gallery.length > 0 ? Math.max(2, gallery.length) : defs.length;

  return defs.slice(0, count).map((d, i) => ({
    src: gallery[i] ?? gallery[gallery.length - 1] ?? "",
    alt: d.alt,
    kind: d.k,
    seed: `${base}-${i}`,
    plate: d.plate,
  }));
}

type Seed = {
  name: string;
  category: CategorySlug;
  collection: string;
  price: number;
  metals: (keyof typeof METALS)[];
  stones: (keyof typeof STONES)[];
  sizes: string[];
  badges: ProductBadge[];
  description: string;
  story: string;
  dimensions: string;
  stoneDetails: string;
  availability?: Product["availability"];
  rating: number;
  reviewCount: number;
};

const RING_SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8"];
const BAND_SIZES = ["XS", "S", "M", "L"];
const ONE_SIZE = ["One size"];

const CARE =
  "Store separately in the provided pouch. Avoid contact with perfume and cosmetics. Wipe gently with a soft, dry cloth. Suitable for daily wear.";

const seeds: Seed[] = [
  // ---- Rings ----
  {
    name: "Meridian Signet",
    category: "rings",
    collection: "sculpted",
    price: 1290,
    metals: ["yellow", "white", "rose"],
    stones: ["none"],
    sizes: RING_SIZES,
    badges: ["BESTSELLER"],
    description:
      "A modern signet with a softly domed face and squared shoulders — architecture resolved to a single, reassuring weight.",
    story:
      "The Meridian reinterprets the signet as a piece of miniature architecture, its face angled to catch a single line of light.",
    dimensions: "Face 11mm × 9mm · Band 2.4mm · Weight 6.1g",
    stoneDetails: "Solid form, no stone. Hand-polished to a low sheen.",
    rating: 4.8,
    reviewCount: 214,
  },
  {
    name: "Solaine Solitaire",
    category: "rings",
    collection: "signature",
    price: 3450,
    metals: ["white", "platinum", "yellow"],
    stones: ["diamond", "sapphire"],
    sizes: RING_SIZES,
    badges: ["EXCLUSIVE"],
    description:
      "A single brilliant held aloft on a knife-edge band, set high to let light pass beneath the stone.",
    story:
      "Solaine is our clearest statement of restraint — one stone, one line, nothing else asked of it.",
    dimensions: "Centre stone 0.5ct · Band 1.8mm · Weight 3.2g",
    stoneDetails:
      "0.5ct brilliant-cut, F colour, VS clarity. Four-claw platinum setting.",
    availability: "made-to-order",
    rating: 4.9,
    reviewCount: 96,
  },
  {
    name: "Cordon Stacking Band",
    category: "rings",
    collection: "essential",
    price: 420,
    metals: ["yellow", "white", "rose"],
    stones: ["none"],
    sizes: RING_SIZES,
    badges: [],
    description:
      "A fine twisted band designed to stand alone or layer endlessly — the quiet workhorse of the collection.",
    story:
      "Cordon takes the humble rope band and refines its pitch until the twist reads as a single continuous line.",
    dimensions: "Band 1.6mm · Weight 1.8g",
    stoneDetails: "No stone.",
    rating: 4.7,
    reviewCount: 341,
  },
  {
    name: "Nocturne Pavé Ring",
    category: "rings",
    collection: "nocturne",
    price: 1680,
    metals: ["white", "platinum"],
    stones: ["diamond", "sapphire", "ruby"],
    sizes: RING_SIZES,
    badges: ["NEW"],
    description:
      "Darkened shoulders give way to a close-set line of stones — light held low, the way evening holds it.",
    story:
      "Nocturne sets its stones deep and close so a single point of light travels the band as you move.",
    dimensions: "Band 2.2mm · 17 stones · Weight 2.9g",
    stoneDetails: "0.34ct total. Pavé-set with blackened rhodium shoulders.",
    availability: "low-stock",
    rating: 4.8,
    reviewCount: 58,
  },
  {
    name: "Aurelia Dome Ring",
    category: "rings",
    collection: "aurelia",
    price: 980,
    metals: ["yellow", "rose"],
    stones: ["none"],
    sizes: RING_SIZES,
    badges: [],
    description:
      "A generous rounded dome, warm and tactile, polished to an even golden glow.",
    story:
      "Aurelia's dome is modelled entirely by hand until it sits like a smooth river stone against the finger.",
    dimensions: "Dome 9mm · Band 3mm · Weight 5.4g",
    stoneDetails: "No stone.",
    rating: 4.6,
    reviewCount: 132,
  },

  // ---- Necklaces ----
  {
    name: "Ligne Pendant",
    category: "necklaces",
    collection: "essential",
    price: 640,
    metals: ["yellow", "white", "rose"],
    stones: ["diamond", "none"],
    sizes: ["40cm", "45cm", "50cm"],
    badges: ["BESTSELLER"],
    description:
      "A single vertical bar suspended on a fine chain — the most quietly modern pendant we make.",
    story:
      "Ligne reduces the pendant to one confident vertical stroke, weighted to always hang true.",
    dimensions: "Bar 18mm · Chain 1.1mm · Adjustable clasp",
    stoneDetails: "Optional 0.03ct flush-set diamond at the base of the bar.",
    rating: 4.8,
    reviewCount: 287,
  },
  {
    name: "Nocturne Drop Necklace",
    category: "necklaces",
    collection: "nocturne",
    price: 2150,
    metals: ["white", "platinum"],
    stones: ["sapphire", "emerald", "diamond"],
    sizes: ["42cm", "45cm"],
    badges: ["LIMITED"],
    description:
      "A deep-set solitaire drop that rests exactly at the hollow of the throat.",
    story:
      "The Nocturne drop is calibrated to fall at the throat's hollow, catching light only when you turn.",
    dimensions: "Drop 9mm · Chain 1.0mm",
    stoneDetails: "0.7ct centre stone in a bezel setting with darkened bail.",
    availability: "low-stock",
    rating: 4.9,
    reviewCount: 44,
  },
  {
    name: "Élan Curb Chain",
    category: "necklaces",
    collection: "elan",
    price: 1120,
    metals: ["yellow", "white"],
    stones: ["none"],
    sizes: ["45cm", "50cm", "55cm"],
    badges: [],
    description:
      "A fluid curb chain with hand-polished links that drape and move with a liquid weight.",
    story:
      "Élan's curb is tuned link by link until the whole chain moves like a single fluid line.",
    dimensions: "Link 4mm · Lobster clasp · Weight 14g",
    stoneDetails: "No stone.",
    rating: 4.7,
    reviewCount: 176,
  },
  {
    name: "Aurelia Collar",
    category: "necklaces",
    collection: "aurelia",
    price: 1890,
    metals: ["yellow", "rose"],
    stones: ["none"],
    sizes: ONE_SIZE,
    badges: ["NEW"],
    description:
      "A sculptural rounded collar that sits close to the neck — presence without weight.",
    story:
      "The Aurelia collar is formed as one continuous curve, warm against the skin from the moment it's worn.",
    dimensions: "Inner 120mm · Section 4mm · Weight 22g",
    stoneDetails: "No stone.",
    availability: "made-to-order",
    rating: 4.8,
    reviewCount: 39,
  },

  // ---- Earrings ----
  {
    name: "Petit Stud",
    category: "earrings",
    collection: "essential",
    price: 380,
    metals: ["yellow", "white", "rose"],
    stones: ["diamond"],
    sizes: ONE_SIZE,
    badges: ["BESTSELLER"],
    description:
      "The everyday stud, refined — a single stone held in a low four-claw setting.",
    story:
      "Petit is the stud we wear ourselves: small, secure, and set low enough to never catch.",
    dimensions: "3mm stone · Post fitting",
    stoneDetails: "0.10ct each, brilliant cut, G colour, VS clarity.",
    rating: 4.9,
    reviewCount: 512,
  },
  {
    name: "Sculpted Ear Cuff",
    category: "earrings",
    collection: "sculpted",
    price: 460,
    metals: ["yellow", "white", "rose"],
    stones: ["none"],
    sizes: ONE_SIZE,
    badges: [],
    description:
      "A weighted architectural cuff that grips the ear's edge — no piercing required.",
    story:
      "The Sculpted cuff is engineered as a single tensioned plane, balanced to stay put all day.",
    dimensions: "16mm × 8mm · Weight 2.1g",
    stoneDetails: "No stone.",
    rating: 4.6,
    reviewCount: 98,
  },
  {
    name: "Élan Threader",
    category: "earrings",
    collection: "elan",
    price: 540,
    metals: ["yellow", "white"],
    stones: ["diamond", "none"],
    sizes: ONE_SIZE,
    badges: [],
    description:
      "A fine chain threader that draws a moving line along the jaw.",
    story:
      "Élan's threader turns the earring into a gesture — a fine line that sways with every movement.",
    dimensions: "Chain drop 55mm",
    stoneDetails: "Optional 0.05ct terminal diamond.",
    rating: 4.7,
    reviewCount: 121,
  },
  {
    name: "Nocturne Hoop",
    category: "earrings",
    collection: "nocturne",
    price: 890,
    metals: ["white", "yellow"],
    stones: ["sapphire", "diamond"],
    sizes: ONE_SIZE,
    badges: ["NEW"],
    description:
      "A slim hoop lined on its inner edge with deep-set stones that reveal themselves only in motion.",
    story:
      "Nocturne hides its light on the inner curve — a private detail seen only when you turn.",
    dimensions: "20mm diameter · 2mm profile",
    stoneDetails: "0.24ct total, channel-set along the inner edge.",
    rating: 4.8,
    reviewCount: 67,
  },

  // ---- Bracelets ----
  {
    name: "Ligne Tennis Bracelet",
    category: "bracelets",
    collection: "signature",
    price: 4200,
    metals: ["white", "platinum", "yellow"],
    stones: ["diamond"],
    sizes: ["16cm", "17cm", "18cm"],
    badges: ["EXCLUSIVE"],
    description:
      "An unbroken line of brilliants, each individually set, articulated to trace the wrist.",
    story:
      "Our tennis bracelet is set stone by stone so the line stays perfectly even as it moves.",
    dimensions: "42 stones · 2.5mm width",
    stoneDetails: "2.1ct total, F–G colour, VS clarity, four-claw settings.",
    availability: "made-to-order",
    rating: 4.9,
    reviewCount: 51,
  },
  {
    name: "Élan Link Bracelet",
    category: "bracelets",
    collection: "elan",
    price: 980,
    metals: ["yellow", "white"],
    stones: ["none"],
    sizes: ["16cm", "17cm", "18cm", "19cm"],
    badges: ["BESTSELLER"],
    description:
      "Fluid oval links that pool in the hand and lie flat on the wrist.",
    story:
      "Élan's link is weighted to drape — it should feel like liquid before it settles.",
    dimensions: "Link 6mm · Weight 11g",
    stoneDetails: "No stone.",
    rating: 4.8,
    reviewCount: 203,
  },
  {
    name: "Cordon Chain Bracelet",
    category: "bracelets",
    collection: "essential",
    price: 360,
    metals: ["yellow", "white", "rose"],
    stones: ["none"],
    sizes: ["16cm", "17cm", "18cm"],
    badges: [],
    description:
      "The fine twisted chain, scaled for the wrist — made to layer and never remove.",
    story:
      "Cordon for the wrist keeps the same honest twist, sized to disappear into daily wear.",
    dimensions: "1.6mm · Adjustable to 18cm",
    stoneDetails: "No stone.",
    rating: 4.7,
    reviewCount: 268,
  },

  // ---- Bangles ----
  {
    name: "Sculpted Cuff",
    category: "bangles",
    collection: "sculpted",
    price: 1450,
    metals: ["yellow", "white", "rose"],
    stones: ["none"],
    sizes: BAND_SIZES,
    badges: [],
    description:
      "A wide open cuff with a squared profile — deliberate weight, deliberate presence.",
    story:
      "The Sculpted cuff is drawn as two clean planes meeting at a soft edge, weighted to feel substantial.",
    dimensions: "Width 12mm · Weight 34g",
    stoneDetails: "No stone.",
    rating: 4.7,
    reviewCount: 84,
  },
  {
    name: "Aurelia Bangle",
    category: "bangles",
    collection: "aurelia",
    price: 1180,
    metals: ["yellow", "rose"],
    stones: ["none"],
    sizes: BAND_SIZES,
    badges: ["NEW"],
    description:
      "A rounded tubular bangle with a warm, even glow — smooth to hold, smooth to wear.",
    story:
      "Aurelia's bangle is a single warm curve, polished until the surface reads as light itself.",
    dimensions: "Section 5mm · Inner 60mm",
    stoneDetails: "No stone.",
    rating: 4.8,
    reviewCount: 72,
  },
  {
    name: "Signature Diamond Bangle",
    category: "bangles",
    collection: "signature",
    price: 5600,
    metals: ["white", "platinum"],
    stones: ["diamond"],
    sizes: BAND_SIZES,
    badges: ["LIMITED", "EXCLUSIVE"],
    description:
      "A hinged bangle with a graduated line of brilliants — the collection's most demanding piece.",
    story:
      "The Signature bangle graduates its stones by hundredths of a carat to keep the line visually perfect.",
    dimensions: "23 stones · Hinged closure",
    stoneDetails: "3.4ct total, F colour, VVS–VS clarity.",
    availability: "made-to-order",
    rating: 5.0,
    reviewCount: 22,
  },

  // ---- Charms ----
  {
    name: "Initial Charm",
    category: "charms",
    collection: "essential",
    price: 240,
    metals: ["yellow", "white", "rose"],
    stones: ["none"],
    sizes: ONE_SIZE,
    badges: ["BESTSELLER"],
    description:
      "A rounded disc charm ready to be engraved with a letter, a date, a coordinate.",
    story:
      "The Initial charm is the first line of a personal narrative — chosen, engraved, then added to.",
    dimensions: "12mm disc · Fits chains to 2mm",
    stoneDetails: "No stone. Engraving available.",
    rating: 4.8,
    reviewCount: 356,
  },
  {
    name: "Birthstone Charm",
    category: "charms",
    collection: "elan",
    price: 320,
    metals: ["yellow", "white", "rose"],
    stones: ["sapphire", "emerald", "ruby", "diamond"],
    sizes: ONE_SIZE,
    badges: [],
    description:
      "A single bezel-set stone on a clip — chosen by month, meaning, or simply colour.",
    story:
      "The Birthstone charm carries a single point of colour, ready to mark a person or a moment.",
    dimensions: "6mm bezel · Spring clip",
    stoneDetails: "One 0.2ct bezel-set stone in your chosen colour.",
    rating: 4.7,
    reviewCount: 189,
  },
  {
    name: "Nocturne Locket Charm",
    category: "charms",
    collection: "nocturne",
    price: 680,
    metals: ["white", "yellow"],
    stones: ["diamond", "none"],
    sizes: ONE_SIZE,
    badges: ["NEW"],
    description:
      "A slim darkened locket that opens to hold what matters most.",
    story:
      "Nocturne's locket keeps its secret behind a darkened face, opening only for you.",
    dimensions: "16mm × 12mm · Hinged",
    stoneDetails: "Optional 0.02ct diamond on the face.",
    rating: 4.9,
    reviewCount: 41,
  },
];

function buildProduct(s: Seed, indexInCategory: number): Product {
  const slug = slugify(s.name);
  return {
    id: slug,
    name: s.name,
    slug,
    price: s.price,
    currency: "USD",
    category: s.category,
    categoryLabel: CATEGORY_LABEL[s.category],
    collection: s.collection,
    collectionLabel: COLLECTION_LABEL[s.collection],
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
export const products: Product[] = seeds.map((s) => {
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

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productsByCategory = (category: CategorySlug) =>
  products.filter((p) => p.category === category);

export const productsByCollection = (collection: string) =>
  products.filter((p) => p.collection === collection);

export const productById = (id: string) => products.find((p) => p.id === id);

export const newArrivals = () =>
  products.filter((p) => p.badges.includes("NEW"));

export const bestSellers = () =>
  products.filter((p) => p.badges.includes("BESTSELLER"));
