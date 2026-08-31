"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckoutShell, CheckoutMobileFooter, useCheckoutUi } from "@/components/checkout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { coupons } from "@/data/commerce/coupons";
import { useCart } from "@/stores/cart";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";

export default function CheckoutCouponPage() {
  const router = useRouter();
  const money = useRegionalMoney();
  const subtotal = useCart((s) => s.subtotal());
  const { appliedCoupon, applyCoupon, clearCoupon } = useCheckoutUi();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function onApply(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const result = applyCoupon(code, subtotal);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSuccess("Code applied — preview discount in the summary.");
    setCode("");
  }

  function applyPreset(couponCode: string) {
    setCode(couponCode);
    const result = applyCoupon(couponCode, subtotal);
    if (result.ok) {
      setSuccess(`Code ${couponCode} applied.`);
      setError("");
    } else {
      setError(result.error);
    }
  }

  return (
    <>
      <CheckoutShell title="Offers & coupons">
        <p className="mb-6 max-w-[52ch] font-sans text-[0.88rem] leading-relaxed text-ink-muted sm:mb-8 sm:text-[0.9rem]">
          Have a promo code? Apply it here before review. UI preview only — offers are not saved yet.
        </p>

        <form onSubmit={onApply}>
          <Input
            id="coupon-code"
            label="Promo code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              if (error) setError("");
            }}
            placeholder="e.g. WELCOME10"
            autoComplete="off"
          />
          <Button type="submit" className="mt-4 min-h-11 w-full sm:mt-3 sm:w-auto">
            Apply code
          </Button>
        </form>

        {error ? (
          <p className="mt-3 font-sans text-[0.82rem] text-error" role="alert">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="mt-3 font-sans text-[0.82rem] text-success" role="status">
            {success}
          </p>
        ) : null}

        {appliedCoupon ? (
          <div className="mt-5 flex flex-col gap-3 border border-line bg-stone/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="min-w-0">
              <p className="font-sans text-[0.86rem] text-ink">{appliedCoupon.label}</p>
              <p className="mt-0.5 font-sans text-[0.78rem] text-ink-muted">
                {appliedCoupon.code} · −{money(appliedCoupon.discount)}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="min-h-11 w-full sm:w-auto"
              onClick={() => clearCoupon()}
            >
              Remove
            </Button>
          </div>
        ) : null}

        <section className="mt-8 border-t border-line pt-8 sm:mt-10 sm:pt-10">
          <h2 className="eyebrow mb-4">Available offers</h2>
          <ul className="divide-y divide-line border border-line">
            {coupons.map((c) => (
              <li
                key={c.code}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
              >
                <div className="min-w-0">
                  <p className="font-sans text-[0.86rem] text-ink">{c.label}</p>
                  <p className="mt-0.5 font-sans text-[0.76rem] text-ink-muted">{c.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => applyPreset(c.code)}
                  className="min-h-11 shrink-0 font-sans text-[0.72rem] uppercase tracking-wide-sm text-ink underline decoration-line underline-offset-4 hover:text-accent-deep sm:min-h-0"
                >
                  Use {c.code}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-8 hidden flex-wrap gap-3 sm:flex">
          <Button variant="outline" type="button" onClick={() => router.push("/checkout/address")}>
            Back
          </Button>
          <Button className="min-h-11" size="lg" type="button" onClick={() => router.push("/checkout/review")}>
            Continue to review
          </Button>
        </div>
      </CheckoutShell>

      <CheckoutMobileFooter
        primaryLabel="Review"
        onPrimary={() => router.push("/checkout/review")}
        secondaryLabel="Back"
        onSecondary={() => router.push("/checkout/address")}
      />
    </>
  );
}
