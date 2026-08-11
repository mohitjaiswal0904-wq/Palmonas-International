import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { homeStyles } from "@/data";
import { cn } from "@/lib/cn";

export function ShopByStyle() {
  return (
    <section
      className="border-t border-line py-16 sm:py-24 lg:py-32"
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

        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-12 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-5 lg:gap-5">
          {homeStyles.map((style, i) => (
            <Reveal
              key={style.id}
              delay={i * 0.05}
              as="li"
              className={cn(i === homeStyles.length - 1 && "max-sm:col-span-2")}
            >
              <Link href={style.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                  <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[var(--ease-editorial)] will-change-transform group-hover:scale-[1.05]">
                    <Media
                      src={style.image}
                      seed={style.seed}
                      kind="editorial"
                      alt={style.label}
                      sizes="(max-width: 1024px) 50vw, 20vw"
                    />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                <div className="mt-3 sm:mt-5">
                  <p className="font-display text-xl text-ink transition-colors duration-500 group-hover:text-accent-deep sm:text-2xl">
                    {style.label}
                  </p>
                  <p className="mt-1 font-sans text-[0.76rem] leading-snug text-ink-muted sm:mt-1.5 sm:text-[0.82rem]">
                    {style.tagline}
                  </p>
                  <span
                    aria-hidden
                    className="mt-2.5 hidden h-px w-6 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-x-100 sm:mt-3 sm:block"
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
