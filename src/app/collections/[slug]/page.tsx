import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { bannerFor } from "@/lib/banners";
import { collections, collectionBySlug, productsByCollection } from "@/data";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
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
  if (!collection) notFound();

  const items = productsByCollection(collection.slug);

  return (
    <>
      {/* Campaign hero */}
      <section className="relative h-[72vh] min-h-[440px] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Media
            src={bannerFor(`hero-${collection.slug}`)}
            seed={`collection-hero-${collection.slug}`}
            kind="editorial"
            alt={`${collection.name} campaign`}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/30" />
        </div>
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20">
          <p className="font-sans text-[0.68rem] font-medium uppercase tracking-luxe text-surface/80">
            {collection.tagline}
          </p>
          <h1 className="display-hero mt-4 text-5xl text-surface sm:text-7xl">
            {collection.name}
          </h1>
        </div>
      </section>

      {/* Statement */}
      <section className="py-20 sm:py-28">
        <Container width="narrow">
          <Reveal>
            <p className="text-center font-display text-2xl leading-[1.35] text-ink sm:text-3xl">
              {collection.description}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Editorial split */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal as="div">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                <Media
                  src={bannerFor(`editorial-${collection.slug}`)}
                  seed={`collection-editorial-${collection.slug}`}
                  kind="editorial"
                  alt={collection.name}
                  sizes="50vw"
                />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <p className="eyebrow mb-4">The Story</p>
                <h2 className="font-display text-4xl leading-tight text-ink">
                  {collection.tagline}
                </h2>
                <p className="mt-6 max-w-[46ch] font-sans text-[0.95rem] leading-relaxed text-ink-muted">
                  {collection.story}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Complete collection */}
      <section className="border-t border-line py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={`${items.length} pieces`}
              title="The complete collection"
              cta={{ label: "All jewellery", href: "/jewellery" }}
            />
          </Reveal>
          <div className="mt-12">
            <ProductGrid products={items} />
          </div>
          <div className="mt-16 flex justify-center">
            <ButtonLink href="/jewellery" variant="outline">
              Explore all jewellery
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
