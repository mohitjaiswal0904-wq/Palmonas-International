export type MegaColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export type NavLink = {
  label: string;
  href: string;
};

export type NavEntry = {
  label: string;
  href: string;
  /** Compact flyout list (e.g. About Us) */
  menu?: NavLink[];
  mega?: {
    columns: MegaColumn[];
    editorial: {
      eyebrow: string;
      title: string;
      href: string;
      seed: string;
    };
  };
};

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
    href: "/jewellery?metal=white",
  },
  {
    label: "9KT Fine Gold",
    href: "/jewellery?metal=yellow",
  },
  {
    label: "Demifine ® Collection",
    href: "/jewellery",
    mega: {
      columns: [
        {
          title: "Collections",
          links: [
            { label: "Emily In Paris", href: "/collections/elan" },
            { label: "Shraddha's Favourite", href: "/collections/signature" },
            { label: "Tanya Ghavri Collection", href: "/collections/aurelia" },
            { label: "Nocturne", href: "/collections/nocturne" },
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
            { label: "Bangles", href: "/jewellery/bangles" },
            { label: "Charms", href: "/jewellery/charms" },
          ],
        },
        {
          title: "Discover",
          links: [
            { label: "New Arrivals", href: "/jewellery?sort=new" },
            { label: "Best Sellers", href: "/jewellery?sort=bestsellers" },
            { label: "Personalisation", href: "/jewellery/charms" },
            { label: "Gifting", href: "/jewellery?sort=new" },
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
    href: "/jewellery/charms",
  },
  {
    label: "More",
    href: "/about",
    menu: [
      { label: "About Us", href: "/about" },
      { label: "Blogs", href: "/blogs" },
      { label: "Contact Us", href: "/contact" },
      { label: "Support", href: "/support" },
      { label: "Career", href: "/careers" },
      { label: "Stores & Services", href: "/stores" },
    ],
  },
];

export const announcements = [
  "Complimentary express delivery worldwide",
  "18k thick gold plating · water-safe · made to be worn",
  "Book a private virtual appointment with a specialist",
];
