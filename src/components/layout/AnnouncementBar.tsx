"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { announcements } from "@/data";

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setI((v) => (v + 1) % announcements.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-ink pt-safe text-surface">
      <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-center overflow-hidden px-4 sm:px-5">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="truncate text-center font-sans text-[0.58rem] font-medium uppercase tracking-[0.14em] sm:text-[0.62rem] sm:tracking-luxe"
          >
            {announcements[i]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
