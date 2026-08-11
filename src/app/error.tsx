"use client";

import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/layout/Wordmark";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <div className="mb-8">
        <Wordmark size="md" href={null} />
      </div>
      <p className="eyebrow mb-6">Something interrupted us</p>
      <h1 className="font-display text-5xl leading-none text-ink sm:text-6xl">
        A moment, please
      </h1>
      <p className="mt-5 max-w-[42ch] font-sans text-[0.95rem] leading-relaxed text-ink-muted">
        We hit an unexpected error. Try again — and if it persists, our client
        care team is here to help.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/" variant="outline">
          Return home
        </ButtonLink>
      </div>
    </Container>
  );
}
