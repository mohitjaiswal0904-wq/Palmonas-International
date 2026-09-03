"use client";

import { Suspense, useEffect, useLayoutEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/catalog/products";
import { useCart } from "@/stores/cart";
import { DEMO_ACCOUNT, useAccount } from "@/stores/account";

import { useUi } from "@/stores/ui";
import { useWishlist } from "@/stores/wishlist";

function FigmaCaptureSeedInner() {
  const params = useSearchParams();
  const seed = params.get("figmaSeed");
  const overlayParam = params.get("figmaOverlay");
  const add = useCart((s) => s.add);
  const lines = useCart((s) => s.lines);
  const user = useAccount((s) => s.user);
  const signIn = useAccount((s) => s.signIn);
  const openOverlay = useUi((s) => s.open);
  const addWishlist = useWishlist((s) => s.add);

  useLayoutEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    if (seed === "cart" && lines.length === 0) {
      const product = products[0];
      if (!product) return;

      const metalLabel = product.metals[0]?.label ?? "925 Sterling Silver";
      const stoneLabel = product.stones[0]?.label;
      const size = product.sizes[0];
      const image = product.images[0];

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
        image: image.src,
        seed: image.seed,
        plate: image.plate,
        quantity: 1,
        giftWrap: false,
      });
    }
  }, [seed, add, lines.length]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    if (seed === "account" && !user) {
      signIn(DEMO_ACCOUNT.email, DEMO_ACCOUNT.password);
    }

    if (overlayParam === "wishlist" && products[0]) {
      addWishlist(products[0].id);
    }

    if (overlayParam) {
      const overlay = overlayParam as "search" | "cart" | "wishlist" | "menu" | "filters" | "account";
      if (["search", "cart", "wishlist", "menu", "filters", "account"].includes(overlay)) {
        openOverlay(overlay);
      }
    }
  }, [seed, overlayParam, lines.length, user, signIn, openOverlay, addWishlist]);

  return null;
}

export function FigmaCaptureSeed() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <Suspense fallback={null}>
      <FigmaCaptureSeedInner />
    </Suspense>
  );
}
