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

/** Policy / about / help pages rendered by InfoPageView. */
export type InfoBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "note"; text: string }
  | { type: "cta"; label: string; href: string };

export type InfoPage = {
  slug: string;
  title: string;
  description: string;
  group: "policy" | "help" | "about";
  eyebrow?: string;
  blocks: InfoBlock[];
};

/** Footer content shapes (`src/data/content/footer.ts`). */
export type FooterLink = { label: string; href: string };

export type FooterBlock = {
  title: string;
  paragraphs: string[];
  list?: string[];
  italic?: string;
  sections?: { title: string; paragraphs: string[] }[];
};

export type FooterFaq = { question: string; answer: string };

