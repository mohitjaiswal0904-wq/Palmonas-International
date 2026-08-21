import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import type { InfoBlock, InfoPage } from "@/types";
import { policyPages } from "@/data";
import { cn } from "@/lib/cn";

export function InfoPageView({
  page,
  crumbs,
}: {
  page: InfoPage;
  crumbs: { label: string; href: string }[];
}) {
  const related = policyPages.filter(
    (p) => p.group === page.group && p.slug !== page.slug,
  );

  return (
    <Container className="pt-10 pb-24">
      <Breadcrumbs items={crumbs} />
      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
        <article className="min-w-0">
          <header className="mb-10 max-w-[52ch]">
            {page.eyebrow && <p className="eyebrow mb-4">{page.eyebrow}</p>}
            <h1 className="font-display text-4xl leading-none text-ink sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 font-sans text-[0.95rem] leading-relaxed text-ink-muted">
              {page.description}
            </p>
          </header>

          <div className="max-w-[68ch] space-y-6 border-t border-line pt-8">
            {page.blocks.map((block, i) => (
              <InfoBlockView key={`${block.type}-${i}`} block={block} />
            ))}
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="eyebrow mb-4">Explore</p>
            <nav aria-label="Related pages" className="space-y-1 border-t border-line">
              {(page.group === "about"
                ? policyPages.filter((p) => p.group === "policy").slice(0, 6)
                : related.slice(0, 8)
              ).map((p) => (
                <Link
                  key={p.slug}
                  href={`/policies/${p.slug}`}
                  className="block border-b border-line py-3 font-sans text-[0.78rem] text-ink-muted transition-colors hover:text-ink"
                >
                  {p.title}
                </Link>
              ))}
              <Link
                href="/about"
                className="block border-b border-line py-3 font-sans text-[0.78rem] text-ink-muted transition-colors hover:text-ink"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block border-b border-line py-3 font-sans text-[0.78rem] text-ink-muted transition-colors hover:text-ink"
              >
                Contact Us
              </Link>
              <Link
                href="/stores"
                className="block border-b border-line py-3 font-sans text-[0.78rem] text-ink-muted transition-colors hover:text-ink"
              >
                Stores & Services
              </Link>
              <Link
                href="/policies/faqs"
                className="block border-b border-line py-3 font-sans text-[0.78rem] text-ink-muted transition-colors hover:text-ink"
              >
                FAQs
              </Link>
            </nav>
          </div>
        </aside>
      </div>
    </Container>
  );
}

function InfoBlockView({ block }: { block: InfoBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="font-sans text-[0.92rem] leading-relaxed text-ink-muted">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 className="pt-4 font-sans text-[0.78rem] font-semibold uppercase tracking-wide-sm text-ink">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-sans text-[0.86rem] font-medium text-ink">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5 font-sans text-[0.92rem] leading-relaxed text-ink-muted">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-5 font-sans text-[0.92rem] leading-relaxed text-ink-muted">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[320px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-stone/40">
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-sans text-[0.7rem] font-semibold uppercase tracking-wide-sm text-ink"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-b border-line last:border-b-0">
                  {row.map((cell, i) => (
                    <td
                      key={`${cell}-${i}`}
                      className="px-4 py-3 align-top font-sans text-[0.82rem] leading-relaxed text-ink-muted"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <p className="border-l-2 border-accent/40 pl-4 font-sans text-[0.86rem] leading-relaxed text-ink-muted">
          {block.text}
        </p>
      );
    case "cta": {
      const external = block.href.startsWith("http");
      if (external) {
        return (
          <div className="pt-1">
            <a
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2 border border-ink/70 px-5 py-2.5 font-sans text-[0.68rem] font-medium uppercase tracking-wide-sm text-ink transition-all hover:border-ink hover:bg-ink hover:text-surface",
              )}
            >
              {block.label}
            </a>
          </div>
        );
      }
      return (
        <div className="pt-1">
          <ButtonLink href={block.href} variant="outline" size="sm">
            {block.label}
          </ButtonLink>
        </div>
      );
    }
    default:
      return null;
  }
}
