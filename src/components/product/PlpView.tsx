"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import {
  FilterGroup,
  CheckRow,
  type FilterState,
  emptyFilters,
} from "@/components/product/FilterControls";
import { categories, collections } from "@/data";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";
import { useUi } from "@/stores/ui";
import { cn } from "@/lib/cn";

type SortKey = "featured" | "new" | "price-asc" | "price-desc" | "bestsellers";

const SORT_LABEL: Record<SortKey, string> = {
  featured: "Featured",
  new: "New arrivals",
  bestsellers: "Best sellers",
  "price-asc": "Price · low to high",
  "price-desc": "Price · high to low",
};

const AVAILABILITY = [
  { id: "in-stock", label: "In stock" },
  { id: "made-to-order", label: "Made to order" },
  { id: "low-stock", label: "Low stock" },
];

const METALS = [
  { id: "18K Yellow Gold", label: "18K Yellow Gold", swatch: "#c9a95f" },
  { id: "18K White Gold", label: "18K White Gold", swatch: "#dcdcdc" },
  { id: "18K Rose Gold", label: "18K Rose Gold", swatch: "#d8a48a" },
  { id: "Platinum", label: "Platinum", swatch: "#c7c9cc" },
];

const STONES = [
  { id: "Diamond", label: "Diamond", swatch: "#eef1f4" },
  { id: "Sapphire", label: "Sapphire", swatch: "#2a4a7a" },
  { id: "Emerald", label: "Emerald", swatch: "#2f5d4a" },
  { id: "Ruby", label: "Ruby", swatch: "#7a2233" },
];

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function PlpView({
  products,
  activeCategory,
  initialSort = "featured",
  initialMetals = [],
  initialStones = [],
}: {
  products: Product[];
  activeCategory?: string;
  initialSort?: SortKey;
  initialMetals?: string[];
  initialStones?: string[];
}) {
  const priceCeiling = useMemo(
    () => Math.ceil(Math.max(...products.map((p) => p.price)) / 100) * 100,
    [products],
  );
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...emptyFilters(priceCeiling),
    metals: initialMetals,
    stones: initialStones,
  }));
  const [sort, setSort] = useState<SortKey>(initialSort);
  const money = useRegionalMoney();

  const openFilters = useUi((s) => s.open);
  const filtersOpen = useUi((s) => s.overlay === "filters");
  const closeFilters = useUi((s) => s.close);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.collections.length && !filters.collections.includes(p.collection))
        return false;
      if (
        filters.metals.length &&
        !p.metals.some((m) => filters.metals.includes(m.label))
      )
        return false;
      if (
        filters.stones.length &&
        !p.stones.some((s) => filters.stones.includes(s.label))
      )
        return false;
      if (filters.availability.length && !filters.availability.includes(p.availability))
        return false;
      if (p.price > filters.maxPrice) return false;
      return true;
    });

    list = [...list];
    switch (sort) {
      case "new":
        list.sort((a, b) => Number(b.badges.includes("NEW")) - Number(a.badges.includes("NEW")));
        break;
      case "bestsellers":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
    }
    return list;
  }, [products, filters, sort]);

  const activeCount =
    filters.collections.length +
    filters.metals.length +
    filters.stones.length +
    filters.availability.length +
    (filters.maxPrice < priceCeiling ? 1 : 0);

  const panel = (
    <div>
      <FilterGroup title="Collection">
        {collections.map((c) => (
          <CheckRow
            key={c.slug}
            label={c.name}
            checked={filters.collections.includes(c.slug)}
            onChange={() =>
              setFilters((f) => ({ ...f, collections: toggle(f.collections, c.slug) }))
            }
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Metal">
        {METALS.map((m) => (
          <CheckRow
            key={m.id}
            label={m.label}
            swatch={m.swatch}
            checked={filters.metals.includes(m.id)}
            onChange={() => setFilters((f) => ({ ...f, metals: toggle(f.metals, m.id) }))}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Stone">
        {STONES.map((s) => (
          <CheckRow
            key={s.id}
            label={s.label}
            swatch={s.swatch}
            checked={filters.stones.includes(s.id)}
            onChange={() => setFilters((f) => ({ ...f, stones: toggle(f.stones, s.id) }))}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Availability">
        {AVAILABILITY.map((a) => (
          <CheckRow
            key={a.id}
            label={a.label}
            checked={filters.availability.includes(a.id)}
            onChange={() =>
              setFilters((f) => ({ ...f, availability: toggle(f.availability, a.id) }))
            }
          />
        ))}
      </FilterGroup>
      <FilterGroup title={`Price · up to ${money(filters.maxPrice)}`}>
        <input
          type="range"
          min={200}
          max={priceCeiling}
          step={50}
          value={filters.maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
          aria-label="Maximum price"
          className="mt-2 w-full accent-[var(--ink)]"
        />
        <div className="mt-1 flex justify-between font-sans text-[0.7rem] text-ink-faint">
          <span>{money(200)}</span>
          <span>{money(priceCeiling)}</span>
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <>
      {/* Category nav */}
      <nav
        aria-label="Categories"
        className="scroll-thin -mx-5 mb-8 flex gap-6 overflow-x-auto border-b border-line px-5 sm:mx-0 sm:px-0"
      >
        <CategoryTab href="/jewellery" active={!activeCategory} label="All" />
        {categories.map((c) => (
          <CategoryTab
            key={c.slug}
            href={`/jewellery/${c.slug}`}
            active={activeCategory === c.slug}
            label={c.label}
          />
        ))}
      </nav>

      {/* Controls bar */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => openFilters("filters")}
            className="flex items-center gap-2 font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink lg:hidden"
          >
            <SlidersHorizontal size={15} strokeWidth={1.4} />
            Filter{activeCount ? ` (${activeCount})` : ""}
          </button>
          <p className="hidden font-sans text-[0.78rem] text-ink-muted lg:block">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <label className="flex items-center gap-2">
          <span className="sr-only">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border-b border-line bg-transparent py-1 font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink focus:border-accent focus:outline-none"
          >
            {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => (
              <option key={k} value={k}>
                {SORT_LABEL[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
        {/* Desktop persistent filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <div className="mb-2 flex items-center justify-between">
              <p className="eyebrow">Filter</p>
              {activeCount > 0 && (
                <button
                  onClick={() => setFilters(emptyFilters(priceCeiling))}
                  className="font-sans text-[0.7rem] text-ink-muted underline"
                >
                  Clear ({activeCount})
                </button>
              )}
            </div>
            <div className="scroll-thin max-h-[calc(100vh-10rem)] overflow-y-auto pr-1">
              {panel}
            </div>
          </div>
        </aside>

        {/* Grid + empty state */}
        <div>
          {filtered.length === 0 ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
              <p className="font-display text-3xl text-ink">No pieces match your filters</p>
              <p className="mt-3 max-w-[36ch] font-sans text-[0.9rem] text-ink-muted">
                Try relaxing a filter or two — the collection is broader than it looks.
              </p>
              <Button
                variant="outline"
                className="mt-7"
                onClick={() => setFilters(emptyFilters(priceCeiling))}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <ProductGrid products={filtered} />
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <Drawer open={filtersOpen} onClose={closeFilters} side="left" title={`Filter${activeCount ? ` (${activeCount})` : ""}`}>
        <div className="px-6">{panel}</div>
        <div className="sticky bottom-0 flex gap-3 border-t border-line bg-surface px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => setFilters(emptyFilters(priceCeiling))}
          >
            Clear
          </Button>
          <Button size="sm" className="flex-1" onClick={closeFilters}>
            Show {filtered.length}
          </Button>
        </div>
      </Drawer>
    </>
  );
}

function CategoryTab({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "-mb-px whitespace-nowrap border-b-2 pb-3 pt-1 font-sans text-[0.8rem] uppercase tracking-wide-sm transition-colors",
        active
          ? "border-ink text-ink"
          : "border-transparent text-ink-muted hover:text-ink",
      )}
    >
      {label}
    </Link>
  );
}
