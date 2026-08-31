import type { OrderAddress } from "./account";

export type CheckoutStep = "address" | "coupon" | "review";

export type AppliedCoupon = {
  code: string;
  label: string;
  discount: number;
};

export type CheckoutTotals = {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

export type NewAddressInput = Omit<OrderAddress, never> & {
  label?: string;
  saveForLater?: boolean;
};
