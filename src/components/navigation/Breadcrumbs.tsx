import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE } from "@/lib/site";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Home", href: "/" }, ...items].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE.url}${c.href}`,
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 overflow-x-auto overscroll-x-contain whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/"
        className="shrink-0 font-sans text-[0.72rem] text-ink-muted transition-colors hover:text-ink"
      >
        Home
      </Link>
      {items.map((c, i) => (
        <span key={c.href} className="flex shrink-0 items-center gap-1.5">
          <ChevronRight size={12} strokeWidth={1.5} className="text-ink-faint" />
          {i === items.length - 1 ? (
            <span className="max-w-[40vw] truncate font-sans text-[0.72rem] text-ink sm:max-w-none">
              {c.label}
            </span>
          ) : (
            <Link
              href={c.href}
              className="font-sans text-[0.72rem] text-ink-muted transition-colors hover:text-ink"
            >
              {c.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
