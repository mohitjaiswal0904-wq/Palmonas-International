import type { NavEntry } from "@/types";

export type { MegaColumn, NavLink, NavEntry } from "@/types";

export const primaryNav: NavEntry[] = [
  {
    label: "New Arrivals",
    href: "/jewellery?sort=new",
  },
  {
    label: "Best Seller",
    href: "/jewellery?sort=bestsellers",
  },
  {
    label: "Fine Silver",
    href: "/jewellery?metal=silver",
  },
  {
    label: "9KT Fine Gold",
    href: "/collections/9kt-fine-gold",
  },
  {
    label: "Demifine ® Collection",
    href: "/jewellery",
    mega: {
      columns: [
        {
          title: "Collections",
          links: [
            { label: "Ode To Nature", href: "/collections/ode-to-nature" },
            { label: "9KT Fine Gold", href: "/collections/9kt-fine-gold" },
            { label: "Essential", href: "/collections/essential" },
            { label: "View all collections", href: "/collections" },
          ],
        },
        {
          title: "Jewellery",
          links: [
            { label: "Rings", href: "/jewellery/rings" },
            { label: "Necklaces", href: "/jewellery/necklaces" },
            { label: "Earrings", href: "/jewellery/earrings" },
            { label: "Bracelets", href: "/jewellery/bracelets" },
            { label: "Charms", href: "/jewellery/charms" },
          ],
        },
        {
          title: "Discover",
          links: [
            { label: "New Arrivals", href: "/jewellery?sort=new" },
            { label: "Best Sellers", href: "/jewellery?sort=bestsellers" },
            { label: "Mangalsutras", href: "/jewellery?q=mangalsutra" },
            { label: "Gifting", href: "/jewellery?sort=bestsellers" },
          ],
        },
      ],
      editorial: {
        eyebrow: "Demifine ® Collection",
        title: "Modern jewellery, made to be worn",
        href: "/jewellery",
        seed: "mega-demifine-editorial",
      },
    },
  },
  {
    label: "Gifting",
    href: "/jewellery?sort=bestsellers",
  },
  {
    label: "More",
    href: "/about",
    menu: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Support", href: "/contact" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Stores & Services", href: "/stores" },
    ],
  },
];
