"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { useUi } from "@/stores/ui";
import { useCart, type CartLine } from "@/stores/cart";
import { useWishlist } from "@/stores/wishlist";
import { useHydrated } from "@/hooks/useHydrated";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";
import { bestSellers } from "@/data";
import { easeOutSoft } from "@/lib/motion";
import type { PlateKind } from "@/types";

export function CartDrawer() {
  const open = useUi((s) => s.overlay === "cart");
  const close = useUi((s) => s.close);
  const openOverlay = useUi((s) => s.open);
  const hydrated = useHydrated();
  const money = useRegionalMoney();

  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const toggleGiftWrap = useCart((s) => s.toggleGiftWrap);
  const addToWishlist = useWishlist((s) => s.add);
  const subtotal = useCart((s) => s.subtotal());

  const [pendingRemoveKey, setPendingRemoveKey] = useState<string | null>(null);

  const isEmpty = hydrated && lines.length === 0;
  const suggestion = bestSellers()[0];

  const requestRemove = (key: string) => setPendingRemoveKey(key);

  const confirmRemove = (line: CartLine) => {
    remove(line.key);
    setPendingRemoveKey(null);
  };

  const moveToWishlist = (line: CartLine) => {
    addToWishlist(line.productId);
    remove(line.key);
    setPendingRemoveKey(null);
  };

  const cancelRemove = () => setPendingRemoveKey(null);

  return (
    <Drawer
      open={open}
      onClose={() => {
        setPendingRemoveKey(null);
        close();
      }}
      title="Your Bag"
      widthClass="w-[calc(100%-1.25rem)] max-w-[440px]"
    >
      {!hydrated ? null : isEmpty ? (
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <ShoppingBag size={28} strokeWidth={1} className="text-ink-faint" />
          <p className="mt-5 font-serif text-2xl text-ink">Your bag is empty</p>
          <p className="mt-2 max-w-[26ch] font-sans text-[0.85rem] text-ink-muted">
            Every piece is made to be worn. Begin with the ones you&apos;ll never take off.
          </p>
          <Button className="mt-7" onClick={close} variant="outline">
            <Link href="/jewellery" onClick={close}>Discover the collection</Link>
          </Button>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex-1 divide-y divide-line px-6">
            {lines.map((l) => {
              const confirming = pendingRemoveKey === l.key;
              return (
                <div key={l.key} className="flex gap-4 py-6">
                  <Link
                    href={`/jewellery/${l.category}/${l.slug}`}
                    onClick={close}
                    className="relative h-20 w-20 shrink-0 overflow-hidden bg-stone"
                  >
                    <Media
                      src={l.image}
                      seed={l.seed}
                      kind={l.plate as PlateKind}
                      alt={l.name}
                      sizes="80px"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="font-sans text-[0.86rem] text-ink">{l.name}</p>
                        <p className="mt-0.5 font-sans text-[0.74rem] text-ink-muted">
                          {l.metalLabel}
                          {l.stoneLabel && l.stoneLabel !== "No Stone" ? ` · ${l.stoneLabel}` : ""}
                          {l.size ? ` · ${l.size}` : ""}
                        </p>
                      </div>
                      <p className="whitespace-nowrap font-sans text-[0.82rem] text-ink">
                        {money(l.price * l.quantity)}
                      </p>
                    </div>

                    <AnimatePresence initial={false} mode="wait">
                      {confirming ? (
                        <motion.div
                          key="confirm"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.25, ease: easeOutSoft }}
                          className="mt-3 border border-line bg-stone/40 px-3 py-3"
                          role="group"
                          aria-label={`Confirm remove ${l.name}`}
                        >
                          <p className="font-sans text-[0.78rem] leading-snug text-ink">
                            Remove this piece from your bag?
                          </p>
                          <p className="mt-1 font-sans text-[0.72rem] text-ink-muted">
                            You can save it to your wishlist instead.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => moveToWishlist(l)}
                              className="min-h-10 flex-1 border border-ink bg-ink px-3 font-sans text-[0.68rem] uppercase tracking-wide-sm text-surface transition-colors hover:bg-accent-deep"
                            >
                              Move to wishlist
                            </button>
                            <button
                              type="button"
                              onClick={() => confirmRemove(l)}
                              className="min-h-10 flex-1 border border-line px-3 font-sans text-[0.68rem] uppercase tracking-wide-sm text-ink transition-colors hover:border-ink"
                            >
                              Remove
                            </button>
                            <button
                              type="button"
                              onClick={cancelRemove}
                              className="min-h-10 w-full font-sans text-[0.68rem] uppercase tracking-wide-sm text-ink-muted transition-colors hover:text-ink"
                            >
                              Keep in bag
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="controls"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-line">
                              <button
                                aria-label="Decrease quantity"
                                onClick={() => {
                                  if (l.quantity <= 1) requestRemove(l.key);
                                  else setQuantity(l.key, l.quantity - 1);
                                }}
                                className="grid h-11 w-11 place-items-center text-ink-muted hover:text-ink"
                              >
                                <Minus size={13} strokeWidth={1.5} />
                              </button>
                              <span className="w-8 text-center font-sans text-[0.8rem] text-ink">
                                {l.quantity}
                              </span>
                              <button
                                aria-label="Increase quantity"
                                onClick={() => setQuantity(l.key, l.quantity + 1)}
                                className="grid h-11 w-11 place-items-center text-ink-muted hover:text-ink"
                              >
                                <Plus size={13} strokeWidth={1.5} />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => requestRemove(l.key)}
                              className="link-underline font-sans text-[0.72rem] text-ink-muted"
                            >
                              Remove
                            </button>
                          </div>

                          <label className="mt-3 flex cursor-pointer items-center gap-2">
                            <input
                              type="checkbox"
                              checked={l.giftWrap}
                              onChange={() => toggleGiftWrap(l.key)}
                              className="accent-[var(--ink)]"
                            />
                            <span className="font-sans text-[0.72rem] text-ink-muted">
                              Add signature gift wrapping (+{money(15)})
                            </span>
                          </label>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}

            {suggestion && (
              <div className="py-6">
                <p className="eyebrow mb-4">You may also like</p>
                <Link
                  href={`/jewellery/${suggestion.category}/${suggestion.slug}`}
                  onClick={close}
                  className="flex items-center gap-4"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-stone">
                    <Media
                      src={suggestion.images[0].src}
                      seed={suggestion.images[0].seed}
                      kind={suggestion.images[0].plate}
                      alt={suggestion.images[0].alt}
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="font-sans text-[0.82rem] text-ink">{suggestion.name}</p>
                    <p className="font-sans text-[0.76rem] text-ink-muted">
                      {money(suggestion.price)}
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-line bg-surface px-6 py-6 pb-safe-bar">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[0.78rem] uppercase tracking-wide-sm text-ink-muted">
                Subtotal
              </span>
              <span className="font-serif text-xl text-ink">{money(subtotal)}</span>
            </div>
            <p className="mt-1 font-sans text-[0.72rem] text-ink-muted">
              Complimentary express delivery &amp; returns. Online checkout is
              coming soon — your bag is saved on this device.
            </p>
            <Button className="mt-5 w-full" size="lg" disabled title="Checkout is not available in this prototype">
              Checkout coming soon
            </Button>
            <button
              onClick={() => openOverlay("wishlist")}
              className="mt-3 min-h-11 w-full text-center font-sans text-[0.72rem] uppercase tracking-wide-sm text-ink-muted hover:text-ink"
            >
              View wishlist
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
}
