import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { bannerFor } from "@/lib/banners";
import { collections, collectionBySlug, productsByCollection } from "@/data";

export function generateStaticParams() {
  return collections
    .filter((c) => c.productIds.length > 0)
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  if (!c) return {};
  return {
    title: c.name,
    description: c.description,
    alternates: { canonical: `/collections/${c.slug}` },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection || collection.productIds.length === 0) notFound();

  const items = productsByCollection(collection.slug);

  return (
    <>
      {/* Campaign hero */}
      <section className="relative h-[68dvh] min-h-[420px] w-full overflow-hidden bg-ink sm:h-[72vh] sm:min-h-[440px]">
        <div className="absolute inset-0">
          <Media
            src={bannerFor(`hero-${collection.slug}`)}
            seed={`collection-hero-${collection.slug}`}
            kind="editorial"
            alt={`${collection.name} campaign`}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/25" />
        </div>
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-[max(2.5rem,calc(1rem+env(safe-area-inset-bottom)))] sm:px-8 sm:pb-14 lg:px-12 lg:pb-20">
          <p className="font-sans text-[0.68rem] font-medium uppercase tracking-luxe text-surface/75">
            {items.length} {items.length === 1 ? "piece" : "pieces"} · {collection.tagline}
          </p>
          <div className="mt-3 flex flex-col gap-5 sm:mt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <h1 className="display-hero max-w-[14ch] text-[2.75rem] leading-[1.05] text-surface sm:text-6xl lg:text-7xl">
              {collection.name}
            </h1>
            <Link
              href="/jewellery"
              className="link-underline shrink-0 font-sans text-[0.74rem] uppercase tracking-wide-sm text-surface/90"
            >
              All jewellery
            </Link>
          </div>
        </div>
      </section>

      {/* Complete collection */}
      <section className="border-t border-line py-12 sm:py-16 lg:py-20">
        <Container>
          <ProductGrid products={items} />
          <div className="mt-12 flex justify-center sm:mt-16">
            <ButtonLink href="/jewellery" variant="outline">
              Explore all jewellery
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
