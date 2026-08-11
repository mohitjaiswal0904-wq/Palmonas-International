export type HomeCategory = {
  id: string;
  label: string;
  href: string;
  image: string;
  seed: string;
};

/**
 * Homepage category strip — white-ground studio cutouts for a consistent circle look.
 */
export const homeCategories: HomeCategory[] = [
  {
    id: "earrings",
    label: "Earrings",
    href: "/jewellery/earrings",
    image:
      "https://cdn.shopify.com/s/files/1/0613/1400/7297/files/ERS0143-Y_00000_compressed.jpg",
    seed: "home-circle-earrings",
  },
  {
    id: "necklaces",
    label: "Necklaces",
    href: "/jewellery/necklaces",
    image:
      "https://cdn.shopify.com/s/files/1/0613/1400/7297/files/NKS0053-Y_00000_compressed.jpg",
    seed: "home-circle-necklaces",
  },
  {
    id: "bracelets",
    label: "Bracelets",
    href: "/jewellery/bracelets",
    image:
      "https://cdn.shopify.com/s/files/1/0613/1400/7297/files/BRS0006_Y_00000_1__compressed.jpg",
    seed: "home-circle-bracelets",
  },
  {
    id: "rings",
    label: "Rings",
    href: "/jewellery/rings",
    image:
      "https://cdn.shopify.com/s/files/1/0613/1400/7297/files/RGS0057-5-Y_00000_compressed.jpg",
    seed: "home-circle-rings",
  },
  {
    id: "mangalsutras",
    label: "Mangalsutras",
    href: "/jewellery/necklaces",
    image:
      "https://cdn.shopify.com/s/files/1/0613/1400/7297/files/Shopify_1b978810-20aa-4b09-be98-0c872bda03c3.jpg",
    seed: "home-circle-mangalsutras",
  },
  {
    id: "mens",
    label: "Mens",
    href: "/jewellery/bracelets",
    image:
      "https://cdn.shopify.com/s/files/1/0613/1400/7297/files/Shopify_262b995c-3607-414c-bca5-0edf968ef2e6.jpg",
    seed: "home-circle-mens",
  },
];
