"use client";

import { Input } from "@/components/ui/Input";
import type { OrderAddress } from "@/types/account";

export const EMPTY_ADDRESS: OrderAddress = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal: "",
  country: "United States",
  phone: "",
};

export function AddressForm({
  value,
  onChange,
  idPrefix = "addr",
}: {
  value: OrderAddress;
  onChange: (next: OrderAddress) => void;
  idPrefix?: string;
}) {
  const set = (field: keyof OrderAddress, v: string) =>
    onChange({ ...value, [field]: v });

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Input
          id={`${idPrefix}-name`}
          label="Full name"
          value={value.name}
          onChange={(e) => set("name", e.target.value)}
          autoComplete="name"
          required
        />
      </div>
      <div className="sm:col-span-2">
        <Input
          id={`${idPrefix}-line1`}
          label="Address line 1"
          value={value.line1}
          onChange={(e) => set("line1", e.target.value)}
          autoComplete="address-line1"
          required
        />
      </div>
      <div className="sm:col-span-2">
        <Input
          id={`${idPrefix}-line2`}
          label="Address line 2 (optional)"
          value={value.line2 ?? ""}
          onChange={(e) => set("line2", e.target.value)}
          autoComplete="address-line2"
        />
      </div>
      <Input
        id={`${idPrefix}-city`}
        label="City"
        value={value.city}
        onChange={(e) => set("city", e.target.value)}
        autoComplete="address-level2"
        required
      />
      <Input
        id={`${idPrefix}-state`}
        label="State / region"
        value={value.state}
        onChange={(e) => set("state", e.target.value)}
        autoComplete="address-level1"
        required
      />
      <Input
        id={`${idPrefix}-postal`}
        label="Postal code"
        value={value.postal}
        onChange={(e) => set("postal", e.target.value)}
        autoComplete="postal-code"
        required
      />
      <Input
        id={`${idPrefix}-country`}
        label="Country"
        value={value.country}
        onChange={(e) => set("country", e.target.value)}
        autoComplete="country-name"
        required
      />
      <div className="sm:col-span-2">
        <Input
          id={`${idPrefix}-phone`}
          label="Phone"
          type="tel"
          value={value.phone}
          onChange={(e) => set("phone", e.target.value)}
          autoComplete="tel"
          required
        />
      </div>
    </div>
  );
}

export function isAddressComplete(a: OrderAddress) {
  return Boolean(
    a.name.trim() &&
      a.line1.trim() &&
      a.city.trim() &&
      a.state.trim() &&
      a.postal.trim() &&
      a.country.trim() &&
      a.phone.trim(),
  );
}
