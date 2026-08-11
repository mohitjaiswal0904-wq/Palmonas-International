import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/Button";
import { featuredStores } from "@/data/stores";
import { BANNERS } from "@/lib/banners";

export function StoreSection() {
  return (
    <section
      className="border-t border-line py-24 sm:py-32"
      aria-label="Visit our stores"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal as="div">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone sm:aspect-[5/4] lg:aspect-[4/5]">
              <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[var(--ease-editorial)]">
                <Media
                  src={BANNERS.collection}
                  seed="home-store-atelier"
                  kind="editorial"
                  alt="A Palmonas boutique interior"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow mb-4">Stores & services</p>
              <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                Visit us in person
              </h2>
              <p className="mt-5 max-w-[42ch] font-sans text-[0.95rem] leading-relaxed text-ink-muted">
                Try pieces on, book a private appointment, or speak with a
                specialist. Our boutiques are made for unhurried discovery.
              </p>
            </Reveal>

            <ul className="mt-10 divide-y divide-line border-y border-line">
              {featuredStores.map((store, i) => (
                <Reveal key={store.id} delay={0.06 * (i + 1)} as="li">
                  <Link
                    href="/stores"
                    className="group flex items-baseline justify-between gap-6 py-5"
                  >
                    <div>
                      <p className="font-display text-2xl text-ink transition-colors duration-500 group-hover:text-accent-deep">
                        {store.city}
                      </p>
                      <p className="mt-1 font-sans text-[0.82rem] text-ink-muted">
                        {store.name} · {store.address}
                      </p>
                    </div>
                    <span className="shrink-0 font-sans text-[0.68rem] uppercase tracking-wide-sm text-ink-faint transition-colors duration-500 group-hover:text-ink">
                      {store.hours}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.28}>
              <ButtonLink href="/stores" variant="outline" className="mt-10">
                Find a store
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
