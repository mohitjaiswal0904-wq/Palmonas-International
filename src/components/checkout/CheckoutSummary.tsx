"use client";

import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { useCheckoutUi } from "@/components/checkout/CheckoutUiContext";
import { useCart } from "@/stores/cart";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";
import type { PlateKind } from "@/types";

export function CheckoutSummary() {
  const money = useRegionalMoney();
  const lines = useCart((s) => s.lines);
  const subtotal = useCart((s) => s.subtotal());
  const { appliedCoupon, totalsFor } = useCheckoutUi();
  const { discount, shipping, tax, total } = totalsFor(subtotal);

  return (
    <div className="border border-line bg-surface p-4 sm:p-5 lg:p-6">
      <p className="eyebrow mb-3 sm:mb-4">Order summary</p>

      <ul className="max-h-[160px] space-y-3 overflow-y-auto scroll-thin sm:max-h-[220px] lg:max-h-[280px]">
        {lines.map((l) => (
          <li key={l.key} className="flex gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-stone sm:h-16 sm:w-16">
              <Media
                src={l.image}
                seed={l.seed}
                kind={l.plate as PlateKind}
                alt={l.name}
                sizes="64px"
              />
              <span className="absolute bottom-0 right-0 bg-ink px-1 font-sans text-[0.58rem] text-surface">
                {l.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href={`/jewellery/${l.category}/${l.slug}`}
                className="line-clamp-2 font-sans text-[0.76rem] leading-snug text-ink hover:underline sm:text-[0.78rem]"
              >
                {l.name}
              </Link>
              <p className="mt-0.5 font-sans text-[0.66rem] text-ink-muted sm:text-[0.68rem]">
                {l.metalLabel}
                {l.size ? ` · ${l.size}` : ""}
              </p>
              <p className="mt-1 font-sans text-[0.76rem] text-ink sm:text-[0.78rem]">
                {money(l.price * l.quantity + (l.giftWrap ? 15 : 0))}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-1.5 border-t border-line pt-4 font-sans text-[0.8rem] sm:mt-6 sm:space-y-2 sm:pt-5 sm:text-[0.82rem]">
        <div className="flex justify-between gap-4 text-ink-muted">
          <dt>Subtotal</dt>
          <dd>{money(subtotal)}</dd>
        </div>
        {discount > 0 && appliedCoupon ? (
          <div className="flex justify-between gap-4 text-success">
            <dt>{appliedCoupon.code}</dt>
            <dd>−{money(discount)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-4 text-ink-muted">
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? "Complimentary" : money(shipping)}</dd>
        </div>
        <div className="flex justify-between gap-4 text-ink-muted">
          <dt>Tax</dt>
          <dd>{money(tax)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-line pt-2.5 text-ink sm:pt-3">
          <dt className="font-medium">Total</dt>
          <dd className="font-serif text-base sm:text-lg">{money(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
