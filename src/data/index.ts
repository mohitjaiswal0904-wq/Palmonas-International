/**
 * Curated public API for the static catalogue.
 *
 * Prefer `@/data` in app code. Deep imports are fine for generated imagery.
 * Importing `products` also enriches category/collection relations.
 */

// Catalogue — import products first so enrichCatalogRelations() runs
export {
  products,
  productBySlug,
  productById,
  productsByCategory,
  productsByCollection,
  newArrivals,
  bestSellers,
  CATALOG_METALS,
  CATALOG_STONES,
  metalLabelById,
  stoneLabelById,
} from "./catalog/products";

export { categories, categoryBySlug } from "./catalog/categories";
export { collections, collectionBySlug } from "./catalog/collections";
export {
  CATEGORY_LABELS,
  COLLECTION_LABELS,
  COLLECTION_NAV_ALIASES,
  categoryLabel,
  collectionLabel,
} from "./catalog/taxonomy";

// Content
export { primaryNav } from "./content/navigation";
export type { NavEntry, NavLink, MegaColumn } from "./content/navigation";
export { announcements } from "./content/announcements";
export { homeCategories, homeStyles } from "./content/home";
export {
  footerIntro,
  footerAbout,
  footerShopByCategory,
  footerDifferent,
  footerGifting,
  footerFaqs,
  footerCompany,
  footerNewsletter,
  footerLinkGroups,
  footerSocial,
  footerPopularSearches,
  footerLegalNote,
  footerLegalHref,
} from "./content/footer";
export type { FooterLink, FooterBlock, FooterFaq } from "@/types";
export {
  policyPages,
  aboutPage,
  contactPage,
  sizeGuidePage,
  policyBySlug,
  allPolicySlugs,
} from "./content/info";
export type { InfoPage, InfoBlock } from "@/types";

// Commerce
export {
  regions,
  DEFAULT_REGION_ID,
  regionById,
  flagUrl,
} from "./commerce/regions";
export type { Region } from "./commerce/regions";
export { featuredStores } from "./commerce/stores";
export type { Store } from "./commerce/stores";
export {
  demoOrders,
  demoAddresses,
  orderById,
  formatOrderDate,
  formatOrderDateTime,
} from "./commerce/orders";
export type {
  Order,
  OrderLine,
  OrderStatus,
  SavedAddress,
} from "@/types/account";
export { ORDER_STATUS_LABEL } from "@/types/account";

// Generated imagery (also available via @/data/generated/imagery)
export { CATEGORY_IMAGERY, BANNERS, ALL_BANNERS } from "./generated/imagery";
export type { ImageSet } from "./generated/imagery";
