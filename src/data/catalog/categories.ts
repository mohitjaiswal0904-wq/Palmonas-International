import type { Category } from "@/types";
import { CATEGORY_LABELS } from "./taxonomy";

/**
 * Authored category copy. `image` is filled at load by products.ts (enrich).
 */
export const categories: Category[] = [
  {
    slug: "rings",
    label: CATEGORY_LABELS.rings,
    description:
      "From the barely-there band to the singular signature stone — rings resolved to their essential line.",
    image: "",
  },
  {
    slug: "necklaces",
    label: CATEGORY_LABELS.necklaces,
    description:
      "Chains, pendants and collars designed to layer or stand alone, drawn to sit precisely at the collarbone.",
    image: "",
  },
  {
    slug: "earrings",
    label: CATEGORY_LABELS.earrings,
    description:
      "Studs, drops and hoops calibrated for balance and weight — jewellery for the face at close range.",
    image: "",
  },
  {
    slug: "bracelets",
    label: CATEGORY_LABELS.bracelets,
    description:
      "Fluid links and fine chains that trace the wrist, engineered to move without catching.",
    image: "",
  },
  {
    slug: "bangles",
    label: CATEGORY_LABELS.bangles,
    description:
      "Sculptural forms with weight and presence, designed to be worn singly or stacked.",
    image: "",
  },
  {
    slug: "charms",
    label: CATEGORY_LABELS.charms,
    description:
      "Small tokens made to be collected and carried — the beginning of a personal narrative.",
    image: "",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
