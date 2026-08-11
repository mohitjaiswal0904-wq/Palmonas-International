"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductImage } from "@/types";
import { Media } from "@/components/ui/Media";
import { easeOutSoft } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="lg:grid lg:grid-cols-[68px_1fr] lg:gap-3 lg:pl-3">
      {/* Thumbnails — vertical on desktop */}
      <div className="order-2 mt-3 flex gap-3 px-5 sm:px-8 lg:order-1 lg:mt-0 lg:flex-col lg:px-0">
        {images.map((img, i) => (
          <button
            key={img.seed}
            onClick={() => setActive(i)}
            aria-label={`View ${img.alt}`}
            aria-current={i === active}
            className={cn(
              "relative aspect-square w-16 shrink-0 overflow-hidden bg-stone transition-opacity lg:w-full",
              i === active ? "opacity-100 ring-1 ring-ink" : "opacity-60 hover:opacity-100",
            )}
          >
            <Media seed={img.seed} kind={img.plate} src={img.src} alt="" sizes="72px" />
          </button>
        ))}
      </div>

      {/* Main image — bleeds to the viewport edge */}
      <div className="order-1 lg:order-2">
        <div className="relative aspect-square overflow-hidden bg-stone lg:aspect-auto lg:min-h-[min(86vh,920px)] lg:h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.seed}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeOutSoft }}
              className="absolute inset-0"
            >
              <Media
                seed={current.seed}
                kind={current.plate}
                src={current.src}
                alt={current.alt}
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
