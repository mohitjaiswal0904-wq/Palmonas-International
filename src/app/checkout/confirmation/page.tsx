"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderNumber = params.get("order");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-16 pb-safe sm:py-24">
      <p className="eyebrow mb-4">Order preview</p>
      <h1 className="text-center font-display text-[2rem] leading-none text-ink sm:text-5xl">
        Thank you
      </h1>
      <p className="mt-5 max-w-[42ch] text-center font-sans text-[0.9rem] leading-relaxed text-ink-muted">
        {orderNumber
          ? `Checkout UI complete for order ${orderNumber}. No payment was processed — integration comes later.`
          : "Checkout UI complete. No payment was processed — integration comes later."}
      </p>
      <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center">
        <ButtonLink href="/jewellery" className="min-h-11 w-full sm:w-auto">
          Continue shopping
        </ButtonLink>
        <ButtonLink href="/account/orders" variant="outline" className="min-h-11 w-full sm:w-auto">
          View demo orders
        </ButtonLink>
      </div>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center font-sans text-[0.78rem] text-ink-muted underline"
      >
        Return home
      </Link>
    </Container>
  );
}

export default function CheckoutConfirmationPage() {
  return (
    <Suspense
      fallback={
        <Container className="px-5 py-16 pb-safe">
          <p className="font-sans text-[0.85rem] text-ink-muted">Loading…</p>
        </Container>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
