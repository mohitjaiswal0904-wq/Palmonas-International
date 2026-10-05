import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/Button";
import { homeCollectionStories } from "@/data";

export function CollectionStories() {
  return (
    <section className="pb-20 pt-24 sm:pb-24">
      <Container>
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-12">
          {homeCollectionStories.map((story, i) => (
            <Reveal key={story.id} delay={i * 0.08} as="article">
              <div className="relative aspect-[360/225] overflow-hidden bg-stone">
                <Media
                  src={story.image}
                  seed={story.seed}
                  kind="editorial"
                  alt={story.alt}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <h2 className="mt-3 font-display text-4xl leading-tight text-ink">
                {story.title}
              </h2>
              <p className="mt-6 max-w-[52ch] font-sans text-[0.95rem] leading-relaxed text-ink-muted">
                {story.body}
              </p>
              <ButtonLink href={story.cta.href} className="mt-9">
                {story.cta.label}
              </ButtonLink>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
