"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { easeEditorial } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  children,
  widthClass = "w-full sm:max-w-[440px]",
}: {
  open: boolean;
  onClose: () => void;
  side?: "right" | "left";
  title?: React.ReactNode;
  children: React.ReactNode;
  widthClass?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[70]"
          role="dialog"
          aria-modal="true"
          aria-label={typeof title === "string" ? title : "Dialog"}
        >
          <motion.div
            className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            className={cn(
              "absolute top-0 bottom-0 flex flex-col bg-surface outline-none",
              side === "right" ? "right-0" : "left-0",
              widthClass,
            )}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ duration: 0.5, ease: easeEditorial }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:py-5">
              <div className="min-w-0">
                {typeof title === "string" || title == null ? (
                  <h2 className="font-sans text-[0.72rem] font-semibold uppercase tracking-luxe text-ink">
                    {title}
                  </h2>
                ) : (
                  title
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-11 w-11 items-center justify-center text-ink-muted transition-colors hover:text-ink"
              >
                <X size={20} strokeWidth={1.3} />
              </button>
            </div>
            <div className="scroll-thin flex-1 overflow-y-auto pb-safe">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
