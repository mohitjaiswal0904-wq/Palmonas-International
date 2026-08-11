import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PlpView } from "@/components/product/PlpView";
import { categories, categoryBySlug } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import type { CategorySlug } from "@/types";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categoryBySlug(category as CategorySlug);
  if (!cat) return {};
  return {
    title: cat.label,
    description: cat.description,
    alternates: { canonical: `/jewellery/${cat.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categoryBySlug(category as CategorySlug);
  if (!cat) notFound();

  const items = productsByCategory(cat.slug);

  return (
    <Container className="pt-10 pb-24">
      <Breadcrumbs
        items={[
          { label: "Jewellery", href: "/jewellery" },
          { label: cat.label, href: `/jewellery/${cat.slug}` },
        ]}
      />
      <header className="mt-8 mb-12 max-w-[52ch]">
        <p className="eyebrow mb-4">{items.length} pieces</p>
        <h1 className="font-display text-5xl leading-none text-ink sm:text-6xl">
          {cat.label}
        </h1>
        <p className="mt-5 font-sans text-[0.95rem] leading-relaxed text-ink-muted">
          {cat.description}
        </p>
      </header>
      <PlpView products={items} activeCategory={cat.slug} />
    </Container>
  );
}
