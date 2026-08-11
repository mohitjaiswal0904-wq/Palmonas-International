import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { products } from "@/data/products";
import { collections } from "@/data/collections";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = ["", "/jewellery", "/collections"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/jewellery/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/jewellery/${p.category}/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...collectionRoutes, ...productRoutes];
}
