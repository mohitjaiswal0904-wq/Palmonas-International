import type { Store } from "@/types";

export type { Store };

/** India boutique highlights for the homepage store section. */
export const featuredStores: Store[] = [
  {
    id: "mumbai",
    city: "Mumbai",
    name: "Bandra Boutique",
    address: "Linking Road, Bandra West",
    hours: "Mon–Sun · 11am–9pm",
  },
  {
    id: "delhi",
    city: "New Delhi",
    name: "Khan Market",
    address: "Khan Market, New Delhi",
    hours: "Mon–Sun · 11am–8pm",
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    name: "Indiranagar",
    address: "100 Feet Road, Indiranagar",
    hours: "Mon–Sun · 11am–9pm",
  },
];
