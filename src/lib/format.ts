import type { Region } from "@/data/regions";

export function formatMoney(
  amount: number,
  currency = "USD",
  locale = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Convert a USD catalogue price into the active region currency for display. */
export function formatRegional(amountUsd: number, region: Region): string {
  const converted = Math.round(amountUsd * region.fxFromUsd);
  return formatMoney(converted, region.currency, region.locale);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
