"use client";

import { AccountShell } from "@/components/account/AccountShell";
import { AddressBlock } from "@/components/account/OrderCard";
import { Button } from "@/components/ui/Button";
import { demoAddresses } from "@/data";

export default function AccountAddressesPage() {
  return (
    <AccountShell title="Addresses">
      <p className="mb-8 font-sans text-[0.9rem] text-ink-muted">
        Saved shipping addresses for checkout. This is demo data for design review.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {demoAddresses.map((address) => (
          <article key={address.id} className="border border-line px-5 py-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink">
                {address.label}
              </p>
              {address.isDefault && (
                <span className="font-sans text-[0.68rem] uppercase tracking-wide-sm text-ink-muted">
                  Default
                </span>
              )}
            </div>
            <AddressBlock {...address} />
            <div className="mt-6 flex gap-3">
              <Button variant="outline" size="sm" type="button" disabled>
                Edit
              </Button>
              {!address.isDefault && (
                <Button variant="ghost" size="sm" type="button" disabled>
                  Set default
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>

      <Button variant="outline" className="mt-8" type="button" disabled>
        Add address
      </Button>
    </AccountShell>
  );
}
