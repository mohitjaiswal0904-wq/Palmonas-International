import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { homeStyles } from "@/data";

export function ShopByStyle() {
  return (
    <section
      className="border-t border-line py-24 sm:py-32"
      aria-label="Shop by style"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Shop by style"
            title="Find your language"
            cta={{ label: "All collections", href: "/collections" }}
          />
        </Reveal>

        <ul className="mt-12 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {homeStyles.map((style, i) => (
            <Reveal
              key={style.id}
              delay={i * 0.07}
              as="li"
              className="min-w-[68%] shrink-0 sm:min-w-[42%] lg:min-w-0"
            >
              <Link href={style.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                  <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[var(--ease-editorial)] will-change-transform group-hover:scale-[1.05]">
                    <Media
                      src={style.image}
                      seed={style.seed}
                      kind="editorial"
                      alt={style.label}
                      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 42vw, 20vw"
                    />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                <div className="mt-5">
                  <p className="font-display text-2xl text-ink transition-colors duration-500 group-hover:text-accent-deep">
                    {style.label}
                  </p>
                  <p className="mt-1.5 font-sans text-[0.82rem] leading-snug text-ink-muted">
                    {style.tagline}
                  </p>
                  <span
                    aria-hidden
                    className="mt-3 block h-px w-6 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-x-100"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
