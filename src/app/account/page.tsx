"use client";

import Link from "next/link";
import { MapPin, Package, UserRound } from "lucide-react";
import { AccountShell, AccountQuickStat } from "@/components/account/AccountShell";
import { OrderCard } from "@/components/account/OrderCard";
import { ButtonLink } from "@/components/ui/Button";
import { useAccount } from "@/stores/account";
import { demoOrders, demoAddresses, formatOrderDate } from "@/data";

export default function AccountPage() {
  const user = useAccount((s) => s.user);
  const recent = demoOrders.slice(0, 2);
  const openCount = demoOrders.filter((o) => o.status === "shipped" || o.status === "processing").length;
  const defaultAddress = demoAddresses.find((a) => a.isDefault) ?? demoAddresses[0];

  return (
    <AccountShell title={user ? `Hello, ${user.name.split(" ")[0]}` : "Account"}>
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3">
        <AccountQuickStat
          icon={<Package size={14} strokeWidth={1.4} />}
          label="Orders"
          value={String(demoOrders.length)}
        />
        <AccountQuickStat
          icon={<Package size={14} strokeWidth={1.4} />}
          label="In transit"
          value={String(openCount)}
        />
        <AccountQuickStat
          icon={<MapPin size={14} strokeWidth={1.4} />}
          label="Addresses"
          value={String(demoAddresses.length)}
        />
      </div>

      <section className="mt-12">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl text-ink">Recent orders</h2>
          <Link
            href="/account/orders"
            className="font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink-muted underline"
          >
            View all
          </Link>
        </div>
        <div className="border-t border-line">
          {recent.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center gap-2 text-ink-muted">
            <UserRound size={16} strokeWidth={1.3} />
            <p className="eyebrow !mb-0">Profile</p>
          </div>
          <p className="font-sans text-[0.95rem] text-ink">{user?.name}</p>
          <p className="mt-1 font-sans text-[0.85rem] text-ink-muted">{user?.email}</p>
          {user?.phone && (
            <p className="mt-1 font-sans text-[0.85rem] text-ink-muted">{user.phone}</p>
          )}
          {user?.memberSince && (
            <p className="mt-3 font-sans text-[0.72rem] text-ink-faint">
              Member since {formatOrderDate(user.memberSince)}
            </p>
          )}
          <ButtonLink href="/account/profile" variant="outline" size="sm" className="mt-5">
            Edit profile
          </ButtonLink>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2 text-ink-muted">
            <MapPin size={16} strokeWidth={1.3} />
            <p className="eyebrow !mb-0">Default address</p>
          </div>
          {defaultAddress && (
            <>
              <p className="font-sans text-[0.95rem] text-ink">
                {defaultAddress.label} · {defaultAddress.name}
              </p>
              <p className="mt-1 font-sans text-[0.85rem] leading-relaxed text-ink-muted">
                {defaultAddress.line1}
                {defaultAddress.line2 ? `, ${defaultAddress.line2}` : ""}
                <br />
                {defaultAddress.city}, {defaultAddress.state} {defaultAddress.postal}
              </p>
            </>
          )}
          <ButtonLink href="/account/addresses" variant="outline" size="sm" className="mt-5">
            Manage addresses
          </ButtonLink>
        </div>
      </section>
    </AccountShell>
  );
}
