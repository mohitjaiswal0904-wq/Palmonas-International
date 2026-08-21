/** Ring & bracelet size guide. */
import type { InfoPage } from "@/types";

export const sizeGuidePage: InfoPage = {
  slug: "size-guide",
  title: "Size Guide",
  description:
    "Find your perfect fit with our ring and bracelet size charts. Measure at home using a ring you already own, or wrap a paper strip around your finger.",
  group: "help",
  eyebrow: "Help",
  blocks: [
    {
      type: "p",
      text: "A well-fitted piece should feel secure without pinching. Use the charts below to match Indian, US, and millimetre measurements — the same guide we use across Palmonas 9KT gold and Fine Silver jewellery.",
    },
    { type: "h2", text: "Ring Size Guide" },
    { type: "h3", text: "(A) Measure an existing ring" },
    {
      type: "ol",
      items: [
        "Make sure the ring fits the intended finger.",
        "Measure the ring’s internal diameter in millimetres (mm).",
        "Align the 0 mm mark with the inner edge of the ring.",
        "Use the size chart below to find your size.",
      ],
    },
    { type: "h3", text: "(B) Measure your finger" },
    {
      type: "ol",
      items: [
        "Cut a thin strip of paper — not wider than your finger.",
        "Wrap it around the finger where you want to wear the ring.",
        "Keep it snug but not tight.",
        "Mark the intersection point and measure the length in millimetres (mm).",
        "Match that circumference to the chart below.",
      ],
    },
    {
      type: "table",
      headers: ["Indian Size", "Diameter (mm)", "Circumference (mm)", "US Size"],
      rows: [
        ["7", "15.1", "47.4", "4.25"],
        ["8", "15.3", "48.0", "4.50"],
        ["9", "15.5", "48.7", "4.70"],
        ["10", "15.9", "49.9", "5.25"],
        ["11", "16.3", "51.2", "5.75"],
        ["12", "16.5", "51.8", "6"],
        ["13", "16.9", "53.1", "6.50"],
        ["14", "17.3", "54.3", "7"],
        ["15", "17.5", "55.0", "7.25"],
        ["16", "17.9", "56.2", "7.75"],
        ["17", "18.1", "56.8", "8.00"],
        ["18", "18.5", "58.1", "8.50"],
        ["19", "18.7", "58.7", "8.75"],
        ["20", "19.2", "60.3", "9.25"],
        ["21", "19.4", "60.9", "9.50"],
        ["22", "19.8", "62.2", "10.00"],
        ["23", "20.0", "62.8", "10.25"],
        ["24", "20.4", "64.1", "10.75"],
        ["25", "20.6", "64.7", "11.00"],
        ["26", "21.0", "65.9", "11.50"],
      ],
    },
    { type: "h3", text: "US / Canada circumference chart" },
    {
      type: "table",
      headers: ["Circumference (mm)", "US / CAN Size"],
      rows: [
        ["44.2", "3"],
        ["46.8", "4"],
        ["49.3", "5"],
        ["51.9", "6"],
        ["54.4", "7"],
        ["57.0", "8"],
        ["59.5", "9"],
        ["62.1", "10"],
        ["64.6", "11"],
        ["67.2", "12"],
        ["67.7", "13"],
      ],
    },
    { type: "h2", text: "Tips for measuring" },
    {
      type: "ul",
      items: [
        "Measure at the end of the day when fingers are warm.",
        "If you’re choosing a thicker band, consider ordering a half size larger.",
        "Avoid measuring when fingers are cold — they may be up to half a size smaller.",
        "Avoid measuring after salty foods or alcohol, as fingers can swell temporarily.",
      ],
    },
    { type: "h2", text: "Bracelet sizes" },
    {
      type: "p",
      text: "Our bracelets use lettered sizes (XS–L). Measure your wrist circumference where the bracelet sits, then choose the closest size. If you prefer a looser fit, size up; for a closer stack, size down.",
    },
    {
      type: "table",
      headers: ["Size", "Wrist circumference"],
      rows: [
        ["XS", "14–15 cm"],
        ["S", "15–16 cm"],
        ["M", "16–17.5 cm"],
        ["L", "17.5–19 cm"],
      ],
    },
    {
      type: "note",
      text: "Still unsure? Contact us or visit a Palmonas store — our team can help you find the right fit before you order.",
    },
    { type: "cta", label: "Contact us", href: "/contact" },
  ],
};
