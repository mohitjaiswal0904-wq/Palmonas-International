/** Marketing / content domain — nav, homepage strips, announcements. */

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

export type HomeCategory = {
  id: string;
  label: string;
  href: string;
  image: string;
  seed: string;
};

export type HomeStyle = {
  id: string;
  label: string;
  tagline: string;
  href: string;
  image: string;
  seed: string;
};
