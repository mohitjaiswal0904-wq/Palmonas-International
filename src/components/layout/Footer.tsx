"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/layout/Wordmark";
import { RegionSwitcher } from "@/components/layout/RegionSwitcher";
import { regionById } from "@/data";
import { useRegion } from "@/stores/region";
import { useHydrated } from "@/hooks/useHydrated";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Rings", href: "/jewellery/rings" },
      { label: "Necklaces", href: "/jewellery/necklaces" },
      { label: "Earrings", href: "/jewellery/earrings" },
      { label: "Bracelets", href: "/jewellery/bracelets" },
      { label: "New Arrivals", href: "/jewellery?sort=new" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Collections", href: "/collections" },
      { label: "The Signature Collection", href: "/collections/signature" },
      { label: "Nocturne", href: "/collections/nocturne" },
      { label: "Personalisation", href: "/jewellery/charms" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Book an Appointment", href: "/collections" },
      { label: "Jewellery Care", href: "/collections" },
      { label: "Personalisation", href: "/jewellery/charms" },
      { label: "Gift Wrapping", href: "/collections" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact", href: "/collections" },
      { label: "Shipping", href: "/collections" },
      { label: "Returns", href: "/collections" },
      { label: "Warranty", href: "/collections" },
      { label: "FAQ", href: "/collections" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-6">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="link-underline font-sans text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2">
            <p className="eyebrow mb-5">The House Letter</p>
            <p className="mb-4 font-serif text-lg leading-snug text-ink">
              New pieces, private views and the stories behind the craft.
            </p>
            {sent ? (
              <p className="font-sans text-[0.82rem] text-success">
                Thank you — welcome to the house.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSent(true);
                }}
                className="flex items-center gap-3 border-b border-line-strong pb-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  aria-label="Email address"
                  className="w-full bg-transparent font-sans text-[0.9rem] text-ink placeholder:text-ink-faint focus:outline-none"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap font-sans text-[0.72rem] uppercase tracking-wide-sm text-ink"
                >
                  Sign up
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-center">
          <Wordmark size="md" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <FooterRegion />
            <RegionSwitcher compact />
            {["Instagram", "Pinterest", "TikTok"].map((s) => (
              <Link
                key={s}
                href="/"
                className="font-sans text-[0.72rem] text-ink-muted transition-colors hover:text-ink"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {["Privacy Policy", "Terms of Service", "Accessibility", "Cookie Preferences"].map(
            (l) => (
              <Link
                key={l}
                href="/"
                className="font-sans text-[0.68rem] text-ink-faint transition-colors hover:text-ink-muted"
              >
                {l}
              </Link>
            ),
          )}
          <span className="font-sans text-[0.68rem] text-ink-faint">
            © {new Date().getFullYear()} Palmonas International. A design prototype.
          </span>
        </div>
      </Container>
    </footer>
  );
}

function FooterRegion() {
  const hydrated = useHydrated();
  const regionId = useRegion((s) => s.regionId);
  const region = regionById(hydrated ? regionId : "us");

  return (
    <span className="font-sans text-[0.72rem] text-ink-muted">
      {region.country} · {region.currency} {region.currencySymbol}
      <span className="text-ink-faint"> · {region.language}</span>
    </span>
  );
}
