import type { HomeCategory, HomeStyle } from "@/types";
import { BANNERS, CATEGORY_IMAGERY } from "@/data/generated/imagery";

/**
 * Homepage category strip — images resolve from generated catalogue photography.
 * Marketing buckets use live catalogue queries (not empty category routes).
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
    href: "/jewellery?q=mangalsutra",
    image: BANNERS.story,
    seed: "home-circle-mangalsutras",
  },
  {
    id: "mens",
    label: "Mens",
    href: "/jewellery?q=ball+chain",
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
    id: "essential",
    label: "Essential",
    tagline: "Everyday silver, refined",
    href: "/collections/essential",
    image: BANNERS.hero,
    seed: "home-style-essential",
  },
  {
    id: "ode-to-nature",
    label: "Ode To Nature",
    tagline: "Insects & blooms in silver",
    href: "/collections/ode-to-nature",
    image: BANNERS.collection,
    seed: "home-style-ode-to-nature",
  },
  {
    id: "9kt-fine-gold",
    label: "9KT Fine Gold",
    tagline: "Solid gold, lab diamonds",
    href: "/collections/9kt-fine-gold",
    image: BANNERS.story,
    seed: "home-style-9kt-fine-gold",
  },
  {
    id: "rings",
    label: "Nature rings",
    tagline: "Ladybugs, moths & beetles",
    href: "/jewellery/rings",
    image: BANNERS.personalisation,
    seed: "home-style-rings",
  },
  {
    id: "earrings",
    label: "Nature earrings",
    tagline: "Wings, hoops & earcuffs",
    href: "/jewellery/earrings",
    image: BANNERS.personalisation,
    seed: "home-style-earrings",
  },
  {
    id: "new",
    label: "New arrivals",
    tagline: "Fresh arrivals",
    href: "/jewellery?sort=new",
    image: BANNERS.signature,
    seed: "home-style-new",
  },
];
