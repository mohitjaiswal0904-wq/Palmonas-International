/**
 * Essential — everyday silver chains & bracelets (curated from palmonas.com).
 * Rhodium-plated 925 silver; not gold-plated Ode pieces.
 */
import type { ProductSeed } from "../product-seed.types";
import { BAND_SIZES, ONE_SIZE, inrToUsd } from "../product-seed.types";

export const essentialSeeds: ProductSeed[] = [
  {
    name: "925 Sterling Silver Beat Drop Bracelet",
    category: "bracelets",
    collection: "essential",
    price: inrToUsd(2650),
    metals: ["silver"],
    stones: ["none"],
    sizes: BAND_SIZES,
    badges: ["NEW"],
    description:
      "Delicate movement and timeless shine come together in a bracelet designed for effortless elegance. The Beat Drop Bracelet is crafted from genuine 925 sterling silver with a rhodium plated finish, featuring refined drop accents that create graceful movement with every gesture.",
    story:
      "Stack with fine chains or wear alone against a cuff. Made for everyday polish — office to evening.",
    dimensions: "Net Quantity: 1",
    stoneDetails: "Base Metal: 925 Sterling Silver · Finish: Rhodium plated · Closure: Lobster",
    rating: 0,
    reviewCount: 0,
  },
  {
    name: "925 Sterling Silver Flight Path Bracelet",
    category: "bracelets",
    collection: "essential",
    price: inrToUsd(2668),
    metals: ["silver"],
    stones: ["cz"],
    sizes: BAND_SIZES,
    badges: ["NEW"],
    description:
      "The Flight Path Bracelet captures the effortless beauty of graceful movement with its delicate flying bird motifs, symbolising freedom, hope, and new beginnings. Expertly crafted in 925 Sterling Silver, each detail is accented with sparkling stones that add subtle brilliance.",
    story:
      "Pair with soft knits and open collars. A light everyday bracelet with a quiet narrative.",
    dimensions: "Net Quantity: 1",
    stoneDetails: "Base Metal: 925 Sterling Silver · Type of Stone: Cubic Zirconia",
    rating: 0,
    reviewCount: 0,
  },
  {
    name: "925 Sterling Silver Link Up Bracelet",
    category: "bracelets",
    collection: "essential",
    price: inrToUsd(2452),
    metals: ["silver"],
    stones: ["none"],
    sizes: BAND_SIZES,
    badges: ["BESTSELLER"],
    description:
      "Modern links, timeless shine, and effortless versatility in one elegant design. The Link Up Bracelet is crafted from genuine 925 sterling silver with a rhodium plated finish, featuring interconnected links that create a sleek and contemporary silhouette.",
    story:
      "Wear solo for a clean line, or layer with a second bracelet for quiet rhythm.",
    dimensions: "Net Quantity: 1",
    stoneDetails: "Base Metal: 925 Sterling Silver · Finish: Rhodium plated",
    rating: 0,
    reviewCount: 0,
  },
  {
    name: "925 Sterling Silver Charm Line Necklace",
    category: "necklaces",
    collection: "essential",
    price: inrToUsd(3232),
    metals: ["silver"],
    stones: ["none"],
    sizes: ONE_SIZE,
    badges: ["NEW"],
    description:
      "Delicate charms and refined details create a necklace that feels effortlessly elegant. The Charm Line Necklace is crafted from genuine 925 sterling silver with a rhodium plated finish, featuring thoughtfully placed charm accents along a sleek chain.",
    story:
      "Layer over a crew neck or let it sit alone at the collarbone. A starting point for a charm story.",
    dimensions: "Net Quantity: 1",
    stoneDetails: "Base Metal: 925 Sterling Silver · Finish: Rhodium plated",
    rating: 0,
    reviewCount: 0,
  },
  {
    name: "925 Silver Ball Chain",
    category: "necklaces",
    collection: "essential",
    price: inrToUsd(7349),
    metals: ["silver"],
    stones: ["none"],
    sizes: ONE_SIZE,
    badges: ["BESTSELLER"],
    description:
      "Make a subtle statement with the 925 Silver Ball Chain, crafted from rhodium-plated 925 sterling silver for lasting shine and durability. Its rounded bead design adds texture and a modern masculine touch, making it a versatile piece for everyday wear or special occasions.",
    story:
      "Wear solo for a clean masculine line, or layer with a pendant. Built for daily rotation.",
    dimensions: "Net Quantity: 1",
    stoneDetails: "Base Metal: 925 Sterling Silver · Finish: Rhodium plated · Style: Men's chain",
    rating: 0,
    reviewCount: 0,
  },
];
