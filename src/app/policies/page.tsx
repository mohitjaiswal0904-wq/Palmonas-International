import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { policyPages } from "@/data";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Shipping, returns, warranty, buy-back, payment, privacy and other Palmonas policies.",
  alternates: { canonical: "/policies" },
};

const groups = [
  { id: "policy" as const, title: "Policy" },
  { id: "help" as const, title: "Help" },
];

export default function PoliciesIndexPage() {
  return (
    <Container className="pt-10 pb-24">
      <Breadcrumbs items={[{ label: "Policies", href: "/policies" }]} />
      <header className="mt-8 mb-12 max-w-[52ch]">
        <p className="eyebrow mb-4">Customer Care</p>
        <h1 className="font-display text-5xl leading-none text-ink sm:text-6xl">
          Policies
        </h1>
        <p className="mt-5 font-sans text-[0.95rem] leading-relaxed text-ink-muted">
          Clear policies for shipping, returns, warranty, rewards and more — so
          you can shop with confidence.
        </p>
      </header>

      <div className="grid gap-12 sm:grid-cols-2">
        {groups.map((group) => {
          const pages = policyPages.filter((p) => p.group === group.id);
          return (
            <section key={group.id}>
              <p className="eyebrow mb-5">{group.title}</p>
              <ul className="border-t border-line">
                {pages.map((p) => (
                  <li key={p.slug} className="border-b border-line">
                    <Link
                      href={`/policies/${p.slug}`}
                      className="flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-accent-deep"
                    >
                      <span className="font-sans text-[0.9rem] text-ink">
                        {p.title}
                      </span>
                      <span className="shrink-0 font-sans text-[0.7rem] uppercase tracking-wide-sm text-ink-faint">
                        View
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
