export type Region = {
  id: string;
  country: string;
  /** ISO 3166-1 alpha-2 — used for flag assets */
  countryCode: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  language: string;
  /** Rough FX vs USD for prototype display only */
  fxFromUsd: number;
};

export const regions: Region[] = [
  {
    id: "us",
    country: "United States",
    countryCode: "us",
    currency: "USD",
    currencySymbol: "$",
    locale: "en-US",
    language: "English",
    fxFromUsd: 1,
  },
  {
    id: "in",
    country: "India",
    countryCode: "in",
    currency: "INR",
    currencySymbol: "₹",
    locale: "en-IN",
    language: "English",
    fxFromUsd: 83.5,
  },
  {
    id: "ae",
    country: "United Arab Emirates",
    countryCode: "ae",
    currency: "AED",
    currencySymbol: "د.إ",
    locale: "en-AE",
    language: "English",
    fxFromUsd: 3.67,
  },
  {
    id: "gb",
    country: "United Kingdom",
    countryCode: "gb",
    currency: "GBP",
    currencySymbol: "£",
    locale: "en-GB",
    language: "English",
    fxFromUsd: 0.79,
  },
  {
    id: "sg",
    country: "Singapore",
    countryCode: "sg",
    currency: "SGD",
    currencySymbol: "S$",
    locale: "en-SG",
    language: "English",
    fxFromUsd: 1.35,
  },
  {
    id: "au",
    country: "Australia",
    countryCode: "au",
    currency: "AUD",
    currencySymbol: "A$",
    locale: "en-AU",
    language: "English",
    fxFromUsd: 1.52,
  },
];

export const DEFAULT_REGION_ID = "us";

export function regionById(id: string): Region {
  return regions.find((r) => r.id === id) ?? regions[0];
}

export function flagUrl(countryCode: string, width = 40): string {
  return `https://flagcdn.com/w${width}/${countryCode.toLowerCase()}.png`;
}
