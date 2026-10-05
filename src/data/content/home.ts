import type { HomeCategory, HomeStyle, HomeUsp } from "@/types";
import { BANNERS, CATEGORY_IMAGERY } from "@/data/generated/imagery";

/** Figma International-Mobile homepage photography (`node 13:2`). */
export const HOME_IMAGES = {
  hero: "/brand/home/hero.png",
  rings: "/brand/home/cat-rings.jpg",
  necklaces: "/brand/home/cat-necklaces.jpg",
  earrings: "/brand/home/cat-earrings.jpg",
  bracelets: "/brand/home/cat-bracelets.jpg",
  styleHeart: "/brand/home/style-heart.png",
  styleAmToPm: "/brand/home/style-am-to-pm.png",
  styleBeach: "/brand/home/style-beach.png",
  styleVacay: "/brand/home/style-vacay.png",
  styleForeverCasual: "/brand/home/style-forever-casual.png",
  stylePearl: "/brand/home/style-pearl.png",
  styleEmily: "/brand/home/style-emily.png",
  styleMens: "/brand/home/style-mens.png",
  butterfly: "/brand/home/story-butterfly.png",
  evilEye: "/brand/home/story-evil-eye.png",
  gifting: "/brand/home/gifting.jpg",
} as const;

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

/** Homepage 2×2 “Find your piece” — Figma form tiles. */
export const homeFormTiles = [
  {
    slug: "rings",
    label: "Rings",
    href: "/jewellery/rings",
    image: HOME_IMAGES.rings,
    seed: "home-cat-rings",
    kind: "ring" as const,
  },
  {
    slug: "necklaces",
    label: "Necklaces",
    href: "/jewellery/necklaces",
    image: HOME_IMAGES.necklaces,
    seed: "home-cat-necklaces",
    kind: "necklace" as const,
  },
  {
    slug: "earrings",
    label: "Earrings",
    href: "/jewellery/earrings",
    image: HOME_IMAGES.earrings,
    seed: "home-cat-earrings",
    kind: "earring" as const,
  },
  {
    slug: "bracelets",
    label: "Bracelets",
    href: "/jewellery/bracelets",
    image: HOME_IMAGES.bracelets,
    seed: "home-cat-bracelets",
    kind: "bracelet" as const,
  },
];

/**
 * Homepage “Shop by style” — mood collections with short taglines.
 * Links go to live catalogue routes (empty collection pages 404).
 */
export const homeStyleSection = {
  eyebrow: "Shop by style",
  title: "Find your language",
  body: "Each collection is a mood you can wear — pick the one that sounds like you.",
  cta: { label: "All collections", href: "/collections" },
};

export const homeStyles: HomeStyle[] = [
  {
    id: "heart",
    label: "Heart Collection",
    tagline: "Love, worn close.",
    href: "/jewellery?q=heart",
    image: HOME_IMAGES.styleHeart,
    seed: "home-style-heart",
  },
  {
    id: "am-to-pm",
    label: "AM to PM Collection",
    tagline: "Dawn to dark.",
    href: "/jewellery?sort=bestsellers",
    image: HOME_IMAGES.styleAmToPm,
    seed: "home-style-am-to-pm",
  },
  {
    id: "beach",
    label: "Beach Collection",
    tagline: "Salt, sun, and gold.",
    href: "/jewellery?q=beach",
    image: HOME_IMAGES.styleBeach,
    seed: "home-style-beach",
  },
  {
    id: "vacay-mode",
    label: "Vacay Mode",
    tagline: "Luxury, off-duty.",
    href: "/collections/essential",
    image: HOME_IMAGES.styleVacay,
    seed: "home-style-vacay-mode",
  },
  {
    id: "forever-casual",
    label: "Forever Casual",
    tagline: "Easy, every day.",
    href: "/collections/essential",
    image: HOME_IMAGES.styleForeverCasual,
    seed: "home-style-forever-casual",
  },
  {
    id: "pearl",
    label: "Pearl Collection",
    tagline: "Glow, not glitter.",
    href: "/jewellery?q=pearl",
    image: HOME_IMAGES.stylePearl,
    seed: "home-style-pearl",
  },
  {
    id: "emily-in-paris",
    label: "Emily In Paris",
    tagline: "Paris, every day.",
    href: "/collections/elan",
    image: HOME_IMAGES.styleEmily,
    seed: "home-style-emily-in-paris",
  },
  {
    id: "mens",
    label: "Men’s Collection",
    tagline: "Quiet, considered.",
    href: "/jewellery?q=ball+chain",
    image: HOME_IMAGES.styleMens,
    seed: "home-style-mens",
  },
];

export const homeCollectionStories = [
  {
    id: "butterfly",
    title: "ButterFly",
    body: "Elegant, effortless jewellery designed for your everyday workwear. From subtle essentials to refined statement pieces, find styles that add a polished touch to your office look—without ever feeling overdone.",
    cta: { label: "Explore ButterFly", href: "/jewellery?q=butterfly" },
    image: HOME_IMAGES.butterfly,
    seed: "home-story-butterfly",
    alt: "Butterfly collection",
  },
  {
    id: "evil-eye",
    title: "Evil Eye",
    body: "Effortless jewellery made for every day. From delicate everyday essentials to versatile styles, find pieces that add a touch of elegance to your look, wherever the day takes you.",
    cta: { label: "Explore Evil Eye", href: "/jewellery?q=evil+eye" },
    image: HOME_IMAGES.evilEye,
    seed: "home-story-evil-eye",
    alt: "Evil Eye collection",
  },
];

export const homeGifting = {
  eyebrow: "Gifting",
  title: "Pieces worth giving",
  body: "From fine silver essentials to solid 9KT gold — choose a piece that feels considered, ready to wear from the first day.",
  cta: { label: "Explore gifting", href: "/jewellery?sort=bestsellers" },
};

export const homeUsps: HomeUsp[] = [
  { id: "anti-tarnish", label: "Anti-Tarnish", icon: "/brand/usp/anti-tarnish.svg" },
  { id: "skin-safe", label: "Skin Safe Jewellery", icon: "/brand/usp/skin-safe.svg" },
  { id: "gold-tone", label: "18K Gold Tone Plated", icon: "/brand/usp/gold-tone.svg" },
];
