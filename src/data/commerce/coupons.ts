export type Coupon = {
  code: string;
  label: string;
  description: string;
  type: "percent" | "fixed";
  value: number;
  minSubtotal?: number;
};

/** Demo promo codes for client-side checkout. */
export const coupons: Coupon[] = [
  {
    code: "WELCOME10",
    label: "Welcome 10% off",
    description: "10% off your first order",
    type: "percent",
    value: 10,
  },
  {
    code: "PALMONAS15",
    label: "Palmonas 15%",
    description: "15% off orders over $300",
    type: "percent",
    value: 15,
    minSubtotal: 300,
  },
  {
    code: "FLAT50",
    label: "Flat $50 off",
    description: "$50 off orders over $200",
    type: "fixed",
    value: 50,
    minSubtotal: 200,
  },
  {
    code: "GOLD20",
    label: "Fine gold 20%",
    description: "20% off 9KT fine gold pieces",
    type: "percent",
    value: 20,
    minSubtotal: 150,
  },
];

export function couponByCode(raw: string) {
  const code = raw.trim().toUpperCase();
  return coupons.find((c) => c.code === code);
}

export function computeCouponDiscount(coupon: Coupon, subtotal: number): number {
  if (coupon.minSubtotal != null && subtotal < coupon.minSubtotal) return 0;
  if (coupon.type === "percent") {
    return Math.round((subtotal * coupon.value) / 100);
  }
  return Math.min(coupon.value, subtotal);
}

export function validateCoupon(
  raw: string,
  subtotal: number,
): { ok: true; coupon: Coupon; discount: number } | { ok: false; error: string } {
  const coupon = couponByCode(raw);
  if (!coupon) {
    return { ok: false, error: "This code isn't valid. Check spelling and try again." };
  }
  if (coupon.minSubtotal != null && subtotal < coupon.minSubtotal) {
    return {
      ok: false,
      error: `Minimum order ${coupon.minSubtotal} required for ${coupon.code}.`,
    };
  }
  const discount = computeCouponDiscount(coupon, subtotal);
  if (discount <= 0) {
    return { ok: false, error: "This code can't be applied to your bag." };
  }
  return { ok: true, coupon, discount };
}
