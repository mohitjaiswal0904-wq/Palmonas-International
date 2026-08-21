import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { collections } from "@/data";
import { bannerFor } from "@/lib/banners";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore live Palmonas International collections — Ode To Nature and 9KT Fine Gold.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  // Only show collections that have products after enrichment.
  const live = collections.filter((c) => c.productIds.length > 0);

  return (
    <Container className="pt-10 pb-24">
      <Breadcrumbs items={[{ label: "Collections", href: "/collections" }]} />
      <header className="mt-8 mb-14 max-w-[52ch]">
        <p className="eyebrow mb-4">The House</p>
        <h1 className="font-display text-5xl leading-none text-ink sm:text-6xl">
          Collections
        </h1>
        <p className="mt-5 font-sans text-[0.95rem] leading-relaxed text-ink-muted">
          Each collection is a distinct language — a way of thinking about form,
          light and the life a piece is made for.
        </p>
      </header>

      <div className="grid gap-x-6 gap-y-16 md:grid-cols-2">
        {live.map((c, i) => (
          <Reveal key={c.id} delay={(i % 2) * 0.08} as="article">
            <Link href={`/collections/${c.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                <div className="absolute inset-0 transition-transform duration-[1000ms] ease-[var(--ease-editorial)] group-hover:scale-[1.04]">
                  <Media
                    src={bannerFor(c.slug)}
                    seed={`collection-${c.slug}`}
                    kind="editorial"
                    alt={c.name}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <p className="eyebrow mt-5">{c.tagline}</p>
              <h2 className="mt-2 font-display text-3xl text-ink">{c.name}</h2>
              <p className="mt-3 max-w-[44ch] font-sans text-[0.9rem] leading-relaxed text-ink-muted">
                {c.description}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
