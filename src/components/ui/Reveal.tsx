"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: "div" | "section" | "li" | "figure" | "article";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
