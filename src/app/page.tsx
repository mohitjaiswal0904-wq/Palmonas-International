import Link from "next/link";
import { Hero } from "@/components/editorial/Hero";
import { CategoryCircles } from "@/components/editorial/CategoryCircles";
import { ShopByStyle } from "@/components/editorial/ShopByStyle";
import { CollectionStories } from "@/components/editorial/CollectionStories";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/Button";
import { ProductRail } from "@/components/product/ProductRail";
import {
  newArrivals,
  bestSellers,
  homeFormTiles,
  homeGifting,
  HOME_IMAGES,
} from "@/data";
import { features } from "@/lib/features";

const arrivals = [...newArrivals(), ...bestSellers()]
  .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
  .slice(0, 5);

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="pb-10 pt-[60px]">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Explore by form"
              title="Find your piece"
              cta={{ label: "All jewellery", href: "/jewellery" }}
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {homeFormTiles.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08} as="div">
                <Link href={c.href} className="group block">
                  <div className="relative aspect-square overflow-hidden bg-stone">
                    <div className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.05]">
                      <Media
                        src={c.image}
                        seed={c.seed}
                        kind={c.kind}
                        alt={c.label}
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                  <p className="mt-4 font-display text-xl text-ink sm:text-2xl">
                    {c.label}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {features.categoryVersion2 ? <CategoryCircles /> : null}

      <ShopByStyle />

      <section className="pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Just arrived"
              title="New this season"
              cta={{ label: "Shop new arrivals", href: "/jewellery?sort=new" }}
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <ProductRail products={arrivals} />
          </Reveal>
        </Container>
      </section>

      <CollectionStories />

      <section className="pb-20">
        <Container>
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal as="div">
              <div className="relative aspect-[360/225] overflow-hidden bg-stone">
                <Media
                  src={HOME_IMAGES.gifting}
                  seed="home-gifting"
                  kind="editorial"
                  alt="Gift-ready Palmonas jewellery"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <p className="eyebrow">{homeGifting.eyebrow}</p>
                <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
                  {homeGifting.title}
                </h2>
                <p className="mt-6 max-w-[46ch] font-sans text-[0.95rem] leading-relaxed text-ink-muted">
                  {homeGifting.body}
                </p>
                <ButtonLink href={homeGifting.cta.href} className="mt-9">
                  {homeGifting.cta.label}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
