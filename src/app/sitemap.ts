import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import {
  products,
  collections,
  categories,
  productsByCategory,
  allPolicySlugs,
} from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/jewellery",
    "/collections",
    "/about",
    "/contact",
    "/stores",
    "/size-guide",
    "/policies",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: path === "" ? 1 : path === "/jewellery" || path === "/collections" ? 0.8 : 0.5,
  }));

  const categoryRoutes = categories
    .filter((c) => productsByCategory(c.slug).length > 0)
    .map((c) => ({
      url: `${base}/jewellery/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const collectionRoutes = collections
    .filter((c) => c.productIds.length > 0)
    .map((c) => ({
      url: `${base}/collections/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const policyRoutes = allPolicySlugs().map((slug) => ({
    url: `${base}/policies/${slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/jewellery/${p.category}/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...collectionRoutes,
    ...policyRoutes,
    ...productRoutes,
  ];
}
