"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { easeOutSoft } from "@/lib/motion";

export type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

export function Accordion({
  items,
  defaultOpen = -1,
}: {
  items: AccordionItem[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const btnId = `${baseId}-btn-${i}`;
        return (
          <div key={item.title} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-sans text-[0.82rem] font-medium uppercase tracking-wide-sm text-ink">
                  {item.title}
                </span>
                <span className="text-ink-muted transition-colors">
                  {isOpen ? <Minus size={16} strokeWidth={1.4} /> : <Plus size={16} strokeWidth={1.4} />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: easeOutSoft }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-8 text-[0.9rem] leading-relaxed text-ink-muted">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
