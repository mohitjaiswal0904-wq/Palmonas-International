"use client";

import { Button } from "@/components/ui/Button";
import { useCheckoutUi } from "@/components/checkout/CheckoutUiContext";
import { useCart } from "@/stores/cart";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";
import { cn } from "@/lib/cn";

export function CheckoutMobileFooter({
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  disabled,
  busy,
}: {
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  disabled?: boolean;
  busy?: boolean;
}) {
  const money = useRegionalMoney();
  const subtotal = useCart((s) => s.subtotal());
  const { totalsFor } = useCheckoutUi();
  const { total } = totalsFor(subtotal);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ivory/95 backdrop-blur-md lg:hidden",
        "pb-[max(1rem,env(safe-area-inset-bottom))] pt-3",
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-5 sm:px-8">
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[0.65rem] uppercase tracking-wide-sm text-ink-muted">
            Total
          </p>
          <p className="font-serif text-xl text-ink">{money(total)}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {secondaryLabel && onSecondary ? (
            <Button variant="outline" size="sm" type="button" className="min-h-11" onClick={onSecondary}>
              {secondaryLabel}
            </Button>
          ) : null}
          <Button
            size="lg"
            type="button"
            className="min-h-11 min-w-[8.5rem] shrink-0"
            disabled={disabled || busy}
            onClick={onPrimary}
          >
            {busy ? "Please wait…" : primaryLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
