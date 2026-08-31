import type { CheckoutTotals } from "@/types/checkout";

const TAX_RATE = 0.08;
const COMPLIMENTARY_SHIPPING_THRESHOLD = 0;

export function computeCheckoutTotals(
  subtotal: number,
  discount = 0,
  shipping = 0,
): CheckoutTotals {
  const taxable = Math.max(0, subtotal - discount);
  const tax = Math.round(taxable * TAX_RATE);
  const total = taxable + shipping + tax;
  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
  };
}

export function defaultShipping(subtotal: number) {
  return subtotal >= COMPLIMENTARY_SHIPPING_THRESHOLD ? 0 : 25;
}
