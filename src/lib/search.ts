import type { Product } from "@/types";

/** Token / prefix match so "ring" hits Rings, not Earrings. */
export function matchesQuery(haystack: string, q: string): boolean {
  const text = haystack.toLowerCase();
  if (!text) return false;
  if (text === q || text.startsWith(`${q} `)) return true;
  return text.split(/[\s,/|&+.-]+/).some((token) => token === q || token.startsWith(q));
}

export function productMatchesQuery(product: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    matchesQuery(product.name, q) ||
    matchesQuery(product.category, q) ||
    matchesQuery(product.categoryLabel, q) ||
    matchesQuery(product.collectionLabel, q) ||
    matchesQuery(product.materials.join(" "), q)
  );
}

export function filterProductsByQuery(products: Product[], query: string): Product[] {
  const q = query.trim();
  if (!q) return products;
  return products.filter((p) => productMatchesQuery(p, q));
}
