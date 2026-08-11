export type Store = {
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
};

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
