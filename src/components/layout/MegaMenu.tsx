"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { NavEntry } from "@/data";
import { Media } from "@/components/ui/Media";
import { Container } from "@/components/ui/Container";
import { bannerFor } from "@/lib/banners";
import { easeOutSoft } from "@/lib/motion";

export function MegaMenu({
  entry,
  onNavigate,
}: {
  entry: NavEntry;
  onNavigate: () => void;
}) {
  if (!entry.mega) return null;
  const { columns, editorial } = entry.mega;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: easeOutSoft }}
      className="absolute left-0 right-0 top-full border-t border-line bg-ivory"
    >
      <Container className="grid grid-cols-12 gap-8 py-12">
        <div className="col-span-8 grid grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      onClick={onNavigate}
                      className="link-underline inline-block font-sans text-[0.92rem] text-ink transition-[color,transform] duration-300 ease-[var(--ease-editorial)] hover:translate-x-1 hover:text-accent-deep"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link
          href={editorial.href}
          onClick={onNavigate}
          className="group col-span-4 block"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-stone">
            <div className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.04]">
              <Media
                src={bannerFor(editorial.seed)}
                seed={editorial.seed}
                kind="editorial"
                alt={editorial.title}
                sizes="33vw"
              />
            </div>
          </div>
          <p className="eyebrow mt-4">{editorial.eyebrow}</p>
          <p className="mt-1 font-display text-xl text-ink">{editorial.title}</p>
          <span className="link-underline mt-2 inline-block font-sans text-[0.72rem] uppercase tracking-wide-sm text-ink">
            Discover
          </span>
        </Link>
      </Container>
    </motion.div>
  );
}
