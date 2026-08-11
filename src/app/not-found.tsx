import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/layout/Wordmark";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <div className="mb-8">
        <Wordmark size="md" href={null} />
      </div>
      <p className="eyebrow mb-6">Error 404</p>
      <h1 className="font-display text-5xl leading-none text-ink sm:text-6xl">
        This page has slipped away
      </h1>
      <p className="mt-5 max-w-[42ch] font-sans text-[0.95rem] leading-relaxed text-ink-muted">
        The piece you were looking for may have moved, sold out, or never
        existed. Let&apos;s find you something that lasts.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <ButtonLink href="/jewellery">Explore jewellery</ButtonLink>
        <ButtonLink href="/" variant="outline">
          Return home
        </ButtonLink>
      </div>
    </Container>
  );
}
