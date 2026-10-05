import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { homeStyles, homeStyleSection } from "@/data";

export function ShopByStyle() {
  return (
    <section
      className="border-t border-line pb-16 pt-[65px] sm:pb-24 lg:pb-32"
      aria-label="Shop by style"
    >
      <Container>
        <Reveal>
          <p className="eyebrow">{homeStyleSection.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {homeStyleSection.title}
          </h2>
          <p className="mt-3 max-w-[42ch] font-sans text-[0.88rem] leading-relaxed text-ink-muted">
            {homeStyleSection.body}
          </p>
          <Link
            href={homeStyleSection.cta.href}
            className="link-underline mt-3 inline-block font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink"
          >
            {homeStyleSection.cta.label}
          </Link>
        </Reveal>

        <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-12 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-5">
          {homeStyles.map((style, i) => (
            <Reveal key={style.id} delay={i * 0.05} as="li">
              <Link href={style.href} className="group block">
                <div className="relative aspect-[174/232] overflow-hidden bg-stone">
                  <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[var(--ease-editorial)] will-change-transform group-hover:scale-[1.05]">
                    <Media
                      src={style.image}
                      seed={style.seed}
                      kind="editorial"
                      alt={style.label}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                <div className="mt-3">
                  <p className="font-display text-xl text-ink transition-colors duration-500 group-hover:text-accent-deep">
                    {style.label}
                  </p>
                  <p className="mt-1 font-sans text-[0.76rem] leading-snug text-ink-muted">
                    {style.tagline}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
