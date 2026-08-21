/** Contact page body — Support-led; no in-app ticket form yet. */
import type { InfoPage } from "@/types";

export const contactPage: InfoPage = {
  slug: "contact",
  title: "Contact Us",
  description:
    "Reach Palmonas through our Support desk for orders and product help, or use the emails below for partnerships and press.",
  group: "about",
  eyebrow: "At Your Service",
  blocks: [
    { type: "h2", text: "Customer Support" },
    {
      type: "p",
      text: "For orders, returns, product questions, and feedback (including NPS), use Palmonas Support — our ticket desk is the fastest path. Call 9175008322 or open a ticket online. We’re available 10 AM–7 PM, all week.",
    },
    {
      type: "cta",
      label: "Open Palmonas Support",
      href: "https://support.palmonas.com/",
    },
    {
      type: "p",
      text: "There is no in-app contact form on this international prototype yet — Support handles tickets, chat, and feedback in one place.",
    },
    { type: "h2", text: "Other enquiries" },
    {
      type: "ul",
      items: [
        "Join Our Team: peopleandculture@palmonas.com",
        "Partner / Franchise: franchise@palmonas.com",
        "Corporate gifting: corporate@palmonas.com",
        "Legal: legalteam@palmonas.com",
        "Press & Media: pr@palmonas.com",
        "General email: support@palmonas.com",
      ],
    },
    { type: "h2", text: "Our Corporate Office" },
    {
      type: "p",
      text: "Office No 501/502/503/504/505(A) 5th Floor, Verdant 84, Plot 1, Lane Z, Koregaon Park Annexe, Mundhwa, Pune, Maharashtra 411036.",
    },
  ],
};
