"use client";

import Link from "next/link";
import { Heart, X } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { useUi } from "@/stores/ui";
import { useWishlist } from "@/stores/wishlist";
import { useCart } from "@/stores/cart";
import { useHydrated } from "@/hooks/useHydrated";
import { productById } from "@/data";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";

export function WishlistDrawer() {
  const open = useUi((s) => s.overlay === "wishlist");
  const close = useUi((s) => s.close);
  const hydrated = useHydrated();
  const money = useRegionalMoney();

  const ids = useWishlist((s) => s.ids);
  const remove = useWishlist((s) => s.remove);
  const addToCart = useCart((s) => s.add);

  const items = ids.map(productById).filter(Boolean);
  const isEmpty = hydrated && items.length === 0;

  return (
    <Drawer open={open} onClose={close} title="Wishlist">
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
          <div className="flex-1 divide-y divide-line px-6">
            {items.map((p) => (
              <div key={p!.id} className="flex gap-4 py-6">
                <Link
                  href={`/jewellery/${p!.category}/${p!.slug}`}
                  onClick={close}
                  className="relative h-20 w-20 shrink-0 overflow-hidden bg-stone"
                >
                  <Media
                    src={p!.images[0].src}
                    seed={p!.images[0].seed}
                    kind={p!.images[0].plate}
                    alt={p!.images[0].alt}
                    sizes="80px"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-sans text-[0.86rem] text-ink">{p!.name}</p>
                      <p className="mt-0.5 font-sans text-[0.74rem] text-ink-muted">
                        {p!.metals[0]?.label}
                      </p>
                      <p className="mt-1 font-sans text-[0.82rem] text-ink">
                        {money(p!.price)}
                      </p>
                    </div>
                    <button
                      aria-label={`Remove ${p!.name} from wishlist`}
                      onClick={() => remove(p!.id)}
                      className="text-ink-muted hover:text-ink"
                    >
                      <X size={16} strokeWidth={1.4} />
                    </button>
                  </div>
                  <div className="mt-auto pt-3">
                    <button
                      onClick={() => {
                        addToCart({
                          productId: p!.id,
                          name: p!.name,
                          slug: p!.slug,
                          category: p!.category,
                          price: p!.price,
                          currency: p!.currency,
                          metalLabel: p!.metals[0]?.label ?? "",
                          stoneLabel: p!.stones[0]?.label,
                          size: p!.sizes[0],
                          image: p!.images[0].src,
                          seed: p!.images[0].seed,
                          plate: p!.images[0].plate,
                          giftWrap: false,
                        });
                        remove(p!.id);
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

          <div className="border-t border-line bg-surface px-6 py-6">
            <p className="font-sans text-[0.78rem] text-ink-muted">
              Create an account to keep your wishlist across devices and share it with others.
            </p>
            <div className="mt-4 flex gap-3">
              <Button variant="outline" size="sm" className="flex-1">
                Create account
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                Share wishlist
              </Button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
