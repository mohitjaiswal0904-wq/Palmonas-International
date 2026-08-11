/** Commerce domain — markets and retail boutiques. */

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

export type Store = {
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
};
