export type HomeStyle = {
  id: string;
  label: string;
  tagline: string;
  href: string;
  image: string;
  seed: string;
};

/**
 * Homepage “Shop by style” — aesthetic languages linked to collections.
 */
export const homeStyles: HomeStyle[] = [
  {
    id: "everyday",
    label: "Everyday",
    tagline: "Pieces you never take off",
    href: "/collections/essential",
    image:
      "https://cdn.shopify.com/s/files/1/0613/1400/7297/files/Shopify_1_compressed_a26ef832-ea5a-4ead-adf8-fe96f3d0e660.jpg",
    seed: "home-style-everyday",
  },
  {
    id: "after-dark",
    label: "After dark",
    tagline: "Composed for low light",
    href: "/collections/nocturne",
    image:
      "https://cdn.shopify.com/s/files/1/0613/1400/7297/files/Shopify_2_compressed_121eaebb-131c-49e9-b628-11e9dbdb16d3.jpg",
    seed: "home-style-after-dark",
  },
  {
    id: "soft-gold",
    label: "Soft gold",
    tagline: "Warmth, cast in gold",
    href: "/collections/aurelia",
    image:
      "https://cdn.shopify.com/s/files/1/0613/1400/7297/files/Shopify_1_compressed_ee8e0a22-437a-494f-848c-04ce4985e574.jpg",
    seed: "home-style-soft-gold",
  },
  {
    id: "sculptural",
    label: "Sculptural",
    tagline: "Architecture for the body",
    href: "/collections/sculpted",
    image:
      "https://cdn.shopify.com/s/files/1/0613/1400/7297/files/Shopify_3_compressed_bbc7d9c0-5d29-4dfa-8b21-f2de8ecd5c91.jpg",
    seed: "home-style-sculptural",
  },
  {
    id: "in-motion",
    label: "In motion",
    tagline: "Fluid lines that move",
    href: "/collections/elan",
    image:
      "https://cdn.shopify.com/s/files/1/0613/1400/7297/files/Shopify_2_compressed_611726fb-f4a0-4d95-be29-a830e9d6f55e.jpg",
    seed: "home-style-in-motion",
  },
];
