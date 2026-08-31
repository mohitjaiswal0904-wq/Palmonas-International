import { cn } from "@/lib/cn";

/** Card-style selectable option — address blocks, etc. */
export function checkoutSelectClass(selected: boolean) {
  return cn(
    selected
      ? "border-2 border-ink bg-stone ring-2 ring-ink/20"
      : "border border-line hover:border-line-strong",
  );
}

/** Compact button-style option — payment method, etc. */
export function checkoutPillSelectClass(selected: boolean) {
  return cn(
    selected
      ? "border-2 border-ink bg-ink text-surface"
      : "border border-line text-ink-muted hover:border-line-strong hover:text-ink",
  );
}
