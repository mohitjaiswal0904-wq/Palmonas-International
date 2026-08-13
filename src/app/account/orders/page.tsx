"use client";

import { AccountShell } from "@/components/account/AccountShell";
import { OrderCard } from "@/components/account/OrderCard";
import { demoOrders } from "@/data";

export default function AccountOrdersPage() {
  return (
    <AccountShell title="Orders" eyebrow="Account">
      <p className="mb-6 font-sans text-[0.9rem] text-ink-muted">
        {demoOrders.length} orders on this account. Tap any order for tracking and details.
      </p>
      <div className="border-t border-line">
        {demoOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </AccountShell>
  );
}
