"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/stores/wishlist";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/cn";

export function WishlistButton({
  productId,
  className,
  size = 18,
}: {
  productId: string;
  className?: string;
  size?: number;
}) {
  const hydrated = useHydrated();
  const has = useWishlist((s) => s.ids.includes(productId));
  const toggle = useWishlist((s) => s.toggle);
  const active = hydrated && has;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={cn(
        "grid place-items-center text-ink transition-colors hover:text-accent-deep",
        className,
      )}
    >
      <Heart
        size={size}
        strokeWidth={1.4}
        className={cn(active && "fill-ink text-ink")}
      />
    </button>
  );
}
