import type { Variants, Transition } from "framer-motion";

export const easeEditorial: Transition["ease"] = [0.16, 1, 0.3, 1];
export const easeOutSoft: Transition["ease"] = [0.22, 0.61, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeEditorial },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeOutSoft } },
};

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const imageReveal: Variants = {
  hidden: { scale: 1.08, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: easeEditorial },
  },
};

export const viewportOnce = { once: true, amount: 0.3 } as const;
