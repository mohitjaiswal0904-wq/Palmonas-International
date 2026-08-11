import { ALL_BANNERS, BANNERS } from "@/data/generated/imagery";

/**
 * Deterministically picks a campaign banner for a given key (collection slug,
 * section name, product slug) so editorial bands stay stable between renders
 * while still varying across the site.
 */
export function bannerFor(key: string): string {
  if (ALL_BANNERS.length === 0) return "";
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ALL_BANNERS[Math.abs(h) % ALL_BANNERS.length];
}

export { BANNERS };
