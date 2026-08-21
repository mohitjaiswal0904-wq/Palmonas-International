import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { featuredStores } from "@/data";

export const metadata: Metadata = {
  title: "Stores & Services",
  description:
    "Visit a Palmonas store for Demifine® jewellery, or shop online with nationwide and international shipping.",
  alternates: { canonical: "/stores" },
};

export default function StoresPage() {
  return (
    <Container className="pt-10 pb-24">
      <Breadcrumbs items={[{ label: "Stores & Services", href: "/stores" }]} />
      <header className="mt-8 mb-12 max-w-[52ch]">
        <p className="eyebrow mb-4">Visit Us</p>
        <h1 className="font-display text-5xl leading-none text-ink sm:text-6xl">
          Stores & Services
        </h1>
        <p className="mt-5 font-sans text-[0.95rem] leading-relaxed text-ink-muted">
          Experience Palmonas in person — from Koregaon Park roots to boutiques
          across India — or shop online with delivery across the country and
          worldwide.
        </p>
      </header>

      <div className="grid gap-0 border-t border-line md:grid-cols-3">
        {featuredStores.map((store) => (
          <article
            key={store.id}
            className="border-b border-line py-8 md:border-b-0 md:border-r md:px-6 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <p className="eyebrow">{store.city}</p>
            <h2 className="mt-3 font-display text-2xl text-ink">{store.name}</h2>
            <p className="mt-3 font-sans text-[0.86rem] leading-relaxed text-ink-muted">
              {store.address}
            </p>
            <p className="mt-2 font-sans text-[0.78rem] text-ink-faint">
              {store.hours}
            </p>
            <p className="mt-4 font-sans text-[0.74rem] text-ink-muted">
              Payments: Credit & Debit · UPI & Cash · Palmonas Rewards
            </p>
          </article>
        ))}
      </div>

      <section className="mt-16 max-w-[52ch] border-t border-line pt-10">
        <h2 className="font-display text-3xl text-ink">Services</h2>
        <ul className="mt-5 space-y-3 font-sans text-[0.9rem] leading-relaxed text-ink-muted">
          <li>In-store browsing and gifting guidance</li>
          <li>Online orders with tracking via SMS, WhatsApp and Email</li>
          <li>Returns within 2 days · Exchanges within 10 days</li>
          <li>Lifetime Warranty and Buy-Back support (as applicable)</li>
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="outline" size="sm">
            Contact us
          </ButtonLink>
          <ButtonLink href="/policies/shipping-delivery" variant="ghost" size="sm">
            Shipping policy
          </ButtonLink>
        </div>
        <p className="mt-8 font-sans text-[0.82rem] text-ink-faint">
          Corporate office: Office No 501/502/503/504/505(A) 5th Floor, Verdant
          84, Plot 1, Lane Z, Koregaon Park Annexe, Mundhwa, Pune, Maharashtra
          411036.{" "}
          <Link href="/contact" className="underline underline-offset-4">
            Get in touch
          </Link>
          .
        </p>
      </section>
    </Container>
  );
}
