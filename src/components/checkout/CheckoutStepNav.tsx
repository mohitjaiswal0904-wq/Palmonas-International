"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const STEPS = [
  { href: "/checkout/address", label: "Address" },
  { href: "/checkout/coupon", label: "Offers" },
  { href: "/checkout/review", label: "Review" },
] as const;

export function CheckoutStepNav() {
  const pathname = usePathname();
  const activeIndex = STEPS.findIndex((s) => pathname.startsWith(s.href));

  return (
    <nav aria-label="Checkout progress" className="mb-8 border-b border-line pb-5 sm:mb-10 sm:pb-6">
      <ol className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6">
        {STEPS.map((step, i) => {
          const active = i === activeIndex;
          const done = activeIndex > i;

          return (
            <li key={step.href} className="flex items-center gap-2">
              <span
                className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center font-sans text-[0.68rem]",
                  done || active ? "bg-ink text-surface" : "border border-line text-ink-muted",
                )}
                aria-hidden
              >
                {i + 1}
              </span>
              <Link
                href={step.href}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "font-sans text-[0.72rem] uppercase tracking-wide-sm transition-colors sm:text-[0.74rem]",
                  active
                    ? "font-medium text-ink underline decoration-ink decoration-2 underline-offset-[6px]"
                    : done
                      ? "text-ink-muted hover:text-ink"
                      : "text-ink-faint pointer-events-none",
                )}
                tabIndex={done || active ? 0 : -1}
              >
                {step.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
