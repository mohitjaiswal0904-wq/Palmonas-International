"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Truck, ShieldCheck, CalendarDays, Check } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { WishlistButton } from "@/components/product/WishlistButton";
import { useCart } from "@/stores/cart";
import { useUi } from "@/stores/ui";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";
import { cn } from "@/lib/cn";

const AVAILABILITY_COPY: Record<Product["availability"], string> = {
  "in-stock": "In stock",
  "made-to-order": "Made to order",
  "low-stock": "Low stock — few remaining",
};

export function ProductBuyPanel({ product }: { product: Product }) {
  const [metal, setMetal] = useState(product.metals[0]?.id);
  const [stone, setStone] = useState(product.stones[0]?.id);
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const money = useRegionalMoney();
  const add = useCart((s) => s.add);
  const openCart = useUi((s) => s.open);

  const metalLabel = product.metals.find((m) => m.id === metal)?.label ?? "";
  const stoneLabel = product.stones.find((s) => s.id === stone)?.label;

  const addToBag = () => {
    add({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      currency: product.currency,
      metalLabel,
      stoneLabel,
      size,
      image: product.images[0].src,
      seed: product.images[0].seed,
      plate: product.images[0].plate,
      quantity: 1,
      giftWrap: false,
    });
  };

  const handleAdd = () => {
    addToBag();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart("cart");
  };

  /** Opens the bag after add — no checkout route in this prototype. */
  const handleAddAndViewBag = () => {
    addToBag();
    openCart("cart");
  };

  return (
    <div className="lg:sticky lg:top-28">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">{product.collectionLabel}</p>
        <WishlistButton
          productId={product.id}
          size={20}
          className="h-9 w-9 shrink-0 lg:hidden"
        />
      </div>

      {/* Full title on desktop; screen-reader only on mobile (sticky bar shows it visually) */}
      <h1 className="mt-3 min-w-0 font-display text-[2rem] leading-tight text-ink max-lg:sr-only sm:text-4xl lg:text-5xl">
        {product.name}
      </h1>

      {product.reviewCount > 0 ? (
        <div className="mt-4 flex items-center gap-3">
          <div
            className="flex items-center gap-0.5"
            aria-label={`Rated ${product.rating} out of 5`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                strokeWidth={1.2}
                className={cn(
                  i < Math.round(product.rating) ? "fill-ink text-ink" : "text-line-strong",
                )}
              />
            ))}
          </div>
          <span className="font-sans text-[0.76rem] text-ink-muted">
            {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </span>
        </div>
      ) : null}

      <p className="mt-5 hidden font-sans text-2xl font-normal tracking-tight text-ink lg:block">
        {money(product.price)}
      </p>

      {/* Metal */}
      <div className="mt-8">
        <p className="eyebrow mb-3">
          Metal — <span className="text-ink">{metalLabel}</span>
        </p>
        <div className="flex flex-wrap gap-2.5">
          {product.metals.map((m) => (
            <button
              key={m.id}
              onClick={() => setMetal(m.id)}
              aria-pressed={metal === m.id}
              aria-label={m.label}
              className={cn(
                "flex min-h-11 items-center gap-2 border px-3 py-2 text-ink transition-colors",
                metal === m.id
                  ? "border-ink ring-1 ring-ink"
                  : "border-line hover:border-line-strong",
              )}
            >
              <span
                className="h-4 w-4 rounded-full border border-line"
                style={{ background: m.swatch }}
              />
              <span className="font-sans text-[0.74rem]">{m.label.replace("18K ", "")}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stone */}
      {product.stones.length > 1 && (
        <div className="mt-6">
          <p className="eyebrow mb-3">
            Stone — <span className="text-ink">{stoneLabel}</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {product.stones.map((s) => (
              <button
                key={s.id}
                onClick={() => setStone(s.id)}
                aria-pressed={stone === s.id}
                className={cn(
                  "flex min-h-11 items-center gap-2 border px-3 py-2 text-ink transition-colors",
                  stone === s.id
                    ? "border-ink ring-1 ring-ink"
                    : "border-line hover:border-line-strong",
                )}
              >
                <span
                  className="h-4 w-4 rounded-full border border-line"
                  style={{ background: s.swatch }}
                />
                <span className="font-sans text-[0.74rem]">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size */}
      {product.sizes.length > 1 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="eyebrow">
              Size — <span className="text-ink">{size}</span>
            </p>
            <Link
              href="/size-guide"
              className="link-underline font-sans text-[0.72rem] text-ink-muted"
            >
              Size guide
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={cn(
                  "min-h-11 min-w-11 border px-3 py-2 font-sans text-[0.78rem] transition-colors",
                  size === s ? "border-ink bg-ink text-surface" : "border-line text-ink hover:border-line-strong",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop CTAs — mobile uses sticky bottom bar */}
      <div className="mt-8 hidden items-stretch gap-3 lg:flex">
        <Button size="lg" variant="outline" className="min-h-12 flex-1" onClick={handleAdd}>
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Check size={15} strokeWidth={2} /> Added
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Add to bag
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        <Button size="lg" className="min-h-12 flex-1" onClick={handleAddAndViewBag}>
          Add & view bag
        </Button>
        <WishlistButton
          productId={product.id}
          size={20}
          className="w-14 border border-line hover:border-ink"
        />
      </div>

      {/* Trust / service rows */}
      <ul className="mt-8 space-y-3 border-t border-line pt-6">
        <li className="flex items-center gap-3 font-sans text-[0.82rem] text-ink">
          <span className={cn("h-1.5 w-1.5 rounded-full", product.availability === "low-stock" ? "bg-error" : "bg-success")} />
          {AVAILABILITY_COPY[product.availability]}
        </li>
        <li className="flex items-center gap-3 font-sans text-[0.82rem] text-ink-muted">
          <Truck size={15} strokeWidth={1.4} className="text-ink" />
          {product.deliveryEstimate}
        </li>
        <li className="flex items-center gap-3 font-sans text-[0.82rem] text-ink-muted">
          <ShieldCheck size={15} strokeWidth={1.4} className="text-ink" />
          Lifetime craftsmanship warranty · complimentary returns
        </li>
        <li className="flex items-center gap-3 font-sans text-[0.82rem] text-ink-muted">
          <CalendarDays size={15} strokeWidth={1.4} className="text-ink" />
          <button className="link-underline text-ink">Book a private appointment</button>
        </li>
      </ul>

      {/* Sticky mobile CTA — name + price live here on small screens */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-line bg-ivory/95 px-4 pt-3 pb-safe-bar backdrop-blur-md sm:gap-3 sm:px-5 lg:hidden">
        <div className="min-w-0 flex-1" aria-hidden="true">
          <p className="truncate font-sans text-[0.8rem] font-medium leading-snug text-ink">
            {product.name}
          </p>
          <p className="mt-0.5 font-sans text-[0.8rem] tabular-nums text-ink-muted">
            {money(product.price)}
          </p>
        </div>
        <Button size="sm" variant="outline" className="w-[5.75rem] shrink-0 px-2" onClick={handleAdd}>
          {added ? "Added" : "Add"}
        </Button>
        <Button size="sm" className="w-[5.75rem] shrink-0 px-2" onClick={handleAddAndViewBag}>
          View bag
        </Button>
      </div>
    </div>
  );
}
