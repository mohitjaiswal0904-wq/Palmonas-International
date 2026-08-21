/**
 * Domain glossary — import from `@/types`.
 *
 * - catalog: products, categories, collections, imagery shapes
 * - commerce: regions, retail boutiques
 * - content: navigation, homepage, info/footer page shapes
 * - account: orders, addresses
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
  InfoBlock,
  InfoPage,
  FooterLink,
  FooterBlock,
  FooterFaq,
} from "./content";

export type {
  OrderStatus,
  OrderLine,
  OrderAddress,
  OrderTimelineEvent,
  Order,
  SavedAddress,
} from "./account";

export { ORDER_STATUS_LABEL } from "./account";
