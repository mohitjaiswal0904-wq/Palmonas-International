"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  CheckoutShell,
  CheckoutMobileFooter,
  AddressForm,
  EMPTY_ADDRESS,
  isAddressComplete,
  useCheckoutUi,
  checkoutSelectClass,
} from "@/components/checkout";
import { AddressBlock } from "@/components/account/OrderCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import type { SavedAddress } from "@/types/account";

function AddressCard({
  address,
  selected,
  onSelect,
  showDefaultBadge = true,
}: {
  address: SavedAddress;
  selected: boolean;
  onSelect: () => void;
  showDefaultBadge?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "min-h-11 w-full min-w-0 px-4 py-4 text-left transition-colors sm:px-5 sm:py-5",
        checkoutSelectClass(selected),
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink">
          {address.label}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {selected ? (
            <span className="flex items-center gap-1 font-sans text-[0.62rem] font-medium uppercase tracking-wide-sm text-ink">
              <Check size={13} strokeWidth={2.5} aria-hidden />
              Selected
            </span>
          ) : null}
          {showDefaultBadge && address.isDefault ? (
            <span className="font-sans text-[0.65rem] uppercase tracking-wide-sm text-ink-muted">
              Default
            </span>
          ) : null}
        </span>
      </div>
      <AddressBlock {...address} />
    </button>
  );
}

function AddressCardGrid({
  addresses,
  selectedId,
  onSelect,
  showDefaultBadge = true,
}: {
  addresses: SavedAddress[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  showDefaultBadge?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          selected={selectedId === address.id}
          onSelect={() => onSelect(address.id)}
          showDefaultBadge={showDefaultBadge}
        />
      ))}
    </div>
  );
}

export default function CheckoutAddressPage() {
  const router = useRouter();
  const {
    addresses,
    addAddress,
    shippingAddressId,
    setShippingAddressId,
    billingSameAsShipping,
    setBillingSameAsShipping,
    billingAddressId,
    setBillingAddressId,
  } = useCheckoutUi();

  const [showNew, setShowNew] = useState(false);
  const [newLabel, setNewLabel] = useState("Home");
  const [draft, setDraft] = useState(EMPTY_ADDRESS);
  const [error, setError] = useState("");

  function saveNewAndSelect() {
    if (!isAddressComplete(draft)) {
      setError("Complete all required address fields.");
      return;
    }
    const id = addAddress({ ...draft, label: newLabel.trim() || "Home" });
    setShippingAddressId(id);
    setShowNew(false);
    setDraft(EMPTY_ADDRESS);
    setError("");
  }

  function onContinue() {
    if (!shippingAddressId) {
      setError("Select or add a shipping address.");
      return;
    }
    if (!billingSameAsShipping && !billingAddressId) {
      setError("Select a billing address or use the same as shipping.");
      return;
    }
    router.push("/checkout/coupon");
  }

  return (
    <>
      <CheckoutShell title="Delivery address" focused showSummary={false}>
        <p className="mb-6 max-w-[52ch] font-sans text-[0.88rem] leading-relaxed text-ink-muted sm:mb-8 sm:text-[0.9rem]">
          Choose a saved address or add a new one. Billing can match shipping or use a separate address.
        </p>

        <section className="w-full border border-line p-4 sm:p-6 lg:p-8">
          <h2 className="eyebrow mb-4">Shipping address</h2>
          <AddressCardGrid
            addresses={addresses}
            selectedId={shippingAddressId}
            onSelect={(id) => {
              setShippingAddressId(id);
              setError("");
            }}
          />

          {!showNew ? (
            <Button
              variant="outline"
              className="mt-5 min-h-11 w-full sm:mt-6 sm:w-auto"
              type="button"
              onClick={() => setShowNew(true)}
            >
              Add new address
            </Button>
          ) : (
            <div className="mt-6 border border-line p-4 sm:mt-8 sm:p-6">
              <p className="eyebrow mb-5">New address</p>
              <div className="mb-5">
                <Input
                  id="addr-label"
                  label="Label"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Home, Work…"
                />
              </div>
              <AddressForm value={draft} onChange={setDraft} idPrefix="new" />
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button type="button" className="min-h-11 w-full sm:w-auto" onClick={saveNewAndSelect}>
                  Save &amp; use
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="min-h-11 w-full sm:w-auto"
                  onClick={() => {
                    setShowNew(false);
                    setDraft(EMPTY_ADDRESS);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </section>

        <section className="mt-8 w-full border border-line p-4 sm:mt-10 sm:p-6 lg:p-8">
          <h2 className="eyebrow mb-4">Billing address</h2>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 py-2">
            <input
              type="checkbox"
              checked={billingSameAsShipping}
              onChange={(e) => setBillingSameAsShipping(e.target.checked)}
              className="h-5 w-5 shrink-0 accent-[var(--ink)]"
            />
            <span className="font-sans text-[0.86rem] text-ink">Same as shipping address</span>
          </label>

          {!billingSameAsShipping ? (
            <div className="mt-3">
              <AddressCardGrid
                addresses={addresses}
                selectedId={billingAddressId}
                onSelect={setBillingAddressId}
                showDefaultBadge={false}
              />
            </div>
          ) : null}
        </section>

        {error ? (
          <p className="mt-5 font-sans text-[0.82rem] text-error" role="alert">
            {error}
          </p>
        ) : null}

        <Button
          className="mt-8 hidden min-h-11 w-full sm:inline-flex sm:w-auto"
          size="lg"
          type="button"
          onClick={onContinue}
        >
          Continue to offers
        </Button>
      </CheckoutShell>

      <CheckoutMobileFooter primaryLabel="Continue" onPrimary={onContinue} />
    </>
  );
}
