import type { HomeCategory, HomeStyle } from "@/types";
import { BANNERS, CATEGORY_IMAGERY } from "@/data/generated/imagery";

/**
 * Homepage category strip — images resolve from generated catalogue photography.
 * Marketing buckets (mangalsutras, mens) map onto existing category routes.
 */
export const homeCategories: HomeCategory[] = [
  {
    id: "earrings",
    label: "Earrings",
    href: "/jewellery/earrings",
    image: CATEGORY_IMAGERY.earrings[0]?.primary ?? "",
    seed: "home-circle-earrings",
  },
  {
    id: "necklaces",
    label: "Necklaces",
    href: "/jewellery/necklaces",
    image: CATEGORY_IMAGERY.necklaces[0]?.primary ?? "",
    seed: "home-circle-necklaces",
  },
  {
    id: "bracelets",
    label: "Bracelets",
    href: "/jewellery/bracelets",
    image: CATEGORY_IMAGERY.bracelets[0]?.primary ?? "",
    seed: "home-circle-bracelets",
  },
  {
    id: "rings",
    label: "Rings",
    href: "/jewellery/rings",
    image: CATEGORY_IMAGERY.rings[0]?.primary ?? "",
    seed: "home-circle-rings",
  },
  {
    id: "mangalsutras",
    label: "Mangalsutras",
    href: "/jewellery/necklaces",
    image: BANNERS.story,
    seed: "home-circle-mangalsutras",
  },
  {
    id: "mens",
    label: "Mens",
    href: "/jewellery/bracelets",
    image: BANNERS.collection,
    seed: "home-circle-mens",
  },
];

/**
 * Homepage “Shop by style” — aesthetic languages linked to collections.
 * Banner keys come from generated `BANNERS`, not duplicated CDN URLs.
 */
export const homeStyles: HomeStyle[] = [
  {
    id: "everyday",
    label: "Everyday",
    tagline: "Pieces you never take off",
    href: "/collections/essential",
    image: BANNERS.collection,
    seed: "home-style-everyday",
  },
  {
    id: "after-dark",
    label: "After dark",
    tagline: "Composed for low light",
    href: "/collections/nocturne",
    image: BANNERS.story,
    seed: "home-style-after-dark",
  },
  {
    id: "soft-gold",
    label: "Soft gold",
    tagline: "Warmth, cast in gold",
    href: "/collections/aurelia",
    image: BANNERS.personalisation,
    seed: "home-style-soft-gold",
  },
  {
    id: "sculptural",
    label: "Sculptural",
    tagline: "Architecture for the body",
    href: "/collections/sculpted",
    image: BANNERS.signature,
    seed: "home-style-sculptural",
  },
  {
    id: "in-motion",
    label: "In motion",
    tagline: "Fluid lines that move",
    href: "/collections/elan",
    image: BANNERS.hero,
    seed: "home-style-in-motion",
  },
];
