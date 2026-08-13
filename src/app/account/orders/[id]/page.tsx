"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { AccountShell } from "@/components/account/AccountShell";
import { AddressBlock, OrderStatusBadge } from "@/components/account/OrderCard";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/Button";
import { orderById, formatOrderDate, formatOrderDateTime } from "@/data";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";
import { cn } from "@/lib/cn";

export default function AccountOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const money = useRegionalMoney();
  const order = orderById(params.id);

  if (!order) {
    return (
      <AccountShell title="Order not found">
        <p className="font-sans text-[0.9rem] text-ink-muted">
          We couldn&apos;t find that order. It may have been removed from this demo account.
        </p>
        <ButtonLink href="/account/orders" variant="outline" className="mt-6">
          Back to orders
        </ButtonLink>
      </AccountShell>
    );
  }

  return (
    <AccountShell title={`Order ${order.number}`} eyebrow="Orders">
      <Link
        href="/account/orders"
        className="mb-8 inline-flex items-center gap-1 font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink-muted hover:text-ink"
      >
        <ChevronLeft size={14} strokeWidth={1.4} />
        All orders
      </Link>

      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-6">
        <div>
          <OrderStatusBadge status={order.status} />
          <p className="mt-2 font-sans text-[0.85rem] text-ink-muted">
            Placed {formatOrderDate(order.placedAt)}
          </p>
        </div>
        <p className="font-serif text-2xl text-ink">{money(order.total)}</p>
      </div>

      {order.trackingNumber && (
        <div className="mt-8 border border-line px-5 py-5">
          <p className="eyebrow mb-2">Tracking</p>
          <p className="font-sans text-[0.95rem] text-ink">
            {order.carrier} · {order.trackingNumber}
          </p>
          {order.estimatedDelivery && (
            <p className="mt-1 font-sans text-[0.8rem] text-ink-muted">
              Estimated delivery {formatOrderDate(order.estimatedDelivery)}
            </p>
          )}
        </div>
      )}

      <section className="mt-10">
        <h2 className="eyebrow mb-5">Timeline</h2>
        <ol className="space-y-4">
          {order.timeline.map((event, i) => (
            <li key={`${event.label}-${i}`} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "mt-1 h-2.5 w-2.5 rounded-full",
                    event.done ? "bg-ink" : "bg-line-strong",
                  )}
                />
                {i < order.timeline.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-line" />
                )}
              </div>
              <div className={cn("pb-4", !event.done && "opacity-50")}>
                <p className="font-sans text-[0.9rem] text-ink">{event.label}</p>
                <p className="mt-0.5 font-sans text-[0.76rem] text-ink-muted">
                  {formatOrderDateTime(event.at)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-4 border-t border-line pt-10">
        <h2 className="eyebrow mb-5">Items</h2>
        <ul className="divide-y divide-line">
          {order.items.map((item) => (
            <li key={`${item.productId}-${item.size}`} className="flex gap-4 py-5">
              <Link
                href={`/jewellery/${item.category}/${item.slug}`}
                className="relative h-20 w-20 shrink-0 overflow-hidden bg-stone"
              >
                <Media
                  src={item.image}
                  seed={item.seed}
                  kind={item.plate}
                  alt={item.name}
                  sizes="80px"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/jewellery/${item.category}/${item.slug}`}
                  className="font-sans text-[0.9rem] text-ink hover:underline"
                >
                  {item.name}
                </Link>
                <p className="mt-1 font-sans text-[0.78rem] text-ink-muted">
                  {item.metalLabel}
                  {item.size ? ` · Size ${item.size}` : ""}
                  {` · Qty ${item.quantity}`}
                </p>
                <p className="mt-2 font-sans text-[0.86rem] text-ink">
                  {money(item.unitPrice * item.quantity)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
        <AddressBlock title="Shipping" {...order.shippingAddress} />
        <AddressBlock title="Billing" {...order.billingAddress} />
      </section>

      <section className="mt-10 border-t border-line pt-10">
        <h2 className="eyebrow mb-5">Payment summary</h2>
        <dl className="max-w-sm space-y-2 font-sans text-[0.86rem]">
          <div className="flex justify-between gap-6 text-ink-muted">
            <dt>Subtotal</dt>
            <dd>{money(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-6 text-ink-muted">
            <dt>Shipping</dt>
            <dd>{order.shipping === 0 ? "Complimentary" : money(order.shipping)}</dd>
          </div>
          <div className="flex justify-between gap-6 text-ink-muted">
            <dt>Tax</dt>
            <dd>{money(order.tax)}</dd>
          </div>
          <div className="flex justify-between gap-6 border-t border-line pt-3 text-ink">
            <dt>Total</dt>
            <dd className="font-medium">{money(order.total)}</dd>
          </div>
          <div className="flex justify-between gap-6 pt-2 text-ink-muted">
            <dt>Paid with</dt>
            <dd>{order.paymentMethod}</dd>
          </div>
        </dl>
      </section>
    </AccountShell>
  );
}
