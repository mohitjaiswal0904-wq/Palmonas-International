"use client";

import { cn } from "@/lib/cn";

export type FilterState = {
  collections: string[];
  metals: string[];
  stones: string[];
  availability: string[];
  maxPrice: number;
};

export const emptyFilters = (maxPrice: number): FilterState => ({
  collections: [],
  metals: [],
  stones: [],
  availability: [],
  maxPrice,
});

function CheckRow({
  label,
  count,
  checked,
  onChange,
  swatch,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
  swatch?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-2 group">
      <span className="flex items-center gap-3">
        <span
          className={cn(
            "grid h-4 w-4 place-items-center border transition-colors",
            checked ? "border-ink bg-ink" : "border-line-strong bg-transparent",
          )}
          aria-hidden
        >
          {checked && (
            <span className="h-1.5 w-1.5 bg-surface" />
          )}
        </span>
        {swatch && (
          <span
            className="h-3 w-3 rounded-full border border-line"
            style={{ background: swatch }}
            aria-hidden
          />
        )}
        <span className="font-sans text-[0.86rem] text-ink group-hover:text-accent-deep">
          {label}
        </span>
      </span>
      {typeof count === "number" && (
        <span className="font-sans text-[0.72rem] text-ink-faint">{count}</span>
      )}
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}

export function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line py-6">
      <p className="eyebrow mb-3">{title}</p>
      {children}
    </div>
  );
}

export { CheckRow };
