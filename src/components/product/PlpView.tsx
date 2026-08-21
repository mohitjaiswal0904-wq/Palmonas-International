"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Drawer } from "@/components/ui/Drawer";
import { Button, ButtonLink } from "@/components/ui/Button";
import {
  FilterGroup,
  CheckRow,
  type FilterState,
  emptyFilters,
} from "@/components/product/FilterControls";
import { categories, collections, CATALOG_METALS, CATALOG_STONES } from "@/data";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";
import { useUi } from "@/stores/ui";
import { easeOutSoft } from "@/lib/motion";
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

/** Filter chips use metal/stone *labels* (match Product.metals[].label). */
const METALS = Object.values(CATALOG_METALS)
  .filter((m) => m.id !== "platinum")
  .map((m) => ({ id: m.label, label: m.label, swatch: m.swatch }));

const STONES = Object.values(CATALOG_STONES)
  .filter((s) => s.id !== "none" && s.id !== "sapphire" && s.id !== "emerald" && s.id !== "ruby")
  .map((s) => ({ id: s.label, label: s.label, swatch: s.swatch }));

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function PlpView({
  products,
  activeCategory,
  initialSort = "featured",
  initialMetals = [],
  initialStones = [],
  searchMode = false,
}: {
  products: Product[];
  activeCategory?: string;
  initialSort?: SortKey;
  initialMetals?: string[];
  initialStones?: string[];
  /** Search results: hide category tabs, filters, and sort. */
  searchMode?: boolean;
}) {
  const priceCeiling = useMemo(() => {
    if (!products.length) return 1000;
    return Math.ceil(Math.max(...products.map((p) => p.price)) / 100) * 100;
  }, [products]);
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
        list.sort(
          (a, b) =>
            Number(b.badges.includes("BESTSELLER")) -
              Number(a.badges.includes("BESTSELLER")) ||
            Number(b.badges.includes("NEW")) - Number(a.badges.includes("NEW")),
        );
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
        {collections
          .filter((c) => c.productIds.length > 0)
          .map((c) => (
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

  if (searchMode) {
    if (products.length === 0) {
      return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
          <p className="font-display text-3xl text-ink">No pieces match your search</p>
          <p className="mt-3 max-w-[36ch] font-sans text-[0.9rem] text-ink-muted">
            Try another keyword, or browse the full collection.
          </p>
          <ButtonLink variant="outline" className="mt-7" href="/jewellery">
            Browse all jewellery
          </ButtonLink>
        </div>
      );
    }
    return <ProductGrid products={products} />;
  }

  return (
    <>
      {/* Category nav */}
      <nav
        aria-label="Categories"
        className="scroll-thin -mx-5 mb-8 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-px-5 border-b border-line px-5 sm:mx-0 sm:snap-none sm:scroll-px-0 sm:px-0"
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

      {/* Controls bar — sticks below the site header on scroll */}
      <div className="sticky top-[5.75rem] z-40 -mx-5 mb-8 flex items-center justify-between gap-4 border-b border-line bg-ivory/95 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:top-28 lg:-mx-12 lg:px-12">
        <div className="flex items-center gap-4">
          <button
            onClick={() => openFilters("filters")}
            className="flex min-h-11 items-center gap-2 font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink lg:hidden"
          >
            <SlidersHorizontal size={15} strokeWidth={1.4} />
            Filter{activeCount ? ` (${activeCount})` : ""}
          </button>
          <p className="hidden font-sans text-[0.78rem] text-ink-muted lg:block">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <SortMenu value={sort} onChange={setSort} />
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

      {/* Mobile filter drawer — same near-full side panel as wishlist */}
      <Drawer
        open={filtersOpen}
        onClose={closeFilters}
        side="left"
        title={`Filter${activeCount ? ` (${activeCount})` : ""}`}
        widthClass="w-[calc(100%-1.25rem)] max-w-[440px]"
      >
        <div className="px-6">{panel}</div>
        <div className="sticky bottom-0 flex gap-3 border-t border-line bg-surface px-6 py-4 pb-safe-bar">
          <Button
            variant="ghost"
            size="sm"
            className="min-h-11 flex-1"
            onClick={() => setFilters(emptyFilters(priceCeiling))}
          >
            Clear
          </Button>
          <Button size="sm" className="min-h-11 flex-1" onClick={closeFilters}>
            Show {filtered.length}
          </Button>
        </div>
      </Drawer>
    </>
  );
}

function SortMenu({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (next: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const options = Object.keys(SORT_LABEL) as SortKey[];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Sort by ${SORT_LABEL[value]}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 items-center gap-2 font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink transition-colors hover:text-accent-deep"
      >
        <span className="text-ink-muted">Sort</span>
        <span className="border-b border-line pb-0.5">{SORT_LABEL[value]}</span>
        <ChevronDown
          size={13}
          strokeWidth={1.5}
          className={cn(
            "text-ink-muted transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label="Sort by"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: easeOutSoft }}
            className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[220px] border border-line bg-ivory py-2 shadow-[0_12px_40px_rgba(26,24,22,0.08)]"
          >
            <p className="px-4 pb-2 pt-1 font-sans text-[0.62rem] font-medium uppercase tracking-luxe text-ink-muted">
              Sort by
            </p>
            <ul>
              {options.map((key) => {
                const active = key === value;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        onChange(key);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left font-sans text-[0.82rem] transition-colors hover:bg-stone/70",
                        active ? "bg-stone/50 text-ink" : "text-ink-muted hover:text-ink",
                      )}
                    >
                      <span>{SORT_LABEL[key]}</span>
                      {active && (
                        <span className="font-sans text-[0.62rem] uppercase tracking-wide-sm text-accent-deep">
                          Active
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
        "snap-start -mb-px whitespace-nowrap border-b-2 pb-3 pt-1 font-sans text-[0.8rem] uppercase tracking-wide-sm transition-colors",
        active
          ? "border-ink text-ink"
          : "border-transparent text-ink-muted hover:text-ink",
      )}
    >
      {label}
    </Link>
  );
}
