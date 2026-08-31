"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckoutShell, CheckoutMobileFooter, useCheckoutUi, checkoutPillSelectClass } from "@/components/checkout";
import { AddressBlock } from "@/components/account/OrderCard";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { useCart } from "@/stores/cart";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";
import { cn } from "@/lib/cn";
import type { PlateKind } from "@/types";

const PAYMENT_OPTIONS = ["Visa ···· 4242", "Apple Pay", "PayPal"];

export default function CheckoutReviewPage() {
  const router = useRouter();
  const money = useRegionalMoney();
  const lines = useCart((s) => s.lines);
  const {
    shippingAddressId,
    billingSameAsShipping,
    billingAddressId,
    appliedCoupon,
    paymentMethod,
    setPaymentMethod,
    toOrderAddress,
    reset,
  } = useCheckoutUi();

  const [busy, setBusy] = useState(false);

  const shippingAddress = shippingAddressId ? toOrderAddress(shippingAddressId) : null;
  const billingAddress =
    billingSameAsShipping && shippingAddress
      ? shippingAddress
      : billingAddressId
        ? toOrderAddress(billingAddressId)
        : null;

  const canPlace = Boolean(shippingAddress && billingAddress);

  function placeOrder() {
    if (!canPlace) {
      router.push("/checkout/address");
      return;
    }
    setBusy(true);
    const demoNumber = `PM-${Math.floor(1000 + Math.random() * 9000)}`;
    reset();
    router.push(`/checkout/confirmation?order=${demoNumber}`);
  }

  return (
    <>
      <CheckoutShell title="Review & pay">
        {!canPlace ? (
          <p className="mb-6 font-sans text-[0.88rem] text-ink-muted sm:text-[0.9rem]">
            Add a shipping address to continue.{" "}
            <button type="button" className="min-h-11 underline" onClick={() => router.push("/checkout/address")}>
              Go to address
            </button>
          </p>
        ) : null}

        <section className="mb-8 sm:mb-10">
          <h2 className="eyebrow mb-4">Items ({lines.length})</h2>
          <ul className="divide-y divide-line border border-line">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-3 px-3 py-3.5 sm:gap-4 sm:px-5 sm:py-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-stone sm:h-20 sm:w-20">
                  <Media
                    src={l.image}
                    seed={l.seed}
                    kind={l.plate as PlateKind}
                    alt={l.name}
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 font-sans text-[0.86rem] text-ink sm:text-[0.9rem]">{l.name}</p>
                  <p className="mt-1 font-sans text-[0.74rem] text-ink-muted sm:text-[0.78rem]">
                    {l.metalLabel}
                    {l.size ? ` · Size ${l.size}` : ""}
                    {l.giftWrap ? " · Gift wrap" : ""}
                    {` · Qty ${l.quantity}`}
                  </p>
                  <p className="mt-2 font-sans text-[0.84rem] text-ink sm:text-[0.86rem]">
                    {money(l.price * l.quantity + (l.giftWrap ? 15 : 0))}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8 grid gap-6 border-t border-line pt-8 sm:mb-10 sm:gap-8 sm:pt-10 md:grid-cols-2">
          {shippingAddress ? <AddressBlock title="Shipping" {...shippingAddress} /> : null}
          {billingAddress ? <AddressBlock title="Billing" {...billingAddress} /> : null}
        </section>

        {appliedCoupon ? (
          <section className="mb-8 border-t border-line pt-8 sm:mb-10 sm:pt-10">
            <h2 className="eyebrow mb-3">Applied offer</h2>
            <p className="font-sans text-[0.86rem] text-ink">
              {appliedCoupon.code} — {appliedCoupon.label} (−{money(appliedCoupon.discount)})
            </p>
          </section>
        ) : null}

        <section className="mb-4 border-t border-line pt-8 sm:mb-10 sm:pt-10">
          <h2 className="eyebrow mb-4">Payment method</h2>
          <div className="grid gap-2 sm:flex sm:flex-wrap sm:gap-3">
            {PAYMENT_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                aria-pressed={paymentMethod === opt}
                onClick={() => setPaymentMethod(opt)}
                className={cn(
                  "min-h-11 px-4 py-3 text-left font-sans text-[0.78rem] transition-colors sm:text-center",
                  checkoutPillSelectClass(paymentMethod === opt),
                )}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="mt-3 font-sans text-[0.72rem] leading-relaxed text-ink-muted">
            UI preview — payment and order creation will be wired in a later integration pass.
          </p>
        </section>

        <div className="hidden flex-wrap gap-3 sm:flex">
          <Button variant="outline" type="button" onClick={() => router.push("/checkout/coupon")}>
            Back
          </Button>
          <Button
            className="min-h-11 flex-1 sm:flex-none"
            size="lg"
            type="button"
            disabled={busy || !canPlace}
            onClick={placeOrder}
          >
            {busy ? "Placing order…" : "Place order"}
          </Button>
        </div>
      </CheckoutShell>

      <CheckoutMobileFooter
        primaryLabel="Place order"
        onPrimary={placeOrder}
        secondaryLabel="Back"
        onSecondary={() => router.push("/checkout/coupon")}
        disabled={!canPlace}
        busy={busy}
      />
    </>
  );
}
