import type { Metadata } from "next";
import { InfoPageView } from "@/components/content/InfoPageView";
import { contactPage } from "@/data";

export const metadata: Metadata = {
  title: contactPage.title,
  description: contactPage.description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <InfoPageView
      page={contactPage}
      crumbs={[{ label: "Contact Us", href: "/contact" }]}
    />
  );
}
