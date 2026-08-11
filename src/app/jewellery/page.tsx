import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PlpView } from "@/components/product/PlpView";
import { products } from "@/data";
import { filterProductsByQuery } from "@/lib/search";

export const metadata: Metadata = {
  title: "Jewellery",
  description:
    "Explore the full Palmonas International collection — rings, necklaces, earrings, bracelets, bangles and charms in 18k gold and platinum.",
  alternates: { canonical: "/jewellery" },
};

type SortKey = "featured" | "new" | "price-asc" | "price-desc" | "bestsellers";

const METAL_LABEL: Record<string, string> = {
  yellow: "18K Yellow Gold",
  white: "18K White Gold",
  rose: "18K Rose Gold",
  platinum: "Platinum",
};
const STONE_LABEL: Record<string, string> = {
  diamond: "Diamond",
  sapphire: "Sapphire",
  emerald: "Emerald",
  ruby: "Ruby",
};

export default async function JewelleryPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; metal?: string; stone?: string; q?: string }>;
}) {
  const { sort, metal, stone, q } = await searchParams;
  const query = q?.trim() ?? "";
  const initialSort: SortKey =
    sort === "new"
      ? "new"
      : sort === "bestsellers"
        ? "bestsellers"
        : "featured";

  const initialMetals = metal && METAL_LABEL[metal] ? [METAL_LABEL[metal]] : [];
  const initialStones = stone && STONE_LABEL[stone] ? [STONE_LABEL[stone]] : [];
  const listed = filterProductsByQuery(products, query);

  return (
    <Container className="pt-10 pb-24">
      {!query && (
        <Breadcrumbs items={[{ label: "Jewellery", href: "/jewellery" }]} />
      )}
      <header className={query ? "mb-12 max-w-[52ch]" : "mt-8 mb-12 max-w-[52ch]"}>
        <p className="eyebrow mb-4">{query ? "Search" : "The Collection"}</p>
        <h1
          className={
            query
              ? "font-display text-[1.5rem] leading-none text-ink sm:text-[1.875rem]"
              : "font-display text-5xl leading-none text-ink sm:text-6xl"
          }
        >
          {query ? `Results for “${query}”` : "New Arrivals"}
        </h1>
        {!query && (
          <p className="mt-5 font-sans text-[0.95rem] leading-relaxed text-ink-muted">
            Every piece is made to be worn — through water, movement and years.
            Explore the full house, or narrow by form, material and collection.
          </p>
        )}
      </header>
      <PlpView
        products={listed}
        initialSort={initialSort}
        initialMetals={initialMetals}
        initialStones={initialStones}
        searchMode={Boolean(query)}
      />
    </Container>
  );
}
