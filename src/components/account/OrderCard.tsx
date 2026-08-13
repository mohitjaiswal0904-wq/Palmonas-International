"use client";

import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { ORDER_STATUS_LABEL, type Order } from "@/types/account";
import { formatOrderDate } from "@/data";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";
import { cn } from "@/lib/cn";

export function OrderStatusBadge({ status }: { status: Order["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-sans text-[0.68rem] uppercase tracking-wide-sm",
        status === "delivered" && "text-ink",
        status === "shipped" && "text-accent-deep",
        status === "processing" && "text-ink-muted",
        status === "cancelled" && "text-ink-faint",
      )}
    >
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}

export function OrderCard({ order }: { order: Order }) {
  const money = useRegionalMoney();
  const first = order.items[0];

  return (
    <Link
      href={`/account/orders/${order.id}`}
      className="group flex min-w-0 gap-3 border-b border-line py-6 transition-colors last:border-b-0 hover:bg-ivory/60 sm:gap-5"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-stone sm:h-24 sm:w-24">
        {first && (
          <Media
            src={first.image}
            seed={first.seed}
            kind={first.plate}
            alt={first.name}
            sizes="96px"
          />
        )}
        {order.items.length > 1 && (
          <span className="absolute bottom-1 right-1 bg-ink px-1.5 py-0.5 font-sans text-[0.58rem] text-surface">
            +{order.items.length - 1}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="font-sans text-[0.86rem] text-ink">Order {order.number}</p>
          <OrderStatusBadge status={order.status} />
        </div>
        <p className="mt-1 font-sans text-[0.78rem] text-ink-muted">
          Placed {formatOrderDate(order.placedAt)}
        </p>
        <p className="mt-2 truncate font-sans text-[0.82rem] text-ink-muted">
          {order.items.map((i) => i.name).join(" · ")}
        </p>
        <p className="mt-3 font-sans text-[0.86rem] text-ink">{money(order.total)}</p>
      </div>
    </Link>
  );
}

export function AddressBlock({
  title,
  name,
  line1,
  line2,
  city,
  state,
  postal,
  country,
  phone,
}: {
  title?: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  phone?: string;
}) {
  return (
    <div>
      {title && <p className="eyebrow mb-3">{title}</p>}
      <p className="font-sans text-[0.9rem] text-ink">{name}</p>
      <p className="mt-1 font-sans text-[0.85rem] leading-relaxed text-ink-muted">
        {line1}
        {line2 ? (
          <>
            <br />
            {line2}
          </>
        ) : null}
        <br />
        {city}, {state} {postal}
        <br />
        {country}
        {phone ? (
          <>
            <br />
            {phone}
          </>
        ) : null}
      </p>
    </div>
  );
}
