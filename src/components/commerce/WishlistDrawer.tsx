"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Heart, X } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { useUi } from "@/stores/ui";
import { useWishlist } from "@/stores/wishlist";
import { useCart } from "@/stores/cart";
import { useAccount } from "@/stores/account";
import { useHydrated } from "@/hooks/useHydrated";
import { productById } from "@/data";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

type MetalFamily = "all" | "gold" | "silver" | "demifine";

const METAL_FILTERS: { id: MetalFamily; label: string }[] = [
  { id: "all", label: "All" },
  { id: "gold", label: "Gold" },
  { id: "silver", label: "Silver" },
  { id: "demifine", label: "Demifine" },
];

/** Map catalogue metal ids to the three shop families. */
function matchesMetalFamily(product: Product, family: MetalFamily): boolean {
  if (family === "all") return true;
  const ids = product.metals.map((m) => m.id);
  if (family === "gold") {
    return ids.some((id) => id === "gold9k");
  }
  if (family === "silver") {
    return ids.some((id) => id === "silver") && !ids.some((id) => id === "gold9k");
  }
  // Demifine — everyday plated finishes (not solid 9KT gold)
  return (
    !ids.some((id) => id === "gold9k") &&
    ids.some((id) => id === "yellow" || id === "white" || id === "rose" || id === "silver")
  );
}

export function WishlistDrawer() {
  const open = useUi((s) => s.overlay === "wishlist");
  const close = useUi((s) => s.close);
  const openOverlay = useUi((s) => s.open);
  const hydrated = useHydrated();
  const money = useRegionalMoney();
  const user = useAccount((s) => s.user);
  const setPendingMode = useAccount((s) => s.setPendingMode);

  const ids = useWishlist((s) => s.ids);
  const remove = useWishlist((s) => s.remove);
  const addToCart = useCart((s) => s.add);

  const [metalFilter, setMetalFilter] = useState<MetalFamily>("all");

  const items = useMemo(
    () => ids.map(productById).filter((p): p is Product => Boolean(p)),
    [ids],
  );

  const filtered = useMemo(
    () => items.filter((p) => matchesMetalFamily(p, metalFilter)),
    [items, metalFilter],
  );

  const counts = useMemo(() => {
    const next: Record<MetalFamily, number> = {
      all: items.length,
      gold: 0,
      silver: 0,
      demifine: 0,
    };
    for (const p of items) {
      if (matchesMetalFamily(p, "gold")) next.gold += 1;
      if (matchesMetalFamily(p, "silver")) next.silver += 1;
      if (matchesMetalFamily(p, "demifine")) next.demifine += 1;
    }
    return next;
  }, [items]);

  const isEmpty = hydrated && items.length === 0;
  const filterEmpty = hydrated && items.length > 0 && filtered.length === 0;

  return (
    <Drawer
      open={open}
      onClose={() => {
        setMetalFilter("all");
        close();
      }}
      title="Wishlist"
      widthClass="w-[calc(100%-1.25rem)] max-w-[440px]"
    >
      {!hydrated ? null : isEmpty ? (
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <Heart size={28} strokeWidth={1} className="text-ink-faint" />
          <p className="mt-5 font-serif text-2xl text-ink">Nothing saved yet</p>
          <p className="mt-2 max-w-[28ch] font-sans text-[0.85rem] text-ink-muted">
            Save the pieces you love. We&apos;ll keep them here for whenever you&apos;re ready.
          </p>
          <Button className="mt-7" variant="outline" onClick={close}>
            <Link href="/jewellery" onClick={close}>Explore jewellery</Link>
          </Button>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div
            className="sticky top-0 z-10 border-b border-line bg-surface px-6 py-3"
            role="tablist"
            aria-label="Filter by metal"
          >
            <div className="flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {METAL_FILTERS.map((f) => {
                const active = metalFilter === f.id;
                const count = counts[f.id];
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setMetalFilter(f.id)}
                    className={cn(
                      "shrink-0 px-3 py-2 font-sans text-[0.7rem] uppercase tracking-wide-sm transition-colors",
                      active
                        ? "bg-ink text-surface"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {f.label}
                    <span
                      className={cn(
                        "ml-1.5 tabular-nums",
                        active ? "text-surface/70" : "text-ink-faint",
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {filterEmpty ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <p className="font-serif text-xl text-ink">No pieces in this metal</p>
              <p className="mt-2 max-w-[28ch] font-sans text-[0.82rem] text-ink-muted">
                Try another filter, or save more pieces from the collection.
              </p>
              <button
                type="button"
                onClick={() => setMetalFilter("all")}
                className="mt-5 font-sans text-[0.72rem] uppercase tracking-wide-sm text-ink underline underline-offset-4"
              >
                Show all
              </button>
            </div>
          ) : (
            <div className="flex-1 divide-y divide-line px-6">
              {filtered.map((p) => (
                <div key={p.id} className="flex gap-4 py-6">
                  <Link
                    href={`/jewellery/${p.category}/${p.slug}`}
                    onClick={close}
                    className="relative h-20 w-20 shrink-0 overflow-hidden bg-stone"
                  >
                    <Media
                      src={p.images[0].src}
                      seed={p.images[0].seed}
                      kind={p.images[0].plate}
                      alt={p.images[0].alt}
                      sizes="80px"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-sans text-[0.86rem] text-ink">{p.name}</p>
                        <p className="mt-0.5 font-sans text-[0.74rem] text-ink-muted">
                          {p.metals[0]?.label}
                        </p>
                        <p className="mt-1 font-sans text-[0.82rem] text-ink">
                          {money(p.price)}
                        </p>
                      </div>
                      <button
                        aria-label={`Remove ${p.name} from wishlist`}
                        onClick={() => remove(p.id)}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-ink-muted hover:text-ink"
                      >
                        <X size={16} strokeWidth={1.4} />
                      </button>
                    </div>
                    <div className="mt-auto pt-3">
                      <button
                        onClick={() => {
                          addToCart({
                            productId: p.id,
                            name: p.name,
                            slug: p.slug,
                            category: p.category,
                            price: p.price,
                            currency: p.currency,
                            metalLabel: p.metals[0]?.label ?? "",
                            stoneLabel: p.stones[0]?.label,
                            size: p.sizes[0],
                            image: p.images[0].src,
                            seed: p.images[0].seed,
                            plate: p.images[0].plate,
                            giftWrap: false,
                          });
                          remove(p.id);
                        }}
                        className="link-underline font-sans text-[0.72rem] uppercase tracking-wide-sm text-ink"
                      >
                        Move to bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-line bg-surface px-6 py-6 pb-safe-bar">
            {user ? (
              <p className="font-sans text-[0.78rem] text-ink-muted">
                Signed in as {user.email}. Your wishlist is saved on this device.
              </p>
            ) : (
              <>
                <p className="font-sans text-[0.78rem] text-ink-muted">
                  Create an account to keep your wishlist across devices and share it with others.
                </p>
                <div className="mt-4 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setPendingMode("register");
                      openOverlay("account");
                    }}
                  >
                    Create account
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      if (typeof navigator !== "undefined" && navigator.share) {
                        void navigator.share({
                          title: "My Palmonas wishlist",
                          text: "Pieces I've saved at Palmonas International",
                          url: typeof window !== "undefined" ? window.location.origin : undefined,
                        });
                      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
                        void navigator.clipboard.writeText(window.location.origin);
                      }
                    }}
                  >
                    Share wishlist
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
}
