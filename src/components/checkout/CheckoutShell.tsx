"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { CheckoutStepNav } from "@/components/checkout/CheckoutStepNav";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { useCart } from "@/stores/cart";
import { useHydrated } from "@/hooks/useHydrated";

export function CheckoutShell({
  title,
  children,
  showSummary = true,
  focused = false,
}: {
  title: string;
  children: React.ReactNode;
  showSummary?: boolean;
  /** Single-column layout without product summary — for address-focused steps. */
  focused?: boolean;
}) {
  const router = useRouter();
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);

  useEffect(() => {
    if (!hydrated) return;
    if (lines.length === 0) router.replace("/jewellery");
  }, [hydrated, lines.length, router]);

  if (!hydrated) {
    return (
      <Container className="py-16">
        <p className="font-sans text-[0.85rem] text-ink-muted">Loading checkout…</p>
      </Container>
    );
  }

  if (lines.length === 0) return null;

  return (
    <Container className="pt-6 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] sm:pt-8 lg:pt-10 lg:pb-24">
      <Link
        href="/jewellery"
        className="mb-5 inline-flex min-h-11 items-center font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink-muted hover:text-ink sm:mb-6"
      >
        ← Continue shopping
      </Link>

      <header className="mb-6 max-w-[52ch] sm:mb-8">
        <p className="eyebrow mb-3">Checkout</p>
        <h1 className="font-display text-[1.75rem] leading-none text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h1>
      </header>

      <CheckoutStepNav />

      {showSummary && !focused ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <div className="min-w-0">{children}</div>
          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <CheckoutSummary />
          </aside>
        </div>
      ) : (
        <div className={focused ? "max-w-2xl" : undefined}>{children}</div>
      )}
    </Container>
  );
}
