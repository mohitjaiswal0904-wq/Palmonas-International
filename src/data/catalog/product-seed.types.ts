/**
 * Shared product seed types and size/price helpers.
 * Seed arrays live in `./seeds/`.
 */
import type { CategorySlug, CollectionSlug, ProductBadge, Product } from "@/types";

export type MetalId = "yellow" | "white" | "rose" | "platinum" | "silver" | "gold9k";
export type StoneId = "diamond" | "sapphire" | "emerald" | "ruby" | "none" | "cz" | "lab-diamond";

export type ProductSeed = {
  name: string;
  category: CategorySlug;
  collection: CollectionSlug;
  price: number;
  metals: MetalId[];
  stones: StoneId[];
  sizes: string[];
  badges: ProductBadge[];
  description: string;
  story: string;
  dimensions: string;
  stoneDetails: string;
  availability?: Product["availability"];
  rating: number;
  reviewCount: number;
};

export const RING_SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8"];
export const BAND_SIZES = ["XS", "S", "M", "L"];
export const ONE_SIZE = ["One size"];

/** Catalogue prices are USD; INR list prices ÷ 83.5 so India region displays accurately. */
export const inrToUsd = (inr: number) => Math.round((inr / 83.5) * 100) / 100;
