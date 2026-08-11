import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { homeCategories } from "@/data/homeCategories";
import { cn } from "@/lib/cn";

function plateFor(id: string) {
  if (id === "rings") return "ring" as const;
  if (id === "necklaces" || id === "mangalsutras") return "necklace" as const;
  if (id === "earrings") return "earring" as const;
  return "bracelet" as const;
}

/** Category Version 2 — circular "Shop by form" grid. Gated by `features.categoryVersion2`. */
export function CategoryCircles() {
  return (
    <section
      className="relative w-full overflow-hidden py-16 sm:py-20"
      aria-label="Shop by category"
      data-section="category-version-2"
    >
      {/* Full-bleed ruled band */}
      <div className="border-y border-line">
        <Reveal>
          <p className="eyebrow px-5 py-8 text-center sm:py-10">Shop by form</p>
        </Reveal>

        <ul className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {homeCategories.map((cat, i) => (
            <li
              key={cat.id}
              className={cn(
                "group/cell relative min-w-0",
                // Continuous vertical rules between columns
                "after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-line",
                "max-sm:[&:nth-child(2n)]:after:hidden",
                "sm:max-lg:[&:nth-child(3n)]:after:hidden",
                "lg:[&:nth-child(6n)]:after:hidden",
                // Bottom rules only when wrapped
                "border-t border-line lg:border-t-0",
                i < 2 && "max-sm:border-t-0",
                i < 3 && "sm:max-lg:border-t-0",
              )}
            >
              <Reveal delay={i * 0.07} as="div">
                <Link
                  href={cat.href}
                  className="group flex flex-col items-center px-4 pb-12 pt-10 text-center sm:px-6 sm:pb-14 sm:pt-12"
                >
                  <span className="relative block aspect-square w-[72%] max-w-[190px] overflow-hidden rounded-full bg-white">
                    <span className="absolute inset-[12%] transition-transform duration-[1100ms] ease-[var(--ease-editorial)] will-change-transform group-hover:scale-[1.1]">
                      <Media
                        src={cat.image}
                        seed={cat.seed}
                        kind={plateFor(cat.id)}
                        alt={cat.label}
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                        className="object-contain mix-blend-multiply"
                      />
                    </span>
                  </span>

                  <span className="relative mt-7 inline-flex flex-col items-center gap-2">
                    <span className="font-sans text-[0.92rem] tracking-wide text-ink transition-colors duration-500 group-hover:text-accent-deep sm:text-[0.98rem]">
                      {cat.label}
                    </span>
                    <span
                      aria-hidden
                      className="block h-px w-5 origin-center scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-x-100"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
