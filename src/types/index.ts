/**
 * Domain glossary — import from `@/types`.
 *
 * - catalog: products, categories, collections, imagery shapes
 * - commerce: regions, stores
 * - content: navigation, homepage marketing
 */

export type {
  CategorySlug,
  CollectionSlug,
  MetalOption,
  StoneOption,
  ProductBadge,
  PlateKind,
  ProductImage,
  Product,
  Collection,
  Category,
  ImageSet,
} from "./catalog";

export type { Region, Store } from "./commerce";

export type {
  MegaColumn,
  NavLink,
  NavEntry,
  HomeCategory,
  HomeStyle,
} from "./content";
