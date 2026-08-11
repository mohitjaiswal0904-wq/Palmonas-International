"use client";

import { useEffect, useState } from "react";

/**
 * Scroll compaction with hysteresis so the header doesn't flicker when the
 * user sits near the threshold.
 */
export function useScrolled(enter = 48, exit = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let current = false;

    const measure = () => {
      const y = window.scrollY;
      const next = current ? y > exit : y > enter;
      if (next !== current) {
        current = next;
        setScrolled(next);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enter, exit]);

  return scrolled;
}
