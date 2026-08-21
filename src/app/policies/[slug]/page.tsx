import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPageView } from "@/components/content/InfoPageView";
import { allPolicySlugs, policyBySlug } from "@/data";

export function generateStaticParams() {
  return allPolicySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = policyBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/policies/${page.slug}` },
  };
}

export default async function PolicyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = policyBySlug(slug);
  if (!page) notFound();

  return (
    <InfoPageView
      page={page}
      crumbs={[
        { label: "Policies", href: "/policies" },
        { label: page.title, href: `/policies/${page.slug}` },
      ]}
    />
  );
}
