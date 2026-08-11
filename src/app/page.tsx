import Link from "next/link";
import { Hero } from "@/components/editorial/Hero";
import { CategoryCircles } from "@/components/editorial/CategoryCircles";
import { ShopByStyle } from "@/components/editorial/ShopByStyle";
import { StoreSection } from "@/components/editorial/StoreSection";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/Button";
import { ProductRail } from "@/components/product/ProductRail";
import { Wordmark } from "@/components/layout/Wordmark";
import { newArrivals, bestSellers, productsByCollection, categories } from "@/data";
import { CATEGORY_IMAGERY } from "@/data/generated/imagery";
import { BANNERS } from "@/lib/banners";
import { features } from "@/lib/features";

const arrivals = [...newArrivals(), ...bestSellers()]
  .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
  .slice(0, 5);

const signaturePieces = productsByCollection("signature").slice(0, 3);

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 02 — Category discovery (asymmetric) */}
      <section className="border-t border-line py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Explore by form"
              title="Find your piece"
              cta={{ label: "All jewellery", href: "/jewellery" }}
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {categories.slice(0, 4).map((c, i) => (
              <Reveal
                key={c.slug}
                delay={i * 0.08}
                as="div"
                className={i === 1 ? "lg:mt-14" : i === 3 ? "lg:mt-14" : ""}
              >
                <Link href={`/jewellery/${c.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden bg-stone">
                    <div className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.05]">
                      <Media
                        src={CATEGORY_IMAGERY[c.slug]?.[0]?.primary}
                        seed={`home-cat-${c.slug}`}
                        kind={
                          c.slug === "rings"
                            ? "ring"
                            : c.slug === "necklaces"
                              ? "necklace"
                              : c.slug === "earrings"
                                ? "earring"
                                : "bracelet"
                        }
                        alt={c.label}
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="font-display text-2xl text-ink">
                      {c.label}
                    </span>
                    <span className="link-underline font-sans text-[0.68rem] uppercase tracking-wide-sm text-ink-muted">
                      View
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 — Category Version 2 (circular Shop by form) */}
      {features.categoryVersion2 ? <CategoryCircles /> : null}

      {/* 03b — Shop by style */}
      <ShopByStyle />

      {/* 04 — Signature collection editorial */}
      <section className="pb-24 pt-10 sm:pb-32 sm:pt-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
            <Reveal className="lg:col-span-8" as="div">
              <Link href="/collections/signature" className="group block">
                <div className="relative aspect-[16/11] overflow-hidden bg-stone">
                  <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[var(--ease-editorial)] group-hover:scale-[1.04]">
                    <Media
                      src={BANNERS.signature}
                      seed="home-signature-hero"
                      kind="editorial"
                      alt="The Signature Collection campaign"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
            <div className="flex flex-col justify-end lg:col-span-4">
              <Reveal delay={0.1}>
                <p className="eyebrow mb-4">The Signature Collection</p>
                <h2 className="font-display text-4xl leading-tight text-ink">
                  Our most considered work
                </h2>
                <p className="mt-5 max-w-[40ch] font-sans text-[0.95rem] leading-relaxed text-ink-muted">
                  Limited in number, exceptional in stone and finish. The pieces
                  we make when nothing is left to chance — intended to be a first
                  acquisition, then an inheritance.
                </p>
              </Reveal>
              {signaturePieces[0] && (
                <Reveal delay={0.2} className="mt-10 grid grid-cols-2 gap-4">
                  {signaturePieces.slice(0, 2).map((p) => (
                    <Link
                      key={p.id}
                      href={`/jewellery/${p.category}/${p.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-square overflow-hidden bg-stone">
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                          <Media
                            src={p.images[0].src}
                            seed={p.images[0].seed}
                            kind={p.images[0].plate}
                            alt={p.images[0].alt}
                            sizes="25vw"
                          />
                        </div>
                      </div>
                      <p className="mt-2.5 font-sans text-[0.78rem] text-ink">{p.name}</p>
                    </Link>
                  ))}
                </Reveal>
              )}
              <Reveal delay={0.25}>
                <ButtonLink href="/collections/signature" variant="outline" className="mt-8 w-fit">
                  View the collection
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 05 — New arrivals rail */}
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

      {/* 06 — Craftsmanship */}
      <section className="relative overflow-hidden bg-ink py-28 text-surface sm:py-36">
        <div className="absolute inset-0 opacity-40">
          <Media src={BANNERS.craft} seed="home-craft-atelier" kind="detail" alt="" sizes="100vw" />
        </div>
        <Container className="relative">
          <div className="max-w-[52ch]">
            <Reveal>
              <p className="font-sans text-[0.68rem] font-medium uppercase tracking-luxe text-surface/70">
                The atelier
              </p>
              <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                The art behind every piece
              </h2>
              <p className="mt-6 font-sans text-base font-light leading-relaxed text-surface/80">
                Each design begins as a drawing and ends in the hand. Stones are
                set one at a time, edges finished by eye, and every surface is
                polished until it reads as light rather than shine. This is
                demi-fine, made with the discipline of fine jewellery.
              </p>
              <ButtonLink
                href="/collections"
                variant="outline"
                className="mt-9 border-surface/60 text-surface hover:border-surface hover:bg-surface hover:text-ink"
              >
                Discover our craft
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 07 — Collection story split */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <Reveal>
                <p className="eyebrow mb-4">Nocturne</p>
                <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                  Composed in low light
                </h2>
                <p className="mt-6 max-w-[46ch] font-sans text-[0.95rem] leading-relaxed text-ink-muted">
                  Nocturne studies how jewellery behaves when the light is
                  scarce. Stones set low and close, metals darkened at the
                  shoulder, so each piece catches a single point of light and
                  holds it. Restraint, rendered nocturnal.
                </p>
                <ButtonLink href="/collections/nocturne" variant="outline" className="mt-8">
                  Discover the story
                </ButtonLink>
              </Reveal>
            </div>
            <Reveal className="order-1 lg:order-2" as="div">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                <Media
                  src={BANNERS.story}
                  seed="home-nocturne-story"
                  kind="editorial"
                  alt="The Nocturne collection story"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 08 — Personalisation */}
      <section className="border-y border-line bg-surface py-24 sm:py-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <Reveal as="div">
              <div className="relative aspect-[16/10] overflow-hidden bg-stone">
                <Media
                  src={BANNERS.personalisation}
                  seed="home-personalisation"
                  kind="detail"
                  alt="Personalised engraving"
                  sizes="60vw"
                />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <p className="eyebrow mb-4">Make it yours</p>
                <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                  A piece, made personal
                </h2>
                <p className="mt-6 max-w-[42ch] font-sans text-[0.95rem] leading-relaxed text-ink-muted">
                  Hand-engrave initials, a date or a coordinate. Set a birthstone.
                  Begin a charm story that grows with you. The smallest details
                  are what make a piece unmistakably yours.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  {["Engraving", "Initials", "Birthstones", "Custom pieces"].map((t) => (
                    <span key={t} className="font-sans text-[0.82rem] text-ink">
                      {t}
                    </span>
                  ))}
                </div>
                <ButtonLink href="/jewellery/charms" className="mt-9">
                  Begin personalisation
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 11 — Final brand moment */}
      <section className="py-32 sm:py-44">
        <Container width="narrow">
          <Reveal>
            <div className="mb-10 flex justify-center">
              <Wordmark size="lg" href={null} />
            </div>
            <p className="text-center font-display text-5xl leading-none text-ink sm:text-7xl">
              Keep what matters.
            </p>
            <div className="mt-10 flex justify-center">
              <ButtonLink href="/jewellery">Find your piece</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 12 — Stores (homepage only) */}
      <StoreSection />
    </>
  );
}
