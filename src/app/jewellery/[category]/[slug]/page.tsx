import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBuyPanel } from "@/components/product/ProductBuyPanel";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductRail } from "@/components/product/ProductRail";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import {
  products,
  productBySlug,
  productById,
  productsByCollection,
  collectionBySlug,
} from "@/data";
import { bannerFor } from "@/lib/banners";
import { SITE } from "@/lib/site";
import type { CategorySlug } from "@/types";

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description,
    alternates: { canonical: `/jewellery/${p.category}/${p.slug}` },
    openGraph: {
      title: `${p.name} · ${SITE.shortName}`,
      description: p.description,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const product = productBySlug(slug);
  if (!product || product.category !== (category as CategorySlug)) notFound();

  const collection = collectionBySlug(product.collection);
  const related = product.relatedProducts
    .map(productById)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const fromCollection = productsByCollection(product.collection)
    .filter((p) => p.id !== product.id)
    .slice(0, 5);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.categoryLabel,
    brand: { "@type": "Brand", name: SITE.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability:
        product.availability === "made-to-order"
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Mobile sticky CTA clearance applied to the whole product page */}
      <div className="pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
      {/* Product stage — full viewport width, edge to edge */}
      <div className="pb-10 lg:pb-20">
        <div className="px-5 pt-4 sm:px-8 sm:pt-6 lg:px-12">
          <Breadcrumbs
            items={[
              { label: "Jewellery", href: "/jewellery" },
              { label: product.categoryLabel, href: `/jewellery/${product.category}` },
              { label: product.name, href: `/jewellery/${product.category}/${product.slug}` },
            ]}
          />
        </div>

        <div className="mt-4 grid lg:mt-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(340px,0.9fr)]">
          <ProductGallery images={product.images} />
          <div className="px-5 py-6 sm:px-8 sm:py-8 lg:border-l lg:border-line lg:px-10 lg:py-2 xl:px-14">
            <ProductBuyPanel product={product} />
          </div>
        </div>
      </div>

      <ProductDetails product={product} />

      {/* Storytelling — The Story */}
      <section className="border-t border-line bg-surface py-16 sm:py-24 lg:py-32">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal as="div">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                <Media
                  src={bannerFor(`story-${product.collection}`)}
                  seed={`${product.slug}-story`}
                  kind="editorial"
                  alt={`${product.name} story`}
                  sizes="50vw"
                />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <p className="eyebrow mb-4">The Story · {product.collectionLabel}</p>
                <h2 className="font-display text-4xl leading-tight text-ink">
                  {collection?.tagline ?? "The story behind the piece"}
                </h2>
                <p className="mt-6 max-w-[46ch] font-sans text-[0.95rem] leading-relaxed text-ink-muted">
                  {product.story} {collection?.description}
                </p>
                <Link
                  href={`/collections/${product.collection}`}
                  className="link-underline mt-7 inline-block font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink"
                >
                  Explore {product.collectionLabel}
                </Link>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* The Craft + The Material */}
      <section className="py-16 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <Reveal>
              <div className="relative mb-6 aspect-[16/10] overflow-hidden bg-stone">
                <Media
                  src={product.images[3]?.src || bannerFor(`craft-${product.slug}`)}
                  seed={`${product.slug}-craft`}
                  kind="detail"
                  alt="The craft"
                  sizes="50vw"
                />
              </div>
              <p className="eyebrow mb-3">The Craft</p>
              <h3 className="font-display text-2xl text-ink">Set by hand, finished by eye</h3>
              <p className="mt-4 max-w-[44ch] font-sans text-[0.92rem] leading-relaxed text-ink-muted">
                Each piece passes through a single pair of hands from setting to
                final polish, so the finish carries the consistency only a maker
                can give it.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative mb-6 aspect-[16/10] overflow-hidden bg-stone">
                <Media
                  src={product.images[2]?.src || bannerFor(`material-${product.slug}`)}
                  seed={`${product.slug}-material`}
                  kind="editorial"
                  alt="The material"
                  sizes="50vw"
                />
              </div>
              <p className="eyebrow mb-3">The Material</p>
              <h3 className="font-display text-2xl text-ink">18k gold, made for daily life</h3>
              <p className="mt-4 max-w-[44ch] font-sans text-[0.92rem] leading-relaxed text-ink-muted">
                18k thick gold plating over sterling silver, finished to resist
                tarnish and water — the warmth of gold, engineered to be worn
                without hesitation.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Complete the look / From the collection */}
      {related.length > 0 && (
        <section className="border-t border-line py-16 sm:py-20 lg:py-24">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Curated for this piece" title="Complete the look" />
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <ProductRail products={related} />
            </Reveal>
          </Container>
        </section>
      )}

      {fromCollection.length > 0 && (
        <section className="pb-20 sm:pb-28">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={product.collectionLabel}
                title="From the collection"
                cta={{ label: "View collection", href: `/collections/${product.collection}` }}
              />
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <ProductRail products={fromCollection} />
            </Reveal>
          </Container>
        </section>
      )}
      </div>
    </>
  );
}
