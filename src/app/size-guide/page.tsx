import type { Metadata } from "next";
import { InfoPageView } from "@/components/content/InfoPageView";
import { sizeGuidePage } from "@/data";

export const metadata: Metadata = {
  title: sizeGuidePage.title,
  description: sizeGuidePage.description,
  alternates: { canonical: "/size-guide" },
};

export default function SizeGuidePage() {
  return (
    <InfoPageView
      page={sizeGuidePage}
      crumbs={[
        { label: "Help", href: "/policies/faqs" },
        { label: sizeGuidePage.title, href: "/size-guide" },
      ]}
    />
  );
}
