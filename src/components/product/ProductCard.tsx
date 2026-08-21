"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types";
import { Media } from "@/components/ui/Media";
import { WishlistButton } from "@/components/product/WishlistButton";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";
import { cn } from "@/lib/cn";

export function ProductCard({
  product,
  priority,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const money = useRegionalMoney();
  const [hover, setHover] = useState(false);
  const href = `/jewellery/${product.category}/${product.slug}`;
  const primary = product.images[0];
  const secondary = product.images[1] ?? product.images[0];
  const badge = product.badges[0];

  return (
    <article
      className={cn("group relative", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-stone">
        <Link href={href} className="absolute inset-0 block">
          <div
            className={cn(
              "absolute inset-0 transition-all duration-[900ms] ease-[var(--ease-editorial)]",
              hover ? "opacity-0 scale-[1.03]" : "opacity-100 scale-100",
            )}
          >
            <Media
              seed={primary.seed}
              kind={primary.plate}
              src={primary.src}
              alt={primary.alt}
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
          <div
            className={cn(
              "absolute inset-0 transition-all duration-[900ms] ease-[var(--ease-editorial)]",
              hover ? "opacity-100 scale-[1.03]" : "opacity-0 scale-100",
            )}
            aria-hidden={!hover}
          >
            <Media
              seed={secondary.seed}
              kind={secondary.plate}
              src={secondary.src}
              alt={secondary.alt}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </Link>

        {badge && (
          <span className="pointer-events-none absolute left-3 top-3 z-10 font-sans text-[0.58rem] font-semibold uppercase tracking-luxe text-ink">
            {badge === "BESTSELLER" ? "Best Seller" : badge === "NEW" ? "New" : badge === "LIMITED" ? "Limited" : "Exclusive"}
          </span>
        )}

        <div className="absolute right-3 top-3 z-10">
          <WishlistButton
            productId={product.id}
            className="opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100"
            size={18}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1 sm:mt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-sans text-[0.82rem] font-medium text-ink sm:text-[0.86rem]">
            <Link href={href}>{product.name}</Link>
          </h3>
          <p className="mt-0.5 truncate font-sans text-[0.72rem] text-ink-muted sm:text-[0.74rem]">
            {product.metals[0]?.label ?? product.categoryLabel}
          </p>
        </div>
        <p className="font-sans text-[0.78rem] text-ink sm:whitespace-nowrap sm:text-[0.82rem]">
          {money(product.price)}
        </p>
      </div>
    </article>
  );
}
