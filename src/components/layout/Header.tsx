"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { primaryNav } from "@/data";
import { Wordmark } from "@/components/layout/Wordmark";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { RegionSwitcher } from "@/components/layout/RegionSwitcher";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { useScrolled } from "@/hooks/useScrolled";
import { useHydrated } from "@/hooks/useHydrated";
import { useUi } from "@/stores/ui";
import { useCart } from "@/stores/cart";
import { useWishlist } from "@/stores/wishlist";
import { useAccount } from "@/stores/account";
import { easeEditorial } from "@/lib/motion";
import { cn } from "@/lib/cn";

const barTransition = {
  duration: 0.7,
  ease: easeEditorial,
} as const;

export function Header() {
  const scrolled = useScrolled(48, 12);
  const reduceMotion = useReducedMotion();
  const hydrated = useHydrated();
  const [activeMega, setActiveMega] = useState<number | null>(null);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openOverlay = useUi((s) => s.open);
  const cartCount = useCart((s) => s.lines.reduce((n, l) => n + l.quantity, 0));
  const wishCount = useWishlist((s) => s.ids.length);

  const openMega = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    const entry = primaryNav[i];
    setActiveMega(entry.mega || entry.menu ? i : null);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setActiveMega(null);
      setHoveredNav(null);
    }, 120);
  };

  const transition = reduceMotion ? { duration: 0 } : barTransition;
  const inkIndex = hoveredNav ?? activeMega;

  return (
    <header className="sticky top-0 z-50" onMouseLeave={scheduleClose}>
      <AnnouncementBar />
      <div className="relative border-b border-line bg-ivory/90 backdrop-blur-md">
        {/* Row 1 — mobile: compact 3-col · desktop: tall centered mark */}
        <div className="mx-auto grid h-14 max-w-[1440px] grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-1 px-3 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:px-5 lg:hidden">
          <button
            className="inline-flex h-11 w-11 items-center justify-center justify-self-start text-ink"
            aria-label="Open menu"
            onClick={() => openOverlay("menu")}
          >
            <Menu size={20} strokeWidth={1.3} />
          </button>

          <div className="flex min-w-0 justify-start">
            <Wordmark size="xs" priority />
          </div>

          <div className="flex items-center justify-self-end">
            <button
              aria-label="Search"
              onClick={() => openOverlay("search")}
              className="inline-flex h-10 w-10 items-center justify-center text-ink"
            >
              <Search size={18} strokeWidth={1.3} />
            </button>
            <button
              aria-label={`Wishlist${hydrated && wishCount ? `, ${wishCount} items` : ""}`}
              onClick={() => openOverlay("wishlist")}
              className="relative inline-flex h-10 w-10 items-center justify-center text-ink"
            >
              <Heart size={18} strokeWidth={1.3} />
              {hydrated && wishCount > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-ink px-0.5 text-[0.5rem] font-semibold leading-none text-surface">
                  {wishCount > 9 ? "9+" : wishCount}
                </span>
              )}
            </button>
            <button
              aria-label={`Bag${hydrated && cartCount ? `, ${cartCount} items` : ""}`}
              onClick={() => openOverlay("cart")}
              className="relative inline-flex h-10 w-10 items-center justify-center text-ink"
            >
              <ShoppingBag size={18} strokeWidth={1.3} />
              {hydrated && cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-ink px-0.5 text-[0.5rem] font-semibold leading-none text-surface">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: scrolled ? 56 : 80 }}
          transition={transition}
          className="relative mx-auto hidden max-w-[1440px] items-center px-8 lg:flex lg:px-12"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={false}
              animate={{ scale: scrolled ? 0.88 : 1 }}
              transition={transition}
              className="pointer-events-auto origin-center will-change-transform"
            >
              <Wordmark size="md" priority />
            </motion.div>
          </div>

          <div className="relative z-10 ml-auto flex items-center gap-1">
            <RegionSwitcher />
            <button
              aria-label="Search"
              onClick={() => openOverlay("search")}
              className="inline-flex h-11 w-11 items-center justify-center text-ink transition-colors duration-300 hover:text-accent-deep"
            >
              <Search size={18} strokeWidth={1.3} />
            </button>
            <button
              aria-label="Account"
              onClick={() => {
                useAccount.getState().setPendingMode("signin");
                openOverlay("account");
              }}
              className="inline-flex h-11 w-11 items-center justify-center text-ink transition-colors duration-300 hover:text-accent-deep"
            >
              <User size={18} strokeWidth={1.3} />
            </button>
            <button
              aria-label={`Wishlist${hydrated && wishCount ? `, ${wishCount} items` : ""}`}
              onClick={() => openOverlay("wishlist")}
              className="relative inline-flex h-11 w-11 items-center justify-center text-ink transition-colors duration-300 hover:text-accent-deep"
            >
              <Heart size={18} strokeWidth={1.3} />
              {hydrated && wishCount > 0 && (
                <span className="absolute right-1 top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-ink text-[0.5rem] font-semibold leading-none text-surface">
                  {wishCount}
                </span>
              )}
            </button>
            <button
              aria-label={`Bag${hydrated && cartCount ? `, ${cartCount} items` : ""}`}
              onClick={() => openOverlay("cart")}
              className="relative inline-flex h-11 w-11 items-center justify-center text-ink transition-colors duration-300 hover:text-accent-deep"
            >
              <ShoppingBag size={18} strokeWidth={1.3} />
              {hydrated && cartCount > 0 && (
                <span className="absolute right-1 top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-ink text-[0.5rem] font-semibold leading-none text-surface">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Row 2 — full-bleed editorial nav band */}
        <nav
          aria-label="Primary"
          className="relative hidden border-t border-line lg:block"
          onMouseLeave={() => {
            if (activeMega === null) setHoveredNav(null);
          }}
        >
          <ul
            className="grid w-full"
            style={{ gridTemplateColumns: `repeat(${primaryNav.length}, minmax(0, 1fr))` }}
          >
            {primaryNav.map((entry, i) => {
              const active = inkIndex === i;
              return (
                <li
                  key={entry.label}
                  className={cn(
                    "relative min-w-0",
                    i < primaryNav.length - 1 &&
                      "after:absolute after:inset-y-2 after:right-0 after:w-px after:bg-line",
                  )}
                  onMouseEnter={() => {
                    setHoveredNav(i);
                    openMega(i);
                  }}
                >
                  <Link
                    href={entry.href}
                    onFocus={() => {
                      setHoveredNav(i);
                      openMega(i);
                    }}
                    className="nav-cell"
                    data-active={active || undefined}
                  >
                    <span className="inline-flex items-center gap-1">
                      {entry.label}
                      {(entry.mega || entry.menu) && (
                        <ChevronDown
                          size={11}
                          strokeWidth={1.5}
                          className={cn(
                            "opacity-50 transition-transform duration-400 ease-[var(--ease-editorial)]",
                            activeMega === i && "rotate-180 opacity-100",
                          )}
                        />
                      )}
                    </span>
                  </Link>

                  <AnimatePresence>
                    {activeMega === i && entry.menu && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: easeEditorial }}
                        className="absolute left-1/2 top-full z-50 w-[220px] -translate-x-1/2 border border-line bg-ivory py-3 shadow-[0_12px_40px_rgba(26,24,22,0.06)]"
                        onMouseEnter={() => openMega(i)}
                      >
                        <ul className="flex flex-col">
                          {entry.menu.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                onClick={() => setActiveMega(null)}
                                className="nav-flyout-link"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sliding ink indicator */}
                  {active && !reduceMotion && (
                    <motion.span
                      layoutId="nav-ink"
                      className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  {active && reduceMotion && (
                    <span className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-ink" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <AnimatePresence>
          {activeMega !== null && primaryNav[activeMega].mega && (
            <div onMouseEnter={() => openMega(activeMega)}>
              <MegaMenu
                entry={primaryNav[activeMega]}
                onNavigate={() => setActiveMega(null)}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
