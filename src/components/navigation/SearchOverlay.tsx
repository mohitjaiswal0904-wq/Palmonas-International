"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { collections } from "@/data/collections";
import { Media } from "@/components/ui/Media";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/layout/Wordmark";
import { useUi } from "@/stores/ui";
import { useRegionalMoney } from "@/hooks/useRegionalMoney";
import { easeEditorial } from "@/lib/motion";

const POPULAR = ["Signet ring", "Tennis bracelet", "Gold hoops", "Diamond pendant", "Nocturne"];

/** Token / prefix match so "ring" hits Rings, not Earrings. */
function matchesQuery(
  haystack: string,
  q: string,
): boolean {
  const text = haystack.toLowerCase();
  if (!text) return false;
  if (text === q || text.startsWith(`${q} `)) return true;
  return text.split(/[\s,/|&+.-]+/).some((token) => token === q || token.startsWith(q));
}

export function SearchOverlay() {
  const open = useUi((s) => s.overlay === "search");
  const close = useUi((s) => s.close);
  const money = useRegionalMoney();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
      document.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = prev;
      };
    }
    setQuery("");
  }, [open, close]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 4);
    return products
      .filter(
        (p) =>
          matchesQuery(p.name, q) ||
          matchesQuery(p.category, q) ||
          matchesQuery(p.categoryLabel, q) ||
          matchesQuery(p.collectionLabel, q) ||
          matchesQuery(p.materials.join(" "), q),
      )
      .slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[75]" role="dialog" aria-modal="true" aria-label="Search">
          <motion.div
            className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: easeEditorial }}
            className="absolute inset-x-0 top-0 max-h-[88vh] overflow-y-auto bg-ivory"
          >
            <Container className="py-8">
              <div className="mb-6 flex items-center justify-between">
                <div onClick={close}>
                  <Wordmark size="sm" />
                </div>
                <button onClick={close} aria-label="Close search" className="text-ink-muted hover:text-ink">
                  <X size={22} strokeWidth={1.3} />
                </button>
              </div>
              <div className="flex items-center gap-3 border-b border-ink pb-3 sm:gap-3.5 sm:pb-3.5">
                <Search size={18} strokeWidth={1.3} className="shrink-0 text-ink-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search jewellery, collections, materials"
                  aria-label="Search"
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full min-h-[1.75rem] bg-transparent font-sans text-[0.95rem] leading-normal text-ink caret-ink placeholder:text-ink-faint outline-none focus:outline-none focus-visible:!outline-none focus-visible:!outline-offset-0 sm:min-h-[2rem]"
                />
              </div>

              <div className="grid gap-10 py-10 lg:grid-cols-[1fr_2fr]">
                <div className="space-y-8">
                  <div>
                    <p className="eyebrow mb-4">Popular searches</p>
                    <ul className="space-y-2.5">
                      {POPULAR.map((p) => (
                        <li key={p}>
                          <button
                            onClick={() => setQuery(p)}
                            className="link-underline font-sans text-[0.95rem] text-ink"
                          >
                            {p}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow mb-4">Collections</p>
                    <ul className="space-y-2.5">
                      {collections.slice(0, 4).map((c) => (
                        <li key={c.id}>
                          <Link
                            href={`/collections/${c.slug}`}
                            onClick={close}
                            className="link-underline font-sans text-[0.95rem] text-ink"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="eyebrow mb-5">
                    {query.trim() ? `Results (${results.length})` : "Suggested for you"}
                  </p>
                  {results.length === 0 ? (
                    <p className="font-serif text-xl text-ink-muted">
                      No pieces match “{query}”. Try a collection or material.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
                      {results.map((p) => (
                        <Link
                          key={p.id}
                          href={`/jewellery/${p.category}/${p.slug}`}
                          onClick={close}
                          className="group block"
                        >
                          <div className="relative aspect-square overflow-hidden bg-stone">
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                              <Media
                                src={p.images[0].src}
                                seed={p.images[0].seed}
                                kind={p.images[0].plate}
                                alt={p.images[0].alt}
                                sizes="20vw"
                              />
                            </div>
                          </div>
                          <p className="mt-3 font-sans text-[0.82rem] text-ink">{p.name}</p>
                          <p className="font-sans text-[0.76rem] text-ink-muted">
                            {money(p.price)}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
