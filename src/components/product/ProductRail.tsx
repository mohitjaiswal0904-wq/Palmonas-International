import type { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="scroll-thin -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p, i) => (
        <div
          key={p.id}
          className="w-[62vw] shrink-0 snap-start sm:w-auto"
        >
          <ProductCard product={p} priority={i < 2} />
        </div>
      ))}
    </div>
  );
}
