import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Stories, style notes and updates from Palmonas.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <Container className="pt-10 pb-24">
      <Breadcrumbs items={[{ label: "Blogs", href: "/blogs" }]} />
      <header className="mt-8 mb-10 max-w-[52ch]">
        <p className="eyebrow mb-4">Journal</p>
        <h1 className="font-display text-5xl leading-none text-ink sm:text-6xl">
          Blogs
        </h1>
        <p className="mt-5 font-sans text-[0.95rem] leading-relaxed text-ink-muted">
          Our journal is not published on this international storefront yet.
          Explore the collection here, or read stories on the India site.
        </p>
      </header>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/jewellery" variant="outline" size="sm">
          Shop jewellery
        </ButtonLink>
        <a
          href="https://palmonas.com/blogs/news"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border border-ink/70 px-5 py-2.5 font-sans text-[0.68rem] font-medium uppercase tracking-wide-sm text-ink transition-all hover:bg-ink hover:text-surface"
        >
          Read on palmonas.com
        </a>
      </div>
    </Container>
  );
}
