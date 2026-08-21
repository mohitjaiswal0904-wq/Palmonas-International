import type { Metadata } from "next";
import { InfoPageView } from "@/components/content/InfoPageView";
import { aboutPage } from "@/data";

export const metadata: Metadata = {
  title: aboutPage.title,
  description: aboutPage.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <InfoPageView
      page={aboutPage}
      crumbs={[{ label: "About Us", href: "/about" }]}
    />
  );
}
