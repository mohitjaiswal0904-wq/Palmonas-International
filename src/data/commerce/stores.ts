import type { Store } from "@/types";

export type { Store };

/** Retail destinations highlighted across the site. */
export const featuredStores: Store[] = [
  {
    id: "pune-koregaon",
    city: "Pune",
    name: "Koregaon Park",
    address: "Lane 5, Koregaon Park, Pune",
    hours: "Mon–Sun · 11am–9:30pm",
  },
  {
    id: "gurugram-sector-14",
    city: "Gurugram",
    name: "Sector 14",
    address: "Ground Floor, 293/2, Delhi Road, Anamika Enclave, Sector 14, Gurugram, Haryana 122007",
    hours: "Mon–Thu · 11am–9:30pm · Fri–Sun · 11am–10pm",
  },
  {
    id: "delhi-lajpat",
    city: "New Delhi",
    name: "Lajpat Nagar",
    address: "CII/48, Lajpat Nagar, Ground Floor, New Delhi, Delhi 110024",
    hours: "Mon–Thu · 11am–9:30pm · Fri–Sun · 11am–10pm",
  },
];
