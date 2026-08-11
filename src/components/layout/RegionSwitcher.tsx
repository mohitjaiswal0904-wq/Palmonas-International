"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { flagUrl, regions } from "@/data/regions";
import { useRegion } from "@/stores/region";
import { useHydrated } from "@/hooks/useHydrated";
import { easeOutSoft } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function RegionSwitcher({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const hydrated = useHydrated();
  const regionId = useRegion((s) => s.regionId);
  const setRegion = useRegion((s) => s.setRegion);
  const region = regions.find((r) => r.id === regionId) ?? regions[0];
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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

  // Avoid flashing the wrong flag before persistence hydrates.
  const code = hydrated ? region.countryCode : "us";
  const label = hydrated ? region.countryCode.toUpperCase() : "US";
  const currency = hydrated ? region.currency : "USD";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-label={`Region: ${hydrated ? region.country : "United States"}. Change region`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-9 items-center gap-2 text-ink transition-colors duration-300 hover:text-accent-deep",
          compact ? "px-1" : "px-1.5",
        )}
      >
        <span className="relative h-[14px] w-[20px] overflow-hidden rounded-[2px] ring-1 ring-ink/10">
          <Image
            src={flagUrl(code, 40)}
            alt=""
            fill
            sizes="20px"
            className="object-cover"
          />
        </span>
        {!compact && (
          <span className="hidden font-sans text-[0.68rem] font-medium uppercase tracking-wide-sm sm:inline">
            {label}
            <span className="text-ink-faint"> · {currency}</span>
          </span>
        )}
        <ChevronDown
          size={12}
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
            aria-label="Select region"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: easeOutSoft }}
            className="absolute right-0 top-[calc(100%+8px)] z-[60] w-[240px] border border-line bg-ivory py-2 shadow-[0_12px_40px_rgba(26,24,22,0.08)]"
          >
            <p className="px-4 pb-2 pt-1 font-sans text-[0.62rem] font-medium uppercase tracking-luxe text-ink-muted">
              Ship to
            </p>
            <ul>
              {regions.map((r) => {
                const active = r.id === region.id;
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        setRegion(r.id);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-stone/70",
                        active && "bg-stone/50",
                      )}
                    >
                      <span className="relative h-[14px] w-[20px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-ink/10">
                        <Image
                          src={flagUrl(r.countryCode, 40)}
                          alt=""
                          fill
                          sizes="20px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-sans text-[0.82rem] text-ink">
                          {r.country}
                        </span>
                        <span className="block font-sans text-[0.68rem] text-ink-muted">
                          {r.currency} · {r.language}
                        </span>
                      </span>
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
