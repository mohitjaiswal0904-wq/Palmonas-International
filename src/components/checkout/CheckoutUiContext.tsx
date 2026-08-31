"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { demoAddresses } from "@/data";
import { validateCoupon } from "@/data/commerce/coupons";
import { computeCheckoutTotals, defaultShipping } from "@/lib/checkout";
import type { OrderAddress, SavedAddress } from "@/types/account";
import type { AppliedCoupon } from "@/types/checkout";

type CheckoutUiState = {
  addresses: SavedAddress[];
  shippingAddressId: string | null;
  billingSameAsShipping: boolean;
  billingAddressId: string | null;
  appliedCoupon: AppliedCoupon | null;
  paymentMethod: string;
  addAddress: (input: OrderAddress & { label: string }) => string;
  setShippingAddressId: (id: string | null) => void;
  setBillingSameAsShipping: (same: boolean) => void;
  setBillingAddressId: (id: string | null) => void;
  applyCoupon: (code: string, subtotal: number) => { ok: true } | { ok: false; error: string };
  clearCoupon: () => void;
  setPaymentMethod: (method: string) => void;
  toOrderAddress: (id: string) => OrderAddress | null;
  totalsFor: (subtotal: number) => ReturnType<typeof computeCheckoutTotals>;
  reset: () => void;
};

const CheckoutUiContext = createContext<CheckoutUiState | null>(null);

let addrSeq = 0;

export function CheckoutUiProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<SavedAddress[]>(demoAddresses);
  const [shippingAddressId, setShippingAddressId] = useState<string | null>(
    () => demoAddresses.find((a) => a.isDefault)?.id ?? demoAddresses[0]?.id ?? null,
  );
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingAddressId, setBillingAddressId] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("Visa ···· 4242");

  const addAddress = useCallback((input: OrderAddress & { label: string }) => {
    const id = `ui-addr-${++addrSeq}`;
    setAddresses((prev) => [
      ...prev,
      {
        id,
        label: input.label,
        isDefault: false,
        name: input.name,
        line1: input.line1,
        line2: input.line2,
        city: input.city,
        state: input.state,
        postal: input.postal,
        country: input.country,
        phone: input.phone,
      },
    ]);
    return id;
  }, []);

  const applyCoupon = useCallback((code: string, subtotal: number) => {
    const result = validateCoupon(code, subtotal);
    if (!result.ok) return result;
    setAppliedCoupon({
      code: result.coupon.code,
      label: result.coupon.label,
      discount: result.discount,
    });
    return { ok: true as const };
  }, []);

  const clearCoupon = useCallback(() => setAppliedCoupon(null), []);

  const toOrderAddress = useCallback(
    (id: string) => {
      const a = addresses.find((x) => x.id === id);
      if (!a) return null;
      return {
        name: a.name,
        line1: a.line1,
        line2: a.line2,
        city: a.city,
        state: a.state,
        postal: a.postal,
        country: a.country,
        phone: a.phone,
      };
    },
    [addresses],
  );

  const totalsFor = useCallback(
    (subtotal: number) => {
      const discount = appliedCoupon?.discount ?? 0;
      const shipping = defaultShipping(subtotal);
      return computeCheckoutTotals(subtotal, discount, shipping);
    },
    [appliedCoupon],
  );

  const reset = useCallback(() => {
    setAddresses(demoAddresses);
    setShippingAddressId(demoAddresses.find((a) => a.isDefault)?.id ?? demoAddresses[0]?.id ?? null);
    setBillingSameAsShipping(true);
    setBillingAddressId(null);
    setAppliedCoupon(null);
    setPaymentMethod("Visa ···· 4242");
  }, []);

  const value = useMemo(
    () => ({
      addresses,
      shippingAddressId,
      billingSameAsShipping,
      billingAddressId,
      appliedCoupon,
      paymentMethod,
      addAddress,
      setShippingAddressId,
      setBillingSameAsShipping,
      setBillingAddressId,
      applyCoupon,
      clearCoupon,
      setPaymentMethod,
      toOrderAddress,
      totalsFor,
      reset,
    }),
    [
      addresses,
      shippingAddressId,
      billingSameAsShipping,
      billingAddressId,
      appliedCoupon,
      paymentMethod,
      addAddress,
      applyCoupon,
      clearCoupon,
      toOrderAddress,
      totalsFor,
      reset,
    ],
  );

  return (
    <CheckoutUiContext.Provider value={value}>{children}</CheckoutUiContext.Provider>
  );
}

export function useCheckoutUi() {
  const ctx = useContext(CheckoutUiContext);
  if (!ctx) {
    throw new Error("useCheckoutUi must be used within CheckoutUiProvider");
  }
  return ctx;
}
