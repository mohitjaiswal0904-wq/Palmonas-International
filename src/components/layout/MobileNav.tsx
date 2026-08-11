"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Wordmark } from "@/components/layout/Wordmark";
import { RegionSwitcher } from "@/components/layout/RegionSwitcher";
import { primaryNav } from "@/data";
import { useUi } from "@/stores/ui";
import { easeOutSoft } from "@/lib/motion";

export function MobileNav() {
  const overlay = useUi((s) => s.overlay);
  const close = useUi((s) => s.close);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Drawer
      open={overlay === "menu"}
      onClose={close}
      side="left"
      title={
        <div onClick={close}>
          <Wordmark size="sm" />
        </div>
      }
      widthClass="w-full sm:max-w-[380px]"
    >
      <nav className="px-6 py-4" aria-label="Mobile">
        {primaryNav.map((entry) => {
          const hasMega = !!entry.mega;
          const hasMenu = !!entry.menu?.length;
          const expandable = hasMega || hasMenu;
          const isOpen = expanded === entry.label;
          const menuLinks = hasMenu
            ? entry.menu!.map((l) => ({ key: l.label, ...l }))
            : hasMega
              ? entry.mega!.columns.flatMap((col) =>
                  col.links.map((l) => ({
                    key: `${col.title}-${l.label}`,
                    ...l,
                  })),
                )
              : [];
          return (
            <div key={entry.label} className="border-b border-line">
              <div className="flex items-center justify-between">
                <Link
                  href={entry.href}
                  onClick={close}
                  className="flex-1 py-4 font-sans text-[1.05rem] text-ink"
                >
                  {entry.label}
                </Link>
                {expandable && (
                  <button
                    aria-label={`Expand ${entry.label}`}
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : entry.label)}
                    className="p-3 text-ink-muted"
                  >
                    <ChevronDown
                      size={18}
                      strokeWidth={1.4}
                      className={isOpen ? "rotate-180 transition-transform" : "transition-transform"}
                    />
                  </button>
                )}
              </div>
              <AnimatePresence initial={false}>
                {expandable && isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: easeOutSoft }}
                    className="overflow-hidden"
                  >
                    <div
                      className={
                        hasMenu
                          ? "flex flex-col gap-1 pb-5"
                          : "grid grid-cols-2 gap-x-4 gap-y-2 pb-5"
                      }
                    >
                      {menuLinks.map((l) => (
                        <Link
                          key={l.key}
                          href={l.href}
                          onClick={close}
                          className="block py-1.5 font-sans text-[0.86rem] text-ink-muted transition-[color,transform] duration-300 ease-[var(--ease-editorial)] hover:translate-x-1 hover:text-ink"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <div className="px-6 py-6">
        <div className="mb-4 flex items-center justify-between border-b border-line pb-4">
          <span className="font-sans text-[0.72rem] uppercase tracking-wide-sm text-ink-muted">
            Region
          </span>
          <RegionSwitcher />
        </div>
        <Link
          href="/jewellery"
          onClick={close}
          className="block py-2 font-sans text-[0.8rem] uppercase tracking-wide-sm text-ink-muted"
        >
          Account
        </Link>
        <Link
          href="/collections"
          onClick={close}
          className="block py-2 font-sans text-[0.8rem] uppercase tracking-wide-sm text-ink-muted"
        >
          Book an appointment
        </Link>
      </div>
    </Drawer>
  );
}
