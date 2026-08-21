import type { Collection } from "@/types";
import { COLLECTION_LABELS } from "./taxonomy";

/**
 * Authored collection copy. Images + productIds are filled at load by products.ts.
 */
export const collections: Collection[] = [
  {
    id: "essential",
    name: COLLECTION_LABELS.essential,
    slug: "essential",
    tagline: "The pieces you never take off",
    description:
      "Quiet forms refined to their most honest line. Everyday jewellery engineered to be worn continuously — through water, movement and years.",
    story:
      "Essential began with a single question: what would you keep if you kept only one thing? Each piece is stripped to its most resolved silhouette, then finished by hand so it feels considered rather than plain. Nothing decorative, nothing accidental.",
    heroImage: "",
    editorialImage: "",
    productIds: [],
  },
  {
    id: "nocturne",
    name: COLLECTION_LABELS.nocturne,
    slug: "nocturne",
    tagline: "For the hours after dark",
    description:
      "Deep-set stones and blackened contrast. A collection composed in low light, made for the moments a day gives way to an evening.",
    story:
      "Nocturne studies the way jewellery behaves when the light is scarce. Stones are set low and close, metals darkened at the shoulder, so each piece catches a single point of light and holds it. Restraint, rendered nocturnal.",
    heroImage: "",
    editorialImage: "",
    productIds: [],
  },
  {
    id: "aurelia",
    name: COLLECTION_LABELS.aurelia,
    slug: "aurelia",
    tagline: "Warmth, cast in gold",
    description:
      "Rounded volumes and warm 18k tones. Aurelia is our softest language — sculptural, tactile and unmistakably golden without ever shouting.",
    story:
      "Named for the first light of morning, Aurelia is built on curve rather than edge. Each form is modelled to sit warm against the skin, its surfaces polished to a low, even glow that reads as warmth rather than shine.",
    heroImage: "",
    editorialImage: "",
    productIds: [],
  },
  {
    id: "sculpted",
    name: COLLECTION_LABELS.sculpted,
    slug: "sculpted",
    tagline: "Architecture for the body",
    description:
      "Bold planes and deliberate weight. Sculpted treats jewellery as small architecture — objects with presence, balance and intent.",
    story:
      "Sculpted is drawn before it is cast. Every angle is resolved as a plane, every join considered as a structural decision. The result is jewellery with the confidence of an object designed to last generations.",
    heroImage: "",
    editorialImage: "",
    productIds: [],
  },
  {
    id: "elan",
    name: COLLECTION_LABELS.elan,
    slug: "elan",
    tagline: "Movement, in miniature",
    description:
      "Fluid lines and pieces that move with you. Élan captures motion — links that drape, drops that sway, forms that never feel static.",
    story:
      "Élan is engineered around movement. Articulated links, weighted drops and open forms are calibrated so each piece finds its own rhythm as you move. Jewellery that behaves less like an object and more like a gesture.",
    heroImage: "",
    editorialImage: "",
    productIds: [],
  },
  {
    id: "signature",
    name: COLLECTION_LABELS.signature,
    slug: "signature",
    tagline: "Our most considered work",
    description:
      "The definitive Palmonas pieces. Limited runs, exceptional stones and the highest expression of the house's craft.",
    story:
      "Signature is where the house makes its clearest statements. Produced in limited numbers with our finest stones and most demanding finishing, each piece is intended to become an heirloom — a first acquisition, then an inheritance.",
    heroImage: "",
    editorialImage: "",
    productIds: [],
  },
  {
    id: "ode-to-nature",
    name: COLLECTION_LABELS["ode-to-nature"],
    slug: "ode-to-nature",
    tagline: "Nature, cast in silver and gold",
    description:
      "Inspired by beetles, moths, ladybugs and woodland blooms — 925 sterling silver pieces finished in radiant 14kt gold, from the Ode To Nature collection.",
    story:
      "Ode To Nature celebrates the intricate beauty of the natural world. Each piece is crafted in 925 Sterling Silver with a luminous 14kt gold finish, bringing insect and botanical motifs into everyday fine jewellery — playful, refined, and made to be worn.",
    heroImage: "",
    editorialImage: "",
    productIds: [],
  },
  {
    id: "9kt-fine-gold",
    name: COLLECTION_LABELS["9kt-fine-gold"],
    slug: "9kt-fine-gold",
    tagline: "Solid 9KT gold, lab-grown diamonds",
    description:
      "An exquisite 9KT solid gold collection with laboratory grown diamonds — rings, earrings, bracelets, pendants and more for everyday sparkle and special occasions.",
    story:
      "9KT Fine Gold brings hallmarked solid gold jewellery with laboratory grown diamonds into daily wear. Personalize in yellow, white or rose gold tones — modern silhouettes crafted for lasting brilliance.",
    heroImage: "",
    editorialImage: "",
    productIds: [],
  },
];

export const collectionBySlug = (slug: string) =>
  collections.find((c) => c.slug === slug);
